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
    summaryEn: "As declared on package label: Contains refined wheat flour (maida), palm oil (15.7% total fat), and 1250mg sodium per 100g (~52% of daily limit per pack) along with INS 635 flavor enhancer.",
    summaryHi: "पैकेट पर घोषित पोषण लेबल अनुसार: इसमें मुख्य रूप से मैदा, पाम ऑयल (15.7% फैट) और 1250mg सोडियम प्रति 100g दर्ज है। ICMR दिशानिर्देशों के अनुसार इसका नियमित सेवन सीमित रखने की सलाह है।",
    isVegetarian: true,
    fssaiNumber: "10012011000168",
    packagingSize: "70g / 140g",
    warnings: [
      {
        type: "palm_oil",
        titleEn: "Refined Palm Oil Base",
        titleHi: "रिफाइंड पाम तेल",
        severity: "high",
        tagValue: "15.7g Fat / 100g",
        descriptionEn: "Contains saturated fatty acids (6.8g per 100g) from refined palm oil used in frying noodle cakes.",
        descriptionHi: "पैकेट अनुसार इसमें पाम तेल से प्राप्त संतृप्त वसा (सैचुरेटेड फैट) की मात्रा अधिक है।"
      },
      {
        type: "maida",
        titleEn: "Refined Wheat Flour (Maida)",
        titleHi: "मैदा (रिफाइंड आटा)",
        severity: "high",
        tagValue: "Maida Base",
        descriptionEn: "Refined grain with low dietary fiber content (2.1g per 100g).",
        descriptionHi: "रिफाइंड आटा जिसमें प्राकृतिक चोकर (फाइबर) की मात्रा कम होती है।"
      },
      {
        type: "sodium",
        titleEn: "High Sodium Content",
        titleHi: "अधिक सोडियम (नमक)",
        severity: "high",
        tagValue: "1250mg Sodium / 100g",
        descriptionEn: "A single pack delivers approximately half of the daily recommended sodium intake limit.",
        descriptionHi: "एक सर्विंग में दैनिक अनुशंसित सोडियम सीमा का लगभग 50% हिस्सा शामिल है।"
      },
      {
        type: "preservatives",
        titleEn: "INS 635 Flavour Enhancers",
        titleHi: "INS 635 फ्लेवर एन्हांसर",
        severity: "medium",
        tagValue: "INS 635 / INS 508",
        descriptionEn: "Disodium 5'-ribonucleotides added as permitted savory flavor enhancer.",
        descriptionHi: "स्वाद बढ़ाने के लिए अनुमत फ्लेवर एन्हांसर का उपयोग।"
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
      { name: "Maida (Refined Flour)", nameHi: "मैदा", purpose: "Primary carbohydrate starch base", safety: "hazard" },
      { name: "Palm Oil", nameHi: "पाम तेल", purpose: "Noodle cake frying fat", safety: "hazard" },
      { name: "INS 635", nameHi: "फ्लेवर एन्हांसर", purpose: "Disodium ribonucleotide flavor enhancer", safety: "caution" },
      { name: "INS 451(i)", nameHi: "पेंटासोडियम ट्राइफॉस्फेट", purpose: "Permitted humectant & stabilizer", safety: "caution" },
      { name: "Iodised Salt", nameHi: "नमक", purpose: "Seasoning and preservation", safety: "safe" }
    ],
    adulterationCheck: {
      riskLevel: "Low",
      detailsEn: "Packaged according to standard FSSAI norms with declared nutritional facts.",
      detailsHi: "FSSAI मानकों अनुसार निर्मित एवं घोषित पोषण लेबल युक्त।"
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
    summaryEn: "As declared on package label: Contains Palmolein oil (35% total fat), 920mg sodium per 100g, and permitted flavor enhancers (INS 627, INS 631).",
    summaryHi: "पैकेट पर घोषित लेबल अनुसार: इसमें पामोलिन तेल (35% फैट), 920mg सोडियम प्रति 100g और फ्लेवर एन्हांसर (INS 627, INS 631) शामिल हैं। आहार मानकों अनुसार संयमित सेवन करें।",
    isVegetarian: true,
    fssaiNumber: "10014064000435",
    packagingSize: "90g",
    warnings: [
      {
        type: "palm_oil",
        titleEn: "Palmolein Oil Frying Base",
        titleHi: "पामोलिन ऑयल बेस",
        severity: "high",
        tagValue: "35% Fat (Palm)",
        descriptionEn: "High total fat and saturated fat content (15g saturated fat per 100g) as declared on packaging.",
        descriptionHi: "पैकेट अनुसार 35% वसा, जिसमें 15% संतृप्त वसा (सैचुरेटेड फैट) शामिल है।"
      },
      {
        type: "sodium",
        titleEn: "High Sodium Content",
        titleHi: "अधिक सोडियम (नमक)",
        severity: "high",
        tagValue: "920mg Sodium / 100g",
        descriptionEn: "Contains 920mg sodium per 100g, contributing significantly to daily salt intake.",
        descriptionHi: "प्रति 100 ग्राम 920mg सोडियम, जो दैनिक अनुशंसित मात्रा का बड़ा हिस्सा है।"
      },
      {
        type: "preservatives",
        titleEn: "INS 627 & INS 631 Flavour Enhancers",
        titleHi: "INS 627 व 631 फ्लेवर एन्हांसर",
        severity: "medium",
        tagValue: "INS 627 / 631",
        descriptionEn: "Permitted nucleotide flavor potentiators added for enhanced savory taste profile.",
        descriptionHi: "चटपटा स्वाद बढ़ाने हेतु अनुमोदित फ्लेवर एन्हांसर एडिटिव्स।"
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
      { name: "Palmolein Oil", nameHi: "पामोलिन तेल", purpose: "Deep frying fat medium", safety: "hazard" },
      { name: "Rice & Corn Meal", nameHi: "चावल और मक्का का चूरा", purpose: "Extruded crunchy puffs base", safety: "safe" },
      { name: "INS 627 / 631", nameHi: "गुआनाइलेट और इनोसिनेट", purpose: "Permitted flavor enhancers", safety: "caution" },
      { name: "Citric Acid (INS 330)", nameHi: "साइट्रिक एसिड", purpose: "Acidity regulator for tangy flavor", safety: "safe" }
    ],
    adulterationCheck: {
      riskLevel: "Low",
      detailsEn: "Manufactured under industrial hygiene norms with standardized labeling.",
      detailsHi: "FSSAI मानकों के अनुरूप निर्मित।"
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
    summaryEn: "As declared on package label: Formulated with 67% refined wheat flour (maida), 26.5% total sugar, invert sugar syrup, and refined palm oil.",
    summaryHi: "पैकेट पर घोषित सामग्री अनुसार: इसमें 67% मैदा, 26.5% चीनी, इनवर्ट शुगर सिरप और पाम ऑयल दर्ज है। स्वास्थ्य मानकों अनुसार इसका सीमित सेवन उचित है।",
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
        descriptionEn: "Contains refined wheat flour stripped of natural bran and fiber.",
        descriptionHi: "रिफाइंड गेहूं का आटा जिसमें फाइबर की मात्रा 1.2% होती है।"
      },
      {
        type: "added_sugar",
        titleEn: "26.5% Sugar & Invert Syrup",
        titleHi: "26.5% चीनी व इनवर्ट सिरप",
        severity: "high",
        tagValue: "26.5g Sugar / 100g",
        descriptionEn: "High added sugar content contributing 26g simple carbohydrates per 100g.",
        descriptionHi: "प्रति 100 ग्राम में 26.5 ग्राम शर्करा की मात्रा घोषित है।"
      },
      {
        type: "palm_oil",
        titleEn: "Refined Palm Oil Shortening",
        titleHi: "रिफाइंड पाम ऑयल",
        severity: "medium",
        tagValue: "Vegetable Fat (Palm)",
        descriptionEn: "Vegetable fat shortening used for biscuit crispness and shelf stability.",
        descriptionHi: "बिस्कुट को खस्ता रखने के लिए पाम फैट का उपयोग।"
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
      { name: "Sugar & Invert Syrup", nameHi: "चीनी और चाशनी", purpose: "Sweetening ingredients", safety: "hazard" },
      { name: "INS 223 (Sodium Metabisulphite)", nameHi: "सोडियम मेटाबाइसल्फाइट", purpose: "Dough conditioner", safety: "caution" },
      { name: "INS 503(ii)", nameHi: "अमोनियम बाइकार्बोनेट", purpose: "Permitted leavening agent", safety: "safe" }
    ],
    adulterationCheck: {
      riskLevel: "Low",
      detailsEn: "Fully compliant with FSSAI packaged biscuit regulations.",
      detailsHi: "FSSAI मानकों पर आधारित।"
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
    summaryEn: "As declared on package label: 100% Whole Wheat Grain with intact dietary bran and natural germ. Contains 11.2g dietary fiber per 100g, 0 added preservatives, and 0 palm oil.",
    summaryHi: "पैकेट पर घोषित लेबल अनुसार: 100% संपूर्ण गेहूं से चक्की पीसा आटा, जिसमें 11.2g प्राकृतिक चोकर (फाइबर) शामिल है। शून्य मैदा, शून्य प्रिजर्वेटिव्स।",
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
    summaryEn: "As declared on package label: Refined sunflower oil fortified with Vitamin A & D. Contains permitted antioxidant TBHQ (INS 319). High in polyunsaturated fatty acids.",
    summaryHi: "पैकेट पर घोषित लेबल अनुसार: विटामिन A और D से फोर्टिफाइड रिफाइंड सूरजमुखी तेल। इसमें एंटीऑक्सीडेंट TBHQ (INS 319) शामिल है। संतुलित आहार में संयमित उपयोग करें।",
    isVegetarian: true,
    fssaiNumber: "10013021000810",
    packagingSize: "1 Litre Pouch",
    warnings: [
      {
        type: "palm_oil",
        titleEn: "Refined Edible Oil Process",
        titleHi: "रिफाइंड खाद्य तेल",
        severity: "medium",
        tagValue: "Refined Sunflower Oil",
        descriptionEn: "Processed using industrial refining and deodorization to achieve neutral aroma and high smoke point.",
        descriptionHi: "मानकीकृत औद्योगिक रिफाइनिंग प्रक्रिया द्वारा तैयार।"
      },
      {
        type: "trans_fat",
        titleEn: "High Omega-6 PUFA Content",
        titleHi: "ओमेगा-6 फैटी एसिड",
        severity: "medium",
        tagValue: "High Polyunsaturated Fat",
        descriptionEn: "High in polyunsaturated fatty acids; dietary guidelines recommend balancing with Omega-3 and MUFA sources.",
        descriptionHi: "पॉलीअनसैचुरेटेड वसा से युक्त, जिसे अन्य तेलों (जैसे सरसों, घी) के साथ संतुलित करने की सलाह दी जाती है।"
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
      { name: "Refined Sunflower Oil", nameHi: "रिफाइंड सूरजमुखी तेल", purpose: "Cooking fat medium", safety: "caution" },
      { name: "TBHQ (INS 319)", nameHi: "टीबीएचक्यू प्रिजर्वेटिव", purpose: "Permitted antioxidant to stabilize shelf life", safety: "caution" },
      { name: "INS 900a (Dimethylpolysiloxane)", nameHi: "एंटी-फोमिंग एजेंट", purpose: "Permitted anti-foaming agent", safety: "safe" }
    ],
    adulterationCheck: {
      riskLevel: "Low",
      detailsEn: "Meets FSSAI standards for fortified edible vegetable oils.",
      detailsHi: "FSSAI खाद्य सुरक्षा मानकों के अनुरूप।"
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
    summaryEn: "As declared on package label: 100% Pure Milk Fat with zero preservatives, zero added colors, and zero trans fats. Prepared from fresh milk cream.",
    summaryHi: "पैकेट पर घोषित लेबल अनुसार: 100% शुद्ध दूध की मलाई से तैयार। शून्य प्रिजर्वेटिव्स, शून्य रंग और शून्य ट्रांस फैट।",
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
    summaryEn: "As declared on package label: Contains 18.6% mixed fruit concentrate reconstituted in water, with 13.5g total sugar (11.8g added sugar) per 100ml and under 0.2g dietary fiber. Dietary guidelines suggest moderating regular intake of high-sugar beverages.",
    summaryHi: "पैकेट पर घोषित पोषण लेबल अनुसार: इसमें 18.6% मिक्स्ड फ्रूट कंसंट्रेट, पानी और 11.8 ग्राम अतिरिक्त चीनी प्रति 100ml दर्ज है। फाइबर कम (0.1g) होने के कारण ICMR/FSSAI दिशानिर्देशों अनुसार इसका नियमित सेवन सीमित रखना उचित है।",
    isVegetarian: true,
    fssaiNumber: "10012051000003",
    packagingSize: "1 Litre TetraPak",
    warnings: [
      {
        type: "added_sugar",
        titleEn: "13.5g Sugar per 100ml",
        titleHi: "13.5 ग्राम चीनी प्रति 100ml",
        severity: "high",
        tagValue: "11.8g Added Sugar / 100ml",
        descriptionEn: "Contains 11.8g added sugar per 100ml as declared in the nutritional information panel.",
        descriptionHi: "पैकेट के पोषण चार्ट अनुसार प्रति 100ml में 11.8 ग्राम अतिरिक्त चीनी दर्ज है।"
      },
      {
        type: "preservatives",
        titleEn: "Acidity Regulators (INS 330) & Stabilizers",
        titleHi: "एसिडिटी रेगुलेटर (INS 330) व स्टेबलाइजर",
        severity: "medium",
        tagValue: "INS 330 / INS 440",
        descriptionEn: "Reconstituted from fruit concentrate with permitted acidity regulators and stabilizers.",
        descriptionHi: "फ्रूट कंसंट्रेट आधारित पेय जिसमें अनुमत स्टेबलाइजर व साइट्रिक एसिड शामिल हैं।"
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
      { name: "Water & Sugar", nameHi: "पानी और चीनी", purpose: "Base liquid and sweetening ingredients", safety: "hazard" },
      { name: "Fruit Concentrate (18.6%)", nameHi: "फ्रूट कंसंट्रेट", purpose: "Reconstituted fruit juice blend", safety: "safe" },
      { name: "INS 330 (Citric Acid)", nameHi: "साइट्रिक एसिड", purpose: "Permitted acidity regulator", safety: "safe" },
      { name: "INS 300 (Ascorbic Acid)", nameHi: "विटामिन सी", purpose: "Antioxidant nutrient", safety: "safe" }
    ],
    adulterationCheck: {
      riskLevel: "Low",
      detailsEn: "Meets FSSAI standards for ready-to-serve fruit beverages.",
      detailsHi: "FSSAI रेडी-टू-सर्व फ्रूट बेवरेज मानकों के अनुरूप।"
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
    summaryEn: "As declared on package label: Contains 18.5g added sugar (sucrose) per 100g (~7.5g added sugar per serving), along with wheat flour, milk solids, and vegetable oils. Standard pediatric guidelines recommend minimizing added sucrose in infant foods under 2 years.",
    summaryHi: "पैकेट पर घोषित पोषण लेबल अनुसार: इसमें प्रति 100 ग्राम 18.5 ग्राम अतिरिक्त चीनी (सुक्रोज) दर्ज है। बाल रोग विशेषज्ञों एवं FSSAI दिशानिर्देशों के अनुसार 2 वर्ष से कम आयु के शिशुओं के आहार में अतिरिक्त चीनी सीमित रखने की सलाह दी जाती है।",
    isVegetarian: true,
    fssaiNumber: "10012011000168",
    packagingSize: "300g Bib Box",
    warnings: [
      {
        type: "added_sugar",
        titleEn: "Added Sucrose Content",
        titleHi: "अतिरिक्त चीनी (सुक्रोज)",
        severity: "high",
        tagValue: "18.5g Added Sugar / 100g",
        descriptionEn: "Contains added sucrose (18.5g per 100g) in addition to natural milk sugars.",
        descriptionHi: "प्राकृतिक दूध शर्करा के अतिरिक्त 18.5g अतिरिक्त चीनी घोषित है।"
      },
      {
        type: "palm_oil",
        titleEn: "Vegetable Fat Blend",
        titleHi: "वेजिटेबल फैट मिश्रण",
        severity: "medium",
        tagValue: "Vegetable Oil Blend",
        descriptionEn: "Contains soybean and corn vegetable oils for lipid fortification.",
        descriptionHi: "पोषण संतुलन हेतु सोयाबीन व मक्का तेल का उपयोग।"
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
      { name: "Sugar / Sucrose", nameHi: "अतिरिक्त चीनी", purpose: "Sweetening ingredient", safety: "hazard" },
      { name: "Milk Solids", nameHi: "मिल्क पाउडर", purpose: "Protein and dairy calcium source", safety: "safe" },
      { name: "Apple Juice Concentrate", nameHi: "एप्पल जूस कंसंट्रेट", purpose: "Flavor and natural fruit sugars", safety: "caution" }
    ],
    adulterationCheck: {
      riskLevel: "Low",
      detailsEn: "Meets FSSAI infant cereal standards with complete vitamin-mineral fortification declarations.",
      detailsHi: "FSSAI शिशु आहार मानकों के अनुरूप निर्मित।"
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
    summaryEn: "As declared on package label: Contains 58% refined wheat flour (maida), 24% added sugar, 23.5% vegetable fat (refined palm oil), and 2% dairy butter. Dietary guidelines suggest moderating high-fat, high-sugar baked snacks.",
    summaryHi: "पैकेट पर घोषित सामग्री अनुसार: इसमें 58% मैदा, 24% अतिरिक्त चीनी, रिफाइंड पाम ऑयल (23.5% फैट) और 2% मक्खन दर्ज है। संतुलित आहार में इसका सीमित उपयोग करें।",
    isVegetarian: true,
    fssaiNumber: "10015043001129",
    packagingSize: "200g / 100g",
    warnings: [
      {
        type: "palm_oil",
        titleEn: "Refined Palm Fat Base",
        titleHi: "रिफाइंड पाम फैट बेस",
        severity: "high",
        tagValue: "23.5% Fat (2% Butter)",
        descriptionEn: "Primary shortening fat is refined palm oil, supplemented with 2% dairy butter.",
        descriptionHi: "पैकेट अनुसार 23.5% कुल वसा में मुख्य घटक पाम ऑयल और 2% मक्खन है।"
      },
      {
        type: "maida",
        titleEn: "Refined Flour Base (Maida)",
        titleHi: "मैदा (रिफाइंड आटा)",
        severity: "high",
        tagValue: "58% Maida",
        descriptionEn: "Refined flour formulation with low dietary fiber (1.5g per 100g).",
        descriptionHi: "रिफाइंड आटा जिसमें पाचक फाइबर की मात्रा कम होती है।"
      },
      {
        type: "added_sugar",
        titleEn: "24.5g Added Sugar / 100g",
        titleHi: "24.5 ग्राम चीनी प्रति 100g",
        severity: "high",
        tagValue: "24g Added Sugar",
        descriptionEn: "High added sugar content contributing 24g simple carbohydrates per 100g.",
        descriptionHi: "पैकेट पर प्रति 100 ग्राम 24 ग्राम अतिरिक्त चीनी घोषित है।"
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
      { name: "Palm Oil & 2% Butter", nameHi: "पाम तेल व 2% मक्खन", purpose: "Shortening fats", safety: "hazard" },
      { name: "Sugar & Invert Syrup", nameHi: "चीनी", purpose: "Sweetening ingredients", safety: "hazard" },
      { name: "INS 322 / INS 471", nameHi: "सोया लेसिथिन", purpose: "Permitted emulsifiers", safety: "safe" }
    ],
    adulterationCheck: {
      riskLevel: "Low",
      detailsEn: "Complies with FSSAI regulations for packaged bakery products.",
      detailsHi: "FSSAI पैकेज्ड बेकरी मानकों के अनुरूप।"
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
    summaryEn: "As declared on package label: 100% Whole Spice blend with no added MSG, no synthetic colours, and no starch fillers. Packaged in compliance with FSSAI standards.",
    summaryHi: "पैकेट पर घोषित सामग्री अनुसार: 100% साबुत मसालों का प्रामाणिक मिश्रण। कोई अतिरिक्त कृत्रिम रंग या स्टार्च मिलावट नहीं। FSSAI मानकों के अनुरूप।",
    isVegetarian: true,
    fssaiNumber: "10012022000055",
    packagingSize: "100g Box",
    warnings: [
      {
        type: "glyphosate",
        titleEn: "Quality & Pesticide Monitoring",
        titleHi: "गुणवत्ता व कीटनाशक निगरानी",
        severity: "low",
        tagValue: "FSSAI Monitored",
        descriptionEn: "FSSAI mandates regular pesticide residue monitoring in Indian spice manufacturing.",
        descriptionHi: "भारतीय मसालों में FSSAI द्वारा नियमित गुणवत्ता एवं अवशेष मानकों की निगरानी की जाती है।"
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
      { name: "Whole Indian Spices", nameHi: "प्राकृतिक साबुत मसाले", purpose: "Aromatic spice blend with natural essential oils", safety: "safe" }
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
        price: "₹45",
        priceEst: "₹45",
        benefit: "100% Organic, Zero Chemical Pesticides",
        tags: ["100% Organic", "Zero ETO Residue"],
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
    summaryEn: "As declared on package label: Fried in edible vegetable oil (Palmolein & Cottonseed oil, 42% total fat), with 582 kcal per 100g and 880mg sodium. Dietary guidelines recommend moderating high-fat, high-sodium fried snacks.",
    summaryHi: "पैकेट पर घोषित पोषण लेबल अनुसार: इसमें 42% वसा (पामोलिन व बिनौला तेल), 582 कैलोरी और 880mg सोडियम प्रति 100g दर्ज है। पोषण मानकों अनुसार इसका सीमित मात्रा में सेवन उचित है।",
    isVegetarian: true,
    fssaiNumber: "10012012000180",
    packagingSize: "200g / 400g",
    warnings: [
      {
        type: "palm_oil",
        titleEn: "42% Vegetable Fat (Palm & Cottonseed)",
        titleHi: "42% खाद्य तेल (पामोलिन व बिनौला)",
        severity: "high",
        tagValue: "42g Fat per 100g",
        descriptionEn: "Contains 42g total fat and 18g saturated fat per 100g as stated on the nutritional label.",
        descriptionHi: "पैकेट अनुसार इसमें 42% कुल वसा और 18% संतृप्त वसा शामिल है।"
      },
      {
        type: "sodium",
        titleEn: "High Sodium Seasoning",
        titleHi: "अधिक सोडियम (नमक)",
        severity: "high",
        tagValue: "880mg Sodium / 100g",
        descriptionEn: "Contains 880mg sodium per 100g from iodized salt and spice seasoning.",
        descriptionHi: "प्रति 100 ग्राम 880mg सोडियम दर्ज है।"
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
      { name: "Palmolein / Cottonseed Oil", nameHi: "पामोलिन व बिनौला तेल", purpose: "Frying oil fat medium (42%)", safety: "hazard" },
      { name: "Indian Spices", nameHi: "मसाले", purpose: "Chaat masala seasoning", safety: "safe" }
    ],
    adulterationCheck: {
      riskLevel: "Low",
      detailsEn: "Manufactured under industrial hygiene norms with standardized labeling.",
      detailsHi: "FSSAI मानकों के अनुरूप निर्मित।"
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
    summaryEn: "As declared on package label: Contains Palmolein oil (35.5% total fat), 980mg sodium per 100g, and permitted flavor enhancers (INS 627, 631, 635). In accordance with ICMR dietary benchmarks, regular intake of high-sodium snacks should be moderated.",
    summaryHi: "पैकेट पर घोषित पोषण लेबल अनुसार: इसमें पामोलिन तेल (35.5% फैट), 980mg सोडियम प्रति 100g और अनुमत फ्लेवर एन्हांसर (INS 627, 631, 635) दर्ज हैं। ICMR दिशानिर्देशों अनुसार इसका संयमित सेवन करें।",
    isVegetarian: true,
    fssaiNumber: "10014064000435",
    packagingSize: "50g / 115g",
    warnings: [
      {
        type: "palm_oil",
        titleEn: "Palmolein Oil Frying Base",
        titleHi: "पामोलिन तेल बेस",
        severity: "high",
        tagValue: "35.5% Fat (Palm)",
        descriptionEn: "Contains 35.5g fat and 15g saturated fat per 100g from refined palmolein oil.",
        descriptionHi: "पैकेट अनुसार 35.5% वसा, जिसमें 15% संतृप्त वसा घोषित है।"
      },
      {
        type: "sodium",
        titleEn: "High Sodium Content",
        titleHi: "अधिक सोडियम",
        severity: "high",
        tagValue: "980mg Sodium / 100g",
        descriptionEn: "High sodium concentration contributing 980mg per 100g.",
        descriptionHi: "प्रति 100 ग्राम 980mg सोडियम सामग्री दर्ज है।"
      },
      {
        type: "preservatives",
        titleEn: "Flavour Enhancers (627, 631, 635)",
        titleHi: "फ्लेवर एन्हांसर (INS 627/631/635)",
        severity: "high",
        tagValue: "INS 627 + 631 + 635",
        descriptionEn: "Permitted ribonucleotide additives used to augment savory potato seasoning.",
        descriptionHi: "मसालेदार स्वाद को बढ़ाने वाले अनुमत फ्लेवर एडिटिव्स।"
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
      { name: "Potato", nameHi: "आलू", purpose: "Base potato slice", safety: "safe" },
      { name: "Palmolein Oil", nameHi: "पामोलिन तेल", purpose: "Deep frying fat medium", safety: "hazard" },
      { name: "INS 635/627/631", nameHi: "फ्लेवर एन्हांसर", purpose: "Permitted flavor enhancers", safety: "hazard" },
      { name: "INS 160c (Paprika Extract)", nameHi: "लाल शिमला मिर्च का रंग", purpose: "Natural red-orange color", safety: "safe" }
    ],
    adulterationCheck: {
      riskLevel: "Low",
      detailsEn: "Complies with FSSAI regulations for packaged potato snacks.",
      detailsHi: "FSSAI पैकेज्ड स्नैक मानकों के अनुरूप।"
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
    summaryEn: "As declared on package label: 0% Maida, 0% Palm Oil, Sun-dried (Not Fried). Crafted from supergrains (Foxtail Millet, Little Millet) with a clean spice mix, 0 MSG, and 0 synthetic colours.",
    summaryHi: "पैकेट पर घोषित सामग्री अनुसार: 0% मैदा, 0% पाम ऑयल, धूप में सुखाया हुआ (तला नहीं गया)। बाजरा और कंगनी मिलेट से बना संपूर्ण स्वास्थ्यवर्धक नूडल्स।",
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
      { name: "Foxtail & Little Millet", nameHi: "कंगनी और कुटकी मिलेट", purpose: "Ancient high-fiber grains", safety: "safe" },
      { name: "Whole Wheat Flour", nameHi: "साबुत गेहूं", purpose: "Elasticity and chew", safety: "safe" },
      { name: "Rock Salt (Sendha Namak)", nameHi: "सेंधा नमक", purpose: "Natural mineral seasoning", safety: "safe" }
    ],
    adulterationCheck: {
      riskLevel: "Low",
      detailsEn: "Certified clean label product. Tested 100% free from Maida and chemical synthetic preservatives.",
      detailsHi: "मैदा और कृत्रिम रसायनों से मुक्त प्रमाणित।"
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
    summaryEn: "As declared on package label: Contains 56.5% total sugar (50g added sugar per 100g), milk solids (25%), cocoa butter, and permitted emulsifier INS 476. Dietary guidelines recommend consuming confectioneries in moderation.",
    summaryHi: "पैकेट पर घोषित पोषण लेबल अनुसार: इसमें 56.5% शर्करा (50g अतिरिक्त चीनी प्रति 100g), 25% मिल्क सॉलिड्स और इमल्सीफायर INS 476 दर्ज है। संतुलित आहार में इसका सीमित सेवन उचित है।",
    isVegetarian: true,
    fssaiNumber: "10014022002711",
    packagingSize: "60g / 150g",
    warnings: [
      {
        type: "added_sugar",
        titleEn: "56.5% Total Sugar",
        titleHi: "56.5% कुल शर्करा",
        severity: "high",
        tagValue: "50g Added Sugar / 100g",
        descriptionEn: "Contains 50g added sugar per 100g as stated on the nutritional panel.",
        descriptionHi: "पोषण तालिका अनुसार प्रति 100g में 50 ग्राम अतिरिक्त चीनी घोषित है।"
      },
      {
        type: "preservatives",
        titleEn: "INS 476 (Polyglycerol Polyricinoleate)",
        titleHi: "INS 476 इमल्सीफायर",
        severity: "medium",
        tagValue: "INS 476 / INS 442",
        descriptionEn: "Permitted food additive used as an emulsifier to improve chocolate flow.",
        descriptionHi: "चॉकलेट के बहाव को नियंत्रित करने वाला अनुमत इमल्सीफायर।"
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
      { name: "Sugar (56.5%)", nameHi: "चीनी", purpose: "Primary sweetening ingredient", safety: "hazard" },
      { name: "Milk Solids", nameHi: "दूध के ठोस तत्व", purpose: "Creamy dairy texture", safety: "safe" },
      { name: "Cocoa Butter & Solids", nameHi: "कोको बटर और सॉलिड्स", purpose: "Chocolate base", safety: "safe" },
      { name: "INS 476", nameHi: "पॉलीग्लिसरॉल पॉलीरिसिनोलेएट", purpose: "Permitted flow agent", safety: "caution" }
    ],
    adulterationCheck: {
      riskLevel: "Low",
      detailsEn: "Meets FSSAI milk chocolate standards with full ingredient declaration.",
      detailsHi: "FSSAI मानक अनुरूप निर्मित।"
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
    summaryEn: "As declared on package label: Contains 19.5% mango pulp, water, 13.2g added sugar per 100ml, permitted synthetic food colour (Sunset Yellow FCF INS 110), and preservative INS 211 (Sodium Benzoate). Dietary guidelines suggest limiting intake of sugary beverages.",
    summaryHi: "पैकेट पर घोषित पोषण लेबल अनुसार: इसमें 19.5% आम का पल्प, 13.2 ग्राम अतिरिक्त चीनी प्रति 100ml, अनुमत सिंथेटिक रंग (INS 110) और प्रिजर्वेटिव (INS 211 सोडियम बेंजोएट) दर्ज है। स्वास्थ्य मानकों अनुसार मीठे पेयों का सीमित सेवन करें।",
    isVegetarian: true,
    fssaiNumber: "10012022000264",
    packagingSize: "160ml / 600ml",
    warnings: [
      {
        type: "artificial_colours",
        titleEn: "Synthetic Colour (INS 110)",
        titleHi: "सिंथेटिक रंग (INS 110)",
        severity: "high",
        tagValue: "Sunset Yellow FCF",
        descriptionEn: "Contains permitted synthetic food colour Sunset Yellow FCF (INS 110) as declared on the pack.",
        descriptionHi: "पैकेट अनुसार इसमें अनुमत सिंथेटिक रंग सनसेट येलो FCF (INS 110) शामिल है।"
      },
      {
        type: "preservatives",
        titleEn: "Class II Preservative (INS 211)",
        titleHi: "प्रिजर्वेटिव सोडियम बेंजोएट (INS 211)",
        severity: "medium",
        tagValue: "Sodium Benzoate",
        descriptionEn: "Contains permitted preservative INS 211 for shelf stability.",
        descriptionHi: "शेल्फ लाइफ बनाए रखने के लिए अनुमत प्रिजर्वेटिव INS 211 का उपयोग।"
      },
      {
        type: "added_sugar",
        titleEn: "13.2g Added Sugar / 100ml",
        titleHi: "13.2 ग्राम अतिरिक्त चीनी प्रति 100ml",
        severity: "high",
        tagValue: "13.2g Sugar / 100ml",
        descriptionEn: "High added sugar content contributing 13.2g simple sugars per 100ml.",
        descriptionHi: "प्रति 100ml में 13.2g अतिरिक्त चीनी घोषित है।"
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
      { name: "Water & Sugar", nameHi: "पानी और चीनी", purpose: "Base liquid beverage formulation", safety: "hazard" },
      { name: "Mango Pulp (19.5%)", nameHi: "आम का गूदा", purpose: "Fruit pulp ingredient", safety: "safe" },
      { name: "INS 110 Sunset Yellow", nameHi: "सिंथेटिक पीला रंग", purpose: "Permitted food colouring", safety: "hazard" },
      { name: "INS 211 Sodium Benzoate", nameHi: "सोडियम बेंजोएट", purpose: "Permitted food preservative", safety: "caution" }
    ],
    adulterationCheck: {
      riskLevel: "Low",
      detailsEn: "Manufactured in compliance with FSSAI regulations for ready-to-serve fruit beverages.",
      detailsHi: "FSSAI रेडी-टू-सर्व फ्रूट बेवरेज मानकों के अनुरूप।"
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
    summaryEn: "As declared on package label: Carbonated water with 10.6g added sugar per 100ml (~35g sugar per 330ml can), acidity regulator Phosphoric Acid (INS 338), and permitted food colour Caramel IV (INS 150d). ICMR and WHO dietary guidelines recommend minimizing consumption of sugar-sweetened carbonated soft drinks.",
    summaryHi: "पैकेट पर घोषित पोषण लेबल अनुसार: इसमें कार्बोनेटेड पानी, 10.6g अतिरिक्त चीनी प्रति 100ml (330ml कैन में ~35g चीनी), फॉस्फोरिक एसिड (INS 338) और कैरेमल रंग (INS 150d) दर्ज हैं। ICMR व WHO दिशानिर्देशों अनुसार मीठे कार्बोनेटेड पेयों का सेवन कम से कम करने की सलाह दी जाती है।",
    isVegetarian: true,
    fssaiNumber: "10012011000120",
    packagingSize: "250ml / 600ml / 750ml",
    warnings: [
      {
        type: "added_sugar",
        titleEn: "Added Liquid Sugar (10.6g / 100ml)",
        titleHi: "अतिरिक्त तरल चीनी (10.6g / 100ml)",
        severity: "high",
        tagValue: "10.6g Sugar / 100ml",
        descriptionEn: "High added sugar content contributing 35g sucrose per 330ml serving with 0g protein or dietary fiber.",
        descriptionHi: "प्रति 100ml में 10.6g अतिरिक्त चीनी दर्ज है, जिसमें प्रोटीन व फाइबर शून्य हैं।"
      },
      {
        type: "artificial_colours",
        titleEn: "Caramel IV Colour (INS 150d)",
        titleHi: "कैरामेलाइज़्ड रंग IV (INS 150d)",
        severity: "high",
        tagValue: "Permitted Class IV Caramel",
        descriptionEn: "Sulfite ammonia caramel colour permitted under FSSAI standards.",
        descriptionHi: "FSSAI मानकों के तहत अनुमत क्लास IV कैरेमल रंग।"
      },
      {
        type: "preservatives",
        titleEn: "Phosphoric Acid (INS 338)",
        titleHi: "फॉस्फोरिक एसिड (INS 338)",
        severity: "high",
        tagValue: "Acidity Regulator 338",
        descriptionEn: "Acidulant providing characteristic tartness in cola beverages.",
        descriptionHi: "कोला पेयों में स्वाद और अम्लता संतुलन हेतु प्रयुक्त एसिडुलेंट।"
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
      { name: "Carbonated Water", nameHi: "कार्बोनेटेड पानी", purpose: "Carbonated beverage base", safety: "safe" },
      { name: "Sugar (10.6g)", nameHi: "अतिरिक्त चीनी", purpose: "Sweetening ingredient", safety: "hazard" },
      { name: "INS 338 Phosphoric Acid", nameHi: "फॉस्फोरिक एसिड", purpose: "Permitted acidity regulator", safety: "hazard" },
      { name: "INS 150d Caramel IV", nameHi: "कैरामेलाइज्ड रंग", purpose: "Permitted food coloring", safety: "hazard" },
      { name: "Caffeine", nameHi: "कैफीन", purpose: "Permitted flavoring stimulant", safety: "caution" }
    ],
    adulterationCheck: {
      riskLevel: "Low",
      detailsEn: "Complies with FSSAI regulations for caffeinated carbonated beverages.",
      detailsHi: "FSSAI कार्बोनेटेड पेय मानकों के अनुरूप।"
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
    summaryEn: "As declared on package label: Contains carbonated water, 10.6g added sugar per 100ml, Phosphoric Acid (INS 338), Caramel IV (INS 150d), and caffeine. ICMR and WHO guidelines recommend moderating intake of sweetened carbonated beverages.",
    summaryHi: "पैकेट पर घोषित पोषण लेबल अनुसार: इसमें कार्बोनेटेड पानी, 10.6 ग्राम अतिरिक्त चीनी प्रति 100ml, फॉस्फोरिक एसिड (INS 338), कैरेमल रंग (INS 150d) और कैफीन दर्ज हैं। स्वास्थ्य दिशानिर्देशों अनुसार इसका सीमित सेवन करें।",
    isVegetarian: true,
    fssaiNumber: "10012011000120",
    packagingSize: "300ml / 750ml",
    warnings: [
      {
        type: "added_sugar",
        titleEn: "Added Sugar (10.6g / 100ml)",
        titleHi: "अतिरिक्त चीनी (10.6g / 100ml)",
        severity: "high",
        tagValue: "10.6g Sugar/100ml",
        descriptionEn: "High added sugar content contributing 10.6g simple sugars per 100ml.",
        descriptionHi: "प्रति 100ml में 10.6g अतिरिक्त चीनी सामग्री दर्ज है।"
      },
      {
        type: "artificial_colours",
        titleEn: "Caramel IV (INS 150d)",
        titleHi: "कैरेमल रंग IV (INS 150d)",
        severity: "high",
        tagValue: "Permitted Caramel Color",
        descriptionEn: "Permitted food colour Caramel IV (INS 150d) under FSSAI guidelines.",
        descriptionHi: "FSSAI दिशानिर्देशों के तहत अनुमत क्लास IV कैरेमल रंग।"
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
      { name: "Carbonated Water", nameHi: "सोडा पानी", purpose: "Carbonated water base", safety: "safe" },
      { name: "Sugar (10.6g)", nameHi: "सफेद चीनी", purpose: "Sweetening ingredient", safety: "hazard" },
      { name: "INS 338", nameHi: "फॉस्फोरिक एसिड", purpose: "Permitted acidity regulator", safety: "hazard" },
      { name: "INS 150d", nameHi: "कैरामेलाइज़्ड रंग", purpose: "Permitted food coloring", safety: "hazard" }
    ],
    adulterationCheck: {
      riskLevel: "Low",
      detailsEn: "Complies with FSSAI standards for carbonated beverages.",
      detailsHi: "FSSAI कार्बोनेटेड पेय मानकों के अनुरूप।"
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
    summaryEn: "As declared on package label: Contains 76% refined wheat flour (maida), edible vegetable fat (palm oil), permitted preservatives (INS 282), and permitted emulsifiers (INS 471, INS 481). Refined flour provides lower dietary fiber compared to whole grain alternatives.",
    summaryHi: "पैकेट पर घोषित सामग्री अनुसार: इसमें 76% मैदा, पाम ऑयल, अनुमत प्रिजर्वेटिव (INS 282) और इमल्सीफायर (INS 471, INS 481) दर्ज हैं। साबुत अनाज की तुलना में रिफाइंड आटे में पाचक फाइबर कम होता है।",
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
        descriptionEn: "Formulated primarily with refined wheat flour with low dietary fiber (1.2g per 100g).",
        descriptionHi: "रिफाइंड गेहूं आटा जिसमें 1.2g प्रति 100g पाचक फाइबर घोषित है।"
      },
      {
        type: "palm_oil",
        titleEn: "Refined Palm Fat",
        titleHi: "रिफाइंड पाम फैट",
        severity: "high",
        tagValue: "Palm Fat Shortening",
        descriptionEn: "Edible vegetable fat (palm oil) used for dough shortening and moisture retention.",
        descriptionHi: "ब्रेड की बनावट और नमी संतुलन हेतु पाम फैट का उपयोग।"
      },
      {
        type: "preservatives",
        titleEn: "Permitted Preservatives (INS 282)",
        titleHi: "अनुमत प्रिजर्वेटिव (INS 282)",
        severity: "medium",
        tagValue: "INS 282 / 471 / 481",
        descriptionEn: "Permitted mould inhibitor and dough conditioning agents.",
        descriptionHi: "ब्रेड की शेल्फ लाइफ बनाए रखने के लिए अनुमत खाद्य एडिटिव्स।"
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
      { name: "Maida (76%)", nameHi: "मैदा", purpose: "Refined wheat flour dough base", safety: "hazard" },
      { name: "Palm Oil", nameHi: "पाम तेल", purpose: "Crumb softness shortening", safety: "hazard" },
      { name: "INS 282 (Calcium Propionate)", nameHi: "कैल्शियम प्रोपियोनेट", purpose: "Permitted anti-fungal preservative", safety: "caution" },
      { name: "INS 481 (Sodium Stearoyl Lactylate)", nameHi: "डफ कंडीशनर", purpose: "Permitted texture conditioner", safety: "caution" },
      { name: "Yeast & Salt", nameHi: "यीस्ट व नमक", purpose: "Fermentation & seasoning", safety: "safe" }
    ],
    adulterationCheck: {
      riskLevel: "Low",
      detailsEn: "Complies with FSSAI regulations for packaged bread.",
      detailsHi: "FSSAI पैकेज्ड ब्रेड मानकों के अनुरूप।"
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
    summaryEn: "As declared on package label: Contains 55% Whole Wheat Flour (Atta), edible vegetable oil (palmolein), permitted colour Caramel IV (INS 150d), and permitted preservative (INS 282). Provides 5.5g dietary fiber per 100g.",
    summaryHi: "पैकेट पर घोषित सामग्री अनुसार: इसमें 55% साबुत गेहूं आटा (आटा), पामोलिन तेल, अनुमत कैरेमल रंग (INS 150d) और प्रिजर्वेटिव (INS 282) दर्ज है। प्रति 100 ग्राम 5.5 ग्राम पाचक फाइबर उपलब्ध कराता है।",
    isVegetarian: true,
    fssaiNumber: "10015043001129",
    packagingSize: "400g",
    warnings: [
      {
        type: "palm_oil",
        titleEn: "Contains Palmolein Oil",
        titleHi: "पामोलिन तेल",
        severity: "medium",
        tagValue: "Refined Palm Fat",
        descriptionEn: "Contains palmolein vegetable fat for texture and shelf stabilization.",
        descriptionHi: "बनावट और शेल्फ लाइफ स्थिरता के लिए पामोलिन तेल का उपयोग।"
      },
      {
        type: "preservatives",
        titleEn: "Caramel IV (INS 150d) & Preservative",
        titleHi: "कैरेमल रंग (INS 150d) व प्रिजर्वेटिव",
        severity: "medium",
        tagValue: "INS 150d Color",
        descriptionEn: "Permitted caramel food colour and mould inhibitor (INS 282) as declared on pack.",
        descriptionHi: "पैकेट अनुसार अनुमत कैरेमल रंग और फफूंद रोधी प्रिजर्वेटिव INS 282।"
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
      { name: "Whole Wheat Flour (Atta)", nameHi: "साबुत गेहूं आटा", purpose: "Whole wheat grain base with dietary fiber", safety: "safe" },
      { name: "INS 150d (Caramel IV)", nameHi: "कैरेमल रंग", purpose: "Permitted caramel food coloring", safety: "caution" },
      { name: "Palm Oil", nameHi: "पाम तेल", purpose: "Vegetable fat shortening", safety: "caution" },
      { name: "INS 282", nameHi: "प्रिजर्वेटिव", purpose: "Permitted mould inhibitor", safety: "caution" }
    ],
    adulterationCheck: {
      riskLevel: "Low",
      detailsEn: "Complies with FSSAI whole wheat bread standards.",
      detailsHi: "FSSAI होल व्हीट ब्रेड मानकों के अनुरूप।"
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
