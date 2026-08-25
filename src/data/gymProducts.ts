import { FoodProduct } from "../types";

export interface GymProductItem {
  id: string;
  name: string;
  nameHindi: string;
  brand: string;
  category: "whey_protein" | "mass_gainer" | "peanut_butter" | "creatine" | "bars_snacks" | "dairy_plant_protein" | "oats_carbs";
  categoryLabelEn: string;
  categoryLabelHi: string;
  imageUrl: string;
  healthScore: number;
  fitScore: number; // 0 to 100 gym rating
  isVegetarian: boolean;
  verdictType: "green" | "yellow" | "red";
  verdictEn: "Clean Fit Choice" | "Moderate / Usable" | "Avoid (Sugar/Fillers)";
  verdictHi: "जिम के लिए बेस्ट (Clean)" | "सावधानी से इस्तेमाल करें" | "बचें (शुगर/मिलावट)";
  proteinPer100g: number; // in grams
  proteinPerServing: string; // e.g. "25g / scoop (30g)"
  sugarPer100g: number; // in grams
  addedSugar: string;
  caloriesPer100g: number;
  hasPalmOil: boolean;
  hasMaltodextrin: boolean;
  hasArtificialSweeteners: boolean;
  priceEst: string;
  cleanIngredients: string[];
  watchouts: string[];
  keyHighlightEn: string;
  keyHighlightHi: string;
  servingSize: string;
  fssaiNumber?: string;
  buyUrlHint?: string;
}

export interface ComparisonPreset {
  id: string;
  titleEn: string;
  titleHi: string;
  subtitleEn: string;
  subtitleHi: string;
  tag: string;
  product1Id: string;
  product2Id: string;
  verdictTitleEn: string;
  verdictTitleHi: string;
  winnerId: string;
  whyWinnerEn: string;
  whyWinnerHi: string;
}

export interface GymGuideItem {
  id: string;
  titleEn: string;
  titleHi: string;
  category: "peanut_butter" | "whey_vs_gainer" | "high_protein_foods" | "pre_post_workout";
  shortDescEn: string;
  shortDescHi: string;
  icon: string;
  badge: string;
  keyTakeawayEn: string;
  keyTakeawayHi: string;
  checklistEn: string[];
  checklistHi: string[];
  recommendedItems: {
    name: string;
    brand: string;
    protein: string;
    score: number;
    badge: string;
    why: string;
  }[];
  avoidItems: {
    name: string;
    brand: string;
    issue: string;
    badge: string;
  }[];
}

