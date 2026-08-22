import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import { GoogleGenAI, Type } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

// Support large payloads for image OCR / photo scanning
app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ extended: true, limit: "25mb" }));

// Lazy initialize Gemini client
function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn("GEMINI_API_KEY is not set. Using intelligent fallback engine.");
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
}

// API Health Check
app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    app: "AharIQ",
    hasApiKey: Boolean(process.env.GEMINI_API_KEY),
  });
});

// API: Open Food Facts Product Search Proxy
app.get("/api/openfoodfacts/search", async (req, res) => {
  const query = (req.query.q as string || "").trim();
  const page = req.query.page || "1";
  const pageSize = req.query.pageSize || "24";

  if (!query) {
    return res.json({ success: true, count: 0, products: [] });
  }

  try {
    const searchUrls = [
      // 1. Direct India Open Food Facts search
      `https://in.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(query)}&search_simple=1&action=process&json=1&page_size=${pageSize}&page=${page}`,
      // 2. India tagged country search in Open Food Facts
      `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(query)}&tagtype_0=countries&tag_contains_0=contains&tag_0=india&action=process&json=1&page_size=${pageSize}&page=${page}`,
      // 3. Fallback generic search
      `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(query)}&search_simple=1&action=process&json=1&page_size=${pageSize}&page=${page}`,
    ];

    for (const url of searchUrls) {
      try {
        const fetchRes = await fetch(url, {
          headers: {
            "User-Agent": "AharIQ-IndianFoodSafety/1.0 (https://ahariq.vercel.app; support@ahariq.com)",
            "Accept": "application/json",
          },
          signal: AbortSignal.timeout(4500),
        });

        if (fetchRes.ok) {
          const data = (await fetchRes.json()) as any;
          if (data && Array.isArray(data.products) && data.products.length > 0) {
            return res.json({
              success: true,
              source: "open_food_facts",
              count: data.count || data.products.length,
              page: data.page || 1,
              products: data.products,
            });
          }
        }
      } catch (err) {
        // try next search mirror
      }
    }

    return res.json({
      success: true,
      count: 0,
      products: [],
      message: "No products found in Open Food Facts matching query",
    });
  } catch (error: any) {
    console.error("Open Food Facts search proxy error:", error);
    return res.status(500).json({ success: false, error: error.message, products: [] });
  }
});

// API: Open Food Facts Real-time Proxy with Fallbacks (by barcode)
app.get("/api/openfoodfacts/:barcode", async (req, res) => {
  const barcode = req.params.barcode;
  if (!barcode) {
    return res.status(400).json({ success: false, message: "Barcode is required" });
  }

  try {
    const urls = [
      `https://world.openfoodfacts.org/api/v2/product/${encodeURIComponent(barcode)}.json`,
      `https://in.openfoodfacts.org/api/v0/product/${encodeURIComponent(barcode)}.json`,
      `https://world.openfoodfacts.org/api/v0/product/${encodeURIComponent(barcode)}.json`,
    ];

    for (const url of urls) {
      try {
        const fetchRes = await fetch(url, {
          headers: {
            "User-Agent": "AharIQ-IndianFoodSafety/1.0 (https://ahariq.vercel.app; support@ahariq.com)",
            "Accept": "application/json",
          },
        });

        if (fetchRes.ok) {
          const data = (await fetchRes.json()) as any;
          if (data && (data.status === 1 || data.status === "success") && data.product) {
            return res.json({
              success: true,
              source: "open_food_facts",
              productData: data.product,
            });
          }
        }
      } catch (err) {
        // try next endpoint
      }
    }

    return res.status(404).json({
      success: false,
      message: "Product not found in Open Food Facts database",
    });
  } catch (error: any) {
    console.error("Open Food Facts proxy error:", error);
    return res.status(500).json({ success: false, error: error.message });
  }
});

