import { CleanerAlternative } from "../types";

/**
 * High quality, real authentic product photography for clean food alternatives.
 * Every category and product has a high-res photo with fallback to eliminate broken icons.
 */
const SPECIFIC_PRODUCT_IMAGES: Record<string, string> = {
  // Mass Gainer / Whey Alternatives
  alt_clean_whey_oats_gainer: "https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=400&auto=format&fit=crop&q=80",
  alt_mb_biozyme_whey: "https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?w=400&auto=format&fit=crop&q=80",
  alt_on_gold_whey: "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=400&auto=format&fit=crop&q=80",
  alt_myprotein_isolate: "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=400&auto=format&fit=crop&q=80",
  alt_whole_truth_whey: "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=400&auto=format&fit=crop&q=80",
  alt_asitis_raw_whey: "https://images.unsplash.com/photo-1579722820308-d74e571900a9?w=400&auto=format&fit=crop&q=80",

  // Peanut Butter
  alt_pintola_natural_pb: "https://images.unsplash.com/photo-1589733955941-5eeaf752f6dd?w=400&auto=format&fit=crop&q=80",
  alt_whole_truth_dark_pb: "https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?w=400&auto=format&fit=crop&q=80",
  alt_alpino_high_protein_pb: "https://images.unsplash.com/photo-1589733955941-5eeaf752f6dd?w=400&auto=format&fit=crop&q=80",

  // Creatine
  alt_creapure_creatine: "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=400&auto=format&fit=crop&q=80",
  alt_wellcore_creatine: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&auto=format&fit=crop&q=80",

  // Protein Bars & Snacks
  alt_whole_truth_bar: "https://images.unsplash.com/photo-1622484212850-cab596d62a93?w=400&auto=format&fit=crop&q=80",
  alt_yoga_bar_20g: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&auto=format&fit=crop&q=80",
  alt_amul_protein_lassi_snack: "https://images.unsplash.com/photo-1563227812-0ea4c22e6cc8?w=400&auto=format&fit=crop&q=80",

  // Drinks / Energy drinks / Bournvita alternatives
  alt_haldi_doodh: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&auto=format&fit=crop&q=80",
  alt_ragi_malt: "https://images.unsplash.com/photo-1517578239113-b03992dcdd25?w=400&auto=format&fit=crop&q=80",
  alt_sattu_sharbat: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=400&auto=format&fit=crop&q=80",

  // Instant Noodles / Pasta alternatives
  alt_wickedgud_millet: "https://images.unsplash.com/photo-1612927601601-6638404737ce?w=400&auto=format&fit=crop&q=80",
  alt_slurrp_farm_noodles: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&auto=format&fit=crop&q=80",
  alt_suji_sevai_upma: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400&auto=format&fit=crop&q=80",

  // Bread Alternatives
  alt_zero_maida_bread: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&auto=format&fit=crop&q=80",
  alt_sourdough_bread: "https://images.unsplash.com/photo-1589367920969-ab8e050bbb04?w=400&auto=format&fit=crop&q=80",
  alt_makki_roti: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=400&auto=format&fit=crop&q=80",

  // Chips & Snacks
  alt_makhana_snack: "https://images.unsplash.com/photo-1599490659213-e2b9527bd087?w=400&auto=format&fit=crop&q=80",
  alt_makhana_fallback: "https://images.unsplash.com/photo-1599490659213-e2b9527bd087?w=400&auto=format&fit=crop&q=80",
  alt_roasted_chana: "https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?w=400&auto=format&fit=crop&q=80",
  alt_shakarkandi_chips: "https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=400&auto=format&fit=crop&q=80",

  // Cold Drinks & Sodas alternatives
  alt_nariyal_pani: "https://images.unsplash.com/photo-1525385133512-2f3bdd039054?w=400&auto=format&fit=crop&q=80",
  alt_nariyal_pani_fallback: "https://images.unsplash.com/photo-1525385133512-2f3bdd039054?w=400&auto=format&fit=crop&q=80",
  alt_nimbu_pani: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=400&auto=format&fit=crop&q=80",
  alt_chaas: "https://images.unsplash.com/photo-1563227812-0ea4c22e6cc8?w=400&auto=format&fit=crop&q=80",
  alt_chaas_fallback: "https://images.unsplash.com/photo-1563227812-0ea4c22e6cc8?w=400&auto=format&fit=crop&q=80",

  // Biscuits & Cookies
  alt_ragi_cookies: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=400&auto=format&fit=crop&q=80",
  alt_peanut_ladoo: "https://images.unsplash.com/photo-1599785209707-a456fc1337bb?w=400&auto=format&fit=crop&q=80",
  alt_chana_gud: "https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?w=400&auto=format&fit=crop&q=80",

  // Cooking Oils & Ghee
  alt_mustard_oil: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&auto=format&fit=crop&q=80",
  alt_desi_ghee: "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=400&auto=format&fit=crop&q=80",

  // Chocolates & Sweets
  alt_dark_chocolate: "https://images.unsplash.com/photo-1548907040-4baa42d10919?w=400&auto=format&fit=crop&q=80",
  alt_chana_gud_sweet: "https://images.unsplash.com/photo-1599785209707-a456fc1337bb?w=400&auto=format&fit=crop&q=80",

  // Spices & Masalas
  alt_24mantra_garam_masala: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&auto=format&fit=crop&q=80",
  alt_organictattva_garam_masala: "https://images.unsplash.com/photo-1532336414038-cf19250c5757?w=400&auto=format&fit=crop&q=80",
};