export const GYM_PRODUCTS_DATA: GymProductItem[] = [
  {
    id: "myprotein-impact-whey",
    name: "MyProtein Impact Whey Isolate (Unflavored)",
    nameHindi: "मायप्रोटीन इम्पैक्ट व्हे आइसोलेट (अनफ्लेवर्ड)",
    brand: "MyProtein",
    category: "whey_protein",
    categoryLabelEn: "Whey Isolate",
    categoryLabelHi: "व्हे आइसोलेट",
    imageUrl: "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=600&auto=format&fit=crop&q=80",
    healthScore: 96,
    fitScore: 98,
    isVegetarian: true,
    verdictType: "green",
    verdictEn: "Clean Fit Choice",
    verdictHi: "जिम के लिए बेस्ट (Clean)",
    proteinPer100g: 90,
    proteinPerServing: "23g / 25g scoop",
    sugarPer100g: 0.6,
    addedSugar: "0g (Zero Added Sugar)",
    caloriesPer100g: 373,
    hasPalmOil: false,
    hasMaltodextrin: false,
    hasArtificialSweeteners: false,
    priceEst: "₹2,899 / kg",
    cleanIngredients: ["100% Whey Protein Isolate (Milk)", "Sunflower Lecithin (Emulsifier)"],
    watchouts: ["Requires shaker bottle for easy mixing"],
    keyHighlightEn: "90% pure protein by weight with ultra-low lactose and zero fillers.",
    keyHighlightHi: "वजन के हिसाब से 90% शुद्ध प्रोटीन, शून्य चीनी और शून्य कृत्रिम मिठास।",
    servingSize: "25g (1 Scoop)",
    fssaiNumber: "10015064000576",
  },
  {
    id: "muscleblaze-biozyme-whey",
    name: "MuscleBlaze Biozyme Performance Whey",
    nameHindi: "मसलब्लेज बायोजाइम परफॉर्मेंस व्हे",
    brand: "MuscleBlaze",
    category: "whey_protein",
    categoryLabelEn: "Whey Protein",
    categoryLabelHi: "व्हे प्रोटीन",
    imageUrl: "https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?w=600&auto=format&fit=crop&q=80",
    healthScore: 88,
    fitScore: 92,
    isVegetarian: true,
    verdictType: "green",
    verdictEn: "Clean Fit Choice",
    verdictHi: "जिम के लिए बेस्ट (Clean)",
    proteinPer100g: 70,
    proteinPerServing: "25g / 36g scoop",
    sugarPer100g: 1.8,
    addedSugar: "0g Added Sugar",
    caloriesPer100g: 388,
    hasPalmOil: false,
    hasMaltodextrin: false,
    hasArtificialSweeteners: true,
    priceEst: "₹2,299 / kg",
    cleanIngredients: ["Whey Protein Concentrate", "Whey Protein Isolate", "Digestive Enzymes (Enhanced Absorption Formula)"],
    watchouts: ["Contains Sucralose (INS 955) in flavored variants"],
    keyHighlightEn: "Clinically tested for 50% higher protein absorption for Indian stomachs.",
    keyHighlightHi: "भारतीय पाचन के अनुकूल 50% अधिक प्रोटीन अवशोषण तकनीक।",
    servingSize: "36g (1 Scoop)",
    fssaiNumber: "10015064000576",
  },
  {
    id: "generic-mass-gainer-extreme",
    name: "Commercial Mega Mass Gainer 3000",
    nameHindi: "कमर्शियल मेगा मास गेनर (शुगर भरा)",
    brand: "Commercial Fitness Brands",
    category: "mass_gainer",
    categoryLabelEn: "Mass Gainer",
    categoryLabelHi: "मास गेनर",
    imageUrl: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600&auto=format&fit=crop&q=80",
    healthScore: 28,
    fitScore: 32,
    isVegetarian: true,
    verdictType: "red",
    verdictEn: "Avoid (Sugar/Fillers)",
    verdictHi: "बचें (शुगर/मिलावट)",
    proteinPer100g: 15,
    proteinPerServing: "15g / 100g serving",
    sugarPer100g: 38,
    addedSugar: "34g Added Sugar / Dextrose",
    caloriesPer100g: 410,
    hasPalmOil: true,
    hasMaltodextrin: true,
    hasArtificialSweeteners: true,
    priceEst: "₹1,499 / 2kg",
    cleanIngredients: ["Small amount of Whey Concentrate"],
    watchouts: ["70% Maltodextrin and refined dextrose powder", "Fatty acid blend with hydrogenated palm oil", "Causes visceral belly fat and insulin spikes"],
    keyHighlightEn: "Misleading protein label; 70% of powder is cheap maltodextrin sugar filler.",
    keyHighlightHi: "70% हिस्सा सस्ती माल्टोडेक्सट्रिन चीनी और पाम ऑयल का है। सिर्फ पेट की चर्बी बढ़ाता है।",
    servingSize: "100g (2 Big Scoops)",
  },
  {
    id: "pintola-all-natural-pb",
    name: "Pintola All-Natural Peanut Butter (Crunchy / Creamy)",
    nameHindi: "पिंटोला ऑल-नेचुरल पीनट बटर (100% मूंगफली)",
    brand: "Pintola",
    category: "peanut_butter",
    categoryLabelEn: "Natural Peanut Butter",
    categoryLabelHi: "नेचुरल पीनट बटर",
    imageUrl: "https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?w=600&auto=format&fit=crop&q=80",
    healthScore: 95,
    fitScore: 97,
    isVegetarian: true,
    verdictType: "green",
    verdictEn: "Clean Fit Choice",
    verdictHi: "जिम के लिए बेस्ट (Clean)",
    proteinPer100g: 30,
    proteinPerServing: "9.6g / 32g (2 tbsp)",
    sugarPer100g: 3.2,
    addedSugar: "0g (Zero Added Sugar)",
    caloriesPer100g: 625,
    hasPalmOil: false,
    hasMaltodextrin: false,
    hasArtificialSweeteners: false,
    priceEst: "₹399 / 1kg",
    cleanIngredients: ["100% Roasted Peanuts"],
    watchouts: ["Natural oil separation occurs (stir well before use)"],
    keyHighlightEn: "Single-ingredient purity: 100% slow-roasted peanuts, 0 Palm Oil, 0 Added Sugar.",
    keyHighlightHi: "केवल 1 सामग्री: 100% भुनी हुई मूंगफली। शून्य पाम तेल और शून्य चीनी।",
    servingSize: "32g (2 Tablespoons)",
    fssaiNumber: "10019021004171",
  },
  {
    id: "sundrop-commercial-pb",
    name: "Sundrop / Generic Commercial Peanut Butter",
    nameHindi: "सनड्रॉप / कमर्शियल पीनट बटर (पाम ऑयल व चीनी)",
    brand: "Commercial Brands",
    category: "peanut_butter",
    categoryLabelEn: "Commercial Peanut Butter",
    categoryLabelHi: "कमर्शियल पीनट बटर",
    imageUrl: "https://images.unsplash.com/photo-1568651347663-8a291a1a5b88?w=600&auto=format&fit=crop&q=80",
    healthScore: 38,
    fitScore: 42,
    isVegetarian: true,
    verdictType: "red",
    verdictEn: "Avoid (Sugar/Fillers)",
    verdictHi: "बचें (शुगर/मिलावट)",
    proteinPer100g: 22,
    proteinPerServing: "7g / 32g",
    sugarPer100g: 19.5,
    addedSugar: "15g Added Refined Sugar",
    caloriesPer100g: 640,
    hasPalmOil: true,
    hasMaltodextrin: false,
    hasArtificialSweeteners: false,
    priceEst: "₹320 / 920g",
    cleanIngredients: ["Roasted Peanuts (75%)"],
    watchouts: ["Hydrogenated Vegetable Oil / Palm Oil to prevent oil separation", "High added refined sugar (19.5%)", "Hydrogenation produces trans-fats"],
    keyHighlightEn: "Contains hydrogenated palm oil emulsifiers and 19.5% refined white sugar.",
    keyHighlightHi: "हाइड्रोजनीकृत पाम ऑयल और 19% चीनी मिलाकर बनाया गया है। हृदय के लिए हानिकारक।",
    servingSize: "32g (2 Tablespoons)",
  },
  {
    id: "amul-high-protein-lassi-buttermilk",
    name: "Amul High Protein Lassi / Buttermilk (Rose / Masala)",
    nameHindi: "अमूल हाई प्रोटीन लस्सी / छाछ (15g व्हे)",
    brand: "Amul (GCMMF)",
    category: "dairy_plant_protein",
    categoryLabelEn: "High Protein Dairy",
    categoryLabelHi: "हाई प्रोटीन डेयरी",
    imageUrl: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=600&auto=format&fit=crop&q=80",
    healthScore: 92,
    fitScore: 95,
    isVegetarian: true,
    verdictType: "green",
    verdictEn: "Clean Fit Choice",
    verdictHi: "जिम के लिए बेस्ट (Clean)",
    proteinPer100g: 7.5,
    proteinPerServing: "15g / 200ml pack",
    sugarPer100g: 1.5,
    addedSugar: "0g Added Sugar",
    caloriesPer100g: 45,
    hasPalmOil: false,
    hasMaltodextrin: false,
    hasArtificialSweeteners: false,
    priceEst: "₹25 / 200ml",
    cleanIngredients: ["Pasteurised Skimmed Milk", "Milk Solids", "Whey Protein Concentrate", "Active Bacterial Probiotic Cultures"],
    watchouts: ["Keep refrigerated"],
    keyHighlightEn: "₹25 me 15g high quality dairy whey protein with active gut probiotics.",
    keyHighlightHi: "सिर्फ ₹25 में 15 ग्राम शुद्ध प्रोटीन और प्रोबायोटिक्स। भारत का सबसे सस्ता व शुद्ध प्रोटीन।",
    servingSize: "200ml (1 Pack)",
    fssaiNumber: "10012021000071",
  },
  {
    id: "epigamia-greek-yogurt-natural",
    name: "Epigamia Natural Greek Yogurt (High Protein)",
    nameHindi: "एपिकामिया नेचुरल ग्रीक योगर्ट",
    brand: "Epigamia",
    category: "dairy_plant_protein",
    categoryLabelEn: "Greek Yogurt",
    categoryLabelHi: "ग्रीक योगर्ट",
    imageUrl: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=600&auto=format&fit=crop&q=80",
    healthScore: 94,
    fitScore: 96,
    isVegetarian: true,
    verdictType: "green",
    verdictEn: "Clean Fit Choice",
    verdictHi: "जिम के लिए बेस्ट (Clean)",
    proteinPer100g: 8.5,
    proteinPerServing: "7.5g / 90g cup",
    sugarPer100g: 3.5,
    addedSugar: "0g Added Sugar (Only natural lactose)",
    caloriesPer100g: 85,
    hasPalmOil: false,
    hasMaltodextrin: false,
    hasArtificialSweeteners: false,
    priceEst: "₹50 / cup",
    cleanIngredients: ["Pasteurised Double Toned Milk", "Active Live Cultures (Streptococcus thermophilus, Lactobacillus bulgaricus)"],
    watchouts: ["Slightly pricier than traditional homemade curd"],
    keyHighlightEn: "Triple-strained for 2x natural protein and thick creamy texture without starch.",
    keyHighlightHi: "पारंपरिक विधि से छाना हुआ गाढ़ा दही जिसमें बिना किसी पाउडर के 2x प्रोटीन है।",
    servingSize: "90g (1 Cup)",
  },
  {
    id: "sweetened-flavored-yogurt",
    name: "Commercial Fruit Flavoured Sweetened Yogurt",
    nameHindi: "कमर्शियल फ्लेवर्ड योगर्ट (चीनी से भरा)",
    brand: "Commercial Dairy Brands",
    category: "dairy_plant_protein",
    categoryLabelEn: "Commercial Yogurt",
    categoryLabelHi: "कमर्शियल योगर्ट",
    imageUrl: "https://images.unsplash.com/photo-1571212515416-fef01fc43637?w=600&auto=format&fit=crop&q=80",
    healthScore: 36,
    fitScore: 38,
    isVegetarian: true,
    verdictType: "red",
    verdictEn: "Avoid (Sugar/Fillers)",
    verdictHi: "बचें (शुगर/मिलावट)",
    proteinPer100g: 3.0,
    proteinPerServing: "3g / 100g cup",
    sugarPer100g: 17.5,
    addedSugar: "14g Added Refined Sugar",
    caloriesPer100g: 120,
    hasPalmOil: false,
    hasMaltodextrin: true,
    hasArtificialSweeteners: false,
    priceEst: "₹45 / cup",
    cleanIngredients: ["Toned Milk"],
    watchouts: ["14g added refined sugar per small cup (3.5 tsp sugar)", "Synthetic fruit flavours and modified corn starch thickeners"],
    keyHighlightEn: "Marketed as healthy probiotic snack, but contains as much sugar as an ice cream scoop.",
    keyHighlightHi: "हेल्दी बताकर बेचे जाने वाले इस योगर्ट में आइसक्रीम जितनी चीनी (14g) और स्टार्च होता है।",
    servingSize: "100g",
  },
  {
    id: "true-elements-rolled-oats",
    name: "True Elements 100% Whole Rolled Oats (Gluten Free)",
    nameHindi: "ट्रू एलिमेंट्स 100% रोल्ड ओट्स",
    brand: "True Elements",
    category: "oats_carbs",
    categoryLabelEn: "Whole Rolled Oats",
    categoryLabelHi: "साबुत रोल्ड ओट्स",
    imageUrl: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&auto=format&fit=crop&q=80",
    healthScore: 96,
    fitScore: 95,
    isVegetarian: true,
    verdictType: "green",
    verdictEn: "Clean Fit Choice",
    verdictHi: "जिम के लिए बेस्ट (Clean)",
    proteinPer100g: 13.5,
    proteinPerServing: "5.4g / 40g serving",
    sugarPer100g: 1.0,
    addedSugar: "0g (Zero Added Sugar)",
    caloriesPer100g: 389,
    hasPalmOil: false,
    hasMaltodextrin: false,
    hasArtificialSweeteners: false,
    priceEst: "₹240 / 500g",
    cleanIngredients: ["100% Whole Rolled Oats"],
    watchouts: ["Requires 4-5 minutes cooking in milk/water"],
    keyHighlightEn: "Low GI complex carbs with 10.5g Beta-Glucan gut fiber to power long workouts.",
    keyHighlightHi: "धीमी गति से पचने वाले कॉम्प्लेक्स कार्ब्स, 10.5g बीटा-ग्लूकन फाइबर जो देर तक एनर्जी देते हैं।",
    servingSize: "40g (1/2 Cup)",
  },
  {
    id: "kelloggs-corn-flakes-commercial",
    name: "Commercial Corn Flakes (Refined & Malt Sugary)",
    nameHindi: "कॉर्न फ्लेक्स (रिफाइंड कॉर्न व चीनी)",
    brand: "Kellogg's / Commercial Cereal",
    category: "oats_carbs",
    categoryLabelEn: "Breakfast Cereal",
    categoryLabelHi: "नाश्ता अनाज",
    imageUrl: "https://images.unsplash.com/photo-1521483451569-e33803c0330c?w=600&auto=format&fit=crop&q=80",
    healthScore: 39,
    fitScore: 40,
    isVegetarian: true,
    verdictType: "red",
    verdictEn: "Avoid (Sugar/Fillers)",
    verdictHi: "बचें (शुगर/मिलावट)",
    proteinPer100g: 7.2,
    proteinPerServing: "2.1g / 30g",
    sugarPer100g: 9.0,
    addedSugar: "8.5g Refined Sugar & Barley Malt Extract",
    caloriesPer100g: 380,
    hasPalmOil: false,
    hasMaltodextrin: false,
    hasArtificialSweeteners: false,
    priceEst: "₹180 / 475g",
    cleanIngredients: ["Milled Corn (91%)"],
    watchouts: ["Extremely High Glycemic Index (GI > 80)", "Causes quick insulin spike and hunger crash within 90 minutes", "Ultra-processed flaked starch"],
    keyHighlightEn: "High Glycemic Index causes rapid fat storage and quick blood sugar crash.",
    keyHighlightHi: "अत्यधिक उच्च ग्लाइसेमिक इंडेक्स (GI > 80) जो ब्लड शुगर बढ़ाकर फैट जमा करता है।",
    servingSize: "30g (1 Bowl)",
  },
  {
    id: "creapure-creatine-monohydrate",
    name: "Creapure 100% Pure Creatine Monohydrate (Micronized)",
    nameHindi: "क्रियाप्योर शुद्ध क्रिएटिन मोनोहाइड्रेट",
    brand: "Creapure / Verified Clean Lab",
    category: "creatine",
    categoryLabelEn: "Creatine",
    categoryLabelHi: "क्रिएटिन",
    imageUrl: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600&auto=format&fit=crop&q=80",
    healthScore: 98,
    fitScore: 99,
    isVegetarian: true,
    verdictType: "green",
    verdictEn: "Clean Fit Choice",
    verdictHi: "जिम के लिए बेस्ट (Clean)",
    proteinPer100g: 0,
    proteinPerServing: "3g pure creatine / 3g scoop",
    sugarPer100g: 0,
    addedSugar: "0g",
    caloriesPer100g: 0,
    hasPalmOil: false,
    hasMaltodextrin: false,
    hasArtificialSweeteners: false,
    priceEst: "₹799 / 250g (83 Servings)",
    cleanIngredients: ["100% Creapure Micronized Creatine Monohydrate"],
    watchouts: ["Maintain 3-4 litres daily water intake while taking creatine"],
    keyHighlightEn: "Gold standard 99.99% pure German Creapure for strength, ATP recycling & lean muscle.",
    keyHighlightHi: "दुनिया का सबसे शुद्ध जर्मन क्रिएटिन, स्ट्रेंथ और मांसपेशियों में पानी बनाए रखने के लिए बेस्ट।",
    servingSize: "3g (1 Small Scoop)",
  },
  {
    id: "yoga-bar-protein-bar-clean",
    name: "Yoga Bar 20g Whey Protein Bar (Almond Fudge)",
    nameHindi: "योगा बार 20g व्हे प्रोटीन बार",
    brand: "Yoga Bar",
    category: "bars_snacks",
    categoryLabelEn: "Protein Bar",
    categoryLabelHi: "प्रोटीन बार",
    imageUrl: "https://images.unsplash.com/photo-1622484211148-19760773d2a7?w=600&auto=format&fit=crop&q=80",
    healthScore: 86,
    fitScore: 89,
    isVegetarian: true,
    verdictType: "green",
    verdictEn: "Clean Fit Choice",
    verdictHi: "जिम के लिए बेस्ट (Clean)",
    proteinPer100g: 28.5,
    proteinPerServing: "20g / 70g bar",
    sugarPer100g: 4.5,
    addedSugar: "0g (Zero Added Sugar / Honey & Prebiotic Fiber)",
    caloriesPer100g: 395,
    hasPalmOil: false,
    hasMaltodextrin: false,
    hasArtificialSweeteners: false,
    priceEst: "₹110 / bar",
    cleanIngredients: ["Whey Protein Isolate", "Almonds", "Oats", "Chicory Root Prebiotic Fiber", "Cocoa Butter"],
    watchouts: ["Contains tree nuts"],
    keyHighlightEn: "20g complete protein with zero palm oil, zero maltitol and clean nuts.",
    keyHighlightHi: "20g शुद्ध व्हे प्रोटीन, बादाम, और बिना किसी पाम तेल या शुगर अल्कोहल के।",
    servingSize: "70g (1 Bar)",
  }
];

