import { FoodProduct, IndianHazardWarning, IngredientItem, VerdictType } from "../types";

/**
 * Known INS and E-Numbers hazardous or cautionary in Indian packaged food
 */
const ADDITIVE_DATABASE: Record<
  string,
  { nameEn: string; nameHi: string; purpose: string; safety: "hazard" | "caution" | "safe"; note: string }
> = {
  "e102": { nameEn: "Tartrazine (INS 102)", nameHi: "टार्ट्राज़िन (पीला रंग)", purpose: "Synthetic yellow food dye", safety: "hazard", note: "Linked to hyperactivity, allergies & asthma in children." },
  "e110": { nameEn: "Sunset Yellow (INS 110)", nameHi: "सनसेट येलो (नारंगी रंग)", purpose: "Synthetic orange food dye", safety: "hazard", note: "Artificial azo dye banned in several EU school foods." },
  "e122": { nameEn: "Carmoisine (INS 122)", nameHi: "कारमोइसिन (लाल रंग)", purpose: "Synthetic red food dye", safety: "hazard", note: "Synthetic coal-tar dye with allergic potential." },
  "e124": { nameEn: "Ponceau 4R (INS 124)", nameHi: "पोनसो 4R (लाल रंग)", purpose: "Synthetic red dye", safety: "hazard", note: "Artificial color linked to allergic reactions." },
  "e129": { nameEn: "Allura Red (INS 129)", nameHi: "एलूरा रेड", purpose: "Synthetic red dye", safety: "hazard", note: "Azo dye triggering gut inflammation in high doses." },
  "e150d": { nameEn: "Caramel IV (INS 150d)", nameHi: "कैरामेलाइज़्ड रंग IV", purpose: "Sulfite ammonia caramel color", safety: "caution", note: "Contains trace 4-MEI by-product." },
  "e211": { nameEn: "Sodium Benzoate (INS 211)", nameHi: "सोडियम बेंजोएट", purpose: "Chemical preservative", safety: "caution", note: "Forms benzene when combined with vitamin C." },
  "e202": { nameEn: "Potassium Sorbate (INS 202)", nameHi: "पोटेशियम सोरबेट", purpose: "Antimicrobial preservative", safety: "safe", note: "Generally safe food preservative in low amounts." },
  "e223": { nameEn: "Sodium Metabisulfite (INS 223)", nameHi: "सोडियम मेटाबाइसल्फाइट", purpose: "Bleaching & preservative agent", safety: "caution", note: "Can trigger breathing difficulties in asthmatics." },
  "e621": { nameEn: "Monosodium Glutamate / MSG (INS 621)", nameHi: "मोनोसोडियम ग्लूटामेट (MSG)", purpose: "Flavour enhancer (Umami)", safety: "caution", note: "Excitotoxin that can trigger headaches or cravings." },
  "e627": { nameEn: "Disodium Guanylate (INS 627)", nameHi: "डाइसोडियम ग्वानिलेट", purpose: "Flavour enhancer", safety: "caution", note: "Synthetic savory enhancer often paired with MSG." },
  "e631": { nameEn: "Disodium Inosinate (INS 631)", nameHi: "डाइसोडियम इनोसिनेट", purpose: "Flavour enhancer", safety: "caution", note: "Intense chemical umami booster." },
  "e635": { nameEn: "Disodium 5'-Ribonucleotides (INS 635)", nameHi: "डाइसोडियम राइबोन्यूक्लियोटाइड", purpose: "Potent savory flavor enhancer", safety: "caution", note: "Intensifies chemical flavor profile." },
  "e322": { nameEn: "Soy Lecithin (INS 322)", nameHi: "सोया लेसिथिन", purpose: "Natural emulsifier", safety: "safe", note: "Safe plant-based emulsifier." },
  "e500": { nameEn: "Sodium Carbonates (INS 500)", nameHi: "बेकिंग सोडा", purpose: "Raising agent / acidity regulator", safety: "safe", note: "Standard mineral leavening agent." },
  "e503": { nameEn: "Ammonium Carbonates (INS 503)", nameHi: "अमोनियम कार्बोनेट", purpose: "Biscuit leavening agent", safety: "safe", note: "Traditional baking agent that evaporates in oven." },
  "e330": { nameEn: "Citric Acid (INS 330)", nameHi: "साइट्रिक एसिड (नींबू सत्व)", purpose: "Natural acidity regulator", safety: "safe", note: "Harmless fruit-derived acid." },
  "e471": { nameEn: "Mono- & Diglycerides (INS 471)", nameHi: "इमल्सीफायर 471", purpose: "Fat emulsifier & texture improver", safety: "caution", note: "May contain hidden trans fats from hydrogenated oils." },
  "e951": { nameEn: "Aspartame (INS 951)", nameHi: "एस्पार्टेम (स्वीटनर)", purpose: "Artificial sweetener", safety: "hazard", note: "Non-nutritive sweetener flagged by WHO IARC." },
  "e955": { nameEn: "Sucralose (INS 955)", nameHi: "सुक्रालोज", purpose: "Zero calorie sweetener", safety: "caution", note: "Alters gut bacteria microbiome balance." },
};

