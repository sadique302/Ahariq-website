import { CleanerAlternative, CategoryAlternativeDoc } from "../types";

/**
 * DEFAULT_CATEGORY_ALTERNATIVES:
 * Initial database seed and offline-first fallback dictionary for category-specific clean alternatives.
 * Every document ID is the exact category_id (e.g., energy_drink, instant_noodles, white_bread, etc.).
 */
export const DEFAULT_CATEGORY_ALTERNATIVES: Record<string, CategoryAlternativeDoc> = {
  // 1. ENERGY DRINK / HEALTH MALT DRINKS (Bournvita, Horlicks, Boost, Complan)
  energy_drink: {
    id: "energy_drink",
    category_id: "energy_drink",
    category_name: "Energy Drinks & Malt Drinks (Bournvita, Horlicks)",
    target_products: [
      "Bournvita",
      "Horlicks",
      "Boost",
      "Complan",
      "Milo",
      "Pediasure",
      "Health Drink",
      "Energy Drink",
      "Red Bull",
      "Monster",
      "Sting Energy"
    ],
    alternatives: [
      {
        id: "alt_haldi_doodh",
        name: "Haldi Doodh",
        brand: "Desi Homemade / Pure Milk",
        score: 95,
        price: "₹30-50",
        priceEst: "₹30-50",
        problem: "Zyada Cheeni + Chemical",
        reasonEn: "100% Pure warm milk infused with natural turmeric curcumin; zero refined sugar or synthetic maltodextrin.",
        reasonHi: "शुद्ध हल्दी और दूध, बिना किसी हानिकारक रिफाइंड चीनी या केमिकल के। रोग प्रतिरोधक क्षमता बढ़ाता है।",
        tags: ["Natural Immunity", "0% Added Sugar", "Pure Curcumin"]
      },
      {
        id: "alt_ragi_malt",
        name: "Ragi Malt",
        brand: "Early Foods / Slurrp Farm",
        score: 94,
        price: "₹45",
        priceEst: "₹45",
        problem: "Zyada Cheeni + Artificial Flavours",
        reasonEn: "Sprouted finger millet (Ragi) loaded with bioavailable calcium and fiber, sweetened with natural jaggery.",
        reasonHi: "अंकुरित रागी, प्राकृतिक कैल्शियम और पाचक फाइबर से भरपूर (सिंथेटिक फ्लेवर मुक्त)।",
        tags: ["High Calcium", "Sprouted Ragi", "Natural Energy"]
      },
      {
        id: "alt_sattu_sharbat",
        name: "Sattu Sharbat",
        brand: "Desi Roasted Chana Sattu",
        score: 97,
        price: "₹25",
        priceEst: "₹25",
        problem: "Zyada Cheeni + Chemical Additives",
        reasonEn: "Traditional roasted gram flour (Sattu) packed with 20g natural plant protein, pink rock salt, and roasted cumin.",
        reasonHi: "भुने चने का सत्तू, शुद्ध प्रोटीन और ऊर्जा का प्राकृतिक देसी स्रोत। पेट को ठंडा रखता है।",
        tags: ["20g Plant Protein", "Zero Chemicals", "Gut Cooling"]
      }
    ]
  },

  // 2. INSTANT NOODLES & PASTA (Maggi, Yippee, Top Ramen, Knorr)
  instant_noodles: {
    id: "instant_noodles",
    category_id: "instant_noodles",
    category_name: "Instant Noodles & Pasta (Maggi, Yippee)",
    target_products: [
      "Maggi",
      "Yippee",
      "Top Ramen",
      "Knorr Noodles",
      "Wai Wai",
      "Ching's Noodles",
      "Instant Noodles",
      "Ramen",
      "Pasta",
      "Macaroni"
    ],
    alternatives: [
      {
        id: "alt_wickedgud_millet",
        name: "WickedGud Millet Noodles",
        brand: "WickedGud",
        score: 89,
        price: "₹95",
        priceEst: "₹95",
        problem: "Refined Maida + Palm Oil",
        reasonEn: "100% Steamed & baked with Oats, Lentils, and Brown Rice. 0% Maida, 0% Palm Oil, zero synthetic MSG synergists.",
        reasonHi: "ओट्स, दाल और ब्राउन राइस से भरपूर; स्टीम करके पकाया हुआ, 0% मैदा और 0% पाम ऑयल।",
        tags: ["Steamed Not Fried", "0% Maida", "0% Palm Oil"]
      },
      {
        id: "alt_slurrp_farm_noodles",
        name: "Slurrp Farm Noodles",
        brand: "Slurrp Farm",
        score: 93,
        price: "₹89",
        priceEst: "₹89",
        problem: "Palm Oil Frying + Zyada Sodium",
        reasonEn: "100% Sun-dried (Not fried in palmolein). Made from natural foxtail millet and ragi with real spices.",
        reasonHi: "धूप में सुखाया हुआ बाजरा और रागी नूडल्स, पाम तेल में डीप-फ्राई नहीं किया गया।",
        tags: ["Sun Dried", "100% Millets", "Low Sodium"]
      },
      {
        id: "alt_suji_sevai_upma",
        name: "Suji Sevai Upma",
        brand: "Homemade / Roasted Rava",
        score: 96,
        price: "₹35",
        priceEst: "₹35",
        problem: "Chemical Tastemaker + Maida",
        reasonEn: "Traditional roasted semolina (Suji) vermicelli cooked with fresh garden vegetables, curry leaves, and mustard seeds.",
        reasonHi: "शुद्ध सूजी सेवई और ताजी हरी सब्जियों का पौष्टिक उपमा। केमिकल टेस्टमेकर से पूरी तरह मुक्त।",
        tags: ["100% Suji", "Fresh Vegetables", "Zero Chemicals"]
      }
    ]
  },

  // 3. WHITE BREAD & BAKERY BUNS (White Bread, Pav, Modern Bread)
  white_bread: {
    id: "white_bread",
    category_id: "white_bread",
    category_name: "White Bread & Bakery Buns (White Bread)",
    target_products: [
      "White Bread",
      "Sandwich Bread",
      "Modern Bread",
      "Harvest Gold White Bread",
      "Britannia White Bread",
      "Pav",
      "Burger Bun",
      "Toast Bread"
    ],
    alternatives: [
      {
        id: "alt_zero_maida_bread",
        name: "Zero Maida Bread",
        brand: "The Health Factory",
        score: 94,
        price: "₹55",
        priceEst: "₹55",
        problem: "Maida Bleach + Chemical Emulsifiers",
        reasonEn: "100% Whole wheat flour, 0% Maida, 0% Palm Oil, zero chemical bleaching agents or artificial caramel colors.",
        reasonHi: "100% साबुत गेहूं का आटा, शून्य मैदा, शून्य पाम ऑयल, बिना हानिकारक ब्लीच के तैयार।",
        tags: ["Zero Maida", "100% Whole Wheat", "No Palm Oil"]
      },
      {
        id: "alt_sourdough_bread",
        name: "Sourdough",
        brand: "The Baker's Dozen",
        score: 96,
        price: "₹79",
        priceEst: "₹79",
        problem: "Chemical Yeast + Preservatives (INS 282)",
        reasonEn: "Naturally slow-fermented with wild sourdough culture. Easy to digest and prebiotic gut-friendly.",
        reasonHi: "प्राकृतिक खमीर (Sourdough) से फर्मेंटेड। केमिकल प्रिजर्वेटिव्स और ब्रेड इम्प्रूवर से मुक्त।",
        tags: ["Wild Fermented", "Gut Friendly", "Preservative Free"]
      },
      {
        id: "alt_makki_roti",
        name: "Makki Roti",
        brand: "Fresh Homemade",
        score: 98,
        price: "₹30",
        priceEst: "₹30",
        problem: "Refined White Flour + High Glycemic Index",
        reasonEn: "Traditional stone-ground whole corn flour flatbread with natural fiber, lutein, and zero maida.",
        reasonHi: "ताज़ा मक्के की रोटी, प्राकृतिक फाइबर से भरपूर और मैदा मुक्त। ब्लड शुगर को स्थिर रखती है।",
        tags: ["100% Natural Corn", "High Fiber", "Traditional"]
      }
    ]
  },

  // 4. POTATO CHIPS & FRIED NAMKEEN (Lays, Kurkure, Bingo, Uncle Chipps)
  potato_chips: {
    id: "potato_chips",
    category_id: "potato_chips",
    category_name: "Potato Chips & Crispy Snacks (Lays, Kurkure)",
    target_products: [
      "Lays",
      "Kurkure",
      "Bingo",
      "Uncle Chipps",
      "Pringles",
      "Doritos",
      "Balaji Chips",
      "Haldiram Chips",
      "Aloo Bhujia",
      "Potato Chips",
      "Namkeen"
    ],
    alternatives: [
      {
        id: "alt_makhana_snack",
        name: "Makhana",
        brand: "Taali / The Whole Truth",
        score: 95,
        price: "₹65",
        priceEst: "₹65-110",
        problem: "Palmolein Oil + Chemical TBHQ + Zyada Namak",
        reasonEn: "High-protein roasted lotus seeds (Foxnuts) seasoned with natural pink rock salt and cold-pressed oil. 0 Palmolein.",
        reasonHi: "सेंधा नमक और हल्के तेल में भुना हुआ मखाना, पामोलिन तेल और केमिकल प्रिजर्वेटिव्स से मुक्त।",
        tags: ["High Protein", "Roasted Superfood", "Zero Palmolein"]
      },
      {
        id: "alt_roasted_chana",
        name: "Roasted Chana",
        brand: "Desi Roasted Chana",
        score: 96,
        price: "₹35",
        priceEst: "₹35",
        problem: "Deep Fried Palmolein + MSG (INS 635)",
        reasonEn: "100% Dry-roasted black chickpeas with skin. Outstanding source of plant protein and resistant dietary fiber.",
        reasonHi: "बिना तेल के भुना हुआ छिलके वाला देसी चना, प्रोटीन और फाइबर का प्राकृतिक पावरहाउस।",
        tags: ["Oil-Free Roasting", "High Fiber", "Heart Friendly"]
      },
      {
        id: "alt_shakarkandi_chips",
        name: "Shakarkandi Chips",
        brand: "Baked Sweet Potato / Too Yumm!",
        score: 92,
        price: "₹60",
        priceEst: "₹60",
        problem: "Synthetic Flavour + Heavy Palm Oil",
        reasonEn: "Baked sweet potato crisps rich in Beta-Carotene Vitamin A and complex carbs with 60% less saturated fat.",
        reasonHi: "शकरकंद (स्वीट पोटैटो) के बेक्ड चिप्स, विटामिन A और फाइबर से भरपूर।",
        tags: ["Baked Sweet Potato", "Low Saturated Fat", "Vitamin A"]
      }
    ]
  },

  // 5. COLD DRINKS, SODA & CARBONATED BEVERAGES (Coke, Pepsi, Fanta, Sprite)
  cold_drink: {
    id: "cold_drink",
    category_id: "cold_drink",
    category_name: "Cold Drinks & Carbonated Beverages (Coke, Pepsi)",
    target_products: [
      "Coke",
      "Coca-Cola",
      "Pepsi",
      "Fanta",
      "Sprite",
      "Thums Up",
      "Mirinda",
      "Mountain Dew",
      "7up",
      "Limca",
      "Sting",
      "Cold Drink",
      "Soda",
      "Carbonated Drink"
    ],
    alternatives: [
      {
        id: "alt_nariyal_pani",
        name: "Nariyal Pani",
        brand: "Fresh Coconut / RAW Pressery",
        score: 96,
        price: "₹55",
        priceEst: "₹50-65",
        problem: "Zyada Cheeni + Phosphoric Acid + Synthetic Color",
        reasonEn: "100% Pure tender coconut water with bio-active potassium electrolytes and zero added sugar or phosphoric acid.",
        reasonHi: "100% शुद्ध ताज़ा नारियल पानी, शून्य अतिरिक्त चीनी, प्राकृतिक इलेक्ट्रोलाइट्स और बिना किसी केमिकल के।",
        tags: ["100% Pure Natural", "No Added Sugar", "Electrolyte Rich"]
      },
      {
        id: "alt_nimbu_pani",
        name: "Nimbu Pani",
        brand: "Fresh Homemade Shikanji",
        score: 97,
        price: "₹20",
        priceEst: "₹15-25",
        problem: "High Fructose Syrup + Chemical Additives",
        reasonEn: "Real lemon juice rich in natural Vitamin C, pink rock salt, and roasted cumin. Free from liquid fructose syrup.",
        reasonHi: "ताजा नींबू रस, प्राकृतिक विटामिन C और सेंधा नमक। लिवर पर भारी पड़ने वाले लिक्विड फ्रुक्टोज से पूरी तरह मुक्त।",
        tags: ["Vitamin C", "Digestive Shikanji", "Zero Chemicals"]
      },
      {
        id: "alt_chaas",
        name: "Chaas",
        brand: "Amul / Fresh Curd Chaas",
        score: 94,
        price: "₹20",
        priceEst: "₹15-30",
        problem: "Synthetic Caffeine + Tooth Enamel Acid",
        reasonEn: "Probiotic fresh buttermilk seasoned with mint, ginger, and cumin. Naturally cools and aids digestion.",
        reasonHi: "पुदीने और भुने जीरे वाली ताज़ा प्रोबायोटिक छाछ, पेट के हाजमे और ठंडक के लिए बेहतरीन।",
        tags: ["Probiotic", "Gut Friendly", "Refreshing"]
      }
    ]
  },

  // 6. BISCUITS & COOKIES (Parle-G, Oreo, Good Day, Bourbon)
  biscuit_cookie: {
    id: "biscuit_cookie",
    category_id: "biscuit_cookie",
    category_name: "Biscuits & Cookies (Parle-G, Oreo)",
    target_products: [
      "Parle-G",
      "Parleg",
      "Oreo",
      "Good Day",
      "Bourbon",
      "Hide & Seek",
      "Dark Fantasy",
      "Britannia Marie",
      "Monaco",
      "50-50",
      "Krackjack",
      "Cream Biscuit",
      "Cookie",
      "Biscuits"
    ],
    alternatives: [
      {
        id: "alt_ragi_cookies",
        name: "Ragi Cookies",
        brand: "Slurrp Farm / Early Foods",
        score: 94,
        price: "₹99",
        priceEst: "₹99-130",
        problem: "60%+ Maida + Palm Oil + Invert Sugar Syrup",
        reasonEn: "0% Refined Flour (Maida), 0% Palm Oil. Baked with whole finger millet (Ragi), cow butter, and organic jaggery.",
        reasonHi: "शून्य मैदा, शून्य पाम ऑयल, शुद्ध मक्खन और जैविक गुड़ से तैयार पौष्टिक रागी कुकीज़।",
        tags: ["Zero Maida", "No Palm Oil", "Jaggery Sweetened"]
      },
      {
        id: "alt_peanut_ladoo",
        name: "Peanut Ladoo",
        brand: "Traditional Jaggery & Peanuts",
        score: 95,
        price: "₹50",
        priceEst: "₹40-80",
        problem: "Chemical Emulsifiers + Artificial Flavors",
        reasonEn: "Slow-roasted bold peanuts blended with iron-rich organic jaggery. Rich in healthy unsaturated fats and protein.",
        reasonHi: "भुनी मूंगफली और गुड़ का पारंपरिक देसी लड्डू; प्रोटीन, आयरन और प्राकृतिक ऊर्जा का बेहतरीन मेल।",
        tags: ["High Protein", "Iron Rich", "Traditional Ladoo"]
      },
      {
        id: "alt_chana_gud",
        name: "Chana Gud",
        brand: "Traditional Desi Chana Gud",
        score: 97,
        price: "₹30",
        priceEst: "₹25-45",
        problem: "Refined White Cane Sugar + Trans Fats",
        reasonEn: "Time-tested Indian Ayurvedic combination of roasted black chickpeas and unrefined natural sugarcane jaggery.",
        reasonHi: "भुना चना और शुद्ध देसी गुड़, हीमोग्लोबिन, स्टेमिना और पाचन शक्ति बढ़ाने वाला पारंपरिक सुपरफूड।",
        tags: ["Ayurvedic Classic", "Boosts Hemoglobin", "Zero Trans Fat"]
      }
    ]
  },

  // 7. COOKING OILS & GHEE
  cooking_oil: {
    id: "cooking_oil",
    category_id: "cooking_oil",
    category_name: "Cooking Oils & Ghee (Refined Oils)",
    target_products: [
      "Fortune Refined Oil",
      "Saffola Gold",
      "Dhara Refined",
      "Gemini Soybean",
      "Dalda Vanaspati",
      "Palm Oil",
      "Palmolein Oil",
      "Refined Sunflower Oil"
    ],
    alternatives: [
      {
        id: "alt_mustard_oil",
        name: "Kacchi Ghani Mustard Oil",
        brand: "Two Brothers / Anveshan",
        score: 96,
        price: "₹240",
        priceEst: "₹240",
        problem: "Hexane Chemical Solvents + High Heat Bleaching",
        reasonEn: "Wood-pressed at cold temperature without chemical solvents or synthetic bleaching.",
        reasonHi: "लकड़ी की घानी में निकाला गया शुद्ध कच्ची घानी सरसों का तेल (केमिकल साल्वेंट मुक्त)।",
        tags: ["Cold Pressed", "Zero Hexane", "100% Pure"]
      },
      {
        id: "alt_desi_ghee",
        name: "Desi Cow Bilona Ghee",
        brand: "Amul / Organic India",
        score: 95,
        price: "₹340",
        priceEst: "₹340",
        problem: "Vanaspati Trans Fats + Adulteration",
        reasonEn: "Traditional clarified butter with high smoke point and zero lipid oxidation.",
        reasonHi: "शुद्ध देसी गाय का घी, उच्च स्मोक पॉइंट और शून्य ट्रांस फैट।",
        tags: ["Traditional Bilona", "Heart Friendly", "Pure Dairy"]
      }
    ]
  },

  // 8. CHOCOLATES & SWEET SPREADS
  chocolates_sweets: {
    id: "chocolates_sweets",
    category_id: "chocolates_sweets",
    category_name: "Chocolates & Sweet Spreads (Dairy Milk, Nutella)",
    target_products: [
      "Dairy Milk",
      "Cadbury",
      "KitKat",
      "5 Star",
      "Snickers",
      "Nutella",
      "Choco Spread",
      "Kissan Jam"
    ],
    alternatives: [
      {
        id: "alt_dark_chocolate",
        name: "Single Origin Dark Chocolate",
        brand: "The Whole Truth / Amul Dark",
        score: 95,
        price: "₹120",
        priceEst: "₹100-160",
        problem: "55%+ White Cane Sugar + Palm Oil Fillers",
        reasonEn: "Pure cocoa and dates. 0% Cane sugar, 0% Palm oil, zero chemical emulsifiers.",
        reasonHi: "शुद्ध कोको और खजूर से मिठास; शून्य सफेद चीनी और शून्य पाम तेल।",
        tags: ["Zero Cane Sugar", "No Palm Oil", "Pure Cocoa"]
      },
      {
        id: "alt_chana_gud_sweet",
        name: "Chana Gud / Jaggery Chikki",
        brand: "Traditional Pure Jaggery Chikki",
        score: 96,
        price: "₹30",
        priceEst: "₹30",
        problem: "Liquid Glucose Syrup + Synthetic Preservatives",
        reasonEn: "Crushed roasted peanuts bound with 100% natural sugarcane jaggery.",
        reasonHi: "मूंगफली और शुद्ध देसी गुड़ की चिक्की, बिना किसी ग्लूकोज सिरप के।",
        tags: ["100% Jaggery", "Natural Snack", "Iron Rich"]
      }
    ]
  }
};

