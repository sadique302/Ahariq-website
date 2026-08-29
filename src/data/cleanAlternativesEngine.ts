import { CleanerAlternative, CategoryAlternativeDoc } from "../types";

/**
 * DEFAULT_CATEGORY_ALTERNATIVES:
 * Initial database seed and offline-first fallback dictionary for category-specific clean alternatives.
 * Every document ID is the exact category_id (e.g., energy_drink, instant_noodles, white_bread, etc.).
 */
export const DEFAULT_CATEGORY_ALTERNATIVES: Record<string, CategoryAlternativeDoc> = {
  // 0.1 MASS GAINER & WEIGHT GAINERS (Commercial Gainers vs Clean Whole Food Gainer / Whey)
  mass_gainer: {
    id: "mass_gainer",
    category_id: "mass_gainer",
    category_name: "Mass Gainers & Weight Gainers (MuscleBlaze, Serious Mass, BigMuscles)",
    target_products: [
      "Mass Gainer",
      "Weight Gainer",
      "Super Gainer",
      "Serious Mass",
      "Real Mass",
      "Mega Mass",
      "Hyper Gainer",
      "Bulk Gainer",
      "MuscleBlaze Super Gainer",
      "Labrada Mass Gainer",
      "GNC Bulk 1340",
      "Dymatize Super Mass",
      "BigMuscles Real Mass",
      "Gainer XXL"
    ],
    alternatives: [
      {
        id: "alt_clean_whey_oats_gainer",
        name: "Clean Whey + Rolled Oats Gainer Shake",
        brand: "DIY Clean Whole Food Recipe",
        score: 97,
        price: "₹65 / shake",
        priceEst: "₹60-75",
        benefit: "45g Clean Whey Protein, 0% Added Maltodextrin, Zero Refined Sugar",
        benefitHi: "45g शुद्ध व्हे प्रोटीन, 0% माल्टोडेक्सट्रिन, शून्य रिफाइंड चीनी",
        reasonEn: "Blend 1 scoop Pure Whey + 50g Rolled Oats + 1 Banana + 2 tbsp Natural Peanut Butter + 300ml Milk. Gives 700 clean calories, 45g bioavailable protein with zero cheap filler sugar.",
        reasonHi: "1 स्कूप शुद्ध व्हे + 50g रोल्ड ओट्स + 1 केला + 2 चम्मच पीनट बटर + 300ml दूध। 700 शुद्ध कैलोरी और 45g प्रोटीन बिना पेट पर चर्बी जमा किए।",
        tags: ["45g Clean Protein", "0% Maltodextrin", "No Sugar Spike"]
      },
      {
        id: "alt_mb_biozyme_whey",
        name: "MuscleBlaze Biozyme Performance Whey",
        brand: "MuscleBlaze",
        score: 92,
        price: "₹2,299 / kg",
        priceEst: "₹2,299",
        benefit: "25g Pure Protein / Scoop, 50% Higher Absorption, 0g Sugar",
        benefitHi: "25g शुद्ध प्रोटीन / स्कूप, 50% बेहतर अवशोषण, 0g चीनी",
        reasonEn: "Clinically tested enzyme formulation with 25g pure whey protein per scoop, replacing high-sugar maltodextrin powders.",
        reasonHi: "भारतीय पाचन तंत्र के अनुसार 50% बेहतर प्रोटीन अवशोषण। माल्टोडेक्सट्रिन और अतिरिक्त चीनी से पूरी तरह मुक्त।",
        tags: ["25g Pure Protein", "Enzyme Formula", "Zero Added Sugar"]
      },
      {
        id: "alt_on_gold_whey",
        name: "Optimum Nutrition (ON) Gold Standard 100% Whey",
        brand: "Optimum Nutrition",
        score: 95,
        price: "₹3,199 / kg",
        priceEst: "₹3,199",
        benefit: "24g Whey Isolate Blend, 5.5g Natural BCAAs, 1g Sugar",
        benefitHi: "24g व्हे आइसोलेट ब्लेंड, 5.5g प्राकृतिक BCAA, केवल 1g शुगर",
        reasonEn: "World's most awarded 100% Whey Protein with primary whey isolate. Builds pure lean muscle instead of belly fat.",
        reasonHi: "दुनिया का सबसे भरोसेमंद व्हे प्रोटीन। सिर्फ पेट की चर्बी बढ़ाने की जगह शुद्ध लीन मसल बनाता है।",
        tags: ["Gold Standard", "24g Protein", "Primary Isolate"]
      }
    ]
  },

  // 0.2 WHEY PROTEIN & PROTEIN POWDERS
  whey_protein: {
    id: "whey_protein",
    category_id: "whey_protein",
    category_name: "Whey Protein & Protein Powders",
    target_products: [
      "Whey Protein",
      "Whey Isolate",
      "Protein Powder",
      "Isolate Protein",
      "Concentrate Whey",
      "Hydrolyzed Whey",
      "MyProtein Whey",
      "MuscleBlaze Whey",
      "ON Gold Standard",
      "As-It-Is Whey",
      "Avvatar Whey",
      "Dymatize ISO100",
      "The Whole Truth Whey",
      "Nakpro Whey"
    ],
    alternatives: [
      {
        id: "alt_myprotein_isolate",
        name: "MyProtein Impact Whey Isolate",
        brand: "MyProtein",
        score: 98,
        price: "₹2,899 / kg",
        priceEst: "₹2,899",
        benefit: "90% Pure Protein, 0.6g Carb, Ultra-Low Lactose, Zero Fillers",
        benefitHi: "90% शुद्ध प्रोटीन, सिर्फ 0.6g कार्ब, शून्य मिलावट",
        reasonEn: "Labdoor Grade A certified 90% pure protein isolate with exceptional amino acid profile and almost zero lactose.",
        reasonHi: "लैबडोर द्वारा ग्रेड A प्रमाणित 90% शुद्ध व्हे आइसोलेट। लैक्टोज़ और फैट न के बराबर।",
        tags: ["90% Pure Protein", "Labdoor Grade A", "Ultra Low Carb"]
      },
      {
        id: "alt_whole_truth_whey",
        name: "The Whole Truth 100% Clean Whey Isolate",
        brand: "The Whole Truth",
        score: 96,
        price: "₹2,999 / kg",
        priceEst: "₹2,999",
        benefit: "0 Artificial Sweeteners / Sucralose, 100% Clean Label Transparency",
        benefitHi: "शून्य सुक्रालोज़/आर्टिफिशियल स्वीटनर, 100% पारदर्शी इंग्रीडिएंट्स",
        reasonEn: "Completely free from sucralose, artificial gums, and synthetic flavorings. Pure unadulterated grass-fed whey.",
        reasonHi: "बिना किसी सुक्रालोज़, गम या सिंथेटिक प्रिजर्वेटिव्स का शुद्ध व्हे प्रोटीन।",
        tags: ["0 Sucralose", "Clean Label", "Pure Whey"]
      },
      {
        id: "alt_asitis_raw_whey",
        name: "As-It-Is Nutrition 100% Pure Raw Whey 80%",
        brand: "As-It-Is Nutrition",
        score: 94,
        price: "₹1,699 / kg",
        priceEst: "₹1,699",
        benefit: "Raw Unflavored Whey, 24g Protein, Zero Added Flavors or Fillers",
        benefitHi: "रॉ अनफ्लेवर्ड व्हे, 24g प्रोटीन, शून्य कृत्रिम फ्लेवर",
        reasonEn: "Budget-friendly 100% raw unflavored whey concentrate without any processing aids, colors, or artificial sweeteners.",
        reasonHi: "पॉकेट-फ्रेंडली शुद्ध रॉ व्हे प्रोटीन, बिना किसी रंग, स्वाद या प्रिजर्वेटिव के।",
        tags: ["Raw Unflavored", "Budget Friendly", "Zero Fillers"]
      }
    ]
  },

  // 0.3 PEANUT BUTTER & NUT BUTTERS
  peanut_butter: {
    id: "peanut_butter",
    category_id: "peanut_butter",
    category_name: "Peanut Butter & Nut Spreads",
    target_products: [
      "Peanut Butter",
      "Peanut Spread",
      "Pintola",
      "Sundrop PB",
      "FunFoods PB",
      "Skippy PB",
      "Alpino PB",
      "MyFitness PB",
      "Nut Butter",
      "Almond Butter"
    ],
    alternatives: [
      {
        id: "alt_pintola_natural_pb",
        name: "Pintola All-Natural Peanut Butter (100% Peanuts)",
        brand: "Pintola",
        score: 97,
        price: "₹399 / kg",
        priceEst: "₹380-420",
        benefit: "100% Roasted Peanuts, 30g Protein, 0% Palm Oil, 0% Added Sugar",
        benefitHi: "100% भुनी मूंगफली, 30g प्रोटीन, 0% पाम तेल, 0% अतिरिक्त चीनी",
        reasonEn: "Only 1 single ingredient: 100% slow-roasted peanuts. Zero hydrogenated palm oil, zero stabilizers, and 30g pure plant protein.",
        reasonHi: "केवल 1 सामग्री: 100% भुनी मूंगफली। शून्य पाम ऑयल और शून्य रिफाइंड चीनी।",
        tags: ["100% Peanuts", "0% Palm Oil", "30g Protein"]
      },
      {
        id: "alt_whole_truth_dark_pb",
        name: "The Whole Truth Dark Chocolate Peanut Butter",
        brand: "The Whole Truth",
        score: 95,
        price: "₹450 / 925g",
        priceEst: "₹450",
        benefit: "Pure Peanuts & Real Cocoa, No Palm Fat, Jaggery/Dates Sweetened",
        benefitHi: "शुद्ध मूंगफली व कोको, 0% पाम फैट, बिना रिफाइंड चीनी",
        reasonEn: "Crafted with bold peanuts, pure cocoa, and dates. Completely free of hydrogenated vegetable fats.",
        reasonHi: "असली कोको और शुद्ध मूंगफली से निर्मित, पाम फैट और केमिकल प्रिजर्वेटिव्स से मुक्त।",
        tags: ["Real Cocoa", "No Hydrogenated Fat", "Clean PB"]
      },
      {
        id: "alt_alpino_high_protein_pb",
        name: "Alpino High Protein Super Peanut Butter",
        brand: "Alpino",
        score: 93,
        price: "₹499 / kg",
        priceEst: "₹499",
        benefit: "30g Protein with Whey Isolate Infusion, Zero Trans Fat",
        benefitHi: "व्हे आइसोलेट युक्त 30g प्रोटीन, शून्य ट्रांस फैट",
        reasonEn: "Slow roasted peanuts infused with premium whey protein isolate for higher protein per spoon without palm oil.",
        reasonHi: "व्हे प्रोटीन आइसोलेट से युक्त पौष्टिक पीनट बटर, पाम ऑयल मुक्त।",
        tags: ["Whey Infused", "30g Protein", "High Energy"]
      }
    ]
  },

  // 0.4 CREATINE & PERFORMANCE SUPPLEMENTS
  creatine: {
    id: "creatine",
    category_id: "creatine",
    category_name: "Creatine Monohydrate & Performance Enhancers",
    target_products: [
      "Creatine",
      "Creatine Monohydrate",
      "Creapure",
      "Micronized Creatine",
      "MuscleBlaze Creatine",
      "ON Creatine",
      "Wellcore Creatine"
    ],
    alternatives: [
      {
        id: "alt_creapure_creatine",
        name: "Creapure 100% Pure German Creatine Monohydrate",
        brand: "Creapure / Verified Clean Lab",
        score: 99,
        price: "₹799 / 250g",
        priceEst: "₹799",
        benefit: "99.99% Ultra-Pure German Creapure, 0 DCD, 0 Heavy Metals",
        benefitHi: "99.99% शुद्ध जर्मन क्रियाप्योर, शून्य हैवी मेटल्स",
        reasonEn: "The worldwide gold standard of creatine manufactured in Germany. Increases ATP cellular energy and lean muscle power.",
        reasonHi: "जर्मनी में निर्मित 99.99% शुद्ध क्रियाप्योर क्रिएटिन। ताकत और मसल रिकवरी के लिए सर्वश्रेष्ठ।",
        tags: ["99.99% Pure", "German Creapure", "ATP Power"]
      },
      {
        id: "alt_wellcore_creatine",
        name: "Wellcore Pure Micronized Creatine Monohydrate",
        brand: "Wellcore",
        score: 96,
        price: "₹649 / 250g",
        priceEst: "₹649",
        benefit: "Ultra-Micronized 200 Mesh, Instant Solubility, Zero Sugar",
        benefitHi: "अल्ट्रा-माइक्रोनाइज्ड 200 मेश, तुरंत घुलनशील, 0g शुगर",
        reasonEn: "Ultra-fine micronized creatine powder with superior mixability and zero bloating fillers.",
        reasonHi: "पानी में तुरंत घुलने वाला माइक्रोनाइज्ड क्रिएटिन, बिना किसी हानिकारक फिलर के।",
        tags: ["Micronized 200 Mesh", "Fast Dissolving", "Zero Fillers"]
      }
    ]
  },

  // 0.5 PROTEIN BARS & GYM SNACKS
  protein_bar: {
    id: "protein_bar",
    category_id: "protein_bar",
    category_name: "Protein Bars & Fitness Snacks",
    target_products: [
      "Protein Bar",
      "Whey Bar",
      "Energy Bar",
      "Yoga Bar Protein",
      "RiteBite Max Protein",
      "MuscleBlaze Bar",
      "The Whole Truth Bar"
    ],
    alternatives: [
      {
        id: "alt_whole_truth_bar",
        name: "The Whole Truth 100% Clean Protein Bar",
        brand: "The Whole Truth",
        score: 97,
        price: "₹120 / bar",
        priceEst: "₹120",
        benefit: "100% Whole Food Ingredients, 0 Sugar Alcohols/Maltitol, 15g Protein",
        benefitHi: "100% असली सामग्री (खजूर, बादाम, व्हे), शून्य माल्टिटोल, 15g प्रोटीन",
        reasonEn: "Contains only 4-5 real ingredients: Whey isolate, almonds, raw dates, and cocoa. 0 Maltitol, 0 Palm Oil.",
        reasonHi: "केवल 4-5 शुद्ध सामग्री: व्हे प्रोटीन, बादाम, खजूर और कोको। पेट खराब करने वाले माल्टिटोल और पाम ऑयल से मुक्त।",
        tags: ["100% Whole Food", "0 Maltitol", "No Palm Oil"]
      },
      {
        id: "alt_yoga_bar_20g",
        name: "Yoga Bar 20g Whey Protein Bar",
        brand: "Yoga Bar",
        score: 91,
        price: "₹110 / bar",
        priceEst: "₹110",
        benefit: "20g Whey Protein, Prebiotic Chicory Fiber, Almond Butter",
        benefitHi: "20g व्हे प्रोटीन, प्रीबायोटिक फाइबर, बादाम बटर",
        reasonEn: "High protein bar with 20g whey & nut protein and prebiotic fiber for steady gut digestion.",
        reasonHi: "20g व्हे प्रोटीन और पाचक फाइबर से भरपूर पौष्टिक बार।",
        tags: ["20g Protein", "Prebiotic Fiber", "No Artificial Sweeteners"]
      },
      {
        id: "alt_amul_protein_lassi_snack",
        name: "Amul High Protein Lassi / Buttermilk",
        brand: "Amul",
        score: 98,
        price: "₹25 / 200ml",
        priceEst: "₹25",
        benefit: "15g Natural Dairy Whey Protein, Active Probiotics, ₹25 Budget",
        benefitHi: "15g शुद्ध डेयरी व्हे प्रोटीन, प्रोबायोटिक्स, मात्र ₹25 में",
        reasonEn: "Pocket-friendly 15g dairy protein snack with live gut probiotics and zero palm fat or synthetic sweeteners.",
        reasonHi: "मात्र ₹25 में 15g शुद्ध प्रोटीन और प्रोबायोटिक्स, किसी भी प्रोसेस्ड बार से बेहतर।",
        tags: ["15g Protein", "Probiotic Drink", "₹25 Budget Friendly"]
      }
    ]
  },

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
        benefit: "Pure Milk Curcumin, 0% Added Sugar, Natural Immunity",
        benefitHi: "100% शुद्ध हल्दी दूध, शून्य अतिरिक्त चीनी, प्राकृतिक इम्यूनिटी",
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
        benefit: "Sprouted Ragi, High Bioavailable Calcium, Natural Jaggery",
        benefitHi: "अंकुरित रागी, प्रचुर कैल्शियम, शुद्ध देसी गुड़ से मिठास",
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
        benefit: "20g Natural Plant Protein, Zero Chemicals, Gut Cooling",
        benefitHi: "20g शुद्ध प्राकृतिक प्रोटीन, शून्य केमिकल, पेट को प्राकृतिक ठंडक",
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
        benefit: "Oats & Lentils, Steamed Not Fried, 0% Maida, 0% Palm Oil",
        benefitHi: "ओट्स व दाल, भाप में पका (बिना तेल तला), 0% मैदा, 0% पाम ऑयल",
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
        benefit: "100% Sun-Dried Millets, 0% Palmolein Oil, Low Sodium",
        benefitHi: "धूप में सुखाए बाजरा-रागी, 0% पामोलिन तेल, कम सोडियम",
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
        benefit: "100% Roasted Suji, Fresh Vegetables, Zero Chemical Tastemaker",
        benefitHi: "100% भुनी सूजी, ताजी हरी सब्जियां, शून्य केमिकल टेस्टमेकर",
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
        benefit: "100% Atta, Zero Maida, No Palm Oil, No Bleach",
        benefitHi: "100% साबुत आटा, शून्य मैदा, शून्य पाम ऑयल, केमिकल ब्लीच मुक्त",
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
        benefit: "Natural Sourdough, No Chemical Yeast, Gut Friendly",
        benefitHi: "प्राकृतिक सावरडो खमीर, शून्य केमिकल यीस्ट, पाचन के लिए सुपाच्य",
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
        benefit: "100% Natural Corn, High Fiber, Zero Maida, Low GI",
        benefitHi: "100% शुद्ध मक्के का आटा, भरपूर फाइबर, शून्य मैदा",
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
        benefit: "Roasted Superfood, High Protein, Zero Palmolein, Pink Salt",
        benefitHi: "भुना मखाना सुपरफूड, हाई प्रोटीन, 0% पामोलिन, सेंधा नमक",
        reasonEn: "High-protein roasted lotus seeds (Foxnuts) seasoned with natural pink rock salt and cold-pressed oil. 0 Palmolein.",
        reasonHi: "सेंधा नमक और हल्के तेल में भुना हुआ मखाना, पामोलिन तेल और केमिकल प्रिजर्वेटिव्स से मुक्त।",
        tags: ["Zero Palmolein", "High Protein", "Oil-Free Roasting"]
      },
      {
        id: "alt_roasted_chana",
        name: "Roasted Chana",
        brand: "Desi Roasted Chana",
        score: 96,
        price: "₹35",
        priceEst: "₹35",
        benefit: "Oil-Free Dry Roasted, High Fiber & Plant Protein, Heart Safe",
        benefitHi: "बिना तेल सूखा भुना, प्रचुर फाइबर व प्रोटीन, हृदय के लिए सुरक्षित",
        reasonEn: "100% Dry-roasted black chickpeas with skin. Outstanding source of plant protein and resistant dietary fiber.",
        reasonHi: "बिना तेल के भुना हुआ छिलके वाला देसी चना, प्रोटीन और फाइबर का प्राकृतिक पावरहाउस।",
        tags: ["Oil-Free Roasting", "High Fiber", "High Protein"]
      },
      {
        id: "alt_shakarkandi_chips",
        name: "Shakarkandi Chips",
        brand: "Baked Sweet Potato / Too Yumm!",
        score: 92,
        price: "₹60",
        priceEst: "₹60",
        benefit: "Baked Sweet Potato, 60% Less Saturated Fat, Vitamin A Rich",
        benefitHi: "बेक्ड शकरकंद, 60% कम सैचुरेटेड फैट, विटामिन A से भरपूर",
        reasonEn: "Baked sweet potato crisps rich in Beta-Carotene Vitamin A and complex carbs with 60% less saturated fat.",
        reasonHi: "शकरकंद (स्वीट पोटैटो) के बेक्ड चिप्स, विटामिन A और फाइबर से भरपूर।",
        tags: ["Baked", "Zero Palmolein", "High Fiber"]
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
        benefit: "100% Pure Electrolytes, Zero Added Sugar, Zero Acid",
        benefitHi: "100% शुद्ध प्राकृतिक इलेक्ट्रोलाइट्स, शून्य चीनी, शून्य एसिड",
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
        benefit: "Natural Vitamin C, Pink Rock Salt, No Fructose Syrup",
        benefitHi: "प्राकृतिक विटामिन C, सेंधा नमक, शून्य लिक्विड फ्रुक्टोज सिरप",
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
        benefit: "Live Probiotics, Digestive Mint & Cumin, Gut Friendly",
        benefitHi: "सक्रिय प्रोबायोटिक्स, पाचक पुदीना व भुना जीरा, पेट के लिए शीतल",
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
        benefit: "Zero Maida, No Palm Oil, Whole Ragi & Organic Jaggery",
        benefitHi: "शून्य मैदा, शून्य पाम ऑयल, साबुत रागी व शुद्ध जैविक गुड़",
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
        benefit: "Slow-Roasted Peanuts, Iron-Rich Organic Jaggery, High Protein",
        benefitHi: "भुनी मूंगफली, आयरन से भरपूर देसी गुड़, शुद्ध प्राकृतिक प्रोटीन",
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
        benefit: "Ayurvedic Classic, Boosts Hemoglobin & Stamina, Zero Trans Fat",
        benefitHi: "आयुर्वेदिक सुपरफूड, हीमोग्लोबिन व स्टेमिना वर्धक, शून्य ट्रांस फैट",
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
        benefit: "Cold Wood-Pressed, Zero Solvents, Zero Bleaching, 100% Pure",
        benefitHi: "लकड़ी की घानी, शून्य केमिकल साल्वेंट, शून्य ब्लीच, 100% शुद्ध",
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
        benefit: "Traditional Bilona Ghee, High Smoke Point, Zero Trans Fat",
        benefitHi: "पारंपरिक बिलोना घी, उच्च स्मोक पॉइंट, शून्य ट्रांस फैट",
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
        benefit: "Pure Cocoa & Dates, 0% Cane Sugar, No Palm Oil, No Emulsifiers",
        benefitHi: "शुद्ध कोको व खजूर, 0% रिफाइंड चीनी, 0% पाम तेल, केमिकल मुक्त",
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
        benefit: "100% Natural Jaggery & Peanuts, No Liquid Glucose Syrup",
        benefitHi: "100% शुद्ध देसी गुड़ व मूंगफली, शून्य लिक्विड ग्लूकोज सिरप",
        reasonEn: "Crushed roasted peanuts bound with 100% natural sugarcane jaggery.",
        reasonHi: "मूंगफली और शुद्ध देसी गुड़ की चिक्की, बिना किसी ग्लूकोज सिरप के।",
        tags: ["100% Jaggery", "Natural Snack", "Iron Rich"]
      }
    ]
  },

  // 12. SPICES & MASALAS (Everest, MDH, Catch, Garam Masala)
  spices_masalas: {
    id: "spices_masalas",
    category_id: "spices_masalas",
    category_name: "Spices & Masalas (Everest, MDH, 24 Mantra)",
    target_products: [
      "Everest",
      "MDH",
      "Catch",
      "Garam Masala",
      "Masala",
      "Spices",
      "Goldiee",
      "Badshah",
      "Turmeric",
      "Coriander Powder",
      "Chilli Powder"
    ],
    alternatives: [
      {
        id: "alt_24mantra_garam_masala",
        name: "24 Mantra Organic Handpicked Garam Masala",
        brand: "24 Mantra Organic",
        score: 95,
        price: "₹45",
        priceEst: "₹45",
        benefit: "100% Organic, Zero Chemical Pesticides",
        benefitHi: "100% जैविक मसाले, शून्य केमिकल या ETO स्टरलाइजेशन",
        reasonEn: "Certified Organic whole spices, zero chemical pesticide fumigation, unadulterated whole aroma.",
        reasonHi: "100% जैविक मसाले, बिना किसी केमिकल फ्यूमिगेशन के।",
        tags: ["100% Organic", "Zero ETO Residue"]
      },
      {
        id: "alt_organictattva_garam_masala",
        name: "Organic Tattva Garam Masala",
        brand: "Organic Tattva",
        score: 94,
        price: "₹50",
        priceEst: "₹50",
        benefit: "Pesticide Free, Single Origin Spices",
        benefitHi: "कीटनाशक मुक्त, प्रामाणिक साबुत मसाले",
        reasonEn: "Non-irradiated pure whole spices; zero artificial enhancers.",
        reasonHi: "शुद्ध प्राकृतिक साबुत मसाले, बिना किसी केमिकल ट्रीटमेंट के।",
        tags: ["Pesticide Free", "Unadulterated"]
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

  // 0.1 MASS GAINERS (High priority check before general protein/whey)
  if (
    text.includes("mass gainer") ||
    text.includes("weight gainer") ||
    text.includes("super gainer") ||
    text.includes("serious mass") ||
    text.includes("real mass") ||
    text.includes("mega mass") ||
    text.includes("hyper gainer") ||
    text.includes("bulk 1340") ||
    text.includes("gainer xxl") ||
    (text.includes("gainer") && !text.includes("whey isolate"))
  ) {
    return "mass_gainer";
  }

  // 0.2 PEANUT BUTTER & NUT BUTTERS (High priority before general oils/spreads)
  if (
    text.includes("peanut butter") ||
    text.includes("peanut spread") ||
    text.includes("pintola") ||
    text.includes("alpino") ||
    text.includes("myfitness") ||
    text.includes("nut butter") ||
    text.includes("almond butter")
  ) {
    return "peanut_butter";
  }

  // 0.3 CREATINE SUPPLEMENTS
  if (
    text.includes("creatine") ||
    text.includes("creapure") ||
    text.includes("creamp") ||
    text.includes("creatine monohydrate")
  ) {
    return "creatine";
  }

  // 0.4 PROTEIN BARS & GYM SNACKS
  if (
    text.includes("protein bar") ||
    text.includes("whey bar") ||
    text.includes("energy bar") ||
    text.includes("max protein") ||
    text.includes("ritebite") ||
    text.includes("yoga bar")
  ) {
    return "protein_bar";
  }

  // 0.5 WHEY PROTEIN & PROTEIN ISOLATE / CONCENTRATE POWDER
  if (
    text.includes("whey") ||
    text.includes("isolate protein") ||
    text.includes("protein powder") ||
    text.includes("concentrate whey") ||
    text.includes("biozyme") ||
    text.includes("hydrolyzed whey") ||
    text.includes("myprotein") ||
    text.includes("dymatize") ||
    text.includes("avvatar") ||
    text.includes("as-it-is") ||
    text.includes("asitis") ||
    text.includes("nakpro")
  ) {
    return "whey_protein";
  }

  // 1. SAVORY CRISPY SNACKS & CHIPS & NAMKEEN (Kurkure, Lays, Bingo, Uncle Chipps, Bhujia, Puffs, Namkeen)
  // HIGH PRIORITY: Must be matched before Cold Drinks because snacks like Kurkure/Lays are manufactured by PepsiCo!
  const isSavoryCrispySnack =
    text.includes("kurkure") ||
    text.includes("lays") ||
    text.includes("lay's") ||
    text.includes("chips") ||
    text.includes("crisps") ||
    text.includes("crispy") ||
    text.includes("bingo") ||
    text.includes("uncle chipps") ||
    text.includes("pringles") ||
    text.includes("doritos") ||
    text.includes("namkeen") ||
    text.includes("bhujia") ||
    text.includes("puffcorn") ||
    text.includes("puff") ||
    text.includes("puffed") ||
    text.includes("nachos") ||
    text.includes("sev") ||
    text.includes("chivda") ||
    text.includes("extruded") ||
    (input.category && (
      input.category.toLowerCase().includes("snack") ||
      input.category.toLowerCase().includes("namkeen") ||
      input.category.toLowerCase().includes("chip")
    ));

  if (isSavoryCrispySnack) {
    return "potato_chips";
  }

  // 2. Instant Noodles & Pasta (Maggi, Yippee, Top Ramen, etc.)
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

  // 3. Biscuits & Cookies (Parle-G, Oreo, Good Day, etc.)
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

  // 4. Cold Drinks, Colas, Sodas & Carbonated Beverages (Coke, Pepsi, Fanta, Sprite, Thums Up, etc.)
  if (
    (text.includes("pepsi") && !text.includes("pepsico")) ||
    text.includes("pepsi can") ||
    text.includes("pepsi bottle") ||
    text.includes("pepsi cola") ||
    text.includes("coca-cola") ||
    text.includes("coke") ||
    text.includes("fanta") ||
    text.includes("sprite") ||
    text.includes("thums up") ||
    text.includes("mirinda") ||
    text.includes("mountain dew") ||
    text.includes("7up") ||
    text.includes("limca") ||
    text.includes("sting energy") ||
    text.includes("cold drink") ||
    text.includes("soda") ||
    text.includes("cola") ||
    text.includes("carbonated beverage") ||
    text.includes("carbonated drink") ||
    text.includes("soft drink") ||
    text.includes("aerated") ||
    text.includes("fizzy")
  ) {
    return "cold_drink";
  }

  // 5. Energy Drink & Malt Drinks (Bournvita, Horlicks, Boost, Red Bull, etc.)
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
    text.includes("monster energy")
  ) {
    return "energy_drink";
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
    text.includes("palmolein") ||
    text.includes("refined oil") ||
    text.includes("sunflower oil") ||
    text.includes("mustard oil") ||
    text.includes("soybean oil") ||
    text.includes("vanaspati") ||
    text.includes("dalda") ||
    text.includes("cooking oil") ||
    (text.includes("oil") && !text.includes("essential") && !text.includes("hair"))
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

  // 9. Spices & Masalas (Everest, MDH, Catch, Garam Masala, Turmeric)
  if (
    text.includes("masala") ||
    text.includes("everest") ||
    text.includes("mdh") ||
    text.includes("catch") ||
    text.includes("garam masala") ||
    text.includes("spices") ||
    text.includes("turmeric") ||
    text.includes("haldi") ||
    text.includes("dhaniya") ||
    text.includes("mirch powder") ||
    text.includes("chilli powder")
  ) {
    return "spices_masalas";
  }

  // 10. Bottled Plain Water & Mineral Water (Bisleri, Kinley, Aquafina, etc.) - ONLY if not soda/cola
  const isPureWaterItem =
    text.includes("bisleri") ||
    text.includes("kinley") ||
    text.includes("aquafina") ||
    text.includes("himalayan water") ||
    text.includes("bailey") ||
    text.includes("rail neer") ||
    text.includes("vedica") ||
    text.includes("qua") ||
    text.includes("pure mineral water") ||
    text.includes("packaged drinking water") ||
    text.includes("natural spring water");

  if (isPureWaterItem) {
    return "pure_water";
  }

  // Broad category fallbacks
  if (input.category) {
    const cat = input.category.toLowerCase();
    if (cat.includes("noodle") || cat.includes("instant")) return "instant_noodles";
    if (cat.includes("chip") || cat.includes("snack") || cat.includes("namkeen")) return "potato_chips";
    if (cat.includes("biscuit") || cat.includes("bakery") || cat.includes("cookie")) return "biscuit_cookie";
    if (cat.includes("drink") || cat.includes("soda") || cat.includes("cola") || cat.includes("beverage")) return "cold_drink";
    if (cat.includes("oil") || cat.includes("fat") || cat.includes("ghee")) return "cooking_oil";
    if (cat.includes("chocolate") || cat.includes("sweet") || cat.includes("candy")) return "chocolates_sweets";
    if (cat.includes("bread") || cat.includes("toast") || cat.includes("bun")) return "white_bread";
    if (cat.includes("spice") || cat.includes("masala")) return "spices_masalas";
    if (cat.includes("water") && !cat.includes("carbonated") && !cat.includes("flavor")) return "pure_water";
  }

  return "unknown_category";
}

/**
 * Universal Indian healthy fallback alternatives for general snacks/beverages
 */
const UNIVERSAL_HEALTHY_FALLBACKS: CleanerAlternative[] = [
  {
    id: "alt_nariyal_pani_fallback",
    name: "Nariyal Pani (Coconut Water)",
    brand: "Fresh Natural / RAW Pressery",
    score: 96,
    price: "₹50",
    priceEst: "₹50-60",
    benefit: "100% Pure Natural Hydration, 0% Added Sugar, Natural Electrolytes",
    benefitHi: "100% शुद्ध ताज़ा नारियल पानी, शून्य अतिरिक्त चीनी, प्राकृतिक इलेक्ट्रोलाइट्स",
    reasonEn: "100% Pure tender coconut water. Free from artificial chemicals, refined sugars, or preservatives.",
    reasonHi: "शुद्ध ताज़ा नारियल पानी, शरीर को तुरंत ताजगी व जरूरी खनिज देता है बिना किसी केमिकल के।",
    tags: ["100% Natural", "Zero Sugar", "Electrolyte Rich"]
  },
  {
    id: "alt_makhana_fallback",
    name: "Roasted Makhana (Foxnuts)",
    brand: "Taali / Roasted Desi",
    score: 95,
    price: "₹55",
    priceEst: "₹50-80",
    benefit: "Oil-Free Roasted Superfood, High Protein, Zero Palm Oil",
    benefitHi: "हल्के सेंधा नमक में भुना मखाना, 0% पाम ऑयल, हाई प्रोटीन",
    reasonEn: "High-protein roasted lotus seeds seasoned with pink rock salt and zero refined palm oil.",
    reasonHi: "सेंधा नमक में भुना मखाना, पामोलिन तेल और हानिकारक मैदा से पूरी तरह मुक्त।",
    tags: ["Zero Palm Oil", "High Protein", "Superfood"]
  },
  {
    id: "alt_chaas_fallback",
    name: "Masala Chaas (Buttermilk)",
    brand: "Fresh Curd / Amul",
    score: 95,
    price: "₹20",
    priceEst: "₹15-25",
    benefit: "Probiotic Curd, Digestive Cumin, 0% Refined Sugar",
    benefitHi: "ताज़ा प्रोबायोटिक छाछ, पाचक भुना जीरा व पुदीना, शून्य चीनी",
    reasonEn: "Traditional probiotic buttermilk seasoned with roasted cumin and mint. Promotes healthy digestion.",
    reasonHi: "पाचक भुने जीरे वाली ताज़ा प्रोबायोटिक छाछ, पाचन के लिए अमृत समान।",
    tags: ["Probiotic", "Gut Friendly", "0% Added Sugar"]
  }
];

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

  // Pure water or top clean natural items need NO alternatives
  if (categoryId === "pure_water") {
    return [];
  }

  // Check dynamic Firestore cache first
  const doc = dynamicAlternativesCache[categoryId] || DEFAULT_CATEGORY_ALTERNATIVES[categoryId];
  if (doc && Array.isArray(doc.alternatives) && doc.alternatives.length > 0) {
    return doc.alternatives;
  }

  // If fitness / gym / protein related, return fitness category alternatives
  const text = `${input.name || ""} ${input.brand || ""} ${input.category || ""} ${input.ingredientsText || ""}`.toLowerCase();
  if (
    text.includes("gainer") ||
    text.includes("mass") ||
    text.includes("weight gain") ||
    text.includes("calorie")
  ) {
    return DEFAULT_CATEGORY_ALTERNATIVES.mass_gainer?.alternatives || [];
  }
  if (
    text.includes("protein") ||
    text.includes("whey") ||
    text.includes("isolate") ||
    text.includes("bcaa") ||
    text.includes("workout") ||
    text.includes("gym") ||
    text.includes("fitness") ||
    text.includes("supplement")
  ) {
    return DEFAULT_CATEGORY_ALTERNATIVES.whey_protein?.alternatives || [];
  }
  if (text.includes("peanut") || text.includes("butter")) {
    return DEFAULT_CATEGORY_ALTERNATIVES.peanut_butter?.alternatives || [];
  }
  if (text.includes("creatine")) {
    return DEFAULT_CATEGORY_ALTERNATIVES.creatine?.alternatives || [];
  }

  // If savory snack, chips, namkeen, or Kurkure, return potato_chips / roasted snack alternatives
  if (
    text.includes("kurkure") ||
    text.includes("chip") ||
    text.includes("snack") ||
    text.includes("namkeen") ||
    text.includes("bhujia") ||
    text.includes("crisp") ||
    text.includes("puff")
  ) {
    return DEFAULT_CATEGORY_ALTERNATIVES.potato_chips?.alternatives || [];
  }

  // If beverage or drink-like, return cold drink clean alternatives
  if (
    (text.includes("drink") && !text.includes("food")) ||
    text.includes("juice") ||
    text.includes("beverage") ||
    text.includes("cola") ||
    text.includes("soda")
  ) {
    return DEFAULT_CATEGORY_ALTERNATIVES.cold_drink?.alternatives || UNIVERSAL_HEALTHY_FALLBACKS;
  }

  return UNIVERSAL_HEALTHY_FALLBACKS;
}
