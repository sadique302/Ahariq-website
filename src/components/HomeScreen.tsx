import React, { useState, useMemo, useEffect, useRef } from "react";
import { FoodProduct, Language, UserProfile } from "../types";
import { UI_TRANSLATIONS } from "../i18n/translations";
import {
  ScanLine,
  Search,
  ChevronRight,
  Clock,
  Loader2,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Flame,
  Wheat,
  Droplet,
} from "lucide-react";
import { INDIAN_PRODUCTS_DB } from "../data/indianProducts";
import { searchProductsFromOpenFoodFacts } from "../services/openFoodFacts";
import { trackUserActivity } from "../services/analyticsTracker";
import { ContactSupport } from "./ContactSupport";

interface HomeScreenProps {
  onOpenScanner: () => void;
  onSelectProduct: (product: FoodProduct) => void;
  recentScans: FoodProduct[];
  language: Language;
  isDark: boolean;
  onNavigateCategory: (categoryName: string) => void;
  onNavigateTab?: (tab: "home" | "scanner" | "saved" | "history" | "gym" | "adulteration") => void;
  user?: UserProfile;
  onOpenAuth?: () => void;
  onOpenAbout?: () => void;
  onOpenPrivacy?: () => void;
  onOpenDisclaimer?: () => void;
  onOpenAdmin?: () => void;
}