export const GYM_COMPARISON_PRESETS: ComparisonPreset[] = [
  {
    id: "whey-vs-gainer",
    titleEn: "Whey Isolate vs Mass Gainer",
    titleHi: "व्हे आइसोलेट बनाम मास गेनर",
    subtitleEn: "Why 80% of mass gainers are just overpriced maltodextrin sugar traps",
    subtitleHi: "मास गेनर में 70% चीनी होती है जबकि व्हे में 90% शुद्ध प्रोटीन",
    tag: "🔥 Most Popular",
    product1Id: "myprotein-impact-whey",
    product2Id: "generic-mass-gainer-extreme",
    winnerId: "myprotein-impact-whey",
    verdictTitleEn: "🏆 Winner: MyProtein Whey Isolate (Clean Lean Muscle)",
    verdictTitleHi: "🏆 विजेता: व्हे आइसोलेट (शुद्ध लीन मसल ग्रोथ)",
    whyWinnerEn: "MyProtein provides 90g protein per 100g with only 0.6g sugar. In contrast, commercial mass gainers pack 38g cheap sugar/maltodextrin with only 15g low-grade protein, causing abdominal fat gain.",
    whyWinnerHi: "मायप्रोटीन व्हे में 90% शुद्ध प्रोटीन और सिर्फ 0.6g चीनी है। मास गेनर में 70% सस्ती चीनी व पाम ऑयल होता है जो सिर्फ पेट की चर्बी बढ़ाता है।"
  },
  {
    id: "clean-pb-vs-sugary-pb",
    titleEn: "100% Natural PB vs Commercial PB",
    titleHi: "100% नेचुरल पीनट बटर बनाम कमर्शियल पीनट बटर",
    subtitleEn: "Check how commercial brands add hydrogenated palm oil and 19g sugar",
    subtitleHi: "देखें कैसे कमर्शियल ब्रांड्स पाम तेल और 19 ग्राम चीनी मिलाते हैं",
    tag: "🥜 Gym Essential",
    product1Id: "pintola-all-natural-pb",
    product2Id: "sundrop-commercial-pb",
    winnerId: "pintola-all-natural-pb",
    verdictTitleEn: "🏆 Winner: Pintola All-Natural (100% Peanuts)",
    verdictTitleHi: "🏆 विजेता: पिंटोला नेचुरल (100% शुद्ध मूंगफली)",
    whyWinnerEn: "Pintola uses ONLY 100% roasted peanuts (30g protein, 0g palm oil, 0g added sugar). Commercial PB adds hydrogenated palm oil (trans-fat danger) and 19.5g refined sugar.",
    whyWinnerHi: "पिंटोला में केवल 100% भुनी मूंगफली (30g प्रोटीन) है। कमर्शियल पीनट बटर में पाम ऑयल और 19.5 ग्राम सफेद चीनी मिली होती है।"
  },
  {
    id: "greek-yogurt-vs-sweetened-dahi",
    titleEn: "Greek Yogurt vs Sweetened Dahi",
    titleHi: "ग्रीक योगर्ट बनाम मीठा कमर्शियल दही",
    subtitleEn: "Double the natural protein vs ice-cream levels of sugar",
    subtitleHi: "दोगुना प्रोटीन बनाम आइसक्रीम जितनी चीनी",
    tag: "🥛 High Protein Snack",
    product1Id: "epigamia-greek-yogurt-natural",
    product2Id: "sweetened-flavored-yogurt",
    winnerId: "epigamia-greek-yogurt-natural",
    verdictTitleEn: "🏆 Winner: Natural Greek Yogurt (8.5g Protein, 0g Added Sugar)",
    verdictTitleHi: "🏆 विजेता: नेचुरल ग्रीक योगर्ट (8.5g प्रोटीन, 0g अतिरिक्त चीनी)",
    whyWinnerEn: "Epigamia Natural Greek Yogurt is triple strained with 8.5g protein per 100g and zero added sugar. Flavoured supermarket yogurts contain 14g added sugar per small cup with synthetic thickeners.",
    whyWinnerHi: "ग्रीक योगर्ट में बिना किसी मिलावट के 8.5g प्राकृतिक प्रोटीन है। मीठे फ्लेवर्ड दही में 14g चीनी होती है जो कैलोरी बिगाड़ देती है।"
  },
  {
    id: "rolled-oats-vs-corn-flakes",
    titleEn: "Rolled Oats vs Corn Flakes",
    titleHi: "रोल्ड ओट्स बनाम कॉर्न फ्लेक्स",
    subtitleEn: "Sustained workout energy (Low GI) vs fast insulin spike (High GI)",
    subtitleHi: "लंबे वर्कआउट के लिए टिकाऊ ऊर्जा बनाम तुरंत फैट बढ़ाने वाला इंसुलिन स्पाइक",
    tag: "⚡ Pre-Workout Fuel",
    product1Id: "true-elements-rolled-oats",
    product2Id: "kelloggs-corn-flakes-commercial",
    winnerId: "true-elements-rolled-oats",
    verdictTitleEn: "🏆 Winner: Whole Rolled Oats (Low GI Complex Carbs)",
    verdictTitleHi: "🏆 विजेता: साबुत रोल्ड ओट्स (धीमी गति से पचने वाले शुद्ध कार्ब्स)",
    whyWinnerEn: "Rolled Oats deliver 13.5g protein and slow-burning beta-glucan fiber, keeping insulin stable. Corn flakes spike blood sugar instantly (GI > 80) causing energy crashes mid-workout.",
    whyWinnerHi: "ओट्स में 13.5g प्रोटीन और फाइबर होता है जो घंटों तक ऊर्जा देता है। कॉर्न फ्लेक्स तुरंत शुगर बढ़ाकर फैट जमा करता है।"
  }
];

