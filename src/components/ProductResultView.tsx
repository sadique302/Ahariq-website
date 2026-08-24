import React, { useState, useMemo, useEffect } from "react";
import { FoodProduct, Language, CleanerAlternative, IndianHazardWarning } from "../types";
import { getSmartCleanerAlternatives } from "../data/cleanAlternativesEngine";
import { getDynamicHazardSummary, getSynchronizedIngredientsExplanation } from "../services/openFoodFacts";
import {
  ArrowLeft,
  Bookmark,
  BookmarkCheck,
  Share2,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  HelpCircle,
  ShieldCheck,
  Flame,
  Wheat,
  Scale,
  ExternalLink,
  ChevronRight,
  Info,
  Droplet,
  Zap,
  Activity,
  HeartCrack,
  Tag,
  DollarSign,
  Volume2,
  VolumeX
} from "lucide-react";
import confetti from "canvas-confetti";
import { WhatsAppShareModal } from "./WhatsAppShareModal";
import { ContactSupport } from "./ContactSupport";

interface ProductResultViewProps {
  product: FoodProduct;
  onBack: () => void;
  language: Language;
  isDark: boolean;
  isSaved: boolean;
  onToggleSave: (product: FoodProduct) => void;
  onSelectAlternative: (product: FoodProduct) => void;
}