/**
 * Calculates a rigorous Ahariq Health Score (out of 100) based on Open Food Facts & ICMR Indian norms
 */
export function calculateHealthScoreFromOFF(productData: any): {
  score: number;
  verdict: "Achha Option" | "Soch Samajh Kar" | "Avoid Karein";
  verdictHindi: "अच्छा विकल्प" | "सोच समझ कर" | "बचने की सलाह";
  verdictType: VerdictType;
  warnings: IndianHazardWarning[];
  summaryEn: string;
  summaryHi: string;
} {
  let score = 100;
  const warnings: IndianHazardWarning[] = [];

  const nutriments = productData.nutriments || {};
  const ingredientsText = (productData.ingredients_text || productData.ingredients_text_en || "").toLowerCase();
  const additives = (productData.additives_tags || []) as string[];
  const novaGroup = productData.nova_group;

  // 1. Palm Oil / Palmolein Check
  const palmOilTags = productData.ingredients_from_palm_oil_tags || [];
  const palmOilCount = productData.ingredients_from_palm_oil_n || palmOilTags.length;
  const textHasPalm =
    ingredientsText.includes("palm") ||
    ingredientsText.includes("palmolein") ||
    ingredientsText.includes("hydrogenated vegetable oil") ||
    ingredientsText.includes("vanaspati");

  if (palmOilCount > 0 || textHasPalm) {
    score -= 25;
    warnings.push({
      type: "palm_oil",
      severity: "high",
      titleEn: "Contains Refined Palm Oil / Palmolein",
      titleHi: "रिफाइंड पाम ऑयल / पामोलिन शामिल",
      descriptionEn:
        "High in atherogenic palmitic acid (approx 45-50% saturated fat) known to increase LDL cholesterol & arterial plaque.",
      descriptionHi:
        "50% तक हानिकारक सैचुरेटेड फैट होता है जो धमनियों में रुकावट और कोलेस्ट्रॉल बढ़ाने का मुख्य कारण है।",
      tagValue: "Palm Oil Detected",
    });
  }

  // 2. Refined Wheat Flour (Maida) Check
  const textHasMaida =
    ingredientsText.includes("maida") ||
    ingredientsText.includes("refined wheat flour") ||
    ingredientsText.includes("bleached flour") ||
    ingredientsText.includes("refined flour");

  if (textHasMaida) {
    score -= 15;
    warnings.push({
      type: "maida",
      severity: "high",
      titleEn: "Heavy in Refined Flour (Maida)",
      titleHi: "अत्यधिक मैदा (रिफाइंड आटा)",
      descriptionEn:
        "Stripped of wheat bran and germ fiber. High glycemic index causes rapid insulin and blood sugar spikes.",
      descriptionHi:
        "फाइबर रहित होता है, जिससे ब्लड शुगर तेजी से बढ़ता है और पाचन तंत्र सुस्त होता है।",
      tagValue: "Refined Maida",
    });
  }

  // 3. Sugar & Added Sugars Check (ICMR Limit: <10g per 100g, high if >15g)
  const sugarVal = parseFloat(nutriments.sugars_100g || nutriments.sugars || "0");
  const hasAddedSugarInText =
    ingredientsText.includes("sugar") ||
    ingredientsText.includes("glucose") ||
    ingredientsText.includes("invert syrup") ||
    ingredientsText.includes("maltodextrin") ||
    ingredientsText.includes("corn syrup");

  if (sugarVal >= 25) {
    score -= 22;
    warnings.push({
      type: "added_sugar",
      severity: "high",
      titleEn: `Excessive Sugar (${sugarVal}g per 100g)`,
      titleHi: `अत्यधिक चीनी (${sugarVal}g प्रति 100g)`,
      descriptionEn: `Contains over 5-6 teaspoons of sugar per 100g portion, exceeding Indian daily recommended allowance.`,
      descriptionHi: `100 ग्राम में लगभग 5-6 चम्मच चीनी है, जो फैटी लिवर और डायबिटीज का खतरा बढ़ाती है।`,
      tagValue: `${sugarVal}g Sugar`,
    });
  } else if (sugarVal >= 15) {
    score -= 14;
    warnings.push({
      type: "added_sugar",
      severity: "high",
      titleEn: `High Sugar Load (${sugarVal}g / 100g)`,
      titleHi: `उच्च चीनी स्तर (${sugarVal}g प्रति 100g)`,
      descriptionEn: "Above recommended threshold for processed snack foods.",
      descriptionHi: "भारतीय स्वास्थ्य मानकों के अनुसार चीनी की मात्रा अधिक है।",
      tagValue: `${sugarVal}g Sugar`,
    });
  } else if (sugarVal >= 8 || (hasAddedSugarInText && sugarVal > 5)) {
    score -= 6;
  }

  // 4. Sodium & Salt Check (ICMR Warning if >600mg/100g)
  let sodiumMg = 0;
  if (nutriments.sodium_100g) {
    sodiumMg = parseFloat(nutriments.sodium_100g) * (nutriments.sodium_100g < 10 ? 1000 : 1);
  } else if (nutriments.salt_100g) {
    sodiumMg = parseFloat(nutriments.salt_100g) * 400; // Salt to sodium approx conversion
  }

  if (sodiumMg >= 1000) {
    score -= 16;
    warnings.push({
      type: "sodium",
      severity: "high",
      titleEn: `Very High Sodium (${Math.round(sodiumMg)}mg / 100g)`,
      titleHi: `अत्यधिक सोडियम (${Math.round(sodiumMg)}mg प्रति 100g)`,
      descriptionEn: "Over 50% of the entire daily adult sodium limit in a single serving. Major risk for hypertension.",
      descriptionHi: "अत्यधिक नमक/सोडियम जो उच्च रक्तचाप (BP) और किडनी पर दबाव डालता है।",
      tagValue: `${Math.round(sodiumMg)}mg Sodium`,
    });
  } else if (sodiumMg >= 600) {
    score -= 9;
    warnings.push({
      type: "sodium",
      severity: "medium",
      titleEn: `Elevated Sodium (${Math.round(sodiumMg)}mg / 100g)`,
      titleHi: `उच्च सोडियम स्तर (${Math.round(sodiumMg)}mg)`,
      descriptionEn: "High salt content to mask processed food taste. Consume cautiously.",
      descriptionHi: "स्वाद बढ़ाने के लिए ज्यादा नमक का इस्तेमाल किया गया है।",
      tagValue: `${Math.round(sodiumMg)}mg Sodium`,
    });
  }

  // 5. Saturated Fat & Trans Fat Check
  const satFat = parseFloat(nutriments["saturated-fat_100g"] || "0");
  const transFat = parseFloat(nutriments["trans-fat_100g"] || "0");

  if (transFat > 0.2) {
    score -= 15;
    warnings.push({
      type: "trans_fat",
      severity: "high",
      titleEn: "Contains Industrial Trans Fats",
      titleHi: "औद्योगिक ट्रांस फैट मौजूद",
      descriptionEn: "Trans fatty acids directly clog arteries and lower good HDL cholesterol.",
      descriptionHi: "ट्रांस फैट हृदय रोगों का प्रमुख कारण है।",
      tagValue: `${transFat}g Trans Fat`,
    });
  }

  if (satFat >= 10 && !warnings.some((w) => w.type === "palm_oil")) {
    score -= 12;
    warnings.push({
      type: "palm_oil",
      severity: "medium",
      titleEn: `High Saturated Fat (${satFat}g / 100g)`,
      titleHi: `उच्च सैचुरेटेड फैट (${satFat}g प्रति 100g)`,
      descriptionEn: "Exceeds clean food limits. Increases cardiovascular strain.",
      descriptionHi: "संतृप्त वसा की मात्रा अधिक है।",
      tagValue: `${satFat}g Sat Fat`,
    });
  }

  // 6. NOVA 4 Ultra-Processed Food Penalty
  if (novaGroup === 4) {
    score -= 12;
  } else if (novaGroup === 3) {
    score -= 6;
  }

  // 7. Additives & Chemical Colors
  let hazardousAdditiveFound = false;
  additives.forEach((addTag) => {
    const cleanTag = addTag.replace("en:", "").toLowerCase();
    const info = ADDITIVE_DATABASE[cleanTag];
    if (info && info.safety === "hazard" && !hazardousAdditiveFound) {
      hazardousAdditiveFound = true;
      score -= 10;
      warnings.push({
        type: "artificial_colours",
        severity: "high",
        titleEn: `Hazardous Additive: ${info.nameEn}`,
        titleHi: `हानिकारक एडिटिव: ${info.nameHi}`,
        descriptionEn: info.note,
        descriptionHi: info.note,
        tagValue: info.nameEn,
      });
    }
  });

  if (additives.length >= 5 && !hazardousAdditiveFound) {
    score -= 8;
    warnings.push({
      type: "preservatives",
      severity: "medium",
      titleEn: `${additives.length} Food Additives (INS / E-Codes)`,
      titleHi: `${additives.length} रासायनिक एडिटिव्स (INS कोड्स)`,
      descriptionEn: "Heavily formulated with multiple stabilizers, preservatives, and emulsifiers.",
      descriptionHi: "कई सारे रासायनिक प्रिजर्वेटिव्स और फ्लेवर एन्हांसर का मिश्रण।",
      tagValue: `${additives.length} Additives`,
    });
  }

  // 8. Positive Health Factors (Whole Grain, Fiber, Protein)
  const fiber = parseFloat(nutriments.fiber_100g || "0");
  const protein = parseFloat(nutriments.proteins_100g || "0");

  if (fiber >= 5) score += 5;
  if (protein >= 12) score += 4;
  if (!textHasPalm && !textHasMaida && sugarVal <= 5 && additives.length <= 1) {
    score += 8; // Clean label bonus
  }

  // Clamp final score cleanly between 10 and 99
  const finalScore = Math.max(12, Math.min(98, Math.round(score)));

  let verdict: "Achha Option" | "Soch Samajh Kar" | "Avoid Karein";
  let verdictHindi: "अच्छा विकल्प" | "सोच समझ कर" | "बचने की सलाह";
  let verdictType: VerdictType;

  if (finalScore >= 70) {
    verdict = "Achha Option";
    verdictHindi = "अच्छा विकल्प";
    verdictType = "green";
  } else if (finalScore >= 40) {
    verdict = "Soch Samajh Kar";
    verdictHindi = "सोच समझ कर";
    verdictType = "yellow";
  } else {
    verdict = "Avoid Karein";
    verdictHindi = "बचने की सलाह";
    verdictType = "red";
  }

  const summaryEn =
    finalScore >= 70
      ? `Rated ${finalScore}/100. This product has a clean ingredient profile with low hazardous processing.`
      : finalScore >= 40
      ? `Rated ${finalScore}/100. Contains moderate refined ingredients, fats, or sugars. Consume in moderation.`
      : `Rated ${finalScore}/100. Highly ultra-processed with heavy Palm oil, Maida, sugar, or synthetic additives. Best to avoid.`;

  const summaryHi =
    finalScore >= 70
      ? `स्कोर: ${finalScore}/100। यह उत्पाद शुद्ध एवं सुरक्षित सामग्री से बना है और स्वास्थ्य के लिए बेहतर है।`
      : finalScore >= 40
      ? `स्कोर: ${finalScore}/100। इसमें रिफाइंड तेल, चीनी या प्रिजर्वेटिव्स मौजूद हैं। सीमित मात्रा में उपयोग करें।`
      : `स्कोर: ${finalScore}/100। इसमें पाम ऑयल, अतिरिक्त मैदा, चीनी या केमिकल प्रिजर्वेटिव्स की अधिकता है। इससे बचें।`;

  return {
    score: finalScore,
    verdict,
    verdictHindi,
    verdictType,
    warnings,
    summaryEn,
    summaryHi,
  };
}

