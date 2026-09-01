import React, { useState, useEffect } from "react";
import { Analytics } from "@vercel/analytics/react";
import { FoodProduct, Language, UserProfile } from "./types";
import { INDIAN_PRODUCTS_DB } from "./data/indianProducts";
import { Header } from "./components/Header";
import { BottomNav } from "./components/BottomNav";
import { HomeScreen } from "./components/HomeScreen";
import { ScannerModal } from "./components/ScannerModal";
import { ProductResultView } from "./components/ProductResultView";
import { SavedListScreen } from "./components/SavedListScreen";
import { HistoryScreen } from "./components/HistoryScreen";
import { AdulterationGuideScreen } from "./components/AdulterationGuideScreen";
import { GymIQScreen } from "./components/GymIQScreen";
import { AuthModal } from "./components/AuthModal";
import { AboutAndPrivacyModal } from "./components/AboutAndPrivacyModal";
import { AdminDashboard } from "./components/AdminDashboard";
import { InstallPwaPrompt } from "./components/InstallPwaPrompt";
import {
  auth,
  recordScanToCloud,
  syncSavedItemToCloud,
  syncUserProfileToCloud,
  seedDefaultAlternativesIfEmpty,
  listenToCategoryAlternatives,
  fetchUserSavedItemsFromCloud,
  fetchUserScansFromCloud,
} from "./lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { initSessionTracker, trackUserActivity, getVisitorId } from "./services/analyticsTracker";