/**
 * In-memory / Realtime cache of Firestore alternatives collection
 */
let dynamicAlternativesCache: Record<string, CategoryAlternativeDoc> = {
  ...DEFAULT_CATEGORY_ALTERNATIVES
};

/**
 * Updates the in-memory cache with documents retrieved from Firestore
 */
export function updateAlternativesCache(docs: CategoryAlternativeDoc[]) {
  if (Array.isArray(docs) && docs.length > 0) {
    const updated: Record<string, CategoryAlternativeDoc> = { ...dynamicAlternativesCache };
    for (const doc of docs) {
      if (doc && doc.id) {
        updated[doc.id] = doc;
      }
    }
    dynamicAlternativesCache = updated;
  }
}

/**
 * Gets the current active alternatives dictionary
 */
export function getAlternativesCache(): Record<string, CategoryAlternativeDoc> {
  return dynamicAlternativesCache;
}

/**
 * Deterministically maps any product name, brand, category, or ingredients
 * to its EXACT matching category_id.
 * This guarantees Maggi NEVER gets Bread, and White Bread NEVER gets Maggi!
 */
export function detectProductCategoryId(input: {
  name?: string;
  nameHindi?: string;
  brand?: string;
  category?: string;
  ingredientsText?: string;
}): string {
  const text = [
    input.name || "",
    input.nameHindi || "",
    input.brand || "",
    input.category || "",
    input.ingredientsText || ""
  ]
    .join(" ")
    .toLowerCase();

  // 1. Instant Noodles & Pasta (Maggi, Yippee, Top Ramen, etc.)
  if (
    text.includes("maggi") ||
    text.includes("yippee") ||
    text.includes("noodle") ||
    text.includes("noodles") ||
    text.includes("ramen") ||
    text.includes("pasta") ||
    text.includes("macaroni") ||
    text.includes("top ramen") ||
    text.includes("wai wai") ||
    text.includes("hakka")
  ) {
    return "instant_noodles";
  }

  // 2. Energy Drink & Malt Drinks (Bournvita, Horlicks, Boost, etc.)
  if (
    text.includes("bournvita") ||
    text.includes("horlicks") ||
    text.includes("boost") ||
    text.includes("complan") ||
    text.includes("pediasure") ||
    text.includes("milo") ||
    text.includes("malt drink") ||
    text.includes("energy drink") ||
    text.includes("red bull") ||
    text.includes("monster energy") ||
    text.includes("sting energy")
  ) {
    return "energy_drink";
  }

  // 3. Potato Chips & Crisps (Lays, Kurkure, Namkeen, etc.)
  if (
    text.includes("lays") ||
    text.includes("kurkure") ||
    text.includes("chips") ||
    text.includes("crisps") ||
    text.includes("bingo") ||
    text.includes("uncle chipps") ||
    text.includes("pringles") ||
    text.includes("doritos") ||
    text.includes("namkeen") ||
    text.includes("bhujia") ||
    text.includes("puffcorn") ||
    text.includes("nachos")
  ) {
    return "potato_chips";
  }

  // 4. Cold Drinks & Sodas (Coke, Pepsi, Fanta, Sprite, etc.)
  if (
    text.includes("coca-cola") ||
    text.includes("coke") ||
    text.includes("pepsi") ||
    text.includes("fanta") ||
    text.includes("sprite") ||
    text.includes("thums up") ||
    text.includes("mirinda") ||
    text.includes("mountain dew") ||
    text.includes("7up") ||
    text.includes("limca") ||
    text.includes("sting") ||
    text.includes("cold drink") ||
    text.includes("soda") ||
    text.includes("carbonated") ||
    text.includes("soft drink")
  ) {
    return "cold_drink";
  }

  // 5. Biscuits & Cookies (Parle-G, Oreo, Good Day, etc.)
  if (
    text.includes("parle-g") ||
    text.includes("parleg") ||
    text.includes("oreo") ||
    text.includes("good day") ||
    text.includes("bourbon") ||
    text.includes("hide & seek") ||
    text.includes("dark fantasy") ||
    text.includes("marie") ||
    text.includes("monaco") ||
    text.includes("50-50") ||
    text.includes("biscuit") ||
    text.includes("biscuits") ||
    text.includes("cookie") ||
    text.includes("cookies") ||
    text.includes("rusk") ||
    text.includes("cracker")
  ) {
    return "biscuit_cookie";
  }

  // 6. White Bread, Pav & Bakery Buns (White Bread, Modern, Harvest Gold)
  if (
    text.includes("white bread") ||
    text.includes("sandwich bread") ||
    text.includes("bread") ||
    text.includes("pav") ||
    text.includes("burger bun") ||
    text.includes("bun") ||
    text.includes("toast") ||
    text.includes("harvest gold") ||
    text.includes("modern bread")
  ) {
    return "white_bread";
  }

  // 7. Cooking Oils & Ghee
  if (
    text.includes("oil") ||
    text.includes("palmolein") ||
    text.includes("refined oil") ||
    text.includes("sunflower oil") ||
    text.includes("mustard oil") ||
    text.includes("soybean oil") ||
    text.includes("vanaspati") ||
    text.includes("dalda") ||
    text.includes("ghee")
  ) {
    return "cooking_oil";
  }

  // 8. Chocolates & Candies
  if (
    text.includes("dairy milk") ||
    text.includes("chocolate") ||
    text.includes("chocolates") ||
    text.includes("cadbury") ||
    text.includes("kitkat") ||
    text.includes("nutella") ||
    text.includes("candy") ||
    text.includes("toffee")
  ) {
    return "chocolates_sweets";
  }

  // Broad category fallbacks
  if (input.category) {
    const cat = input.category.toLowerCase();
    if (cat.includes("noodle") || cat.includes("instant")) return "instant_noodles";
    if (cat.includes("chip") || cat.includes("snack") || cat.includes("namkeen")) return "potato_chips";
    if (cat.includes("biscuit") || cat.includes("bakery")) return "biscuit_cookie";
    if (cat.includes("drink") || cat.includes("juice") || cat.includes("beverage")) return "cold_drink";
    if (cat.includes("oil") || cat.includes("ghee")) return "cooking_oil";
    if (cat.includes("chocolate") || cat.includes("sweet")) return "chocolates_sweets";
  }

  return "instant_noodles"; // safe default
}

/**
 * Returns clean, healthy alternatives for any product based on Firestore alternatives
 * or high-accuracy category definitions.
 */
export function getSmartCleanerAlternatives(input: {
  name?: string;
  nameHindi?: string;
  brand?: string;
  category?: string;
  ingredientsText?: string;
}): CleanerAlternative[] {
  const categoryId = detectProductCategoryId(input);

  // Check dynamic Firestore cache first
  const doc = dynamicAlternativesCache[categoryId] || DEFAULT_CATEGORY_ALTERNATIVES[categoryId];
  if (doc && Array.isArray(doc.alternatives) && doc.alternatives.length > 0) {
    return doc.alternatives;
  }

  // Fallback to instant noodles or energy drink
  return DEFAULT_CATEGORY_ALTERNATIVES.instant_noodles.alternatives;
}