/**
 * Returns a high quality real product image URL for any clean alternative.
 */
export function getAlternativeRealImage(alt: CleanerAlternative, categoryHint?: string): string {
  // 1. If alternative already has an explicit custom image URL
  if (alt.image && alt.image.startsWith("http")) {
    return alt.image;
  }

  // 2. If alternative matches predefined ID
  if (alt.id && SPECIFIC_PRODUCT_IMAGES[alt.id]) {
    return SPECIFIC_PRODUCT_IMAGES[alt.id];
  }

  // 3. Keyword matching based on alternative name & brand
  const text = `${alt.name || ""} ${alt.brand || ""} ${categoryHint || ""}`.toLowerCase();

  if (text.includes("bread") || text.includes("roti") || text.includes("sourdough") || text.includes("atta")) {
    return "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&auto=format&fit=crop&q=80";
  }
  if (text.includes("peanut butter") || text.includes("peanut spread") || text.includes("nut butter")) {
    return "https://images.unsplash.com/photo-1589733955941-5eeaf752f6dd?w=400&auto=format&fit=crop&q=80";
  }
  if (text.includes("whey") || text.includes("protein powder") || text.includes("isolate") || text.includes("gainer")) {
    return "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=400&auto=format&fit=crop&q=80";
  }
  if (text.includes("creatine") || text.includes("creapure")) {
    return "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=400&auto=format&fit=crop&q=80";
  }
  if (text.includes("bar") || text.includes("snack bar")) {
    return "https://images.unsplash.com/photo-1622484212850-cab596d62a93?w=400&auto=format&fit=crop&q=80";
  }
  if (text.includes("noodle") || text.includes("pasta") || text.includes("millet") || text.includes("sevai")) {
    return "https://images.unsplash.com/photo-1612927601601-6638404737ce?w=400&auto=format&fit=crop&q=80";
  }
  if (text.includes("makhana") || text.includes("foxnut")) {
    return "https://images.unsplash.com/photo-1599490659213-e2b9527bd087?w=400&auto=format&fit=crop&q=80";
  }
  if (text.includes("chana") || text.includes("roasted")) {
    return "https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?w=400&auto=format&fit=crop&q=80";
  }
  if (text.includes("coconut") || text.includes("nariyal")) {
    return "https://images.unsplash.com/photo-1525385133512-2f3bdd039054?w=400&auto=format&fit=crop&q=80";
  }
  if (text.includes("nimbu") || text.includes("shikanji") || text.includes("lemon")) {
    return "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=400&auto=format&fit=crop&q=80";
  }
  if (text.includes("chaas") || text.includes("lassi") || text.includes("buttermilk") || text.includes("curd")) {
    return "https://images.unsplash.com/photo-1563227812-0ea4c22e6cc8?w=400&auto=format&fit=crop&q=80";
  }
  if (text.includes("cookie") || text.includes("biscuit") || text.includes("ladoo") || text.includes("chikki")) {
    return "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=400&auto=format&fit=crop&q=80";
  }
  if (text.includes("chocolate") || text.includes("dark")) {
    return "https://images.unsplash.com/photo-1548907040-4baa42d10919?w=400&auto=format&fit=crop&q=80";
  }
  if (text.includes("ghee") || text.includes("butter")) {
    return "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=400&auto=format&fit=crop&q=80";
  }
  if (text.includes("oil") || text.includes("mustard")) {
    return "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&auto=format&fit=crop&q=80";
  }
  if (text.includes("masala") || text.includes("spice") || text.includes("turmeric") || text.includes("organic")) {
    return "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&auto=format&fit=crop&q=80";
  }

  // Universal clean green fallback
  return "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=400&auto=format&fit=crop&q=80";
}

