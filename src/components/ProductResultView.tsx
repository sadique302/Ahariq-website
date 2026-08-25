import React, { useState, useMemo, useEffect, useRef } from "react";
import { FoodProduct, Language, CleanerAlternative, IndianHazardWarning } from "../types";
import { getSmartCleanerAlternatives } from "../data/cleanAlternativesEngine";
import { getDynamicHazardSummary, getSynchronizedIngredientsExplanation } from "../services/openFoodFacts";
import { formatSafeHazardWarning } from "../utils/hazardFormatter";
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
import { trackUserActivity } from "../services/analyticsTracker";

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
  const speechTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Clean up any playing speech synthesis when unmounting or switching products/language
  useEffect(() => {
    return () => {
      if (speechTimeoutRef.current) {
        clearTimeout(speechTimeoutRef.current);
      }
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [product, language]);

  // Voice playback logic with crisp male voice, restored natural rate (0.95-1.0), and full volume clarity
  const speakHazardWarning = (warning: IndianHazardWarning, index: number) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      return;
    }

    if (speechTimeoutRef.current) {
      clearTimeout(speechTimeoutRef.current);
      speechTimeoutRef.current = null;
    }

    // If already speaking this card, stop playback
    if (speakingCardIndex === index) {
      window.speechSynthesis.cancel();
      setSpeakingCardIndex(null);
      return;
    }

    // Stop any previous speech
    window.speechSynthesis.cancel();

    // Determine safe, clear and authoritative text based on card type & language
    let textToSpeak = "";
    if (warning.type === "added_sugar") {
      textToSpeak = isHindi
        ? "सोचिए, इस छोटे से पैकेट में पूरे पाँच चम्मच चीनी है। रोज़ एक पैकेट मतलब एक महीने में डेढ़ किलो चीनी! इसका अधिक सेवन मोटापे और डायबिटीज़ के जोखिम से जोड़ा जाता है।"
        : "Imagine, this small pack has five full spoons of sugar! Having one daily means 1.5 kilos of sugar in a month; excess intake is associated with obesity and diabetes risk.";
    } else if (warning.type === "palm_oil" || warning.type === "trans_fat") {
      textToSpeak = isHindi
        ? "इसमें रिफाइंड पामोलिन तेल है जो तलने के लिए इस्तेमाल होता है। इसमें सैचुरेटेड फैट अधिक होता है जो अधिक मात्रा में दिल के लिए अच्छा नहीं माना जाता।"
        : "Contains refined palmolein oil used for frying. High in saturated fats which in excess is not considered good for heart health.";
    } else if (warning.type === "sodium") {
      textToSpeak = isHindi
        ? "इसमें अधिक मात्रा में सोडियम है जो स्वाद और प्रिजर्वेशन के लिए है। इसका लगातार अधिक सेवन हाई ब्लड प्रेशर के जोखिम से जोड़ा जाता है।"
        : "Contains high sodium used for flavor enhancement and preservation. Regular excess intake is associated with risk of high blood pressure.";
    } else if (warning.type === "maida") {
      textToSpeak = isHindi
        ? "इसमें रिफाइंड मैदा है जो बेस और टेक्सचर देने के लिए है। इसमें फाइबर कम होता है जिसका अधिक सेवन पाचन और वजन के लिए अनुकूल नहीं माना जाता।"
        : "Contains refined wheat flour used for texture. Lacking fiber, high consumption is not considered optimal for digestion and weight management.";
    } else if (warning.type === "preservatives" || warning.type === "artificial_colours") {
      textToSpeak = isHindi
        ? "इसमें फूड एडिटिव्स और केमिकल्स हैं जो शेल्फ लाइफ बढ़ाने के लिए हैं। इनका नियमित अधिक सेवन पेट और पाचन के लिए अच्छा नहीं माना जाता।"
        : "Contains food additives and preservatives to increase shelf life. Regular high intake is not considered ideal for digestive health.";
    } else {
      textToSpeak = isHindi
        ? "इसमें प्रोसेस्ड खाद्य घटक हैं जो स्वाद और शेल्फ-लाइफ के लिए हैं। इनका नियमित अधिक सेवन सेहत के लिए अनुकूल नहीं माना जाता।"
        : "Contains formulated food ingredients. Regular excess consumption is not considered optimal for health.";
    }

    // Select crisp, authoritative MALE voice (Hindi Male first, then Indian English Male)
    const voices = window.speechSynthesis.getVoices();
    const femaleKeywords = ["female", "woman", "girl", "swara", "lekha", "heera", "priya", "zira", "veena", "sangeeta", "neerja", "shweta", "aditi", "kalpana", "sheetal", "ananya", "kavya"];
    const maleKeywords = ["male", "man", "madhur", "hemant", "rishi", "prabhat", "ravi", "mohit", "neil", "david", "george", "guy", "mark", "google"];

    let selectedVoice: SpeechSynthesisVoice | null = null;
    if (isHindi) {
      const hiVoices = voices.filter(v => v.lang.toLowerCase().startsWith("hi") || v.name.toLowerCase().includes("hindi"));
      const hiMale = hiVoices.find(v =>
        maleKeywords.some(kw => v.name.toLowerCase().includes(kw)) ||
        (!femaleKeywords.some(kw => v.name.toLowerCase().includes(kw)) && !v.name.toLowerCase().includes("female"))
      );
      if (hiMale) {
        selectedVoice = hiMale;
      } else if (hiVoices.length > 0) {
        selectedVoice = hiVoices[0];
      } else {
        const enInVoices = voices.filter(v => v.lang.toLowerCase().startsWith("en-in") || v.lang.toLowerCase().startsWith("en_in") || v.name.toLowerCase().includes("india"));
        const enInMale = enInVoices.find(v =>
          maleKeywords.some(kw => v.name.toLowerCase().includes(kw)) ||
          !femaleKeywords.some(kw => v.name.toLowerCase().includes(kw))
        );
        selectedVoice = enInMale || enInVoices[0] || null;
      }
    } else {
      const enInVoices = voices.filter(v => v.lang.toLowerCase().startsWith("en-in") || v.lang.toLowerCase().startsWith("en_in") || v.name.toLowerCase().includes("india"));
      const enInMale = enInVoices.find(v =>
        maleKeywords.some(kw => v.name.toLowerCase().includes(kw)) ||
        !femaleKeywords.some(kw => v.name.toLowerCase().includes(kw))
      );
      if (enInMale) {
        selectedVoice = enInMale;
      } else {
        const enVoices = voices.filter(v => v.lang.toLowerCase().startsWith("en"));
        const enMale = enVoices.find(v =>
          maleKeywords.some(kw => v.name.toLowerCase().includes(kw)) ||
          !femaleKeywords.some(kw => v.name.toLowerCase().includes(kw))
        );
        selectedVoice = enMale || enInVoices[0] || enVoices[0] || null;
      }
    }

    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.rate = 0.95; // Original clear, natural pace
    utterance.pitch = 0.95; // Deep, crisp male pitch
    utterance.volume = 1.0; // Maximum loudness and clarity

    if (selectedVoice) {
      utterance.voice = selectedVoice;
      utterance.lang = selectedVoice.lang;
    } else {
      utterance.lang = isHindi ? "hi-IN" : "en-IN";
    }

    utterance.onend = () => {
      setSpeakingCardIndex(null);
    };

    utterance.onerror = () => {
      setSpeakingCardIndex(null);
    };

    setSpeakingCardIndex(index);
    window.speechSynthesis.speak(utterance);

    // Track voice guidance listening event
    trackUserActivity({
      eventType: "VOICE_LISTEN",
      title: `Listened to Voice Warning: ${warning.titleHi || warning.titleEn}`,
      details: {
        warningType: warning.type,
        productName: product.name,
        healthScore: product.healthScore,
      },
    });
  };

  // Compute category-specific dynamic alternatives from Firestore/Engine
  // A product is ONLY a clean choice if healthScore >= 80 AND verdict is green
  const isCleanChoice = product.healthScore >= 80 && product.verdictType === "green";

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
    if (product.cleanerAlternatives && product.cleanerAlternatives.length > 0) {
      return product.cleanerAlternatives;
    }
    // Fallback to universal clean Indian alternatives if score is low
    return getSmartCleanerAlternatives({
      name: product.name,
      category: product.category || "snack",
    });
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
    let cleanMainName = product.name;
    if (cleanMainName.toLowerCase().includes("everest")) {
      cleanMainName = "Everest";
    } else if (cleanMainName.length > 22) {
      cleanMainName = cleanMainName.slice(0, 20) + "...";
    }

    // Clean Healthy Name for concise display
    let cleanHealthyName = healthyName;
    if (cleanHealthyName.toLowerCase().includes("24 mantra")) {
      cleanHealthyName = "24 Mantra";
    } else if (cleanHealthyName.length > 22) {
      cleanHealthyName = cleanHealthyName.slice(0, 20) + "...";
    }

    return {
      mainName: cleanMainName,
      mainPrice,
      mainScore: product.healthScore,
      healthyName: cleanHealthyName,
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

  // Color helpers for Yuka-style Health Score
  const getScoreTheme = () => {
    if (product.healthScore >= 70) {
      return {
        ring: "text-[#10B981]",
        border: "border-emerald-200 dark:border-emerald-800/60",
        bg: "bg-emerald-50 dark:bg-emerald-950/40",
        badge: "bg-emerald-50 text-[#059669] dark:bg-emerald-950/60 dark:text-[#34D399] border border-emerald-200 dark:border-emerald-800/60",
        gradient: "from-[#059669] to-[#10B981]",
        statusDot: "bg-[#10B981]",
        statusText: isHindi ? "उत्कृष्ट • सुरक्षित" : "Excellent • Clean",
        pillText: isHindi ? "✅ स्वच्छ एवं सुरक्षित (Clean Choice)" : "✅ Clean Choice (Safe Ingredients)",
      };
    }
    if (product.healthScore >= 40) {
      return {
        ring: "text-amber-500",
        border: "border-amber-200 dark:border-amber-800/60",
        bg: "bg-amber-50 dark:bg-amber-950/40",
        badge: "bg-amber-50 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-200 dark:border-amber-800/60",
        gradient: "from-amber-500 to-amber-600",
        statusDot: "bg-amber-500",
        statusText: isHindi ? "मध्यम • सीमित" : "Moderate",
        pillText: isHindi ? "⚠️ सोच समझ कर (Moderate)" : "⚠️ Moderate (Consume in Moderation)",
      };
    }
    return {
      ring: "text-red-500",
      border: "border-red-200 dark:border-red-800/60",
      bg: "bg-red-50 dark:bg-red-950/40",
      badge: "bg-red-50 text-red-800 dark:bg-red-950/60 dark:text-red-300 border border-red-200 dark:border-red-800/60",
      gradient: "from-red-500 to-rose-600",
      statusDot: "bg-red-500",
      statusText: isHindi ? "हानिकारक • बचें" : "Poor • Avoid",
      pillText: isHindi ? "❌ हानिकारक • बचें (Avoid)" : "❌ Avoid (Ultra-Processed / Harmful)",
    };
  };

  const theme = getScoreTheme();

  return (
    <div
      id="product-result-screen"
      className={`min-h-screen pb-24 transition-colors w-full max-w-full overflow-x-hidden ${
        isDark ? "bg-[#090C10] text-zinc-100" : "bg-[#F8FAFC] text-[#0F172A]"
      }`}
    >
      {/* Top Sticky Header */}
      <div
        className={`sticky top-0 z-30 px-4 sm:px-6 py-3 border-b flex items-center justify-between backdrop-blur-md w-full max-w-full overflow-hidden ${
          isDark ? "bg-[#090C10]/90 border-slate-800" : "bg-white/90 border-slate-200/80"
        }`}
      >
        <button
          id="result-back-btn"
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer text-slate-800 dark:text-slate-200 flex-shrink-0"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{isHindi ? "वापस" : "Back"}</span>
        </button>

        <span className="text-xs font-bold font-mono tracking-wider text-slate-400 uppercase truncate px-2">
          {product.category}
        </span>

        <div className="flex items-center gap-2 flex-shrink-0">
          {/* Share Button */}
          <button
            id="result-share-top-btn"
            onClick={() => setIsShareModalOpen(true)}
            className={`p-2 rounded-full border transition-colors cursor-pointer ${
              isDark
                ? "bg-[#161C24] border-slate-800 text-slate-200 hover:bg-slate-800"
                : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100 shadow-2xs"
            }`}
            title="Share on WhatsApp"
          >
            <Share2 className="w-4 h-4 text-[#10B981]" />
          </button>

          {/* Bookmark Button */}
          <button
            id="result-save-top-btn"
            onClick={handleSaveClick}
            className={`p-2 rounded-full border transition-all cursor-pointer ${
              isSaved
                ? "bg-[#10B981] text-white border-[#10B981] shadow-md shadow-[#10B981]/25"
                : isDark
                ? "bg-[#161C24] border-slate-800 text-slate-300 hover:bg-slate-800"
                : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100 shadow-2xs"
            }`}
            title="Save to My List"
          >
            {isSaved ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4 text-slate-500" />}
          </button>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-4 sm:pt-6 space-y-5 w-full">
        {/* Main Product Hero Card - Yuka Style with Big Circular Gauge */}
        <div
          className={`rounded-3xl p-6 sm:p-7 border transition-all ${
            isDark ? "bg-[#161C24] border-slate-800 shadow-sm" : "bg-white border-slate-200/80 shadow-sm"
          }`}
        >
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            {/* Product Image & Veg Mark */}
            <div className="relative w-32 h-32 sm:w-36 sm:h-36 rounded-3xl overflow-hidden bg-slate-50 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700 flex-shrink-0 flex items-center justify-center shadow-2xs">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              {/* Veg / Non-Veg Indian Green/Brown Dot */}
              <div
                className="absolute top-2.5 left-2.5 w-5 h-5 bg-white rounded-md border border-slate-200 flex items-center justify-center shadow-xs"
                title={product.isVegetarian ? "100% Vegetarian (शाकाहारी)" : "Non-Vegetarian"}
              >
                <div
                  className={`w-2.5 h-2.5 rounded-full ${
                    product.isVegetarian ? "bg-[#10B981]" : "bg-amber-800"
                  }`}
                />
              </div>
            </div>

            {/* Product Meta & Title */}
            <div className="flex-1 text-center sm:text-left min-w-0">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <span className="text-xs font-bold text-[#059669] dark:text-[#34D399] bg-emerald-50 dark:bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
                  {product.brand}
                </span>
                {product.fssaiNumber && (
                  <span className="text-xs text-slate-400 font-mono">
                    FSSAI #{product.fssaiNumber}
                  </span>
                )}
              </div>

              <h1 className="text-xl sm:text-2xl font-extrabold mt-2 leading-tight tracking-tight text-slate-900 dark:text-white">
                {isHindi ? product.nameHindi || product.name : product.name}
              </h1>

              {/* Status Pill & Size */}
              <div className="mt-3 flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <span
                  className={`px-3.5 py-1 rounded-full text-xs font-bold border flex items-center gap-1.5 ${theme.badge}`}
                >
                  <span className={`w-2.5 h-2.5 rounded-full ${theme.statusDot}`} />
                  <span>{theme.pillText}</span>
                </span>
                {product.packagingSize && (
                  <span className="text-xs text-slate-400 font-medium">
                    ({product.packagingSize})
                  </span>
                )}
              </div>
            </div>

            {/* Big Clear Yuka-Style Circular Health Score Progress Gauge */}
            <div
              className={`flex flex-col items-center justify-center p-4 rounded-3xl border transition-all flex-shrink-0 w-36 ${
                product.healthScore < 40
                  ? isDark
                    ? "bg-red-950/40 border-red-800/60 shadow-md"
                    : "bg-red-50/80 border-red-200 shadow-2xs"
                  : isDark
                  ? "bg-[#0E131A] border-slate-800"
                  : "bg-slate-50/70 border-slate-200/80"
              }`}
            >
              <div className="relative w-24 h-24 flex items-center justify-center">
                {/* SVG Progress Ring */}
                <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-slate-200 dark:text-slate-800"
                    strokeWidth="3.5"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className={`${theme.ring} transition-all duration-1000 ease-out`}
                    strokeDasharray={`${Math.max(4, product.healthScore)}, 100`}
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span
                    className={`text-3xl font-black tracking-tight leading-none ${
                      product.healthScore < 40
                        ? "text-red-600 dark:text-red-400 font-mono"
                        : "text-slate-900 dark:text-white"
                    }`}
                  >
                    {product.healthScore}
                  </span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">/100</span>
                </div>
              </div>

              {/* Status Indicator Label */}
              <div className="mt-2 text-center">
                <span
                  className={`text-xs font-bold block ${
                    product.healthScore >= 70
                      ? "text-[#059669] dark:text-[#34D399]"
                      : product.healthScore >= 40
                      ? "text-amber-600 dark:text-amber-400"
                      : "text-red-600 dark:text-red-400"
                  }`}
                >
                  {theme.statusText}
                </span>
                <span className="text-[10px] text-slate-400 font-medium">
                  {isHindi ? "स्वास्थ्य स्कोर" : "Health Score"}
                </span>
              </div>
            </div>
          </div>

          {/* AI Summary Alert Box */}
          <div
            className={`mt-5 p-4 rounded-2xl border text-xs leading-relaxed ${
              product.verdictType === "green"
                ? "bg-emerald-50/80 border-emerald-200 text-[#065F46] dark:bg-emerald-950/40 dark:border-emerald-800 dark:text-[#34D399]"
                : product.verdictType === "yellow"
                ? "bg-amber-50/80 border-amber-200 text-amber-900 dark:bg-amber-950/40 dark:border-amber-800 dark:text-amber-200"
                : "bg-red-50/80 border-red-200 text-red-900 dark:bg-red-950/40 dark:border-red-800 dark:text-red-200"
            }`}
          >
            <div className="flex items-start gap-2.5">
              <Info className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold leading-relaxed">
                  {isHindi ? resolvedSummary.summaryHi : resolvedSummary.summaryEn}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs (Overview & Hazards, Ingredients Decoder, Nutrition, Alternatives) */}
        <div
          className={`flex border text-xs font-bold overflow-x-auto no-scrollbar gap-1.5 p-1.5 rounded-2xl ${
            isDark ? "bg-[#161C24] border-slate-800" : "bg-white border-slate-200/80 shadow-xs"
          }`}
        >
          <button
            onClick={() => setActiveTab("overview")}
            className={`flex-1 py-2.5 px-3 rounded-xl transition-all whitespace-nowrap text-center cursor-pointer ${
              activeTab === "overview"
                ? "bg-[#059669] text-white shadow-sm font-bold"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            {isHindi ? "समीक्षा व खतरे" : "Hazards"} ({product.warnings.length})
          </button>
          <button
            onClick={() => setActiveTab("ingredients")}
            className={`flex-1 py-2.5 px-3 rounded-xl transition-all whitespace-nowrap text-center cursor-pointer ${
              activeTab === "ingredients"
                ? "bg-[#059669] text-white shadow-sm font-bold"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            {isHindi ? "सामग्री डिकोडर" : "Ingredients"}
          </button>
          <button
            onClick={() => setActiveTab("nutrition")}
            className={`flex-1 py-2.5 px-3 rounded-xl transition-all whitespace-nowrap text-center cursor-pointer ${
              activeTab === "nutrition"
                ? "bg-[#059669] text-white shadow-sm font-bold"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            {isHindi ? "पोषण (Nutrition)" : "Nutrition"}
          </button>
          <button
            onClick={() => setActiveTab("alternatives")}
            className={`flex-1 py-2.5 px-3 rounded-xl transition-all whitespace-nowrap text-center cursor-pointer ${
              activeTab === "alternatives"
                ? "bg-[#059669] text-white shadow-sm font-bold"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            {isCleanChoice
              ? (isHindi ? "उत्पाद स्थिति (Best)" : "Status (Best)")
              : `${isHindi ? "स्वस्थ विकल्प" : "Alternatives"} (${cleanAlternatives.length})`}
          </button>
        </div>

        {/* TAB 1: OVERVIEW & "YE KHARAB HAI, YE ACCHA HAI" CONTRAST FLOW */}
        {activeTab === "overview" && (
          <div className="space-y-5 animate-in fade-in duration-200">
            {/* Key Indian Specific Hazard Cards */}
            <div className="space-y-3">
              <div className="flex items-center justify-between px-1">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                  <span>{isHindi ? "यह उत्पाद क्यों नुकसानदेह हो सकता है?" : "Key Ingredient Warnings & Hazards"}</span>
                </h3>
                <span className="text-xs font-semibold text-slate-400">
                  {product.warnings.length === 0
                    ? (isHindi ? "0 खतरे" : "0 Hazards")
                    : `${product.warnings.length} ${isHindi ? "चेतावनियां" : "Alerts"}`}
                </span>
              </div>

              {product.warnings.length === 0 ? (
                product.healthScore >= 70 ? (
                  <div className="p-5 rounded-3xl bg-emerald-50/80 border border-emerald-200 text-[#065F46] dark:bg-emerald-950/40 dark:border-emerald-800 dark:text-[#34D399] flex items-center gap-4">
                    <CheckCircle2 className="w-7 h-7 text-[#10B981] flex-shrink-0" />
                    <div>
                      <h4 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white">
                        {isHindi ? "स्वच्छ एवं सुरक्षित उत्पाद (Clean Choice)" : "Clean Label Product"}
                      </h4>
                      <p className="text-xs text-slate-600 dark:text-zinc-300 mt-0.5">
                        {isHindi
                          ? "यह उत्पाद पाम ऑयल, अतिरिक्त मैदा, कृत्रिम रंगों व अतिरिक्त चीनी से मुक्त है।"
                          : "Free from refined palm oil, maida overload, and synthetic azo dyes."}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="p-5 rounded-3xl bg-red-50/90 border border-red-200 text-red-900 dark:bg-red-950/40 dark:border-red-800 dark:text-red-200 flex items-center gap-4">
                    <AlertTriangle className="w-7 h-7 text-red-600 dark:text-red-400 flex-shrink-0" />
                    <div>
                      <h4 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white">
                        {isHindi ? "अल्ट्रा-प्रोसेस्ड उत्पाद (कम पोषण मूल्य)" : "Ultra-Processed Item (Low Nutrition)"}
                      </h4>
                      <p className="text-xs text-red-700 dark:text-red-300 mt-0.5">
                        {isHindi
                          ? "इस उत्पाद में अत्यधिक घुली हुई चीनी, खाली कैलोरी या रासायनिक तत्व मौजूद हैं जो दैनिक स्वास्थ्य के लिए नुकसानदेह हैं।"
                          : "Contains empty calories, high sugar load, or industrial processing agents harmful to metabolic health."}
                      </p>
                    </div>
                  </div>
                )
              ) : (
                product.warnings.map((warning, index) => {
                  const isHighSeverity = warning.severity === "high";
                  const sugarVal =
                    parseFloat(product.nutritionPer100g?.sugar || product.nutritionPer100g?.addedSugar || "0") ||
                    (warning.tagValue?.match(/\d+/)?.[0] ? parseFloat(warning.tagValue.match(/\d+/)![0]) : 34);
                  const numCubes = Math.max(1, Math.min(12, Math.round(sugarVal / 4) || 5));
                  const safeDesc = formatSafeHazardWarning(warning, product.name, sugarVal);

                  return (
                    <div
                      key={index}
                      className={`p-5 rounded-3xl border transition-all ${
                        isHighSeverity
                          ? isDark
                            ? "bg-red-950/40 border-red-800/80 text-white shadow-sm"
                            : "bg-red-50/90 border-red-200 text-slate-900 shadow-2xs"
                          : isDark
                          ? "bg-amber-950/30 border-amber-800/50 text-amber-100"
                          : "bg-amber-50/80 border-amber-200 text-slate-900 shadow-2xs"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-9 h-9 rounded-2xl flex items-center justify-center flex-shrink-0 ${
                              isHighSeverity
                                ? "bg-red-500/15 text-red-600 dark:text-red-400"
                                : "bg-amber-500/15 text-amber-600 dark:text-amber-400"
                            }`}
                          >
                            {warning.type === "palm_oil" ? (
                              <Droplet className="w-4 h-4" />
                            ) : warning.type === "maida" ? (
                              <Wheat className="w-4 h-4" />
                            ) : warning.type === "added_sugar" ? (
                              <Zap className="w-4 h-4" />
                            ) : (
                              <AlertTriangle className="w-4 h-4" />
                            )}
                          </div>
                          <div>
                            <h4 className="font-extrabold text-sm sm:text-base tracking-tight text-slate-900 dark:text-white">
                              {isHindi ? warning.titleHi : warning.titleEn}
                            </h4>
                            {warning.tagValue && (
                              <span
                                className={`inline-block mt-0.5 text-[11px] font-mono font-bold px-2 py-0.5 rounded-md ${
                                  isHighSeverity
                                    ? "bg-red-500/15 text-red-700 dark:text-red-300 border border-red-500/20"
                                    : "bg-amber-500/15 text-amber-800 dark:text-amber-200 border border-amber-500/20"
                                }`}
                              >
                                {warning.tagValue}
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-2 flex-shrink-0">
                          {/* Voice Doctor Note Speaker Button */}
                          <button
                            id={`hazard-voice-btn-${index}`}
                            type="button"
                            onClick={() => speakHazardWarning(warning, index)}
                            className={`px-3 py-1.5 rounded-full border text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer select-none active:scale-95 ${
                              speakingCardIndex === index
                                ? "bg-emerald-600 text-white border-emerald-500 shadow-sm animate-pulse"
                                : isDark
                                ? "bg-[#161C24] hover:bg-slate-800 text-slate-200 border-slate-700"
                                : "bg-white hover:bg-slate-50 text-slate-700 border-slate-200 shadow-2xs"
                            }`}
                            title={
                              speakingCardIndex === index
                                ? isHindi ? "आवाज बंद करें" : "Stop voice note"
                                : isHindi ? "डॉक्टर की आवाज में सुनें" : "Listen (Doctor's Note)"
                            }
                            aria-label="Listen to hazard note"
                          >
                            {speakingCardIndex === index ? (
                              <>
                                <VolumeX className="w-3.5 h-3.5 text-white" />
                                <span className="text-[11px] font-bold">{isHindi ? "रोकें" : "Stop"}</span>
                              </>
                            ) : (
                              <>
                                <Volume2 className="w-3.5 h-3.5 text-[#059669] dark:text-[#34D399]" />
                                <span className="text-[11px] font-bold">{isHindi ? "सुनें" : "Listen"}</span>
                              </>
                            )}
                          </button>

                          <span
                            className={`text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full ${
                              isHighSeverity
                                ? "bg-red-500/20 text-red-700 dark:text-red-300 border border-red-500/30"
                                : "bg-amber-500/20 text-amber-800 dark:text-amber-300 border border-amber-500/30"
                            }`}
                          >
                            {isHighSeverity ? (isHindi ? "हानिकारक" : "High Risk") : (isHindi ? "मध्यम" : "Moderate")}
                          </span>
                        </div>
                      </div>

                      {/* Visual Sugar Cubes Graphic */}
                      {warning.type === "added_sugar" && (
                        <div className="mt-3 p-3 rounded-2xl bg-white/70 dark:bg-black/40 border border-slate-200 dark:border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                          <div className="flex items-center gap-2 flex-wrap">
                            <div className="flex items-center gap-1.5 flex-wrap">
                              {Array.from({ length: numCubes }).map((_, cIdx) => (
                                <div
                                  key={cIdx}
                                  className="w-6 h-6 rounded-md bg-white border border-slate-200 shadow-2xs flex items-center justify-center select-none"
                                  title={`Sugar Cube ${cIdx + 1} (~4g)`}
                                >
                                  <span className="text-xs">🧊</span>
                                </div>
                              ))}
                            </div>
                            <span className="text-xs font-extrabold text-amber-700 dark:text-amber-300 ml-1">
                              {sugarVal > 0 ? `${sugarVal}g = ${numCubes} चम्मच चीनी` : "5 चम्मच चीनी"}
                            </span>
                          </div>
                          <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                            {isHindi ? "(1 क्यूब ≈ 4g चीनी)" : "(1 cube ≈ 4g sugar)"}
                          </span>
                        </div>
                      )}

                      {/* Legally Safe Description */}
                      <p className="text-xs sm:text-sm mt-2.5 leading-relaxed font-normal text-slate-700 dark:text-zinc-300">
                        {isHindi ? safeDesc.descriptionHi : safeDesc.descriptionEn}
                      </p>
                    </div>
                  );
                })
              )}
            </div>

            {/* "YE KHARAB HAI, YE ACCHA HAI" - DIRECT HEALTHIER ALTERNATIVE COMPARISON CARD */}
            {!isCleanChoice && cleanAlternatives && cleanAlternatives.length > 0 && (
              <div
                id="ye-kharab-ye-accha-card"
                className={`p-6 rounded-3xl border transition-all ${
                  isDark
                    ? "bg-gradient-to-br from-[#0F241C] via-[#161C24] to-[#161C24] border-emerald-700/60 shadow-md"
                    : "bg-gradient-to-br from-[#ECFDF5] via-white to-white border-emerald-200/90 shadow-sm"
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">🔄</span>
                    <div>
                      <h4 className="font-extrabold text-base text-slate-900 dark:text-white">
                        {isHindi ? "इसके बदले क्या लें? (स्वस्थ विकल्प)" : "Better & Cleaner Alternative"}
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 font-normal">
                        {isHindi ? "यह उत्पाद नुकसानदेह है, इसके बदले यह शुद्ध विकल्प चुनें" : "Switch from this unhealthy product to a 100% clean alternative"}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setActiveTab("alternatives")}
                    className="text-xs font-bold text-[#059669] dark:text-[#34D399] hover:underline cursor-pointer flex-shrink-0"
                  >
                    {isHindi ? "सभी विकल्प →" : "View All →"}
                  </button>
                </div>

                {/* Direct Visual Contrast Banner: Kharab vs Accha */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                  {/* Left: Unhealthy Current Product */}
                  <div className="p-3.5 rounded-2xl border bg-red-50/60 dark:bg-red-950/30 border-red-200 dark:border-red-900/60 flex items-center justify-between gap-2">
                    <div className="min-w-0">
                      <div className="flex items-center gap-1 text-[11px] font-bold text-red-600 dark:text-red-400 uppercase">
                        <span>❌</span>
                        <span>{isHindi ? "वर्तमान उत्पाद (कम स्कोर)" : "Current (Unhealthy)"}</span>
                      </div>
                      <p className="font-bold text-xs sm:text-sm text-slate-900 dark:text-zinc-100 truncate mt-0.5">
                        {product.name}
                      </p>
                    </div>
                    <div className="px-2.5 py-1 rounded-xl bg-red-500 text-white font-black text-xs flex-shrink-0">
                      {product.healthScore}/100
                    </div>
                  </div>

                  {/* Right: Healthy Cleaner Switch */}
                  <div className="p-3.5 rounded-2xl border bg-emerald-50/80 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800/80 flex items-center justify-between gap-2">
                    <div className="min-w-0">
                      <div className="flex items-center gap-1 text-[11px] font-bold text-[#059669] dark:text-[#34D399] uppercase">
                        <span>✅</span>
                        <span>{isHindi ? "शुद्ध विकल्प (बेहतर सेहत)" : "Clean Switch (Healthy)"}</span>
                      </div>
                      <p className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white truncate mt-0.5">
                        {cleanAlternatives[0].name}
                      </p>
                    </div>
                    <div className="px-2.5 py-1 rounded-xl bg-[#10B981] text-white font-black text-xs flex-shrink-0 shadow-xs">
                      {cleanAlternatives[0].score}/100
                    </div>
                  </div>
                </div>

                {/* Top Alternative Card Item */}
                <div
                  className={`p-4 rounded-2xl border transition-all ${
                    isDark ? "bg-[#1B232E] border-slate-700" : "bg-white border-slate-200/90 shadow-xs"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-[#059669] dark:text-[#34D399] bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-md border border-emerald-200 dark:border-emerald-800">
                          {cleanAlternatives[0].brand}
                        </span>
                        {(cleanAlternatives[0].price || cleanAlternatives[0].priceEst) && (
                          <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                            {cleanAlternatives[0].price || cleanAlternatives[0].priceEst}
                          </span>
                        )}
                      </div>

                      <h5 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white mt-1">
                        {cleanAlternatives[0].name}
                      </h5>

                      {/* Benefit Tag */}
                      {(cleanAlternatives[0].benefit || cleanAlternatives[0].benefitHi || (cleanAlternatives[0].tags && cleanAlternatives[0].tags.length > 0)) && (
                        <div className="mt-1.5 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg bg-emerald-500/10 dark:bg-emerald-950/50 text-[#065F46] dark:text-emerald-300 text-xs font-bold border border-emerald-500/25">
                          <Wheat className="w-3.5 h-3.5 text-[#10B981] flex-shrink-0" />
                          <span>
                            {isHindi
                              ? `फायदा: ${cleanAlternatives[0].benefitHi || cleanAlternatives[0].benefit || cleanAlternatives[0].tags?.join(", ")}`
                              : `Benefit: ${cleanAlternatives[0].benefit || cleanAlternatives[0].benefitHi || cleanAlternatives[0].tags?.join(", ")}`}
                          </span>
                        </div>
                      )}

                      <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed font-normal">
                        {isHindi ? cleanAlternatives[0].reasonHi : cleanAlternatives[0].reasonEn}
                      </p>
                    </div>

                    <div className="flex flex-col items-end gap-1 flex-shrink-0">
                      <div className="px-3 py-1 rounded-xl bg-[#10B981] text-white font-black text-xs shadow-xs">
                        {cleanAlternatives[0].score}/100
                      </div>
                      <span className="text-[11px] font-bold text-[#059669] dark:text-[#34D399]">
                        +{Math.max(1, cleanAlternatives[0].score - product.healthScore)} Pts
                      </span>
                    </div>
                  </div>

                  <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-700/60 flex items-center justify-between gap-2">
                    <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                      {isHindi ? "किराना सुपरमार्केट्स व ब्लिंकिट पर उपलब्ध" : "Available on Blinkit / Zepto / Stores"}
                    </span>
                    <button
                      onClick={() => setActiveTab("alternatives")}
                      className="px-3 py-1.5 rounded-xl bg-[#059669] hover:bg-[#047857] text-white text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors shadow-xs"
                    >
                      <span>{isHindi ? "विकल्प देखें" : "View Details"}</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* FSSAI Safety Audit Card */}
            <div
              className={`p-5 rounded-3xl border ${
                isDark ? "bg-[#161C24] border-slate-800" : "bg-white border-slate-200/80 shadow-xs"
              }`}
            >
              <div className="flex items-center gap-2 text-[#059669] dark:text-[#34D399] mb-2">
                <ShieldCheck className="w-5 h-5 text-[#10B981]" />
                <h4 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white">
                  {isHindi ? "मिलावट एवं एफएसएसएआई सुरक्षा जांच" : "Adulteration & FSSAI Safety Audit"}
                </h4>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                {isHindi ? product.adulterationCheck.detailsHi : product.adulterationCheck.detailsEn}
              </p>
            </div>
          </div>
        )}

        {/* TAB 2: INGREDIENTS DECODER */}
        {activeTab === "ingredients" && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <div
              className={`p-6 rounded-3xl border transition-all ${
                isDark ? "bg-[#131821] border-slate-800/90" : "bg-white border-slate-200/80 shadow-xs"
              }`}
            >
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100 dark:border-slate-800">
                <h3 className="font-bold text-sm sm:text-base flex items-center gap-2 text-slate-900 dark:text-white">
                  <Wheat className="w-4 h-4 text-[#10B981]" />
                  <span>{isHindi ? "सामग्री सूची डिकोडर" : "Ingredients & E-Code Decoder"}</span>
                </h3>
                <span className="text-xs text-slate-400 font-semibold">
                  {synchronizedIngredients.length} {isHindi ? "तत्व" : "Items"}
                </span>
              </div>

              <div className="space-y-2.5">
                {synchronizedIngredients.map((ing, idx) => (
                  <div
                    key={idx}
                    className={`p-4 rounded-2xl border flex items-start justify-between gap-3 text-xs transition-all ${
                      ing.safety === "hazard"
                        ? "bg-rose-50/50 border-rose-200/70 text-rose-950 dark:bg-rose-950/20 dark:border-rose-900/40 dark:text-rose-200"
                        : ing.safety === "caution"
                        ? "bg-amber-50/50 border-amber-200/70 text-amber-950 dark:bg-amber-950/20 dark:border-amber-900/40 dark:text-amber-200"
                        : "bg-slate-50/80 dark:bg-[#0E131A] border-slate-200/70 dark:border-slate-800 text-slate-800 dark:text-slate-200"
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm">
                          {isHindi ? ing.nameHi || ing.name : ing.name}
                        </span>
                        {isHindi && ing.nameHi && ing.nameHi !== ing.name && (
                          <span className="text-[11px] text-slate-400">
                            ({ing.name})
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                        {ing.purpose}
                      </p>
                    </div>

                    <span
                      className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase flex-shrink-0 border ${
                        ing.safety === "hazard"
                          ? "bg-rose-100/80 text-rose-700 border-rose-200 dark:bg-rose-950 dark:text-rose-300 dark:border-rose-900/50"
                          : ing.safety === "caution"
                          ? "bg-amber-100/80 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-900/50"
                          : "bg-emerald-100/80 text-[#059669] border-emerald-200 dark:bg-emerald-950 dark:text-[#34D399] dark:border-emerald-800/50"
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
              className={`p-6 rounded-3xl border transition-all ${
                isDark ? "bg-[#131821] border-slate-800/90" : "bg-white border-slate-200/80 shadow-xs"
              }`}
            >
              <div className="flex items-center justify-between mb-5 pb-3 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                    {isHindi ? "पोषण संबंधी जानकारी (प्रति 100 ग्राम)" : "Nutrition Facts (Per 100g)"}
                  </h3>
                  <p className="text-xs text-slate-400">
                    {isHindi ? "भारतीय आईसीएमआर (ICMR) दिशानिर्देशों पर आधारित" : "Benchmark against Indian daily limits"}
                  </p>
                </div>
                <Scale className="w-5 h-5 text-[#10B981]" />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="p-4 rounded-2xl bg-slate-50/80 dark:bg-[#0E131A] border border-slate-200/80 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Energy</span>
                  <p className="text-lg font-black mt-1 text-slate-900 dark:text-white">
                    {product.nutritionPer100g.calories}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50/80 dark:bg-[#0E131A] border border-slate-200/80 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Protein</span>
                  <p className="text-lg font-black mt-1 text-slate-900 dark:text-white">
                    {product.nutritionPer100g.protein}
                  </p>
                </div>

                <div
                  className={`p-4 rounded-2xl border transition-all ${
                    parseFloat(product.nutritionPer100g.sugar) > 15
                      ? "bg-rose-50/60 border-rose-200/80 dark:bg-rose-950/20 dark:border-rose-900/40"
                      : "bg-slate-50/80 dark:bg-[#0E131A] border-slate-200/80 dark:border-slate-800"
                  }`}
                >
                  <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Total Sugar</span>
                  <p className="text-lg font-black mt-1 text-slate-900 dark:text-white">
                    {product.nutritionPer100g.sugar}
                  </p>
                  {product.nutritionPer100g.addedSugar && (
                    <span className="text-[10px] text-rose-500 font-bold block mt-0.5">
                      ({product.nutritionPer100g.addedSugar} Added)
                    </span>
                  )}
                </div>

                <div
                  className={`p-4 rounded-2xl border transition-all ${
                    parseFloat(product.nutritionPer100g.totalFat) > 20
                      ? "bg-rose-50/60 border-rose-200/80 dark:bg-rose-950/20 dark:border-rose-900/40"
                      : "bg-slate-50/80 dark:bg-[#0E131A] border-slate-200/80 dark:border-slate-800"
                  }`}
                >
                  <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Total Fat</span>
                  <p className="text-lg font-black mt-1 text-slate-900 dark:text-white">
                    {product.nutritionPer100g.totalFat}
                  </p>
                  {product.nutritionPer100g.saturatedFat && (
                    <span className="text-[10px] text-amber-600 dark:text-amber-400 font-bold block mt-0.5">
                      ({product.nutritionPer100g.saturatedFat} Sat. Fat)
                    </span>
                  )}
                </div>

                <div
                  className={`p-4 rounded-2xl border transition-all ${
                    parseInt(product.nutritionPer100g.sodium) > 600
                      ? "bg-rose-50/60 border-rose-200/80 dark:bg-rose-950/20 dark:border-rose-900/40"
                      : "bg-slate-50/80 dark:bg-[#0E131A] border-slate-200/80 dark:border-slate-800"
                  }`}
                >
                  <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Sodium</span>
                  <p className="text-lg font-black mt-1 text-slate-900 dark:text-white">
                    {product.nutritionPer100g.sodium}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50/80 dark:bg-[#0E131A] border border-slate-200/80 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Carbs</span>
                  <p className="text-lg font-black mt-1 text-slate-900 dark:text-white">
                    {product.nutritionPer100g.carbohydrates}
                  </p>
                </div>

                {product.nutritionPer100g.transFat && (
                  <div className="p-4 rounded-2xl bg-slate-50/80 dark:bg-[#0E131A] border border-slate-200/80 dark:border-slate-800">
                    <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Trans Fat</span>
                    <p className="text-lg font-black mt-1 text-slate-900 dark:text-white">
                      {product.nutritionPer100g.transFat}
                    </p>
                  </div>
                )}

                {product.nutritionPer100g.fiber && (
                  <div className="p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200/70 dark:border-emerald-800/60">
                    <span className="text-[10px] text-[#059669] dark:text-[#34D399] uppercase font-bold tracking-wider">Fiber</span>
                    <p className="text-lg font-black mt-1 text-[#059669] dark:text-[#34D399]">
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
            <div className="space-y-3.5">
              <div className="flex items-center justify-between px-1">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#059669] dark:text-[#34D399] flex items-center gap-1.5">
                  <span className="text-sm">🌾</span>
                  <span>{isHindi ? "स्वस्थ एवं शुद्ध भारतीय विकल्प" : "Cleaner Indian Alternatives"}</span>
                </h3>
                <span className="text-xs text-slate-400 font-medium">
                  {isHindi ? "किराना सुपरमार्केट्स पर उपलब्ध" : "Blinkit / Zepto / Supermarkets"}
                </span>
              </div>

              {isCleanChoice ? (
                <div
                  className={`p-6 sm:p-8 rounded-3xl border text-center space-y-4 transition-all ${
                    isDark
                      ? "bg-emerald-950/20 border-emerald-800/50 text-zinc-200"
                      : "bg-emerald-50/70 border-emerald-200/80 text-emerald-950 shadow-xs"
                  }`}
                >
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#059669] to-[#10B981] text-white flex items-center justify-center mx-auto shadow-md shadow-[#10B981]/25">
                    <ShieldCheck className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-base sm:text-lg text-slate-900 dark:text-white">
                      {isHindi ? "यह उत्पाद पहले से ही स्वच्छ एवं सुरक्षित है!" : "Certified Clean Choice!"}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-300 max-w-md mx-auto mt-1.5 leading-relaxed">
                      {isHindi
                        ? `इस उत्पाद का स्वास्थ्य स्कोर ${product.healthScore}/100 है। इसमें कोई हानिकारक पाम ऑयल, अतिरिक्त मैदा, केमिकल या सिंथेटिक रंग नहीं मिले हैं। यह दैनिक उपभोग के लिए अच्छा विकल्प है।`
                        : `This product scored ${product.healthScore}/100 and meets Indian clean food standards with zero harmful ingredients.`}
                    </p>
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-emerald-500/15 text-[#059669] dark:text-[#34D399] font-bold text-xs border border-emerald-500/30">
                    <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
                    <span>{isHindi ? "स्वच्छ एवं सुरक्षित उत्पाद प्रमाणित" : "Certified Clean Choice"}</span>
                  </div>
                </div>
              ) : (
                <>
                  {/* Context notice explaining that these are replacements FOR the unhealthy product */}
                  <div className="p-4 rounded-2xl bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200/70 dark:border-amber-800/50 text-xs text-amber-900 dark:text-amber-200 flex items-start gap-3">
                    <Info className="w-4 h-4 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold block">
                        {isHindi
                          ? `⚠️ '${product.name}' का स्वास्थ्य स्कोर कम (${product.healthScore}/100) है:`
                          : `⚠️ '${product.name}' has a low score (${product.healthScore}/100):`}
                      </span>
                      <span className="text-[11px] text-amber-800 dark:text-amber-300">
                        {isHindi
                          ? "इस अस्वास्थ्यकर उत्पाद को लेने के बजाय, नीचे दिए गए 100% शुद्ध और स्वास्थ्यवर्धक देसी विकल्प चुनें।"
                          : "Instead of consuming this unhealthy item, switch to these verified clean & healthy alternatives below."}
                      </span>
                    </div>
                  </div>

                  {cleanAlternatives.map((alt, idx) => (
                    <div
                      key={idx}
                      className={`p-5 sm:p-6 rounded-3xl border transition-all ${
                        isDark ? "bg-[#131821] border-slate-800 hover:border-emerald-800/60" : "bg-white border-slate-200/80 hover:border-emerald-300 shadow-xs"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-[#059669] dark:text-[#34D399] bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-0.5 rounded-md border border-emerald-200 dark:border-emerald-800">
                              {alt.brand}
                            </span>
                            {(alt.price || alt.priceEst) && (
                              <span className="text-xs text-slate-500 dark:text-slate-400 font-bold">
                                {alt.price || alt.priceEst}
                              </span>
                            )}
                          </div>

                          <h4 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white mt-1.5">
                            {alt.name}
                          </h4>

                          {/* Clean Certified Benefit Tag */}
                          {(alt.benefit || alt.benefitHi || (alt.tags && alt.tags.length > 0)) && (
                            <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/10 dark:bg-emerald-950/50 text-[#065F46] dark:text-emerald-300 border border-emerald-500/25 text-xs font-bold">
                              <Wheat className="w-3.5 h-3.5 text-[#10B981] flex-shrink-0" />
                              <span>
                                {isHindi
                                  ? `फायदा: ${alt.benefitHi || alt.benefit || alt.tags?.join(", ")}`
                                  : `Benefit: ${alt.benefit || alt.benefitHi || alt.tags?.join(", ")}`}
                              </span>
                            </div>
                          )}

                          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                            {isHindi ? alt.reasonHi : alt.reasonEn}
                          </p>

                          {/* Tags */}
                          {alt.tags && alt.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 mt-3">
                              {alt.tags.map((t, tidx) => (
                                <span
                                  key={tidx}
                                  className="text-[11px] font-semibold text-[#059669] dark:text-[#34D399] bg-emerald-50/80 dark:bg-emerald-950/40 px-2.5 py-0.5 rounded-full border border-emerald-200/60 dark:border-emerald-800/60"
                                >
                                  ✓ {t}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>

                        <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                          <div className="px-3 py-1 rounded-2xl bg-[#10B981] text-white font-bold text-xs shadow-xs">
                            {alt.score}/100
                          </div>
                          <span className="text-[11px] font-bold text-[#059669] dark:text-[#34D399]">
                            +{Math.max(1, alt.score - product.healthScore)} Pts
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
        )}

        {/* Primary Action Buttons Bar */}
        <div className="pt-3 space-y-3">
          {/* Add to List Button */}
          <button
            id="result-save-toggle-btn"
            onClick={handleSaveClick}
            className={`w-full py-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 shadow-lg transition-all active:scale-[0.99] cursor-pointer ${
              isSaved
                ? "bg-slate-900 text-[#10B981] border border-[#10B981]/40"
                : "bg-gradient-to-r from-[#059669] via-[#10B981] to-[#059669] hover:brightness-105 text-white shadow-emerald-900/15"
            }`}
          >
            {isSaved ? (
              <>
                <BookmarkCheck className="w-5 h-5 text-[#10B981]" />
                <span>{isHindi ? "मेरी लिस्ट में सहेजा गया (Saved)" : "Saved in My Grocery List"}</span>
              </>
            ) : (
              <>
                <Bookmark className="w-5 h-5" />
                <span>{isHindi ? "मेरे लिस्ट में डालो (Save to List)" : "Save to My List"}</span>
              </>
            )}
          </button>

          {/* Share on WhatsApp Button */}
          <button
            id="result-whatsapp-share-btn"
            onClick={() => setIsShareModalOpen(true)}
            className={`w-full py-3.5 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 border transition-all cursor-pointer ${
              isDark
                ? "bg-[#131821] border-slate-800 text-slate-200 hover:bg-slate-800"
                : "bg-white border-slate-200/90 text-slate-700 hover:bg-slate-50 shadow-2xs"
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
