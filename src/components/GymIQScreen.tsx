import React, { useState, useMemo } from "react";
import { Language, FoodProduct } from "../types";
import {
  GYM_PRODUCTS_DATA,
  GYM_COMPARISON_PRESETS,
  GYM_GUIDES_DATA,
  GymProductItem,
  ComparisonPreset,
  GymGuideItem,
} from "../data/gymProducts";
import { INDIAN_PRODUCTS_DB } from "../data/indianProducts";
import {
  Dumbbell,
  ScanLine,
  ArrowRightLeft,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Flame,
  Award,
  Zap,
  Search,
  ChevronRight,
  Droplets,
  Wheat,
  ShieldCheck,
  Scale,
  X,
  HelpCircle,
  Check,
  TrendingUp,
} from "lucide-react";

interface GymIQScreenProps {
  language: Language;
  isDark: boolean;
  onOpenScanner: () => void;
  onSelectProduct: (product: FoodProduct) => void;
}

export const GymIQScreen: React.FC<GymIQScreenProps> = ({
  language,
  isDark,
  onOpenScanner,
  onSelectProduct,
}) => {
  const isHindi = language === "hi";

  // Comparison State
  const [selectedPresetId, setSelectedPresetId] = useState<string>("whey-vs-gainer");
  const [product1Id, setProduct1Id] = useState<string>("myprotein-impact-whey");
  const [product2Id, setProduct2Id] = useState<string>("generic-mass-gainer-extreme");
  const [activeGuide, setActiveGuide] = useState<GymGuideItem | null>(null);

  // Search & Filter in Gym Library
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // Get active products for comparison
  const product1 = useMemo(() => {
    return (
      GYM_PRODUCTS_DATA.find((p) => p.id === product1Id) ||
      GYM_PRODUCTS_DATA[0]
    );
  }, [product1Id]);

  const product2 = useMemo(() => {
    return (
      GYM_PRODUCTS_DATA.find((p) => p.id === product2Id) ||
      GYM_PRODUCTS_DATA[2]
    );
  }, [product2Id]);

  // Find active preset if any
  const currentPreset = useMemo(() => {
    return GYM_COMPARISON_PRESETS.find(
      (preset) =>
        (preset.product1Id === product1Id && preset.product2Id === product2Id) ||
        (preset.product1Id === product2Id && preset.product2Id === product1Id)
    );
  }, [product1Id, product2Id]);

  // Handle Preset selection
  const handleSelectPreset = (preset: ComparisonPreset) => {
    setSelectedPresetId(preset.id);
    setProduct1Id(preset.product1Id);
    setProduct2Id(preset.product2Id);
  };

  // Swap products
  const handleSwapProducts = () => {
    setProduct1Id(product2Id);
    setProduct2Id(product1Id);
  };

  // Determine winner dynamically
  const winnerAnalysis = useMemo(() => {
    if (currentPreset) {
      const winner =
        currentPreset.winnerId === product1.id ? product1 : product2;
      return {
        winner,
        isCustom: false,
        titleEn: currentPreset.verdictTitleEn,
        titleHi: currentPreset.verdictTitleHi,
        whyEn: currentPreset.whyWinnerEn,
        whyHi: currentPreset.whyWinnerHi,
      };
    }

    // Dynamic winner logic for custom selections
    const isP1Better = product1.fitScore >= product2.fitScore;
    const winner = isP1Better ? product1 : product2;
    const loser = isP1Better ? product2 : product1;

    const diffProtein = Math.abs(product1.proteinPer100g - product2.proteinPer100g);
    const diffSugar = Math.abs(product1.sugarPer100g - product2.sugarPer100g);

    return {
      winner,
      isCustom: true,
      titleEn: `🏆 Winner: ${winner.brand} ${winner.name}`,
      titleHi: `🏆 विजेता: ${winner.brand} ${winner.nameHindi || winner.name}`,
      whyEn: `${winner.name} wins with a higher FitScore (${winner.fitScore}/100), delivering ${winner.proteinPer100g}g protein/100g, ${winner.sugarPer100g}g sugar, and ${winner.hasPalmOil ? "contains palm oil" : "zero palm oil"} compared to ${loser.name}.`,
      whyHi: `${winner.nameHindi || winner.name} का फिट-स्कोर (${winner.fitScore}/100) बेहतर है, जिसमें ${winner.proteinPer100g}g प्रोटीन, सिर्फ ${winner.sugarPer100g}g चीनी और बिना किसी हानिकारक पाम ऑयल के शुद्ध सामग्री है।`,
    };
  }, [product1, product2, currentPreset]);

  // Filtered gym catalog
  const filteredProducts = useMemo(() => {
    return GYM_PRODUCTS_DATA.filter((item) => {
      const matchesSearch =
        searchQuery.trim() === "" ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.categoryLabelEn.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCat =
        selectedCategory === "all" || item.category === selectedCategory;

      return matchesSearch && matchesCat;
    });
  }, [searchQuery, selectedCategory]);

  // Helper to open a product in main AharIQ result view
  const handleOpenFullResult = (gymItem: GymProductItem) => {
    // Find matching in INDIAN_PRODUCTS_DB or construct temporary FoodProduct
    const existing = INDIAN_PRODUCTS_DB.find(
      (p) => p.id === gymItem.id || p.name.includes(gymItem.brand)
    );

    if (existing) {
      onSelectProduct(existing);
      return;
    }

    const constructed: FoodProduct = {
      id: gymItem.id,
      barcode: "890GYM" + Math.floor(10000000 + Math.random() * 90000000),
      name: gymItem.name,
      nameHindi: gymItem.nameHindi,
      brand: gymItem.brand,
      category: gymItem.categoryLabelEn,
      categoryHindi: gymItem.categoryLabelHi,
      imageUrl: gymItem.imageUrl,
      healthScore: gymItem.healthScore,
      verdict: gymItem.healthScore >= 70 ? "Achha Option" : "Avoid Karein",
      verdictHindi: gymItem.healthScore >= 70 ? "अच्छा विकल्प" : "बचने की सलाह",
      verdictType: gymItem.verdictType,
      summaryEn: gymItem.keyHighlightEn,
      summaryHi: gymItem.keyHighlightHi,
      isVegetarian: gymItem.isVegetarian,
      fssaiNumber: gymItem.fssaiNumber,
      packagingSize: gymItem.servingSize,
      warnings: gymItem.hasPalmOil
        ? [
            {
              type: "palm_oil",
              titleEn: "Contains Palm Oil / Hydrogenated Fats",
              titleHi: "पाम ऑयल / हाइड्रोजनीकृत वसा",
              severity: "high",
              descriptionEn: "Causes visceral fat and clogged arteries.",
              descriptionHi: "हृदय और कोलेस्ट्रॉल के लिए नुकसानदेह।",
            },
          ]
        : [],
      nutritionPer100g: {
        calories: `${gymItem.caloriesPer100g} kcal`,
        protein: `${gymItem.proteinPer100g}g`,
        carbohydrates: "Variable",
        sugar: `${gymItem.sugarPer100g}g`,
        addedSugar: gymItem.addedSugar,
        totalFat: "Variable",
        sodium: "Standard",
      },
      ingredientsList: gymItem.cleanIngredients,
      ingredientsExplanation: gymItem.cleanIngredients.map((i) => ({
        name: i,
        nameHi: i,
        purpose: "Core Nutrition",
        safety: "safe",
      })),
      adulterationCheck: {
        riskLevel: "Low",
        detailsEn: "Verified Gym IQ Product Specification.",
        detailsHi: "जिम आईक्यू द्वारा सत्यापित उत्पाद।",
      },
      cleanerAlternatives: [],
    };

    onSelectProduct(constructed);
  };

  return (
    <div
      id="gym-iq-screen"
      className={`min-h-screen pb-28 pt-2 px-4 sm:px-6 max-w-4xl mx-auto w-full transition-colors ${
        isDark ? "bg-[#09090B] text-zinc-100" : "bg-[#F8FAFC] text-[#0F172A]"
      }`}
    >
      {/* 1. Header Section */}
      <div
        id="gym-iq-header-card"
        className={`p-6 sm:p-7 rounded-3xl border relative overflow-hidden transition-all shadow-sm ${
          isDark
            ? "bg-gradient-to-br from-[#0F1D17] via-[#12161D] to-[#12161D] border-emerald-800/50"
            : "bg-gradient-to-br from-[#ECFDF5] via-white to-white border-emerald-200/80"
        }`}
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#10B981]/15 text-[#059669] dark:text-[#34D399] text-xs font-black uppercase tracking-wider border border-[#10B981]/25">
              <Dumbbell className="w-3.5 h-3.5" />
              <span>{isHindi ? "फिटनेस व न्यूट्रिशन हब" : "Gym & Fitness Engine"}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white flex items-center gap-2.5">
              <span>Gym IQ</span>
              <span className="text-sm font-extrabold px-2.5 py-0.5 rounded-lg bg-emerald-500 text-white shadow-xs">
                PRO
              </span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-medium max-w-xl">
              {isHindi
                ? "जिम के लिए बेस्ट प्रोडक्ट्स चुनें — शुद्ध प्रोटीन, जीरो पाम ऑयल और बिना चीनी वाले सप्लीमेंट्स।"
                : "Gym ke liye best products find karo — Compare Whey vs Gainer, find 100% clean Peanut Butter & spot hidden sugar traps."}
            </p>
          </div>

          {/* Quick FitScore Badge */}
          <div
            className={`p-3.5 rounded-2xl border flex items-center gap-3 flex-shrink-0 ${
              isDark
                ? "bg-[#18202A] border-emerald-800/40 text-emerald-300"
                : "bg-white border-emerald-200 text-emerald-800 shadow-2xs"
            }`}
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-[#10B981] flex items-center justify-center font-black text-base">
              ⚡
            </div>
            <div>
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                {isHindi ? "सत्यापित प्रोडक्ट्स" : "FitScore Engine"}
              </div>
              <div className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white">
                {GYM_PRODUCTS_DATA.length} {isHindi ? "जिम प्रोडक्ट्स" : "Verified Items"}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Features Grid (Cards Layout) */}
      <div className="mt-6 space-y-3">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-amber-500" />
            <span>{isHindi ? "जिम आईक्यू मुख्य सुविधाएं" : "Gym IQ Core Modules"}</span>
          </h2>
          <span className="text-[11px] text-slate-400 font-medium">6 Tools & Guides</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {/* Card 1: Scan for Gym */}
          <button
            id="gym-feature-scan-btn"
            onClick={onOpenScanner}
            className={`p-4 sm:p-5 rounded-3xl border text-left transition-all group cursor-pointer relative overflow-hidden active:scale-[0.98] ${
              isDark
                ? "bg-[#141A22] border-emerald-800/60 hover:border-emerald-500 hover:bg-[#18222E]"
                : "bg-white border-emerald-200 hover:border-emerald-400 hover:bg-emerald-50/40 shadow-2xs"
            }`}
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#059669] to-[#10B981] text-white flex items-center justify-center shadow-md shadow-emerald-500/25 mb-3 group-hover:scale-110 transition-transform">
              <ScanLine className="w-5 h-5" />
            </div>
            <div className="flex items-center justify-between gap-1">
              <h3 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white group-hover:text-[#10B981] transition-colors">
                {isHindi ? "जिम के लिए स्कैन" : "Scan for Gym"}
              </h3>
              <span className="text-[10px] font-black px-1.5 py-0.5 rounded bg-[#10B981]/20 text-[#059669] dark:text-[#34D399]">
                FitScore
              </span>
            </div>
            <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 mt-1 leading-snug">
              {isHindi
                ? "प्रोटीन डेंसिटी और पाम ऑयल की जांच के लिए बारकोड स्कैन करें।"
                : "Scan any protein or food for instant Gym FitScore rating."}
            </p>
          </button>

          {/* Card 2: Compare Products */}
          <a
            id="gym-feature-compare-btn"
            href="#gym-compare-section"
            className={`p-4 sm:p-5 rounded-3xl border text-left transition-all group cursor-pointer relative overflow-hidden active:scale-[0.98] ${
              isDark
                ? "bg-[#141A22] border-emerald-800/60 hover:border-emerald-500 hover:bg-[#18222E]"
                : "bg-white border-emerald-200 hover:border-emerald-400 hover:bg-emerald-50/40 shadow-2xs"
            }`}
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-600 text-white flex items-center justify-center shadow-md shadow-indigo-500/25 mb-3 group-hover:scale-110 transition-transform">
              <ArrowRightLeft className="w-5 h-5" />
            </div>
            <div className="flex items-center justify-between gap-1">
              <h3 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white group-hover:text-indigo-400 transition-colors">
                {isHindi ? "प्रोडक्ट्स तुलना करें" : "Compare Products"}
              </h3>
              <span className="text-[10px] font-black px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-500">
                Live
              </span>
            </div>
            <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 mt-1 leading-snug">
              {isHindi
                ? "दो सप्लीमेंट्स को आमने-सामने रखकर बेहतर चुनें।"
                : "Side-by-side comparison for protein, sugar & clean label."}
            </p>
          </a>

          {/* Card 3: Best Peanut Butter */}
          <button
            id="gym-guide-pb-btn"
            onClick={() => setActiveGuide(GYM_GUIDES_DATA[0])}
            className={`p-4 sm:p-5 rounded-3xl border text-left transition-all group cursor-pointer relative overflow-hidden active:scale-[0.98] ${
              isDark
                ? "bg-[#141A22] border-slate-800 hover:border-amber-500 hover:bg-[#18222E]"
                : "bg-white border-slate-200 hover:border-amber-400 hover:bg-amber-50/30 shadow-2xs"
            }`}
          >
            <div className="w-10 h-10 rounded-2xl bg-amber-500/15 text-amber-500 flex items-center justify-center text-xl mb-3 group-hover:scale-110 transition-transform">
              🥜
            </div>
            <h3 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white group-hover:text-amber-500 transition-colors">
              {isHindi ? "बेस्ट पीनट बटर" : "Best Peanut Butter"}
            </h3>
            <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 mt-1 leading-snug">
              {isHindi
                ? "100% शुद्ध मूंगफली बनाम पाम ऑयल और चीनी वाले ब्रांड्स।"
                : "Single-ingredient purity vs hydrogenated palm oil jars."}
            </p>
          </button>

          {/* Card 4: Whey vs Gainer */}
          <button
            id="gym-guide-whey-gainer-btn"
            onClick={() => setActiveGuide(GYM_GUIDES_DATA[1])}
            className={`p-4 sm:p-5 rounded-3xl border text-left transition-all group cursor-pointer relative overflow-hidden active:scale-[0.98] ${
              isDark
                ? "bg-[#141A22] border-slate-800 hover:border-rose-500 hover:bg-[#18222E]"
                : "bg-white border-slate-200 hover:border-rose-400 hover:bg-rose-50/30 shadow-2xs"
            }`}
          >
            <div className="w-10 h-10 rounded-2xl bg-rose-500/15 text-rose-500 flex items-center justify-center text-xl mb-3 group-hover:scale-110 transition-transform">
              🥛
            </div>
            <h3 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white group-hover:text-rose-500 transition-colors">
              {isHindi ? "व्हे बनाम गेनर" : "Whey vs Gainer"}
            </h3>
            <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 mt-1 leading-snug">
              {isHindi
                ? "मास गेनर की 70% चीनी की सच्चाई और शुद्ध व्हे के फायदे।"
                : "Why gainers are sugar traps & how to make clean shakes."}
            </p>
          </button>

          {/* Card 5: High Protein Foods */}
          <button
            id="gym-guide-high-protein-btn"
            onClick={() => setActiveGuide(GYM_GUIDES_DATA[2])}
            className={`p-4 sm:p-5 rounded-3xl border text-left transition-all group cursor-pointer relative overflow-hidden active:scale-[0.98] ${
              isDark
                ? "bg-[#141A22] border-slate-800 hover:border-emerald-500 hover:bg-[#18222E]"
                : "bg-white border-slate-200 hover:border-emerald-400 hover:bg-emerald-50/30 shadow-2xs"
            }`}
          >
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/15 text-emerald-500 flex items-center justify-center text-xl mb-3 group-hover:scale-110 transition-transform">
              🍳
            </div>
            <h3 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white group-hover:text-emerald-500 transition-colors">
              {isHindi ? "हाई प्रोटीन फूड्स" : "High Protein Foods"}
            </h3>
            <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 mt-1 leading-snug">
              {isHindi
                ? "सोया, अंडे, पनीर, ग्रीक योगर्ट और सत्तू का प्रोटीन चार्ट।"
                : "Indian veg & non-veg sources ranked by protein per rupee."}
            </p>
          </button>

          {/* Card 6: Pre & Post Workout */}
          <button
            id="gym-guide-pre-post-btn"
            onClick={() => setActiveGuide(GYM_GUIDES_DATA[3])}
            className={`p-4 sm:p-5 rounded-3xl border text-left transition-all group cursor-pointer relative overflow-hidden active:scale-[0.98] ${
              isDark
                ? "bg-[#141A22] border-slate-800 hover:border-amber-500 hover:bg-[#18222E]"
                : "bg-white border-slate-200 hover:border-amber-400 hover:bg-amber-50/30 shadow-2xs"
            }`}
          >
            <div className="w-10 h-10 rounded-2xl bg-amber-500/15 text-amber-500 flex items-center justify-center text-xl mb-3 group-hover:scale-110 transition-transform">
              ⚡
            </div>
            <h3 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white group-hover:text-amber-500 transition-colors">
              {isHindi ? "प्री व पोस्ट वर्कआउट" : "Pre & Post Workout"}
            </h3>
            <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 mt-1 leading-snug">
              {isHindi
                ? "वर्कआउट से पहले और बाद में क्या खाएं ताकि तुरंत ताकत मिले।"
                : "Clean fuel timing: banana & coffee pre, protein post-workout."}
            </p>
          </button>
        </div>
      </div>

      {/* 3. MAIN HIGHLIGHT: SIDE-BY-SIDE COMPARE FEATURE */}
      <section id="gym-compare-section" className="mt-8 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-1">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#059669] dark:text-[#34D399]">
              <Scale className="w-3.5 h-3.5" />
              <span>{isHindi ? "लाइव तुलना टूल" : "Side-by-Side Comparator"}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              {isHindi ? "दो प्रोडक्ट्स की तुलना करें (Compare)" : "Compare Products Head-to-Head"}
            </h2>
          </div>
          <span className="text-xs text-slate-500 dark:text-slate-400">
            {isHindi ? "प्रोटीन, चीनी और शुद्धता की तुलना" : "Compare Protein, Sugar, Palm Oil & Winner"}
          </span>
        </div>

        {/* Preset Quick Selectors */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap pl-1">
            {isHindi ? "पॉपुलर मुकाबले:" : "Matchups:"}
          </span>
          {GYM_COMPARISON_PRESETS.map((preset) => {
            const isSelected = selectedPresetId === preset.id;
            return (
              <button
                key={preset.id}
                onClick={() => handleSelectPreset(preset)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-extrabold whitespace-nowrap border transition-all cursor-pointer flex items-center gap-1.5 ${
                  isSelected
                    ? "bg-[#059669] text-white border-[#059669] shadow-sm scale-102"
                    : isDark
                    ? "bg-[#141A22] border-slate-800 text-slate-300 hover:border-slate-700"
                    : "bg-white border-slate-200 text-slate-700 hover:border-slate-300 shadow-2xs"
                }`}
              >
                <span>{isHindi ? preset.titleHi : preset.titleEn}</span>
                <span className="text-[10px] opacity-80">{preset.tag}</span>
              </button>
            );
          })}
        </div>

        {/* Custom Product Selection Dropdowns & Swap Control */}
        <div
          className={`p-4 sm:p-5 rounded-3xl border transition-all ${
            isDark ? "bg-[#12171F] border-slate-800" : "bg-white border-slate-200/90 shadow-sm"
          }`}
        >
          <div className="grid grid-cols-1 sm:grid-cols-11 gap-3 items-center">
            {/* Product 1 Selector */}
            <div className="sm:col-span-5 space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                <span>📦 {isHindi ? "पहला प्रोडक्ट (Product 1)" : "Product 1"}</span>
              </label>
              <select
                id="compare-product-1-select"
                value={product1Id}
                onChange={(e) => {
                  setProduct1Id(e.target.value);
                  setSelectedPresetId("");
                }}
                className={`w-full p-2.5 text-xs sm:text-sm font-bold rounded-2xl border transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer ${
                  isDark
                    ? "bg-[#18202A] border-slate-700 text-white"
                    : "bg-slate-50 border-slate-200 text-slate-900"
                }`}
              >
                {GYM_PRODUCTS_DATA.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.brand} - {item.name} ({item.proteinPer100g}g Protein)
                  </option>
                ))}
              </select>
            </div>

            {/* Swap Button */}
            <div className="sm:col-span-1 flex justify-center py-1">
              <button
                id="compare-swap-btn"
                onClick={handleSwapProducts}
                className="p-2.5 rounded-full bg-emerald-500 text-white shadow-md shadow-emerald-500/25 hover:rotate-180 transition-transform cursor-pointer active:scale-95"
                title="Swap Products"
              >
                <ArrowRightLeft className="w-4 h-4" />
              </button>
            </div>

            {/* Product 2 Selector */}
            <div className="sm:col-span-5 space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                <span>📦 {isHindi ? "दूसरा प्रोडक्ट (Product 2)" : "Product 2"}</span>
              </label>
              <select
                id="compare-product-2-select"
                value={product2Id}
                onChange={(e) => {
                  setProduct2Id(e.target.value);
                  setSelectedPresetId("");
                }}
                className={`w-full p-2.5 text-xs sm:text-sm font-bold rounded-2xl border transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer ${
                  isDark
                    ? "bg-[#18202A] border-slate-700 text-white"
                    : "bg-slate-50 border-slate-200 text-slate-900"
                }`}
              >
                {GYM_PRODUCTS_DATA.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.brand} - {item.name} ({item.proteinPer100g}g Protein)
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* CLEAR WINNER BANNER */}
        <div
          id="compare-winner-banner"
          className={`p-5 sm:p-6 rounded-3xl border transition-all shadow-md ${
            isDark
              ? "bg-gradient-to-br from-[#0F281E] via-[#141E28] to-[#141E28] border-emerald-700/60"
              : "bg-gradient-to-br from-emerald-50 via-white to-white border-emerald-300"
          }`}
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-400 to-amber-600 text-white flex items-center justify-center text-2xl shadow-md flex-shrink-0">
                🏆
              </div>
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-emerald-500/20 text-[#059669] dark:text-[#34D399] text-[11px] font-black uppercase">
                  <span>{isHindi ? "जिम आईक्यू का फैसला" : "AharIQ Verdict"}</span>
                </div>
                <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
                  {isHindi ? winnerAnalysis.titleHi : winnerAnalysis.titleEn}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-medium leading-relaxed max-w-2xl">
                  {isHindi ? winnerAnalysis.whyHi : winnerAnalysis.whyEn}
                </p>
              </div>
            </div>

            <button
              onClick={() => handleOpenFullResult(winnerAnalysis.winner)}
              className="px-4 py-2 rounded-2xl bg-[#059669] hover:bg-[#047857] text-white text-xs font-extrabold shadow-md flex items-center gap-1.5 whitespace-nowrap cursor-pointer flex-shrink-0"
            >
              <span>{isHindi ? "विस्तृत रिपोर्ट देखें" : "View Full Scan"}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* SIDE-BY-SIDE COMPARISON MATRIX TABLE */}
        <div
          className={`rounded-3xl border overflow-hidden transition-all shadow-sm ${
            isDark ? "bg-[#12171F] border-slate-800" : "bg-white border-slate-200"
          }`}
        >
          {/* Header row: Product Cards */}
          <div className="grid grid-cols-2 divide-x divide-slate-200 dark:divide-slate-800 border-b border-slate-200 dark:border-slate-800">
            {/* Column 1 */}
            <div
              className={`p-4 sm:p-5 flex flex-col items-center text-center relative ${
                product1.id === winnerAnalysis.winner.id
                  ? isDark
                    ? "bg-emerald-950/20"
                    : "bg-emerald-50/50"
                  : ""
              }`}
            >
              {product1.id === winnerAnalysis.winner.id && (
                <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-full bg-emerald-500 text-white text-[10px] font-black uppercase shadow-xs">
                  🏆 Winner
                </div>
              )}
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center shadow-xs">
                <img
                  src={product1.imageUrl}
                  alt={product1.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className="text-[11px] font-bold text-[#059669] dark:text-[#34D399] mt-2">
                {product1.brand}
              </span>
              <h4 className="font-extrabold text-xs sm:text-sm text-slate-900 dark:text-white line-clamp-2 mt-0.5">
                {isHindi ? product1.nameHindi || product1.name : product1.name}
              </h4>
              <div className="mt-2 flex items-center gap-1.5">
                <span
                  className={`px-2.5 py-0.5 rounded-full text-xs font-black border ${
                    product1.fitScore >= 70
                      ? "bg-emerald-50 text-[#059669] dark:bg-emerald-950/60 dark:text-[#34D399] border-emerald-200 dark:border-emerald-800"
                      : "bg-red-50 text-red-700 dark:bg-red-950/60 dark:text-red-300 border-red-200 dark:border-red-800"
                  }`}
                >
                  FitScore {product1.fitScore}/100
                </span>
              </div>
            </div>

            {/* Column 2 */}
            <div
              className={`p-4 sm:p-5 flex flex-col items-center text-center relative ${
                product2.id === winnerAnalysis.winner.id
                  ? isDark
                    ? "bg-emerald-950/20"
                    : "bg-emerald-50/50"
                  : ""
              }`}
            >
              {product2.id === winnerAnalysis.winner.id && (
                <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-full bg-emerald-500 text-white text-[10px] font-black uppercase shadow-xs">
                  🏆 Winner
                </div>
              )}
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center shadow-xs">
                <img
                  src={product2.imageUrl}
                  alt={product2.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className="text-[11px] font-bold text-[#059669] dark:text-[#34D399] mt-2">
                {product2.brand}
              </span>
              <h4 className="font-extrabold text-xs sm:text-sm text-slate-900 dark:text-white line-clamp-2 mt-0.5">
                {isHindi ? product2.nameHindi || product2.name : product2.name}
              </h4>
              <div className="mt-2 flex items-center gap-1.5">
                <span
                  className={`px-2.5 py-0.5 rounded-full text-xs font-black border ${
                    product2.fitScore >= 70
                      ? "bg-emerald-50 text-[#059669] dark:bg-emerald-950/60 dark:text-[#34D399] border-emerald-200 dark:border-emerald-800"
                      : "bg-red-50 text-red-700 dark:bg-red-950/60 dark:text-red-300 border-red-200 dark:border-red-800"
                  }`}
                >
                  FitScore {product2.fitScore}/100
                </span>
              </div>
            </div>
          </div>

          {/* Metric Comparison Rows */}
          <div className="divide-y divide-slate-200 dark:divide-slate-800 text-xs sm:text-sm">
            {/* ROW 1: PROTEIN DENSITY */}
            <div className="p-3.5 bg-slate-50/50 dark:bg-slate-900/40 font-extrabold text-slate-500 uppercase tracking-wider text-[11px] flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-emerald-500" />
                <span>{isHindi ? "प्रोटीन मात्रा (प्रति 100g)" : "Protein Density (Per 100g)"}</span>
              </span>
            </div>
            <div className="grid grid-cols-2 divide-x divide-slate-200 dark:divide-slate-800">
              <div
                className={`p-3.5 text-center font-black text-base sm:text-lg ${
                  product1.proteinPer100g >= product2.proteinPer100g
                    ? "text-[#059669] dark:text-[#34D399] bg-emerald-50/40 dark:bg-emerald-950/20"
                    : "text-slate-700 dark:text-slate-300"
                }`}
              >
                <div>{product1.proteinPer100g}g</div>
                <div className="text-[10px] font-normal text-slate-400">
                  {product1.proteinPerServing}
                </div>
              </div>
              <div
                className={`p-3.5 text-center font-black text-base sm:text-lg ${
                  product2.proteinPer100g >= product1.proteinPer100g
                    ? "text-[#059669] dark:text-[#34D399] bg-emerald-50/40 dark:bg-emerald-950/20"
                    : "text-slate-700 dark:text-slate-300"
                }`}
              >
                <div>{product2.proteinPer100g}g</div>
                <div className="text-[10px] font-normal text-slate-400">
                  {product2.proteinPerServing}
                </div>
              </div>
            </div>

            {/* ROW 2: SUGAR / ADDED SUGAR */}
            <div className="p-3.5 bg-slate-50/50 dark:bg-slate-900/40 font-extrabold text-slate-500 uppercase tracking-wider text-[11px] flex items-center justify-between">
              <span>{isHindi ? "चीनी / एडेड शुगर" : "Sugar & Added Sugar"}</span>
            </div>
            <div className="grid grid-cols-2 divide-x divide-slate-200 dark:divide-slate-800">
              <div
                className={`p-3.5 text-center font-bold ${
                  product1.sugarPer100g <= product2.sugarPer100g
                    ? "text-[#059669] dark:text-[#34D399]"
                    : "text-rose-600 dark:text-rose-400"
                }`}
              >
                <div className="text-base sm:text-lg font-black">{product1.sugarPer100g}g / 100g</div>
                <div className="text-[11px] font-medium text-slate-400">
                  {product1.addedSugar}
                </div>
              </div>
              <div
                className={`p-3.5 text-center font-bold ${
                  product2.sugarPer100g <= product1.sugarPer100g
                    ? "text-[#059669] dark:text-[#34D399]"
                    : "text-rose-600 dark:text-rose-400"
                }`}
              >
                <div className="text-base sm:text-lg font-black">{product2.sugarPer100g}g / 100g</div>
                <div className="text-[11px] font-medium text-slate-400">
                  {product2.addedSugar}
                </div>
              </div>
            </div>

            {/* ROW 3: PALM OIL & HYDROGENATED FATS */}
            <div className="p-3.5 bg-slate-50/50 dark:bg-slate-900/40 font-extrabold text-slate-500 uppercase tracking-wider text-[11px] flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Droplets className="w-3.5 h-3.5 text-rose-500" />
                <span>{isHindi ? "पाम ऑयल / हाइड्रोजनीकृत वसा" : "Palm Oil & Hydrogenated Fats"}</span>
              </span>
            </div>
            <div className="grid grid-cols-2 divide-x divide-slate-200 dark:divide-slate-800">
              <div className="p-3.5 text-center flex flex-col items-center justify-center">
                {product1.hasPalmOil ? (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-rose-500/15 text-rose-600 dark:text-rose-400 text-xs font-bold">
                    <XCircle className="w-3.5 h-3.5" />
                    <span>{isHindi ? "पाम ऑयल मौजूद ❌" : "Palm Oil Detected"}</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/15 text-[#059669] dark:text-[#34D399] text-xs font-bold">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{isHindi ? "0% पाम ऑयल ✅" : "Zero Palm Oil"}</span>
                  </span>
                )}
              </div>
              <div className="p-3.5 text-center flex flex-col items-center justify-center">
                {product2.hasPalmOil ? (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-rose-500/15 text-rose-600 dark:text-rose-400 text-xs font-bold">
                    <XCircle className="w-3.5 h-3.5" />
                    <span>{isHindi ? "पाम ऑयल मौजूद ❌" : "Palm Oil Detected"}</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/15 text-[#059669] dark:text-[#34D399] text-xs font-bold">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{isHindi ? "0% पाम ऑयल ✅" : "Zero Palm Oil"}</span>
                  </span>
                )}
              </div>
            </div>

            {/* ROW 4: MALTODEXTRIN & FILLERS */}
            <div className="p-3.5 bg-slate-50/50 dark:bg-slate-900/40 font-extrabold text-slate-500 uppercase tracking-wider text-[11px] flex items-center justify-between">
              <span>{isHindi ? "माल्टोडेक्सट्रिन व मिलावटी फिलर्स" : "Maltodextrin & Starch Fillers"}</span>
            </div>
            <div className="grid grid-cols-2 divide-x divide-slate-200 dark:divide-slate-800">
              <div className="p-3.5 text-center flex flex-col items-center justify-center">
                {product1.hasMaltodextrin ? (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-rose-500/15 text-rose-600 dark:text-rose-400 text-xs font-bold">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>{isHindi ? "सस्ती चीनी/स्टार्च भरा" : "Maltodextrin Trap"}</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/15 text-[#059669] dark:text-[#34D399] text-xs font-bold">
                    <Check className="w-3.5 h-3.5" />
                    <span>{isHindi ? "शून्य माल्टोडेक्सट्रिन" : "Zero Fillers"}</span>
                  </span>
                )}
              </div>
              <div className="p-3.5 text-center flex flex-col items-center justify-center">
                {product2.hasMaltodextrin ? (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-rose-500/15 text-rose-600 dark:text-rose-400 text-xs font-bold">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>{isHindi ? "सस्ती चीनी/स्टार्च भरा" : "Maltodextrin Trap"}</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/15 text-[#059669] dark:text-[#34D399] text-xs font-bold">
                    <Check className="w-3.5 h-3.5" />
                    <span>{isHindi ? "शून्य माल्टोडेक्सट्रिन" : "Zero Fillers"}</span>
                  </span>
                )}
              </div>
            </div>

            {/* ROW 5: CLEAN INGREDIENTS */}
            <div className="p-3.5 bg-slate-50/50 dark:bg-slate-900/40 font-extrabold text-slate-500 uppercase tracking-wider text-[11px] flex items-center justify-between">
              <span>{isHindi ? "सामग्री सूची (Ingredients)" : "Key Formulation & Ingredients"}</span>
            </div>
            <div className="grid grid-cols-2 divide-x divide-slate-200 dark:divide-slate-800">
              <div className="p-3.5 space-y-1">
                {product1.cleanIngredients.map((ing, idx) => (
                  <div key={idx} className="flex items-start gap-1.5 text-xs">
                    <Check className="w-3 h-3 text-[#10B981] flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700 dark:text-slate-300 font-medium leading-tight">
                      {ing}
                    </span>
                  </div>
                ))}
              </div>
              <div className="p-3.5 space-y-1">
                {product2.cleanIngredients.map((ing, idx) => (
                  <div key={idx} className="flex items-start gap-1.5 text-xs">
                    <Check className="w-3 h-3 text-[#10B981] flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700 dark:text-slate-300 font-medium leading-tight">
                      {ing}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* ROW 6: PRICE & ACTION */}
            <div className="p-3.5 bg-slate-50/50 dark:bg-slate-900/40 font-extrabold text-slate-500 uppercase tracking-wider text-[11px] flex items-center justify-between">
              <span>{isHindi ? "अनुमानित कीमत व विवरण" : "Estimated Price & Full Report"}</span>
            </div>
            <div className="grid grid-cols-2 divide-x divide-slate-200 dark:divide-slate-800">
              <div className="p-4 text-center space-y-2">
                <div className="font-extrabold text-xs sm:text-sm text-slate-900 dark:text-white">
                  {product1.priceEst}
                </div>
                <button
                  onClick={() => handleOpenFullResult(product1)}
                  className="w-full py-1.5 px-3 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer text-slate-800 dark:text-slate-200"
                >
                  {isHindi ? "डिटेल्स देखें" : "View Details"}
                </button>
              </div>
              <div className="p-4 text-center space-y-2">
                <div className="font-extrabold text-xs sm:text-sm text-slate-900 dark:text-white">
                  {product2.priceEst}
                </div>
                <button
                  onClick={() => handleOpenFullResult(product2)}
                  className="w-full py-1.5 px-3 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer text-slate-800 dark:text-slate-200"
                >
                  {isHindi ? "डिटेल्स देखें" : "View Details"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. VERIFIED GYM CATALOG WITH SEARCH & CATEGORIES */}
      <section className="mt-10 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-1">
          <div>
            <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">
              {isHindi ? "जिम प्रोडक्ट्स डायरेक्टरी" : "Verified Gym & High-Protein Library"}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {isHindi
                ? "शुद्ध व्हे, पीनट बटर, ओट्स और हाई प्रोटीन स्नैक्स की लिस्ट"
                : "Explore verified clean supplements & compare in 1 tap"}
            </p>
          </div>

          {/* Search bar */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder={isHindi ? "प्रोटीन, पीनट बटर सर्च करें..." : "Search Whey, PB, Creatine..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-9 pr-4 py-2 rounded-2xl text-xs font-medium border focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all ${
                isDark
                  ? "bg-[#141A22] border-slate-800 text-white placeholder-slate-500"
                  : "bg-white border-slate-200 text-slate-900 placeholder-slate-400 shadow-2xs"
              }`}
            />
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
          {[
            { id: "all", labelEn: "All Items", labelHi: "सभी" },
            { id: "whey_protein", labelEn: "Whey Protein", labelHi: "व्हे प्रोटीन" },
            { id: "peanut_butter", labelEn: "Peanut Butter", labelHi: "पीनट बटर" },
            { id: "dairy_plant_protein", labelEn: "High Protein Dairy", labelHi: "हाई प्रोटीन डेयरी" },
            { id: "oats_carbs", labelEn: "Oats & Carbs", labelHi: "ओट्स व कार्ब्स" },
            { id: "creatine", labelEn: "Creatine", labelHi: "क्रिएटिन" },
            { id: "mass_gainer", labelEn: "Mass Gainers", labelHi: "मास गेनर" },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer border ${
                selectedCategory === cat.id
                  ? "bg-[#10B981] text-white border-[#10B981] shadow-xs"
                  : isDark
                  ? "bg-[#141A22] border-slate-800 text-slate-400 hover:text-slate-200"
                  : "bg-white border-slate-200 text-slate-600 hover:text-slate-900 shadow-2xs"
              }`}
            >
              {isHindi ? cat.labelHi : cat.labelEn}
            </button>
          ))}
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {filteredProducts.map((item) => {
            const isClean = item.fitScore >= 70;
            return (
              <div
                key={item.id}
                className={`p-4.5 rounded-3xl border transition-all flex flex-col justify-between ${
                  isDark
                    ? "bg-[#12171F] border-slate-800 hover:border-slate-700"
                    : "bg-white border-slate-200 hover:border-slate-300 shadow-xs"
                }`}
              >
                <div>
                  <div className="flex items-start gap-3.5">
                    <div className="w-16 h-16 rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex-shrink-0">
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-[11px] font-bold text-[#059669] dark:text-[#34D399]">
                          {item.brand}
                        </span>
                        <span
                          className={`text-[10px] font-black px-2 py-0.5 rounded-full border ${
                            isClean
                              ? "bg-emerald-50 text-[#059669] dark:bg-emerald-950/60 dark:text-[#34D399] border-emerald-200 dark:border-emerald-800"
                              : "bg-red-50 text-red-700 dark:bg-red-950/60 dark:text-red-300 border-red-200 dark:border-red-800"
                          }`}
                        >
                          FitScore {item.fitScore}/100
                        </span>
                      </div>
                      <h4 className="font-extrabold text-xs sm:text-sm text-slate-900 dark:text-white line-clamp-1 mt-0.5">
                        {isHindi ? item.nameHindi || item.name : item.name}
                      </h4>
                      <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                        <span className="text-[11px] font-extrabold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md">
                          💪 {item.proteinPer100g}g Protein
                        </span>
                        <span className="text-[11px] font-semibold text-slate-500">
                          {item.sugarPer100g}g Sugar
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-3 leading-relaxed line-clamp-2">
                    {isHindi ? item.keyHighlightHi : item.keyHighlightEn}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                  <span className="text-xs font-bold text-slate-400">
                    {item.priceEst}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => {
                        setProduct1Id(item.id);
                        const target = document.getElementById("gym-compare-section");
                        if (target) target.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="px-2.5 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 transition-colors cursor-pointer"
                    >
                      {isHindi ? "तुलना में जोड़ें" : "Set in Compare"}
                    </button>
                    <button
                      onClick={() => handleOpenFullResult(item)}
                      className="px-3 py-1 rounded-xl bg-[#059669] hover:bg-[#047857] text-white text-xs font-bold transition-colors cursor-pointer shadow-2xs"
                    >
                      {isHindi ? "जांचें" : "View"}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. INTERACTIVE GUIDE MODAL */}
      {activeGuide && (
        <div
          id="gym-guide-modal"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200"
        >
          <div
            className={`w-full max-w-2xl max-h-[90vh] rounded-3xl border overflow-y-auto p-6 sm:p-7 space-y-5 transition-all shadow-2xl ${
              isDark ? "bg-[#10141B] border-slate-700 text-white" : "bg-white border-slate-200 text-slate-900"
            }`}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-3 pb-3 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 text-emerald-500 flex items-center justify-center text-2xl">
                  {activeGuide.icon}
                </div>
                <div>
                  <span className="text-[11px] font-black uppercase text-[#059669] dark:text-[#34D399] tracking-wider">
                    {activeGuide.badge}
                  </span>
                  <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white leading-snug">
                    {isHindi ? activeGuide.titleHi : activeGuide.titleEn}
                  </h3>
                </div>
              </div>
              <button
                onClick={() => setActiveGuide(null)}
                className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Key Takeaway Banner */}
            <div
              className={`p-4 rounded-2xl border text-xs sm:text-sm font-semibold leading-relaxed ${
                isDark
                  ? "bg-emerald-950/30 border-emerald-800/60 text-emerald-300"
                  : "bg-emerald-50 border-emerald-200 text-emerald-900"
              }`}
            >
              <div className="flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                <p>{isHindi ? activeGuide.keyTakeawayHi : activeGuide.keyTakeawayEn}</p>
              </div>
            </div>

            {/* Actionable Checklist */}
            <div className="space-y-2.5">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
                {isHindi ? "खरीदते समय चेकलिस्ट (Checklist):" : "Buyer's Actionable Checklist:"}
              </h4>
              <div className="space-y-2">
                {(isHindi ? activeGuide.checklistHi : activeGuide.checklistEn).map((check, idx) => (
                  <div
                    key={idx}
                    className={`p-3 rounded-2xl border text-xs sm:text-sm flex items-start gap-2.5 ${
                      isDark ? "bg-[#161C24] border-slate-800" : "bg-slate-50 border-slate-200"
                    }`}
                  >
                    <span className="leading-relaxed text-slate-700 dark:text-slate-200">{check}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommended Brands */}
            <div className="space-y-2.5">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#059669] dark:text-[#34D399] flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{isHindi ? "100% अनुशंसित शुद्ध ब्रांड्स (Verified Clean Choices)" : "Recommended Clean Brands"}</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {activeGuide.recommendedItems.map((item, idx) => (
                  <div
                    key={idx}
                    className={`p-3.5 rounded-2xl border ${
                      isDark
                        ? "bg-emerald-950/20 border-emerald-800/50"
                        : "bg-emerald-50/70 border-emerald-200"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-[11px] font-bold text-[#059669] dark:text-[#34D399]">
                        {item.brand}
                      </span>
                      <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-emerald-500 text-white">
                        {item.protein}
                      </span>
                    </div>
                    <h5 className="font-extrabold text-xs sm:text-sm text-slate-900 dark:text-white mt-0.5">
                      {item.name}
                    </h5>
                    <p className="text-[11px] text-slate-500 dark:text-slate-300 mt-1 leading-snug">
                      {item.why}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Red Flag Avoid Items */}
            <div className="space-y-2.5">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-rose-500 flex items-center gap-1.5">
                <XCircle className="w-3.5 h-3.5" />
                <span>{isHindi ? "इनसे बचें (Red Flags & Sugar Traps)" : "Traps to Avoid"}</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {activeGuide.avoidItems.map((item, idx) => (
                  <div
                    key={idx}
                    className={`p-3.5 rounded-2xl border ${
                      isDark
                        ? "bg-rose-950/20 border-rose-900/40"
                        : "bg-rose-50/70 border-rose-200"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-[11px] font-bold text-rose-500">
                        {item.brand}
                      </span>
                      <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-rose-500 text-white">
                        {item.badge}
                      </span>
                    </div>
                    <h5 className="font-extrabold text-xs sm:text-sm text-slate-900 dark:text-white mt-0.5">
                      {item.name}
                    </h5>
                    <p className="text-[11px] text-rose-700 dark:text-rose-300 mt-1 leading-snug">
                      {item.issue}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Close Button */}
            <div className="pt-2">
              <button
                onClick={() => setActiveGuide(null)}
                className="w-full py-3 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-extrabold hover:opacity-90 transition-opacity cursor-pointer"
              >
                {isHindi ? "समझ गया / बंद करें" : "Got it / Close Guide"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