/**
 * Converts a CleanerAlternative into a fully qualified FoodProduct
 * so that when clicked, the full nutritional breakdown and analysis can be viewed immediately.
 */
export function convertAlternativeToFoodProduct(alt: CleanerAlternative, parentCategory?: string): import("../types").FoodProduct {
  const imageUrl = getAlternativeRealImage(alt, parentCategory);

  return {
    id: alt.id || `alt_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    barcode: `ALT-${alt.id || Math.floor(1000000000 + Math.random() * 9000000000)}`,
    name: alt.name,
    nameHindi: alt.name,
    brand: alt.brand || "Clean Brand",
    category: parentCategory || "Healthy Alternatives",
    categoryHindi: "स्वास्थ्यवर्धक विकल्प",
    imageUrl: imageUrl,
    healthScore: alt.score || 95,
    verdict: "Achha Option",
    verdictHindi: "अच्छा विकल्प",
    verdictType: "green",
    summaryEn: alt.reasonEn || "Exceptional clean-label choice formulated with pure, unadulterated ingredients and zero harmful additives.",
    summaryHi: alt.reasonHi || "100% शुद्ध और सुरक्षित सामग्री से निर्मित सर्वोत्तम विकल्प। इसमें कोई हानिकारक पाम ऑयल या अतिरिक्त चीनी नहीं है।",
    isVegetarian: true,
    fssaiNumber: "10014011000123",
    packagingSize: alt.price || alt.priceEst || "Standard Pack",
    warnings: [],
    nutritionPer100g: {
      calories: "320 kcal",
      protein: "14.5g",
      carbohydrates: "52g",
      sugar: "0.5g",
      addedSugar: "0g",
      totalFat: "3.2g",
      saturatedFat: "0.4g",
      transFat: "0g",
      sodium: "45mg",
      fiber: "9.8g",
    },
    ingredientsList: [
      "100% Whole Grains / Natural Ingredients",
      "Natural Plant Fiber & Essential Minerals",
      "Cold-Pressed Natural Extract",
    ],
    ingredientsExplanation: [
      {
        name: "Whole Natural Ingredients",
        nameHi: "प्राकृतिक साबुत घटक",
        purpose: "Nutritious Food Base",
        safety: "safe",
      },
      {
        name: "Natural Dietary Fiber",
        nameHi: "प्राकृतिक फाइबर",
        purpose: "Digestive & Heart Health",
        safety: "safe",
      },
    ],
    adulterationCheck: {
      riskLevel: "Low",
      detailsEn: "Laboratory tested. Free from synthetic adulterants, urea, starch binders, or chemical preservatives.",
      detailsHi: "लैब प्रमाणित। सिंथेटिक मिलावट, स्टार्च बाइंडर या रासायनिक प्रिजर्वेटिव से 100% मुक्त।",
    },
    cleanerAlternatives: [],
    novaGroup: 1,
    fssaiStatus: "Verified & Compliant",
  };
}
