import { ProductCategory } from "../types";

export const PRODUCT_CATEGORIES: ProductCategory[] = [
  {
    id: "all",
    nameEn: "All Products",
    nameHi: "सभी उत्पाद",
    iconName: "LayoutGrid",
    descriptionEn: "Explore full database of Indian foods",
    descriptionHi: "भारतीय खाद्य पदार्थों की पूरी सूची",
    accentColor: "emerald",
    commonWatchouts: ["Palm Oil", "Maida", "Preservatives"]
  },
  {
    id: "Atta & Flour",
    nameEn: "Atta & Flour",
    nameHi: "आटा और दाल",
    iconName: "Wheat",
    descriptionEn: "Chakki Atta, Maida, Multigrain, Besan",
    descriptionHi: "चक्की आटा, मैदा, बेसन, दलिया",
    accentColor: "amber",
    commonWatchouts: ["Maida mixing", "Chalk powder", "Synthetic bleaching"]
  },
  {
    id: "Cooking Oils & Ghee",
    nameEn: "Oils & Ghee",
    nameHi: "तेल और घी",
    iconName: "Flame",
    descriptionEn: "Mustard, Sunflower, Desi Ghee, Blended Oils",
    descriptionHi: "सरसों तेल, गाय का घी, रिफाइंड तेल",
    accentColor: "yellow",
    commonWatchouts: ["Argemone oil adulteration", "Vanaspati mixing", "Hexane chemical solvent"]
  },
  {
    id: "Snacks & Namkeen",
    nameEn: "Snacks & Namkeen",
    nameHi: "स्नैक्स व नमकीन",
    iconName: "Cookie",
    descriptionEn: "Bhujia, Chips, Kurkure, Extruded snacks",
    descriptionHi: "भुजिया, चिप्स, कुरकुरे, नमकीन",
    accentColor: "orange",
    commonWatchouts: ["Palmolein oil 35%+", "INS 635 / 627 / 631", "Excessive sodium >900mg"]
  },
  {
    id: "Biscuits & Bakery",
    nameEn: "Biscuits & Cookies",
    nameHi: "बिस्कुट व बेकरी",
    iconName: "CupSoda",
    descriptionEn: "Glucose, Butter, Digestive, Cream biscuits",
    descriptionHi: "ग्लूकोज, बटर, क्रीम बिस्कुट",
    accentColor: "rose",
    commonWatchouts: ["60%+ Maida", "Invert Sugar Syrup", "Hydrogenated fat masquerading as butter"]
  },
  {
    id: "Noodles & Instant Food",
    nameEn: "Noodles & Instant",
    nameHi: "नूडल्स व इंस्टेंट",
    iconName: "Soup",
    descriptionEn: "Instant noodles, Pasta, Ready-to-cook",
    descriptionHi: "मैगी, पास्ता, रेडी-टू-ईट",
    accentColor: "red",
    commonWatchouts: ["Palm oil deep-fried cake", "MSG synergists", "Extremely high sodium"]
  },
  {
    id: "Dairy & Drinks",
    nameEn: "Dairy & Juices",
    nameHi: "डेयरी और पेय",
    iconName: "Milk",
    descriptionEn: "Milk, TetraPak Juices, Soft drinks, Lassi",
    descriptionHi: "दूध, पैक्ड जूस, कोल्ड ड्रिंक्स, लस्सी",
    accentColor: "blue",
    commonWatchouts: ["Added Sugar (12-15g/100ml)", "Synthetic Sunset Yellow / Tartrazine", "Sodium Benzoate"]
  },
  {
    id: "Spices & Masalas",
    nameEn: "Spices & Masala",
    nameHi: "मसाले व हल्दी",
    iconName: "Sparkles",
    descriptionEn: "Turmeric, Garam Masala, Mirch, Hing",
    descriptionHi: "हल्दी, गरम मसाला, लाल मिर्च, हींग",
    accentColor: "teal",
    commonWatchouts: ["Metanil yellow in haldi", "Sawdust/Chalk in coriander", "Ethylene oxide residues"]
  },
  {
    id: "Kids & Baby Food",
    nameEn: "Kids & Baby Food",
    nameHi: "शिशु आहार",
    iconName: "Baby",
    descriptionEn: "Infant cereals, Porridge, Kids cereals",
    descriptionHi: "सेरेलक, दलिया, बच्चों के स्नैक्स",
    accentColor: "purple",
    commonWatchouts: ["Hidden sucrose/maltodextrin", "Palm oil in infant mixes", "Synthetic vanilla aromas"]
  },
  {
    id: "Chocolates & Sweets",
    nameEn: "Chocolates & Spreads",
    nameHi: "चॉकलेट व स्प्रेड",
    iconName: "HeartHandshake",
    descriptionEn: "Milk chocolate, Hazelnut spreads, Jams",
    descriptionHi: "डेयरी मिल्क, नटेला, जैम",
    accentColor: "pink",
    commonWatchouts: ["55%+ pure white sugar", "Cocoa butter substitutes (CBE)", "INS 476 synthetic emulsifiers"]
  }
];