export const ProductResultView: React.FC<ProductResultViewProps> = ({
  product,
  onBack,
  language,
  isDark,
  isSaved,
  onToggleSave,
  onSelectAlternative,
}) => {
  const isHindi = language === "hi";
  const [activeTab, setActiveTab] = useState<"overview" | "ingredients" | "nutrition" | "alternatives">("overview");
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [speakingCardIndex, setSpeakingCardIndex] = useState<number | null>(null);

  // Clean up any playing speech synthesis when unmounting or switching products/language
  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [product, language]);

  // Voice playback logic for Indian Hazard Cards (Single short sentence, doctor-like tone)
  const speakHazardWarning = (warning: IndianHazardWarning, index: number) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      return;
    }

    // If already speaking this card, stop playback
    if (speakingCardIndex === index) {
      window.speechSynthesis.cancel();
      setSpeakingCardIndex(null);
      return;
    }

    // Stop any previous speech
    window.speechSynthesis.cancel();

    // Determine 1 concise line based on card type & selected language
    let textToSpeak = "";
    if (warning.type === "added_sugar") {
      textToSpeak = isHindi
        ? "इसमें 5 चम्मच चीनी है, ये रोज़ पियोगे तो शुगर का ख़तरा है।"
        : "It has 5 spoons of sugar, daily drinking can increase diabetes risk.";
    } else if (warning.type === "preservatives" || warning.type === "artificial_colours") {
      textToSpeak = isHindi
        ? "इसमें केमिकल मिलाया है, जो बच्चों के लिए ठीक नहीं है।"
        : "It contains added chemicals, not good for kids.";
    } else if (warning.type === "palm_oil" || warning.type === "trans_fat") {
      textToSpeak = isHindi
        ? "इसमें सस्ता पाम ऑयल है, जो दिल और नसों के लिए ठीक नहीं है।"
        : "It contains cheap palm oil, which is harmful for heart health.";
    } else if (warning.type === "sodium") {
      textToSpeak = isHindi
        ? "इसमें ज़रूरत से ज़्यादा नमक है, जो हाई ब्लड प्रेशर का कारण बनता है।"
        : "It has very high sodium, which increases high blood pressure risk.";
    } else if (warning.type === "maida") {
      textToSpeak = isHindi
        ? "इसमें रिफाइंड मैदा है जिसमें पोषण नहीं है, ये पाचन को ख़राब करता है।"
        : "It contains refined maida with zero nutrition, which harms gut digestion.";
    } else {
      textToSpeak = isHindi
        ? "इसमें पोषण बिल्कुल नहीं है, सिर्फ़ पानी और रंग है।"
        : "It has almost zero nutrition, just water and color.";
    }

    const utterance = new SpeechSynthesisUtterance(textToSpeak);

    // Set voice language
    if (isHindi) {
      utterance.lang = "hi-IN";
    } else {
      utterance.lang = "en-IN";
    }

    // Try finding matching Indian voice on device/browser
    const voices = window.speechSynthesis.getVoices();
    if (isHindi) {
      const hiVoice = voices.find(
        (v) => v.lang === "hi-IN" || v.lang.startsWith("hi") || v.name.toLowerCase().includes("hindi")
      );
      if (hiVoice) utterance.voice = hiVoice;
    } else {
      const enInVoice = voices.find(
        (v) => v.lang === "en-IN" || (v.lang.startsWith("en") && v.name.toLowerCase().includes("india"))
      );
      if (enInVoice) {
        utterance.voice = enInVoice;
      } else {
        const enVoice = voices.find((v) => v.lang.startsWith("en"));
        if (enVoice) utterance.voice = enVoice;
      }
    }

    utterance.rate = 0.95; // Calm, doctor-like tone
    utterance.pitch = 1.0;

    utterance.onend = () => {
      setSpeakingCardIndex(null);
    };

    utterance.onerror = () => {
      setSpeakingCardIndex(null);
    };

    setSpeakingCardIndex(index);
    window.speechSynthesis.speak(utterance);
  };

  // Compute category-specific dynamic alternatives from Firestore/Engine
  const isCleanChoice =
    product.healthScore >= 90 ||
    product.category === "water" ||
    product.category === "packaged_water" ||
    product.category === "pure_water";

  const cleanAlternatives: CleanerAlternative[] = useMemo(() => {
    if (isCleanChoice) return [];
    const dynamic = getSmartCleanerAlternatives({
      name: product.name,
      nameHindi: product.nameHindi,
      brand: product.brand,
      category: product.category,
      ingredientsText: product.ingredientsList?.join(" "),
    });
    if (dynamic && dynamic.length > 0) return dynamic;
    return product.cleanerAlternatives || [];
  }, [product, isCleanChoice]);

  // Section 2: Smart Choice? Calculation (Main Product vs Healthy Alternative Comparison)
  const smartChoice = useMemo(() => {
    if (product.healthScore >= 80) return null;

    const topAlt = cleanAlternatives && cleanAlternatives.length > 0 ? cleanAlternatives[0] : null;

    const cat = (product.category || "").toLowerCase();
    const name = (product.name || "").toLowerCase();
    const combined = `${cat} ${name}`;

    let mainPrice = 30; // default
    let isMatched = false;

    if (
      combined.includes("noodle") ||
      combined.includes("maggi") ||
      combined.includes("pasta") ||
      combined.includes("ramen") ||
      combined.includes("instant")
    ) {
      mainPrice = 30;
      isMatched = true;
    } else if (
      combined.includes("chip") ||
      combined.includes("kurkure") ||
      combined.includes("lays") ||
      combined.includes("namkeen") ||
      combined.includes("snack") ||
      combined.includes("bhujia") ||
      combined.includes("puff")
    ) {
      mainPrice = 20;
      isMatched = true;
    } else if (
      combined.includes("drink") ||
      combined.includes("cola") ||
      combined.includes("pepsi") ||
      combined.includes("coke") ||
      combined.includes("soda") ||
      combined.includes("juice") ||
      combined.includes("beverage") ||
      combined.includes("fizz") ||
      combined.includes("energy")
    ) {
      mainPrice = 40;
      isMatched = true;
    } else if (
      combined.includes("biscuit") ||
      combined.includes("cookie") ||
      combined.includes("cookies") ||
      combined.includes("bakery") ||
      combined.includes("rusk") ||
      combined.includes("cake") ||
      combined.includes("wafer")
    ) {
      mainPrice = 30;
      isMatched = true;
    } else {
      mainPrice = 30;
      isMatched = product.healthScore < 70;
    }

    if (!isMatched && !topAlt) return null;

    const healthyName = topAlt ? topAlt.name : "Healthy Alternative";
    const healthyScore = topAlt?.score || 95;

    // Parse alt price
    let healthyPrice = mainPrice + 15;
    if (topAlt?.price) {
      const match = topAlt.price.match(/\d+/);
      if (match) healthyPrice = parseInt(match[0], 10);
    } else if (topAlt?.priceEst) {
      const match = topAlt.priceEst.match(/\d+/);
      if (match) healthyPrice = parseInt(match[0], 10);
    }

    const difference = Math.max(0, healthyPrice - mainPrice);

    // Extract 2 key benefits
    let benefitsList: string[] = [];
    if (topAlt?.tags && topAlt.tags.length > 0) {
      benefitsList = topAlt.tags.slice(0, 2);
    } else if (topAlt?.benefit) {
      benefitsList = topAlt.benefit.split(",").map((s) => s.trim()).slice(0, 2);
    }
    if (benefitsList.length === 0) {
      benefitsList = ["0% Palm Oil", "High Protein"];
    }
    const benefitsStr = benefitsList.join(" + ");

    // Clean Main Name for concise display
    const cleanMainName = product.name.length > 28 ? product.name.slice(0, 28) + "..." : product.name;

    return {
      mainName: cleanMainName,
      mainPrice,
      mainScore: product.healthScore,
      healthyName,
      healthyPrice,
      healthyScore,
      difference,
      benefitsStr,
    };
  }, [product, cleanAlternatives]);

  // Dynamically resolve hazard-specific summary without generic sugar/cheeni boilerplate
  const resolvedSummary = useMemo(() => {
    const summaryHi = product.summaryHi || "";
    const isGenericHi =
      !summaryHi ||
      summaryHi.includes("इसमें रिफाइंड तेल, चीनी या प्रिजर्वेटिव्स") ||
      summaryHi.includes("इसमें घुली हुई चीनी, पाम ऑयल, मैदा या हानिकारक") ||
      ((product.name.toLowerCase().includes("lay") ||
        product.name.toLowerCase().includes("chip") ||
        product.name.toLowerCase().includes("kurkure") ||
        product.name.toLowerCase().includes("bhujia") ||
        product.name.toLowerCase().includes("namkeen") ||
        parseFloat(product.nutritionPer100g.sugar || "0") < 5) &&
        !product.warnings.some((w) => w.type === "added_sugar") &&
        summaryHi.includes("चीनी"));

    if (isGenericHi) {
      return getDynamicHazardSummary({
        score: product.healthScore,
        warnings: product.warnings,
        productName: product.name,
        ingredientsText: product.ingredientsList?.join(" ") || "",
        sugarVal: parseFloat(product.nutritionPer100g.sugar || "0"),
        sodiumMg: parseFloat(product.nutritionPer100g.sodium || "0"),
      });
    }

    return {
      summaryHi: product.summaryHi,
      summaryEn: product.summaryEn,
    };
  }, [product]);

  // Synchronize Decoder items with Hazard warnings and Indian nutritional safety rules
  const synchronizedIngredients = useMemo(() => {
    return getSynchronizedIngredientsExplanation({
      existingExplanation: product.ingredientsExplanation,
      ingredientsList: product.ingredientsList,
      warnings: product.warnings,
      healthScore: product.healthScore,
      sugarVal: parseFloat(product.nutritionPer100g?.sugar || "0"),
      sodiumMg: parseFloat(product.nutritionPer100g?.sodium || "0"),
      productName: product.name,
      isHindi,
    });
  }, [product, isHindi]);

  const handleSaveClick = () => {
    if (!isSaved) {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
      });
    }
    onToggleSave(product);
  };

  // Color helpers
  const getScoreTheme = () => {
    if (product.healthScore >= 70) {
      return {
        ring: "text-[#10B981]",
        border: "border-emerald-200 dark:border-emerald-800/60",
        bg: "bg-emerald-50 dark:bg-emerald-950/40",
        badge: "bg-emerald-50 text-[#059669] dark:bg-emerald-950/60 dark:text-[#34D399] border border-emerald-200 dark:border-emerald-800/60",
        gradient: "from-[#059669] via-[#10B981] to-[#34D399]",
        pillText: isHindi ? "✅ अच्छा विकल्प (Clean Choice)" : "✅ Clean Choice (Safe Ingredients)",
      };
    }
    if (product.healthScore >= 40) {
      return {
        ring: "text-amber-500",
        border: "border-amber-200 dark:border-amber-800/60",
        bg: "bg-amber-50 dark:bg-amber-950/40",
        badge: "bg-amber-50 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-200 dark:border-amber-800/60",
        gradient: "from-amber-500 to-yellow-600",
        pillText: isHindi ? "⚠️ सोच समझ कर (Moderate)" : "⚠️ Moderate (Consume in Moderation)",
      };
    }
    return {
      ring: "text-red-500",
      border: "border-red-200 dark:border-red-800/60",
      bg: "bg-red-50 dark:bg-red-950/40",
      badge: "bg-red-50 text-red-800 dark:bg-red-950/60 dark:text-red-300 border border-red-200 dark:border-red-800/60",
      gradient: "from-red-600 to-rose-700",
      pillText: isHindi ? "❌ बचने की सलाह (Avoid Karein)" : "❌ Avoid (Harmful / Ultra-Processed)",
    };
  };

  const theme = getScoreTheme();

  return (
    <div
      id="product-result-screen"
      className={`min-h-screen pb-24 transition-colors w-full max-w-full overflow-x-hidden ${
        isDark ? "bg-[#09090B] text-zinc-100" : "bg-[#F8FAFC] text-[#111827]"
      }`}
    >
      {/* Top Sticky Header */}
      <div
        className={`sticky top-0 z-30 px-3 sm:px-4 py-2.5 sm:py-3 border-b flex items-center justify-between backdrop-blur-md w-full max-w-full overflow-hidden ${
          isDark ? "bg-[#09090B]/90 border-zinc-800" : "bg-white/90 border-gray-200"
        }`}
      >
        <button
          id="result-back-btn"
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs font-bold px-2.5 py-1.5 rounded-xl border border-gray-200 dark:border-zinc-800 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer text-[#111827] dark:text-zinc-100 flex-shrink-0"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{isHindi ? "वापस" : "Back"}</span>
        </button>

        <span className="text-[11px] sm:text-xs font-bold font-mono tracking-wider text-gray-400 uppercase truncate px-2">
          {product.category}
        </span>

        <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
          {/* Share Button */}
          <button
            id="result-share-top-btn"
            onClick={() => setIsShareModalOpen(true)}
            className={`p-2 rounded-xl border transition-colors cursor-pointer ${
              isDark
                ? "bg-zinc-800 border-zinc-700 text-zinc-200 hover:bg-zinc-700"
                : "bg-gray-100 border-gray-200 text-gray-700 hover:bg-gray-200"
            }`}
            title="Share on WhatsApp"
          >
            <Share2 className="w-4 h-4 text-[#10B981]" />
          </button>

          {/* Bookmark Button */}
          <button
            id="result-save-top-btn"
            onClick={handleSaveClick}
            className={`p-2 rounded-xl border transition-all cursor-pointer ${
              isSaved
                ? "bg-[#10B981] text-white border-[#10B981] shadow"
                : isDark
                ? "bg-zinc-800 border-zinc-700 text-zinc-300 hover:bg-zinc-700"
                : "bg-gray-100 border-gray-200 text-gray-700 hover:bg-gray-200"
            }`}
            title="Save to My List"
          >
            {isSaved ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
          </button>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-3 sm:px-4 pt-3 sm:pt-4 space-y-4 w-full">
        {/* Main Product Hero Card */}
        <div
          className={`rounded-3xl p-5 border shadow-sm transition-all ${
            isDark ? "bg-[#18181B] border-zinc-800" : "bg-white border-gray-200"
          }`}
        >
          <div className="flex flex-col sm:flex-row items-center gap-5">
            {/* Product Image & Veg Mark */}
            <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden bg-gray-100 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 flex-shrink-0 flex items-center justify-center">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              {/* Veg / Non-Veg Indian Green/Brown Dot */}
              <div
                className="absolute top-2 left-2 w-5 h-5 bg-white rounded border border-gray-300 flex items-center justify-center shadow-sm"
                title={product.isVegetarian ? "100% Vegetarian (शाकाहारी)" : "Non-Vegetarian"}
              >
                <div
                  className={`w-2.5 h-2.5 rounded-full ${
                    product.isVegetarian ? "bg-[#10B981]" : "bg-amber-800"
                  }`}
                />
              </div>
            </div>

            {/* Product Meta & Big Health Score */}
            <div className="flex-1 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <span className="text-xs font-bold text-amber-600 dark:text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-md border border-amber-500/20">
                  {product.brand}
                </span>
                {product.fssaiNumber && (
                  <span className="text-[10px] text-gray-500 dark:text-zinc-400 font-mono">
                    FSSAI #{product.fssaiNumber.slice(0, 7)}...
                  </span>
                )}
              </div>

              <h1 className="text-xl sm:text-2xl font-black mt-1.5 leading-tight tracking-tight text-[#000000] dark:text-white">
                {isHindi ? product.nameHindi || product.name : product.name}
              </h1>

              {/* Verdict Pill */}
              <div className="mt-3 flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold border ${theme.badge} shadow-xs`}
                >
                  {theme.pillText}
                </span>
                {product.packagingSize && (
                  <span className="text-[11px] text-gray-500 dark:text-zinc-400 font-medium">
                    ({product.packagingSize})
                  </span>
                )}
              </div>
            </div>

            {/* Radial Score Gauge Badge */}
            <div className="flex flex-col items-center justify-center p-3 rounded-2xl bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 flex-shrink-0 w-28">
              <div className="relative w-18 h-18 flex items-center justify-center">
                {/* SVG Progress Circle */}
                <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-gray-200 dark:text-zinc-800"
                    strokeWidth="3.5"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className={theme.ring}
                    strokeDasharray={`${product.healthScore}, 100`}
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-black tracking-tighter leading-none text-[#000000] dark:text-white">
                    {product.healthScore}
                  </span>
                  <span className="text-[9px] font-black text-gray-500 dark:text-zinc-400 uppercase tracking-tight">/100</span>
                </div>
              </div>
              <span className="text-[10px] font-bold text-gray-700 dark:text-zinc-300 mt-1">
                {product.healthScore >= 70
                  ? isHindi ? "सुरक्षित एवं शुद्ध" : "Clean Grade"
                  : product.healthScore >= 40
                  ? isHindi ? "सीमित सेवन" : "Moderate"
                  : isHindi ? "हानिकारक तत्व" : "Ultra Processed"}
              </span>
            </div>
          </div>

          {/* AI Summary Alert Box */}
          <div
            className={`mt-4 p-3.5 rounded-2xl border text-xs leading-relaxed ${
              product.verdictType === "green"
                ? "bg-emerald-50 border-emerald-200 text-[#059669] dark:bg-emerald-950/40 dark:border-emerald-800 dark:text-[#34D399]"
                : product.verdictType === "yellow"
                ? "bg-amber-50 border-amber-200 text-amber-900 dark:bg-amber-950/40 dark:border-amber-800 dark:text-amber-200"
                : "bg-red-50 border-red-200 text-red-900 dark:bg-red-950/40 dark:border-red-800 dark:text-red-200"
            }`}
          >
            <div className="flex items-start gap-2">
              <Info className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-[#111827] dark:text-zinc-100">
                  {isHindi ? resolvedSummary.summaryHi : resolvedSummary.summaryEn}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs (Overview, Ingredients Decoder, Nutrition, Clean Alternatives) */}
        <div
          className={`flex border-b text-xs font-bold overflow-x-auto no-scrollbar gap-1 p-1 rounded-2xl ${
            isDark ? "bg-[#18181B] border-zinc-800" : "bg-white border-gray-200 shadow-xs"
          }`}
        >
          <button
            onClick={() => setActiveTab("overview")}
            className={`flex-1 py-2 px-3 rounded-xl transition-all whitespace-nowrap text-center cursor-pointer ${
              activeTab === "overview"
                ? "bg-[#09090B] text-white dark:bg-[#10B981] shadow-sm font-bold"
                : "text-gray-600 dark:text-zinc-400 hover:text-gray-900 dark:hover:text-zinc-100"
            }`}
          >
            {isHindi ? "खतरे व समीक्षा" : "Indian Hazards"} ({product.warnings.length})
          </button>
          <button
            onClick={() => setActiveTab("ingredients")}
            className={`flex-1 py-2 px-3 rounded-xl transition-all whitespace-nowrap text-center cursor-pointer ${
              activeTab === "ingredients"
                ? "bg-[#09090B] text-white dark:bg-[#10B981] shadow-sm font-bold"
                : "text-gray-600 dark:text-zinc-400 hover:text-gray-900 dark:hover:text-zinc-100"
            }`}
          >
            {isHindi ? "सामग्री डिकोडर (INS)" : "Ingredients Decode"}
          </button>
          <button
            onClick={() => setActiveTab("nutrition")}
            className={`flex-1 py-2 px-3 rounded-xl transition-all whitespace-nowrap text-center cursor-pointer ${
              activeTab === "nutrition"
                ? "bg-[#09090B] text-white dark:bg-[#10B981] shadow-sm font-bold"
                : "text-gray-600 dark:text-zinc-400 hover:text-gray-900 dark:hover:text-zinc-100"
            }`}
          >
            {isHindi ? "पोषण (Nutrition)" : "Nutrition Facts"}
          </button>
          <button
            onClick={() => setActiveTab("alternatives")}
            className={`flex-1 py-2 px-3 rounded-xl transition-all whitespace-nowrap text-center cursor-pointer ${
              activeTab === "alternatives"
                ? "bg-[#09090B] text-white dark:bg-[#10B981] shadow-sm font-bold"
                : "text-gray-600 dark:text-zinc-400 hover:text-gray-900 dark:hover:text-zinc-100"
            }`}
          >
            {isCleanChoice
              ? (isHindi ? "उत्पाद स्थिति (Best)" : "Product Status (Best)")
              : `${isHindi ? "बेहतर विकल्प" : "Alternatives"} (${cleanAlternatives.length})`}
          </button>
        </div>

        {/* TAB 1: OVERVIEW & INDIAN HAZARDS */}
        {activeTab === "overview" && (
          <div className="space-y-4 animate-in fade-in duration-200">
            {/* Key Indian Specific Hazard Cards */}
            <div className="space-y-2.5">
              <h3 className="text-xs font-black uppercase tracking-wider text-gray-600 dark:text-zinc-400 px-1 flex items-center justify-between">
                <span>{isHindi ? "भारतीय स्वास्थ्य जांच (Indian Food Hazards)" : "Key Indian Health Watchouts"}</span>
                <span className="text-[11px] font-bold text-amber-600 dark:text-amber-400">
                  {product.warnings.length === 0 ? (isHindi ? "सभी पैरामीटर सुरक्षित" : "0 Major Hazards Detected") : `${product.warnings.length} Alerts`}
                </span>
              </h3>

              {product.warnings.length === 0 ? (
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-[#059669] dark:bg-emerald-950/40 dark:border-emerald-800 dark:text-[#34D399] flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 text-[#10B981] flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-sm text-[#000000] dark:text-white">
                      {isHindi ? "कोई हानिकारक तत्व नहीं मिला" : "Clean Label Product"}
                    </h4>
                    <p className="text-xs text-gray-700 dark:text-zinc-300 mt-0.5">
                      {isHindi
                        ? "यह उत्पाद पाम ऑयल, अतिरिक्त मैदा और सिंथेटिक रंगों से मुक्त है।"
                        : "No Palm Oil, No refined Maida overload, and No artificial azo dyes found."}
                    </p>
                  </div>
                </div>
              ) : (
                product.warnings.map((warning, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-2xl border transition-all ${
                      warning.severity === "high"
                        ? isDark
                          ? "bg-red-950/20 border-red-800/40"
                          : "bg-red-50/80 border-red-200"
                        : isDark
                        ? "bg-amber-950/20 border-amber-800/40"
                        : "bg-amber-50/80 border-amber-200"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        {warning.type === "palm_oil" ? (
                          <Droplet className="w-5 h-5 text-red-500 flex-shrink-0" />
                        ) : warning.type === "maida" ? (
                          <Wheat className="w-5 h-5 text-amber-500 flex-shrink-0" />
                        ) : warning.type === "added_sugar" ? (
                          <Zap className="w-5 h-5 text-red-500 flex-shrink-0" />
                        ) : (
                          <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0" />
                        )}
                        <div>
                          <h4 className="font-bold text-sm text-[#000000] dark:text-white">
                            {isHindi ? warning.titleHi : warning.titleEn}
                          </h4>
                          {warning.tagValue && (
                            <span className="inline-block mt-0.5 text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-black/10 dark:bg-white/10 text-gray-800 dark:text-zinc-200">
                              {warning.tagValue}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 flex-shrink-0">
                        {/* Voice Doctor Note Speaker Button */}
                        <button
                          id={`hazard-voice-btn-${index}`}
                          type="button"
                          onClick={() => speakHazardWarning(warning, index)}
                          className={`px-2 py-1 rounded-lg border text-xs font-bold transition-all flex items-center gap-1 cursor-pointer select-none active:scale-95 ${
                            speakingCardIndex === index
                              ? "bg-emerald-600 text-white border-emerald-700 shadow-sm animate-pulse"
                              : isDark
                              ? "bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border-zinc-700 hover:border-zinc-600"
                              : "bg-white hover:bg-zinc-100 text-zinc-700 border-zinc-300 shadow-2xs"
                          }`}
                          title={
                            speakingCardIndex === index
                              ? isHindi ? "आवाज बंद करें" : "Stop voice note"
                              : isHindi ? "डॉक्टर की आवाज में सुनें" : "Listen (Doctor's Note)"
                          }
                          aria-label={
                            speakingCardIndex === index
                              ? isHindi ? "आवाज बंद करें" : "Stop audio note"
                              : isHindi ? "आवाज में सुनें" : "Listen to hazard note"
                          }
                        >
                          {speakingCardIndex === index ? (
                            <>
                              <VolumeX className="w-3.5 h-3.5 text-white" />
                              <span className="text-[10px] font-bold">{isHindi ? "रोकें" : "Stop"}</span>
                            </>
                          ) : (
                            <>
                              <Volume2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                              <span className="text-[10px] font-bold">{isHindi ? "सुनें" : "Listen"}</span>
                            </>
                          )}
                        </button>

                        <span
                          className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                            warning.severity === "high"
                              ? "bg-red-100 text-red-700 dark:bg-red-950/80 dark:text-red-300"
                              : "bg-amber-100 text-amber-700 dark:bg-amber-950/80 dark:text-amber-300"
                          }`}
                        >
                          {warning.severity === "high" ? (isHindi ? "उच्च जोखिम" : "High Risk") : (isHindi ? "मध्यम" : "Moderate")}
                        </span>
                      </div>
                    </div>
                    <p className="text-xs mt-2 text-[#111827] dark:text-zinc-300 leading-relaxed font-medium">
                      {isHindi ? warning.descriptionHi : warning.descriptionEn}
                    </p>
                  </div>
                ))
              )}
            </div>

            {/* SECTION 2: SMART CHOICE? CARD (Yellow Theme) */}
            {smartChoice && (
              <div
                id="smart-choice-card"
                className="p-4 sm:p-5 rounded-2xl shadow-sm transition-all border"
                style={{
                  backgroundColor: "#332B00",
                  borderColor: "#FFC107",
                  borderWidth: "1.5px"
                }}
              >
                <div className="flex items-center justify-between gap-2 mb-2.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xl leading-none" role="img" aria-label="money">💰</span>
                    <h4 className="font-extrabold text-sm sm:text-base text-[#FFC107] tracking-tight">
                      {isHindi ? "Smart Choice? (स्मार्ट विकल्प)" : "Smart Choice?"}
                    </h4>
                  </div>
                  <span
                    className="text-[11px] font-black px-2.5 py-0.5 rounded-full shadow-2xs font-mono"
                    style={{
                      backgroundColor: "rgba(255, 193, 7, 0.22)",
                      color: "#FFE082",
                      border: "1px solid rgba(255, 193, 7, 0.45)"
                    }}
                  >
                    Score +{Math.max(1, smartChoice.healthyScore - smartChoice.mainScore)}
                  </span>
                </div>

                {/* Line 1: Main Product vs Healthy Alternative */}
                <p className="font-bold text-sm sm:text-[14.5px] text-[#FFF9C4] leading-snug">
                  Ye {smartChoice.mainName} ~₹{smartChoice.mainPrice} (Score {smartChoice.mainScore}) vs {smartChoice.healthyName} ~₹{smartChoice.healthyPrice} (Score {smartChoice.healthyScore})
                </p>

                {/* Line 2: Benefit & Price Difference */}
                <p className="font-semibold text-xs sm:text-[13px] text-[#FFE082] mt-1.5 leading-snug">
                  {smartChoice.difference > 0
                    ? `Sirf ₹${smartChoice.difference} zyada me: ${smartChoice.benefitsStr}`
                    : `Same price me: ${smartChoice.benefitsStr}`}
                </p>

                {/* Line 3: Doctor / Annual Health Expense Savings Note */}
                <p className="text-[11px] sm:text-xs text-zinc-400 mt-2 leading-relaxed">
                  {isHindi
                    ? "Roz ke unhealthy se saal ka ₹2000 tak ka extra health kharch bach sakta hai."
                    : "Roz ke unhealthy se saal ka ₹2000 tak ka extra health kharch bach sakta hai."}
                </p>
              </div>
            )}

            {/* SECTION 3: Adulteration Risk & FSSAI Notes */}
            <div
              className={`p-4 rounded-2xl border ${
                isDark ? "bg-[#18181B] border-zinc-800" : "bg-white border-gray-200 shadow-xs"
              }`}
            >
              <div className="flex items-center gap-2 text-[#059669] dark:text-[#34D399] mb-2">
                <ShieldCheck className="w-5 h-5 text-[#10B981]" />
                <h4 className="font-bold text-sm text-[#000000] dark:text-white">
                  {isHindi ? "मिलावट एवं एफएसएसएआई सुरक्षा जांच" : "Adulteration & FSSAI Safety Audit"}
                </h4>
              </div>
              <p className="text-xs text-[#111827] dark:text-zinc-300 leading-relaxed font-medium">
                {isHindi ? product.adulterationCheck.detailsHi : product.adulterationCheck.detailsEn}
              </p>
            </div>

            {/* DIRECT HIGHLIGHT: Recommended Healthy Switch OR Clean Choice Status */}
            {isCleanChoice ? (
              <div
                className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                  isDark
                    ? "bg-emerald-950/20 border-emerald-800/50"
                    : "bg-emerald-50/70 border-emerald-200 shadow-2xs"
                }`}
              >
                <div className="flex items-center gap-2.5 text-[#059669] dark:text-[#34D399]">
                  <CheckCircle2 className="w-5 h-5 text-[#10B981] flex-shrink-0" />
                  <h4 className="font-black text-sm text-[#000000] dark:text-white">
                    {isHindi
                      ? "यह उत्पाद बेस्ट है (विकल्प की आवश्यकता नहीं)"
                      : "Clean Choice (No Alternative Needed)"}
                  </h4>
                </div>
                <p className="text-xs text-[#111827] dark:text-zinc-300 mt-2 leading-relaxed font-medium">
                  {isHindi
                    ? `इस उत्पाद का स्वास्थ्य स्कोर ${product.healthScore}/100 है। यह पूरी तरह सुरक्षित, मिलावट-मुक्त और स्वच्छ है। आपको इसके बदले किसी अन्य विकल्प को खोजने की आवश्यकता नहीं है।`
                    : `This product scored ${product.healthScore}/100 and passes all safety audits. It is already a top-tier clean label product — no replacement needed!`}
                </p>
                <div className="flex flex-wrap items-center gap-2 pt-2.5">
                  <span className="text-[11px] font-bold text-[#059669] dark:text-[#34D399] bg-emerald-100/70 dark:bg-emerald-950/60 px-2.5 py-1 rounded-lg border border-emerald-300/80 dark:border-emerald-700/60">
                    ✓ {isHindi ? "सुरक्षित एवं शुद्ध सामग्री" : "100% Safe Ingredients"}
                  </span>
                  <span className="text-[11px] font-bold text-[#059669] dark:text-[#34D399] bg-emerald-100/70 dark:bg-emerald-950/60 px-2.5 py-1 rounded-lg border border-emerald-300/80 dark:border-emerald-700/60">
                    ✓ {isHindi ? "पाम ऑयल / मैदा मुक्त" : "Zero Palm Oil / Maida"}
                  </span>
                </div>
              </div>
            ) : (
              cleanAlternatives && cleanAlternatives.length > 0 && (
                <div className="p-4 rounded-2xl border bg-gradient-to-br from-emerald-500/10 via-emerald-500/5 to-transparent border-emerald-500/30 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-[#059669] dark:text-[#34D399]">
                      <span className="text-base">💡</span>
                      <h4 className="font-bold text-sm text-[#000000] dark:text-white">
                        {isHindi ? "इसके बदले क्या लें? (स्वस्थ विकल्प)" : "What to drink/eat instead? (Healthy Switch)"}
                      </h4>
                    </div>
                    <button
                      onClick={() => setActiveTab("alternatives")}
                      className="text-xs font-bold text-[#059669] dark:text-[#34D399] hover:underline cursor-pointer"
                    >
                      {isHindi ? "सभी देखें →" : "View all →"}
                    </button>
                  </div>

                  <div className="space-y-2.5">
                    {cleanAlternatives.slice(0, 2).map((alt, idx) => (
                      <div
                        key={idx}
                        onClick={() => setActiveTab("alternatives")}
                        className={`p-3.5 rounded-xl border flex items-start justify-between gap-3 cursor-pointer transition-all ${
                          isDark ? "bg-zinc-900/90 border-zinc-800 hover:border-emerald-500/50" : "bg-white border-emerald-100 hover:border-emerald-300 shadow-2xs"
                        }`}
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-bold text-[#059669] dark:text-[#34D399] bg-emerald-50 dark:bg-emerald-950/60 px-1.5 py-0.2 rounded border border-emerald-200 dark:border-emerald-800">
                              {alt.brand}
                            </span>
                            {(alt.price || alt.priceEst) && (
                              <span className="text-[11px] font-bold text-gray-500 dark:text-zinc-400">
                                {alt.price || alt.priceEst}
                              </span>
                            )}
                          </div>
                          <h5 className="font-bold text-xs text-[#000000] dark:text-white mt-1">
                            {alt.name}
                          </h5>
                          {/* Clean Healthy Benefit Tag */}
                          {(alt.benefit || alt.benefitHi || (alt.tags && alt.tags.length > 0)) && (
                            <div className="mt-1 inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-500/10 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300 text-[10px] font-bold border border-emerald-500/25">
                              <Wheat className="w-3 h-3 text-[#10B981] flex-shrink-0" />
                              <span>
                                {isHindi
                                  ? `फायदा: ${alt.benefitHi || alt.benefit || alt.tags?.join(", ")}`
                                  : `Benefit: ${alt.benefit || alt.benefitHi || alt.tags?.join(", ")}`}
                              </span>
                            </div>
                          )}
                          <p className="text-[11px] text-[#111827] dark:text-zinc-300 mt-1 leading-snug font-medium">
                            {isHindi ? alt.reasonHi : alt.reasonEn}
                          </p>
                        </div>
                        <div className="px-2 py-0.5 rounded-lg bg-[#10B981] text-white font-black text-[11px] flex-shrink-0">
                          {alt.score}/100
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )
            )}
          </div>
        )}

        {/* TAB 2: INGREDIENTS DECODER */}
        {activeTab === "ingredients" && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <div
              className={`p-4 rounded-2xl border ${
                isDark ? "bg-[#18181B] border-zinc-800" : "bg-white border-gray-200 shadow-xs"
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-sm flex items-center gap-2 text-[#000000] dark:text-white">
                  <Wheat className="w-4 h-4 text-[#10B981]" />
                  <span>{isHindi ? "सामग्री सूची डिकोडर" : "Ingredients & E-Code Decoder"}</span>
                </h3>
                <span className="text-xs text-gray-500 font-bold">
                  {synchronizedIngredients.length} {isHindi ? "तत्व" : "Items"}
                </span>
              </div>

              <div className="space-y-2.5">
                {synchronizedIngredients.map((ing, idx) => (
                  <div
                    key={idx}
                    className={`p-3 rounded-xl border flex items-start justify-between gap-3 text-xs ${
                      ing.safety === "hazard"
                        ? "bg-red-50 border-red-200 text-red-900 dark:bg-red-950/40 dark:border-red-800 dark:text-red-200"
                        : ing.safety === "caution"
                        ? "bg-amber-50 border-amber-200 text-amber-900 dark:bg-amber-950/40 dark:border-amber-800 dark:text-amber-200"
                        : "bg-gray-50 dark:bg-zinc-900 border-gray-200 dark:border-zinc-800 text-[#111827] dark:text-zinc-200"
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-[#000000] dark:text-white">
                          {isHindi ? ing.nameHi || ing.name : ing.name}
                        </span>
                        {isHindi && ing.nameHi && ing.nameHi !== ing.name && (
                          <span className="text-[10px] text-gray-500 dark:text-zinc-400">
                            ({ing.name})
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-gray-600 dark:text-zinc-400 mt-0.5 font-medium">
                        {ing.purpose}
                      </p>
                    </div>

                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase flex-shrink-0 ${
                        ing.safety === "hazard"
                          ? "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300"
                          : ing.safety === "caution"
                          ? "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300"
                          : "bg-emerald-100 text-[#059669] dark:bg-emerald-950 dark:text-[#34D399]"
                      }`}
                    >
                      {ing.safety === "hazard" ? (isHindi ? "हानिकारक" : "Hazard") : ing.safety === "caution" ? (isHindi ? "सावधानी" : "Caution") : (isHindi ? "सुरक्षित" : "Safe")}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: NUTRITION FACTS */}
        {activeTab === "nutrition" && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <div
              className={`p-4 rounded-2xl border ${
                isDark ? "bg-[#18181B] border-zinc-800" : "bg-white border-gray-200 shadow-xs"
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-bold text-sm text-[#000000] dark:text-white">
                    {isHindi ? "पोषण संबंधी जानकारी (प्रति 100 ग्राम)" : "Nutrition Facts (Per 100g)"}
                  </h3>
                  <p className="text-[11px] text-gray-500 font-medium">
                    {isHindi ? "भारतीय आईसीएमआर (ICMR) दिशानिर्देशों पर आधारित" : "Benchmark against Indian daily limits"}
                  </p>
                </div>
                <Scale className="w-5 h-5 text-[#10B981]" />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
                <div className="p-3 rounded-xl bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800">
                  <span className="text-[10px] text-gray-500 uppercase font-bold">Energy</span>
                  <p className="text-lg font-black mt-0.5 text-[#000000] dark:text-white">
                    {product.nutritionPer100g.calories}
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800">
                  <span className="text-[10px] text-gray-500 uppercase font-bold">Protein</span>
                  <p className="text-lg font-black mt-0.5 text-[#000000] dark:text-white">
                    {product.nutritionPer100g.protein}
                  </p>
                </div>

                <div
                  className={`p-3 rounded-xl border ${
                    parseFloat(product.nutritionPer100g.sugar) > 15
                      ? "bg-red-50 border-red-200 dark:bg-red-950/40 dark:border-red-800"
                      : "bg-gray-50 dark:bg-zinc-900 border-gray-200 dark:border-zinc-800"
                  }`}
                >
                  <span className="text-[10px] text-gray-500 uppercase font-bold">Total Sugar</span>
                  <p className="text-lg font-black mt-0.5 text-[#000000] dark:text-white">
                    {product.nutritionPer100g.sugar}
                  </p>
                  {product.nutritionPer100g.addedSugar && (
                    <span className="text-[10px] text-red-500 font-bold block">
                      ({product.nutritionPer100g.addedSugar} Added)
                    </span>
                  )}
                </div>

                <div
                  className={`p-3 rounded-xl border ${
                    parseFloat(product.nutritionPer100g.totalFat) > 20
                      ? "bg-red-50 border-red-200 dark:bg-red-950/40 dark:border-red-800"
                      : "bg-gray-50 dark:bg-zinc-900 border-gray-200 dark:border-zinc-800"
                  }`}
                >
                  <span className="text-[10px] text-gray-500 uppercase font-bold">Total Fat</span>
                  <p className="text-lg font-black mt-0.5 text-[#000000] dark:text-white">
                    {product.nutritionPer100g.totalFat}
                  </p>
                  {product.nutritionPer100g.saturatedFat && (
                    <span className="text-[10px] text-amber-500 font-bold block">
                      ({product.nutritionPer100g.saturatedFat} Sat. Fat)
                    </span>
                  )}
                </div>

                <div
                  className={`p-3 rounded-xl border ${
                    parseInt(product.nutritionPer100g.sodium) > 600
                      ? "bg-red-50 border-red-200 dark:bg-red-950/40 dark:border-red-800"
                      : "bg-gray-50 dark:bg-zinc-900 border-gray-200 dark:border-zinc-800"
                  }`}
                >
                  <span className="text-[10px] text-gray-500 uppercase font-bold">Sodium</span>
                  <p className="text-lg font-black mt-0.5 text-[#000000] dark:text-white">
                    {product.nutritionPer100g.sodium}
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800">
                  <span className="text-[10px] text-gray-500 uppercase font-bold">Carbohydrates</span>
                  <p className="text-lg font-black mt-0.5 text-[#000000] dark:text-white">
                    {product.nutritionPer100g.carbohydrates}
                  </p>
                </div>

                {product.nutritionPer100g.transFat && (
                  <div className="p-3 rounded-xl bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800">
                    <span className="text-[10px] text-gray-500 uppercase font-bold">Trans Fat</span>
                    <p className="text-lg font-black mt-0.5 text-[#000000] dark:text-white">
                      {product.nutritionPer100g.transFat}
                    </p>
                  </div>
                )}

                {product.nutritionPer100g.fiber && (
                  <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800">
                    <span className="text-[10px] text-[#059669] uppercase font-bold">Fiber</span>
                    <p className="text-lg font-black mt-0.5 text-[#059669] dark:text-[#34D399]">
                      {product.nutritionPer100g.fiber}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: CLEANER INDIAN ALTERNATIVES */}
        {activeTab === "alternatives" && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <div className="space-y-3">
              <div className="flex items-center justify-between px-1">
                <h3 className="text-xs font-black uppercase tracking-wider text-[#059669] dark:text-[#34D399] flex items-center gap-1.5">
                  <span className="text-sm leading-none">🌾</span>
                  <span>{isHindi ? "स्वस्थ एवं शुद्ध भारतीय विकल्प" : "Cleaner Indian Alternatives"}</span>
                </h3>
                <span className="text-xs text-gray-500 font-medium">
                  {isHindi ? "किराना सुपरमार्केट्स पर उपलब्ध" : "Blinkit / Zepto / Supermarkets"}
                </span>
              </div>

              {isCleanChoice || cleanAlternatives.length === 0 ? (
                <div
                  className={`p-6 sm:p-8 rounded-2xl border text-center space-y-3.5 transition-all ${
                    isDark
                      ? "bg-emerald-950/20 border-emerald-800/50 text-zinc-200"
                      : "bg-emerald-50/70 border-emerald-200 text-emerald-950 shadow-xs"
                  }`}
                >
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#059669] to-[#10B981] text-white flex items-center justify-center mx-auto shadow-md shadow-[#10B981]/30">
                    <ShieldCheck className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h4 className="font-black text-base sm:text-lg text-[#000000] dark:text-white">
                      {isHindi ? "यह उत्पाद पहले से ही सर्वोत्तम है!" : "Top Clean Label Choice!"}
                    </h4>
                    <p className="text-xs sm:text-sm text-[#111827] dark:text-zinc-300 max-w-md mx-auto mt-1.5 leading-relaxed font-medium">
                      {isHindi
                        ? `इस उत्पाद का स्वास्थ्य स्कोर ${product.healthScore}/100 है। इसमें कोई हानिकारक पाम ऑयल, अतिरिक्त मैदा, केमिकल या सिंथेटिक रंग नहीं मिले हैं। यह दैनिक उपभोग के लिए बिल्कुल सुरक्षित है और किसी अन्य विकल्प की आवश्यकता नहीं है।`
                        : `This product scored an outstanding ${product.healthScore}/100 and passes all ingredient audits. It is already a clean, safe product — no replacement needed!`}
                    </p>
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-500/20 text-[#059669] dark:text-[#34D399] font-bold text-xs border border-emerald-500/40">
                    <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
                    <span>{isHindi ? "स्वच्छ एवं सुरक्षित उत्पाद प्रमाणित" : "Certified Clean Choice"}</span>
                  </div>
                </div>
              ) : (
                cleanAlternatives.map((alt, idx) => (
                  <div
                    key={idx}
                    className={`p-4 rounded-2xl border transition-all ${
                      isDark ? "bg-[#18181B] border-zinc-800 hover:border-emerald-700/60" : "bg-white border-gray-200 hover:border-emerald-300 shadow-sm"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-[#059669] dark:text-[#34D399] bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800">
                            {alt.brand}
                          </span>
                          {(alt.price || alt.priceEst) && (
                            <span className="text-xs text-gray-600 dark:text-zinc-300 font-bold bg-gray-100 dark:bg-zinc-800 px-2 py-0.5 rounded">
                              {alt.price || alt.priceEst}
                            </span>
                          )}
                        </div>

                        <h4 className="font-bold text-base text-[#000000] dark:text-white mt-1.5">
                          {alt.name}
                        </h4>

                        {/* Clean Certified Benefit Tag */}
                        {(alt.benefit || alt.benefitHi || (alt.tags && alt.tags.length > 0)) && (
                          <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/10 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300 border border-emerald-500/25 text-xs font-bold">
                            <Wheat className="w-3.5 h-3.5 text-[#10B981] flex-shrink-0" />
                            <span>
                              {isHindi
                                ? `फायदा: ${alt.benefitHi || alt.benefit || alt.tags?.join(", ")}`
                                : `Benefit: ${alt.benefit || alt.benefitHi || alt.tags?.join(", ")}`}
                            </span>
                          </div>
                        )}

                        <p className="text-xs text-[#111827] dark:text-zinc-300 mt-2 leading-relaxed font-medium">
                          {isHindi ? alt.reasonHi : alt.reasonEn}
                        </p>

                        {/* Tags */}
                        {alt.tags && alt.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 mt-2.5">
                            {alt.tags.map((t, tidx) => (
                              <span
                                key={tidx}
                                className="text-[10px] font-bold text-[#059669] dark:text-[#34D399] bg-emerald-50/80 dark:bg-emerald-950/40 px-2 py-0.5 rounded-full border border-emerald-200/60 dark:border-emerald-800/60"
                              >
                                ✓ {t}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                        <div className="px-2.5 py-1 rounded-xl bg-[#10B981] text-white font-black text-xs shadow-sm">
                          {alt.score}/100
                        </div>
                        <span className="text-[10px] font-bold text-[#059669] dark:text-[#34D399]">
                          +{Math.max(1, alt.score - product.healthScore)} Pts
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* Primary Action Buttons Bar */}
        <div className="pt-2 space-y-3">
          {/* Add to List Button */}
          <button
            id="result-save-toggle-btn"
            onClick={handleSaveClick}
            className={`w-full py-3.5 rounded-full font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg transition-all active:scale-[0.99] cursor-pointer ${
              isSaved
                ? "bg-zinc-900 text-[#10B981] border border-[#10B981]/40"
                : "bg-gradient-to-r from-[#059669] via-[#10B981] to-[#34D399] hover:brightness-105 text-white shadow-[#10B981]/25"
            }`}
          >
            {isSaved ? (
              <>
                <BookmarkCheck className="w-5 h-5 text-[#10B981]" />
                <span>{isHindi ? "मेरी लिस्ट में सहेजा गया (Saved to List)" : "Saved in My Grocery List"}</span>
              </>
            ) : (
              <>
                <Bookmark className="w-5 h-5" />
                <span>{isHindi ? "मेरे लिस्ट में डालो (Save to List)" : "Mere List Mein Daalo"}</span>
              </>
            )}
          </button>

          {/* Share on WhatsApp Button */}
          <button
            id="result-whatsapp-share-btn"
            onClick={() => setIsShareModalOpen(true)}
            className={`w-full py-3 rounded-full font-bold text-xs flex items-center justify-center gap-2 border transition-all cursor-pointer ${
              isDark
                ? "bg-[#18181B] border-zinc-800 text-zinc-200 hover:bg-zinc-800"
                : "bg-white border-gray-200 text-[#111827] hover:bg-gray-50 shadow-xs"
            }`}
          >
            <Share2 className="w-4 h-4 text-[#10B981]" />
            <span>{isHindi ? "व्हाट्सएप पर शेयर करें (WhatsApp Share)" : "Share Score Card on WhatsApp"}</span>
          </button>
        </div>

        {/* Contact Support Section */}
        <ContactSupport language={language} isDark={isDark} />
      </div>

      {/* WhatsApp Share Card Modal */}
      <WhatsAppShareModal
        product={product}
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        language={language}
      />
    </div>
  );
};
