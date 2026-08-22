import { AdulterationGuide } from "../types";

export const ADULTERATION_GUIDES: AdulterationGuide[] = [
  {
    id: "mustard-oil-argemone",
    foodItemEn: "Mustard Oil (Sarson ka Tel)",
    foodItemHi: "सरसों का तेल",
    adulterantEn: "Argemone Oil (Toxic Wild Poppy Oil)",
    adulterantHi: "आर्जीमोन तेल (सत्यानाशी का विषैला तेल)",
    testNameEn: "Nitric Acid Coloration Test",
    testNameHi: "नाइट्रिक एसिड रंग परीक्षण",
    icon: "Flame",
    fssaiRef: "FSSAI DART Book Oil-01",
    stepByStepEn: [
      "Take 5 ml of mustard oil in a small clear glass test tube or transparent jar.",
      "Add 5 ml of concentrated Nitric Acid (HNO3) or strong white vinegar carefully.",
      "Shake the tube gently for 10 seconds and let it stand for 10 minutes."
    ],
    stepByStepHi: [
      "एक साफ कांच की शीशी में 5 मिली सरसों का तेल लें।",
      "इसमें सावधानी से 5 मिली नाइट्रिक एसिड या तेज सिरका मिलाएं।",
      "10 सेकंड के लिए धीरे से हिलाएं और 10 मिनट के लिए रख दें।"
    ],
    resultPositiveEn: "A red to reddish-brown crimson color develops at the acid layer indicating presence of toxic Argemone oil.",
    resultPositiveHi: "निचली परत पर लाल या भूरा रंग आ जाए तो इसमें खतरनाक आर्जीमोन तेल मिला है (ड्रॉप्सी बीमारी का कारण)।",
    resultPureEn: "No reddish or crimson color appears; oil remains clear yellow-golden.",
    resultPureHi: "रंग में कोई बदलाव नहीं आता; तेल शुद्ध सुनहरा-पीला रहता है।"
  },
  {
    id: "milk-starch-synthetic",
    foodItemEn: "Milk / Khoya / Paneer",
    foodItemHi: "दूध / मावा / पनीर",
    adulterantEn: "Starch, Detergent & Urea (Synthetic Milk)",
    adulterantHi: "स्टार्च, डिटर्जेंट और यूरिया (सिंथेटिक दूध)",
    testNameEn: "Iodine Tincture & Lather Test",
    testNameHi: "आयोडीन टिंचर व झाग परीक्षण",
    icon: "Milk",
    fssaiRef: "FSSAI DART Dairy-04",
    stepByStepEn: [
      "Take 5 ml of boiled and cooled milk (or a small piece of paneer/khoya).",
      "Add 2-3 drops of standard Iodine Tincture (easily available at medical stores).",
      "Observe color change immediately."
    ],
    stepByStepHi: [
      "5 मिली उबला और ठंडा किया हुआ दूध (या पनीर/मावे का टुकड़ा) लें।",
      "इसमें मेडिकल स्टोर पर मिलने वाले आयोडीन टिंचर की 2-3 बूंदें डालें।",
      "तुरंत रंग के बदलाव को देखें।"
    ],
    resultPositiveEn: "Turns intense deep blue/purple if starch (flour/potato paste) was added to thicken milk artificially.",
    resultPositiveHi: "यदि गहरा नीला या बैंगनी रंग हो जाए तो गाढ़ा करने के लिए मैदा या स्टार्च मिलाया गया है।",
    resultPureEn: "Remains milky pale yellowish-white without any blue coloration.",
    resultPureHi: "कोई नीला रंग नहीं आता; दूध का रंग हल्का पीलापन लिए सफेद ही रहता है।"
  },
  {
    id: "honey-sugar-syrup",
    foodItemEn: "Pure Honey (शहद)",
    foodItemHi: "शुद्ध शहद",
    adulterantEn: "CBM/Rice/Invert Sugar Syrup",
    adulterantHi: "चावल व मक्का का शुगर सिरप (चाशनी)",
    testNameEn: "Water Dispersion & Matchstick Test",
    testNameHi: "पानी में घुलनशीलता व माचिस परीक्षण",
    icon: "Sparkles",
    fssaiRef: "FSSAI DART Sweet-02",
    stepByStepEn: [
      "Take a transparent glass filled with regular tap water.",
      "Add one spoonful of honey slowly without stirring.",
      "Observe how the honey travels to the bottom."
    ],
    stepByStepHi: [
      "एक कांच के गिलास में सादा पानी लें।",
      "बिना हिलाए एक चम्मच शहद धीरे-धीरे पानी में गिराएं।",
      "देखें कि शहद नीचे कैसे बैठता है।"
    ],
    resultPositiveEn: "Adulterated honey starts dissolving immediately on contact, clouding the water instantly.",
    resultPositiveHi: "मिलावटी चाशनी युक्त शहद पानी में गिरते ही तुरंत घुलने लगता है और पानी धुंधला हो जाता है।",
    resultPureEn: "Pure thick honey sinks straight to the bottom without dissolving until stirred vigorously.",
    resultPureHi: "शुद्ध शहद बिना घुले सीधे तली में एक गाढ़ी परत के रूप में बैठ जाता है।"
  },
  {
    id: "turmeric-metanil-yellow",
    foodItemEn: "Turmeric Powder (Haldi)",
    foodItemHi: "हल्दी पाउडर",
    adulterantEn: "Metanil Yellow (Carcinogenic Industrial Dye) & Lead Chromate",
    adulterantHi: "मेटानिल येलो (हानिकारक गैर-अनुमत रंग) और लेड क्रोमेट",
    testNameEn: "Hydrochloric Acid / Lemon Acid Test",
    testNameHi: "एसिड परीक्षण",
    icon: "Wheat",
    fssaiRef: "FSSAI DART Spices-01",
    stepByStepEn: [
      "Take a pinch of turmeric powder in a transparent small bowl with 5 ml water.",
      "Add a few drops of concentrated acid (or strong toilet cleaner acid / lemon juice).",
      "Dilute with water to observe color."
    ],
    stepByStepHi: [
      "एक छोटी कटोरी में चुटकी भर हल्दी पाउडर और थोड़ा पानी लें।",
      "इसमें एसिड की कुछ बूंदें (या नींबू का रस) मिलाएं।",
      "पानी मिलाकर देखें कि रंग टिकता है या उड़ता है।"
    ],
    resultPositiveEn: "If the solution turns intense pink/magenta and stays pink even after adding water, synthetic Metanil yellow dye is present.",
    resultPositiveHi: "यदि गहरा गुलाबी या मैजेंटा रंग बन जाए और पानी मिलाने पर भी गुलाबी रहे, तो इसमें जहरीला मेटानिल येलो रंग मिला है।",
    resultPureEn: "Turns pink on adding acid, but on dilution with water, immediately returns to natural golden yellow.",
    resultPureHi: "पानी मिलाते ही गुलाबी रंग गायब होकर वापस प्राकृतिक पीला रंग बन जाता है।"
  },
  {
    id: "desi-ghee-vanaspati",
    foodItemEn: "Desi Cow Ghee (देसी घी)",
    foodItemHi: "देसी घी",
    adulterantEn: "Vanaspati (Hydrogenated Trans Fat) & Animal Tallow",
    adulterantHi: "वनस्पति डालडा व चर्बी की मिलावट",
    testNameEn: "Baudouin & Sugar Hydrochloric Test",
    testNameHi: "चीनी और एसिड परीक्षण",
    icon: "Flame",
    fssaiRef: "FSSAI DART Fat-03",
    stepByStepEn: [
      "Melt 1 teaspoon of ghee in a clean glass vial.",
      "Add an equal amount of hydrochloric acid and a pinch of table sugar.",
      "Shake well and allow to settle for 5 minutes."
    ],
    stepByStepHi: [
      "एक साफ शीशी में 1 चम्मच पिघला हुआ घी लें।",
      "इसमें उतनी ही मात्रा में हाइड्रोक्लोरिक एसिड और चुटकी भर चीनी डालें।",
      "अच्छी तरह हिलाएं और 5 मिनट के लिए रख दें।"
    ],
    resultPositiveEn: "A crimson / crimson red color appears in the lower acid layer indicating Vanaspati / Sesame oil addition.",
    resultPositiveHi: "निचली परत पर गहरा लाल रंग बन जाए तो इसमें वनस्पति डालडा मिलाया गया है।",
    resultPureEn: "No red or crimson color develops; layer stays pale golden.",
    resultPureHi: "कोई लाल रंग नहीं बनता; परत साफ और शुद्ध रहती है।"
  }
];