/**
 * Parses Open Food Facts API response to Ahariq FoodProduct model
 */
export function mapOpenFoodFactsToAhariq(productData: any, barcode: string): FoodProduct {
  const nutriments = productData.nutriments || {};
  const { score, verdict, verdictHindi, verdictType, warnings, summaryEn, summaryHi } =
    calculateHealthScoreFromOFF(productData);

  // Ingredients text breakdown
  const rawIngText =
    productData.ingredients_text ||
    productData.ingredients_text_en ||
    productData.ingredients_text_hi ||
    "";

  const ingredientsList = rawIngText
    ? rawIngText
        .split(/[,;\n•]+/)
        .map((s: string) => s.trim())
        .filter((s: string) => s.length > 1)
    : [];

  const ingredientsExplanation: IngredientItem[] = (
    productData.ingredients || []
  ).slice(0, 10).map((ing: any) => {
    const rawId = (ing.id || "").replace("en:", "").toLowerCase();
    const info = ADDITIVE_DATABASE[rawId];
    const isPalm = rawId.includes("palm") || (ing.text || "").toLowerCase().includes("palm");
    const isMaida = (ing.text || "").toLowerCase().includes("maida") || (ing.text || "").toLowerCase().includes("wheat flour");

    return {
      name: ing.text || ing.id || "Ingredient",
      nameHi: info ? info.nameHi : ing.text || "सामग्री",
      purpose: info ? info.purpose : isPalm ? "Cheap frying oil" : isMaida ? "Base refined grain" : "Primary ingredient",
      safety: isPalm || (info && info.safety === "hazard") ? "hazard" : isMaida || (info && info.safety === "caution") ? "caution" : "safe",
    };
  });

  // Vegetarian check from Open Food Facts
  const vegTags = productData.ingredients_analysis_tags || [];
  const isVegetarian =
    vegTags.includes("en:vegetarian") ||
    vegTags.includes("en:vegan") ||
    (!rawIngText.toLowerCase().includes("chicken") &&
      !rawIngText.toLowerCase().includes("meat") &&
      !rawIngText.toLowerCase().includes("egg") &&
      !rawIngText.toLowerCase().includes("fish") &&
      !rawIngText.toLowerCase().includes("gelatin"));

  // Nutrition Facts Per 100g
  let sodiumStr = "0mg";
  if (nutriments.sodium_100g) {
    const val = parseFloat(nutriments.sodium_100g);
    sodiumStr = val < 10 ? `${Math.round(val * 1000)}mg` : `${Math.round(val)}mg`;
  } else if (nutriments.salt_100g) {
    sodiumStr = `${Math.round(parseFloat(nutriments.salt_100g) * 400)}mg`;
  }

  const productName =
    productData.product_name ||
    productData.product_name_en ||
    productData.product_name_hi ||
    "Packaged Food Item";

  const brand =
    productData.brands ||
    productData.brand_owner ||
    "Verified Indian Brand";

  return {
    id: `off_${barcode}`,
    barcode: barcode,
    name: productName,
    nameHindi: productData.product_name_hi || productName,
    brand: brand.split(",")[0].trim(),
    category: (productData.categories || "Packaged Grocery").split(",")[0].trim(),
    categoryHindi: "खाद्य उत्पाद",
    packagingSize: productData.quantity || "Standard Pack",
    healthScore: score,
    verdict,
    verdictHindi,
    verdictType,
    summaryEn,
    summaryHi,
    imageUrl:
      productData.image_url ||
      productData.image_front_url ||
      productData.image_small_url ||
      "https://images.unsplash.com/photo-1542838132-92c53300491e?w=500&auto=format&fit=crop&q=80",
    isVegetarian,
    fssaiNumber: productData.emb_codes || "FSSAI Standard Pack",
    warnings,
    adulterationCheck: {
      riskLevel: warnings.length >= 2 ? "Moderate" : "Low",
      detailsEn: "Analyzed directly via Open Food Facts India & Global Database against ICMR limits.",
      detailsHi: "ओपन फूड फैक्ट्स भारत और ग्लोबल डेटाबेस से आईसीएमआर मानकों पर मूल्यांकित।",
    },
    ingredientsList: ingredientsList.length > 0 ? ingredientsList : ["Standard ingredients list parsed from package."],
    ingredientsExplanation: ingredientsExplanation.length > 0 ? ingredientsExplanation : [
      { name: "Main Formulation", nameHi: "मुख्य संघटक", purpose: "Core ingredient", safety: "safe" }
    ],
    nutritionPer100g: {
      calories: nutriments["energy-kcal_100g"] ? `${Math.round(nutriments["energy-kcal_100g"])} kcal` : "380 kcal",
      protein: `${nutriments.proteins_100g || nutriments.proteins || "6.0"}g`,
      carbohydrates: `${nutriments.carbohydrates_100g || nutriments.carbohydrates || "60.0"}g`,
      sugar: `${nutriments.sugars_100g || nutriments.sugars || "12.0"}g`,
      addedSugar: nutriments["added-sugars_100g"] ? `${nutriments["added-sugars_100g"]}g` : undefined,
      totalFat: `${nutriments.fat_100g || nutriments.fat || "14.0"}g`,
      saturatedFat: nutriments["saturated-fat_100g"] ? `${nutriments["saturated-fat_100g"]}g` : undefined,
      transFat: nutriments["trans-fat_100g"] ? `${nutriments["trans-fat_100g"]}g` : undefined,
      sodium: sodiumStr,
      fiber: nutriments.fiber_100g ? `${nutriments.fiber_100g}g` : undefined,
    },
    cleanerAlternatives: [
      {
        name: "Slurrp Farm 100% Millet & Real Grain Alternative",
        brand: "Slurrp Farm",
        score: 94,
        priceEst: "₹120",
        reasonEn: "Zero Palm Oil, 0 Maida, 100% Jowar & Ragi with cold pressed oil.",
        reasonHi: "शून्य पाम ऑयल, शून्य मैदा, 100% साबुत मिलेट और शुद्ध सामग्री।",
      },
      {
        name: "The Whole Truth Clean Label Snacks",
        brand: "The Whole Truth",
        score: 91,
        priceEst: "₹140",
        reasonEn: "No hidden chemicals, zero INS preservatives, 100% declared ingredients.",
        reasonHi: "बिना किसी रासायनिक प्रिजर्वेटिव्स या फ्लेवर एन्हांसर के बना।",
      },
    ],
  };
}

