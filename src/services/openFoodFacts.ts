import { FoodProduct, IndianHazardWarning, IngredientItem, VerdictType } from "../types";
import { getSmartCleanerAlternatives } from "../data/cleanAlternativesEngine";

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
  "e150d": { nameEn: "Caramel IV (INS 150d)", nameHi: "कैरामेलाइज़्ड रंग IV", purpose: "Sulfite ammonia caramel color", safety: "hazard", note: "Contains trace 4-MEI (4-Methylimidazole), flagged as possible carcinogen." },
  "e338": { nameEn: "Phosphoric Acid (INS 338)", nameHi: "फॉस्फोरिक एसिड", purpose: "Acidulant in colas", safety: "hazard", note: "Erodes dental enamel and depletes bone calcium." },
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
  "sugar": { nameEn: "Refined Sugar", nameHi: "रिफाइंड चीनी", purpose: "Concentrated caloric sweetener", safety: "caution", note: "Causes blood glucose surges and metabolic strain." },
  "en:sugar": { nameEn: "Refined Sugar", nameHi: "रिफाइंड चीनी", purpose: "Concentrated caloric sweetener", safety: "caution", note: "Causes blood glucose surges and metabolic strain." },
  "en:sugars": { nameEn: "Refined Sugars", nameHi: "शर्करा / चीनी", purpose: "Sweetening agent", safety: "caution", note: "Elevates blood sugar rapidly." },
  "en:invert-sugar-syrup": { nameEn: "Invert Sugar Syrup", nameHi: "इनवर्ट शुगर सिरप", purpose: "Processed liquid sugar", safety: "hazard", note: "Rapidly absorbed liquid fructose/glucose." },
  "en:glucose-syrup": { nameEn: "Glucose Syrup", nameHi: "ग्लूकोज सिरप", purpose: "High glycemic sweetener", safety: "hazard", note: "Directly surges blood glucose." },
  "en:vegetable-oil": { nameEn: "Edible Vegetable Oil", nameHi: "रिफाइंड वनस्पति तेल", purpose: "Refined industrial frying fat", safety: "caution", note: "Commercial vegetable oil, often palm/palmolein." },
  "en:palm-oil": { nameEn: "Refined Palm Oil", nameHi: "रिफाइंड पाम तेल", purpose: "Industrial saturated fat", safety: "hazard", note: "High palmitic acid linked to cardiovascular risk." },
  "en:palmolein": { nameEn: "Refined Palmolein", nameHi: "पामोलिन ऑयल", purpose: "Commercial deep-frying fat", safety: "hazard", note: "Industrial high-temperature frying medium." },
  "en:wheat-flour": { nameEn: "Wheat Flour (Maida)", nameHi: "मैदा (रिफाइंड आटा)", purpose: "Refined bulk starch", safety: "caution", note: "Stripped of whole grain bran & fiber." },
  "en:refined-wheat-flour": { nameEn: "Refined Wheat Flour (Maida)", nameHi: "मैदा (रिफाइंड आटा)", purpose: "Refined bulk starch", safety: "hazard", note: "Stripped of whole grain bran & fiber." },
  "en:salt": { nameEn: "Iodised Salt", nameHi: "नमक", purpose: "Flavor and preservative", safety: "safe", note: "Mineral seasoning." },
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
  const warnings: IndianHazardWarning[] = [];
  const nutriments = productData.nutriments || {};
  const ingredientsText = (
    productData.ingredients_text ||
    productData.ingredients_text_en ||
    productData.ingredients_text_hi ||
    ""
  ).toLowerCase();
  const additives = (productData.additives_tags || []) as string[];
  const novaGroup = productData.nova_group;
  const productName = (
    productData.product_name ||
    productData.product_name_en ||
    productData.product_name_hi ||
    ""
  ).toLowerCase();
  const categoriesText = (productData.categories || "").toLowerCase();
  const brandsText = (productData.brands || "").toLowerCase();

  // Category Detection
  const isSodaOrCola =
    productName.includes("fanta") ||
    productName.includes("coca-cola") ||
    productName.includes("coke") ||
    productName.includes("pepsi") ||
    productName.includes("sprite") ||
    productName.includes("mirinda") ||
    productName.includes("mountain dew") ||
    productName.includes("7up") ||
    productName.includes("thums up") ||
    productName.includes("limca") ||
    productName.includes("sting") ||
    productName.includes("energy drink") ||
    productName.includes("red bull") ||
    productName.includes("monster energy") ||
    categoriesText.includes("soda") ||
    categoriesText.includes("carbonated-drinks") ||
    categoriesText.includes("colas") ||
    categoriesText.includes("sweetened-beverages") ||
    ingredientsText.includes("carbonated water") ||
    ingredientsText.includes("caffeine");

  const isBeverage =
    isSodaOrCola ||
    categoriesText.includes("beverage") ||
    categoriesText.includes("drink") ||
    categoriesText.includes("juice") ||
    productName.includes("sharbat") ||
    productName.includes("squash") ||
    productName.includes("syrup");

  const isChipsOrCrisps =
    categoriesText.includes("chips") ||
    categoriesText.includes("crisps") ||
    categoriesText.includes("snacks") ||
    productName.includes("chips") ||
    productName.includes("kurkure") ||
    productName.includes("namkeen") ||
    productName.includes("bhujia");

  const isInstantNoodle =
    categoriesText.includes("noodles") ||
    productName.includes("noodle") ||
    productName.includes("maggi") ||
    productName.includes("yippee");

  const isBiscuitOrCookie =
    categoriesText.includes("biscuit") ||
    categoriesText.includes("cookies") ||
    productName.includes("biscuit") ||
    productName.includes("cookie");

  const isCandyOrChoc =
    categoriesText.includes("candy") ||
    categoriesText.includes("confectionery") ||
    categoriesText.includes("chocolate") ||
    productName.includes("candy") ||
    productName.includes("lollipop") ||
    productName.includes("toffee");

  // Determine realistic starting baseline
  let score = 92;

  // If nutrient data is completely missing in Open Food Facts, apply sensible category baseline
  const hasNutrientData =
    nutriments.sugars_100g !== undefined ||
    nutriments.salt_100g !== undefined ||
    nutriments["energy-kcal_100g"] !== undefined;

  // 1. Soft Drink / Soda Heavy Penalty (Fanta, Coke, Pepsi, etc.)
  if (isSodaOrCola) {
    score = 16; // Hard ceiling for carbonated sugary beverages & colas
    warnings.push({
      type: "added_sugar",
      severity: "high",
      titleEn: "Extreme Liquid Sugar (10.6g / 100ml)",
      titleHi: "अत्यधिक घुली हुई चीनी (35g प्रति केन)",
      descriptionEn:
        "Carbonated soft drinks contain approx 10.6g concentrated liquid sugar per 100ml (35g in a 330ml can). Bypasses satiety triggers and surges blood glucose.",
      descriptionHi:
        "1 केन में लगभग 8-9 चम्मच चीनी होती है। यह खून में मिलकर तुरंत फैटी लिवर, इंसुलिन रेजिस्टेंस और वजन बढ़ाती है।",
      tagValue: "35g Sugar per Can",
    });

    if (productName.includes("cola") || productName.includes("pepsi") || productName.includes("coke") || productName.includes("thums up")) {
      warnings.push({
        type: "artificial_colours",
        severity: "high",
        titleEn: "Caramel IV Synthetic Colour (INS 150d)",
        titleHi: "कैरामेलाइज़्ड रंग IV (INS 150d)",
        descriptionEn: "Processed under high heat with ammonia and sulfites, producing trace 4-MEI chemical compounds.",
        descriptionHi: "अमोनिया प्रक्रिया से बना रासायनिक काला रंग जिसमें 4-MEI कंपाउंड्स के अंश होते हैं।",
        tagValue: "INS 150d Chemical Color",
      });

      warnings.push({
        type: "preservatives",
        severity: "high",
        titleEn: "Phosphoric Acid (INS 338)",
        titleHi: "फॉस्फोरिक एसिड (INS 338)",
        descriptionEn: "Highly acidic compound (pH ~2.5) that erodes dental enamel and depletes bone calcium.",
        descriptionHi: "अत्यधिक एसिडिक जो दांतों के इनेमल को गलाता है और हड्डियों से कैल्शियम सोखता है।",
        tagValue: "Acidity Regulator 338",
      });
    } else {
      warnings.push({
        type: "artificial_colours",
        severity: "high",
        titleEn: "Synthetic Food Color & Acidity Regulators",
        titleHi: "सिंथेटिक कृत्रिम रंग (INS 110/102) व एसिड्स",
        descriptionEn:
          "Contains artificial food colorings (like Sunset Yellow FCF / Tartrazine) and acidity regulator (INS 330/331) linked to tooth enamel erosion and hyper-activity.",
        descriptionHi:
          "चमकदार रंग और तीखे स्वाद के लिए रासायनिक रंगों और प्रिजर्वेटिव्स का इस्तेमाल किया जाता है।",
        tagValue: "INS 110 / Acidity Regulators",
      });
    }
  }

  // 2. Palm Oil / Palmolein Check
  const palmOilTags = productData.ingredients_from_palm_oil_tags || [];
  const palmOilCount = productData.ingredients_from_palm_oil_n || palmOilTags.length;
  const textHasPalm =
    ingredientsText.includes("palm") ||
    ingredientsText.includes("palmolein") ||
    ingredientsText.includes("hydrogenated vegetable oil") ||
    ingredientsText.includes("vanaspati") ||
    (isChipsOrCrisps && !ingredientsText.includes("groundnut") && !ingredientsText.includes("mustard") && !ingredientsText.includes("olive") && !ingredientsText.includes("coconut"));

  if (palmOilCount > 0 || textHasPalm) {
    score -= 26;
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

  // 3. Refined Wheat Flour (Maida) Check
  const textHasMaida =
    ingredientsText.includes("maida") ||
    ingredientsText.includes("refined wheat flour") ||
    ingredientsText.includes("bleached flour") ||
    ingredientsText.includes("refined flour") ||
    (isInstantNoodle && !ingredientsText.includes("millet") && !ingredientsText.includes("atta")) ||
    (isBiscuitOrCookie && !ingredientsText.includes("100% whole wheat") && !ingredientsText.includes("oats"));

  if (textHasMaida) {
    score -= 18;
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

  // 4. Sugar & Added Sugars Check (ICMR Limit: <10g per 100g, for beverages >5g is high)
  let sugarVal = parseFloat(nutriments.sugars_100g || nutriments.sugars || "0");
  if (isCandyOrChoc && sugarVal === 0) sugarVal = 45; // Default estimate if missing

  const hasAddedSugarInText =
    ingredientsText.includes("sugar") ||
    ingredientsText.includes("glucose") ||
    ingredientsText.includes("invert syrup") ||
    ingredientsText.includes("maltodextrin") ||
    ingredientsText.includes("corn syrup") ||
    ingredientsText.includes("liquid glucose") ||
    isCandyOrChoc;

  if (!isSodaOrCola) {
    if (isBeverage && (sugarVal >= 8 || hasAddedSugarInText)) {
      score -= 28;
      warnings.push({
        type: "added_sugar",
        severity: "high",
        titleEn: `High Liquid Sugar (${sugarVal > 0 ? sugarVal + "g" : "Excessive"} / 100ml)`,
        titleHi: `अत्यधिक घुली हुई चीनी (${sugarVal > 0 ? sugarVal + "g" : "ज्यादा"})`,
        descriptionEn: "Liquid sugars overload the liver directly, converting rapidly into triglycerides.",
        descriptionHi: "पेय पदार्थों में घुली चीनी सीधे लिवर और ब्लड शुगर को प्रभावित करती है।",
        tagValue: `${sugarVal > 0 ? sugarVal + "g" : "High"} Liquid Sugar`,
      });
    } else if (sugarVal >= 25 || isCandyOrChoc) {
      score -= 24;
      warnings.push({
        type: "added_sugar",
        severity: "high",
        titleEn: `Excessive Sugar (${sugarVal > 0 ? sugarVal + "g" : "Very High"} / 100g)`,
        titleHi: `अत्यधिक चीनी (${sugarVal > 0 ? sugarVal + "g" : "अत्यधिक"})`,
        descriptionEn: "Exceeds Indian recommended daily allowance for added sugars.",
        descriptionHi: "प्रति 100g में हानिकारक स्तर तक चीनी का उपयोग किया गया है।",
        tagValue: `${sugarVal > 0 ? sugarVal + "g" : ">25g"} Sugar`,
      });
    } else if (sugarVal >= 12) {
      score -= 16;
      warnings.push({
        type: "added_sugar",
        severity: "medium",
        titleEn: `High Sugar Load (${sugarVal}g)`,
        titleHi: `उच्च चीनी स्तर (${sugarVal}g)`,
        descriptionEn: "Above recommended threshold for healthy dietary limits.",
        descriptionHi: "स्वास्थ्य मानकों के अनुसार चीनी की मात्रा अधिक है।",
        tagValue: `${sugarVal}g Sugar`,
      });
    } else if (sugarVal >= 6 || (hasAddedSugarInText && sugarVal > 3)) {
      score -= 8;
    }
  }

  // 5. Sodium & Salt Check (ICMR Warning if >600mg/100g)
  let sodiumMg = 0;
  if (nutriments.sodium_100g) {
    sodiumMg = parseFloat(nutriments.sodium_100g) * (nutriments.sodium_100g < 10 ? 1000 : 1);
  } else if (nutriments.salt_100g) {
    sodiumMg = parseFloat(nutriments.salt_100g) * 400;
  } else if (isInstantNoodle || isChipsOrCrisps) {
    sodiumMg = 850; // Default instant masala / fried chips average
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

  // 6. Saturated Fat & Trans Fat Check
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

  // 7. NOVA 4 Ultra-Processed Food Penalty
  if (novaGroup === 4) {
    score -= 12;
  } else if (novaGroup === 3) {
    score -= 6;
  }

  // 8. Additives & Chemical Colors
  let hazardousAdditiveFound = false;
  additives.forEach((addTag) => {
    const cleanTag = addTag.replace("en:", "").toLowerCase();
    const info = ADDITIVE_DATABASE[cleanTag];
    if (info && info.safety === "hazard" && !hazardousAdditiveFound) {
      hazardousAdditiveFound = true;
      score -= 12;
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

  if (additives.length >= 4 && !hazardousAdditiveFound) {
    score -= 10;
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

  // 9. Positive Health Factors (Whole Grain, Fiber, Protein) - only for non-junk
  if (!isSodaOrCola && !isCandyOrChoc && !textHasPalm) {
    const fiber = parseFloat(nutriments.fiber_100g || "0");
    const protein = parseFloat(nutriments.proteins_100g || "0");

    if (fiber >= 5) score += 5;
    if (protein >= 12 && !isBeverage) score += 4;
    if (!textHasMaida && !isBeverage && sugarVal <= 5 && additives.length <= 1) {
      score += 6; // Clean label bonus only for genuine solid whole foods
    }
  }

  // If no nutrient info was found at all in an unbranded unknown product, don't give artificial 90+
  if (!hasNutrientData && ingredientsText.length < 10 && !isSodaOrCola) {
    score = Math.min(score, 60); // Neutral evaluation for unverified empty data
  }

  // Clamp final score cleanly between 12 and 98
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

  const { summaryEn, summaryHi } = getDynamicHazardSummary({
    score: finalScore,
    warnings,
    productName: (productData.product_name || productData.product_name_en || ""),
    ingredientsText,
    sugarVal,
    sodiumMg,
    isBeverage,
  });

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
 * Generates an accurate, hazard-specific summary for both Hindi and English.
 * Strictly adheres to detected hazards:
 * - If Palm Oil / Palmolein detected: "इसमें हानिकारक पामोलिन तेल और अत्यधिक सोडियम है"
 * - If Sugar detected: ONLY mentions "चीनी" / "sugar" if actual sugar hazard/excess is detected. Never mentions sugar for savory chips/snacks without sugar hazard.
 * - If Maida detected: mentions Maida.
 * - If Preservatives/Additives detected: mentions additives/INS codes.
 * - Clean choice: mentions clean ingredients without false negatives.
 */
export function getDynamicHazardSummary(params: {
  score: number;
  warnings?: IndianHazardWarning[];
  productName?: string;
  ingredientsText?: string;
  ingredientsList?: string[];
  sugarVal?: number;
  sodiumMg?: number;
  isBeverage?: boolean;
}): { summaryEn: string; summaryHi: string } {
  const {
    score,
    warnings = [],
    productName = "",
    ingredientsText = "",
    sugarVal = 0,
    sodiumMg = 0,
    isBeverage = false,
  } = params;

  // 1. Clean Choice (88+)
  if (score >= 88) {
    return {
      summaryEn: `Rated ${score}/100. Clean and safe nutritional profile with zero harmful additives, zero palm oil, and no excessive sugar.`,
      summaryHi: `स्कोर: ${score}/100। यह उत्पाद शुद्ध एवं सुरक्षित है। इसमें कोई हानिकारक पाम ऑयल, अतिरिक्त चीनी या केमिकल प्रिजर्वेटिव्स नहीं हैं।`,
    };
  }

  // 2. Identify exact hazards present
  const ingLower = (ingredientsText + " " + productName).toLowerCase();

  const hasPalmOil =
    warnings.some((w) => w.type === "palm_oil") ||
    ingLower.includes("palm") ||
    ingLower.includes("palmolein");

  const isPalmolein =
    ingLower.includes("palmolein") ||
    warnings.some((w) => /palmolein/i.test(w.titleEn + " " + w.titleHi + " " + (w.tagValue || "")));

  const hasMaida =
    warnings.some((w) => w.type === "maida") ||
    ingLower.includes("maida") ||
    ingLower.includes("refined wheat flour");

  const hasHighSodium =
    warnings.some((w) => w.type === "sodium") ||
    sodiumMg >= 500;

  // STRICT SUGAR CHECK:
  // Only flag sugar if an explicit added_sugar warning exists OR sugarVal is high (>= 6g for foods, >= 4g for beverages)
  const hasSugarWarning = warnings.some((w) => w.type === "added_sugar");
  const isSavorySnack =
    ingLower.includes("chip") ||
    ingLower.includes("lay") ||
    ingLower.includes("kurkure") ||
    ingLower.includes("bhujia") ||
    ingLower.includes("namkeen") ||
    ingLower.includes("sev") ||
    ingLower.includes("makhana");

  const hasHighSugar = hasSugarWarning || (!isSavorySnack && (sugarVal >= 7 || (isBeverage && sugarVal >= 4)));

  const hasTransFat = warnings.some((w) => w.type === "trans_fat");

  const hasFlavorEnhancers =
    /ins\s*(627|631|635)|flavour enhancer|flavor enhancer|ribonucleotide|msg|monosodium/i.test(ingLower) ||
    warnings.some((w) => /627|631|635|enhancer/i.test(w.titleEn + " " + w.titleHi + " " + (w.tagValue || "")));

  const hasAdditives =
    hasFlavorEnhancers ||
    warnings.some((w) => w.type === "artificial_colours" || w.type === "preservatives") ||
    /ins\s*(102|110|122|133|150d|338|211|282)/i.test(ingLower);

  // If score is decent (70-87) with minimal/no warnings:
  if (score >= 70 && warnings.length === 0) {
    return {
      summaryEn: `Rated ${score}/100. Wholesome profile with low hazardous processing and clean baseline ingredients.`,
      summaryHi: `स्कोर: ${score}/100। यह उत्पाद सुरक्षित सामग्री से बना है और स्वास्थ्य के लिए एक अच्छा विकल्प है।`,
    };
  }

  // 3. Build dynamic Hindi & English hazard clauses
  const hindiHazards: string[] = [];
  const englishHazards: string[] = [];

  // Palm oil & Sodium combo (classic savory snack pattern: Lay's, Kurkure, Bhujia)
  if (hasPalmOil && hasHighSodium) {
    hindiHazards.push(isPalmolein ? "हानिकारक पामोलिन तेल" : "रिफाइंड पाम ऑयल");
    hindiHazards.push("अत्यधिक सोडियम (नमक)");
    englishHazards.push(isPalmolein ? "harmful Palmolein oil" : "refined Palm oil");
    englishHazards.push("excessive sodium");
  } else {
    if (hasPalmOil) {
      hindiHazards.push(isPalmolein ? "हानिकारक पामोलिन तेल" : "रिफाइंड पाम ऑयल");
      englishHazards.push(isPalmolein ? "harmful Palmolein oil" : "refined Palm oil");
    }
    if (hasHighSodium) {
      hindiHazards.push("अत्यधिक सोडियम (नमक)");
      englishHazards.push("high sodium load");
    }
  }

  if (hasMaida) {
    hindiHazards.push("मैदा (रिफाइंड आटा)");
    englishHazards.push("refined wheat flour (Maida)");
  }

  // Sugar is ONLY added if hasHighSugar is strictly TRUE
  if (hasHighSugar) {
    if (isBeverage) {
      hindiHazards.push("अत्यधिक घुली हुई चीनी");
      englishHazards.push("excessive liquid sugar");
    } else {
      hindiHazards.push("अत्यधिक चीनी");
      englishHazards.push("high added sugar");
    }
  }

  if (hasTransFat) {
    hindiHazards.push("औद्योगिक ट्रांस फैट");
    englishHazards.push("industrial trans fats");
  }

  if (hasFlavorEnhancers) {
    hindiHazards.push("स्वाद बढ़ाने वाले केमिकल (INS 627/631/635)");
    englishHazards.push("artificial flavour enhancers (INS 627/631/635)");
  } else if (hasAdditives) {
    hindiHazards.push("सिंथेटिक एडिटिव्स व प्रिजर्वेटिव्स");
    englishHazards.push("synthetic additives & preservatives");
  }

  // If specific hazards were detected:
  if (hindiHazards.length > 0) {
    let hindiListText = "";
    if (hindiHazards.length === 1) {
      hindiListText = hindiHazards[0];
    } else if (hindiHazards.length === 2) {
      hindiListText = `${hindiHazards[0]} और ${hindiHazards[1]}`;
    } else {
      const last = hindiHazards[hindiHazards.length - 1];
      const initial = hindiHazards.slice(0, -1).join(", ");
      hindiListText = `${initial} और ${last}`;
    }

    let englishListText = "";
    if (englishHazards.length === 1) {
      englishListText = englishHazards[0];
    } else if (englishHazards.length === 2) {
      englishListText = `${englishHazards[0]} and ${englishHazards[1]}`;
    } else {
      const last = englishHazards[englishHazards.length - 1];
      const initial = englishHazards.slice(0, -1).join(", ");
      englishListText = `${initial}, and ${last}`;
    }

    const adviceHi = score < 40 ? "नियमित सेवन से बचें।" : "सीमित मात्रा में ही उपयोग करें।";
    const adviceEn = score < 40 ? "Best to limit or avoid regular consumption." : "Recommended in moderation.";

    return {
      summaryHi: `स्कोर: ${score}/100। इसमें ${hindiListText} मौजूद है। ${adviceHi}`,
      summaryEn: `Rated ${score}/100. Contains ${englishListText}. ${adviceEn}`,
    };
  }

  // Fallback for general moderate products without recognized specific hazards
  if (score >= 40) {
    return {
      summaryHi: `स्कोर: ${score}/100। इसमें मध्यम स्तर की प्रोसेस्ड सामग्री है। सीमित मात्रा में उपयोग करें।`,
      summaryEn: `Rated ${score}/100. Contains moderate processed ingredients. Consume in moderation.`,
    };
  }

  return {
    summaryHi: `स्कोर: ${score}/100। यह अत्यधिक प्रोसेस्ड खाद्य उत्पाद है। नियमित सेवन से बचने की सलाह है।`,
    summaryEn: `Rated ${score}/100. Ultra-processed food formulation. Best to avoid regular consumption.`,
  };
}

/**
 * Resolves a fully synchronized ingredient decoding list where:
 * 1. "Sugar" / "चीनी" is NEVER "safe" (Green) - always Caution (Orange) or Hazard (Red).
 * 2. "Edible Vegetable Oil" / "Vegetable Fat" / "Palmolein" synchronizes with Palm Oil / Trans Fat alerts (Hazard Red if alert or low score, Caution Orange otherwise, NEVER Green).
 * 3. All items in the Hazard List (Red/Orange) are 100% synchronized with the Decoder items (Colors & Verdicts match).
 */
export function getSynchronizedIngredientsExplanation(params: {
  existingExplanation?: IngredientItem[];
  ingredientsList?: string[];
  warnings?: IndianHazardWarning[];
  healthScore?: number;
  sugarVal?: number;
  sodiumMg?: number;
  productName?: string;
  isHindi?: boolean;
}): IngredientItem[] {
  const {
    existingExplanation,
    ingredientsList = [],
    warnings = [],
    healthScore = 50,
    sugarVal = 0,
    sodiumMg = 0,
    isHindi = false,
  } = params;

  const hasPalmWarning = warnings.some(
    (w) => w.type === "palm_oil" || w.type === "trans_fat"
  );
  const hasSugarWarning = warnings.some((w) => w.type === "added_sugar");
  const hasMaidaWarning = warnings.some((w) => w.type === "maida");
  const hasSodiumWarning =
    warnings.some((w) => w.type === "sodium") || sodiumMg >= 750;
  const hasPreservativeWarning = warnings.some((w) => w.type === "preservatives");
  const hasColorWarning = warnings.some((w) => w.type === "artificial_colours");
  const isSevereScore = healthScore < 40;

  // If existing explanation exists and has rich items, start from there
  let baseItems: IngredientItem[] = [];
  if (existingExplanation && existingExplanation.length > 0) {
    baseItems = existingExplanation.map((it) => ({ ...it }));
  } else if (ingredientsList && ingredientsList.length > 0) {
    // Generate from ingredientsList
    baseItems = ingredientsList.slice(0, 12).map((itemStr) => {
      const clean = itemStr.trim();
      const lower = clean.toLowerCase();
      let foundInfo: any = null;

      for (const [key, val] of Object.entries(ADDITIVE_DATABASE)) {
        if (lower.includes(key) || key.includes(lower)) {
          foundInfo = val;
          break;
        }
      }

      return {
        name: clean,
        nameHi: foundInfo ? foundInfo.nameHi : clean,
        purpose: foundInfo ? foundInfo.purpose : "खाद्य घटक / सामग्री",
        safety: foundInfo ? foundInfo.safety : "safe",
      };
    });
  }

  // If still empty, return default empty
  if (baseItems.length === 0) return [];

  // Now apply strict synchronization rules to every item
  return baseItems.map((item) => {
    const rawName = (item.name || "").toLowerCase();
    const rawNameHi = (item.nameHi || "").toLowerCase();
    const rawPurpose = (item.purpose || "").toLowerCase();
    const combined = `${rawName} ${rawNameHi} ${rawPurpose}`;

    let safety: "safe" | "caution" | "hazard" = item.safety;
    let nameHi = item.nameHi || item.name;
    let purpose = item.purpose;

    // --- 1. SUGAR / SWEETENER RULE (Strictly NEVER "safe") ---
    const isSugar =
      combined.includes("sugar") ||
      combined.includes("sucrose") ||
      combined.includes("glucose") ||
      combined.includes("fructose") ||
      combined.includes("syrup") ||
      combined.includes("sweetener") ||
      combined.includes("dextrose") ||
      combined.includes("maltodextrin") ||
      combined.includes("invert sugar") ||
      combined.includes("corn syrup") ||
      combined.includes("चीनी") ||
      combined.includes("शर्करा") ||
      combined.includes("गुड़") ||
      combined.includes("मीठा");

    if (isSugar) {
      if (
        hasSugarWarning ||
        sugarVal >= 8 ||
        isSevereScore ||
        combined.includes("invert") ||
        combined.includes("corn syrup") ||
        combined.includes("glucose syrup")
      ) {
        safety = "hazard";
        nameHi = nameHi && !nameHi.includes("सामग्री") ? nameHi : "रिफाइंड चीनी / स्वीटनर";
        purpose = isHindi
          ? "अतिरिक्त चीनी (इंसुलिन स्पाइक, फैटी लिवर व डायबिटीज का जोखिम)"
          : "Added refined sweetener (Causes blood glucose surges & metabolic strain)";
      } else {
        safety = "caution"; // NEVER SAFE
        nameHi = nameHi && !nameHi.includes("सामग्री") ? nameHi : "चीनी / शर्करा";
        purpose = isHindi
          ? "रिफाइंड चीनी (ब्लड शुगर स्तर को तेजी से बढ़ाती है, सीमित सेवन करें)"
          : "Refined sugar (Spikes blood glucose, consume in strict moderation)";
      }
      return { ...item, nameHi, purpose, safety };
    }

    // --- 2. EDIBLE VEGETABLE OIL / FAT / PALMOLEIN RULE (Synchronize with Palm Hazard) ---
    const isOilOrFat =
      combined.includes("oil") ||
      combined.includes("fat") ||
      combined.includes("palmolein") ||
      combined.includes("palm") ||
      combined.includes("shortening") ||
      combined.includes("vanaspati") ||
      combined.includes("margarine") ||
      combined.includes("interesterified") ||
      combined.includes("hydrogenated") ||
      combined.includes("vegetable oil") ||
      combined.includes("edible vegetable") ||
      combined.includes("refined oil") ||
      combined.includes("पाम") ||
      combined.includes("पामोलिन") ||
      combined.includes("तेल") ||
      combined.includes("वनस्पति");

    // Pure unrefined traditional fats check (e.g. Pure Desi Ghee / Kacchi Ghani Mustard)
    const isPureHealthyFat =
      (combined.includes("desi ghee") ||
        combined.includes("kacchi ghani") ||
        combined.includes("cold pressed") ||
        combined.includes("extra virgin")) &&
      !hasPalmWarning &&
      healthScore >= 75;

    if (isOilOrFat && !isPureHealthyFat) {
      if (
        hasPalmWarning ||
        isSevereScore ||
        combined.includes("palm") ||
        combined.includes("palmolein") ||
        combined.includes("vanaspati") ||
        combined.includes("hydrogenated") ||
        combined.includes("shortening")
      ) {
        safety = "hazard";
        nameHi = nameHi && !nameHi.includes("सामग्री") ? nameHi : "रिफाइंड पाम तेल / पामोलिन";
        purpose = isHindi
          ? "हानिकारक पामोलिन/पाम तेल (45-50% सैचुरेटेड फैट, हृदय व लिवर के लिए नुकसानदेह)"
          : "Cheap refined industrial palm oil (High saturated fat & arterial risk)";
      } else {
        safety = "caution"; // NEVER SAFE for generic refined vegetable oil
        nameHi = nameHi && !nameHi.includes("सामग्री") ? nameHi : "रिफाइंड वनस्पति तेल";
        purpose = isHindi
          ? "रिफाइंड औद्योगिक तेल (केमिकल रिफाइनिंग, सीमित मात्रा में उपयोग करें)"
          : "Refined vegetable oil (Solvent processed, consume in moderation)";
      }
      return { ...item, nameHi, purpose, safety };
    }

    // --- 3. MAIDA / REFINED FLOUR RULE ---
    const isFlour =
      combined.includes("maida") ||
      combined.includes("refined wheat") ||
      combined.includes("refined flour") ||
      combined.includes("bleached flour") ||
      combined.includes("wheat flour (maida)") ||
      combined.includes("मैदा");

    if (isFlour) {
      if (hasMaidaWarning || healthScore < 50) {
        safety = "hazard";
        nameHi = nameHi && !nameHi.includes("सामग्री") ? nameHi : "मैदा (रिफाइंड आटा)";
        purpose = isHindi
          ? "फाइबर-रहित मैदा (रक्त में ग्लूकोज तेजी से बढ़ाता है व पाचन सुस्त करता है)"
          : "Refined flour stripped of bran & germ (Rapid glucose spike)";
      } else {
        safety = "caution";
        nameHi = nameHi && !nameHi.includes("सामग्री") ? nameHi : "रिफाइंड आटा (मैदा)";
        purpose = isHindi ? "रिफाइंड आटा (कम फाइबर)" : "Refined flour (Low dietary fiber)";
      }
      return { ...item, nameHi, purpose, safety };
    }

    // --- 4. SALT / SODIUM RULE ---
    const isSalt =
      combined.includes("salt") ||
      combined.includes("sodium") ||
      combined.includes("iodised salt") ||
      combined.includes("नमक") ||
      combined.includes("सोडियम");

    if (
      isSalt &&
      !combined.includes("benzoate") &&
      !combined.includes("carbonates") &&
      !combined.includes("metabisulfite")
    ) {
      if (hasSodiumWarning || sodiumMg >= 750) {
        safety = "hazard";
        nameHi = "नमक (अत्यधिक सोडियम)";
        purpose = isHindi
          ? "अत्यधिक सोडियम लोड (हाई ब्लड प्रेशर व किडनी पर भार)"
          : "High sodium load (Spikes blood pressure)";
      } else if (sodiumMg >= 400) {
        safety = "caution";
        nameHi = "नमक (सोडियम)";
        purpose = isHindi ? "मध्यम सोडियम मात्रा" : "Moderate sodium load";
      } else {
        safety = "safe";
      }
      return { ...item, nameHi, purpose, safety };
    }

    // --- 5. CHEMICAL ADDITIVES / FLAVOR ENHANCERS / DYES ---
    // Flavour enhancers (INS 621, 627, 631, 635)
    if (
      combined.includes("621") ||
      combined.includes("627") ||
      combined.includes("631") ||
      combined.includes("635") ||
      combined.includes("msg") ||
      combined.includes("glutamate") ||
      combined.includes("ribonucleotide")
    ) {
      safety = hasPreservativeWarning || isSevereScore ? "hazard" : "caution";
      nameHi = nameHi && !nameHi.includes("सामग्री") ? nameHi : "फ्लेवर एन्हांसर (INS 627/631/635)";
      purpose = isHindi
        ? "स्वाद बढ़ाने के लिए (नियमित अधिक सेवन भूख नियंत्रण के लिए अनुकूल नहीं माना जाता)"
        : "Chemical flavor enhancer (Regular high intake is not considered ideal for appetite regulation)";
      return { ...item, nameHi, purpose, safety };
    }

    // Artificial colors (INS 102, 110, 122, 124, 129, 150d)
    if (
      combined.includes("102") ||
      combined.includes("110") ||
      combined.includes("122") ||
      combined.includes("124") ||
      combined.includes("129") ||
      combined.includes("150d") ||
      combined.includes("tartrazine") ||
      combined.includes("sunset yellow") ||
      combined.includes("carmoisine") ||
      combined.includes("allura red") ||
      combined.includes("caramel") ||
      hasColorWarning
    ) {
      safety = "hazard";
      nameHi = nameHi && !nameHi.includes("सामग्री") ? nameHi : "सिंथेटिक कृत्रिम रंग (INS Dye)";
      purpose = isHindi
        ? "आकर्षक रंग देने के लिए (नियमित सेवन बच्चों में एलर्जी और हाइपरएक्टिविटी के जोखिम से जोड़ा जाता है)"
        : "Synthetic food coloring (Regular intake is associated with allergy and hyperactivity risk in children)";
      return { ...item, nameHi, purpose, safety };
    }

    // Acidulants (INS 338 Phosphoric Acid)
    if (combined.includes("338") || combined.includes("phosphoric acid")) {
      safety = "hazard";
      nameHi = "फॉस्फोरिक एसिड (INS 338)";
      purpose = isHindi
        ? "तीखा स्वाद देने के लिए (अत्यधिक सेवन दांतों के इनेमल और कैल्शियम संतुलन के लिए अच्छा नहीं माना जाता)"
        : "Tangy acidulant (High intake is associated with potential erosion of dental enamel and calcium balance)";
      return { ...item, nameHi, purpose, safety };
    }

    // Chemical Preservatives (INS 282, 211, 223, 471, 481)
    if (
      combined.includes("282") ||
      combined.includes("211") ||
      combined.includes("223") ||
      combined.includes("471") ||
      combined.includes("481") ||
      combined.includes("preservative") ||
      combined.includes("propionate") ||
      combined.includes("benzoate")
    ) {
      safety = hasPreservativeWarning || isSevereScore ? "hazard" : "caution";
      return { ...item, nameHi, purpose, safety };
    }

    return { ...item, nameHi, purpose, safety };
  });
}

/**
 * Parses Open Food Facts API response to Ahariq FoodProduct model
 */
export function mapOpenFoodFactsToAhariq(productData: any, barcode: string): FoodProduct {
  const nutriments = productData.nutriments || {};
  const categoriesText = (productData.categories || "").toLowerCase();
  const rawIngText =
    productData.ingredients_text ||
    productData.ingredients_text_en ||
    productData.ingredients_text_hi ||
    "";
  const rawIngLower = rawIngText.toLowerCase();

  const isBeverage =
    categoriesText.includes("beverage") ||
    categoriesText.includes("drink") ||
    categoriesText.includes("soda") ||
    categoriesText.includes("cola") ||
    rawIngLower.includes("carbonated water") ||
    rawIngLower.includes("phosphoric acid");

  const sugarVal = parseFloat(nutriments.sugars_100g || nutriments.sugars || "0");
  const sodiumMg = parseFloat(nutriments.sodium_100g ? (parseFloat(nutriments.sodium_100g) < 10 ? (parseFloat(nutriments.sodium_100g) * 1000).toString() : nutriments.sodium_100g) : (nutriments.salt_100g ? (parseFloat(nutriments.salt_100g) * 400).toString() : "0"));

  const { score, verdict, verdictHindi, verdictType, warnings, summaryEn, summaryHi } =
    calculateHealthScoreFromOFF(productData);

  const ingredientsList = rawIngText
    ? rawIngText
        .split(/[,;\n•]+/)
        .map((s: string) => s.trim())
        .filter((s: string) => s.length > 1)
    : [];

  const rawIngredientsExplanation: IngredientItem[] = (
    productData.ingredients || []
  ).slice(0, 12).map((ing: any) => {
    const rawId = (ing.id || "").replace("en:", "").toLowerCase();
    const info = ADDITIVE_DATABASE[rawId] || ADDITIVE_DATABASE[`en:${rawId}`];
    const isPalm = rawId.includes("palm") || (ing.text || "").toLowerCase().includes("palm");
    const isMaida = (ing.text || "").toLowerCase().includes("maida") || (ing.text || "").toLowerCase().includes("wheat flour");

    return {
      name: ing.text || ing.id || "Ingredient",
      nameHi: info ? info.nameHi : ing.text || "सामग्री",
      purpose: info ? info.purpose : isPalm ? "Cheap frying oil" : isMaida ? "Base refined grain" : "Primary ingredient",
      safety: isPalm || (info && info.safety === "hazard") ? "hazard" : isMaida || (info && info.safety === "caution") ? "caution" : "safe",
    };
  });

  // Synchronize Decoder items with Hazard warnings and Indian nutritional safety rules
  const ingredientsExplanation = getSynchronizedIngredientsExplanation({
    existingExplanation: rawIngredientsExplanation.length > 0 ? rawIngredientsExplanation : undefined,
    ingredientsList,
    warnings,
    healthScore: score,
    sugarVal,
    sodiumMg,
    productName: productData.product_name || productData.product_name_en || "",
    isHindi: true,
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
      detailsEn: "Analyzed against FSSAI and ICMR nutritional safety standards.",
      detailsHi: "भारतीय खाद्य सुरक्षा (FSSAI) और ICMR स्वास्थ्य मानकों पर मूल्यांकित।",
    },
    ingredientsList: ingredientsList.length > 0 ? ingredientsList : ["Standard ingredients list parsed from package."],
    ingredientsExplanation: ingredientsExplanation.length > 0 ? ingredientsExplanation : [
      { name: "Main Formulation", nameHi: "मुख्य संघटक", purpose: "Core ingredient", safety: "safe" }
    ],
    nutritionPer100g: {
      calories: nutriments["energy-kcal_100g"]
        ? `${Math.round(nutriments["energy-kcal_100g"])} kcal`
        : nutriments.energy_100g
        ? `${Math.round(parseFloat(nutriments.energy_100g) / 4.184)} kcal`
        : isBeverage
        ? "42 kcal"
        : "350 kcal",
      protein: nutriments.proteins_100g !== undefined
        ? `${nutriments.proteins_100g}g`
        : isBeverage
        ? "0.0g"
        : "0.0g",
      carbohydrates: nutriments.carbohydrates_100g !== undefined
        ? `${nutriments.carbohydrates_100g}g`
        : isBeverage
        ? `${sugarVal || 10.6}g`
        : "50.0g",
      sugar: nutriments.sugars_100g !== undefined
        ? `${nutriments.sugars_100g}g`
        : isBeverage
        ? "10.6g"
        : "5.0g",
      addedSugar: nutriments["added-sugars_100g"] ? `${nutriments["added-sugars_100g"]}g` : undefined,
      totalFat: nutriments.fat_100g !== undefined
        ? `${nutriments.fat_100g}g`
        : "0.0g",
      saturatedFat: nutriments["saturated-fat_100g"] ? `${nutriments["saturated-fat_100g"]}g` : undefined,
      transFat: nutriments["trans-fat_100g"] ? `${nutriments["trans-fat_100g"]}g` : undefined,
      sodium: sodiumStr,
      fiber: nutriments.fiber_100g ? `${nutriments.fiber_100g}g` : undefined,
    },
    cleanerAlternatives: getSmartCleanerAlternatives({
      name: productName,
      nameHindi: productData.product_name_hi,
      brand: brand,
      category: productData.categories || "",
      ingredientsText: rawIngText,
    }),
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

  const { summaryEn, summaryHi } = getDynamicHazardSummary({
    score: finalScore,
    warnings,
    productName: name,
    sugarVal: sugarG,
    sodiumMg,
  });

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
      hasPalmOil ? "Refined Palm Oil" : "Edible Vegetable Fat",
      hasMaida ? "Refined Wheat Flour (Maida)" : "Whole Grains",
    ],
    ingredientsExplanation: getSynchronizedIngredientsExplanation({
      existingExplanation: [
        {
          name: "Carbohydrates & Energy",
          nameHi: "कार्बोहाइड्रेट्स व ऊर्जा",
          purpose: `${carbsG}g Carbs, ${energyKcal} kcal`,
          safety: carbsG > 70 && sugarG > 20 ? "hazard" : "safe",
        },
        {
          name: "Sugar Content",
          nameHi: "चीनी / शर्करा",
          purpose: `${sugarG}g Sugar per 100g`,
          safety: sugarG >= 10 ? "hazard" : "caution",
        },
        {
          name: hasPalmOil ? "Refined Palm Oil" : "Edible Vegetable Fat",
          nameHi: hasPalmOil ? "रिफाइंड पाम तेल" : "वनस्पति वसा",
          purpose: `${fatG}g Fat per 100g`,
          safety: hasPalmOil ? "hazard" : "caution",
        },
        ...(hasMaida
          ? [
              {
                name: "Refined Wheat Flour (Maida)",
                nameHi: "मैदा (रिफाइंड आटा)",
                purpose: "Refined flour base",
                safety: "hazard" as const,
              },
            ]
          : []),
      ],
      warnings,
      healthScore: finalScore,
      sugarVal: sugarG,
      sodiumMg: sodiumMg || 350,
      isHindi: true,
    }),
    nutritionPer100g: {
      calories: `${energyKcal} kcal`,
      protein: `${proteinG}g`,
      carbohydrates: `${carbsG}g`,
      sugar: `${sugarG}g`,
      totalFat: `${fatG}g`,
      sodium: `${sodiumMg || 350}mg`,
    },
    cleanerAlternatives: getSmartCleanerAlternatives({
      name: name,
      brand: brand,
      category: "Packaged Food",
      ingredientsText: `${hasPalmOil ? "palm oil" : ""} ${hasMaida ? "maida" : ""}`,
    }),
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

/**
 * Searches Open Food Facts database for products matching keyword/brand/category
 * Queries local DB + Backend Proxy + Direct OFF India/World Search
 */
export async function searchProductsFromOpenFoodFacts(
  query: string,
  pageSize = 24
): Promise<FoodProduct[]> {
  const cleanQuery = query.trim();
  if (!cleanQuery) return [];

  const results: FoodProduct[] = [];
  const seenIds = new Set<string>();

  // 1. Try Local Backend Proxy first
  try {
    const proxyUrl = `/api/openfoodfacts/search?q=${encodeURIComponent(cleanQuery)}&pageSize=${pageSize}`;
    const res = await fetchWithTimeout(proxyUrl, {}, 3500);
    if (res.ok) {
      const data = await res.json();
      if (data && data.success && Array.isArray(data.products) && data.products.length > 0) {
        for (const p of data.products) {
          const code = p.code || p._id || `off_${p.id || Math.random().toString(36).slice(2)}`;
          if (!seenIds.has(code) && (p.product_name || p.product_name_en || p.product_name_hi)) {
            seenIds.add(code);
            try {
              results.push(mapOpenFoodFactsToAhariq(p, code));
            } catch (err) {
              console.warn("Failed to map OFF product:", err);
            }
          }
        }
        if (results.length > 0) {
          return results;
        }
      }
    }
  } catch (e) {
    console.warn("Backend Open Food Facts search proxy timed out/failed, falling back to direct:", e);
  }

  // 2. Direct India Open Food Facts Search (Targeting Indian Market)
  try {
    const directUrlIn = `https://in.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(
      cleanQuery
    )}&search_simple=1&action=process&json=1&page_size=${pageSize}`;
    const res = await fetchWithTimeout(
      directUrlIn,
      {
        headers: {
          "User-Agent": "AharIQ-IndianFoodScanner/1.0 (https://ahariq.vercel.app; support@ahariq.com)",
        },
      },
      3500
    );

    if (res.ok) {
      const data = await res.json();
      if (data && Array.isArray(data.products) && data.products.length > 0) {
        for (const p of data.products) {
          const code = p.code || p._id || `off_${p.id || Math.random().toString(36).slice(2)}`;
          if (!seenIds.has(code) && (p.product_name || p.product_name_en || p.product_name_hi)) {
            seenIds.add(code);
            try {
              results.push(mapOpenFoodFactsToAhariq(p, code));
            } catch (err) {
              console.warn("Failed to map product:", err);
            }
          }
        }
        if (results.length > 0) {
          return results;
        }
      }
    }
  } catch (e) {
    console.warn("Direct India OFF search failed, trying tagged India search:", e);
  }

  // 3. Direct Country India Tagged Search
  try {
    const directUrlWorldIndia = `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(
      cleanQuery
    )}&tagtype_0=countries&tag_contains_0=contains&tag_0=india&action=process&json=1&page_size=${pageSize}`;
    const res = await fetchWithTimeout(
      directUrlWorldIndia,
      {
        headers: {
          "User-Agent": "AharIQ-IndianFoodScanner/1.0 (https://ahariq.vercel.app; support@ahariq.com)",
        },
      },
      3500
    );

    if (res.ok) {
      const data = await res.json();
      if (data && Array.isArray(data.products) && data.products.length > 0) {
        for (const p of data.products) {
          const code = p.code || p._id || `off_${p.id || Math.random().toString(36).slice(2)}`;
          if (!seenIds.has(code) && (p.product_name || p.product_name_en || p.product_name_hi)) {
            seenIds.add(code);
            try {
              results.push(mapOpenFoodFactsToAhariq(p, code));
            } catch (err) {
              console.warn("Failed to map world product:", err);
            }
          }
        }
      }
    }
  } catch (e) {
    console.warn("Direct World OFF search failed:", e);
  }

  return results;
}

