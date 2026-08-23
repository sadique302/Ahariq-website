import React, { useState, useMemo, useEffect, useRef } from "react";
import { FoodProduct, Language, ProductCategory, UserProfile } from "../types";
import {
  ScanLine,
  Search,
  Sparkles,
  ChevronRight,
  TrendingUp,
  ShieldAlert,
  Flame,
  Wheat,
  Droplet,
  Cookie,
  Milk,
  Baby,
  HeartHandshake,
  CheckCircle2,
  AlertTriangle,
  ArrowUpRight,
  Info,
  Clock,
  Loader2,
  Globe,
  Download,
  Smartphone,
  Check,
  X
} from "lucide-react";
import { PRODUCT_CATEGORIES } from "../data/categories";
import { INDIAN_PRODUCTS_DB } from "../data/indianProducts";
import { searchProductsFromOpenFoodFacts } from "../services/openFoodFacts";
import { ContactSupport } from "./ContactSupport";

interface HomeScreenProps {
  onOpenScanner: () => void;
  onSelectProduct: (product: FoodProduct) => void;
  recentScans: FoodProduct[];
  language: Language;
  isDark: boolean;
  onNavigateCategory: (categoryName: string) => void;
  user?: UserProfile;
  onOpenAuth?: () => void;
  onOpenInstallPwa?: () => void;
  onOpenAbout?: () => void;
  onOpenPrivacy?: () => void;
  onOpenAdmin?: () => void;
}

