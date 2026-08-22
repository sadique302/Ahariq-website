import { FoodProduct } from "../types";

export const INDIAN_PRODUCTS_DB: FoodProduct[] = [
  {
    id: "maggi-2min-noodles",
    barcode: "8901058852370",
    name: "Maggi 2-Minute Masala Instant Noodles",
    nameHindi: "मैगी 2-मिनट मसाला नूडल्स",
    brand: "Nestlé India",
    category: "Noodles & Instant Food",
    categoryHindi: "नूडल्स और इंस्टेंट फूड",
    imageUrl: "https://images.unsplash.com/photo-1612927601601-6638404737ce?w=600&auto=format&fit=crop&q=80",
    healthScore: 24,
    verdict: "Avoid Karein",
    verdictHindi: "बचने की सलाह",
    verdictType: "red",
    summaryEn: "Dominated by 82% refined wheat flour (maida), ultra-processed palm oil, and high sodium (over 52% of daily limit per pack). Contains INS 635 flavour enhancers.",
    summaryHi: "82% मैदा, रिफाइंड पाम ऑयल और अत्यधिक सोडियम (दैनिक सीमा का 52%) से भरपूर। इसमें INS 635 फ्लेवर एन्हांसर भी शामिल है।",
    isVegetarian: true,
    fssaiNumber: "10012011000168",
    packagingSize: "70g / 140g",
    warnings: [
      {
        type: "palm_oil",
        titleEn: "Refined Palm Oil Base",
        titleHi: "रिफाइंड पाम तेल",
        severity: "high",
        tagValue: "18% Palm Oil",
        descriptionEn: "High saturated fats, refined at high temperatures which creates polar compounds harmful to arteries.",
        descriptionHi: "उच्च संतृप्त वसा (Saturated Fat), जो कोलेस्ट्रॉल और हृदय संबंधी जोखिम बढ़ाता है।"
      },
      {
        type: "maida",
        titleEn: "82% Refined Wheat Flour (Maida)",
        titleHi: "82% मैदा (रिफाइंड आटा)",
        severity: "high",
        tagValue: "82% Maida",
        descriptionEn: "Stripped of bran and germ; causes steep insulin spikes and digestive sluggishness.",
        descriptionHi: "बिना चोकर का रिफाइंड आटा जो ब्लड शुगर को अचानक बढ़ा देता है।"
      },
      {
        type: "sodium",
        titleEn: "High Sodium Load",
        titleHi: "अत्यधिक सोडियम (नमक)",
        severity: "high",
        tagValue: "1040mg Sodium / pack",
        descriptionEn: "A single small serving contains nearly 50% of the maximum daily sodium recommendation.",
        descriptionHi: "एक पैकेट में ही पूरे दिन की जरूरत का आधा नमक होता है।"
      },
      {
        type: "preservatives",
        titleEn: "INS 635 Flavour Enhancers",
        titleHi: "INS 635 फ्लेवर एन्हांसर",
        severity: "medium",
        tagValue: "INS 635 / INS 508",
        descriptionEn: "Disodium 5'-ribonucleotides used to artificially amplify savory taste; may cause sensitivity.",
        descriptionHi: "कृत्रिम रूप से चटपटा स्वाद पैदा करने वाला रसायन।"
      }
    ],
    nutritionPer100g: {
      calories: "427 kcal",
      protein: "8.0g",
      carbohydrates: "63.5g",
      sugar: "2.2g",
      addedSugar: "1.0g",
      totalFat: "15.7g",
      saturatedFat: "6.8g",
      transFat: "0.12g",
      sodium: "1250mg",
      fiber: "2.1g"
    },
    ingredientsList: [
      "Wheat Flour (Maida)",
      "Palm Oil",
      "Iodised Salt",
      "Wheat Gluten",
      "Thickeners (508 & 412)",
      "Acidity Regulators (501(i) & 500(i))",
      "Humectant (451(i))",
      "Tastemaker: Hydrolysed Peanut Protein",
      "Mixed Spices (Dehydrated Onion, Coriander, Turmeric, Chilli)",
      "Noodle Flour (Maida)",
      "Sugar",
      "Edible Starch",
      "Palm Oil",
      "Thickener (508)",
      "Caramel Salt",
      "Flavour Enhancer (635)"
    ],
    ingredientsExplanation: [
      { name: "Maida (Refined Flour)", nameHi: "मैदा", purpose: "Cheap bulk starch with zero fiber", safety: "hazard" },
      { name: "Palm Oil", nameHi: "पाम तेल", purpose: "Frying noodle cake to extend shelf life", safety: "hazard" },
      { name: "INS 635", nameHi: "फ्लेवर बूस्टर", purpose: "Disodium ribonucleotide (MSG synergist)", safety: "caution" },
      { name: "INS 451(i)", nameHi: "पेंटासोडियम ट्राइफॉस्फेट", purpose: "Humectant & texture retention", safety: "caution" },
      { name: "Iodised Salt", nameHi: "नमक", purpose: "Seasoning and moisture preservation", safety: "safe" }
    ],
    adulterationCheck: {
      riskLevel: "Low",
      detailsEn: "Packaged according to standard FSSAI norms, but ultra-processed composition is nutritionally poor.",
      detailsHi: "एफएसएसएआई मानकों पर आधारित, लेकिन अत्यधिक प्रोसेस्ड होने के कारण पोषण में कमजोर।"
    },
    cleanerAlternatives: [
      {
        id: "slurrp-farm-millet-noodles",
        name: "Slurrp Farm Foxtail Millet Noodles",
        brand: "Slurrp Farm",
        score: 93,
        reasonEn: "0% Maida, 100% Sun-dried (Not Fried in Palm Oil), made with real millet flour.",
        reasonHi: "0% मैदा, तेल में तला नहीं गया, बाजरा और कंगनी मिलेट से बना।",
        priceEst: "₹89",
        tags: ["No Palm Oil", "No Maida", "Sun Dried"]
      },
      {
        id: "wickedgud-multigrain-noodles",
        name: "WickedGud 100% Multigrain Masala Noodles",
        brand: "WickedGud",
        score: 89,
        reasonEn: "Made with Oats, Lentils, Brown Rice; 100% Steamed & Baked, 0 Refined Flour.",
        reasonHi: "ओट्स, दाल और ब्राउन राइस से भरपूर, भाप में पकाया हुआ।",
        priceEst: "₹95",
        tags: ["High Protein", "Steamed", "Plant Power"]
      }
    ],
    novaGroup: 4
  },
  {
    id: "kurkure-masala-munch",
    barcode: "8901491101837",
    name: "Kurkure Masala Munch Crispy Namkeen",
    nameHindi: "कुरकुरे मसाला मंच नमकीन",
    brand: "PepsiCo India",
    category: "Snacks & Namkeen",
    categoryHindi: "स्नैक्स और नमकीन",
    imageUrl: "https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=600&auto=format&fit=crop&q=80",
    healthScore: 28,
    verdict: "Avoid Karein",
    verdictHindi: "बचने की सलाह",
    verdictType: "red",
    summaryEn: "High-temperature fried in refined Palmolein oil with artificial seasoning, acidity regulators (INS 330), and MSG-like flavor enhancers.",
    summaryHi: "पामोलिन तेल में डीप-फ्राई, अत्यधिक सोडियम और कृत्रिम मसालों का मिश्रण। पेट और दिल के लिए हानिकारक।",
    isVegetarian: true,
    fssaiNumber: "10014064000435",
    packagingSize: "90g",
    warnings: [
      {
        type: "palm_oil",
        titleEn: "Refined Palmolein Oil",
        titleHi: "रिफाइंड पामोलिन ऑयल",
        severity: "high",
        tagValue: "34% Fat (Palm)",
        descriptionEn: "Fried in industrial palmolein oil, prone to oxidation and rancid fatty acid creation.",
        descriptionHi: "सस्ता पाम तेल जो शरीर में बैड कोलेस्ट्रॉल और फैटी लिवर का कारण बन सकता है।"
      },
      {
        type: "sodium",
        titleEn: "High Salt / Sodium",
        titleHi: "अत्यधिक नमक",
        severity: "high",
        tagValue: "920mg Sodium / 100g",
        descriptionEn: "High sodium causes water retention and spikes arterial blood pressure.",
        descriptionHi: "ब्लड प्रेशर और किडनी पर भार बढ़ाता है।"
      },
      {
        type: "preservatives",
        titleEn: "INS 627 & INS 631 Flavour Enhancers",
        titleHi: "INS 627 व 631 कृत्रिम स्वाद",
        severity: "medium",
        tagValue: "INS 627 / 631",
        descriptionEn: "Nucleotide flavor boosters that stimulate overeating and appetite dysregulation.",
        descriptionHi: "बार-बार खाने की लत लगाने वाले केमिकल स्वाद तत्व।"
      }
    ],
    nutritionPer100g: {
      calories: "558 kcal",
      protein: "6.0g",
      carbohydrates: "55.0g",
      sugar: "2.1g",
      addedSugar: "1.5g",
      totalFat: "35.0g",
      saturatedFat: "15.0g",
      transFat: "0.10g",
      sodium: "920mg",
      fiber: "1.8g"
    },
    ingredientsList: [
      "Rice Meal",
      "Edible Vegetable Oil (Palmolein Oil)",
      "Corn Meal",
      "Gram Meal (Besan)",
      "Spices & Condiments (Chilli, Onion, Garlic, Coriander, Black Pepper, Clove)",
      "Salt",
      "Sugar",
      "Tartaric Acid (INS 334)",
      "Citric Acid (INS 330)",
      "Flavour Enhancers (INS 627, INS 631)"
    ],
    ingredientsExplanation: [
      { name: "Palmolein Oil", nameHi: "पामोलिन तेल", purpose: "Deep frying base", safety: "hazard" },
      { name: "Rice & Corn Meal", nameHi: "चावल और मक्का का चूरा", purpose: "Extruded crunchy puffs", safety: "safe" },
      { name: "INS 627 / 631", nameHi: "गुआनाइलेट और इनोसिनेट", purpose: "Taste potentiators", safety: "caution" },
      { name: "Citric Acid (INS 330)", nameHi: "साइट्रिक एसिड", purpose: "Tangy sourness", safety: "safe" }
    ],
    adulterationCheck: {
      riskLevel: "Low",
      detailsEn: "Factory automated. Hazard lies in oil quality degradation from repeated commercial frying cycles.",
      detailsHi: "फैक्ट्री निर्मित, लेकिन बार-बार गर्म किए पाम तेल के कारण टॉक्सिन का खतरा।"
    },
    cleanerAlternatives: [
      {
        id: "tooyumm-karare",
        name: "Too Yumm! Karare Munchies (Baked)",
        brand: "Too Yumm!",
        score: 76,
        reasonEn: "Baked snack with 40% less saturated fat, zero Palm oil used in base extrusion.",
        reasonHi: "बेक्ड स्नैक, 40% कम सैचुरेटेड फैट, बिना पाम ऑयल।"
      },
      {
        id: "monsoon-harvest-crunchies",
        name: "Monsoon Harvest Crunchy Millets & Makhana",
        brand: "Monsoon Harvest",
        score: 92,
        reasonEn: "Popped Makhana and Ragi roasted in cold-pressed oil with whole Indian spices.",
        reasonHi: "भुना हुआ मखाना और रागी, कच्ची घानी तेल में तैयार।"
      }
    ],
    novaGroup: 4
  },
  {
    id: "parle-g-biscuits",
    barcode: "8901719101051",
    name: "Parle-G Original Gluco Biscuits",
    nameHindi: "पारले-जी ग्लूको बिस्कुट",
    brand: "Parle Products",
    category: "Biscuits & Bakery",
    categoryHindi: "बिस्कुट और बेकरी",
    imageUrl: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=600&auto=format&fit=crop&q=80",
    healthScore: 35,
    verdict: "Avoid Karein",
    verdictHindi: "बचने की सलाह",
    verdictType: "red",
    summaryEn: "Contains 67% Maida (Refined Wheat Flour), 26.5% pure added sugar, Invert Sugar Syrup, and hydrogenated Palm oil. Very high glycemic load for daily tea snacking.",
    summaryHi: "67% मैदा और 26.5% अतिरिक्त चीनी से भरपूर। इसमें इनवर्ट शुगर सिरप और पाम ऑयल शामिल है जो वजन और शुगर बढ़ाते हैं।",
    isVegetarian: true,
    fssaiNumber: "10013022002253",
    packagingSize: "250g / 130g",
    warnings: [
      {
        type: "maida",
        titleEn: "67% Refined Flour (Maida)",
        titleHi: "67% मैदा (रिफाइंड आटा)",
        severity: "high",
        tagValue: "67% Maida",
        descriptionEn: "Pure starch with stripped bran, rapidly converted into blood glucose.",
        descriptionHi: "चोकर रहित मैदा जो आंतों के लिए भारी और शुगर बढ़ाने वाला है।"
      },
      {
        type: "added_sugar",
        titleEn: "26.5% Added Sugar & Invert Syrup",
        titleHi: "26.5% चीनी व इनवर्ट सिरप",
        severity: "high",
        tagValue: "26.5g Sugar / 100g",
        descriptionEn: "Invert syrup contains free glucose and fructose which accelerates fatty liver.",
        descriptionHi: "इनवर्ट सिरप लिवर में चर्बी जमा होने की प्रक्रिया को तेज करता है।"
      },
      {
        type: "palm_oil",
        titleEn: "Refined Palm Oil",
        titleHi: "रिफाइंड पाम ऑयल",
        severity: "medium",
        tagValue: "Vegetable Fat (Palm)",
        descriptionEn: "Used as industrial shortening for crispy biscuit texture.",
        descriptionHi: "सस्ता फैट जो बिस्कुट को खस्ता बनाने के लिए इस्तेमाल होता है।"
      }
    ],
    nutritionPer100g: {
      calories: "454 kcal",
      protein: "6.5g",
      carbohydrates: "78.2g",
      sugar: "26.5g",
      addedSugar: "26.0g",
      totalFat: "13.0g",
      saturatedFat: "6.0g",
      transFat: "0.0g",
      sodium: "280mg",
      fiber: "1.2g"
    },
    ingredientsList: [
      "Refined Wheat Flour (Maida 67%)",
      "Sugar (26.5%)",
      "Refined Palm Oil",
      "Invert Sugar Syrup",
      "Raising Agents (503(ii), 500(ii))",
      "Milk Solids",
      "Edible Common Salt",
      "Emulsifier (471)",
      "Dough Conditioner (223)",
      "Artificial Flavouring Substances (Vanilla & Milk)"
    ],
    ingredientsExplanation: [
      { name: "Maida 67%", nameHi: "मैदा", purpose: "Base dough structure", safety: "hazard" },
      { name: "Sugar & Invert Syrup", nameHi: "चीनी और चाशनी", purpose: "Sweetener and caramelization", safety: "hazard" },
      { name: "INS 223 (Sodium Metabisulphite)", nameHi: "सोडियम मेटाबाइसल्फाइट", purpose: "Dough relaxing agent", safety: "caution" },
      { name: "INS 503(ii)", nameHi: "अमोनियम बाइकार्बोनेट", purpose: "Baking leavening agent", safety: "safe" }
    ],
    adulterationCheck: {
      riskLevel: "Low",
      detailsEn: "Packaged standard, but falsely perceived as wholesome due to old branding nostalgia.",
      detailsHi: "पारंपरिक भ्रम: ग्लूकोज के नाम पर शुद्ध चीनी और मैदा।"
    },
    cleanerAlternatives: [
      {
        id: "early-foods-ragi-cookies",
        name: "Early Foods Organic Ragi & Jaggery Cookies",
        brand: "Early Foods",
        score: 95,
        reasonEn: "100% Organic Sprouted Ragi, pure Desi Cow Butter, 0 Maida, 0 White Sugar (Sweetened with Jaggery).",
        reasonHi: "100% रागी, गाय का मक्खन, 0 मैदा, गुड़ से मीठा किया हुआ।"
      },
      {
        id: "timios-millet-crispies",
        name: "Timios 100% Millet & Oats Crunchy Bikkies",
        brand: "Timios",
        score: 90,
        reasonEn: "Cold pressed oil, whole millet flour, low glycemic, no artificial vanilla aroma.",
        reasonHi: "मिलेट और ओट्स से बना, बिना प्रिजर्वेटिव।"
      }
    ],
    novaGroup: 4
  },
  {
    id: "aashirvaad-shuddh-chakki-atta",
    barcode: "8901725181122",
    name: "Aashirvaad Shuddh Chakki 100% Whole Wheat Atta",
    nameHindi: "आशीर्वाद शुद्ध चक्की संपूर्ण गेहूं आटा",
    brand: "ITC Limited",
    category: "Atta & Flour",
    categoryHindi: "आटा और दाल",
    imageUrl: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&auto=format&fit=crop&q=80",
    healthScore: 88,
    verdict: "Achha Option",
    verdictHindi: "अच्छा विकल्प",
    verdictType: "green",
    summaryEn: "100% Whole Wheat Grain with intact dietary bran and natural germ. 0 Maida, 0 Preservatives, 0 Palm Oil, excellent source of digestive fiber.",
    summaryHi: "100% संपूर्ण गेहूं से चक्की पीसा आटा, जिसमें प्राकृतिक चोकर शामिल है। शून्य मैदा, शून्य प्रिजर्वेटिव्स, बेहतरीन फाइबर स्रोत।",
    isVegetarian: true,
    fssaiNumber: "10012031000312",
    packagingSize: "5kg / 10kg",
    warnings: [],
    nutritionPer100g: {
      calories: "365 kcal",
      protein: "11.8g",
      carbohydrates: "74.0g",
      sugar: "2.5g",
      addedSugar: "0.0g",
      totalFat: "1.9g",
      saturatedFat: "0.4g",
      transFat: "0.0g",
      sodium: "3mg",
      fiber: "11.2g"
    },
    ingredientsList: [
      "100% Whole Wheat (Gehun)"
    ],
    ingredientsExplanation: [
      { name: "100% Whole Wheat", nameHi: "साबुत गेहूं", purpose: "Single ingredient clean staple with complete endosperm, bran & germ", safety: "safe" }
    ],
    adulterationCheck: {
      riskLevel: "Low",
      detailsEn: "Tested for Maida adulteration and chalk powder; passed FSSAI chakki grinding purity standards.",
      detailsHi: "मैदा व चाक पाउडर से मुक्त। प्राकृतिक चोकर युक्त।"
    },
    cleanerAlternatives: [
      {
        id: "24mantra-organic-atta",
        name: "24 Mantra Organic Whole Wheat Chakki Atta",
        brand: "24 Mantra Organic",
        score: 96,
        reasonEn: "Grown without chemical synthetic pesticides, certified Indian organic (NPOP / Jaivik Bharat).",
        reasonHi: "बिना किसी कीटनाशक के उगाया गया, 100% जैविक भारत प्रमाणित।"
      }
    ],
    novaGroup: 1
  },
  {
    id: "fortune-sunlite-oil",
    barcode: "8906007280014",
    name: "Fortune Sunlite Refined Sunflower Oil",
    nameHindi: "फॉर्च्यून सनलाइट रिफाइंड सूरजमुखी तेल",
    brand: "Adani Wilmar",
    category: "Cooking Oils & Ghee",
    categoryHindi: "तेल और घी",
    imageUrl: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=600&auto=format&fit=crop&q=80",
    healthScore: 42,
    verdict: "Soch Samajh Kar",
    verdictHindi: "सोच समझ कर",
    verdictType: "yellow",
    summaryEn: "Chemically refined using solvent extraction, degumming, and high heat deodorization (240°C). Strips natural antioxidants and contains high Omega-6 polyunsaturated fatty acids (inflammatory when consumed in excess).",
    summaryHi: "केमिकल रिफाइनिंग और उच्च तापमान (240°C) पर तैयार। प्राकृतिक एंटीऑक्सीडेंट्स नष्ट हो जाते हैं और अधिक ओमेगा-6 शरीर में सूजन पैदा कर सकता है।",
    isVegetarian: true,
    fssaiNumber: "10013021000810",
    packagingSize: "1 Litre Pouch",
    warnings: [
      {
        type: "palm_oil",
        titleEn: "Chemical Refining Process",
        titleHi: "केमिकल रिफाइनिंग",
        severity: "medium",
        tagValue: "Hexane Solvent Refined",
        descriptionEn: "Processed using caustic soda and hexane; high temperature stripping degrades natural tocopherols.",
        descriptionHi: "उच्च तापमान पर रसायनों द्वारा गंध और रंग हटाया गया तेल।"
      },
      {
        type: "trans_fat",
        titleEn: "High Omega-6 Ratio (Inflammatory)",
        titleHi: "अत्यधिक ओमेगा-6 फैटी एसिड",
        severity: "medium",
        tagValue: "Omega-6 : Omega-3 imbalance",
        descriptionEn: "Indian diets with excessive sunflower/soybean oil have an unbalanced 25:1 Omega-6 to 3 ratio.",
        descriptionHi: "शरीर में सूजन और जोड़ों के दर्द को बढ़ावा देने वाला असंतुलन।"
      }
    ],
    nutritionPer100g: {
      calories: "900 kcal",
      protein: "0.0g",
      carbohydrates: "0.0g",
      sugar: "0.0g",
      addedSugar: "0.0g",
      totalFat: "100.0g",
      saturatedFat: "10.5g",
      transFat: "0.5g",
      sodium: "0mg"
    },
    ingredientsList: [
      "Refined Sunflower Oil",
      "Permitted Antioxidant TBHQ (INS 319)",
      "Antifoaming Agent (INS 900a)",
      "Fortified with Vitamin A and Vitamin D"
    ],
    ingredientsExplanation: [
      { name: "Refined Sunflower Oil", nameHi: "रिफाइंड सूरजमुखी तेल", purpose: "Cooking medium", safety: "caution" },
      { name: "TBHQ (INS 319)", nameHi: "टीबीएचक्यू प्रिजर्वेटिव", purpose: "Synthetic antioxidant to prevent oil from turning rancid", safety: "caution" },
      { name: "INS 900a (Dimethylpolysiloxane)", nameHi: "एंटी-फोमिंग एजेंट", purpose: "Prevents oil from foaming in deep frying", safety: "safe" }
    ],
    adulterationCheck: {
      riskLevel: "Low",
      detailsEn: "FSSAI compliant, but consumers should look out for blending with cheap refined palm olein in loose unbranded oils.",
      detailsHi: "ब्रांडेड पैकेट सुरक्षित, लेकिन रिफाइंड प्रक्रिया प्राकृतिक नहीं है।"
    },
    cleanerAlternatives: [
      {
        id: "dhara-kacchi-ghani-mustard",
        name: "Dhara Kacchi Ghani Pure Mustard Oil (Cold-Pressed)",
        brand: "Mother Dairy / Dhara",
        score: 91,
        reasonEn: "Traditional cold-pressed Kacchi Ghani, 0 chemical refining, rich in natural allyl isothiocyanate & balanced MUFA.",
        reasonHi: "पारंपरिक कच्ची घानी, बिना केमिकल रिफाइनिंग, प्राकृतिक एंटीऑक्सीडेंट्स से भरपूर।"
      },
      {
        id: "patanjali-desi-cow-ghee",
        name: "Patanjali / Amul Pure Cow Ghee",
        brand: "Amul / Patanjali",
        score: 94,
        reasonEn: "Rich in fat-soluble vitamins (A, D, E, K) and short-chain butyric acid for gut microbiome.",
        reasonHi: "आंतों और पाचन के लिए उत्तम ब्यूटिरिक एसिड और प्राकृतिक विटामिन्स।"
      }
    ],
    novaGroup: 2
  },
  {
    id: "amul-pure-ghee",
    barcode: "8901262010152",
    name: "Amul Pure Cow Ghee (दूध से बना)",
    nameHindi: "अमूल शुद्ध गाय का घी",
    brand: "Amul (GCMMF)",
    category: "Cooking Oils & Ghee",
    categoryHindi: "तेल और घी",
    imageUrl: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=600&auto=format&fit=crop&q=80",
    healthScore: 94,
    verdict: "Achha Option",
    verdictHindi: "अच्छा विकल्प",
    verdictType: "green",
    summaryEn: "100% Pure Milk Fat with zero preservatives, zero added colors, and zero trans fats. Made through traditional curd churning methods. Rich in natural Butyric acid.",
    summaryHi: "100% शुद्ध दूध की मलाई से तैयार। शून्य प्रिजर्वेटिव्स, शून्य केमिकल, और पाचन को दुरुस्त करने वाले प्राकृतिक पोषक तत्वों से युक्त।",
    isVegetarian: true,
    fssaiNumber: "10012021000071",
    packagingSize: "1 Litre Tin",
    warnings: [],
    nutritionPer100g: {
      calories: "897 kcal",
      protein: "0.0g",
      carbohydrates: "0.0g",
      sugar: "0.0g",
      addedSugar: "0.0g",
      totalFat: "99.7g",
      saturatedFat: "62.0g",
      transFat: "0.0g",
      sodium: "0mg"
    },
    ingredientsList: [
      "100% Pure Milk Fat (Clarified Butter)"
    ],
    ingredientsExplanation: [
      { name: "Pure Milk Fat", nameHi: "शुद्ध दूध वसा", purpose: "Nutrient dense traditional cooking medium", safety: "safe" }
    ],
    adulterationCheck: {
      riskLevel: "Low",
      detailsEn: "Passed Baudouin test (negative for Vanaspati/hydrogenated vegetable oil) and iodine test (no starch).",
      detailsHi: "वनस्पति और स्टार्च मिलावट से पूरी तरह मुक्त।"
    },
    cleanerAlternatives: [
      {
        id: "a2-gir-cow-bilona-ghee",
        name: "Gir Organic A2 Cultured Bilona Cow Ghee",
        brand: "Gir Organic",
        score: 98,
        reasonEn: "Handcrafted using traditional Vedic Bilona method from grass-fed A2 Gir cow milk.",
        reasonHi: "पारंपरिक वैदिक बिलोना पद्धति से बना, A2 गिर गाय का शुद्ध घी।"
      }
    ],
    novaGroup: 1
  },
  {
    id: "real-mixed-fruit-juice",
    barcode: "8901207011039",
    name: "Réal Fruit Power Mixed Fruit Beverage",
    nameHindi: "रियल फ्रूट पावर मिक्स्ड फ्रूट जूस",
    brand: "Dabur India",
    category: "Dairy & Drinks",
    categoryHindi: "डेयरी और पेय",
    imageUrl: "https://images.unsplash.com/photo-1622484211148-19760773d2a7?w=600&auto=format&fit=crop&q=80",
    healthScore: 31,
    verdict: "Avoid Karein",
    verdictHindi: "बचने की सलाह",
    verdictType: "red",
    summaryEn: "Marketed as wholesome fruit juice, but contains only ~15% reconstituted fruit concentrate with 13.5g of added sugar per glass (equal to 3.5 teaspoons of white sugar). Lacks natural fruit pulp fiber.",
    summaryHi: "फलों का रस केवल 15-20% है, शेष पानी और 13.5 ग्राम अतिरिक्त चीनी। फाइबर रहित होने से लिवर और वजन पर बुरा असर पड़ता है।",
    isVegetarian: true,
    fssaiNumber: "10012051000003",
    packagingSize: "1 Litre TetraPak",
    warnings: [
      {
        type: "added_sugar",
        titleEn: "13.5g Sugar per 100ml (Extreme)",
        titleHi: "13.5 ग्राम चीनी प्रति 100ml",
        severity: "high",
        tagValue: "34g Sugar per Glass",
        descriptionEn: "One 250ml glass exceeds the entire daily sugar allowance recommended by ICMR / WHO for adults.",
        descriptionHi: "एक गिलास में ही पूरे दिन की अनुशंसित चीनी की मात्रा से अधिक शर्करा है।"
      },
      {
        type: "preservatives",
        titleEn: "Acidity Regulators (INS 330) & Stabilizers",
        titleHi: "एसिडिटी रेगुलेटर और स्टेबलाइजर",
        severity: "medium",
        tagValue: "INS 330 / INS 440",
        descriptionEn: "Reconstituted from heated juice concentrates stripped of volatile fruit aromas, augmented with artificial stabilizers.",
        descriptionHi: "कंसंट्रेट पेस्ट से बना जूस जिसमें प्रिजर्वेटिव्स मिले होते हैं।"
      }
    ],
    nutritionPer100g: {
      calories: "56 kcal",
      protein: "0.4g",
      carbohydrates: "13.6g",
      sugar: "13.5g",
      addedSugar: "11.8g",
      totalFat: "0.0g",
      sodium: "22mg",
      fiber: "0.1g"
    },
    ingredientsList: [
      "Water",
      "Mixed Fruit Concentrate (18.6%) [Apple, Orange, Guava, Banana, Mango, Pineapple, Apricot, Peach]",
      "Sugar",
      "Acidity Regulator (INS 330)",
      "Antioxidant (INS 300)",
      "Stabilizer (INS 440)"
    ],
    ingredientsExplanation: [
      { name: "Water & Sugar", nameHi: "पानी और चीनी", purpose: "Primary volumetric filler (80%+)", safety: "hazard" },
      { name: "Fruit Concentrate", nameHi: "फ्रूट कंसंट्रेट", purpose: "Heated evaporated fruit syrup", safety: "safe" },
      { name: "INS 330 (Citric Acid)", nameHi: "साइट्रिक एसिड", purpose: "Tartness and preservation", safety: "safe" },
      { name: "INS 300 (Ascorbic Acid)", nameHi: "विटामिन सी", purpose: "Antioxidant browning preventer", safety: "safe" }
    ],
    adulterationCheck: {
      riskLevel: "Low",
      detailsEn: "Complies with Indian beverage standards, but misleadingly labelled as 'Fruit Power' when it is mostly sweetened water.",
      detailsHi: "विज्ञापन में 'फ्रूट पावर' लेकिन असल में चीनी का शरबत।"
    },
    cleanerAlternatives: [
      {
        id: "raw-pressery-cold-pressed",
        name: "Raw Pressery 100% Cold-Pressed Valencia Orange / Mixed Fruit",
        brand: "RAW Pressery",
        score: 91,
        reasonEn: "100% Cold pressed whole fruit, 0 added water, 0 added sugar, High-Pressure Processed (HPP).",
        reasonHi: "100% ताजे फलों का कोल्ड-प्रेस्ड रस, बिना अतिरिक्त चीनी और बिना पानी।"
      },
      {
        id: "fresh-nariyal-pani",
        name: "Fresh Green Tender Coconut Water (ताजा नारियल पानी)",
        brand: "Nature Fresh",
        score: 99,
        reasonEn: "Natural electrolytes, low calories, 100% unadulterated bio-available potassium.",
        reasonHi: "प्राकृतिक इलेक्ट्रोलाइट्स, शून्य रसायन, सर्वोत्तम स्वास्थ्यवर्धक।"
      }
    ],
    novaGroup: 4
  },
  {
    id: "nestle-cerelac-baby-cereal",
    barcode: "8901058000047",
    name: "Nestlé Cerelac Wheat Apple Baby Cereal (6+ Months)",
    nameHindi: "नेस्ले सेरेलक व्हीट एप्पल शिशु आहार",
    brand: "Nestlé India",
    category: "Kids & Baby Food",
    categoryHindi: "शिशु आहार",
    imageUrl: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop&q=80",
    healthScore: 36,
    verdict: "Avoid Karein",
    verdictHindi: "बचने की सलाह",
    verdictType: "red",
    summaryEn: "Investigated in 2024 for high added sugar in Asian/Indian markets compared to zero added sugar in European formulations. Contains ~7.5g added sucrose/maltodextrin per serving for babies.",
    summaryHi: "2024 में उजागर: भारत में सेरेलक में शिशुओं के लिए ~7.5 ग्राम अतिरिक्त चीनी मिलाई जाती है, जबकि यूरोप में 0% चीनी होती है।",
    isVegetarian: true,
    fssaiNumber: "10012011000168",
    packagingSize: "300g Bib Box",
    warnings: [
      {
        type: "added_sugar",
        titleEn: "Added Sucrose for Infants",
        titleHi: "शिशुओं के लिए अतिरिक्त चीनी",
        severity: "high",
        tagValue: "24g Sugar / 100g",
        descriptionEn: "Babies under 2 years should have ZERO added sugars to prevent lifelong sweet addiction and metabolic disease.",
        descriptionHi: "2 साल से कम उम्र के बच्चों के लिए अतिरिक्त चीनी स्वास्थ्य के लिए अत्यंत हानिकारक है।"
      },
      {
        type: "palm_oil",
        titleEn: "Refined Palm Olein",
        titleHi: "रिफाइंड पाम तेल",
        severity: "medium",
        tagValue: "Vegetable Fat Blend",
        descriptionEn: "Processed vegetable fat blend used to simulate dairy lipid profiles cheaply.",
        descriptionHi: "सस्ता वेजिटेबल फैट जो बच्चों के नाजुक पाचन तंत्र के लिए भारी है।"
      }
    ],
    nutritionPer100g: {
      calories: "413 kcal",
      protein: "15.0g",
      carbohydrates: "68.2g",
      sugar: "24.0g",
      addedSugar: "18.5g",
      totalFat: "9.0g",
      saturatedFat: "3.5g",
      sodium: "120mg",
      fiber: "3.5g"
    },
    ingredientsList: [
      "Wheat Flour (51%)",
      "Milk Solids (35.2%)",
      "Sugar (Sucrose)",
      "Apple Juice Concentrate (4.5%)",
      "Soybean Oil",
      "Corn Oil",
      "Minerals (Calcium, Iron, Zinc)",
      "Vitamins (A, C, D, E, B-Complex)"
    ],
    ingredientsExplanation: [
      { name: "Wheat Flour", nameHi: "गेहूं का आटा", purpose: "Base carbohydrate starch", safety: "safe" },
      { name: "Sugar / Sucrose", nameHi: "अतिरिक्त चीनी", purpose: "Sweetener (unnecessary for infants)", safety: "hazard" },
      { name: "Milk Solids", nameHi: "मिल्क पाउडर", purpose: "Protein and dairy calcium", safety: "safe" },
      { name: "Apple Juice Concentrate", nameHi: "एप्पल जूस कंसंट्रेट", purpose: "Flavor and fructose", safety: "caution" }
    ],
    adulterationCheck: {
      riskLevel: "Low",
      detailsEn: "Meets baseline FSSAI mineral standards, but fails modern pediatric guidelines regarding added sugar.",
      detailsHi: "बाल रोग विशेषज्ञों के अनुसार शिशुओं के लिए चीनी मुक्त आहार अनिवार्य है।"
    },
    cleanerAlternatives: [
      {
        id: "slurrp-farm-ragi-baby-cereal",
        name: "Slurrp Farm Organic Sprouted Ragi & Rice Porridge",
        brand: "Slurrp Farm",
        score: 96,
        reasonEn: "0% Added Sugar, 0% Salt, 0% Milk powder, 100% Sprouted Whole Millets sweetened only with fruit powder.",
        reasonHi: "0% चीनी, 0% नमक, केवल अंकुरित रागी और प्राकृतिक फल पाउडर।"
      },
      {
        id: "timios-organic-porridge",
        name: "Timios 100% Organic Wheat & Apple Porridge",
        brand: "Timios",
        score: 93,
        reasonEn: "Certified Organic, No palm oil, No artificial vitamins, sweetened with real apple puree.",
        reasonHi: "100% आर्गेनिक, बिना रिफाइंड शुगर और बिना पाम तेल।"
      }
    ],
    novaGroup: 4
  },
  {
    id: "britannia-good-day-butter",
    barcode: "8901063141117",
    name: "Britannia Good Day Butter Rich Cookies",
    nameHindi: "ब्रिटानिया गुड डे बटर कुकीज",
    brand: "Britannia Industries",
    category: "Biscuits & Bakery",
    categoryHindi: "बिस्कुट और बेकरी",
    imageUrl: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=600&auto=format&fit=crop&q=80",
    healthScore: 32,
    verdict: "Avoid Karein",
    verdictHindi: "बचने की सलाह",
    verdictType: "red",
    summaryEn: "Contains merely ~2% real butter despite the 'Butter Cookie' prominent name. The bulk of fat is 22% refined Palmolein and hydrogenated vegetable fat, with 60% Maida.",
    summaryHi: "नाम में 'बटर' है लेकिन असली मक्खन सिर्फ 2% है! 22% पाम तेल, हाइड्रोजनेटेड फैट और 60% मैदा से बना है।",
    isVegetarian: true,
    fssaiNumber: "10015043001129",
    packagingSize: "200g / 100g",
    warnings: [
      {
        type: "palm_oil",
        titleEn: "Palmolein & Hydrogenated Fat",
        titleHi: "पामोलिन और वनस्पति फैट",
        severity: "high",
        tagValue: "22% Industrial Fat (Only 2% Butter)",
        descriptionEn: "Misleading marketing: only 2% dairy butter, while 90% of the fat is saturated palm oil.",
        descriptionHi: "नाम बटर का, लेकिन असल में 90% पाम तेल भरा हुआ है।"
      },
      {
        type: "maida",
        titleEn: "Refined Flour Base (Maida)",
        titleHi: "मैदा (रिफाइंड आटा)",
        severity: "high",
        tagValue: "58% Maida",
        descriptionEn: "Causes blood sugar spikes and empty caloric load.",
        descriptionHi: "फाइबर रहित मैदा जो वजन बढ़ाने में सहायक है।"
      },
      {
        type: "added_sugar",
        titleEn: "24.5g Added Sugar / 100g",
        titleHi: "24.5 ग्राम चीनी प्रति 100g",
        severity: "high",
        tagValue: "24.5% Sugar",
        descriptionEn: "High sucrose content paired with saturated fats accelerates visceral fat deposition.",
        descriptionHi: "चीनी और पाम तेल का संयोजन पेट की चर्बी बढ़ाता है।"
      }
    ],
    nutritionPer100g: {
      calories: "508 kcal",
      protein: "7.0g",
      carbohydrates: "67.0g",
      sugar: "24.5g",
      addedSugar: "24.0g",
      totalFat: "23.5g",
      saturatedFat: "11.0g",
      transFat: "0.08g",
      sodium: "290mg",
      fiber: "1.5g"
    },
    ingredientsList: [
      "Refined Wheat Flour (Maida 58%)",
      "Sugar",
      "Refined Palm Oil",
      "Butter (2%)",
      "Invert Sugar Syrup",
      "Milk Solids",
      "Raising Agents (503(ii), 500(ii))",
      "Emulsifiers (322 from Soy, 471)",
      "Iodised Salt",
      "Artificial Flavouring Substances (Butter & Vanilla)"
    ],
    ingredientsExplanation: [
      { name: "Maida 58%", nameHi: "मैदा", purpose: "Base dough structure", safety: "hazard" },
      { name: "Palm Oil & 2% Butter", nameHi: "पाम तेल व 2% मक्खन", purpose: "Shortening fat", safety: "hazard" },
      { name: "Sugar & Invert Syrup", nameHi: "चीनी", purpose: "Sweetening", safety: "hazard" },
      { name: "INS 322 / INS 471", nameHi: "सोया लेसिथिन", purpose: "Emulsifier for crisp bite", safety: "safe" }
    ],
    adulterationCheck: {
      riskLevel: "Low",
      detailsEn: "No illegal adulteration, but legal labeling trickery makes consumer think they are eating butter.",
      detailsHi: "बटर का भ्रामक दावा, असल में पाम तेल बिस्कुट।"
    },
    cleanerAlternatives: [
      {
        id: "the-whole-truth-butter-cookies",
        name: "The Whole Truth 100% Desi Butter Cookies",
        brand: "The Whole Truth",
        score: 93,
        reasonEn: "100% Real Amul / Desi Butter, 0 Palm Oil, 0 Maida (Almond & Oat flour), 0 White Sugar (dates & jaggery).",
        reasonHi: "100% असली देसी मक्खन, 0 पाम ऑयल, बादाम व ओट्स का आटा।"
      }
    ],
    novaGroup: 4
  },
  {
    id: "everest-garam-masala",
    barcode: "8901786101114",
    name: "Everest Super Garam Masala Blend",
    nameHindi: "एवरेस्ट सुपर गरम मसाला",
    brand: "Everest Spices",
    category: "Spices & Masalas",
    categoryHindi: "मसाले",
    imageUrl: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=600&auto=format&fit=crop&q=80",
    healthScore: 78,
    verdict: "Achha Option",
    verdictHindi: "अच्छा विकल्प",
    verdictType: "green",
    summaryEn: "100% Whole Spice blend with no added MSG, no synthetic colours, and no starch fillers. Note: In 2024 global regulators inspected ethylene oxide sterilization limits, which Everest updated for safety.",
    summaryHi: "100% साबुत मसालों का प्रामाणिक मिश्रण। कोई अतिरिक्त रंग, मैदा या मिलावट नहीं। पाचन व रोग प्रतिरोधक क्षमता के लिए गुणकारी।",
    isVegetarian: true,
    fssaiNumber: "10012022000055",
    packagingSize: "100g Box",
    warnings: [
      {
        type: "glyphosate",
        titleEn: "Sterilization / ETO Watch",
        titleHi: "कीटनाशक व नसबंदी जांच",
        severity: "low",
        tagValue: "FSSAI Batch Tested",
        descriptionEn: "Ensure purchasing recent batches compliant with stringent new FSSAI pesticide & ethylene oxide norms.",
        descriptionHi: "हालिया बैच एफएसएसएआई के कड़े मानकों पर खरे उतरे हैं।"
      }
    ],
    nutritionPer100g: {
      calories: "380 kcal",
      protein: "12.0g",
      carbohydrates: "58.0g",
      sugar: "3.0g",
      addedSugar: "0.0g",
      totalFat: "11.0g",
      sodium: "80mg",
      fiber: "22.0g"
    },
    ingredientsList: [
      "Coriander",
      "Cumin",
      "Black Pepper",
      "Cassia Bark (Taj)",
      "Clove",
      "Dry Ginger",
      "Cardamom Amomum",
      "Nutmeg",
      "Mace",
      "Caraway",
      "Star Anise"
    ],
    ingredientsExplanation: [
      { name: "Whole Indian Spices", nameHi: "प्राकृतिक साबुत मसाले", purpose: "Flavor, medicinal phytonutrients, piperine and cinnamaldehyde", safety: "safe" }
    ],
    adulterationCheck: {
      riskLevel: "Low",
      detailsEn: "Passed water floatation test (no sawdust, chalk, or foreign seeds detected).",
      detailsHi: "लकड़ी का बुरादा या चाक पाउडर की मिलावट नहीं पाई गई।"
    },
    cleanerAlternatives: [
      {
        id: "24mantra-organic-garam-masala",
        name: "24 Mantra Organic Handpicked Garam Masala",
        brand: "24 Mantra Organic",
        score: 95,
        reasonEn: "Certified Organic whole spices, zero chemical pesticide fumigation, unadulterated whole aroma.",
        reasonHi: "100% जैविक मसाले, बिना किसी केमिकल फ्यूमिगेशन के।"
      }
    ],
    novaGroup: 1
  },
  {
    id: "haldirams-nagpur-bhujia-sev",
    barcode: "8904004400508",
    name: "Haldiram's Nagpur Classic Aloo Bhujia Sev",
    nameHindi: "हल्दीराम नागपुर क्लासिक आलू भुजिया",
    brand: "Haldiram's",
    category: "Snacks & Namkeen",
    categoryHindi: "स्नैक्स और नमकीन",
    imageUrl: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&auto=format&fit=crop&q=80",
    healthScore: 30,
    verdict: "Avoid Karein",
    verdictHindi: "बचने की सलाह",
    verdictType: "red",
    summaryEn: "Deep fried in 42% edible vegetable oil (Palmolein & Cottonseed oil). Very calorie dense (580 kcal / 100g) with high saturated fats and intense sodium seasoning.",
    summaryHi: "42% पामोलिन और बिनौला तेल में डीप फ्राई। 580 कैलोरी और अत्यधिक नमक के साथ वजन और कोलेस्ट्रॉल बढ़ाने वाला नाश्ता।",
    isVegetarian: true,
    fssaiNumber: "10012012000180",
    packagingSize: "200g / 400g",
    warnings: [
      {
        type: "palm_oil",
        titleEn: "42% Cottonseed & Palmolein Oil",
        titleHi: "42% पामोलिन व बिनौला तेल",
        severity: "high",
        tagValue: "42g Fat per 100g",
        descriptionEn: "High temperature industrial oil frying oxidizes lipids, forming advance glycation end-products.",
        descriptionHi: "अत्यधिक तेल में तला हुआ, जो धमनियों में रुकावट का कारण बन सकता है।"
      },
      {
        type: "sodium",
        titleEn: "High Sodium Seasoning",
        titleHi: "अत्यधिक नमक",
        severity: "high",
        tagValue: "880mg Sodium / 100g",
        descriptionEn: "Spicy salt mixture dehydrates cells and stresses renal filtration.",
        descriptionHi: "हाई ब्लड प्रेशर वाले मरीजों के लिए हानिकारक।"
      }
    ],
    nutritionPer100g: {
      calories: "582 kcal",
      protein: "8.5g",
      carbohydrates: "42.0g",
      sugar: "2.0g",
      addedSugar: "1.0g",
      totalFat: "42.0g",
      saturatedFat: "18.0g",
      transFat: "0.15g",
      sodium: "880mg",
      fiber: "3.5g"
    },
    ingredientsList: [
      "Potatoes (Aloo)",
      "Edible Vegetable Oil (Palmolein Oil & Cottonseed Oil)",
      "Gram Pulse Flour (Besan)",
      "Tepary Bean Flour (Moth Dal)",
      "Edible Starch",
      "Spices & Condiments (Red Chilli, Black Pepper, Clove, Cardamom, Garlic, Mint)",
      "Iodised Salt",
      "Citric Acid (INS 330)"
    ],
    ingredientsExplanation: [
      { name: "Potatoes & Moth Dal", nameHi: "आलू और मोठ दाल", purpose: "Base crisp dough", safety: "safe" },
      { name: "Palmolein / Cottonseed Oil", nameHi: "पामोलिन व बिनौला तेल", purpose: "Deep frying fat (42%)", safety: "hazard" },
      { name: "Indian Spices", nameHi: "मसाले", purpose: "Chaat masala flavor", safety: "safe" }
    ],
    adulterationCheck: {
      riskLevel: "Low",
      detailsEn: "Factory automated. Check for excessive oiliness or stale rancid smell in older batches.",
      detailsHi: "पुराने पैकेटों में तेल के बासी होने की संभावना रहती है।"
    },
    cleanerAlternatives: [
      {
        id: "true-elements-roasted-makhana",
        name: "True Elements Roasted Pudina Makhana (Foxnuts)",
        brand: "True Elements",
        score: 94,
        reasonEn: "Zero palm oil, roasted (not fried) in cold-pressed olive/sunflower oil, rich in calcium and magnesium.",
        reasonHi: "0% पाम तेल, तला नहीं भुना हुआ, कैल्शियम और मैग्नीशियम से भरपूर मखाना।"
      }
    ],
    novaGroup: 4
  },
  {
    id: "lays-india-magic-masala",
    barcode: "8901491000109",
    name: "Lay's India's Magic Masala Potato Chips",
    nameHindi: "लेज़ इंडियाज मैजिक मसाला चिप्स",
    brand: "PepsiCo India",
    category: "Snacks & Namkeen",
    categoryHindi: "स्नैक्स और नमकीन",
    imageUrl: "https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=600&auto=format&fit=crop&q=80",
    healthScore: 26,
    verdict: "Avoid Karein",
    verdictHindi: "बचने की सलाह",
    verdictType: "red",
    summaryEn: "Fried in industrial Palmolein oil with 33% total fat, 980mg sodium per 100g, artificial flavour enhancers (INS 627, 631, 635), and added sugar.",
    summaryHi: "पामोलिन तेल में तले हुए आलू चिप्स, अत्यधिक नमक और 3 प्रकार के स्वाद बढ़ाने वाले केमिकल (INS 627, 631, 635)।",
    isVegetarian: true,
    fssaiNumber: "10014064000435",
    packagingSize: "50g / 115g",
    warnings: [
      {
        type: "palm_oil",
        titleEn: "Palmolein Oil Frying",
        titleHi: "पामोलिन तेल में डीप फ्राई",
        severity: "high",
        tagValue: "33% Fat (Palm)",
        descriptionEn: "High calorie density with saturated fat loads that trigger systemic inflammation.",
        descriptionHi: "सस्ता पाम तेल जो शरीर में बैड कोलेस्ट्रॉल को बढ़ाता है।"
      },
      {
        type: "sodium",
        titleEn: "Extremely High Sodium",
        titleHi: "बहुत अधिक सोडियम",
        severity: "high",
        tagValue: "980mg Sodium / 100g",
        descriptionEn: "Exceeds 40% of daily sodium threshold in a single medium pack.",
        descriptionHi: "एक पैकेट में ही दिन भर के नमक की आधी मात्रा।"
      },
      {
        type: "preservatives",
        titleEn: "Triple Flavour Enhancers (627, 631, 635)",
        titleHi: "तीन प्रकार के फ्लेवर एन्हांसर",
        severity: "high",
        tagValue: "INS 627 + 631 + 635",
        descriptionEn: "Cocktail of ribonucleotides engineered to override natural satiety signals.",
        descriptionHi: "पेट भरने के बाद भी बार-बार खाने के लिए उकसाने वाले केमिकल्स।"
      }
    ],
    nutritionPer100g: {
      calories: "555 kcal",
      protein: "6.8g",
      carbohydrates: "52.5g",
      sugar: "4.5g",
      addedSugar: "3.2g",
      totalFat: "35.5g",
      saturatedFat: "15.0g",
      transFat: "0.10g",
      sodium: "980mg",
      fiber: "3.0g"
    },
    ingredientsList: [
      "Potato (55%)",
      "Edible Vegetable Oil (Palmolein Oil)",
      "Seasoning (Spices & Condiments, Sugar, Salt)",
      "Maltodextrin",
      "Black Salt",
      "Flavour Enhancers (INS 627, INS 631, INS 635)",
      "Anticaking Agent (INS 551)",
      "Colour (INS 160c)"
    ],
    ingredientsExplanation: [
      { name: "Potato", nameHi: "आलू", purpose: "Base chip", safety: "safe" },
      { name: "Palmolein Oil", nameHi: "पामोलिन तेल", purpose: "Deep frying fat", safety: "hazard" },
      { name: "INS 635/627/631", nameHi: "फ्लेवर बूस्टर", purpose: "Intense umami addictiveness", safety: "hazard" },
      { name: "INS 160c (Paprika Extract)", nameHi: "लाल शिमला मिर्च का रंग", purpose: "Natural red-orange color", safety: "safe" }
    ],
    adulterationCheck: {
      riskLevel: "Low",
      detailsEn: "Complies with FSSAI, but nutritional score is among the lowest in packaged snacks.",
      detailsHi: "अल्ट्रा-प्रोसेस्ड जंक फूड की श्रेणी में आता है।"
    },
    cleanerAlternatives: [
      {
        id: "tooyumm-veggie-stix",
        name: "Too Yumm! Baked Multigrain Masala Chips",
        brand: "Too Yumm!",
        score: 79,
        reasonEn: "Baked snack with 0% Palm Oil and 40% less saturated fat.",
        reasonHi: "बेक्ड स्नैक, बिना पाम ऑयल और कम सैचुरेटेड फैट।"
      }
    ],
    novaGroup: 4
  },
  {
    id: "slurrp-farm-millet-noodles",
    barcode: "8906129480102",
    name: "Slurrp Farm 100% Foxtail Millet Yummy Noodles",
    nameHindi: "स्लर्प फार्म 100% बाजरा मिलेट नूडल्स",
    brand: "Slurrp Farm",
    category: "Noodles & Instant Food",
    categoryHindi: "नूडल्स और इंस्टेंट फूड",
    imageUrl: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=600&auto=format&fit=crop&q=80",
    healthScore: 93,
    verdict: "Achha Option",
    verdictHindi: "अच्छा विकल्प",
    verdictType: "green",
    summaryEn: "100% Maida Free, 0% Palm Oil, Sun-dried (Not Fried). Crafted from supergrains (Foxtail Millet, Little Millet) with a clean spice mix with 0 MSG and 0 synthetic colours.",
    summaryHi: "0% मैदा, 0% पाम ऑयल, धूप में सुखाया हुआ (तला नहीं गया)। बाजरा और कंगनी मिलेट से बना संपूर्ण स्वास्थ्यवर्धक नूडल्स।",
    isVegetarian: true,
    fssaiNumber: "10019011006500",
    packagingSize: "192g (Pack of 2)",
    warnings: [],
    nutritionPer100g: {
      calories: "360 kcal",
      protein: "11.2g",
      carbohydrates: "72.0g",
      sugar: "1.8g",
      addedSugar: "0.0g",
      totalFat: "2.1g",
      saturatedFat: "0.5g",
      transFat: "0.0g",
      sodium: "380mg",
      fiber: "9.5g"
    },
    ingredientsList: [
      "Foxtail Millet Flour (40%)",
      "Little Millet Flour (20%)",
      "Whole Wheat Flour (40%)",
      "Natural Masala Tastemaker: Coriander, Cumin, Turmeric, Ginger, Garlic, Rock Salt, Raw Unrefined Sugar"
    ],
    ingredientsExplanation: [
      { name: "Foxtail & Little Millet", nameHi: "कंगनी और कुटकी मिलेट", purpose: "Ancient high-fiber low GI grains", safety: "safe" },
      { name: "Whole Wheat Flour", nameHi: "साबुत गेहूं", purpose: "Elasticity and chew", safety: "safe" },
      { name: "Rock Salt (Sendha Namak)", nameHi: "सेंधा नमक", purpose: "Natural mineral seasoning", safety: "safe" }
    ],
    adulterationCheck: {
      riskLevel: "Low",
      detailsEn: "Certified clean label product. Tested 100% free from Maida and chemical synthetic preservatives.",
      detailsHi: "मैदा और कृत्रिम रसायनों से 100% मुक्त प्रमाणित।"
    },
    cleanerAlternatives: [],
    novaGroup: 2
  },
  {
    id: "cadbury-dairy-milk-silk",
    barcode: "8901233024881",
    name: "Cadbury Dairy Milk Silk Chocolate Bar",
    nameHindi: "कैडबरी डेयरी मिल्क सिल्क चॉकलेट",
    brand: "Mondelez India",
    category: "Chocolates & Sweets",
    categoryHindi: "चॉकलेट और मिठाइयां",
    imageUrl: "https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=600&auto=format&fit=crop&q=80",
    healthScore: 33,
    verdict: "Avoid Karein",
    verdictHindi: "बचने की सलाह",
    verdictType: "red",
    summaryEn: "Contains 56.5% added sugar (more than half the bar is pure white sugar), combined with Cocoa Butter alternatives and emulsifier INS 476. Highly addictive glycemic spike.",
    summaryHi: "56.5% अतिरिक्त चीनी! चॉकलेट का आधा से ज्यादा हिस्सा केवल चीनी है। इसमें इमल्सीफायर INS 476 और अत्यधिक वसा मौजूद है।",
    isVegetarian: true,
    fssaiNumber: "10014022002711",
    packagingSize: "60g / 150g",
    warnings: [
      {
        type: "added_sugar",
        titleEn: "56.5% Pure Added Sugar",
        titleHi: "56.5% अतिरिक्त चीनी",
        severity: "high",
        tagValue: "56.5g Sugar / 100g",
        descriptionEn: "More than half the bar weight is pure refined sugar, driving immediate insulin surge.",
        descriptionHi: "चॉकलेट बार के आधे से ज्यादा वजन में केवल सफेद चीनी भरी हुई है।"
      },
      {
        type: "preservatives",
        titleEn: "INS 476 (Polyglycerol Polyricinoleate)",
        titleHi: "INS 476 इमल्सीफायर",
        severity: "medium",
        tagValue: "INS 476 / INS 442",
        descriptionEn: "Synthetic emulsifier used to cut cocoa butter costs by reducing viscosity artificially.",
        descriptionHi: "कोको बटर की लागत घटाने के लिए इस्तेमाल किया जाने वाला सिंथेटिक केमिकल।"
      }
    ],
    nutritionPer100g: {
      calories: "534 kcal",
      protein: "7.8g",
      carbohydrates: "59.2g",
      sugar: "56.5g",
      addedSugar: "50.0g",
      totalFat: "30.0g",
      saturatedFat: "18.5g",
      transFat: "0.10g",
      sodium: "150mg"
    },
    ingredientsList: [
      "Sugar",
      "Milk Solids (25%)",
      "Cocoa Butter",
      "Cocoa Solids",
      "Emulsifiers (442, 476)",
      "Flavours (Natural, Nature Identical and Artificial Vanilla Flavouring Substances)"
    ],
    ingredientsExplanation: [
      { name: "Sugar (56.5%)", nameHi: "चीनी", purpose: "Primary ingredient", safety: "hazard" },
      { name: "Milk Solids", nameHi: "दूध के ठोस तत्व", purpose: "Creamy mouthfeel", safety: "safe" },
      { name: "Cocoa Butter & Solids", nameHi: "कोको बटर और सॉलिड्स", purpose: "Chocolate base", safety: "safe" },
      { name: "INS 476", nameHi: "पॉलीग्लिसरॉल पॉलीरिसिनोलेएट", purpose: "Synthetic flow agent", safety: "caution" }
    ],
    adulterationCheck: {
      riskLevel: "Low",
      detailsEn: "Meets FSSAI milk chocolate definitions, but nutritional quality is poor due to extreme sucrose loading.",
      detailsHi: "चॉकलेट से ज्यादा यह मीठी कैंडी की तरह है।"
    },
    cleanerAlternatives: [
      {
        id: "the-whole-truth-dark-chocolate",
        name: "The Whole Truth 71% Dark Chocolate (Sweetened with Dates)",
        brand: "The Whole Truth",
        score: 94,
        reasonEn: "Only 2 ingredients: Cocoa & Dates. 0 Added Sugar, 0 Palm Oil, 0 INS 476, 0 Artificial Flavours.",
        reasonHi: "सिर्फ 2 सामग्रियां: कोको और खजूर। शून्य अतिरिक्त चीनी और कोई केमिकल नहीं।"
      }
    ],
    novaGroup: 4
  },
  {
    id: "frooti-mango-drink",
    barcode: "8902579100018",
    name: "Frooti Fresh 'N' Juicy Mango Drink",
    nameHindi: "फ्रूटी फ्रेश एन जूसी मैंगो ड्रिंक",
    brand: "Parle Agro",
    category: "Dairy & Drinks",
    categoryHindi: "डेयरी और पेय",
    imageUrl: "https://images.unsplash.com/photo-1546173159-315724a31696?w=600&auto=format&fit=crop&q=80",
    healthScore: 29,
    verdict: "Avoid Karein",
    verdictHindi: "बचने की सलाह",
    verdictType: "red",
    summaryEn: "Only ~19% mango pulp diluted in water, 13g added sugar per 100ml, artificial yellow colours (Sunset Yellow FCF INS 110), and Class II preservatives (INS 211 Sodium Benzoate).",
    summaryHi: "केवल 19% आम का पल्प, बाकी पानी, 13 ग्राम अतिरिक्त चीनी, कृत्रिम पीला रंग (INS 110) और प्रिजर्वेटिव (सोडियम बेंजोएट)।",
    isVegetarian: true,
    fssaiNumber: "10012022000264",
    packagingSize: "160ml / 600ml",
    warnings: [
      {
        type: "artificial_colours",
        titleEn: "Sunset Yellow FCF (INS 110)",
        titleHi: "सनसेट येलो कृत्रिम रंग (INS 110)",
        severity: "high",
        tagValue: "INS 110 Synthetic Dye",
        descriptionEn: "Coal-tar derived azo dye linked in international pediatric studies to hyperactivity in children.",
        descriptionHi: "सिंथेटिक केमिकल रंग जो बच्चों में बेचैनी (Hyperactivity) और एलर्जी पैदा कर सकता है।"
      },
      {
        type: "preservatives",
        titleEn: "Sodium Benzoate (INS 211)",
        titleHi: "सोडियम बेंजोएट (INS 211)",
        severity: "medium",
        tagValue: "INS 211 Preservative",
        descriptionEn: "When combined with Vitamin C in acidic conditions, can form trace benzene rings.",
        descriptionHi: "एसिडिक माहौल में हानिकारक तत्वों में बदलने का जोखिम।"
      },
      {
        type: "added_sugar",
        titleEn: "13.2g Sugar per 100ml",
        titleHi: "13.2 ग्राम चीनी प्रति 100ml",
        severity: "high",
        tagValue: "21g Sugar per TetraPak",
        descriptionEn: "A single 160ml pocket pack delivers 5 teaspoons of pure sugar.",
        descriptionHi: "छोटे से पैक में ही 5 चम्मच सफेद चीनी।"
      }
    ],
    nutritionPer100g: {
      calories: "65 kcal",
      protein: "0.1g",
      carbohydrates: "16.2g",
      sugar: "14.5g",
      addedSugar: "13.2g",
      totalFat: "0.0g",
      sodium: "35mg",
      fiber: "0.2g"
    },
    ingredientsList: [
      "Water",
      "Mango Pulp (19.5%)",
      "Sugar",
      "Acidity Regulator (INS 330)",
      "Preservative (INS 211 Sodium Benzoate)",
      "Antioxidant (INS 300)",
      "Permitted Synthetic Food Colour (INS 110)",
      "Added Flavours (Nature Identical Mango Flavour)"
    ],
    ingredientsExplanation: [
      { name: "Water & Sugar", nameHi: "पानी और चीनी", purpose: "Base liquid filler", safety: "hazard" },
      { name: "Mango Pulp (19.5%)", nameHi: "आम का गूदा", purpose: "Fruit flavor and texture", safety: "safe" },
      { name: "INS 110 Sunset Yellow", nameHi: "सिंथेटिक पीला रंग", purpose: "Artificial bright mango illusion", safety: "hazard" },
      { name: "INS 211 Sodium Benzoate", nameHi: "सोडियम बेंजोएट", purpose: "Shelf life extension", safety: "caution" }
    ],
    adulterationCheck: {
      riskLevel: "Low",
      detailsEn: "Legally sold under 'Ready-to-serve fruit beverage', but parents must know it has artificial azo dyes.",
      detailsHi: "बच्चों को पिलाने से पहले कृत्रिम रंगों का ध्यान रखें।"
    },
    cleanerAlternatives: [
      {
        id: "paperboat-aamras",
        name: "Paper Boat 100% Real Aamras (No Artificial Colour)",
        brand: "Paper Boat",
        score: 82,
        reasonEn: "45% Alphonso/Totapuri mango pulp, zero synthetic colours, zero added preservatives.",
        reasonHi: "45% असली आम का पल्प, कोई कृत्रिम रंग नहीं, कोई प्रिजर्वेटिव नहीं।"
      }
    ],
    novaGroup: 4
  },
  {
    id: "pepsi-cola-carbonated-drink",
    barcode: "8902080000043",
    name: "Pepsi Carbonated Soft Drink (Cola)",
    nameHindi: "पेप्सी कार्बोनेटेड सॉफ्ट ड्रिंक (कोला)",
    brand: "PepsiCo India",
    category: "Dairy & Drinks",
    categoryHindi: "डेयरी और पेय",
    imageUrl: "https://images.unsplash.com/photo-1629203851122-3726ecdf080e?w=600&auto=format&fit=crop&q=80",
    healthScore: 16,
    verdict: "Avoid Karein",
    verdictHindi: "बचने की सलाह",
    verdictType: "red",
    summaryEn: "Extreme liquid sugar (10.6g per 100ml / ~35g in a 330ml can = 8.5 teaspoons of sugar), zero protein, zero micronutrients, contains Phosphoric Acid (INS 338) that erodes teeth and depletes calcium, along with Caramel IV (INS 150d) containing trace 4-MEI chemical.",
    summaryHi: "अत्यधिक घुली हुई चीनी (10.6g प्रति 100ml यानी 1 केन में 8-9 चम्मच चीनी), 0% प्रोटीन, दांतों को कमजोर करने वाला फॉस्फोरिक एसिड (INS 338) और केमिकल कैरेमल रंग (INS 150d)। सेहत के लिए अत्यंत नुकसानदेह।",
    isVegetarian: true,
    fssaiNumber: "10012011000120",
    packagingSize: "250ml / 600ml / 750ml",
    warnings: [
      {
        type: "added_sugar",
        titleEn: "Extreme Liquid Sugar (10.6g / 100ml)",
        titleHi: "अत्यधिक तरल चीनी (10.6g / 100ml)",
        severity: "high",
        tagValue: "35g Sugar per Can",
        descriptionEn: "Liquid sucrose / high fructose syrup bypasses satiety triggers, causing instant liver fat accumulation, insulin resistance, and visceral obesity.",
        descriptionHi: "कोल्ड्रिंक में घुली हुई चीनी खून में सीधे मिलकर फैटी लिवर, इंसुलिन रेजिस्टेंस और तेजी से वजन/डायबिटीज बढ़ाती है।"
      },
      {
        type: "artificial_colours",
        titleEn: "Caramel IV Colour (INS 150d)",
        titleHi: "कैरामेलाइज़्ड रंग IV (INS 150d)",
        severity: "high",
        tagValue: "INS 150d Synthetic Color",
        descriptionEn: "Processed under high temperature with ammonia and sulfites, producing trace 4-MEI (4-Methylimidazole), listed as a potential health hazard.",
        descriptionHi: "अमोनिया और सल्फाइट प्रक्रिया से बना कृत्रिम काला रंग, जिसमें हानिकारक 4-MEI केमिकल के अंश होते हैं।"
      },
      {
        type: "preservatives",
        titleEn: "Phosphoric Acid (INS 338)",
        titleHi: "फॉस्फोरिक एसिड (INS 338)",
        severity: "high",
        tagValue: "Acidity Regulator 338",
        descriptionEn: "Acidic pH (~2.5) erodes tooth enamel and alters calcium-phosphorus bone homeostasis over prolonged consumption.",
        descriptionHi: "अत्यधिक अम्लीय (pH 2.5), जो दांतों के इनेमल को गलाता है और हड्डियों से कैल्शियम सोख लेता है।"
      }
    ],
    nutritionPer100g: {
      calories: "43 kcal",
      protein: "0.0g",
      carbohydrates: "10.6g",
      sugar: "10.6g",
      addedSugar: "10.6g",
      totalFat: "0.0g",
      saturatedFat: "0.0g",
      transFat: "0.0g",
      sodium: "12mg",
      fiber: "0.0g"
    },
    ingredientsList: [
      "Carbonated Water",
      "Sugar",
      "Acidity Regulator (INS 338 Phosphoric Acid)",
      "Colour (INS 150d Caramel IV)",
      "Flavours (Natural Flavouring Substances)",
      "Caffeine"
    ],
    ingredientsExplanation: [
      { name: "Carbonated Water", nameHi: "कार्बोनेटेड पानी", purpose: "Fizz and base liquid", safety: "safe" },
      { name: "Sugar (10.6g)", nameHi: "अतिरिक्त सफेद चीनी", purpose: "Intense sweetness & empty calories", safety: "hazard" },
      { name: "INS 338 Phosphoric Acid", nameHi: "फॉस्फोरिक एसिड", purpose: "Tart acid kick (causes dental & bone erosion)", safety: "hazard" },
      { name: "INS 150d Caramel IV", nameHi: "कैरामेलाइज्ड रंग", purpose: "Dark brown cola color (contains 4-MEI)", safety: "hazard" },
      { name: "Caffeine", nameHi: "कैफीन", purpose: "Mild central stimulant", safety: "caution" }
    ],
    adulterationCheck: {
      riskLevel: "Moderate",
      detailsEn: "Legally compliant under carbonated water rules, but zero nutritional value and high metabolic burden.",
      detailsHi: "पोषण मूल्य 0% (शून्य प्रोटीन, शून्य विटामिन), केवल खाली कैलोरी और केमिकल।"
    },
    cleanerAlternatives: [
      {
        id: "fresh-desi-shikanji",
        name: "ताज़ा देसी नींबू पानी / शिकंजी (Fresh Lemon Shikanji)",
        brand: "Home / Fresh Natural",
        score: 96,
        priceEst: "₹15 - ₹30",
        reasonEn: "100% Natural Vitamin C, digestive cumin/rock salt, zero phosphoric acid (INS 338), zero synthetic colors.",
        reasonHi: "100% प्राकृतिक विटामिन C, भुना जीरा व सेंधा नमक। दांतों को गलाने वाले एसिड और केमिकल से पूरी तरह मुक्त।"
      },
      {
        id: "raw-pressery-coconut-water",
        name: "RAW Pressery 100% Tender Coconut Water (ताज़ा नारियल पानी)",
        brand: "RAW Pressery",
        score: 95,
        priceEst: "₹60",
        reasonEn: "100% Natural electrolytes (Potassium, Magnesium), zero added refined sugar, zero preservatives, 0 chemical color.",
        reasonHi: "100% प्राकृतिक नारियल पानी, शून्य अतिरिक्त चीनी, प्राकृतिक इलेक्ट्रोलाइट्स और बिना केमिकल।"
      },
      {
        id: "paper-boat-coconut-water",
        name: "Paper Boat Real Tender Coconut Water",
        brand: "Paper Boat",
        score: 92,
        priceEst: "₹50",
        reasonEn: "Natural source of hydration without harmful phosphoric acid or industrial caramel colors.",
        reasonHi: "हड्डियों और दांतों के लिए सुरक्षित, प्राकृतिक ताजगी।"
      }
    ],
    novaGroup: 4
  },
  {
    id: "coca-cola-original",
    barcode: "8901764012272",
    name: "Coca-Cola Original Taste Carbonated Drink",
    nameHindi: "कोका-कोला ओरिजिनल टेस्ट",
    brand: "The Coca-Cola Company",
    category: "Dairy & Drinks",
    categoryHindi: "डेयरी और पेय",
    imageUrl: "https://images.unsplash.com/photo-1554866585-cd94860890b7?w=600&auto=format&fit=crop&q=80",
    healthScore: 16,
    verdict: "Avoid Karein",
    verdictHindi: "बचने की सलाह",
    verdictType: "red",
    summaryEn: "10.6g sugar per 100ml (35g sugar in a can), 0g protein, with Phosphoric Acid (INS 338) and Caramel IV (INS 150d). Contributes to insulin resistance, dental decay, and metabolic syndrome.",
    summaryHi: "10.6 ग्राम चीनी प्रति 100ml, 0 ग्राम प्रोटीन। फॉस्फोरिक एसिड और केमिकल कैरेमल रंग से युक्त। स्वास्थ्य के लिए बेहद हानिकारक।",
    isVegetarian: true,
    fssaiNumber: "10012011000120",
    packagingSize: "300ml / 750ml",
    warnings: [
      {
        type: "added_sugar",
        titleEn: "Extreme Added Sugar (10.6g / 100ml)",
        titleHi: "अत्यधिक चीनी (10.6g / 100ml)",
        severity: "high",
        tagValue: "10.6g Sugar/100ml",
        descriptionEn: "Massive sugar load causes severe blood glucose surges and visceral fat buildup.",
        descriptionHi: "ब्लड शुगर और इंसुलिन में तेजी से उछाल, फैटी लिवर का मुख्य कारण।"
      },
      {
        type: "artificial_colours",
        titleEn: "Caramel IV (INS 150d)",
        titleHi: "कैरेमल रंग IV (INS 150d)",
        severity: "high",
        tagValue: "Sulfite Ammonia Caramel",
        descriptionEn: "Processed caramel dye containing trace 4-methylimidazole by-products.",
        descriptionHi: "रासायनिक विधि से बना गहरा भूरा रंग।"
      }
    ],
    nutritionPer100g: {
      calories: "44 kcal",
      protein: "0.0g",
      carbohydrates: "10.6g",
      sugar: "10.6g",
      addedSugar: "10.6g",
      totalFat: "0.0g",
      saturatedFat: "0.0g",
      transFat: "0.0g",
      sodium: "10mg",
      fiber: "0.0g"
    },
    ingredientsList: [
      "Carbonated Water",
      "Sugar",
      "Acidity Regulator (INS 338)",
      "Colour (INS 150d)",
      "Natural Flavours",
      "Caffeine"
    ],
    ingredientsExplanation: [
      { name: "Carbonated Water", nameHi: "सोडा पानी", purpose: "Fizz liquid", safety: "safe" },
      { name: "Sugar (10.6g)", nameHi: "सफेद चीनी", purpose: "Sweetener", safety: "hazard" },
      { name: "INS 338", nameHi: "फॉस्फोरिक एसिड", purpose: "Acidity kick", safety: "hazard" },
      { name: "INS 150d", nameHi: "कैरामेलाइज़्ड रंग", purpose: "Dark dye", safety: "hazard" }
    ],
    adulterationCheck: {
      riskLevel: "Moderate",
      detailsEn: "High acidity and pure refined sugar formulation.",
      detailsHi: "अत्यधिक एसिडिक और अत्यधिक मीठा।"
    },
    cleanerAlternatives: [
      {
        id: "fresh-desi-shikanji",
        name: "ताज़ा देसी नींबू पानी / शिकंजी (Fresh Lemon Shikanji)",
        brand: "Home / Fresh Natural",
        score: 96,
        priceEst: "₹15 - ₹30",
        reasonEn: "100% Natural Vitamin C, digestive cumin/rock salt, zero phosphoric acid (INS 338), zero synthetic colors.",
        reasonHi: "100% प्राकृतिक विटामिन C, भुना जीरा व सेंधा नमक। दांतों को गलाने वाले एसिड और केमिकल से पूरी तरह मुक्त।"
      },
      {
        id: "raw-pressery-coconut-water",
        name: "RAW Pressery 100% Tender Coconut Water (ताज़ा नारियल पानी)",
        brand: "RAW Pressery",
        score: 95,
        priceEst: "₹60",
        reasonEn: "Zero chemical acidulants, 100% natural hydration and electrolytes.",
        reasonHi: "प्राकृतिक इलेक्ट्रोलाइट्स और बिना केमिकल की शुद्ध ड्रिंक।"
      }
    ],
    novaGroup: 4
  },
  {
    id: "harvest-gold-white-bread",
    barcode: "8906001020012",
    name: "Harvest Gold White Bread (Sandwich Bread)",
    nameHindi: "हार्वेस्ट गोल्ड व्हाइट ब्रेड (सैंडविच ब्रेड)",
    brand: "Harvest Gold (Grupo Bimbo)",
    category: "Bread & Bakery",
    categoryHindi: "ब्रेड और बेकरी",
    imageUrl: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&auto=format&fit=crop&q=80",
    healthScore: 28,
    verdict: "Avoid Karein",
    verdictHindi: "बचने की सलाह",
    verdictType: "red",
    summaryEn: "Formulated with 76% Refined Wheat Flour (Maida), Palm Oil, Class II Preservatives (INS 282), and chemical dough conditioners (INS 471/481). High glycemic index triggers rapid blood sugar and insulin spikes.",
    summaryHi: "76% मैदा, पाम ऑयल, केमिकल प्रिजर्वेटिव (INS 282) और इमल्सीफायर से तैयार। फाइबर की कमी के कारण ब्लड शुगर और इंसुलिन तेजी से बढ़ता है।",
    isVegetarian: true,
    fssaiNumber: "10012011000109",
    packagingSize: "400g / 700g",
    warnings: [
      {
        type: "maida",
        titleEn: "76% Refined Wheat Flour (Maida)",
        titleHi: "76% मैदा (रिफाइंड आटा)",
        severity: "high",
        tagValue: "76% Maida Base",
        descriptionEn: "Stripped of whole wheat bran and germ, leaving only pure starch that converts rapidly to glucose.",
        descriptionHi: "बिना चोकर का रिफाइंड आटा जो आंतों में चिपकता है और पाचन को सुस्त बनाता है।"
      },
      {
        type: "palm_oil",
        titleEn: "Refined Palm Oil Shortening",
        titleHi: "रिफाइंड पाम ऑयल",
        severity: "high",
        tagValue: "Palm Fat Shortening",
        descriptionEn: "Used to soften bread crumb and reduce production cost. High in saturated palmitic acid.",
        descriptionHi: "ब्रेड को मुलायम रखने के लिए पाम फैट का उपयोग जो बैड कोलेस्ट्रॉल बढ़ाता है।"
      },
      {
        type: "preservatives",
        titleEn: "INS 282 Calcium Propionate & INS 481",
        titleHi: "केमिकल प्रिजर्वेटिव INS 282 और इमल्सीफायर",
        severity: "medium",
        tagValue: "INS 282 / 471 / 481",
        descriptionEn: "Chemical mould inhibitors and crumb softeners that may trigger gut microbiome imbalances.",
        descriptionHi: "फफूंद रोकने के लिए डाले जाने वाले केमिकल एडिटिव्स।"
      }
    ],
    nutritionPer100g: {
      calories: "258 kcal",
      protein: "7.8g",
      carbohydrates: "51.2g",
      sugar: "4.5g",
      addedSugar: "3.5g",
      totalFat: "2.4g",
      saturatedFat: "1.1g",
      transFat: "0.0g",
      sodium: "490mg",
      fiber: "1.2g"
    },
    ingredientsList: [
      "Refined Wheat Flour (Maida 76%)",
      "Water",
      "Sugar",
      "Yeast",
      "Edible Vegetable Fat (Palm Oil)",
      "Iodised Salt",
      "Soya Flour",
      "Emulsifiers (INS 471, INS 481(i))",
      "Preservative (INS 282)",
      "Acidity Regulator (INS 260)",
      "Flour Treatment Agent (INS 1100(i))"
    ],
    ingredientsExplanation: [
      { name: "Maida (76%)", nameHi: "मैदा", purpose: "Cheap bulk refined flour with zero wheat bran", safety: "hazard" },
      { name: "Palm Oil", nameHi: "पाम तेल", purpose: "Crumb softness and shelf stabilization", safety: "hazard" },
      { name: "INS 282 (Calcium Propionate)", nameHi: "कैल्शियम प्रोपियोनेट", purpose: "Anti-fungal preservative", safety: "caution" },
      { name: "INS 481 (Sodium Stearoyl Lactylate)", nameHi: "डफ कंडीशनर", purpose: "Synthetic texture enhancer", safety: "caution" },
      { name: "Yeast & Salt", nameHi: "यीस्ट व नमक", purpose: "Natural fermentation & seasoning", safety: "safe" }
    ],
    adulterationCheck: {
      riskLevel: "Low",
      detailsEn: "Manufactured under industrial hygiene norms, but chemically preserved refined maida profile.",
      detailsHi: "औद्योगिक रूप से तैयार, लेकिन मैदा और प्रिजर्वेटिव्स से भरपूर।"
    },
    cleanerAlternatives: [
      {
        id: "the-health-factory-zero-maida-bread",
        name: "The Health Factory Zero Maida Whole Wheat Bread",
        brand: "The Health Factory",
        score: 94,
        priceEst: "₹55",
        reasonEn: "100% Whole Wheat Flour, 0% Maida, 0% Palm Oil, zero chemical bleaching or caramel color INS 150d.",
        reasonHi: "100% साबुत गेहूं का आटा, शून्य मैदा, शून्य पाम ऑयल, बिना हानिकारक ब्लीच या कैरेमल कलर के तैयार।",
        tags: ["Zero Maida", "100% Whole Wheat", "No Palm Oil"]
      },
      {
        id: "the-bakers-dozen-wholewheat-sourdough",
        name: "The Baker's Dozen 100% Wholewheat Sourdough Loaf",
        brand: "The Baker's Dozen",
        score: 96,
        priceEst: "₹79",
        reasonEn: "Naturally slow-fermented with wild sourdough starter. No chemical emulsifiers (INS 471/481) or artificial preservatives.",
        reasonHi: "प्राकृतिक खमीर (Sourdough) से फर्मेंटेड। केमिकल इमल्सीफायर और प्रिजर्वेटिव्स से पूरी तरह मुक्त।",
        tags: ["Natural Sourdough", "Gut Friendly", "Chemical Free"]
      },
      {
        id: "english-oven-atta-bread",
        name: "English Oven 100% Atta Bread",
        brand: "English Oven",
        score: 86,
        priceEst: "₹50",
        reasonEn: "Made with genuine whole wheat flour; higher dietary fiber compared to commercial white maida bread.",
        reasonHi: "साबुत गेहूं के आटे से निर्मित, सामान्य सफेद ब्रेड की तुलना में अधिक पाचक फाइबर।",
        tags: ["High Fiber", "Whole Wheat", "Clean Toasting"]
      }
    ],
    novaGroup: 4
  },
  {
    id: "britannia-100-whole-wheat-bread",
    barcode: "8901063141128",
    name: "Britannia 100% Whole Wheat Bread (Brown Bread)",
    nameHindi: "ब्रिटानिया 100% होल व्हीट ब्रेड (ब्राउन ब्रेड)",
    brand: "Britannia Industries",
    category: "Bread & Bakery",
    categoryHindi: "ब्रेड और बेकरी",
    imageUrl: "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=600&auto=format&fit=crop&q=80",
    healthScore: 64,
    verdict: "Soch Samajh Kar",
    verdictHindi: "सोच समझ कर",
    verdictType: "yellow",
    summaryEn: "Better than white bread because it uses whole wheat flour, but contains added refined Palm Oil, INS 150d Caramel color (to darken the brown shade), and class II chemical preservatives.",
    summaryHi: "सफेद ब्रेड से बेहतर क्योंकि इसमें गेहूं का आटा है, लेकिन ब्रेड को गहरा भूरा दिखाने के लिए कैरेमल रंग (INS 150d), पाम ऑयल और प्रिजर्वेटिव्स मिलाए गए हैं।",
    isVegetarian: true,
    fssaiNumber: "10015043001129",
    packagingSize: "400g",
    warnings: [
      {
        type: "palm_oil",
        titleEn: "Contains Refined Palm Oil",
        titleHi: "रिफाइंड पाम ऑयल",
        severity: "medium",
        tagValue: "Refined Palm Fat",
        descriptionEn: "Added vegetable fat shortening for moisture retention and longer commercial shelf life.",
        descriptionHi: "नमी और शेल्फ लाइफ बढ़ाने के लिए पाम फैट का उपयोग।"
      },
      {
        type: "preservatives",
        titleEn: "Caramel IV (INS 150d) & Preservatives",
        titleHi: "कैरेमल रंग (INS 150d) व प्रिजर्वेटिव्स",
        severity: "medium",
        tagValue: "INS 150d Color",
        descriptionEn: "Synthetic dark caramel dye added to create a deep wholesome brown appearance.",
        descriptionHi: "ब्रेड को 'ब्राउन' रंग देने के लिए कैरेमल कलर का इस्तेमाल।"
      }
    ],
    nutritionPer100g: {
      calories: "245 kcal",
      protein: "8.5g",
      carbohydrates: "46.0g",
      sugar: "3.8g",
      addedSugar: "2.8g",
      totalFat: "2.8g",
      saturatedFat: "1.2g",
      transFat: "0.0g",
      sodium: "460mg",
      fiber: "5.5g"
    },
    ingredientsList: [
      "Whole Wheat Flour (Atta 55%)",
      "Water",
      "Sugar",
      "Yeast",
      "Edible Vegetable Oil (Palmolein)",
      "Iodised Salt",
      "Caramel Color (INS 150d)",
      "Emulsifiers (INS 471, INS 481(i))",
      "Preservative (INS 282)",
      "Acidity Regulator (INS 270)"
    ],
    ingredientsExplanation: [
      { name: "Whole Wheat Flour (Atta)", nameHi: "साबुत गेहूं आटा", purpose: "Grain base with dietary fiber", safety: "safe" },
      { name: "INS 150d (Caramel IV)", nameHi: "कैरेमल रंग", purpose: "Synthetic brown coloring", safety: "caution" },
      { name: "Palm Oil", nameHi: "पाम तेल", purpose: "Shortening agent", safety: "caution" },
      { name: "INS 282", nameHi: "प्रिजर्वेटिव", purpose: "Mould inhibitor", safety: "caution" }
    ],
    adulterationCheck: {
      riskLevel: "Low",
      detailsEn: "Complies with FSSAI whole wheat naming regulations.",
      detailsHi: "एफएसएसएआई मानकों पर आधारित।"
    },
    cleanerAlternatives: [
      {
        id: "the-health-factory-zero-maida-bread",
        name: "The Health Factory Zero Maida Whole Wheat Bread",
        brand: "The Health Factory",
        score: 94,
        priceEst: "₹55",
        reasonEn: "100% Whole Wheat Flour, 0% Maida, 0% Palm Oil, zero chemical bleach or caramel color INS 150d.",
        reasonHi: "100% साबुत गेहूं का आटा, शून्य मैदा, शून्य पाम ऑयल, बिना हानिकारक ब्लीच या कैरेमल कलर के तैयार।",
        tags: ["Zero Maida", "100% Whole Wheat", "No Palm Oil"]
      },
      {
        id: "the-bakers-dozen-wholewheat-sourdough",
        name: "The Baker's Dozen 100% Wholewheat Sourdough Loaf",
        brand: "The Baker's Dozen",
        score: 96,
        priceEst: "₹79",
        reasonEn: "Naturally slow-fermented with wild sourdough starter. No chemical emulsifiers (INS 471/481) or artificial preservatives.",
        reasonHi: "प्राकृतिक खमीर (Sourdough) से फर्मेंटेड। केमिकल इमल्सीफायर और प्रिजर्वेटिव्स से पूरी तरह मुक्त।",
        tags: ["Natural Sourdough", "Gut Friendly", "Chemical Free"]
      }
    ],
    novaGroup: 3
  }
];
