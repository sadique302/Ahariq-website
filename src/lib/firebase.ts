import { initializeApp, getApps, getApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  signInAnonymously,
  onAuthStateChanged,
  User,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  collection,
  addDoc,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import firebaseConfigData from "../../firebase-applet-config.json";
import { FoodProduct, UserProfile, CommunityContribution, CategoryAlternativeDoc } from "../types";
import {
  DEFAULT_CATEGORY_ALTERNATIVES,
  updateAlternativesCache,
} from "../data/cleanAlternativesEngine";

// Firebase Configuration (supports Vercel Environment Variables with automatic fallback)
const env = (import.meta as any).env || {};
const firebaseConfig = {
  apiKey:
    env.VITE_FIREBASE_API_KEY ||
    (firebaseConfigData as any).apiKey ||
    "",
  authDomain:
    env.VITE_FIREBASE_AUTH_DOMAIN ||
    (firebaseConfigData as any).authDomain ||
    "",
  projectId:
    env.VITE_FIREBASE_PROJECT_ID ||
    (firebaseConfigData as any).projectId ||
    "",
  storageBucket:
    env.VITE_FIREBASE_STORAGE_BUCKET ||
    (firebaseConfigData as any).storageBucket ||
    "",
  messagingSenderId:
    env.VITE_FIREBASE_MESSAGING_SENDER_ID ||
    (firebaseConfigData as any).messagingSenderId ||
    "",
  appId:
    env.VITE_FIREBASE_APP_ID ||
    (firebaseConfigData as any).appId ||
    "",
};

// Initialize Firebase App
export const app =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Auth Instance
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Firestore Database Instance
// Use custom firestoreDatabaseId only if explicitly configured or running on the default AI studio project
const firestoreDbId =
  env.VITE_FIREBASE_FIRESTORE_DATABASE_ID ||
  (firebaseConfig.projectId === "steel-wonder-j40ks"
    ? (firebaseConfigData as any).firestoreDatabaseId
    : undefined);

export const db = firestoreDbId
  ? getFirestore(app, firestoreDbId)
  : getFirestore(app);

// ----------------------------------------------------
// DATABASE SERVICES & REALTIME SYNC
// ----------------------------------------------------

/**
 * Save or update user profile in Firestore
 */
export async function syncUserProfileToCloud(
  userId: string,
  profile: Partial<UserProfile> & { phone?: string; email?: string }
) {
  try {
    const userRef = doc(db, "users", userId);
    await setDoc(
      userRef,
      {
        id: userId,
        name: profile.name || "AharIQ User",
        phoneNumber: profile.phoneNumber || profile.phone || "",
        email: profile.email || "",
        isPureVeg: profile.isPureVeg ?? false,
        isDiabeticConscious: profile.isDiabeticConscious ?? false,
        strictNoPalmOil: profile.strictNoPalmOil ?? true,
        strictNoMaida: profile.strictNoMaida ?? false,
        languagePreference: profile.languagePreference || "en",
        updatedAt: new Date().toISOString(),
        lastActiveAt: new Date().toISOString(),
      },
      { merge: true }
    );
    console.log("User profile synced to Firebase Firestore:", userId);
  } catch (err) {
    console.warn("Firestore user sync fallback:", err);
  }
}

/**
 * Record a scan event in Firestore
 */
export async function recordScanToCloud(
  userId: string,
  product: FoodProduct
) {
  try {
    const scansCol = collection(db, "scans");
    await addDoc(scansCol, {
      userId,
      barcode: product.barcode,
      productName: product.name,
      nameHindi: product.nameHindi || "",
      brand: product.brand,
      healthScore: product.healthScore,
      verdict: product.verdict,
      verdictHindi: product.verdictHindi || "",
      imageUrl: product.imageUrl || "",
      scannedAt: new Date().toISOString(),
    });
  } catch (err) {
    console.warn("Firestore scan record fallback:", err);
  }
}

/**
 * Save or remove bookmarked product in Firestore
 */
export async function syncSavedItemToCloud(
  userId: string,
  product: FoodProduct,
  isSaved: boolean
) {
  try {
    const saveDocId = `${userId}_${product.barcode || product.id}`;
    const saveRef = doc(db, "saved_items", saveDocId);
    if (isSaved) {
      await setDoc(saveRef, {
        id: saveDocId,
        userId,
        productId: product.id || product.barcode,
        barcode: product.barcode,
        name: product.name,
        nameHindi: product.nameHindi || "",
        brand: product.brand,
        healthScore: product.healthScore,
        verdict: product.verdict,
        imageUrl: product.imageUrl || "",
        savedAt: new Date().toISOString(),
      });
    } else {
      await setDoc(
        saveRef,
        {
          deleted: true,
          removedAt: new Date().toISOString(),
        },
        { merge: true }
      );
    }
  } catch (err) {
    console.warn("Firestore saved item sync fallback:", err);
  }
}

/**
 * Fetch strictly authenticated user's own scans from Firestore
 */
export async function fetchUserScansFromCloud(userId: string): Promise<FoodProduct[]> {
  if (!userId || userId === "guest_device") return [];
  try {
    const scansCol = collection(db, "scans");
    const q = query(
      scansCol,
      where("userId", "==", userId),
      orderBy("scannedAt", "desc"),
      limit(50)
    );
    const snap = await getDocs(q);
    const results: FoodProduct[] = [];
    snap.forEach((d) => {
      const data = d.data();
      results.push({
        id: d.id,
        barcode: data.barcode || "",
        name: data.productName || data.name || "Scanned Product",
        nameHindi: data.nameHindi || "",
        brand: data.brand || "",
        category: data.category || "General",
        categoryHindi: data.categoryHindi || "सामान्य",
        imageUrl: data.imageUrl || "https://images.unsplash.com/photo-1542838132-92c53300491e?w=500&auto=format&fit=crop&q=80",
        healthScore: typeof data.healthScore === "number" ? data.healthScore : 50,
        verdict: data.verdict || "Soch Samajh Kar",
        verdictHindi: data.verdictHindi || "सोच समझ कर",
        verdictType: (data.healthScore >= 70 ? "green" : data.healthScore >= 40 ? "yellow" : "red") as any,
        summaryEn: data.summaryEn || "",
        summaryHi: data.summaryHi || "",
        isVegetarian: data.isVegetarian ?? true,
        warnings: data.warnings || [],
        nutritionPer100g: data.nutritionPer100g || {
          calories: "0 kcal",
          protein: "0g",
          carbohydrates: "0g",
          sugar: "0g",
          totalFat: "0g",
          sodium: "0mg",
        },
        ingredientsList: data.ingredientsList || [],
        ingredientsExplanation: data.ingredientsExplanation || [],
        adulterationCheck: data.adulterationCheck || {
          riskLevel: "Low",
          detailsEn: "No adulteration risk detected",
          detailsHi: "कोई मिलावट जोखिम नहीं मिला",
        },
        cleanerAlternatives: data.cleanerAlternatives || [],
        scannedAt: data.scannedAt || new Date().toISOString(),
      });
    });
    return results;
  } catch (err) {
    console.warn("Error fetching user cloud scans (falling back to user local cache):", err);
    return [];
  }
}

/**
 * Fetch strictly authenticated user's own saved products from Firestore
 */
export async function fetchUserSavedItemsFromCloud(userId: string): Promise<FoodProduct[]> {
  if (!userId || userId === "guest_device") return [];
  try {
    const savedCol = collection(db, "saved_items");
    const q = query(
      savedCol,
      where("userId", "==", userId)
    );
    const snap = await getDocs(q);
    const results: FoodProduct[] = [];
    snap.forEach((d) => {
      const data = d.data();
      if (!data.deleted) {
        results.push({
          id: data.productId || d.id,
          barcode: data.barcode || "",
          name: data.name || "Saved Product",
          nameHindi: data.nameHindi || "",
          brand: data.brand || "",
          category: data.category || "General",
          categoryHindi: data.categoryHindi || "सामान्य",
          imageUrl: data.imageUrl || "https://images.unsplash.com/photo-1542838132-92c53300491e?w=500&auto=format&fit=crop&q=80",
          healthScore: typeof data.healthScore === "number" ? data.healthScore : 50,
          verdict: data.verdict || "Soch Samajh Kar",
          verdictHindi: data.verdictHindi || "सोच समझ कर",
          verdictType: (data.healthScore >= 70 ? "green" : data.healthScore >= 40 ? "yellow" : "red") as any,
          summaryEn: data.summaryEn || "",
          summaryHi: data.summaryHi || "",
          isVegetarian: data.isVegetarian ?? true,
          warnings: data.warnings || [],
          nutritionPer100g: data.nutritionPer100g || {
            calories: "0 kcal",
            protein: "0g",
            carbohydrates: "0g",
            sugar: "0g",
            totalFat: "0g",
            sodium: "0mg",
          },
          ingredientsList: data.ingredientsList || [],
          ingredientsExplanation: data.ingredientsExplanation || [],
          adulterationCheck: data.adulterationCheck || {
            riskLevel: "Low",
            detailsEn: "No adulteration risk detected",
            detailsHi: "कोई मिलावट जोखिम नहीं मिला",
          },
          cleanerAlternatives: data.cleanerAlternatives || [],
        });
      }
    });
    return results;
  } catch (err) {
    console.warn("Error fetching user cloud saved items:", err);
    return [];
  }
}

/**
 * Submit community product (with 3 photos) to Firestore
 */
export async function submitCommunityContribution(
  data: CommunityContribution
): Promise<{ success: boolean; id?: string; error?: string }> {
  try {
    const coll = collection(db, "community_contributions");
    const docRef = await addDoc(coll, {
      ...data,
      createdAt: data.createdAt || new Date().toISOString(),
      status: "pending_review",
    });

    // Also register in custom_products so it is discoverable
    try {
      const customCol = collection(db, "custom_products");
      await addDoc(customCol, {
        barcode: data.barcode,
        name: data.productName,
        brand: data.brand || "Community Product",
        imageUrl: data.frontPhotoUrl || "",
        frontPhotoUrl: data.frontPhotoUrl || "",
        ingredientsPhotoUrl: data.ingredientsPhotoUrl || "",
        nutritionPhotoUrl: data.nutritionPhotoUrl || "",
        submittedBy: data.submittedBy || "AharIQ Contributor",
        submittedByEmail: data.submittedByEmail || "",
        createdAt: new Date().toISOString(),
        status: "verified",
        healthScore: data.healthScore || 70,
        verdict: "Soch Samajh Kar",
        category: data.category || "Community Product",
      });
    } catch (e) {
      console.warn("custom_products sync warn:", e);
    }

    return { success: true, id: docRef.id };
  } catch (err: any) {
    console.error("Community contribution error:", err);
    return { success: false, error: err?.message || String(err) };
  }
}

/**
 * Fetch all community contributions for Admin Panel
 */
export async function fetchAllCommunityContributions(): Promise<CommunityContribution[]> {
  try {
    const coll = collection(db, "community_contributions");
    const q = query(coll, orderBy("createdAt", "desc"), limit(100));
    const snap = await getDocs(q);
    const results: CommunityContribution[] = [];
    snap.forEach((docSnap) => {
      results.push({ id: docSnap.id, ...(docSnap.data() as any) });
    });
    return results;
  } catch (err) {
    // fallback if no orderBy index yet
    try {
      const coll = collection(db, "community_contributions");
      const snap = await getDocs(coll);
      const results: CommunityContribution[] = [];
      snap.forEach((docSnap) => {
        results.push({ id: docSnap.id, ...(docSnap.data() as any) });
      });
      return results;
    } catch (e) {
      console.warn("Fetch contributions error:", e);
      return [];
    }
  }
}

/**
 * Submit community product to Firestore
 */
export async function submitCrowdsourcedProductToCloud(
  productData: Partial<FoodProduct> & { submittedBy?: string }
) {
  try {
    const customCol = collection(db, "custom_products");
    const docRef = await addDoc(customCol, {
      ...productData,
      createdAt: new Date().toISOString(),
      status: "verified",
    });
    return docRef.id;
  } catch (err) {
    console.warn("Custom product submission fallback:", err);
    return null;
  }
}

/**
 * Fetch crowd-sourced community products from Firestore
 */
export async function fetchCommunityProductsFromCloud(): Promise<FoodProduct[]> {
  try {
    const customCol = collection(db, "custom_products");
    const q = query(customCol, limit(50));
    const snapshot = await getDocs(q);
    const list: FoodProduct[] = [];
    snapshot.forEach((docSnap) => {
      list.push({ id: docSnap.id, ...docSnap.data() } as FoodProduct);
    });
    return list;
  } catch (err) {
    console.warn("Could not fetch community products from Firestore:", err);
    return [];
  }
}

/**
 * Fetch real Live Stats & registered users from Firestore for Admin Dashboard
 */
export async function fetchRealAdminStatsFromCloud() {
  try {
    // 1. Fetch Users
    const usersCol = collection(db, "users");
    const userSnap = await getDocs(usersCol);
    const usersList: any[] = [];
    userSnap.forEach((d) => usersList.push({ id: d.id, ...d.data() }));

    // 2. Fetch Scans
    const scansCol = collection(db, "scans");
    const scanSnap = await getDocs(scansCol);
    const scansList: any[] = [];
    scanSnap.forEach((d) => scansList.push({ id: d.id, ...d.data() }));

    // 3. Fetch Saved items
    const savedCol = collection(db, "saved_items");
    const savedSnap = await getDocs(savedCol);
    const savedList: any[] = [];
    savedSnap.forEach((d) => savedList.push({ id: d.id, ...d.data() }));

    // 4. Fetch Community Contributions
    const contribs = await fetchAllCommunityContributions();

    return {
      totalUsers: usersList.length,
      users: usersList,
      totalScans: scansList.length,
      recentScans: scansList.sort(
        (a, b) => new Date(b.scannedAt || 0).getTime() - new Date(a.scannedAt || 0).getTime()
      ),
      totalSaved: savedList.filter((item) => !item.deleted).length,
      savedItems: savedList,
      totalContributions: contribs.length,
      contributions: contribs,
      error: undefined,
    };
  } catch (err: any) {
    console.error("Error fetching real admin stats:", err);
    return {
      totalUsers: 0,
      users: [],
      totalScans: 0,
      recentScans: [],
      totalSaved: 0,
      savedItems: [],
      totalContributions: 0,
      contributions: [],
      error: err?.message || String(err),
    };
  }
}

// ----------------------------------------------------
// DYNAMIC ALTERNATIVES COLLECTION (Firestore CRUD & Seeding)
// ----------------------------------------------------

/**
 * Seeds default healthy alternatives into Firestore 'alternatives' collection
 * Each document ID is the exact category_id (e.g. energy_drink, instant_noodles, etc.)
 */
export async function seedDefaultAlternativesIfEmpty(): Promise<boolean> {
  try {
    const colRef = collection(db, "alternatives");
    const snapshot = await getDocs(colRef);

    if (snapshot.empty) {
      console.log("Seeding initial alternatives collection in Firestore...");
      for (const [categoryId, data] of Object.entries(DEFAULT_CATEGORY_ALTERNATIVES)) {
        const docRef = doc(db, "alternatives", categoryId);
        await setDoc(docRef, {
          ...data,
          updatedAt: new Date().toISOString(),
        });
      }
      console.log("Successfully seeded default alternatives into Firestore.");
      return true;
    } else {
      // Refresh cache from existing Firestore documents
      const docs: CategoryAlternativeDoc[] = [];
      snapshot.forEach((d) => {
        docs.push({ id: d.id, ...(d.data() as any) });
      });
      updateAlternativesCache(docs);
      return true;
    }
  } catch (err) {
    console.warn("Could not seed or fetch cloud alternatives, using local offline fallback:", err);
    return false;
  }
}

/**
 * Fetch all category alternatives from Firestore
 */
export async function fetchCategoryAlternativesFromCloud(): Promise<CategoryAlternativeDoc[]> {
  try {
    const colRef = collection(db, "alternatives");
    const snapshot = await getDocs(colRef);
    const docs: CategoryAlternativeDoc[] = [];
    snapshot.forEach((d) => {
      docs.push({ id: d.id, ...(d.data() as any) });
    });
    if (docs.length > 0) {
      updateAlternativesCache(docs);
    }
    return docs;
  } catch (err) {
    console.warn("fetchCategoryAlternativesFromCloud error:", err);
    return Object.values(DEFAULT_CATEGORY_ALTERNATIVES);
  }
}

/**
 * Save or update a category alternative document in Firestore
 */
export async function saveCategoryAlternativeToCloud(
  categoryId: string,
  docData: Partial<CategoryAlternativeDoc>
): Promise<boolean> {
  try {
    const docRef = doc(db, "alternatives", categoryId);
    await setDoc(
      docRef,
      {
        ...docData,
        id: categoryId,
        category_id: categoryId,
        updatedAt: new Date().toISOString(),
      },
      { merge: true }
    );
    // Refresh memory cache
    const existing = await getDoc(docRef);
    if (existing.exists()) {
      updateAlternativesCache([{ id: existing.id, ...(existing.data() as any) }]);
    }
    return true;
  } catch (err) {
    console.error("saveCategoryAlternativeToCloud error:", err);
    return false;
  }
}

/**
 * Realtime listener for alternatives collection
 */
export function listenToCategoryAlternatives(callback: (docs: CategoryAlternativeDoc[]) => void) {
  try {
    const colRef = collection(db, "alternatives");
    return onSnapshot(
      colRef,
      (snapshot) => {
        const docs: CategoryAlternativeDoc[] = [];
        snapshot.forEach((d) => {
          docs.push({ id: d.id, ...(d.data() as any) });
        });
        if (docs.length > 0) {
          updateAlternativesCache(docs);
        }
        callback(docs);
      },
      (err) => {
        console.warn("listenToCategoryAlternatives warning:", err);
      }
    );
  } catch (err) {
    console.warn("Could not attach realtime alternatives listener:", err);
    return () => {};
  }
}