const QUICK_SEARCH_TAGS = [
  { en: "Maggi Noodles", hi: "मैगी नूडल्स" },
  { en: "Parle-G", hi: "पारले-जी" },
  { en: "Fortune Oil", hi: "फॉर्च्यून तेल" },
  { en: "Amul Butter", hi: "अमुल बटर" },
  { en: "Bournvita", hi: "बोर्नविटा" },
  { en: "Lays Chips", hi: "लेज चिप्स" },
  { en: "Kurkure", hi: "कुरकुरे" },
  { en: "Coca Cola", hi: "कोका कोला" },
  { en: "Slurrp Farm", hi: "स्लर्प फार्म" },
  { en: "Aashirvaad Atta", hi: "आशीर्वाद आटा" }
];

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onOpenScanner,
  onSelectProduct,
  recentScans,
  language,
  isDark,
  onNavigateCategory,
  user,
  onOpenAuth,
  onOpenInstallPwa,
  onOpenAbout,
  onOpenPrivacy,
  onOpenAdmin,
}) => {
  const isHindi = language === "hi";
  const isOwner =
    user?.isLoggedIn &&
    (user?.email?.toLowerCase().trim() === "sadiquehavari@gmail.com" ||
      user?.email?.toLowerCase().includes("sadiquehavari") ||
      user?.role === "admin");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isSearching, setIsSearching] = useState(false);
  const [openFoodFactsResults, setOpenFoodFactsResults] = useState<FoodProduct[]>([]);
  const [isPwaBannerDismissed, setIsPwaBannerDismissed] = useState(() => {
    return localStorage.getItem("ahariq_pwa_banner_dismissed") === "true";
  });

  const searchDebounceRef = useRef<NodeJS.Timeout | null>(null);

  // "Aaj ka Clean Choice" (Product of the Day)
  const cleanChoiceOfTheDay = useMemo(() => {
    return INDIAN_PRODUCTS_DB.find((p) => p.id === "slurrp-farm-millet-noodles") || INDIAN_PRODUCTS_DB[3];
  }, []);

  // Synchronous Local Matches for immediate feedback
  const localMatches = useMemo(() => {
    return INDIAN_PRODUCTS_DB.filter((p) => {
      const q = searchQuery.trim().toLowerCase();
      const matchSearch =
        q === "" ||
        p.name.toLowerCase().includes(q) ||
        p.nameHindi.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        (p.barcode && p.barcode.includes(q));

      const matchCategory =
        selectedCategory === "all" || p.category === selectedCategory;

      return matchSearch && matchCategory;
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
        const offResults = await searchProductsFromOpenFoodFacts(q, 30);
        setOpenFoodFactsResults(offResults);
      } catch (err) {
        console.warn("Open Food Facts search error:", err);
      } finally {
        setIsSearching(false);
      }
    }, 350);

    return () => {
      if (searchDebounceRef.current) {
        clearTimeout(searchDebounceRef.current);
      }
    };
  }, [searchQuery]);

  // Combined Results (Local DB + Open Food Facts DB with deduplication)
  const allFilteredProducts = useMemo(() => {
    if (!searchQuery.trim()) {
      return localMatches;
    }

    const combined: FoodProduct[] = [...localMatches];
    const seenBarcodes = new Set(localMatches.map((p) => p.barcode).filter(Boolean));
    const seenNames = new Set(localMatches.map((p) => p.name.toLowerCase().trim()));

    for (const offItem of openFoodFactsResults) {
      const barcodeKey = offItem.barcode;
      const nameKey = offItem.name.toLowerCase().trim();

      if (
        (!barcodeKey || !seenBarcodes.has(barcodeKey)) &&
        !seenNames.has(nameKey)
      ) {
        if (barcodeKey) seenBarcodes.add(barcodeKey);
        seenNames.add(nameKey);
        combined.push(offItem);
      }
    }

    if (selectedCategory !== "all") {
      return combined.filter(
        (p) =>
          p.category.toLowerCase().includes(selectedCategory.toLowerCase()) ||
          p.name.toLowerCase().includes(selectedCategory.toLowerCase())
      );
    }

    return combined;
  }, [localMatches, openFoodFactsResults, searchQuery, selectedCategory]);

  const handleDismissPwaBanner = () => {
    setIsPwaBannerDismissed(true);
    localStorage.setItem("ahariq_pwa_banner_dismissed", "true");
  };

  return (
    <div
      id="home-screen-view"
      className={`min-h-screen pb-24 transition-colors w-full max-w-full overflow-x-hidden ${
        isDark ? "bg-[#09090B] text-zinc-100" : "bg-[#F8FAFC] text-[#111827]"
      }`}
    >
      <div className="max-w-3xl mx-auto px-3 sm:px-4 py-3 sm:py-4 space-y-4 w-full">
        {/* PWA Install Banner (If not dismissed) */}
        {!isPwaBannerDismissed && onOpenInstallPwa && (
          <div
            id="pwa-home-banner"
            className={`relative overflow-hidden rounded-2xl p-3 sm:p-3.5 border transition-all flex items-center justify-between gap-3 ${
              isDark
                ? "bg-gradient-to-r from-emerald-950/80 via-zinc-900 to-zinc-900 border-emerald-800/60 shadow-lg"
                : "bg-gradient-to-r from-emerald-50 via-white to-white border-emerald-200 shadow-xs"
            }`}
          >
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#059669] to-[#10B981] flex items-center justify-center text-white shadow-md shadow-[#10B981]/20 flex-shrink-0">
                <Smartphone className="w-5 h-5 text-white" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <h4 className="text-xs sm:text-sm font-black text-[#000000] dark:text-white truncate">
                    {isHindi ? "AharIQ PWA ऐप इनस्टॉल करें" : "Install AharIQ App (PWA)"}
                  </h4>
                  <span className="text-[9px] font-bold px-1.5 py-0.2 rounded-md bg-[#10B981]/20 text-[#059669] dark:text-[#34D399]">
                    1-Tap
                  </span>
                </div>
                <p className="text-[11px] text-gray-500 dark:text-zinc-400 truncate font-medium">
                  {isHindi
                    ? "फास्ट लोडिंग और बिना ब्राउज़र बार के फुल स्क्रीन स्कैनर"
                    : "Instant access, offline support & full-screen scanner"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 flex-shrink-0">
              <button
                id="pwa-banner-install-btn"
                onClick={onOpenInstallPwa}
                className="px-3 py-1.5 rounded-xl bg-[#10B981] hover:bg-[#059669] text-white font-extrabold text-xs shadow-sm flex items-center gap-1 cursor-pointer transition-all active:scale-95"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{isHindi ? "इनस्टॉल" : "Install"}</span>
              </button>
              <button
                id="pwa-banner-dismiss-btn"
                onClick={handleDismissPwaBanner}
                className="p-1 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-zinc-300 transition-colors cursor-pointer"
                title="Dismiss"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Search Bar with Live Open Food Facts Database Search */}
        <div className="relative">
          <div className="relative flex items-center">
            {isSearching ? (
              <Loader2 className="w-5 h-5 absolute left-3.5 text-[#10B981] animate-spin pointer-events-none" />
            ) : (
              <Search className="w-5 h-5 absolute left-3.5 text-gray-400 pointer-events-none" />
            )}
            <input
              id="home-product-search-input"
              type="text"
              placeholder={
                isHindi
                  ? "मैगी, पारले-जी, ब्रिटानिया, अमुल, या कोई भी भारतीय ब्रांड खोजें..."
                  : "Search Maggi, Parle-G, Britannia, Amul, or any food brand..."
              }
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-11 pr-10 py-3 rounded-2xl text-xs sm:text-sm border transition-all shadow-xs ${
                isDark
                  ? "bg-[#18181B] border-zinc-800 text-zinc-100 placeholder:text-zinc-500 focus:border-[#10B981]"
                  : "bg-white border-gray-200 text-[#111827] placeholder:text-gray-400 focus:border-[#10B981] focus:ring-2 focus:ring-[#10B981]/10"
              }`}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 w-6 h-6 rounded-full bg-gray-100 dark:bg-zinc-800 text-gray-500 hover:text-gray-800 dark:text-zinc-400 dark:hover:text-zinc-100 flex items-center justify-center text-xs font-bold transition-colors cursor-pointer"
              >
                ✕
              </button>
            )}
          </div>

          {/* Quick Search Tag Suggestions */}
          {!searchQuery && (
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-2 px-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 flex-shrink-0">
                {isHindi ? "ट्रेंडिंग:" : "Popular:"}
              </span>
              {QUICK_SEARCH_TAGS.map((tag, idx) => (
                <button
                  key={idx}
                  onClick={() => setSearchQuery(tag.en)}
                  className={`flex-shrink-0 px-2.5 py-1 rounded-lg text-[11px] font-medium border transition-colors cursor-pointer ${
                    isDark
                      ? "bg-zinc-900 border-zinc-800 text-zinc-300 hover:border-emerald-500/50 hover:text-emerald-400"
                      : "bg-gray-50 border-gray-200 text-gray-700 hover:border-emerald-400 hover:text-emerald-700"
                  }`}
                >
                  {isHindi ? tag.hi : tag.en}
                </button>
              ))}
            </div>
          )}

          {/* Live Search Indicator */}
          {isSearching && (
            <div className="flex items-center gap-2 mt-2 px-2 text-xs font-bold text-[#059669] dark:text-[#34D399] animate-pulse">
              <Sparkles className="w-3.5 h-3.5 text-[#10B981] animate-spin" />
              <span>
                {isHindi
                  ? "🔍 उत्पाद सामग्री और न्यूट्रिशन डेटा खोज रहे हैं..."
                  : "🔍 Searching product ingredients & nutrition data..."}
              </span>
            </div>
          )}
        </div>

        {/* HERO CARD: Deep Emerald Gradient Card with Scan Button */}
        {!searchQuery && (
          <div
            id="hero-scan-card"
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#064E3B] via-[#047857] to-[#10B981] p-5 text-white shadow-xl shadow-[#047857]/20"
          >
            <div className="absolute -right-6 -bottom-6 w-44 h-44 rounded-full bg-[#10B981]/30 blur-2xl pointer-events-none" />
            <div className="absolute right-6 top-6 w-20 h-20 rounded-full border border-white/20 pointer-events-none animate-ping duration-1000" />

            <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1.5 flex-1">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 border border-white/30 text-[11px] font-bold text-white backdrop-blur-sm">
                  <span className="text-sm leading-none">🌾</span>
                  <span>{isHindi ? "शुद्धता और स्वास्थ्य ऑडिट" : "Instant Health & Adulteration Audit"}</span>
                </div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight leading-tight text-white">
                  {isHindi ? "खाद्य उत्पाद स्कैन करें" : "Scan Indian Food"}
                </h1>
                <p className="text-xs text-emerald-50 max-w-md leading-relaxed font-medium">
                  {isHindi
                    ? "पाम ऑयल, मैदा, कृत्रिम रंग (INS), अतिरिक्त चीनी व मिलावट का तुरंत पता लगाएं।"
                    : "Detect Palm Oil, Refined Maida, INS chemical codes, and find clean Indian alternatives."}
                </p>
              </div>

              <button
                id="hero-scan-product-btn"
                onClick={onOpenScanner}
                className="group flex-shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-[#09090B] font-extrabold text-xs shadow-md hover:bg-gray-100 hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                <div className="w-6 h-6 rounded-full bg-[#10B981] text-white flex items-center justify-center group-hover:rotate-12 transition-transform">
                  <ScanLine className="w-3.5 h-3.5 animate-pulse" />
                </div>
                <span>{isHindi ? "स्कैनर शुरू करें" : "Scan Product"}</span>
              </button>
            </div>
          </div>
        )}

        {/* “Aaj ka Clean Choice” (Product of the Day) */}
        {!searchQuery && cleanChoiceOfTheDay && (
          <div
            id="aaj-ka-clean-choice-card"
            className={`rounded-2xl p-4 border transition-all ${
              isDark ? "bg-[#18181B] border-zinc-800" : "bg-white border-gray-200 shadow-xs"
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-pulse" />
                <h3 className="text-xs font-black text-[#059669] dark:text-[#34D399] uppercase tracking-wider">
                  {isHindi ? "🌾 आज का क्लीन चॉइस (Aaj ka Clean Choice)" : "🌾 Clean Choice of the Day"}
                </h3>
              </div>
              <span className="text-[10px] text-gray-400 font-mono font-bold">100% CLEAN</span>
            </div>

            <div
              onClick={() => onSelectProduct(cleanChoiceOfTheDay)}
              className="flex items-center gap-4 cursor-pointer group"
            >
              <div className="w-16 h-16 rounded-2xl overflow-hidden bg-gray-100 dark:bg-zinc-800 flex-shrink-0 border border-gray-200 dark:border-zinc-700">
                <img
                  src={cleanChoiceOfTheDay.imageUrl}
                  alt={cleanChoiceOfTheDay.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="flex-1 min-w-0">
                <span className="text-[11px] font-bold text-amber-600 dark:text-amber-400 block">
                  {cleanChoiceOfTheDay.brand}
                </span>
                <h4 className="font-bold text-sm text-[#000000] dark:text-white truncate group-hover:text-[#10B981] transition-colors mt-0.5">
                  {isHindi ? cleanChoiceOfTheDay.nameHindi : cleanChoiceOfTheDay.name}
                </h4>
                <p className="text-[11px] text-gray-600 dark:text-zinc-400 line-clamp-1 mt-0.5 font-medium">
                  {isHindi ? cleanChoiceOfTheDay.summaryHi : cleanChoiceOfTheDay.summaryEn}
                </p>
              </div>

              <div className="flex flex-col items-end flex-shrink-0">
                <div className="px-3 py-1 rounded-xl bg-[#10B981] text-white font-extrabold text-xs shadow-xs">
                  {cleanChoiceOfTheDay.healthScore}/100
                </div>
                <span className="text-[10px] text-[#059669] dark:text-[#34D399] font-bold mt-1 flex items-center">
                  <span>{isHindi ? "देखें" : "View"}</span>
                  <ChevronRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Categories Selector Horizontal Pills */}
        <div className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-sm sm:text-base font-black uppercase tracking-wider text-[#000000] dark:text-zinc-200">
              {isHindi ? "श्रेणियां (Categories)" : "Explore Categories"}
            </h2>
            {selectedCategory !== "all" && (
              <button
                onClick={() => setSelectedCategory("all")}
                className="text-xs text-[#10B981] font-bold hover:underline cursor-pointer"
              >
                {isHindi ? "सभी देखें" : "View All"}
              </button>
            )}
          </div>

          <div className="flex gap-2.5 overflow-x-auto no-scrollbar pb-1">
            {PRODUCT_CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  id={`cat-pill-${cat.id}`}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex-shrink-0 px-3.5 py-2 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 cursor-pointer ${
                    isSelected
                      ? "bg-[#09090B] text-white border-[#09090B] dark:bg-[#10B981] dark:border-[#10B981] shadow-sm"
                      : isDark
                      ? "bg-[#18181B] border-zinc-800 text-zinc-300 hover:bg-zinc-800"
                      : "bg-white border-gray-200 text-[#111827] hover:bg-gray-50"
                  }`}
                >
                  <span>{isHindi ? cat.nameHi : cat.nameEn}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Recent Scans (Shown when not searching) */}
        {!searchQuery && recentScans.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center justify-between px-1">
              <h2 className="text-sm sm:text-base font-black uppercase tracking-wider text-[#000000] dark:text-zinc-200 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#10B981]" />
                <span>{isHindi ? "हालिया स्कैन (Recent Scans)" : "Recently Scanned"}</span>
              </h2>
              <span className="text-xs text-gray-500 dark:text-zinc-400 font-bold">{recentScans.length} {isHindi ? "उत्पाद" : "items"}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {recentScans.slice(0, 4).map((product) => (
                <div
                  key={product.id + (product.scannedAt || "")}
                  onClick={() => onSelectProduct(product)}
                  className={`p-4 rounded-2xl border flex items-center gap-4 cursor-pointer hover:border-[#10B981]/60 transition-all ${
                    isDark ? "bg-[#18181B] border-zinc-800" : "bg-white border-gray-200 shadow-xs"
                  }`}
                >
                  <div className="w-14 h-14 rounded-2xl bg-gray-100 dark:bg-zinc-800 overflow-hidden flex-shrink-0 border border-gray-200 dark:border-zinc-700">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-sm text-[#000000] dark:text-zinc-100 truncate">
                      {isHindi ? product.nameHindi : product.name}
                    </h4>
                    <p className="text-[11px] text-gray-500 font-medium">{product.brand}</p>
                    <span
                      className={`text-[9px] font-bold px-2 py-0.5 rounded-full mt-1 inline-block ${
                        product.verdictType === "green"
                          ? "bg-emerald-50 text-[#059669] dark:bg-emerald-950/60 dark:text-[#34D399] border border-emerald-200/80 dark:border-emerald-800/60"
                          : product.verdictType === "yellow"
                          ? "bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-200/80 dark:border-amber-800/60"
                          : "bg-red-50 text-red-700 dark:bg-red-950/60 dark:text-red-300 border border-red-200/80 dark:border-red-800/60"
                      }`}
                    >
                      {product.verdict}
                    </span>
                  </div>
                  <div
                    className={`w-10 h-10 rounded-2xl flex items-center justify-center font-black text-xs text-white flex-shrink-0 ${
                      product.healthScore >= 70
                        ? "bg-[#10B981]"
                        : product.healthScore >= 40
                        ? "bg-amber-500"
                        : "bg-red-600"
                    }`}
                  >
                    {product.healthScore}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Product Results List (Local + Open Food Facts Live Database) */}
        <div className="space-y-3 pt-1">
          <div className="flex items-center justify-between px-1">
            <div>
              <h2 className="text-base sm:text-lg font-black tracking-tight text-[#000000] dark:text-zinc-100">
                {searchQuery
                  ? isHindi
                    ? `खोज परिणाम (${allFilteredProducts.length})`
                    : `Search Results (${allFilteredProducts.length})`
                  : isHindi
                  ? "लोकप्रिय भारतीय खाद्य उत्पाद"
                  : "Popular Packaged Foods Database"}
              </h2>
              {searchQuery && (
                <p className="text-[11px] text-gray-500 dark:text-zinc-400 font-medium">
                  {isHindi
                    ? "ओपन फूड फैक्ट्स (Open Food Facts) व AharIQ लैब डेटाबेस से लाइव परिणाम"
                    : "Live results from Open Food Facts India/Global & AharIQ Lab"}
                </p>
              )}
            </div>
            <span className="text-xs font-bold text-[#10B981]">
              {allFilteredProducts.length} {isHindi ? "उत्पाद" : "Products"}
            </span>
          </div>

          {/* Empty State / Not Found in Database */}
          {allFilteredProducts.length === 0 && !isSearching && (
            <div
              id="search-no-results-card"
              className={`p-6 rounded-3xl border text-center space-y-3 ${
                isDark ? "bg-[#18181B] border-zinc-800" : "bg-white border-gray-200"
              }`}
            >
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-500 mx-auto flex items-center justify-center">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="text-sm sm:text-base font-bold text-gray-900 dark:text-zinc-100">
                {isHindi
                  ? `"${searchQuery}" के लिए कोई परिणाम नहीं मिला`
                  : `No exact matches for "${searchQuery}"`}
              </h3>
              <p className="text-xs text-gray-500 dark:text-zinc-400 max-w-sm mx-auto">
                {isHindi
                  ? "क्या यह उत्पाद आपके पास मौजूद है? बारकोड स्कैन करें या सामग्री लेबल की फोटो खींचें, हमारा AI तुरंत स्वास्थ्य ऑडिट करेगा!"
                  : "Have this packaged item in hand? Scan its barcode or take a photo of the ingredients table for instant ICMR health audit!"}
              </p>
              <button
                onClick={onOpenScanner}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#10B981] hover:bg-[#059669] text-white font-bold text-xs shadow-md transition-all cursor-pointer"
              >
                <ScanLine className="w-4 h-4" />
                <span>{isHindi ? "स्कैनर से फोटो लें / बारकोड स्कैन करें" : "Scan Barcode or Label Photo"}</span>
              </button>
            </div>
          )}

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {allFilteredProducts.map((product) => {
              const isGreen = product.healthScore >= 70;
              const isYellow = product.healthScore >= 40 && product.healthScore < 70;
              const isOFF = product.id.startsWith("off_");

              return (
                <div
                  key={product.id}
                  id={`product-card-${product.id}`}
                  onClick={() => onSelectProduct(product)}
                  className={`p-4 rounded-2xl border cursor-pointer hover:border-[#10B981]/60 transition-all flex items-start gap-4 group ${
                    isDark ? "bg-[#18181B] border-zinc-800" : "bg-white border-gray-200 shadow-xs"
                  }`}
                >
                  <div className="w-16 h-16 rounded-2xl bg-gray-100 dark:bg-zinc-800 overflow-hidden flex-shrink-0 border border-gray-200 dark:border-zinc-700 relative">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-1 left-1 w-4 h-4 bg-white rounded border border-gray-300 flex items-center justify-center shadow-xs">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          product.isVegetarian ? "bg-[#10B981]" : "bg-amber-800"
                        }`}
                      />
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400 truncate">
                        {product.brand}
                      </span>
                      {isOFF && (
                        <span className="text-[8px] font-bold px-1.5 py-0.2 rounded bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 flex-shrink-0">
                          OpenFoodFacts
                        </span>
                      )}
                    </div>
                    <h3 className="font-bold text-sm text-[#000000] dark:text-zinc-100 truncate group-hover:text-[#10B981] transition-colors mt-0.5">
                      {isHindi ? product.nameHindi : product.name}
                    </h3>

                    {/* Key hazard warning pills in Exposr style */}
                    <div className="flex flex-wrap gap-1 mt-2">
                      {product.warnings.slice(0, 2).map((w, idx) => (
                        <span
                          key={idx}
                          className="text-[9px] font-semibold px-2 py-0.5 rounded-full bg-red-50 text-red-700 dark:bg-red-950/60 dark:text-red-300 border border-red-200/80 dark:border-red-800/60"
                        >
                          {w.titleEn.split(" ")[0]}
                        </span>
                      ))}
                      {product.warnings.length === 0 && (
                        <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-[#059669] dark:bg-emerald-950/60 dark:text-[#34D399] border border-emerald-200/80 dark:border-emerald-800/60">
                          100% Clean
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Score Pill */}
                  <div className="flex flex-col items-end flex-shrink-0">
                    <div
                      className={`w-10 h-10 rounded-2xl flex flex-col items-center justify-center font-black text-xs text-white shadow-xs ${
                        isGreen
                          ? "bg-[#10B981]"
                          : isYellow
                          ? "bg-amber-500"
                          : "bg-red-600"
                      }`}
                    >
                      <span>{product.healthScore}</span>
                      <span className="text-[8px] font-bold opacity-80 leading-none">/100</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* "Indian Grocery Reality Check" Educational Mini Banner */}
        {!searchQuery && (
          <div
            className={`p-4 rounded-3xl border ${
              isDark ? "bg-[#18181B] border-zinc-800" : "bg-emerald-50/70 border-emerald-200"
            }`}
          >
            <div className="flex items-center gap-2 text-[#059669] dark:text-[#34D399] font-black text-sm mb-3">
              <Info className="w-4 h-4 text-[#10B981]" />
              <span>{isHindi ? "भारतीय किराना हकीकत (Indian Food Reality Check)" : "Indian Grocery Truths"}</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-[#111827] dark:text-zinc-300">
              <div className="p-3.5 rounded-2xl bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800">
                <strong className="text-amber-800 dark:text-amber-400 block font-bold text-xs">
                  {isHindi ? "1. '100% आटा' बिस्कुट का सच" : "1. The '100% Atta' Biscuit Myth"}
                </strong>
                <p className="text-[11px] mt-1 leading-relaxed text-[#111827] dark:text-zinc-300">
                  {isHindi
                    ? "कई ब्रांड्स में 20% आटा और 80% मैदा व पाम ऑयल होता है।"
                    : "Many 'digestive' biscuits contain up to 55% Maida and Palmolein shortening."}
                </p>
              </div>
              <div className="p-3.5 rounded-2xl bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800">
                <strong className="text-amber-800 dark:text-amber-400 block font-bold text-xs">
                  {isHindi ? "2. रिफाइंड तेल में हेक्सेन सॉल्वेंट" : "2. Hexane in Refined Cooking Oils"}
                </strong>
                <p className="text-[11px] mt-1 leading-relaxed text-[#111827] dark:text-zinc-300">
                  {isHindi
                    ? "केमिकल रिफाइनिंग से तेल के प्राकृतिक पोषक तत्व नष्ट हो जाते हैं।"
                    : "Industrial solvent extraction strips natural antioxidants. Prefer cold-pressed Kacchi Ghani."}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* CONTACT SUPPORT FOOTER SECTION */}
        <ContactSupport
          language={language}
          isDark={isDark}
          onOpenAbout={onOpenAbout}
          onOpenPrivacy={onOpenPrivacy}
          onOpenAdmin={onOpenAdmin}
          onOpenInstallPwa={onOpenInstallPwa}
          isOwner={isOwner}
        />
      </div>
    </div>
  );
};
