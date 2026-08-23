export type Language = "en" | "hi";

export type VerdictType = "green" | "yellow" | "red";

export interface IndianHazardWarning {
  type: "palm_oil" | "maida" | "artificial_colours" | "preservatives" | "added_sugar" | "trans_fat" | "adulteration" | "sodium" | "glyphosate";
  titleEn: string;
  titleHi: string;
  severity: "high" | "medium" | "low";
  descriptionEn: string;
  descriptionHi: string;
  tagValue?: string; // e.g. "32% Palm Olein", "85% Maida", "E102 Tartrazine", "34g Added Sugar"
}

export interface IngredientItem {
  name: string;
  nameHi: string;
  purpose: string;
  safety: "safe" | "caution" | "hazard";
  eCode?: string;
}

export interface NutritionFacts {
  calories: string;
  protein: string;
  carbohydrates: string;
  sugar: string;
  addedSugar?: string;
  totalFat: string;
  saturatedFat?: string;
  transFat?: string;
  sodium: string;
  fiber?: string;
}

export interface CleanerAlternative {
  id?: string;
  name: string;
  brand?: string;
  score: number;
  price?: string;
  priceEst?: string;
  problem?: string; // Hindi problem explanation e.g. "Zyada Cheeni + Chemical"
  image?: string;
  reasonEn?: string;
  reasonHi?: string;
  tags?: string[];
}

export interface CategoryAlternativeDoc {
  id: string; // document id matching category_id e.g. "energy_drink"
  category_id: string;
  category_name?: string;
  target_products?: string[];
  alternatives: CleanerAlternative[];
  updatedAt?: string;
}

export interface AdulterationCheck {
  riskLevel: "Low" | "Moderate" | "High";
  detailsEn: string;
  detailsHi: string;
  homeTestName?: string;
  homeTestGuideEn?: string;
  homeTestGuideHi?: string;
}

export interface FoodProduct {
  id: string;
  barcode: string;
  name: string;
  nameHindi: string;
  brand: string;
  category: string;
  categoryHindi: string;
  imageUrl: string;
  healthScore: number; // 0 to 100
  verdict: "Achha Option" | "Soch Samajh Kar" | "Avoid Karein";
  verdictHindi: "अच्छा विकल्प" | "सोच समझ कर" | "बचने की सलाह";
  verdictType: VerdictType;
  summaryEn: string;
  summaryHi: string;
  isVegetarian: boolean;
  fssaiNumber?: string;
  packagingSize?: string;
  warnings: IndianHazardWarning[];
  nutritionPer100g: NutritionFacts;
  ingredientsList: string[];
  ingredientsExplanation: IngredientItem[];
  adulterationCheck: AdulterationCheck;
  cleanerAlternatives: CleanerAlternative[];
  novaGroup?: 1 | 2 | 3 | 4; // Ultra-processed food classification
  fssaiStatus?: "Verified & Compliant" | "Excess Limit Notice" | "Under Review";
  source?: "offline_db" | "gemini_vision" | "gemini_text";
  scannedAt?: string;
}

export interface ProductCategory {
  id: string;
  nameEn: string;
  nameHi: string;
  iconName: string;
  descriptionEn: string;
  descriptionHi: string;
  accentColor: string;
  commonWatchouts: string[];
}

export interface AdulterationGuide {
  id: string;
  foodItemEn: string;
  foodItemHi: string;
  adulterantEn: string;
  adulterantHi: string;
  testNameEn: string;
  testNameHi: string;
  stepByStepEn: string[];
  stepByStepHi: string[];
  resultPositiveEn: string;
  resultPositiveHi: string;
  resultPureEn: string;
  resultPureHi: string;
  icon: string;
  fssaiRef?: string;
}

export interface DietaryPreferences {
  pureVegetarian: boolean;
  avoidPalmOil: boolean;
  avoidMaida: boolean;
  lowSugar: boolean;
}

export interface CommunityContribution {
  id?: string;
  barcode: string;
  productName: string;
  brand: string;
  category?: string;
  frontPhotoUrl?: string;
  ingredientsPhotoUrl?: string;
  nutritionPhotoUrl?: string;
  submittedBy?: string;
  submittedByEmail?: string;
  createdAt: string;
  status: "pending_review" | "approved" | "verified";
  healthScore?: number;
  notes?: string;
}

export interface UserProfile {
  id?: string;
  name: string;
  phone?: string;
  phoneNumber?: string;
  email?: string;
  isLoggedIn: boolean;
  isAdmin?: boolean;
  role?: "user" | "admin";
  avatarSeed?: string;
  isPureVeg?: boolean;
  isDiabeticConscious?: boolean;
  strictNoPalmOil?: boolean;
  strictNoMaida?: boolean;
  languagePreference?: Language;
  dietaryPreferences: DietaryPreferences;
}
