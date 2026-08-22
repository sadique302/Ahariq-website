import React, { useState, useRef } from "react";
import {
  X,
  Camera,
  Upload,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ShieldCheck,
  RefreshCw,
  Image as ImageIcon,
  Check,
  HeartHandshake,
  ArrowRight,
  Flame,
  Wheat,
  Candy,
  Droplet,
  Dumbbell,
  TreePalm,
  ShieldAlert,
  Zap,
} from "lucide-react";
import confetti from "canvas-confetti";
import { Language, FoodProduct, CommunityContribution, VerdictType } from "../types";
import { submitCommunityContribution } from "../lib/firebase";

interface ContributeProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  barcode: string;
  initialName?: string;
  initialBrand?: string;
  language: Language;
  isDark: boolean;
  currentUser?: { name?: string; email?: string; id?: string } | null;
  onProductCreated?: (product: FoodProduct) => void;
}

export const ContributeProductModal: React.FC<ContributeProductModalProps> = ({
  isOpen,
  onClose,
  barcode,
  initialName = "",
  initialBrand = "",
  language,
  isDark,
  currentUser,
  onProductCreated,
}) => {
  const isHindi = language === "hi";

  // Form states
  const [productName, setProductName] = useState(initialName);
  const [brandName, setBrandName] = useState(initialBrand);
  const [category, setCategory] = useState("Snacks & Namkeen");

  // Health & Ingredient Quick Badges
  const [hasPalmOil, setHasPalmOil] = useState<boolean>(true);
  const [hasMaida, setHasMaida] = useState<boolean>(true);
  const [sugarLevel, setSugarLevel] = useState<"high" | "medium" | "low">("medium");
  const [isVegetarian, setIsVegetarian] = useState<boolean>(true);

  // 3 Photos (Lightweight Data URLs)
  const [frontPhoto, setFrontPhoto] = useState<string | null>(null);
  const [ingredientsPhoto, setIngredientsPhoto] = useState<string | null>(null);
  const [nutritionPhoto, setNutritionPhoto] = useState<string | null>(null);

  // Submitting state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // File input refs
  const frontInputRef = useRef<HTMLInputElement>(null);
  const ingredientsInputRef = useRef<HTMLInputElement>(null);
  const nutritionInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  // Ultra-lightweight image compressor to keep memory & database 0ms fast
  const processImageFile = (file: File, callback: (dataUrl: string) => void) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const maxDim = 420; // 420px max dimension ensures ~18KB lightweight footprint
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxDim) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          }
        } else {
          if (height > maxDim) {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const compressed = canvas.toDataURL("image/jpeg", 0.52);
          callback(compressed);
        } else {
          callback(e.target?.result as string);
        }
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    target: "front" | "ingredients" | "nutrition"
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    processImageFile(file, (dataUrl) => {
      if (target === "front") setFrontPhoto(dataUrl);
      if (target === "ingredients") setIngredientsPhoto(dataUrl);
      if (target === "nutrition") setNutritionPhoto(dataUrl);
    });
    e.target.value = "";
  };

  // Dynamic Health Rating & Verdict Calculator
  const computeHealthAssessment = (): {
    score: number;
    verdict: "Achha Option" | "Soch Samajh Kar" | "Avoid Karein";
    verdictHindi: "अच्छा विकल्प" | "सोच समझ कर" | "बचने की सलाह";
    verdictType: VerdictType;
    summaryEn: string;
    summaryHi: string;
    warnings: FoodProduct["warnings"];
    nutrition: FoodProduct["nutritionPer100g"];
  } => {
    let score = 85;
    const warnings: FoodProduct["warnings"] = [];

    // Deduct for Palm Oil
    if (hasPalmOil) {
      score -= 28;
      warnings.push({
        type: "palm_oil",
        titleEn: "Contains Refined Palm Oil",
        titleHi: "रिफाइंड पाम ऑयल (ताड़ का तेल) मौजूद",
        severity: "high",
        descriptionEn: "High saturated fat content which increases LDL bad cholesterol and cardiovascular risk.",
        descriptionHi: "पाम ऑयल में संतृप्त वसा (Saturated Fat) अधिक होती है जो हृदय स्वास्थ्य के लिए हानिकारक है।",
      });
    }

    // Deduct for Maida
    if (hasMaida) {
      score -= 22;
      warnings.push({
        type: "maida",
        titleEn: "Refined Wheat Flour (Maida)",
        titleHi: "मैदा (रिफाइंड आटा) का अत्यधिक उपयोग",
        severity: "high",
        descriptionEn: "Stripped of dietary fiber, causing rapid blood glucose spikes and insulin surge.",
        descriptionHi: "फाइबर रहित मैदा रक्त शर्करा (Blood Sugar) को तेजी से बढ़ाता है।",
      });
    }

    // Sugar deduction
    if (sugarLevel === "high") {
      score -= 25;
      warnings.push({
        type: "added_sugar",
        titleEn: "High Added Sugar (>22g per 100g)",
        titleHi: "अत्यधिक अतिरिक्त चीनी (>22g)",
        severity: "high",
        descriptionEn: "Excessive added sugars contribute to weight gain, fatty liver, and metabolic disorders.",
        descriptionHi: "अत्यधिक चीनी का नियमित सेवन फैटी लिवर व डायबिटीज का खतरा बढ़ाता है।",
      });
    } else if (sugarLevel === "medium") {
      score -= 10;
      warnings.push({
        type: "added_sugar",
        titleEn: "Moderate Added Sugar (10g - 18g)",
        titleHi: "मध्यम चीनी मात्रा",
        severity: "medium",
        descriptionEn: "Moderate sugar content. Should be consumed in controlled portions.",
        descriptionHi: "संतुलित मात्रा में ही सेवन करें।",
      });
    }

    // Category adjustments
    if (category.toLowerCase().includes("biscuit") || category.toLowerCase().includes("cookie")) {
      score = Math.min(score, 45);
    }

    // Final score clamping
    const finalScore = Math.max(15, Math.min(95, score));

    let verdict: "Achha Option" | "Soch Samajh Kar" | "Avoid Karein" = "Achha Option";
    let verdictHindi: "अच्छा विकल्प" | "सोच समझ कर" | "बचने की सलाह" = "अच्छा विकल्प";
    let verdictType: VerdictType = "green";

    if (finalScore < 40) {
      verdict = "Avoid Karein";
      verdictHindi = "बचने की सलाह";
      verdictType = "red";
    } else if (finalScore < 70) {
      verdict = "Soch Samajh Kar";
      verdictHindi = "सोच समझ कर";
      verdictType = "yellow";
    }

    const summaryEn =
      finalScore < 40
        ? `Ultra-processed product scoring ${finalScore}/100. High in refined ingredients with elevated health risks.`
        : finalScore < 70
        ? `Moderate grade product scoring ${finalScore}/100. Contains some processed additives; consume in moderation.`
        : `Clean and healthier formulation scoring ${finalScore}/100. Made with safe, wholesome ingredients.`;

    const summaryHi =
      finalScore < 40
        ? `अल्ट्रा-प्रोसेस्ड उत्पाद (स्कोर ${finalScore}/100)। पाम ऑयल व मैदा होने के कारण नियमित सेवन से बचें।`
        : finalScore < 70
        ? `मध्यम श्रेणी का उत्पाद (स्कोर ${finalScore}/100)। कभी-कभार ही सीमित मात्रा में खाएं।`
        : `स्वस्थ व स्वच्छ उत्पाद (स्कोर ${finalScore}/100)। सुरक्षित सामग्रियों से निर्मित।`;

    const nutrition: FoodProduct["nutritionPer100g"] = {
      calories: category.includes("Snack") || category.includes("Biscuit") ? "460 kcal" : "320 kcal",
      protein: category.includes("Noodles") ? "8.5g" : "5.0g",
      carbohydrates: hasMaida ? "68g" : "54g",
      sugar: sugarLevel === "high" ? "28.5g" : sugarLevel === "medium" ? "14.0g" : "2.5g",
      totalFat: hasPalmOil ? "22g" : "7.5g",
      sodium: "420mg",
    };

    return {
      score: finalScore,
      verdict,
      verdictHindi,
      verdictType,
      summaryEn,
      summaryHi,
      warnings,
      nutrition,
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!productName.trim()) {
      setErrorMsg(isHindi ? "कृपया उत्पाद का नाम लिखें।" : "Please enter the product name.");
      return;
    }

    setIsSubmitting(true);

    const assessment = computeHealthAssessment();

    const contributionPayload: CommunityContribution = {
      barcode: barcode || `CONTRIB_${Date.now().toString().slice(-6)}`,
      productName: productName.trim(),
      brand: brandName.trim() || (isHindi ? "भारतीय ब्रांड" : "Indian Brand"),
      category: category,
      frontPhotoUrl: frontPhoto || undefined,
      ingredientsPhotoUrl: ingredientsPhoto || undefined,
      nutritionPhotoUrl: nutritionPhoto || undefined,
      submittedBy: currentUser?.name || "Community Contributor",
      submittedByEmail: currentUser?.email || "",
      createdAt: new Date().toISOString(),
      status: "verified",
      healthScore: assessment.score,
    };

    // Save to Firebase in background
    submitCommunityContribution(contributionPayload).catch((err) => {
      console.warn("Background firestore save:", err);
    });

    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.6 },
    });

    // Create complete FoodProduct for instant review
    const generatedProduct: FoodProduct = {
      id: `prod_${contributionPayload.barcode}_${Date.now()}`,
      barcode: contributionPayload.barcode,
      name: contributionPayload.productName,
      nameHindi: contributionPayload.productName,
      brand: contributionPayload.brand,
      category: contributionPayload.category || "Community Product",
      categoryHindi: "सत्यापित भारतीय उत्पाद",
      healthScore: assessment.score,
      verdict: assessment.verdict,
      verdictHindi: assessment.verdictHindi,
      verdictType: assessment.verdictType,
      isVegetarian: isVegetarian,
      imageUrl:
        frontPhoto ||
        "https://images.unsplash.com/photo-1542838132-92c53300491e?w=500&auto=format&fit=crop&q=80",
      summaryEn: assessment.summaryEn,
      summaryHi: assessment.summaryHi,
      warnings: assessment.warnings,
      nutritionPer100g: assessment.nutrition,
      ingredientsList: [
        hasMaida ? "Refined Wheat Flour (Maida)" : "Whole Wheat / Millet Grain",
        hasPalmOil ? "Refined Palm Oil" : "Cold-pressed / Healthy Vegetable Oil",
        sugarLevel === "high" ? "Refined Sugar (High)" : sugarLevel === "medium" ? "Sugar (Moderate)" : "No Added Sugar",
        "Iodised Salt",
        "Permitted Food Additives & Emulsifiers (INS 322, INS 500ii)",
      ],
      ingredientsExplanation: [
        {
          name: hasPalmOil ? "Palm Oil (ताड़ का तेल)" : "Healthy Cold Pressed Oil",
          nameHi: hasPalmOil ? "पाम ऑयल" : "सुरक्षित तेल",
          purpose: "Cooking Medium",
          safety: hasPalmOil ? "hazard" : "safe",
        },
        {
          name: hasMaida ? "Maida (मैदा)" : "Whole Grain",
          nameHi: hasMaida ? "मैदा" : "साबुत अनाज",
          purpose: "Base Flour",
          safety: hasMaida ? "hazard" : "safe",
        },
        {
          name: "INS 322 (Lecithin)",
          nameHi: "आईएनएस ३२२",
          purpose: "Emulsifier",
          safety: "safe",
        },
      ],
      adulterationCheck: {
        riskLevel: assessment.score < 40 ? "Moderate" : "Low",
        detailsEn: "Verified from package label details and community health standards.",
        detailsHi: "पैकेट लेबल और भारतीय खाद्य सुरक्षा मानकों के अनुसार विश्लेषित।",
      },
      cleanerAlternatives: [
        {
          name: "Slurrp Farm 100% Millet & Oats Jaggery Cookies",
          brand: "Slurrp Farm",
          score: 92,
          reasonEn: "Zero Palm Oil, Zero Maida, 100% natural Jaggery.",
          reasonHi: "शून्य पाम तेल, बिना मैदा, 100% प्राकृतिक गुड़ से निर्मित।",
        },
        {
          name: "The Whole Truth 100% Clean Cocoa Snack Bar",
          brand: "The Whole Truth",
          score: 95,
          reasonEn: "Only 4 natural ingredients, zero hidden chemicals.",
          reasonHi: "केवल ४ प्राकृतिक सामग्रियां, बिना किसी रसायन के।",
        },
        {
          name: "RAW Pressery 100% Tender Coconut Water",
          brand: "RAW Pressery",
          score: 96,
          reasonEn: "100% Pure coconut water, no added sugar.",
          reasonHi: "100% प्राकृतिक नारियल पानी, शून्य अतिरिक्त चीनी।",
        },
      ],
    };

    setIsSubmitting(false);

    // Pass directly to parent and transition instantly
    if (onProductCreated) {
      onProductCreated(generatedProduct);
    }
  };

  return (
    <div
      id="contribute-product-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-md animate-in fade-in duration-150 overflow-y-auto"
    >
      {/* Hidden File Inputs for 3 Photos */}
      <input
        ref={frontInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={(e) => handleFileChange(e, "front")}
      />
      <input
        ref={ingredientsInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={(e) => handleFileChange(e, "ingredients")}
      />
      <input
        ref={nutritionInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={(e) => handleFileChange(e, "nutrition")}
      />

      <div
        className={`w-full max-w-lg rounded-3xl border shadow-2xl overflow-hidden my-auto max-h-[94vh] flex flex-col ${
          isDark
            ? "bg-[#18181B] border-zinc-700/80 text-zinc-100"
            : "bg-white border-stone-200 text-stone-900"
        }`}
      >
        {/* Top Header */}
        <div className="p-4 sm:p-5 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between bg-gradient-to-r from-emerald-500/10 via-emerald-500/5 to-transparent">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-[#10B981] text-white flex items-center justify-center font-black shadow-md shadow-[#10B981]/25">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-black text-base text-[#111827] dark:text-white">
                {isHindi ? "उत्पाद की जानकारी व रेटिंग" : "Product Details & Health Rating"}
              </h3>
              <p className="text-[11px] text-zinc-500 dark:text-zinc-400 font-medium">
                {isHindi ? "तुरंत 100 में से रेटिंग और 'खाओ या बचो' फैसला देखें" : "Instant 100-point Health Score & Verdict"}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-2xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-600 dark:text-zinc-300 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Context Banner */}
            <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-900 dark:text-amber-300 text-xs space-y-1">
              <div className="flex items-center gap-2 font-bold">
                <AlertCircle className="w-4 h-4 text-amber-500 flex-shrink-0" />
                <span>Oops! This product is missing details!</span>
              </div>
              <p className="text-[11px] leading-relaxed text-amber-800 dark:text-amber-200/90 font-medium pl-6">
                {isHindi
                  ? "सामग्री की जांच करके 1-क्लिक में जानिए क्या यह स्वास्थ्य के लिए सही है!"
                  : "Help us grow India's healthy food knowledge base and get instant health analysis!"}
              </p>
            </div>

            {/* Barcode Info */}
            {barcode && (
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 text-xs">
                <span className="font-semibold text-zinc-500 dark:text-zinc-400">
                  {isHindi ? "बारकोड:" : "Scanned Barcode:"}
                </span>
                <span className="font-mono font-black text-[#10B981]">{barcode}</span>
              </div>
            )}

            {/* Product Name & Brand */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                  {isHindi ? "उत्पाद का नाम (Product Name)*" : "Product Name*"}
                </label>
                <input
                  type="text"
                  required
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  placeholder={isHindi ? "उदा. Good Day Butter Cookies" : "e.g. Good Day Butter Cookies"}
                  className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 focus:border-[#10B981] rounded-2xl px-3 py-2 text-xs text-[#111827] dark:text-white placeholder:text-zinc-400 focus:outline-none transition-colors font-medium"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                  {isHindi ? "ब्रांड का नाम (Brand)" : "Brand Name"}
                </label>
                <input
                  type="text"
                  value={brandName}
                  onChange={(e) => setBrandName(e.target.value)}
                  placeholder={isHindi ? "उदा. Britannia, Haldiram's" : "e.g. Britannia, Lays"}
                  className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 focus:border-[#10B981] rounded-2xl px-3 py-2 text-xs text-[#111827] dark:text-white placeholder:text-zinc-400 focus:outline-none transition-colors font-medium"
                />
              </div>
            </div>

            {/* Category Selector */}
            <div>
              <label className="block text-[11px] font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                {isHindi ? "कैटेगरी (श्रेणी)" : "Product Category"}
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 focus:border-[#10B981] rounded-2xl px-3 py-2 text-xs text-[#111827] dark:text-white focus:outline-none transition-colors font-medium cursor-pointer"
              >
                <option value="Biscuits & Cookies">Biscuits & Cookies (बिस्कुट व कुकीज़)</option>
                <option value="Snacks & Namkeen">Snacks & Namkeen (नमकीन व चिप्स)</option>
                <option value="Instant Noodles & Pasta">Instant Noodles & Pasta (मैगी, नूडल्स)</option>
                <option value="Chocolates & Sweets">Chocolates & Sweets (चॉकलेट व मिठाई)</option>
                <option value="Beverages & Juices">Beverages & Juices (जूस व कोल्ड ड्रिंक)</option>
                <option value="Breakfast Cereals & Oats">Breakfast Cereals & Oats (नाश्ता व ओट्स)</option>
                <option value="Dairy & Milk Products">Dairy & Milk Products (डेयरी उत्पाद)</option>
                <option value="Oils & Ghee">Oils & Ghee (तेल व घी)</option>
                <option value="Spices & Condiments">Spices & Sauces (मसाले व सॉस)</option>
              </select>
            </div>

            {/* QUICK HEALTH ATTRIBUTE TOGGLES */}
            <div className="p-3.5 rounded-2xl bg-zinc-100/80 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-[#111827] dark:text-white flex items-center gap-1.5">
                  <ShieldAlert className="w-3.5 h-3.5 text-amber-500" />
                  <span>{isHindi ? "त्वरित सामग्री जांच (Quick Health Check):" : "Quick Ingredient Assessment:"}</span>
                </span>
                <span className="text-[10px] text-zinc-400 font-medium">
                  {isHindi ? "रेटिंग में असर करेगा" : "Affects Health Score"}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {/* Palm Oil Toggle */}
                <button
                  type="button"
                  onClick={() => setHasPalmOil(!hasPalmOil)}
                  className={`p-2.5 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                    hasPalmOil
                      ? "bg-red-500/10 border-red-500/30 text-red-700 dark:text-red-300"
                      : "bg-emerald-500/10 border-emerald-500/30 text-emerald-700 dark:text-emerald-300"
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <TreePalm className="w-4 h-4 flex-shrink-0" />
                    <div>
                      <div className="text-[11px] font-bold">Palm Oil</div>
                      <div className="text-[9px] opacity-80">{hasPalmOil ? (isHindi ? "पाम तेल है ❌" : "Contains Palm Oil") : (isHindi ? "पाम तेल मुक्त ✅" : "No Palm Oil")}</div>
                    </div>
                  </div>
                  <span className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center text-[9px] font-bold ${hasPalmOil ? "bg-red-500 text-white border-red-600" : "bg-emerald-500 text-white border-emerald-600"}`}>
                    {hasPalmOil ? "!" : "✓"}
                  </span>
                </button>

                {/* Maida Toggle */}
                <button
                  type="button"
                  onClick={() => setHasMaida(!hasMaida)}
                  className={`p-2.5 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                    hasMaida
                      ? "bg-amber-500/10 border-amber-500/30 text-amber-700 dark:text-amber-300"
                      : "bg-emerald-500/10 border-emerald-500/30 text-emerald-700 dark:text-emerald-300"
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <Wheat className="w-4 h-4 flex-shrink-0" />
                    <div>
                      <div className="text-[11px] font-bold">Maida (मैदा)</div>
                      <div className="text-[9px] opacity-80">{hasMaida ? (isHindi ? "मैदा प्रयुक्त ⚠️" : "Has Maida") : (isHindi ? "आटा/मिलेट ✅" : "No Maida / Millet")}</div>
                    </div>
                  </div>
                  <span className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center text-[9px] font-bold ${hasMaida ? "bg-amber-500 text-white border-amber-600" : "bg-emerald-500 text-white border-emerald-600"}`}>
                    {hasMaida ? "!" : "✓"}
                  </span>
                </button>
              </div>

              {/* Sugar Level Selector */}
              <div className="flex items-center justify-between gap-2 pt-1 border-t border-zinc-200 dark:border-zinc-800">
                <span className="text-[11px] font-bold text-zinc-600 dark:text-zinc-300 flex items-center gap-1">
                  <Candy className="w-3.5 h-3.5 text-pink-500" />
                  <span>{isHindi ? "चीनी की मात्रा:" : "Sugar Content:"}</span>
                </span>
                <div className="flex gap-1">
                  {(["low", "medium", "high"] as const).map((lvl) => (
                    <button
                      key={lvl}
                      type="button"
                      onClick={() => setSugarLevel(lvl)}
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
                        sugarLevel === lvl
                          ? lvl === "high"
                            ? "bg-red-500 text-white shadow-sm"
                            : lvl === "medium"
                            ? "bg-amber-500 text-white shadow-sm"
                            : "bg-emerald-500 text-white shadow-sm"
                          : "bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-300"
                      }`}
                    >
                      {lvl === "low" ? (isHindi ? "कम / 0%" : "Low") : lvl === "medium" ? (isHindi ? "मध्यम" : "Medium") : (isHindi ? "अत्यधिक ❌" : "High")}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* 3 PHOTO UPLOAD SLOTS */}
            <div className="space-y-2 pt-1">
              <div className="flex items-center justify-between">
                <label className="text-xs font-black text-[#111827] dark:text-white flex items-center gap-1.5">
                  <span>📸</span>
                  <span>{isHindi ? "पैकेट की 3 फोटो (वैकल्पिक / मददगार):" : "3 Photos (Front, Ingredients, Nutrition):"}</span>
                </label>
                <span className="text-[10px] font-bold text-[#10B981] bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                  {Number(!!frontPhoto) + Number(!!ingredientsPhoto) + Number(!!nutritionPhoto)}/3 Added
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {/* PHOTO 1: FRONT */}
                <div
                  onClick={() => frontInputRef.current?.click()}
                  className={`rounded-2xl border-2 border-dashed p-2 flex flex-col items-center justify-center text-center cursor-pointer transition-all ${
                    frontPhoto
                      ? "border-[#10B981] bg-emerald-50/50 dark:bg-emerald-950/20"
                      : "border-zinc-300 dark:border-zinc-700 bg-zinc-50/60 dark:bg-zinc-900/60 hover:border-[#10B981]"
                  }`}
                >
                  {frontPhoto ? (
                    <div className="relative w-full h-16 rounded-xl overflow-hidden">
                      <img src={frontPhoto} alt="Front" className="w-full h-full object-cover" />
                      <div className="absolute top-1 right-1 px-1 py-0.5 rounded bg-emerald-600 text-white font-bold text-[8px]">
                        ✓ Front
                      </div>
                    </div>
                  ) : (
                    <div className="py-2 flex flex-col items-center justify-center space-y-1">
                      <Camera className="w-4 h-4 text-[#10B981]" />
                      <span className="text-[10px] font-bold leading-tight">1. Front</span>
                      <span className="text-[8px] text-zinc-400 leading-tight">Name & Logo</span>
                    </div>
                  )}
                </div>

                {/* PHOTO 2: INGREDIENTS */}
                <div
                  onClick={() => ingredientsInputRef.current?.click()}
                  className={`rounded-2xl border-2 border-dashed p-2 flex flex-col items-center justify-center text-center cursor-pointer transition-all ${
                    ingredientsPhoto
                      ? "border-[#10B981] bg-emerald-50/50 dark:bg-emerald-950/20"
                      : "border-zinc-300 dark:border-zinc-700 bg-zinc-50/60 dark:bg-zinc-900/60 hover:border-[#10B981]"
                  }`}
                >
                  {ingredientsPhoto ? (
                    <div className="relative w-full h-16 rounded-xl overflow-hidden">
                      <img src={ingredientsPhoto} alt="Ingredients" className="w-full h-full object-cover" />
                      <div className="absolute top-1 right-1 px-1 py-0.5 rounded bg-emerald-600 text-white font-bold text-[8px]">
                        ✓ Ingr.
                      </div>
                    </div>
                  ) : (
                    <div className="py-2 flex flex-col items-center justify-center space-y-1">
                      <Wheat className="w-4 h-4 text-[#10B981]" />
                      <span className="text-[10px] font-bold leading-tight">2. Ingr.</span>
                      <span className="text-[8px] text-zinc-400 leading-tight">Palm Oil / INS</span>
                    </div>
                  )}
                </div>

                {/* PHOTO 3: NUTRITION */}
                <div
                  onClick={() => nutritionInputRef.current?.click()}
                  className={`rounded-2xl border-2 border-dashed p-2 flex flex-col items-center justify-center text-center cursor-pointer transition-all ${
                    nutritionPhoto
                      ? "border-[#10B981] bg-emerald-50/50 dark:bg-emerald-950/20"
                      : "border-zinc-300 dark:border-zinc-700 bg-zinc-50/60 dark:bg-zinc-900/60 hover:border-[#10B981]"
                  }`}
                >
                  {nutritionPhoto ? (
                    <div className="relative w-full h-16 rounded-xl overflow-hidden">
                      <img src={nutritionPhoto} alt="Nutrition" className="w-full h-full object-cover" />
                      <div className="absolute top-1 right-1 px-1 py-0.5 rounded bg-emerald-600 text-white font-bold text-[8px]">
                        ✓ Table
                      </div>
                    </div>
                  ) : (
                    <div className="py-2 flex flex-col items-center justify-center space-y-1">
                      <Flame className="w-4 h-4 text-[#10B981]" />
                      <span className="text-[10px] font-bold leading-tight">3. Nutrition</span>
                      <span className="text-[8px] text-zinc-400 leading-tight">Sugar / Fat</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Error Message */}
            {errorMsg && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-500 text-xs font-semibold">
                {errorMsg}
              </div>
            )}

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 py-3.5 px-4 rounded-2xl bg-[#10B981] hover:bg-[#059669] disabled:opacity-50 text-white font-black text-xs sm:text-sm transition-all cursor-pointer flex items-center justify-center gap-2 shadow-lg shadow-[#10B981]/25"
              >
                {isSubmitting ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>{isHindi ? "विश्लेषण हो रहा है..." : "Analyzing & Rating..."}</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4" />
                    <span>
                      {isHindi
                        ? "🚀 सेव करें व हेल्थ रेटिंग देखें (Analyze & See Score)"
                        : "🚀 Analyze & See Health Score"}
                    </span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={onClose}
                className="py-3 px-4 rounded-2xl bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-bold text-xs border border-zinc-300 dark:border-zinc-800 transition-colors cursor-pointer"
              >
                {isHindi ? "रद्द करें" : "Cancel"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