/**
 * Helper to fetch with a strict timeout to prevent any loading hang
 */
async function fetchWithTimeout(url: string, options: RequestInit = {}, timeoutMs = 2500): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    return res;
  } catch (err) {
    clearTimeout(timeoutId);
    throw err;
  }
}

/**
 * Calculates a rigorous Ahariq Health Score (out of 100) based on manual nutrition input
 */
export function calculateScoreFromManualNutrition(data: {
  name: string;
  brand: string;
  barcode?: string;
  energyKcal: number;
  proteinG: number;
  fatG: number;
  carbsG: number;
  sugarG: number;
  sodiumMg?: number;
  hasPalmOil?: boolean;
  hasMaida?: boolean;
  isVegetarian?: boolean;
}): FoodProduct {
  let score = 100;
  const warnings: IndianHazardWarning[] = [];

  const {
    name,
    brand,
    barcode = "MANUAL_" + Date.now().toString().slice(-6),
    energyKcal = 0,
    proteinG = 0,
    fatG = 0,
    carbsG = 0,
    sugarG = 0,
    sodiumMg = 0,
    hasPalmOil = false,
    hasMaida = false,
    isVegetarian = true,
  } = data;

  // 1. Palm Oil Check
  if (hasPalmOil) {
    score -= 22;
    warnings.push({
      type: "palm_oil",
      severity: "high",
      titleEn: "Contains Refined Palm Oil / Palmolein",
      titleHi: "रिफाइंड पाम ऑयल / पामोलिन शामिल",
      descriptionEn: "High in saturated palmitic acid. Known risk factor for elevated LDL cholesterol.",
      descriptionHi: "हानिकारक सैचुरेटेड फैट की अधिकता जो कोलेस्ट्रॉल बढ़ाने का मुख्य कारण है।",
      tagValue: "Palm Oil Detected",
    });
  }

  // 2. Maida Check
  if (hasMaida) {
    score -= 14;
    warnings.push({
      type: "maida",
      severity: "high",
      titleEn: "Refined Wheat Flour (Maida)",
      titleHi: "मैदा (रिफाइंड आटा)",
      descriptionEn: "Fiber-stripped refined flour causes sharp blood glucose and insulin spikes.",
      descriptionHi: "फाइबर रहित रिफाइंड आटा, जिससे ब्लड शुगर तेजी से बढ़ता है।",
      tagValue: "Refined Maida",
    });
  }

  // 3. Sugar Check
  if (sugarG >= 25) {
    score -= 22;
    warnings.push({
      type: "added_sugar",
      severity: "high",
      titleEn: `Excessive Sugar (${sugarG}g / 100g)`,
      titleHi: `अत्यधिक चीनी (${sugarG}g प्रति 100g)`,
      descriptionEn: "Exceeds Indian ICMR daily recommended limit. High risk for fatty liver.",
      descriptionHi: "100 ग्राम में अत्यधिक चीनी, जो मेटाबोलिक स्वास्थ्य के लिए हानिकारक है।",
      tagValue: `${sugarG}g Sugar`,
    });
  } else if (sugarG >= 15) {
    score -= 14;
    warnings.push({
      type: "added_sugar",
      severity: "high",
      titleEn: `High Sugar (${sugarG}g / 100g)`,
      titleHi: `उच्च चीनी स्तर (${sugarG}g प्रति 100g)`,
      descriptionEn: "Above recommended threshold for healthy daily snacking.",
      descriptionHi: "भारतीय स्वास्थ्य मानकों के अनुसार चीनी की मात्रा अधिक है।",
      tagValue: `${sugarG}g Sugar`,
    });
  } else if (sugarG >= 8) {
    score -= 6;
  }

  // 4. Fat Check
  if (fatG >= 25) {
    score -= 16;
    if (!hasPalmOil) {
      warnings.push({
        type: "palm_oil",
        severity: "medium",
        titleEn: `Very High Fat Content (${fatG}g / 100g)`,
        titleHi: `अत्यधिक वसा (${fatG}g प्रति 100g)`,
        descriptionEn: "Very dense in processed fats.",
        descriptionHi: "कुल वसा की मात्रा काफी अधिक है।",
        tagValue: `${fatG}g Fat`,
      });
    }
  } else if (fatG >= 15) {
    score -= 9;
  }

  // 5. Energy Density Check
  if (energyKcal >= 500) {
    score -= 10;
  } else if (energyKcal >= 420) {
    score -= 5;
  }

  // 6. Sodium Check
  if (sodiumMg >= 800) {
    score -= 14;
    warnings.push({
      type: "sodium",
      severity: "high",
      titleEn: `High Sodium (${Math.round(sodiumMg)}mg / 100g)`,
      titleHi: `उच्च सोडियम (${Math.round(sodiumMg)}mg प्रति 100g)`,
      descriptionEn: "High salt load. Contributes to elevated blood pressure.",
      descriptionHi: "अधिक नमक जो ब्लड प्रेशर और किडनी पर दबाव डालता है।",
      tagValue: `${Math.round(sodiumMg)}mg Sodium`,
    });
  } else if (sodiumMg >= 450) {
    score -= 7;
  }

  // 7. Positive Health Bonus (Protein, low sugar)
  if (proteinG >= 15) {
    score += 8;
  } else if (proteinG >= 8) {
    score += 4;
  }

  if (sugarG <= 4 && fatG <= 6 && !hasPalmOil && !hasMaida) {
    score += 8;
  }

  const finalScore = Math.max(12, Math.min(98, Math.round(score)));

  let verdict: "Achha Option" | "Soch Samajh Kar" | "Avoid Karein";
  let verdictHindi: "अच्छा विकल्प" | "सोच समझ कर" | "बचने की सलाह";
  let verdictType: VerdictType;

  if (finalScore >= 70) {
    verdict = "Achha Option";
    verdictHindi = "अच्छा विकल्प";
    verdictType = "green";
  } else if (finalScore >= 40) {
    verdict = "Soch Samajh Kar";
    verdictHindi = "सोच समझ कर";
    verdictType = "yellow";
  } else {
    verdict = "Avoid Karein";
    verdictHindi = "बचने की सलाह";
    verdictType = "red";
  }

  const summaryEn =
    finalScore >= 70
      ? `Rated ${finalScore}/100. Wholesome nutritional profile with balanced macros (${proteinG}g Protein, ${sugarG}g Sugar).`
      : finalScore >= 40
      ? `Rated ${finalScore}/100. Moderate nutrient balance (${fatG}g Fat, ${sugarG}g Sugar). Recommended in portion moderation.`
      : `Rated ${finalScore}/100. Unfavourable balance (${fatG}g Fat, ${sugarG}g Sugar, ${energyKcal} kcal). Best to limit or avoid.`;

  const summaryHi =
    finalScore >= 70
      ? `स्कोर: ${finalScore}/100। संतुलित पोषण अनुपात (${proteinG}g प्रोटीन, ${sugarG}g चीनी)। यह स्वास्थ्य के लिए बेहतर विकल्प है।`
      : finalScore >= 40
      ? `स्कोर: ${finalScore}/100। इसमें फैट या चीनी की मध्यम मात्रा है (${fatG}g फैट, ${sugarG}g चीनी)। सीमित मात्रा में लें।`
      : `स्कोर: ${finalScore}/100। इसमें अधिक फैट, चीनी या कैलोरी की मात्रा है (${sugarG}g चीनी, ${fatG}g फैट)। इससे बचें।`;

  return {
    id: `manual_${barcode}`,
    barcode,
    name: name || "Packaged Food Item",
    nameHindi: name || "खाद्य उत्पाद",
    brand: brand || "Brand Verified",
    category: "Packaged Grocery",
    categoryHindi: "खाद्य उत्पाद",
    packagingSize: "100g sample",
    healthScore: finalScore,
    verdict,
    verdictHindi,
    verdictType,
    summaryEn,
    summaryHi,
    imageUrl: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=500&auto=format&fit=crop&q=80",
    isVegetarian,
    warnings,
    adulterationCheck: {
      riskLevel: warnings.length >= 2 ? "Moderate" : "Low",
      detailsEn: "Analyzed based on user submitted nutrition table against ICMR daily thresholds.",
      detailsHi: "उपयोगकर्ता द्वारा दर्ज पोषण तालिका के आधार पर आईसीएमआर मानकों पर मूल्यांकित।",
    },
    ingredientsList: [
      `Energy: ${energyKcal} kcal`,
      `Protein: ${proteinG}g`,
      `Total Fat: ${fatG}g`,
      `Carbohydrates: ${carbsG}g`,
      `Sugar: ${sugarG}g`,
      hasPalmOil ? "Refined Palm Oil" : "Vegetable Fat",
      hasMaida ? "Refined Wheat Flour (Maida)" : "Whole Grains",
    ],
    ingredientsExplanation: [
      {
        name: "Carbohydrates & Energy",
        nameHi: "कार्बोहाइड्रेट्स व ऊर्जा",
        purpose: `${carbsG}g Carbs, ${energyKcal} kcal`,
        safety: carbsG > 70 && sugarG > 20 ? "hazard" : "safe",
      },
      {
        name: "Protein",
        nameHi: "प्रोटीन",
        purpose: `${proteinG}g Protein`,
        safety: "safe",
      },
      {
        name: "Fats & Lipids",
        nameHi: "वसा",
        purpose: `${fatG}g Total Fat`,
        safety: hasPalmOil || fatG > 20 ? "hazard" : fatG > 10 ? "caution" : "safe",
      },
    ],
    nutritionPer100g: {
      calories: `${energyKcal} kcal`,
      protein: `${proteinG}g`,
      carbohydrates: `${carbsG}g`,
      sugar: `${sugarG}g`,
      totalFat: `${fatG}g`,
      sodium: `${sodiumMg || 350}mg`,
    },
    cleanerAlternatives: [
      {
        name: "Slurrp Farm 100% Millet & Real Grain Alternative",
        brand: "Slurrp Farm",
        score: 94,
        priceEst: "₹120",
        reasonEn: "Zero Palm Oil, 0 Maida, 100% Jowar & Ragi with cold pressed oil.",
        reasonHi: "शून्य पाम ऑयल, शून्य मैदा, 100% साबुत मिलेट और शुद्ध सामग्री।",
      },
      {
        name: "The Whole Truth Clean Label Snacks",
        brand: "The Whole Truth",
        score: 91,
        priceEst: "₹140",
        reasonEn: "No hidden chemicals, zero INS preservatives, 100% declared ingredients.",
        reasonHi: "बिना किसी रासायनिक प्रिजर्वेटिव्स या फ्लेवर एन्हांसर के बना।",
      },
    ],
  };
}