export const GYM_GUIDES_DATA: GymGuideItem[] = [
  {
    id: "peanut-butter-guide",
    titleEn: "Best Peanut Butter for Gym (Buyer's Guide)",
    titleHi: "जिम के लिए बेस्ट पीनट बटर कैसे चुनें?",
    category: "peanut_butter",
    icon: "🥜",
    badge: "100% Clean Choice",
    shortDescEn: "Learn how to spot hidden hydrogenated palm oil, sugar & stabilizers on peanut butter labels.",
    shortDescHi: "पीनट बटर खरीदते समय पाम तेल, हाइड्रोजनीकृत वसा और चीनी की चालाकी पहचानें।",
    keyTakeawayEn: "Check ingredients: It must have ONLY ONE ingredient: 'Roasted Peanuts'. If you see 'Hydrogenated Vegetable Oil' or 'Sugar', put it back.",
    keyTakeawayHi: "इंग्रीडिएंट्स लिस्ट में केवल 1 चीज़ होनी चाहिए: 'Roasted Peanuts'। यदि 'Hydrogenated Oil' या 'Sugar' दिखे तो मत खरीदें।",
    checklistEn: [
      "✅ Ingredient List should have ONLY 'Roasted Peanuts' (100% Peanuts)",
      "✅ Oil separation on top is natural and a proof of zero chemical stabilizers",
      "❌ Avoid 'Hydrogenated Vegetable Oil' (trans-fat risk for arteries)",
      "❌ Avoid Added Sugar (adds 60-80 empty calories per 2 tbsp)",
      "✅ Aim for minimum 28g to 30g protein per 100g"
    ],
    checklistHi: [
      "✅ सामग्री में सिर्फ 'Roasted Peanuts' लिखा होना चाहिए (100% शुद्ध मूंगफली)",
      "✅ ऊपर तेल का तैरना सामान्य है और यह शून्य केमिकल का सबूत है",
      "❌ 'Hydrogenated Vegetable Oil' लिखे जार से बचें (यह धमनियों में ब्लॉकेज बढ़ाता है)",
      "❌ 'Added Sugar' या 'Brown Sugar' लिखे विकल्पों से बचें",
      "✅ प्रति 100g में कम से कम 28g से 30g प्रोटीन होना चाहिए"
    ],
    recommendedItems: [
      { name: "All-Natural Peanut Butter", brand: "Pintola", protein: "30g / 100g", score: 95, badge: "100% Peanuts", why: "Zero Palm Oil, Zero Sugar, Slow Roasted" },
      { name: "Classic Pure Peanut Butter", brand: "The Whole Truth", protein: "29g / 100g", score: 97, badge: "Single Ingredient", why: "No emulsifiers, 100% label transparency" },
      { name: "High Protein Dark Chocolate (Clean)", brand: "Alpino", protein: "30g / 100g", score: 90, badge: "No Hydrogenated Fat", why: "Uses real cocoa powder with whey isolate" }
    ],
    avoidItems: [
      { name: "Commercial Peanut Butter Jars", brand: "Sundrop / Skippy Commercial", issue: "Contains Hydrogenated Palm Oil & 19% Sugar", badge: "Hazard" },
      { name: "Cheap Sweetened PB Spreads", brand: "Supermarket White Labels", issue: "Excess corn syrup & artificial emulsifiers", badge: "Low Score" }
    ]
  },
  {
    id: "whey-vs-gainer-guide",
    titleEn: "Whey Protein vs Mass Gainer: The Truth",
    titleHi: "व्हे प्रोटीन बनाम मास गेनर: असली सच्चाई",
    category: "whey_vs_gainer",
    icon: "🥛",
    badge: "Supplement Truth",
    shortDescEn: "Why buying mass gainers is a waste of money & how to make a clean homemade gainer at home.",
    shortDescHi: "मास गेनर क्यों पैसों की बर्बादी है और घर पर ही शुद्ध क्लीन गेनर शेक कैसे बनाएं।",
    keyTakeawayEn: "Mass gainers charge you ₹1500+ for 70% cheap maltodextrin (potato/corn sugar). Buy pure Whey and blend with oats, bananas and peanut butter at home.",
    keyTakeawayHi: "मास गेनर में 70% सिर्फ सस्ती माल्टोडेक्सट्रिन चीनी होती है। हमेशा शुद्ध व्हे खरीदें और घर पर ओट्स, केला, पीनट बटर मिलाकर पिएं।",
    checklistEn: [
      "💡 Whey Isolate / Concentrate = 75-90% pure bioavailable protein",
      "⚠️ Commercial Mass Gainer = 15-20% protein + 70% cheap sugar powder",
      "🥣 Homemade Clean Gainer Recipe: 1 scoop Whey + 50g Oats + 2 Bananas + 2 tbsp Natural PB + 300ml Milk (~750 clean calories, 50g protein)",
      "❌ Mass gainers cause insulin resistance and stubborn lower belly fat",
      "✅ Whey allows you to control your exact carb and calorie intake"
    ],
    checklistHi: [
      "💡 शुद्ध व्हे प्रोटीन = 75-90% शुद्ध बायोअवेलेबल प्रोटीन (मसल रिकवरी के लिए बेस्ट)",
      "⚠️ मास गेनर = 15% प्रोटीन + 70% सस्ती माल्टोडेक्सट्रिन चीनी",
      "🥣 घर का बना क्लीन शेक: 1 स्कूप व्हे + 50g ओट्स + 2 केला + 2 चम्मच पीनट बटर + 300ml दूध (750 शुद्ध कैलोरी, 50g प्रोटीन)",
      "❌ मास गेनर से लिवर पर लोड और पेट के निचले हिस्से में चर्बी बढ़ती है",
      "✅ व्हे से आप अपनी कैलोरी और कार्ब्स को सटीक नियंत्रित कर सकते हैं"
    ],
    recommendedItems: [
      { name: "Impact Whey Isolate", brand: "MyProtein", protein: "23g / 25g scoop (90%)", score: 96, badge: "Ultra Pure", why: "Labdoor verified purity, almost zero lactose" },
      { name: "Biozyme Performance Whey", brand: "MuscleBlaze", protein: "25g / 36g scoop (70%)", score: 90, badge: "High Absorption", why: "Enzyme formulation tested on Indian diet" },
      { name: "Raw Unflavored Whey 80%", brand: "As-It-Is Nutrition", protein: "24g / 30g scoop", score: 94, badge: "Zero Additives", why: "100% pure raw whey, zero artificial sweeteners" }
    ],
    avoidItems: [
      { name: "Mega Mass Gainer / Weight Gainer 5000", brand: "Generic Sugar Gainers", issue: "38g Sugar & Palm Oil fillers per serving", badge: "Insulin Spike" },
      { name: "Spiked Amino Protein Powders", brand: "Uncertified Cheap Brands", issue: "Cheap glycine/taurine filler used to fake protein content", badge: "Adulteration" }
    ]
  },
  {
    id: "high-protein-foods-guide",
    titleEn: "Top Indian High-Protein Foods (Veg & Non-Veg)",
    titleHi: "भारत के टॉप हाई प्रोटीन फूड्स (शाकाहारी व मांसाहारी)",
    category: "high_protein_foods",
    icon: "🍳",
    badge: "Diet Chart",
    shortDescEn: "Complete ranking of Indian protein sources by protein density, bioavailability & cost per gram.",
    shortDescHi: "भारतीय खाद्य पदार्थों में प्रोटीन की मात्रा, पाचन गुणवत्ता (PDCAAS) और प्रति ग्राम खर्च का पूरा विश्लेषण।",
    keyTakeawayEn: "For Vegetarians: Soya chunks (52g/100g), Paneer (18g/100g), Greek Yogurt (8.5g), Sattu (20g) & Whey. For Non-Veg: Eggs (6g/egg) and Chicken Breast (31g/100g).",
    keyTakeawayHi: "शाकाहारी: सोया चंक्स (52g), पनीर (18g), ग्रीक योगर्ट (8.5g), सत्तू (20g) व व्हे। मांसाहारी: अंडे (6g/अंडा) और चिकन ब्रेस्ट (31g)।",
    checklistEn: [
      "🥇 Soya Chunks: 52g Protein / 100g (Highest protein density for vegetarians, ₹50/kg)",
      "🥈 Whole Eggs: 6g Protein / egg (PDCAAS 1.0 - Perfect complete amino acid profile)",
      "🥉 Low Fat Paneer: 18-20g Protein / 100g (Slow-digesting Casein protein for night recovery)",
      "🥛 Amul High Protein Lassi/Buttermilk: 15g Protein for ₹25 (Ultimate portable drink)",
      "🌾 Roasted Chana / Sattu: 20-22g Protein / 100g (High fiber, economical Indian superfood)"
    ],
    checklistHi: [
      "🥇 सोया चंक्स: 52g प्रोटीन / 100g (शाकाहारियों के लिए सबसे सस्ता व घना प्रोटीन)",
      "🥈 उबले अंडे: 6g प्रोटीन / अंडा (PDCAAS 1.0 - शरीर द्वारा 100% अवशोषित)",
      "🥉 लो-फैट पनीर: 18-20g प्रोटीन / 100g (रात के समय रिकवरी के लिए धीमी गति से पचने वाला कैसीन)",
      "🥛 अमूल हाई प्रोटीन लस्सी: 15g प्रोटीन मात्र ₹25 में (पॉकेट-फ्रेंडली)",
      "🌾 भुना चना / सत्तू: 20-22g प्रोटीन / 100g (फाइबर और एनर्जी से भरपूर देसी सुपरफूड)"
    ],
    recommendedItems: [
      { name: "Nutrela Soya Chunks (100g)", brand: "Ruchi Soya / Nutrela", protein: "52g Protein", score: 95, badge: "Budget King", why: "Costs only ₹15 for 52g pure plant protein" },
      { name: "Farm Fresh Eggs (6 Eggs)", brand: "Local / Farm", protein: "36g Complete Protein", score: 98, badge: "Gold Standard", why: "Highest biological value and complete BCAAs" },
      { name: "Fresh Cow Milk Paneer (100g)", brand: "Amul / Local Dairy", protein: "18g Protein", score: 92, badge: "Night Recovery", why: "Rich in calcium and muscle-repairing casein" }
    ],
    avoidItems: [
      { name: "Deep Fried Soya Chaap (Street Food)", brand: "Street Stalls", issue: "Mixed with 70% Maida and fried in reused palm oil", badge: "Maida Trap" },
      { name: "Processed 'Protein' Cookies & Biscuits", brand: "Commercial Biscuits", issue: "Only 3-4g protein with 25g maida, sugar and palm fat", badge: "Sugar Trap" }
    ]
  },
  {
    id: "pre-post-workout-guide",
    titleEn: "Pre & Post Workout Nutrition (Clean Indian Guide)",
    titleHi: "प्री और पोस्ट वर्कआउट डाइट (क्लीन इंडियन गाइड)",
    category: "pre_post_workout",
    icon: "⚡",
    badge: "Timing & Fuel",
    shortDescEn: "What to eat 45 mins before the gym for explosive energy, and within 45 mins after for rapid recovery.",
    shortDescHi: "जिम जाने से 45 मिनट पहले क्या खाएं और वर्कआउट के बाद तुरंत रिकवरी के लिए क्या लें।",
    keyTakeawayEn: "Pre-Workout = Fast/Complex Carbs + Clean Caffeine (No jittery pre-workout chemicals). Post-Workout = 20-30g Fast Protein + Simple Carbs to replenish glycogen.",
    keyTakeawayHi: "प्री-वर्कआउट = केला / ब्लैक कॉफी / खजूर (केमिकल वाले प्री-वर्कआउट से बचें)। पोस्ट-वर्कआउट = 20-30g शुद्ध प्रोटीन + थोड़ा कार्ब्स।",
    checklistEn: [
      "⚡ 45 Mins Before Gym (Pre-Workout): 1-2 Bananas + 1 Cup Black Coffee (No Sugar) OR 3-4 Medjool Dates. Provides steady glucose without stomach heaviness.",
      "❌ Avoid Chemical Pre-Workout Powders with high synthetic caffeine (>300mg) and untested stimulants that cause palpitations.",
      "💪 30-45 Mins After Gym (Post-Workout): 1 Scoop Whey in water + 1 Banana OR 4 Boiled Egg Whites + 2 Slices Whole Wheat / Roti.",
      "💧 Hydration: Drink 500ml water with a pinch of Himalayan Pink Salt for optimal muscle contraction and zero cramps."
    ],
    checklistHi: [
      "⚡ जिम से 45 मिनट पहले (प्री-वर्कआउट): 1-2 केले + 1 कप बिना चीनी की ब्लैक कॉफी या 3-4 खजूर। यह बिना पेट भारी किए जबरदस्त ऊर्जा देता है।",
      "❌ अत्यधिक कैफीन (>300mg) और रसायनों वाले प्री-वर्कआउट पाउडर से बचें जो दिल की धड़कन बढ़ाते हैं।",
      "💪 जिम के 30-45 मिनट बाद (पोस्ट-वर्कआउट): 1 स्कूप व्हे पानी में + 1 केला, या 4 उबले अंडे + 1-2 रोटी।",
      "💧 पानी व इलेक्ट्रोलाइट्स: वर्कआउट के दौरान 500ml पानी में चुटकी भर सेंधा नमक मांसपेशियों के क्रैम्प से बचाता है।"
    ],
    recommendedItems: [
      { name: "Robusta Banana + Black Coffee", brand: "Natural Kitchen", protein: "Natural Carbs + Caffeine", score: 99, badge: "Best Natural Pre-Workout", why: "Instant potassium, fructose and zero chemical crash" },
      { name: "Medjool Dates (खजूर)", brand: "Dry Fruits", protein: "High Natural Glucose", score: 96, badge: "Clean Glycogen", why: "Quick muscle fuel without spiking digestive distress" },
      { name: "Whey Isolate + Tender Coconut Water", brand: "Natural Post-Workout", protein: "25g Protein + Natural Electrolytes", score: 98, badge: "Recovery King", why: "Replenishes potassium and repairs torn muscle fibers instantly" }
    ],
    avoidItems: [
      { name: "Extreme Caffeine Pre-Workout Mixes", brand: "Generic Stimulants", issue: "350mg+ anhydrous caffeine causing anxiety & tachycardia", badge: "Stimulant Crash" },
      { name: "Heavy Oily Parathas Before Workout", brand: "Street / Heavy Foods", issue: "Blood diverts to stomach for digestion causing sluggishness", badge: "Sluggishness" }
    ]
  }
];