const QUICK_SEARCH_TAGS = [
  { en: "Maggi", hi: "मैगी" },
  { en: "Parle-G", hi: "पारले-जी" },
  { en: "Amul Butter", hi: "अमुल बटर" },
  { en: "Lays", hi: "लेज" },
  { en: "Bournvita", hi: "बोर्नविटा" },
  { en: "Atta", hi: "आटा" },
  { en: "Mustard Oil", hi: "सरसों तेल" },
  { en: "Slurrp Farm", hi: "स्लर्प फार्म" }
];

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onOpenScanner,
  onSelectProduct,
  recentScans,
  language,
  isDark,
  onNavigateCategory,
  onNavigateTab,
  user,
  onOpenAuth,
  onOpenAbout,
  onOpenPrivacy,
  onOpenDisclaimer,
  onOpenAdmin,
}) => {
  const isHindi = language === "hi";
  const t = UI_TRANSLATIONS[language] || UI_TRANSLATIONS["en"];
  const isOwner =
    user?.isLoggedIn &&
    (user?.email?.toLowerCase().trim() === "sadiquehavari@gmail.com" ||
      user?.email?.toLowerCase().includes("sadiquehavari") ||
      user?.role === "admin");

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isSearching, setIsSearching] = useState(false);
  const [openFoodFactsResults, setOpenFoodFactsResults] = useState<FoodProduct[]>([]);
  const searchDebounceRef = useRef<NodeJS.Timeout | null>(null);

  // Synchronous Local Matches for immediate responsiveness
  const localMatches = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) {
      if (selectedCategory === "all") return INDIAN_PRODUCTS_DB;
      return INDIAN_PRODUCTS_DB.filter(
        (p) =>
          p.category === selectedCategory ||
          (p.category && p.category.toLowerCase().includes(selectedCategory.toLowerCase()))
      );
    }

    return INDIAN_PRODUCTS_DB.filter((p) => {
      const name = (p.name || "").toLowerCase();
      const hindiName = (p.nameHindi || "").toLowerCase();
      const brand = (p.brand || "").toLowerCase();
      const category = (p.category || "").toLowerCase();
      const barcode = (p.barcode || "").toLowerCase();
      const ingredients = (p.ingredientsList || []).join(" ").toLowerCase();

      return (
        name.includes(q) ||
        hindiName.includes(q) ||
        brand.includes(q) ||
        category.includes(q) ||
        barcode.includes(q) ||
        ingredients.includes(q)
      );
    });
  }, [searchQuery, selectedCategory]);

  // Debounced Open Food Facts search
  useEffect(() => {
    const q = searchQuery.trim();
    if (searchDebounceRef.current) {
      clearTimeout(searchDebounceRef.current);
    }

    if (!q || q.length < 2) {
      setOpenFoodFactsResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    searchDebounceRef.current = setTimeout(async () => {
      try {
        const offResults = await searchProductsFromOpenFoodFacts(q, 25);
        setOpenFoodFactsResults(offResults);
        
        trackUserActivity({
          eventType: "SEARCH",
          title: `Searched: "${q}"`,
          details: { query: q, resultsCount: offResults.length },
          user,
        });
      } catch (err) {
        console.warn("Open Food Facts search error:", err);
      } finally {
        setIsSearching(false);
      }
    }, 400);

    return () => {
      if (searchDebounceRef.current) {
        clearTimeout(searchDebounceRef.current);
      }
    };
  }, [searchQuery]);

  // Combined Deduplicated Results
  const allFilteredProducts = useMemo(() => {
    const q = searchQuery.trim();
    if (!q) return localMatches;

    const combined: FoodProduct[] = [...localMatches];
    const seenBarcodes = new Set(localMatches.map((p) => p.barcode).filter(Boolean));
    const seenNames = new Set(localMatches.map((p) => (p.name || "").toLowerCase().trim()));

    for (const offItem of openFoodFactsResults) {
      const barcodeKey = offItem.barcode;
      const nameKey = (offItem.name || "").toLowerCase().trim();

      if ((!barcodeKey || !seenBarcodes.has(barcodeKey)) && !seenNames.has(nameKey)) {
        if (barcodeKey) seenBarcodes.add(barcodeKey);
        seenNames.add(nameKey);
        combined.push(offItem);
      }
    }

    return combined;
  }, [localMatches, openFoodFactsResults, searchQuery]);

  return (
    <div
      id="home-screen-view"
      className={`min-h-screen pb-28 transition-colors w-full max-w-full overflow-x-hidden ${
        isDark ? "bg-[#090C10] text-zinc-100" : "bg-[#F8FAFC] text-[#0F172A]"
      }`}
    >
      <div className="max-w-2xl mx-auto px-4 sm:px-5 py-4 sm:py-5 space-y-5 w-full">
        {/* 1. Sleek Search Input with Direct Scan Button */}
        <div className="space-y-2.5">
          <div className="relative flex items-center">
            {isSearching ? (
              <Loader2 className="w-5 h-5 absolute left-4 text-[#10B981] animate-spin pointer-events-none" />
            ) : (
              <Search className="w-5 h-5 absolute left-4 text-slate-400 pointer-events-none" />
            )}
            <input
              id="home-product-search-input"
              type="text"
              placeholder={t.searchPlaceholder || (isHindi ? "मैगी, पेप्सी, बिस्कुट, तेल खोजें..." : "Search packaged food, drinks, snacks...")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-12 pr-10 py-3.5 rounded-2xl text-sm border transition-all ${
                isDark
                  ? "bg-[#161C24] border-slate-800 text-zinc-100 placeholder:text-slate-500 focus:border-[#10B981] focus:ring-2 focus:ring-[#10B981]/20 shadow-xs"
                  : "bg-white border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-[#10B981] focus:ring-3 focus:ring-[#10B981]/15 shadow-xs"
              }`}
            />
            {searchQuery && (
              <div className="absolute right-3 flex items-center">
                <button
                  onClick={() => setSearchQuery("")}
                  className="w-7 h-7 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white flex items-center justify-center text-xs font-bold transition-colors cursor-pointer"
                >
                  ✕
                </button>
              </div>
            )}
          </div>
        </div>

        {/* 2. Prominent Quick Scan Hero Card (ALWAYS VISIBLE on Home) */}
        {!searchQuery && (
          <div
            id="hero-scan-card"
            className={`rounded-3xl p-5 sm:p-6 border transition-all relative overflow-hidden ${
              isDark
                ? "bg-gradient-to-br from-[#161C24] to-[#12171F] border-slate-800"
                : "bg-gradient-to-br from-emerald-50/60 via-white to-emerald-50/30 border-emerald-200/80 shadow-xs"
            }`}
          >
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">
              <div className="w-14 h-14 rounded-2xl bg-[#059669] text-white flex items-center justify-center flex-shrink-0 shadow-md shadow-emerald-700/20">
                <ScanLine className="w-7 h-7 animate-pulse" />
              </div>

              <div className="flex-1 space-y-1.5 w-full">
                <div className="flex items-center justify-center sm:justify-start">
                  <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white tracking-tight">
                    {t.tagline || (isHindi ? "किराना व पैकेट बारकोड स्कैन करें" : "Scan Any Packaged Food")}
                  </h2>
                </div>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-normal leading-relaxed max-w-md mx-auto sm:mx-0">
                  {language === "ar"
                    ? "تحقق فوري من زيت النخيل والسكريات المضافة والمواد الحافظة وتقييم الصحة 0-100."
                    : language === "fr"
                    ? "Vérifiez instantanément l'huile de palme, les sucres ajoutés et le score santé 0-100."
                    : language === "es"
                    ? "Comprueba al instante el aceite de palma, azúcares añadidos y puntuación de salud 0-100."
                    : isHindi
                    ? "पाम ऑयल, अतिरिक्त चीनी, प्रिजर्वेटिव्स और पोषण स्कोर 0-100 तुरंत जांचें।"
                    : "Instantly check palm oil, added sugars, food additives, and nutrition score 0-100."}
                </p>

                <div className="pt-2 flex items-center justify-center sm:justify-start">
                  <button
                    id="hero-scan-product-btn"
                    onClick={onOpenScanner}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-[#059669] hover:bg-[#047857] text-white font-bold text-sm shadow-md shadow-emerald-900/15 hover:scale-[1.02] active:scale-98 transition-all cursor-pointer w-full sm:w-auto"
                  >
                    <ScanLine className="w-4 h-4" />
                    <span>{t.scanBarcode || (isHindi ? "कैमरा खोलें और स्कैन करें" : "Open Camera & Scan")}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 3. User Recent Scans Feed (Shown when user has scanned products) */}
        {!searchQuery && selectedCategory === "all" && recentScans.length > 0 && (
          <div className="space-y-3 pt-1">
            <div className="flex items-center justify-between px-1">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#10B981]" />
                <span>{isHindi ? "हाल ही में स्कैन किए गए उत्पाद" : "Recently Scanned by You"}</span>
              </h2>
              <span className="text-xs text-slate-400 font-semibold">
                {recentScans.length} {isHindi ? "आइटम" : "Items"}
              </span>
            </div>

            <div className="space-y-2.5">
              {recentScans.slice(0, 5).map((product, idx) => {
                const isGood = product.healthScore >= 70;
                const isMed = product.healthScore >= 40 && product.healthScore < 70;

                return (
                  <div
                    key={(product.id || product.barcode) + idx}
                    onClick={() => onSelectProduct(product)}
                    className={`p-3.5 rounded-2xl border flex items-center gap-3.5 cursor-pointer hover:border-[#10B981]/50 transition-all ${
                      isDark
                        ? "bg-[#161C24] border-slate-800/80 hover:bg-[#1A222C]"
                        : "bg-white border-slate-200/80 hover:border-emerald-300 shadow-2xs"
                    }`}
                  >
                    <div className="w-13 h-13 rounded-xl bg-slate-100 dark:bg-slate-800 overflow-hidden flex-shrink-0 border border-slate-200/60 dark:border-slate-700/60">
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <span className="text-[11px] font-medium text-slate-400 block truncate">
                        {product.brand}
                      </span>
                      <h4 className="font-bold text-sm text-slate-900 dark:text-white truncate">
                        {isHindi ? product.nameHindi || product.name : product.name}
                      </h4>
                      <div className="flex items-center gap-1.5 mt-1">
                        <span
                          className={`w-2 h-2 rounded-full flex-shrink-0 ${
                            isGood ? "bg-emerald-500" : isMed ? "bg-amber-500" : "bg-red-500"
                          }`}
                        />
                        <span
                          className={`text-xs font-semibold ${
                            isGood
                              ? "text-emerald-600 dark:text-emerald-400"
                              : isMed
                              ? "text-amber-600 dark:text-amber-400"
                              : "text-red-600 dark:text-red-400"
                          }`}
                        >
                          {isGood
                            ? isHindi ? "उत्कृष्ट" : "Excellent"
                            : isMed
                            ? isHindi ? "मध्यम" : "Moderate"
                            : isHindi ? "बचने की सलाह" : "Avoid"}
                        </span>
                      </div>
                    </div>

                    {/* Circular Score Badge */}
                    <div
                      className={`w-11 h-11 rounded-xl flex flex-col items-center justify-center font-black text-white flex-shrink-0 shadow-2xs ${
                        isGood ? "bg-[#10B981]" : isMed ? "bg-amber-500" : "bg-red-500"
                      }`}
                    >
                      <span className="text-sm font-black leading-none">{product.healthScore}</span>
                      <span className="text-[7px] font-bold uppercase tracking-wider opacity-85 mt-0.5">/100</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* 4. Products List (Search Results or Curated Everyday Foods) */}
        <div className="space-y-3 pt-1">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              {searchQuery
                ? isHindi
                  ? `खोज परिणाम (${allFilteredProducts.length})`
                  : `Search Results (${allFilteredProducts.length})`
                : isHindi
                ? "लोकप्रिय भारतीय खाद्य पदार्थ"
                : "Popular Everyday Foods"}
            </h3>
            {searchQuery && (
              <span className="text-[11px] font-medium text-slate-400">
                {isHindi ? "टैप करके पोषण देखें" : "Tap to inspect"}
              </span>
            )}
          </div>

          {/* No search results found */}
          {allFilteredProducts.length === 0 && !isSearching && (
            <div
              className={`p-6 rounded-2xl border text-center space-y-3 ${
                isDark ? "bg-[#161C24] border-slate-800" : "bg-white border-slate-200"
              }`}
            >
              <Search className="w-7 h-7 text-slate-400 mx-auto" />
              <p className="text-sm font-bold text-slate-700 dark:text-slate-300">
                {isHindi ? `"${searchQuery}" नहीं मिला` : `No foods found for "${searchQuery}"`}
              </p>
              <button
                onClick={onOpenScanner}
                className="px-4 py-2 rounded-xl bg-[#059669] text-white text-xs font-bold cursor-pointer"
              >
                {isHindi ? "बारकोड स्कैन करें" : "Scan Barcode"}
              </button>
            </div>
          )}

          {/* Clean 1-Column List View (Airy & Lightweight like Yuka) */}
          <div className="space-y-2.5">
            {allFilteredProducts.map((product) => {
              const isGreen = product.healthScore >= 70;
              const isYellow = product.healthScore >= 40 && product.healthScore < 70;

              return (
                <div
                  key={product.id}
                  id={`product-card-${product.id}`}
                  onClick={() => onSelectProduct(product)}
                  className={`p-3.5 rounded-2xl border cursor-pointer hover:border-[#10B981]/60 transition-all flex items-center gap-3.5 group ${
                    isDark
                      ? "bg-[#161C24] border-slate-800/80 hover:bg-[#1A222C]"
                      : "bg-white border-slate-200/80 hover:border-emerald-300 shadow-2xs"
                  }`}
                >
                  <div className="w-13 h-13 rounded-xl bg-slate-100 dark:bg-slate-800 overflow-hidden flex-shrink-0 border border-slate-200/60 dark:border-slate-700/60">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <span className="text-[11px] font-medium text-slate-400 block truncate">
                      {product.brand}
                    </span>
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white truncate group-hover:text-[#10B981] transition-colors">
                      {isHindi ? product.nameHindi || product.name : product.name}
                    </h4>

                    {/* Verdict & Traffic Dot */}
                    <div className="flex items-center gap-1.5 mt-1">
                      <span
                        className={`w-2 h-2 rounded-full flex-shrink-0 ${
                          isGreen ? "bg-[#10B981]" : isYellow ? "bg-amber-500" : "bg-red-500"
                        }`}
                      />
                      <span
                        className={`text-xs font-semibold ${
                          isGreen
                            ? "text-emerald-600 dark:text-emerald-400"
                            : isYellow
                            ? "text-amber-600 dark:text-amber-400"
                            : "text-red-600 dark:text-red-400"
                        }`}
                      >
                        {isGreen
                          ? isHindi ? "उत्कृष्ट • सुरक्षित" : "Clean • Safe"
                          : isYellow
                          ? isHindi ? "मध्यम • सीमित" : "Moderate"
                          : isHindi ? "कम पोषण • सीमित" : "Poor • Limit"}
                      </span>
                    </div>
                  </div>

                  {/* Clean Score Pill */}
                  <div
                    className={`w-11 h-11 rounded-xl flex flex-col items-center justify-center font-black text-white flex-shrink-0 shadow-2xs ${
                      isGreen ? "bg-[#10B981]" : isYellow ? "bg-amber-500" : "bg-red-500"
                    }`}
                  >
                    <span className="text-sm font-black leading-none">{product.healthScore}</span>
                    <span className="text-[7px] font-bold uppercase tracking-wider opacity-85 mt-0.5">/100</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Support & Legal Links */}
        <ContactSupport
          language={language}
          isDark={isDark}
          onOpenAbout={onOpenAbout}
          onOpenPrivacy={onOpenPrivacy}
          onOpenDisclaimer={onOpenDisclaimer}
          onOpenAdmin={onOpenAdmin}
          isOwner={isOwner}
        />
      </div>
    </div>
  );
};