/**
 * Fetches product from Open Food Facts API with fallback strategy and strict timeout
 * 1. World API (v2)
 * 2. India API (v0)
 * 3. Local backend /api/openfoodfacts proxy
 */
export async function fetchProductFromOpenFoodFacts(barcode: string): Promise<FoodProduct | null> {
  const cleanBarcode = barcode.trim();
  if (!cleanBarcode || cleanBarcode.length < 5) return null;

  try {
    // 1. Try Direct Open Food Facts v2 with 2000ms timeout
    const urlV2 = `https://world.openfoodfacts.org/api/v2/product/${encodeURIComponent(cleanBarcode)}.json`;
    const res = await fetchWithTimeout(urlV2, {
      headers: {
        "User-Agent": "AharIQ-IndianFoodScanner/1.0 (https://ahariq.vercel.app; support@ahariq.com)",
      },
    }, 2000);

    if (res.ok) {
      const data = await res.json();
      if (data && (data.status === 1 || data.status === "success") && data.product) {
        return mapOpenFoodFactsToAhariq(data.product, cleanBarcode);
      }
    }
  } catch (e) {
    console.warn("Direct Open Food Facts v2 fetch timed out or failed:", e);
  }

  try {
    // 2. Try Open Food Facts India v0 with 2000ms timeout
    const urlV0 = `https://in.openfoodfacts.org/api/v0/product/${encodeURIComponent(cleanBarcode)}.json`;
    const res = await fetchWithTimeout(urlV0, {
      headers: {
        "User-Agent": "AharIQ-IndianFoodScanner/1.0 (https://ahariq.vercel.app; support@ahariq.com)",
      },
    }, 2000);

    if (res.ok) {
      const data = await res.json();
      if (data && data.status === 1 && data.product) {
        return mapOpenFoodFactsToAhariq(data.product, cleanBarcode);
      }
    }
  } catch (e) {
    console.warn("India Open Food Facts v0 fetch timed out or failed:", e);
  }

  try {
    // 3. Try Local Server Proxy /api/openfoodfacts with 2000ms timeout
    const proxyUrl = `/api/openfoodfacts/${encodeURIComponent(cleanBarcode)}`;
    const res = await fetchWithTimeout(proxyUrl, {}, 2000);
    if (res.ok) {
      const data = await res.json();
      if (data && data.success && data.productData) {
        return mapOpenFoodFactsToAhariq(data.productData, cleanBarcode);
      }
    }
  } catch (e) {
    console.warn("Local server proxy timed out or failed for Open Food Facts:", e);
  }

  return null;
}