// Helper to compute a Gym FitScore for any generic FoodProduct
export function calculateGymFitScore(product: FoodProduct): {
  fitScore: number;
  verdict: "Clean Fit Choice" | "Moderate / Usable" | "Avoid (Sugar/Fillers)";
  verdictHi: "जिम के लिए बेस्ट (Clean)" | "सावधानी से इस्तेमाल करें" | "बचें (शुगर/मिलावट)";
  badgeColor: string;
  reasonsEn: string[];
  reasonsHi: string[];
} {
  const p100 = parseFloat(product.nutritionPer100g.protein.replace(/[^0-9.]/g, "")) || 0;
  const s100 = parseFloat(product.nutritionPer100g.sugar.replace(/[^0-9.]/g, "")) || 0;
  const hasPalm = product.warnings.some((w) => w.type === "palm_oil");
  const hasMaida = product.warnings.some((w) => w.type === "maida");

  let score = 50;

  // Protein bonus
  if (p100 >= 70) score += 35;
  else if (p100 >= 25) score += 25;
  else if (p100 >= 15) score += 15;
  else if (p100 >= 8) score += 8;

  // Sugar penalty
  if (s100 > 25) score -= 30;
  else if (s100 > 12) score -= 20;
  else if (s100 <= 3) score += 10;

  // Palm oil & Maida penalties
  if (hasPalm) score -= 25;
  if (hasMaida) score -= 15;

  score = Math.max(10, Math.min(99, score));

  const isClean = score >= 70;
  const isModerate = score >= 45 && score < 70;

  const reasonsEn: string[] = [];
  const reasonsHi: string[] = [];

  if (p100 >= 20) {
    reasonsEn.push(`High Protein Density (${p100}g / 100g)`);
    reasonsHi.push(`उच्च प्रोटीन मात्रा (${p100}g / 100g)`);
  }
  if (s100 > 15) {
    reasonsEn.push(`Excess Sugar (${s100}g) will hinder fat-loss`);
    reasonsHi.push(`अत्यधिक चीनी (${s100}g) फैट लॉस में रुकावट बनेगी`);
  }
  if (hasPalm) {
    reasonsEn.push(`Contains Refined Palm Oil (Poor arterial health)`);
    reasonsHi.push(`पाम ऑयल मिला हुआ है (धमनियों के लिए हानिकारक)`);
  }
  if (!hasPalm && !hasMaida && s100 < 5) {
    reasonsEn.push(`Clean formulation without artificial fillers`);
    reasonsHi.push(`बिना किसी मिलावट या अतिरिक्त चीनी का स्वच्छ फॉर्मूला`);
  }

  return {
    fitScore: score,
    verdict: isClean ? "Clean Fit Choice" : isModerate ? "Moderate / Usable" : "Avoid (Sugar/Fillers)",
    verdictHi: isClean ? "जिम के लिए बेस्ट (Clean)" : isModerate ? "सावधानी से इस्तेमाल करें" : "बचें (शुगर/मिलावट)",
    badgeColor: isClean ? "text-[#10B981] bg-emerald-500/10 border-emerald-500/30" : isModerate ? "text-amber-500 bg-amber-500/10 border-amber-500/30" : "text-rose-500 bg-rose-500/10 border-rose-500/30",
    reasonsEn,
    reasonsHi
  };
}