export default function App() {
  // 1. Language State (English / Hindi / Arabic / French / etc.)
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem("ahariq_language") as Language;
    return saved || "hi";
  });

  // 2. Dark Mode State
  const [isDark, setIsDark] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem("ahariq_theme");
      if (saved === "dark") return true;
      if (saved === "light") return false;
      return typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    } catch (e) {
      return false;
    }
  });

  useEffect(() => {
    localStorage.setItem("ahariq_language", language);
    // Support RTL direction for Arabic
    if (language === "ar") {
      document.documentElement.dir = "rtl";
      document.documentElement.lang = "ar";
    } else {
      document.documentElement.dir = "ltr";
      document.documentElement.lang = language;
    }
  }, [language]);

  useEffect(() => {
    localStorage.setItem("ahariq_theme", isDark ? "dark" : "light");
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  // 3. Navigation & Screen State
  const [currentTab, setCurrentTab] = useState<
    "home" | "scanner" | "saved" | "history" | "gym" | "adulteration"
  >("home");
  const [selectedProduct, setSelectedProduct] = useState<FoodProduct | null>(
    null
  );
  const [isScannerOpen, setIsScannerOpen] = useState<boolean>(false);
  const [isAuthOpen, setIsAuthOpen] = useState<boolean>(false);
  const [isAdminDashboardOpen, setIsAdminDashboardOpen] = useState<boolean>(false);
  const [isAboutPrivacyOpen, setIsAboutPrivacyOpen] = useState<boolean>(false);
  const [aboutPrivacyTab, setAboutPrivacyTab] = useState<"about" | "privacy" | "disclaimer">(
    "about"
  );
  const [isInstallPwaOpen, setIsInstallPwaOpen] = useState<boolean>(false);

  // 6. User Profile state
  const [user, setUser] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem("ahariq_user");
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return {
      isLoggedIn: false,
      name: "",
      dietaryPreferences: {
        pureVegetarian: false,
        avoidPalmOil: true,
        avoidMaida: false,
        lowSugar: false,
      },
    };
  });

  // Helper to get active user storage scope key
  const getUserScopeKey = (u?: UserProfile | null): string => {
    if (u && u.isLoggedIn && u.id) {
      return `user_${u.id}`;
    }
    return `guest_${getVisitorId()}`;
  };

  // Helper to load user-isolated data
  const loadScopedUserData = (scopeKey: string) => {
    try {
      const savedStr = localStorage.getItem(`ahariq_saved_${scopeKey}`);
      const histStr = localStorage.getItem(`ahariq_history_${scopeKey}`);
      return {
        saved: savedStr ? JSON.parse(savedStr) : [],
        history: histStr ? JSON.parse(histStr) : [],
      };
    } catch (e) {
      return { saved: [], history: [] };
    }
  };

  // 4. Saved Items ("Mere List") - Strictly isolated per user/account
  const [savedProducts, setSavedProducts] = useState<FoodProduct[]>(() => {
    const initialKey = getUserScopeKey(
      (() => {
        try {
          const s = localStorage.getItem("ahariq_user");
          return s ? JSON.parse(s) : null;
        } catch (e) {
          return null;
        }
      })()
    );
    return loadScopedUserData(initialKey).saved;
  });

  // 5. Scan History - Strictly isolated per user/account
  const [scanHistory, setScanHistory] = useState<FoodProduct[]>(() => {
    const initialKey = getUserScopeKey(
      (() => {
        try {
          const s = localStorage.getItem("ahariq_user");
          return s ? JSON.parse(s) : null;
        } catch (e) {
          return null;
        }
      })()
    );
    return loadScopedUserData(initialKey).history;
  });

  // Listen to Firebase Auth state & sync user-scoped items
  useEffect(() => {
    // Start active visitor telemetry session
    const cleanupSession = initSessionTracker(user);

    const unsubscribe = onAuthStateChanged(auth, async (fbUser) => {
      if (fbUser) {
        const userScope = `user_${fbUser.uid}`;
        const updated: UserProfile = {
          id: fbUser.uid,
          isLoggedIn: true,
          name: fbUser.displayName || user.name || "AharIQ User",
          email: fbUser.email || user.email || undefined,
          phone: fbUser.phoneNumber || user.phone || undefined,
          phoneNumber: fbUser.phoneNumber || user.phoneNumber || undefined,
          dietaryPreferences: user.dietaryPreferences,
          strictNoPalmOil: user.strictNoPalmOil ?? user.dietaryPreferences.avoidPalmOil,
          strictNoMaida: user.strictNoMaida ?? user.dietaryPreferences.avoidMaida,
          isPureVeg: user.isPureVeg ?? user.dietaryPreferences.pureVegetarian,
          isDiabeticConscious: user.isDiabeticConscious ?? user.dietaryPreferences.lowSugar,
        };
        setUser(updated);
        localStorage.setItem("ahariq_user", JSON.stringify(updated));
        await syncUserProfileToCloud(fbUser.uid, updated);

        // Load local cache for this specific user first (Strictly isolating from other users)
        const localData = loadScopedUserData(userScope);
        setSavedProducts(localData.saved);
        setScanHistory(localData.history);

        // Track Login activity event
        trackUserActivity({
          eventType: "LOGIN",
          title: `User logged in: ${fbUser.displayName || fbUser.email || fbUser.phoneNumber || "Google User"}`,
          details: { email: fbUser.email, uid: fbUser.uid },
          user: updated,
        });

        // Fetch this authenticated user's private cloud saved items & history from Firestore
        try {
          const [cloudSaved, cloudScans] = await Promise.all([
            fetchUserSavedItemsFromCloud(fbUser.uid),
            fetchUserScansFromCloud(fbUser.uid),
          ]);
          
          if (cloudSaved) {
            setSavedProducts(cloudSaved);
            localStorage.setItem(`ahariq_saved_${userScope}`, JSON.stringify(cloudSaved));
          }
          if (cloudScans) {
            setScanHistory(cloudScans);
            localStorage.setItem(`ahariq_history_${userScope}`, JSON.stringify(cloudScans));
          }
        } catch (e) {
          console.warn("User data cloud load warn:", e);
        }
      } else {
        // User logged out or guest: Switch to guest session and isolate
        const guestScope = `guest_${getVisitorId()}`;
        const guestData = loadScopedUserData(guestScope);
        setSavedProducts(guestData.saved);
        setScanHistory(guestData.history);
      }
    });

    return () => {
      unsubscribe();
      if (cleanupSession) cleanupSession();
    };
  }, []);

  // Initialize and synchronize Firestore alternatives collection
  useEffect(() => {
    seedDefaultAlternativesIfEmpty();
    const unsub = listenToCategoryAlternatives((_docs) => {
      // realtime cache updated
    });
    return () => {
      if (unsub) unsub();
    };
  }, []);

  // Persistence helpers - strictly write to active user's scoped storage
  useEffect(() => {
    const scopeKey = getUserScopeKey(user);
    localStorage.setItem(`ahariq_saved_${scopeKey}`, JSON.stringify(savedProducts));
  }, [savedProducts, user]);

  useEffect(() => {
    const scopeKey = getUserScopeKey(user);
    localStorage.setItem(`ahariq_history_${scopeKey}`, JSON.stringify(scanHistory));
  }, [scanHistory, user]);

  useEffect(() => {
    localStorage.setItem("ahariq_user", JSON.stringify(user));
  }, [user]);

  // Handlers
  const handleToggleLanguage = () => {
    setLanguage((prev) => (prev === "en" ? "hi" : "en"));
  };

  const handleSelectLanguage = (lang: string) => {
    setLanguage(lang as Language);
  };

  const handleToggleDark = () => {
    setIsDark((prev) => !prev);
  };

  const handleOpenScanner = () => {
    setIsScannerOpen(true);
  };

  const handleProductScanned = (product: FoodProduct) => {
    setIsScannerOpen(false);

    // Create lightweight history item without heavy base64 to keep localStorage blazing fast
    const isBase64 = product.imageUrl?.startsWith("data:");
    const sanitizedProduct: FoodProduct = {
      ...product,
      imageUrl: isBase64
        ? product.imageUrl
        : (product.imageUrl || "https://images.unsplash.com/photo-1542838132-92c53300491e?w=500&auto=format&fit=crop&q=80"),
    };

    setScanHistory((prev) => {
      const filtered = prev.filter((p) => p.barcode !== sanitizedProduct.barcode && p.id !== sanitizedProduct.id);
      // For local storage, if image is a massive base64, save with default image so memory stays 0ms fast
      const historyItem: FoodProduct = {
        ...sanitizedProduct,
        imageUrl: isBase64
          ? "https://images.unsplash.com/photo-1542838132-92c53300491e?w=500&auto=format&fit=crop&q=80"
          : sanitizedProduct.imageUrl,
        scannedAt: new Date().toISOString(),
      };
      return [historyItem, ...filtered.slice(0, 40)];
    });

    setSelectedProduct(sanitizedProduct);

    // Track user scan activity
    trackUserActivity({
      eventType: "SCAN",
      title: `Scanned: ${sanitizedProduct.name} (${sanitizedProduct.healthScore}/100)`,
      details: {
        productId: sanitizedProduct.id,
        productName: sanitizedProduct.name,
        brand: sanitizedProduct.brand,
        healthScore: sanitizedProduct.healthScore,
        verdict: sanitizedProduct.verdict,
        barcode: sanitizedProduct.barcode,
      },
      user,
    });

    // Sync scan to Firebase Cloud in background
    const uid = user.id || "guest_device";
    recordScanToCloud(uid, sanitizedProduct);
  };

  const handleToggleSave = (product: FoodProduct) => {
    const exists = savedProducts.some(
      (p) => p.id === product.id || p.barcode === product.barcode
    );
    const uid = user.id || "guest_device";

    if (exists) {
      setSavedProducts((prev) =>
        prev.filter((p) => p.id !== product.id && p.barcode !== product.barcode)
      );
      syncSavedItemToCloud(uid, product, false);
      trackUserActivity({
        eventType: "BOOKMARK",
        title: `Removed Bookmark: ${product.name}`,
        details: { productName: product.name, barcode: product.barcode },
        user,
      });
    } else {
      setSavedProducts((prev) => [product, ...prev]);
      syncSavedItemToCloud(uid, product, true);
      trackUserActivity({
        eventType: "BOOKMARK",
        title: `Saved Bookmark: ${product.name}`,
        details: { productName: product.name, barcode: product.barcode, healthScore: product.healthScore },
        user,
      });
    }
  };

  const handleRemoveSaved = (productId: string) => {
    const item = savedProducts.find((p) => p.id === productId);
    if (item) {
      const uid = user.id || "guest_device";
      syncSavedItemToCloud(uid, item, false);
    }
    setSavedProducts((prev) => prev.filter((p) => p.id !== productId));
  };

  const handleClearHistory = () => {
    setScanHistory([]);
  };

  const handleOpenAbout = () => {
    setAboutPrivacyTab("about");
    setIsAboutPrivacyOpen(true);
  };

  const handleOpenPrivacy = () => {
    setAboutPrivacyTab("privacy");
    setIsAboutPrivacyOpen(true);
  };

  const handleOpenDisclaimer = () => {
    setAboutPrivacyTab("disclaimer");
    setIsAboutPrivacyOpen(true);
  };

  const handleSelectProduct = (p: FoodProduct, source: string = "card") => {
    setSelectedProduct(p);
    trackUserActivity({
      eventType: "PRODUCT_VIEW",
      title: `Viewed Product: ${p.name} (${p.healthScore}/100)`,
      details: {
        productId: p.id,
        productName: p.name,
        brand: p.brand,
        category: p.category,
        healthScore: p.healthScore,
        verdict: p.verdict,
        source,
      },
      user,
    });
  };

  const handleNavigateTab = (tab: "home" | "scanner" | "saved" | "history" | "gym" | "adulteration") => {
    if (tab === "scanner") {
      handleOpenScanner();
      return;
    }
    setCurrentTab(tab);
    setSelectedProduct(null);
    trackUserActivity({
      eventType: "TAB_SWITCH",
      title: `Navigated to ${tab.toUpperCase()} screen`,
      details: { tab },
      user,
    });
  };

  const isCurrentProductSaved = selectedProduct
    ? savedProducts.some(
        (p) =>
          p.id === selectedProduct.id || p.barcode === selectedProduct.barcode
      )
    : false;

  return (
    <div
      id="ahariq-app-root"
      className={`min-h-screen w-full max-w-full font-sans antialiased selection:bg-[#10B981] selection:text-white ${
        isDark
          ? "dark bg-[#09090B] text-zinc-100"
          : "bg-[#F8FAFC] text-[#111827]"
      }`}
    >
      {/* Top Header (Visible except inside fullscreen Result view) */}
      {!selectedProduct && (
        <Header
          language={language}
          onToggleLanguage={handleToggleLanguage}
          onSelectLanguage={handleSelectLanguage}
          isDark={isDark}
          onToggleDark={handleToggleDark}
          user={user}
          onOpenAuth={() => setIsAuthOpen(true)}
          onOpenScanner={handleOpenScanner}
          savedCount={savedProducts.length}
          onNavigateTab={handleNavigateTab}
          onOpenAbout={handleOpenAbout}
          onOpenPrivacy={handleOpenPrivacy}
          onOpenDisclaimer={handleOpenDisclaimer}
          onOpenAdmin={() => setIsAdminDashboardOpen(true)}
          onOpenInstallPwa={() => setIsInstallPwaOpen(true)}
        />
      )}

      {/* Main Screen Views */}
      <main id="main-content-viewport" className="w-full max-w-full">
        {selectedProduct ? (
          <ProductResultView
            product={selectedProduct}
            onBack={() => setSelectedProduct(null)}
            language={language}
            isDark={isDark}
            isSaved={isCurrentProductSaved}
            onToggleSave={handleToggleSave}
            onSelectAlternative={(alt) => handleSelectProduct(alt, "alternative")}
          />
        ) : currentTab === "home" ? (
          <HomeScreen
            onOpenScanner={handleOpenScanner}
            onSelectProduct={(p) => handleSelectProduct(p, "home_catalog")}
            recentScans={scanHistory}
            language={language}
            isDark={isDark}
            onNavigateCategory={(cat) => {}}
            onNavigateTab={handleNavigateTab}
            user={user}
            onOpenAuth={() => setIsAuthOpen(true)}
            onOpenAbout={handleOpenAbout}
            onOpenPrivacy={handleOpenPrivacy}
            onOpenDisclaimer={handleOpenDisclaimer}
            onOpenAdmin={() => setIsAdminDashboardOpen(true)}
          />
        ) : currentTab === "saved" ? (
          <SavedListScreen
            savedProducts={savedProducts}
            onSelectProduct={(p) => handleSelectProduct(p, "saved_list")}
            onRemoveProduct={handleRemoveSaved}
            onOpenScanner={handleOpenScanner}
            language={language}
            isDark={isDark}
            user={user}
            onOpenAuth={() => setIsAuthOpen(true)}
          />
        ) : currentTab === "history" ? (
          <HistoryScreen
            scanHistory={scanHistory}
            onSelectProduct={(p) => handleSelectProduct(p, "history_list")}
            onClearHistory={handleClearHistory}
            onOpenScanner={handleOpenScanner}
            language={language}
            isDark={isDark}
            user={user}
            onOpenAuth={() => setIsAuthOpen(true)}
          />
        ) : currentTab === "gym" ? (
          <GymIQScreen
            language={language}
            isDark={isDark}
            onOpenScanner={handleOpenScanner}
            onSelectProduct={(p) => handleSelectProduct(p, "gym_iq")}
          />
        ) : currentTab === "adulteration" ? (
          <AdulterationGuideScreen language={language} isDark={isDark} />
        ) : null}
      </main>

      {/* Persistent Bottom Nav Bar (hidden when product result view is open) */}
      {!selectedProduct && (
        <BottomNav
          currentTab={currentTab}
          onSelectTab={handleNavigateTab}
          language={language}
          isDark={isDark}
          savedCount={savedProducts.length}
        />
      )}

      {/* Barcode / QR Scanner Modal */}
      <ScannerModal
        isOpen={isScannerOpen}
        onClose={() => setIsScannerOpen(false)}
        onProductScanned={handleProductScanned}
        language={language}
        isDark={isDark}
      />

      {/* About Us & Privacy Policy Modal */}
      <AboutAndPrivacyModal
        isOpen={isAboutPrivacyOpen}
        onClose={() => setIsAboutPrivacyOpen(false)}
        initialTab={aboutPrivacyTab}
        language={language}
        isDark={isDark}
      />

      {/* Auth & Dietary Preferences Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        user={user}
        onUpdateUser={(updated) => setUser(updated)}
        language={language}
        isDark={isDark}
      />

      {/* Founder & Admin Live Database Analytics Modal */}
      <AdminDashboard
        isOpen={isAdminDashboardOpen}
        onClose={() => setIsAdminDashboardOpen(false)}
        language={language}
        isDark={isDark}
        adminEmail={user.email || "admin@ahariq.app"}
      />

      {/* PWA Install Modal (Triggered exclusively from Hamburger Menu) */}
      <InstallPwaPrompt
        isOpen={isInstallPwaOpen}
        onClose={() => setIsInstallPwaOpen(false)}
        language={language}
        isDark={isDark}
      />

      {/* Vercel Web Analytics */}
      <Analytics />
    </div>
  );
}