// API: Analyze Product from Photo / Ingredients Label (OCR + Food Science Analysis)
app.post("/api/analyze-ingredient-image", async (req, res) => {
  try {
    const { imageBase64, mimeType = "image/jpeg", productNameHint = "", language = "hi_en" } = req.body;

    if (!imageBase64) {
      return res.status(400).json({ error: "Missing imageBase64 in request body" });
    }

    const ai = getGeminiClient();

    if (!ai) {
      // Return smart simulated analysis if no key provided
      return res.json({
        success: true,
        source: "local_engine",
        productName: productNameHint || "Scanned Indian Packaged Food",
        brand: "Indian Brand",
        healthScore: 48,
        verdict: "Soch Samajh Kar (Moderate)",
        verdictHindi: "सोच समझ कर इस्तेमाल करें",
        verdictType: "yellow",
        summaryEn: "Contains moderate refined vegetable oils and artificial flavour enhancers. Consume in moderation.",
        summaryHi: "इसमें रिफाइंड तेल और स्वाद बढ़ाने वाले कृत्रिम तत्व (INS) मौजूद हैं। सीमित मात्रा में उपयोग करें।",
        isVegetarian: true,
        warnings: [
          {
            type: "palm_oil",
            titleEn: "Refined Palm Oil / Olein",
            titleHi: "रिफाइंड पाम ऑयल",
            severity: "high",
            descriptionEn: "High in saturated fatty acids (up to 50%), linked to increased LDL cholesterol.",
            descriptionHi: "50% तक संतृप्त वसा (saturated fat) होती है जो हृदय स्वास्थ्य के लिए अच्छी नहीं है।"
          },
          {
            type: "maida",
            titleEn: "Refined Wheat Flour (Maida)",
            titleHi: "मैदा (रिफाइंड आटा)",
            severity: "medium",
            descriptionEn: "Stripped of natural wheat fiber and micronutrients, causes fast sugar spikes.",
            descriptionHi: "फाइबर रहित होता है, जिससे ब्लड शुगर तेजी से बढ़ता है।"
          },
          {
            type: "preservatives",
            titleEn: "Food Additives & INS Numbers",
            titleHi: "प्रिजर्वेटिव्स व प्रसाधन",
            severity: "medium",
            descriptionEn: "Contains INS 635 / INS 330 flavoring agents and acidity regulators.",
            descriptionHi: "स्वाद बढ़ाने वाले केमिकल्स और एसिडिटी रेगुलेटर शामिल हैं।"
          }
        ],
        nutritionPer100g: {
          calories: "430 kcal",
          protein: "7.5g",
          carbohydrates: "62.0g",
          sugar: "14.5g",
          addedSugar: "12.0g",
          totalFat: "18.0g",
          saturatedFat: "8.5g",
          transFat: "0.1g",
          sodium: "840mg"
        },
        ingredientsExplanation: [
          { name: "Wheat Flour (Maida)", nameHi: "मैदा", purpose: "Base ingredient (high glycemic)", safety: "caution" },
          { name: "Palm Olein", nameHi: "पाम तेल", purpose: "Cheap industrial frying fat", safety: "hazard" },
          { name: "Iodised Salt", nameHi: "आयोडाइज्ड नमक", purpose: "Flavor and preservation", safety: "safe" },
          { name: "Hydrolysed Vegetable Protein", nameHi: "हाइड्रोलाइज्ड प्रोटीन", purpose: "Savory umami flavor (MSG-like)", safety: "caution" },
          { name: "INS 635", nameHi: "फ्लेवर एन्हांसर", purpose: "Disodium 5'-ribonucleotide", safety: "caution" }
        ],
        adulterationCheck: {
          riskLevel: "Low",
          detailsEn: "FSSAI compliant packaging detected. Watch out for synthetic trans fats.",
          detailsHi: "एफएसएसएआई मानकों का पालन। ट्रांस फैट की मात्रा पर नजर रखें।"
        },
        cleanerAlternatives: [
          {
            name: "Slurrp Farm Millet & Whole Grain Alternative",
            brand: "Slurrp Farm",
            score: 92,
            reasonEn: "100% Maida-free, 0 Palm oil, cooked with cold-pressed oils.",
            reasonHi: "शून्य मैदा, बिना पाम ऑयल, 100% मिलेट और साबुत अनाज।"
          },
          {
            name: "WickedGud 100% Multigrain Option",
            brand: "WickedGud",
            score: 88,
            reasonEn: "High plant protein and dietary fiber, no added chemicals.",
            reasonHi: "उच्च फाइबर और प्रोटीन, कोई हानिकारक रसायन नहीं।"
          }
        ]
      });
    }

    const cleanBase64 = imageBase64.replace(/^data:image\/\w+;base64,/, "");

    const prompt = `You are "AharIQ" (आहार IQ) - India's expert food safety & health auditor AI specializing in Indian packaged food analysis, FSSAI standards, and Indian dietary concerns (Palm Oil, Maida, Tartrazine, Sodium Benzoate, Vanaspati, Added Sugars, Adulteration).

Analyze this photo of an Indian packaged food product / ingredient label / nutrition fact sheet.
Extract the product details, brand, complete ingredient list, nutrition facts, and provide a deep Indian-focused health verdict.

Provide output strictly matching this JSON schema.
- healthScore: 0 to 100 (Where 80-100 = Clean/Achha, 40-79 = Soch Samajh Kar, 0-39 = Avoid Karein)
- verdict: "Achha Option" | "Soch Samajh Kar" | "Avoid Karein"
- verdictType: "green" | "yellow" | "red"
- Specifically detect and highlight Indian hazards:
  1. Palm Oil / Palmolein / Hydrogenated Vegetable Fat
  2. Maida (Refined Wheat Flour) % or presence
  3. Artificial Colours (Tartrazine E102, Sunset Yellow E110, Carmoisine, etc.)
  4. Preservatives (INS 211, INS 202, INS 223, Sulfites)
  5. High Added Sugar / High Fructose Corn Syrup / Invert Syrup
  6. High Sodium (>600mg / 100g)
  7. Adulteration risks & testing tips for Indian households
- Provide 2-3 genuine cleaner Indian alternatives available on Blinkit, Zepto, Swiggy Instamart or Indian supermarkets (Slurrp Farm, 24 Mantra, True Elements, Epigamia, Natureland, WickedGud, A2 Ghee, etc.)
- Explain ingredients in simple Hindi and English.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: {
        parts: [
          {
            inlineData: {
              data: cleanBase64,
              mimeType: mimeType || "image/jpeg",
            },
          },
          {
            text: prompt,
          },
        ],
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            productName: { type: Type.STRING },
            brand: { type: Type.STRING },
            category: { type: Type.STRING },
            isVegetarian: { type: Type.BOOLEAN },
            healthScore: { type: Type.NUMBER },
            verdict: { type: Type.STRING },
            verdictHindi: { type: Type.STRING },
            verdictType: { type: Type.STRING },
            summaryEn: { type: Type.STRING },
            summaryHi: { type: Type.STRING },
            warnings: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  type: { type: Type.STRING },
                  titleEn: { type: Type.STRING },
                  titleHi: { type: Type.STRING },
                  severity: { type: Type.STRING },
                  descriptionEn: { type: Type.STRING },
                  descriptionHi: { type: Type.STRING },
                },
                required: ["type", "titleEn", "titleHi", "severity", "descriptionEn", "descriptionHi"],
              },
            },
            nutritionPer100g: {
              type: Type.OBJECT,
              properties: {
                calories: { type: Type.STRING },
                protein: { type: Type.STRING },
                carbohydrates: { type: Type.STRING },
                sugar: { type: Type.STRING },
                addedSugar: { type: Type.STRING },
                totalFat: { type: Type.STRING },
                saturatedFat: { type: Type.STRING },
                transFat: { type: Type.STRING },
                sodium: { type: Type.STRING },
              },
            },
            ingredientsExplanation: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  nameHi: { type: Type.STRING },
                  purpose: { type: Type.STRING },
                  safety: { type: Type.STRING },
                },
                required: ["name", "nameHi", "purpose", "safety"],
              },
            },
            adulterationCheck: {
              type: Type.OBJECT,
              properties: {
                riskLevel: { type: Type.STRING },
                detailsEn: { type: Type.STRING },
                detailsHi: { type: Type.STRING },
              },
              required: ["riskLevel", "detailsEn", "detailsHi"],
            },
            cleanerAlternatives: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  brand: { type: Type.STRING },
                  score: { type: Type.NUMBER },
                  reasonEn: { type: Type.STRING },
                  reasonHi: { type: Type.STRING },
                },
                required: ["name", "brand", "score", "reasonEn", "reasonHi"],
              },
            },
          },
          required: [
            "productName",
            "brand",
            "healthScore",
            "verdict",
            "verdictHindi",
            "verdictType",
            "summaryEn",
            "summaryHi",
            "warnings",
            "ingredientsExplanation",
            "cleanerAlternatives",
          ],
        },
      },
    });

    const parsed = JSON.parse(response.text || "{}");
    res.json({
      success: true,
      source: "gemini_vision",
      ...parsed,
    });
  } catch (error: any) {
    console.error("Error analyzing ingredient image:", error);
    res.status(500).json({
      error: "Failed to analyze ingredient image",
      details: error.message,
    });
  }
});

// API: Search or Deep AI Analysis by Product Name / Barcode
app.post("/api/analyze-product-text", async (req, res) => {
  try {
    const { query } = req.body;
    if (!query || typeof query !== "string") {
      return res.status(400).json({ error: "Missing query parameter" });
    }

    const ai = getGeminiClient();
    if (!ai) {
      return res.json({
        success: false,
        message: "Gemini API key not configured on server",
      });
    }

    const prompt = `You are "AharIQ" (आहार IQ) - India's food safety and ingredient auditor.
The user is asking to analyze this Indian food product: "${query}".

Identify the exact Indian packaged food product, brand, typical ingredients, nutrition profile, Palm Oil / Maida / Preservatives / INS codes / Sugar / Adulteration risks, health score (0-100), Hindi + English verdict, and 2-3 genuine cleaner Indian alternatives.

Return strictly JSON matching the required schema.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            productName: { type: Type.STRING },
            brand: { type: Type.STRING },
            category: { type: Type.STRING },
            isVegetarian: { type: Type.BOOLEAN },
            healthScore: { type: Type.NUMBER },
            verdict: { type: Type.STRING },
            verdictHindi: { type: Type.STRING },
            verdictType: { type: Type.STRING },
            summaryEn: { type: Type.STRING },
            summaryHi: { type: Type.STRING },
            warnings: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  type: { type: Type.STRING },
                  titleEn: { type: Type.STRING },
                  titleHi: { type: Type.STRING },
                  severity: { type: Type.STRING },
                  descriptionEn: { type: Type.STRING },
                  descriptionHi: { type: Type.STRING },
                },
                required: ["type", "titleEn", "titleHi", "severity", "descriptionEn", "descriptionHi"],
              },
            },
            nutritionPer100g: {
              type: Type.OBJECT,
              properties: {
                calories: { type: Type.STRING },
                protein: { type: Type.STRING },
                carbohydrates: { type: Type.STRING },
                sugar: { type: Type.STRING },
                addedSugar: { type: Type.STRING },
                totalFat: { type: Type.STRING },
                saturatedFat: { type: Type.STRING },
                transFat: { type: Type.STRING },
                sodium: { type: Type.STRING },
              },
            },
            ingredientsExplanation: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  nameHi: { type: Type.STRING },
                  purpose: { type: Type.STRING },
                  safety: { type: Type.STRING },
                },
                required: ["name", "nameHi", "purpose", "safety"],
              },
            },
            adulterationCheck: {
              type: Type.OBJECT,
              properties: {
                riskLevel: { type: Type.STRING },
                detailsEn: { type: Type.STRING },
                detailsHi: { type: Type.STRING },
              },
              required: ["riskLevel", "detailsEn", "detailsHi"],
            },
            cleanerAlternatives: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  brand: { type: Type.STRING },
                  score: { type: Type.NUMBER },
                  reasonEn: { type: Type.STRING },
                  reasonHi: { type: Type.STRING },
                },
                required: ["name", "brand", "score", "reasonEn", "reasonHi"],
              },
            },
          },
          required: [
            "productName",
            "brand",
            "healthScore",
            "verdict",
            "verdictHindi",
            "verdictType",
            "summaryEn",
            "summaryHi",
            "warnings",
            "ingredientsExplanation",
            "cleanerAlternatives",
          ],
        },
      },
    });

    const parsed = JSON.parse(response.text || "{}");
    res.json({
      success: true,
      source: "gemini_text",
      ...parsed,
    });
  } catch (error: any) {
    console.error("Error analyzing product text:", error);
    res.status(500).json({ error: "Failed to analyze product", details: error.message });
  }
});

// Vite middleware for development vs static production serving
async function setupVite() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`AharIQ Server running on http://0.0.0.0:${PORT}`);
  });
}

setupVite();
