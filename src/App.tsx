import React, { useState, useEffect } from "react";
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
import { AuthModal } from "./components/AuthModal";
import { AboutAndPrivacyModal } from "./components/AboutAndPrivacyModal";
import { AdminDashboard } from "./components/AdminDashboard";
import {
  auth,
  recordScanToCloud,
  syncSavedItemToCloud,
  syncUserProfileToCloud,
} from "./lib/firebase";
import { onAuthStateChanged } from "firebase/auth";

export default function App() {
  // 1. Language State (English / Hindi)
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem("ahariq_language");
    return saved === "hi" || saved === "en" ? saved : "en";
  });

  // 2. Dark Mode State
  const [isDark, setIsDark] = useState<boolean>(() => {
    const saved = localStorage.getItem("ahariq_theme");
    return saved === "dark";
  });

  useEffect(() => {
    localStorage.setItem("ahariq_language", language);
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
    "home" | "scanner" | "saved" | "history" | "adulteration"
  >("home");
  const [selectedProduct, setSelectedProduct] = useState<FoodProduct | null>(
    null
  );
  const [isScannerOpen, setIsScannerOpen] = useState<boolean>(false);
  const [isAuthOpen, setIsAuthOpen] = useState<boolean>(false);
  const [isAdminDashboardOpen, setIsAdminDashboardOpen] = useState<boolean>(false);
  const [isAboutPrivacyOpen, setIsAboutPrivacyOpen] = useState<boolean>(false);
  const [aboutPrivacyTab, setAboutPrivacyTab] = useState<"about" | "privacy">(
    "about"
  );

  // 4. Saved Items ("Mere List")
  const [savedProducts, setSavedProducts] = useState<FoodProduct[]>(() => {
    try {
      const saved = localStorage.getItem("ahariq_saved");
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return [
      INDIAN_PRODUCTS_DB[3], // Slurrp Farm Millet Noodles (Clean)
      INDIAN_PRODUCTS_DB[2], // Kurkure (Watchout)
    ];
  });

  // 5. Scan History
  const [scanHistory, setScanHistory] = useState<FoodProduct[]>(() => {
    try {
      const saved = localStorage.getItem("ahariq_history");
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return [
      {
        ...INDIAN_PRODUCTS_DB[0],
        scannedAt: new Date(Date.now() - 3600000).toISOString(),
      },
      {
        ...INDIAN_PRODUCTS_DB[1],
        scannedAt: new Date(Date.now() - 7200000).toISOString(),
      },
      {
        ...INDIAN_PRODUCTS_DB[4],
        scannedAt: new Date(Date.now() - 14400000).toISOString(),
      },
    ];
  });

  // 6. User Profile
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

  // Listen to Firebase Auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (fbUser) => {
      if (fbUser) {
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
        await syncUserProfileToCloud(fbUser.uid, updated);
      }
    });
    return () => unsubscribe();
  }, []);

  // Persistence helpers
  useEffect(() => {
    localStorage.setItem("ahariq_saved", JSON.stringify(savedProducts));
  }, [savedProducts]);

  useEffect(() => {
    localStorage.setItem("ahariq_history", JSON.stringify(scanHistory));
  }, [scanHistory]);

  useEffect(() => {
    localStorage.setItem("ahariq_user", JSON.stringify(user));
  }, [user]);

  // Handlers
  const handleToggleLanguage = () => {
    setLanguage((prev) => (prev === "en" ? "hi" : "en"));
  };

  const handleToggleDark = () => {
    setIsDark((prev) => !prev);
  };

  const handleOpenScanner = () => {
    setIsScannerOpen(true);
  };

  const handleProductScanned = (product: FoodProduct) => {
    setScanHistory((prev) => {
      const filtered = prev.filter((p) => p.barcode !== product.barcode);
      return [{ ...product, scannedAt: new Date().toISOString() }, ...filtered];
    });
    setSelectedProduct(product);

    // Sync scan to Firebase Cloud
    const uid = user.id || "guest_device";
    recordScanToCloud(uid, product);
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
    } else {
      setSavedProducts((prev) => [product, ...prev]);
      syncSavedItemToCloud(uid, product, true);
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

  const isCurrentProductSaved = selectedProduct
    ? savedProducts.some(
        (p) =>
          p.id === selectedProduct.id || p.barcode === selectedProduct.barcode
      )
    : false;

  return (
    <div
      id="ahariq-app-root"
      className={`min-h-screen font-sans antialiased selection:bg-[#10B981] selection:text-white ${
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
          isDark={isDark}
          onToggleDark={handleToggleDark}
          user={user}
          onOpenAuth={() => setIsAuthOpen(true)}
          onOpenScanner={handleOpenScanner}
          savedCount={savedProducts.length}
          onNavigateTab={(tab) => {
            setCurrentTab(tab);
            setSelectedProduct(null);
          }}
          onOpenAbout={handleOpenAbout}
          onOpenPrivacy={handleOpenPrivacy}
          onOpenAdmin={() => setIsAdminDashboardOpen(true)}
        />
      )}

      {/* Main Screen Views */}
      <main id="main-content-viewport">
        {selectedProduct ? (
          <ProductResultView
            product={selectedProduct}
            onBack={() => setSelectedProduct(null)}
            language={language}
            isDark={isDark}
            isSaved={isCurrentProductSaved}
            onToggleSave={handleToggleSave}
            onSelectAlternative={(alt) => setSelectedProduct(alt)}
          />
        ) : currentTab === "home" ? (
          <HomeScreen
            onOpenScanner={handleOpenScanner}
            onSelectProduct={(p) => setSelectedProduct(p)}
            recentScans={scanHistory}
            language={language}
            isDark={isDark}
            onNavigateCategory={(cat) => {}}
            user={user}
            onOpenAuth={() => setIsAuthOpen(true)}
          />
        ) : currentTab === "saved" ? (
          <SavedListScreen
            savedProducts={savedProducts}
            onSelectProduct={(p) => setSelectedProduct(p)}
            onRemoveProduct={handleRemoveSaved}
            onOpenScanner={handleOpenScanner}
            language={language}
            isDark={isDark}
          />
        ) : currentTab === "history" ? (
          <HistoryScreen
            scanHistory={scanHistory}
            onSelectProduct={(p) => setSelectedProduct(p)}
            onClearHistory={handleClearHistory}
            onOpenScanner={handleOpenScanner}
            language={language}
            isDark={isDark}
          />
        ) : currentTab === "adulteration" ? (
          <AdulterationGuideScreen language={language} isDark={isDark} />
        ) : null}
      </main>

      {/* Persistent Bottom Nav Bar (hidden when product result view is open) */}
      {!selectedProduct && (
        <BottomNav
          currentTab={currentTab}
          onSelectTab={(tab) => {
            if (tab === "scanner") {
              handleOpenScanner();
            } else {
              setCurrentTab(tab);
              setSelectedProduct(null);
            }
          }}
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
        adminEmail={user.email || "sadiquehavari@gmail.com"}
      />
    </div>
  );
}
