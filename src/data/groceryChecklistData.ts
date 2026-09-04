export interface GroceryChecklistItem {
  id: string;
  category: "oils" | "staples" | "snacks" | "breakfast" | "spices" | "kids_dairy" | "sauces";
  categoryNameEn: string;
  categoryNameHi: string;
  titleEn: string;
  titleHi: string;
  avoidItemEn: string;
  avoidItemHi: string;
  avoidReasonEn: string;
  avoidReasonHi: string;
  cleanSwapEn: string;
  cleanSwapHi: string;
  smartTipEn: string;
  smartTipHi: string;
  isCommonPantry: boolean;
}

export const GROCERY_CHECKLIST_DATA: GroceryChecklistItem[] = [
  // 1. Cooking Oils & Ghee
  {
    id: "oil_mustard_ghee",
    category: "oils",
    categoryNameEn: "Cooking Oil & Ghee",
    categoryNameHi: "खाना पकाने का तेल व घी",
    titleEn: "Cooking Oil Swap",
    titleHi: "खाद्य तेल का चयन",
    avoidItemEn: "Refined Palm Olein / Blended Vegetable Oil",
    avoidItemHi: "रिफाइंड पाम ऑयल / ब्लेंडेड वनस्पति तेल",
    avoidReasonEn: "High in palmitic saturated fats; solvent extracted at high temperatures with chemical bleaching.",
    avoidReasonHi: "अधिक पामिटिक सैचुरेटेड फैट और केमिकल सॉल्वेंट से रिफाइनिंग प्रक्रिया।",
    cleanSwapEn: "Cold-Pressed Kacchi Ghani Mustard, Groundnut, or Sesame Oil & Pure Desi Ghee",
    cleanSwapHi: "कोल्ड-प्रेस्ड कच्ची घानी सरसों, मूंगफली या तिल का तेल और शुद्ध देसी घी",
    smartTipEn: "Check label for 'Cold-Pressed' or 'Kacchi Ghani' with AGMARK certification.",
    smartTipHi: "लेबल पर 'कच्ची घानी' या 'कोल्ड प्रेस्ड' और एगमार्क (AGMARK) मार्क अवश्य देखें।",
    isCommonPantry: true,
  },
  {
    id: "ghee_butter",
    category: "oils",
    categoryNameEn: "Cooking Oil & Ghee",
    categoryNameHi: "खाना पकाने का तेल व घी",
    titleEn: "Butter & Spread",
    titleHi: "मक्खन व ब्रेड स्प्रेड",
    avoidItemEn: "Table Margarine / Hydrogenated Fat Spreads",
    avoidItemHi: "मार्जरीन / हाइड्रोजनेटेड वनस्पति घी स्प्रेड",
    avoidReasonEn: "Contains industrial trans-fats and chemical emulsifiers to mimic butter cheaply.",
    avoidReasonHi: "सस्ता बनाने के लिए इंडस्ट्रियल ट्रांस-फैट और कृत्रिम पायसीकारी (Emulsifiers) का उपयोग।",
    cleanSwapEn: "Pure White Homemade Butter (Makkhan) or A2 Cow Ghee",
    cleanSwapHi: "घर का शुद्ध सफेद मक्खन या ए2 गाय का शुद्ध घी",
    smartTipEn: "FSSAI has capped industrial trans-fat to under 2% for safety.",
    smartTipHi: "FSSAI ने सुरक्षित स्वास्थ्य के लिए ट्रांस-फैट की सीमा 2% से कम तय की है।",
    isCommonPantry: true,
  },

  // 2. Biscuits & Chai Snacks
  {
    id: "biscuit_tea",
    category: "snacks",
    categoryNameEn: "Biscuits & Snacks",
    categoryNameHi: "बिस्कुट व चाय स्नैक्स",
    titleEn: "Tea-Time Biscuits",
    titleHi: "चाय के साथ बिस्कुट",
    avoidItemEn: "Commercial Glucose/Cream Biscuits with Palm Oil + Maida",
    avoidItemHi: "पाम ऑयल और 75% मैदा वाले क्रीम या ग्लूकोज बिस्कुट",
    avoidReasonEn: "Typically 60-70% refined maida, cheap palm olein, and up to 35% refined sugar.",
    avoidReasonHi: "60-70% मैदा, पाम ऑयल और 35% तक रिफाइंड चीनी का संयोजन।",
    cleanSwapEn: "100% Whole Wheat (Atta), Ragi/Jowar Biscuits (Zero Palm Oil) or Roasted Chana",
    cleanSwapHi: "100% गेहूं का आटा या रागी/ज्वार बिस्कुट (बिना पाम तेल) या भुना चना",
    smartTipEn: "Always check the 1st ingredient: It must be 'Whole Wheat Flour', not 'Refined Wheat Flour (Maida)'.",
    smartTipHi: "पहला तत्व चेक करें: 'Whole Wheat Flour (साबुत आटा)' होना चाहिए, 'मैदा' नहीं।",
    isCommonPantry: true,
  },
  {
    id: "namkeen_chips",
    category: "snacks",
    categoryNameEn: "Biscuits & Snacks",
    categoryNameHi: "बिस्कुट व चाय स्नैक्स",
    titleEn: "Namkeen & Chips",
    titleHi: "नमकीन व भुजिया",
    avoidItemEn: "Deep-Fried Commercial Aloo Bhujia & Packaged Potato Chips",
    avoidItemHi: "पाम ऑयल में डीप-फ्राई की गई आलू भुजिया व पैकेट चिप्स",
    avoidReasonEn: "Fried in reusable palm oil; delivers 450+ calories and high sodium per 100g.",
    avoidReasonHi: "बार-बार गर्म किए पाम ऑयल में तली हुई और अत्यधिक नमक (सोडियम)।",
    cleanSwapEn: "Roasted Makhana (Fox Nuts), Roasted Peanuts or Air-Popped Jowar/Corn",
    cleanSwapHi: "रोस्टेड मखाना, भुनी मूंगफली या हल्के भुने ज्वार पफ्स",
    smartTipEn: "Roast plain makhana at home in half-teaspoon desi ghee with turmeric and rock salt.",
    smartTipHi: "घर पर आधे चम्मच देसी घी, हल्दी और सेंधा नमक में मखाना हल्का भून लें।",
    isCommonPantry: true,
  },

  // 3. Breakfast & Breads
  {
    id: "bread_selection",
    category: "breakfast",
    categoryNameEn: "Breakfast & Breads",
    categoryNameHi: "नाश्ता व ब्रेड",
    titleEn: "Daily Bread",
    titleHi: "दैनिक ब्रेड का चुनाव",
    avoidItemEn: "Commercial 'Brown' or White Bread with Caramel Color (INS 150d)",
    avoidItemHi: "सफेद ब्रेड या रंगीन कारमेल (INS 150d) वाली तथाकथित 'ब्राउन ब्रेड'",
    avoidReasonEn: "Most commercial brown bread is 70% maida dyed brown with caramel coloring.",
    avoidReasonHi: "अधिकांश ब्राउन ब्रेड में 70% मैदा होता है और भूरे रंग के लिए केमिकल रंग मिलाया जाता है।",
    cleanSwapEn: "100% Whole Wheat Bread (Zero Maida, No INS 150d) or Fresh Roti/Paratha",
    cleanSwapHi: "100% होल व्हीट ब्रेड (बिना मैदा, बिना INS 150d) या ताजा घर की रोटी",
    smartTipEn: "Read ingredient table: If 'Refined Wheat Flour' is listed, it's not real whole wheat.",
    smartTipHi: "इंग्रेडिएंट्स पढ़ें: अगर 'Refined Wheat Flour' लिखा है तो वह असली साबुत गेहूं नहीं है।",
    isCommonPantry: true,
  },
  {
    id: "breakfast_cereals",
    category: "breakfast",
    categoryNameEn: "Breakfast & Breads",
    categoryNameHi: "नाश्ता व ब्रेड",
    titleEn: "Breakfast Cereals",
    titleHi: "नाश्ता सेरेल्स व फ्लेक्स",
    avoidItemEn: "Frosted Flakes, Chocos, & Instant Sugar-Loaded Masala Oats",
    avoidItemHi: "मीठे फ्रॉस्टेड फ्लेक्स, चोकोस व अतिरिक्त नमक वाले इंस्टेंट ओट्स",
    avoidReasonEn: "High glycemic index and up to 30g added sugar per 100g leading to rapid insulin spike.",
    avoidReasonHi: "उच्च ग्लाइसेमिक इंडेक्स और 30% तक अतिरिक्त चीनी, जिससे ब्लड शुगर तेजी से बढ़ता है।",
    cleanSwapEn: "Plain Rolled Oats, Sattu Drink, Besan Chilla or Vegetable Poha",
    cleanSwapHi: "सादे रोल्ड ओट्स, सत्तू नमकीन शरबत, बेसन का चीला या पारंपरिक पोहा",
    smartTipEn: "Buy plain unflavored rolled oats and add fresh fruits or seeds yourself.",
    smartTipHi: "हमेशा सादे अनफ्लेवर्ड ओट्स लें और मिठास के लिए ताजे फल या खजूर मिलाएं।",
    isCommonPantry: true,
  },

  // 4. Kids Drinks & Dairy
  {
    id: "kids_milk_powder",
    category: "kids_dairy",
    categoryNameEn: "Kids Health & Dairy",
    categoryNameHi: "बच्चों के ड्रिंक्स व डेयरी",
    titleEn: "Kids Milk Health Drink",
    titleHi: "बच्चों का हेल्थ ड्रिंक पाउडर",
    avoidItemEn: "Malted Milk Powders (40-50% Added Refined Sugar + Maltodextrin)",
    avoidItemHi: "माल्टेड पाउडर (जिनमें 40-50% रिफाइंड चीनी और माल्टोडेक्सट्रिन होता है)",
    avoidReasonEn: "Marketed as health supplements, but up to half the jar is pure sugar and malt.",
    avoidReasonHi: "हेल्थ ड्रिंक के नाम पर बेचे जाते हैं, पर जार का आधा हिस्सा केवल चीनी और माल्ट होता है।",
    cleanSwapEn: "Plain Cow/Buffalo Milk + Homemade Almond, Cardamom & Saffron Nut Powder",
    cleanSwapHi: "सादा शुद्ध दूध + घर का बना बादाम, इलायची व केसर का ड्राई फ्रूट पाउडर",
    smartTipEn: "A 2-minute homemade mix of roasted almonds, walnuts, and cardamom gives genuine nutrition.",
    smartTipHi: "भुने बादाम, अखरोट और सौंफ-इलायची का घर पर बना पाउडर असली पोषण देता है।",
    isCommonPantry: true,
  },

  // 5. Spices & Staples
  {
    id: "spices_haldi_mirch",
    category: "spices",
    categoryNameEn: "Spices & Salt",
    categoryNameHi: "मसाले व नमक",
    titleEn: "Turmeric & Chilli Powder",
    titleHi: "हल्दी व लाल मिर्च पाउडर",
    avoidItemEn: "Loose Unbranded Bulk Spices (High risk of starch, chalk & lead chromate)",
    avoidItemHi: "खुले व बिना सील वाले लोकल पिसे मसाले (स्टार्च, रंग व चॉक का भारी जोखिम)",
    avoidReasonEn: "FSSAI repeatedly flags loose ground spices for adulteration with lead and non-edible dyes.",
    avoidReasonHi: "FSSAI द्वारा खुले पिसे मसालों में मेटानिल यलो और लेड क्रोमेट की मिलावट पाई जाती है।",
    cleanSwapEn: "AGMARK Certified Whole Ground Spices or Buy Whole Spices & Grind at Home",
    cleanSwapHi: "एगमार्क (AGMARK) प्रमाणित सीलबंद मसाले या साबुत मसाले लाकर घर पर पिसवाएं",
    smartTipEn: "Use the 2-minute water test: Pure turmeric powder settles down leaving clear light yellow water.",
    smartTipHi: "कांच के पानी में हल्दी डालें: शुद्ध हल्दी तली में बैठ जाती है और पानी साफ हल्का पीला रहता है।",
    isCommonPantry: true,
  },
  {
    id: "salt_choice",
    category: "spices",
    categoryNameEn: "Spices & Salt",
    categoryNameHi: "मसाले व नमक",
    titleEn: "Table Salt",
    titleHi: "दैनिक नमक",
    avoidItemEn: "Excessive Chemical Free-Flow Bleached Salt (>5g/day sodium overload)",
    avoidItemHi: "अत्यधिक फ्री-फ्लो केमिकल ब्लीच किया हुआ सफेद नमक (अधिक सेवन से हाई बीपी)",
    avoidReasonEn: "Anti-caking chemicals (INS 554/536) added for free flow; excessive sodium impacts BP.",
    avoidReasonHi: "फ्री-फ्लो बनाने के लिए एंटी-केकिंग एजेंट और अत्यधिक सोडियम का सेवन।",
    cleanSwapEn: "Unrefined Rock Salt (Sendha Namak) paired with balanced Iodized Salt",
    cleanSwapHi: "सेंधा नमक (Rock Salt) और संतुलित आयोडीन युक्त नमक का मिश्रण",
    smartTipEn: "WHO advises limiting daily sodium intake to less than 2000mg (about 1 teaspoon salt).",
    smartTipHi: "विश्व स्वास्थ्य संगठन (WHO) पूरे दिन में 1 चम्मच (5 ग्राम) से कम नमक की सलाह देता है।",
    isCommonPantry: true,
  },

  // 6. Sauces & Condiments
  {
    id: "tomato_sauce",
    category: "sauces",
    categoryNameEn: "Sauces & Condiments",
    categoryNameHi: "सॉस व चटनी",
    titleEn: "Tomato Ketchup",
    titleHi: "टोमैटो केचप",
    avoidItemEn: "Commercial Bottled Ketchup (25-30% Refined Sugar & Sodium Benzoate)",
    avoidItemHi: "बोतल बंद टोमैटो केचप (25-30% रिफाइंड चीनी और केमिकल प्रिजर्वेटिव्स)",
    avoidReasonEn: "One tablespoon ketchup has more sugar than fresh tomato; loaded with INS 211 preservative.",
    avoidReasonHi: "1 चम्मच केचप में टमाटर से ज्यादा चीनी होती है और प्रिजर्वेटिव INS 211 का उपयोग होता है।",
    cleanSwapEn: "Fresh Homemade Tomato-Garlic Chutney or Low-Sugar Herb Salsa",
    cleanSwapHi: "ताजे टमाटर, धनिया व लहसुन की घर पर बनी शुद्ध चटनी",
    smartTipEn: "Fresh tomato chutney takes 3 minutes and delivers real lycopene antioxidant with zero chemicals.",
    smartTipHi: "घर की ताजी टमाटर चटनी में असली लाइकोपीन एंटीऑक्सीडेंट होता है, बिना किसी केमिकल के।",
    isCommonPantry: true,
  }
];
