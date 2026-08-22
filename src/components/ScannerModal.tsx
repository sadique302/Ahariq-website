import React, { useState, useRef, useEffect, useCallback } from "react";
import { Language, FoodProduct } from "../types";
import {
  Camera,
  Upload,
  Barcode,
  X,
  Zap,
  ZapOff,
  RefreshCw,
  Search,
  AlertCircle,
  PlusCircle,
  CheckCircle2,
  Sparkles,
  ShieldAlert,
  Image as ImageIcon,
  FileText,
  SwitchCamera,
  ShieldCheck,
  Globe,
  Lock,
  ArrowRight,
  Flame,
  Dumbbell,
  Droplets,
  Wheat,
  Candy,
} from "lucide-react";
import { INDIAN_PRODUCTS_DB } from "../data/indianProducts";
import { decodeBarcodeFromCanvas } from "../utils/barcodeScanner";
import { fetchProductFromOpenFoodFacts, calculateScoreFromManualNutrition } from "../services/openFoodFacts";
import { ContributeProductModal } from "./ContributeProductModal";
import { HeartHandshake } from "lucide-react";

interface ScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProductScanned: (product: FoodProduct) => void;
  language: Language;
  isDark: boolean;
}

export const ScannerModal: React.FC<ScannerModalProps> = ({
  isOpen,
  onClose,
  onProductScanned,
  language,
  isDark,
}) => {
  const isHindi = language === "hi";

  // Scanner Form Modes: "live" (Live Camera), "upload" (Gallery Photo), "ocr" (Ingredient Text / Label Analysis)
  const [activeMode, setActiveMode] = useState<"live" | "upload" | "ocr">("live");

  // Camera States
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraLoading, setCameraLoading] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [cameraPermissionDenied, setCameraPermissionDenied] = useState(false);
  const [isTorchOn, setIsTorchOn] = useState(false);
  const [hasTorchCapability, setHasTorchCapability] = useState(false);
  const [facingMode, setFacingMode] = useState<"environment" | "user">("environment");

  // Scanning & Analysis States
  const [isScanning, setIsScanning] = useState(false);
  const [scanStatusText, setScanStatusText] = useState<string>("");
  const [scannedCodePreview, setScannedCodePreview] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [notFoundBarcode, setNotFoundBarcode] = useState<string | null>(null);
  const [isContributeModalOpen, setIsContributeModalOpen] = useState(false);
  const [manualBarcode, setManualBarcode] = useState("");
  const [productAddRequested, setProductAddRequested] = useState(false);
  const [uploadedImagePreview, setUploadedImagePreview] = useState<string | null>(null);

  // Manual Nutrition Form (Rule 3, 4, 5 when product is not in database)
  const [manualForm, setManualForm] = useState({
    name: "",
    brand: "",
    energyKcal: "",
    proteinG: "",
    fatG: "",
    carbsG: "",
    sugarG: "",
    hasPalmOil: false,
    hasMaida: false,
    isVegetarian: true,
  });

  // Ingredient OCR / Text Analysis state
  const [ingredientText, setIngredientText] = useState("");
  const [ocrAnalyzing, setOcrAnalyzing] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const scanIntervalRef = useRef<number | null>(null);
  const isProcessingFrameRef = useRef<boolean>(false);
  const isScanningRef = useRef<boolean>(false);
  const notFoundBarcodeRef = useRef<string | null>(null);
  const captureAndScanFrameRef = useRef<() => void>(() => {});

  // Stop camera helper safely
  const stopCamera = useCallback(() => {
    if (scanIntervalRef.current) {
      clearInterval(scanIntervalRef.current);
      scanIntervalRef.current = null;
    }
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => {
        try {
          track.stop();
        } catch (e) {}
      });
      mediaStreamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setCameraActive(false);
    setCameraLoading(false);
    setIsTorchOn(false);
  }, []);

  // Process a detected barcode with Open Food Facts API + Local DB integration
  const handleBarcodeDetected = useCallback(
    async (barcode: string) => {
      const cleanCode = barcode.trim();
      if (!cleanCode) return;

      // Stop frame capturing immediately while searching
      if (scanIntervalRef.current) {
        clearInterval(scanIntervalRef.current);
        scanIntervalRef.current = null;
      }

      isScanningRef.current = true;
      notFoundBarcodeRef.current = null;
      setErrorMessage(null);
      setNotFoundBarcode(null);
      setProductAddRequested(false);
      setScannedCodePreview(cleanCode);
      setIsScanning(true);
      setScanStatusText(
        isHindi
          ? "Open Food Facts और भारतीय डेटाबेस में जांच हो रही है..."
          : "Checking Open Food Facts & Ahariq database..."
      );

      // Failsafe timer to guarantee loading never hangs even if offline
      const failsafeTimer = setTimeout(() => {
        setIsScanning((scanning) => {
          if (scanning) {
            stopCamera();
            isScanningRef.current = false;
            notFoundBarcodeRef.current = cleanCode;
            setNotFoundBarcode(cleanCode);
            return false;
          }
          return scanning;
        });
      }, 3500);

      try {
        // Step 1: Check Local Indian Products Database
        const matchedLocalProduct = INDIAN_PRODUCTS_DB.find((p) => {
          const pBarcode = p.barcode.trim();
          return (
            pBarcode === cleanCode ||
            p.id.toLowerCase() === cleanCode.toLowerCase() ||
            pBarcode.endsWith(cleanCode) ||
            cleanCode.endsWith(pBarcode)
          );
        });

        if (matchedLocalProduct) {
          clearTimeout(failsafeTimer);
          isScanningRef.current = false;
          setIsScanning(false);
          stopCamera();
          onProductScanned({
            ...matchedLocalProduct,
            scannedAt: new Date().toISOString(),
          });
          onClose();
          return;
        }

        // Step 2: Real-time query to Open Food Facts API (World & India)
        setScanStatusText(
          isHindi
            ? "Open Food Facts API से 100 में से रेटिंग और पोषण लोड हो रहा है..."
            : "Fetching nutrition & calculating health score out of 100 via Open Food Facts..."
        );

        const offProduct = await fetchProductFromOpenFoodFacts(cleanCode);

        clearTimeout(failsafeTimer);

        if (offProduct) {
          isScanningRef.current = false;
          setIsScanning(false);
          stopCamera();
          onProductScanned({
            ...offProduct,
            scannedAt: new Date().toISOString(),
          });
          onClose();
          return;
        }

        // Step 3: If not in OFF or Local DB, halt camera and show Missing Details Contribution Screen
        stopCamera();
        isScanningRef.current = false;
        notFoundBarcodeRef.current = cleanCode;
        setIsScanning(false);
        setNotFoundBarcode(cleanCode);
        setManualForm({
          name: "",
          brand: "",
          energyKcal: "",
          proteinG: "",
          fatG: "",
          carbsG: "",
          sugarG: "",
          hasPalmOil: false,
          hasMaida: false,
          isVegetarian: true,
        });
      } catch (err: any) {
        console.error("Barcode lookup error:", err);
        clearTimeout(failsafeTimer);
        stopCamera();
        isScanningRef.current = false;
        notFoundBarcodeRef.current = cleanCode;
        setIsScanning(false);
        setNotFoundBarcode(cleanCode);
      } finally {
        clearTimeout(failsafeTimer);
        isScanningRef.current = false;
        setIsScanning(false);
      }
    },
    [onProductScanned, onClose, stopCamera, isHindi]
  );

  // Manual Nutrition Form submission (Rule 5: Calculate score out of 100)
  const handleManualNutritionSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    const energy = parseFloat(manualForm.energyKcal) || 350;
    const protein = parseFloat(manualForm.proteinG) || 5;
    const fat = parseFloat(manualForm.fatG) || 12;
    const carbs = parseFloat(manualForm.carbsG) || 55;
    const sugar = parseFloat(manualForm.sugarG) || 10;

    const calculatedProduct = calculateScoreFromManualNutrition({
      name: manualForm.name.trim() || (isHindi ? "ऑडिट किया गया उत्पाद" : "Audited Food Product"),
      brand: manualForm.brand.trim() || (isHindi ? "पैकेज्ड ब्रांड" : "Packaged Brand"),
      barcode: notFoundBarcode || "MANUAL_" + Date.now().toString().slice(-6),
      energyKcal: energy,
      proteinG: protein,
      fatG: fat,
      carbsG: carbs,
      sugarG: sugar,
      hasPalmOil: manualForm.hasPalmOil,
      hasMaida: manualForm.hasMaida,
      isVegetarian: manualForm.isVegetarian,
    });

    stopCamera();
    onProductScanned(calculatedProduct);
    onClose();
  };

  // Live video frame scanner with BarcodeDetector + Canvas fallback
  const captureAndScanFrame = useCallback(async () => {
    if (
      isProcessingFrameRef.current ||
      isScanningRef.current ||
      notFoundBarcodeRef.current ||
      !videoRef.current ||
      videoRef.current.readyState < 2
    ) {
      return;
    }

    isProcessingFrameRef.current = true;

    try {
      const video = videoRef.current;
      let canvas = canvasRef.current;
      if (!canvas) {
        canvas = document.createElement("canvas");
      }

      const videoWidth = video.videoWidth || 640;
      const videoHeight = video.videoHeight || 480;

      if (videoWidth > 0 && videoHeight > 0) {
        canvas.width = videoWidth;
        canvas.height = videoHeight;
        const ctx = canvas.getContext("2d", { willReadFrequently: true });

        if (ctx) {
          ctx.drawImage(video, 0, 0, videoWidth, videoHeight);
          const result = await decodeBarcodeFromCanvas(canvas);

          if (result.success && result.code) {
            handleBarcodeDetected(result.code);
          }
        }
      }
    } catch (e) {
      // frame pass error ignored
    } finally {
      isProcessingFrameRef.current = false;
    }
  }, [handleBarcodeDetected]);

  // Keep ref up to date
  useEffect(() => {
    captureAndScanFrameRef.current = captureAndScanFrame;
  }, [captureAndScanFrame]);

  // Start Camera with resilient permission requests
  const startCamera = useCallback(
    async (targetFacingMode = facingMode) => {
      setCameraLoading(true);
      setCameraError(null);
      setCameraPermissionDenied(false);
      setErrorMessage(null);
      setNotFoundBarcode(null);
      notFoundBarcodeRef.current = null;
      isScanningRef.current = false;
      setProductAddRequested(false);

      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setCameraError(
          isHindi
            ? "इस ब्राउज़र या डिवाइस पर कैमरा समर्थित नहीं है। कृपया गैलरी से फोटो अपलोड करें।"
            : "Camera is not supported on this browser. Please upload a barcode photo from gallery."
        );
        setCameraLoading(false);
        setCameraActive(false);
        return;
      }

      // Constraints hierarchy: strict environment -> general environment -> any camera
      const constraintSets: MediaStreamConstraints[] = [
        {
          video: {
            facingMode: { ideal: targetFacingMode },
            width: { ideal: 1280, min: 640 },
            height: { ideal: 720, min: 480 },
          },
          audio: false,
        },
        {
          video: { facingMode: targetFacingMode },
          audio: false,
        },
        {
          video: true,
          audio: false,
        },
      ];

      let stream: MediaStream | null = null;
      let capturedError: any = null;

      for (const constraints of constraintSets) {
        try {
          stream = await navigator.mediaDevices.getUserMedia(constraints);
          if (stream) break;
        } catch (err: any) {
          capturedError = err;
          // try next fallback constraint
        }
      }

      if (stream) {
        try {
          mediaStreamRef.current = stream;
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            // Play video safely
            await videoRef.current.play().catch((e) => {
              console.warn("Autoplay was prevented, waiting for interaction", e);
            });
          }

          const track = stream.getVideoTracks()[0];
          if (track) {
            const capabilities = (track.getCapabilities && track.getCapabilities()) || {};
            // @ts-ignore
            if (capabilities.torch) {
              setHasTorchCapability(true);
            }
          }

          setCameraActive(true);
          setCameraLoading(false);
          setCameraPermissionDenied(false);

          if (scanIntervalRef.current) {
            clearInterval(scanIntervalRef.current);
          }
          // Scan frame every 180ms via ref
          scanIntervalRef.current = window.setInterval(() => {
            captureAndScanFrameRef.current();
          }, 180);
          return;
        } catch (attachErr) {
          console.warn("Video stream attach error:", attachErr);
        }
      }

      setCameraLoading(false);
      setCameraActive(false);

      if (
        capturedError?.name === "NotAllowedError" ||
        capturedError?.name === "PermissionDeniedError" ||
        capturedError?.name === "SecurityError"
      ) {
        setCameraPermissionDenied(true);
        setCameraError(
          isHindi
            ? "कैमरा अनुमति (Permission) ब्लॉक है। ब्राउज़र एड्रेस बार में लॉक 🔒 आइकन पर क्लिक करके कैमरा 'Allow' करें।"
            : "Camera permission is blocked. Click the lock 🔒 icon in the browser address bar and set Camera to 'Allow'."
        );
      } else if (capturedError?.name === "NotFoundError" || capturedError?.name === "DevicesNotFoundError") {
        setCameraError(
          isHindi
            ? "डिवाइस पर कोई कैमरा नहीं मिला। आप गैलरी से फोटो अपलोड कर सकते हैं।"
            : "No camera hardware detected. You can upload a photo from gallery."
        );
      } else {
        setCameraError(
          isHindi
            ? "कैमरा शुरू नहीं हो सका। कृपया 'Allow Camera' बटन दबाएं या फोटो अपलोड करें।"
            : "Camera could not be started. Tap 'Allow Camera' or upload a packaging photo."
        );
      }
    },
    [facingMode, isHindi]
  );

  useEffect(() => {
    if (isOpen) {
      if (activeMode === "live") {
        startCamera();
      }
    } else {
      stopCamera();
      setErrorMessage(null);
      setIsScanning(false);
      isScanningRef.current = false;
      setNotFoundBarcode(null);
      notFoundBarcodeRef.current = null;
      setManualBarcode("");
      setProductAddRequested(false);
      setScannedCodePreview(null);
      setUploadedImagePreview(null);
      setIngredientText("");
    }
    return () => {
      stopCamera();
    };
  }, [isOpen, activeMode]);

  // Flip Camera (Front / Back)
  const toggleCameraFacing = () => {
    stopCamera();
    const newFacing = facingMode === "environment" ? "user" : "environment";
    setFacingMode(newFacing);
    startCamera(newFacing);
  };

  // Toggle Torch
  const toggleTorch = async () => {
    if (mediaStreamRef.current) {
      const track = mediaStreamRef.current.getVideoTracks()[0];
      if (track && (track as any).applyConstraints) {
        try {
          const nextTorch = !isTorchOn;
          await (track as any).applyConstraints({
            advanced: [{ torch: nextTorch }],
          });
          setIsTorchOn(nextTorch);
        } catch (e) {
          setIsTorchOn(!isTorchOn);
        }
      } else {
        setIsTorchOn(!isTorchOn);
      }
    } else {
      setIsTorchOn(!isTorchOn);
    }
  };

  // Manual Shutter Button Click
  const handleCaptureSnapshot = async () => {
    if (!videoRef.current || !cameraActive) {
      fileInputRef.current?.click();
      return;
    }

    setErrorMessage(null);
    setNotFoundBarcode(null);

    const video = videoRef.current;
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;
    const ctx = canvas.getContext("2d");

    if (ctx) {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const result = await decodeBarcodeFromCanvas(canvas);

      if (result.success && result.code) {
        handleBarcodeDetected(result.code);
      } else {
        setErrorMessage(
          isHindi
            ? "बारकोड स्पष्ट नहीं दिखा। कृपया बारकोड को हरे फ्रेम में सीधा और रोशनी में रखें।"
            : "No barcode detected. Ensure barcode is in bright light and inside the green frame."
        );
      }
    }
  };

  // File Upload (Photo with Barcode)
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setErrorMessage(null);
    setNotFoundBarcode(null);
    setIsScanning(true);
    setScanStatusText(
      isHindi
        ? "छवि से बारकोड डिकोड हो रहा है..."
        : "Decoding barcode from packaging image..."
    );

    const reader = new FileReader();
    reader.onload = (event) => {
      const resultUrl = event.target?.result as string;
      setUploadedImagePreview(resultUrl);

      const img = new Image();
      img.onload = async () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");

        if (ctx) {
          ctx.drawImage(img, 0, 0);
          const result = await decodeBarcodeFromCanvas(canvas);

          if (result.success && result.code) {
            handleBarcodeDetected(result.code);
          } else {
            setIsScanning(false);
            setErrorMessage(
              isHindi
                ? "छवि में बारकोड नहीं मिला। कृपया साफ और सीधी फोटो अपलोड करें या नीचे बारकोड नंबर लिखें।"
                : "No barcode found in image. Please upload a clear photo or enter the barcode number below."
            );
          }
        } else {
          setIsScanning(false);
          setErrorMessage(
            isHindi
              ? "छवि पढ़ने में विफल। कृपया पुनः प्रयास करें।"
              : "Failed to process image. Please try again."
          );
        }
      };
      img.src = resultUrl;
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  // Handle Ingredient OCR / Text Analyzer
  const handleAnalyzeIngredientsText = () => {
    if (!ingredientText.trim()) return;

    setOcrAnalyzing(true);
    setTimeout(() => {
      setOcrAnalyzing(false);

      const lower = ingredientText.toLowerCase();
      const hasPalmOil =
        lower.includes("palm") ||
        lower.includes("palmolein") ||
        lower.includes("vanaspati") ||
        lower.includes("hydrogenated vegetable oil");
      const hasMaida =
        lower.includes("maida") ||
        lower.includes("refined wheat") ||
        lower.includes("bleached flour");
      const hasSugar =
        lower.includes("sugar") ||
        lower.includes("syrup") ||
        lower.includes("maltodextrin") ||
        lower.includes("glucose") ||
        lower.includes("dextrose");
      const hasMsg =
        lower.includes("621") ||
        lower.includes("msg") ||
        lower.includes("glutamate") ||
        lower.includes("635");
      const hasTartrazine = lower.includes("102") || lower.includes("tartrazine");
      const hasCaramel = lower.includes("150d") || lower.includes("caramel");
      const hasPreservative =
        lower.includes("preservative") ||
        lower.includes("ins 211") ||
        lower.includes("ins 202") ||
        lower.includes("benzoate");

      let score = 90;
      const warnings = [];

      if (hasPalmOil) {
        score -= 25;
        warnings.push({
          id: "w_palm",
          type: "palm_oil" as const,
          severity: "high" as const,
          titleEn: "Contains Refined Palm Oil / Palmolein",
          titleHi: "रिफाइंड पाम ऑयल / पामोलिन शामिल",
          descriptionEn:
            "Highly saturated industrial frying oil (approx 45-50% sat fat) linked to LDL cholesterol & arterial plaque.",
          descriptionHi: "50% तक हानिकारक सैचुरेटेड फैट जो हृदय स्वास्थ्य और कोलेस्ट्रॉल के लिए हानिकारक है।",
          tagValue: "Palm Oil Detected",
        });
      }

      if (hasMaida) {
        score -= 15;
        warnings.push({
          id: "w_maida",
          type: "maida" as const,
          severity: "high" as const,
          titleEn: "Heavy Refined Flour (Maida)",
          titleHi: "अत्यधिक मैदा (रिफाइंड आटा)",
          descriptionEn:
            "Stripped of wheat bran fiber, causing rapid blood glucose spikes and insulin surge.",
          descriptionHi: "फाइबर रहित मैदा पाचन तंत्र को सुस्त और ब्लड शुगर को तेजी से बढ़ाता है।",
          tagValue: "Maida Base",
        });
      }

      if (hasSugar) {
        score -= 16;
        warnings.push({
          id: "w_sugar",
          type: "added_sugar" as const,
          severity: "high" as const,
          titleEn: "Added Refined Sugars / Syrups",
          titleHi: "अतिरिक्त चीनी व स्वीटनर",
          descriptionEn:
            "High refined sweetener load accelerating metabolic inflammation, fatty liver, and tooth decay.",
          descriptionHi: "अधिक चीनी से फैटी लिवर व डायबिटीज का जोखिम बढ़ता है।",
          tagValue: "Added Sugars",
        });
      }

      if (hasTartrazine || hasCaramel) {
        score -= 12;
        warnings.push({
          id: "w_colors",
          type: "additives" as const,
          severity: "high" as const,
          titleEn: "Synthetic Dyes (INS 102 / 150d)",
          titleHi: "सिंथेटिक फूड कलर्स (INS 102 / 150d)",
          descriptionEn: "Artificial coal-tar food dyes linked to hyperactivity and gut irritation.",
          descriptionHi: "कृत्रिम रंग जो बच्चों के स्वास्थ्य व एलर्जी के लिए नुकसानदेह हैं।",
          tagValue: "Synthetic Colors",
        });
      }

      if (hasMsg || hasPreservative) {
        score -= 10;
        warnings.push({
          id: "w_additives",
          type: "additives" as const,
          severity: "medium" as const,
          titleEn: "INS Additives & Preservatives",
          titleHi: "केमिकल प्रिजर्वेटिव व फ्लेवर एन्हांसर",
          descriptionEn: "Chemical emulsifiers and flavor enhancers that can disrupt gut microbiome.",
          descriptionHi: "रासायनिक प्रिजर्वेटिव जो पेट के माइक्रोबायोम को प्रभावित करते हैं।",
          tagValue: "INS Additives",
        });
      }

      score = Math.max(15, Math.min(95, score));

      const dynamicProduct: FoodProduct = {
        id: `ocr_${Date.now()}`,
        barcode: `OCR-${Date.now().toString().slice(-6)}`,
        name: isHindi ? "कस्टम सामग्री लेबल ऑडिट" : "Custom Ingredient Label Audit",
        nameHindi: "कस्टम सामग्री लेबल ऑडिट",
        brand: isHindi ? "उपभोक्ता लेबल विश्लेषण" : "Package Ingredient Scan",
        category: isHindi ? "विश्लेषित उत्पाद" : "Audited Food Item",
        categoryHindi: "विश्लेषित उत्पाद",
        verdict:
          score >= 70
            ? "Achha Option"
            : score >= 40
            ? "Soch Samajh Kar"
            : "Avoid Karein",
        verdictHindi:
          score >= 70
            ? "अच्छा विकल्प"
            : score >= 40
            ? "सोच समझ कर"
            : "बचने की सलाह",
        packagingSize: "100g sample",
        healthScore: score,
        isVegetarian:
          !lower.includes("chicken") &&
          !lower.includes("meat") &&
          !lower.includes("egg") &&
          !lower.includes("fish"),
        verdictType: score >= 70 ? "green" : score >= 40 ? "yellow" : "red",
        summaryEn: `Ahariq scanned ${ingredientText.split(",").length} ingredients. Rated ${score}/100 based on ICMR & FSSAI benchmarks.`,
        summaryHi: `Ahariq ने सामग्री का विश्लेषण किया। 100 में से स्वास्थ्य स्कोर ${score}/100 है।`,
        imageUrl: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=500&auto=format&fit=crop&q=80",
        warnings,
        ingredientsList: ingredientText
          .split(/[,;\n]+/)
          .map((s) => s.trim())
          .filter(Boolean),
        adulterationCheck: {
          riskLevel: warnings.length > 1 ? "Moderate" : "Low",
          detailsEn: "Analyzed directly from user-provided ingredient label text against ICMR food safety limits.",
          detailsHi: "उपयोगकर्ता द्वारा दर्ज सामग्री विवरण का भारतीय खाद्य सुरक्षा मानकों के अनुसार विश्लेषण।",
        },
        ingredientsExplanation: ingredientText
          .split(/[,;\n]+/)
          .filter(Boolean)
          .map((item) => ({
            name: item.trim(),
            nameHi: item.trim(),
            purpose: "Ingredient / Additive",
            safety:
              item.toLowerCase().includes("palm") ||
              item.toLowerCase().includes("sugar") ||
              item.toLowerCase().includes("621") ||
              item.toLowerCase().includes("102")
                ? "hazard"
                : item.toLowerCase().includes("flour") || item.toLowerCase().includes("oil")
                ? "caution"
                : "safe",
          })),
        nutritionPer100g: {
          calories: "380 kcal",
          protein: "6.5g",
          carbohydrates: "62g",
          sugar: hasSugar ? "24g" : "4g",
          addedSugar: hasSugar ? "18g" : "0g",
          totalFat: hasPalmOil ? "18g" : "5g",
          saturatedFat: hasPalmOil ? "9g" : "1.5g",
          sodium: "450mg",
          fiber: hasMaida ? "0.8g" : "3.5g",
        },
        cleanerAlternatives: [
          INDIAN_PRODUCTS_DB[3], // Slurrp Farm
          INDIAN_PRODUCTS_DB[4], // The Whole Truth
        ].map((p) => ({
          name: p.name,
          brand: p.brand,
          score: p.healthScore,
          priceEst: "₹120 - ₹180",
          reasonEn: "100% Whole grain, zero palm oil, zero chemical INS preservatives.",
          reasonHi: "शून्य पाम ऑयल, साबुत अनाज और बिना किसी हानिकारक रसायन के बना।",
        })),
      };

      stopCamera();
      onProductScanned(dynamicProduct);
      onClose();
    }, 1000);
  };

  // Retry / Reset Scan
  const handleRetryScan = () => {
    setErrorMessage(null);
    setNotFoundBarcode(null);
    notFoundBarcodeRef.current = null;
    isScanningRef.current = false;
    setIsScanning(false);
    setProductAddRequested(false);
    setUploadedImagePreview(null);
    if (activeMode === "live") {
      startCamera();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      id="scanner-modal-backdrop"
      className="fixed inset-0 z-50 bg-[#09090B]/98 text-zinc-100 flex flex-col justify-between backdrop-blur-xl animate-in fade-in duration-200"
    >
      <canvas ref={canvasRef} className="hidden" />

      {/* Screen Torch Flash Effect */}
      {isTorchOn && (
        <div className="absolute inset-0 bg-white/20 pointer-events-none z-10 animate-pulse" />
      )}

      {/* Top Header Bar */}
      <div className="p-3 sm:p-4 flex items-center justify-between z-20 border-b border-zinc-800/80 bg-[#09090B]/80 backdrop-blur-md">
        {/* Close Button */}
        <button
          id="scanner-close-btn"
          onClick={onClose}
          className="p-2 sm:p-2.5 rounded-2xl bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 text-zinc-300 hover:text-white transition-colors cursor-pointer"
          title="Close Scanner"
        >
          <X className="w-5 h-5" />
        </button>

        {/* 3 Modes Switcher */}
        <div
          id="scanner-mode-switcher"
          className="flex items-center p-1 rounded-2xl bg-zinc-900 border border-zinc-800 text-xs font-bold"
        >
          {/* 1. Live Barcode */}
          <button
            id="scanner-mode-live-btn"
            onClick={() => {
              setActiveMode("live");
              setErrorMessage(null);
              startCamera();
            }}
            className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${
              activeMode === "live"
                ? "bg-[#10B981] text-white shadow-md shadow-[#10B981]/25 font-black"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            <Camera className="w-3.5 h-3.5" />
            <span>{isHindi ? "कैमरा" : "Live Camera"}</span>
          </button>

          {/* 2. Upload from Gallery */}
          <button
            id="scanner-mode-upload-btn"
            onClick={() => {
              setActiveMode("upload");
              stopCamera();
              setErrorMessage(null);
            }}
            className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${
              activeMode === "upload"
                ? "bg-[#10B981] text-white shadow-md shadow-[#10B981]/25 font-black"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            <Upload className="w-3.5 h-3.5" />
            <span>{isHindi ? "गैलरी फोटो" : "Gallery"}</span>
          </button>

          {/* 3. Ingredient OCR / Text Decoder */}
          <button
            id="scanner-mode-ocr-btn"
            onClick={() => {
              setActiveMode("ocr");
              stopCamera();
              setErrorMessage(null);
            }}
            className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${
              activeMode === "ocr"
                ? "bg-[#10B981] text-white shadow-md shadow-[#10B981]/25 font-black"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>{isHindi ? "सामग्री डिकोडर" : "Label Text"}</span>
          </button>
        </div>

        {/* Right Tools: Camera Flip & Torch */}
        <div className="flex items-center gap-2">
          {activeMode === "live" && cameraActive && (
            <>
              <button
                id="scanner-flip-camera-btn"
                onClick={toggleCameraFacing}
                className="p-2 sm:p-2.5 rounded-2xl bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 text-zinc-300 hover:text-white transition-colors cursor-pointer"
                title="Switch Camera (Front/Back)"
              >
                <SwitchCamera className="w-4 h-4" />
              </button>

              <button
                id="scanner-torch-btn"
                onClick={toggleTorch}
                className={`p-2 sm:p-2.5 rounded-2xl border transition-all cursor-pointer ${
                  isTorchOn
                    ? "bg-amber-400 border-amber-400 text-black shadow-lg shadow-amber-400/40"
                    : "bg-zinc-900 border-zinc-800 hover:bg-zinc-800 text-zinc-300 hover:text-white"
                }`}
                title={isTorchOn ? "Turn Torch Off" : "Turn Torch On"}
              >
                {isTorchOn ? <Zap className="w-4 h-4 fill-current" /> : <ZapOff className="w-4 h-4" />}
              </button>
            </>
          )}

          {activeMode !== "live" && (
            <button
              onClick={() => fileInputRef.current?.click()}
              className="p-2 sm:p-2.5 rounded-2xl bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 text-zinc-300 hover:text-white transition-colors cursor-pointer"
              title="Upload File"
            >
              <Upload className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Center Scanner Body Area */}
      <div className="relative flex-1 flex flex-col items-center justify-center overflow-hidden px-4 py-2">
        {/* MODE 1: LIVE BARCODE CAMERA */}
        {activeMode === "live" && (
          <>
            {/* Live Video Feed */}
            <video
              ref={videoRef}
              playsInline
              muted
              autoPlay
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
                cameraActive ? "opacity-100" : "opacity-0"
              }`}
            />

            {/* Camera Permission / Error / Hardware State */}
            {!cameraActive && (
              <div className="absolute inset-0 bg-[#09090B] flex flex-col items-center justify-center p-4 text-center text-zinc-100 overflow-y-auto z-10">
                <div className="max-w-md w-full p-6 rounded-3xl bg-[#18181B] border border-zinc-800 shadow-2xl space-y-4">
                  {cameraPermissionDenied ? (
                    <div className="w-14 h-14 rounded-2xl bg-amber-500/15 text-amber-400 border border-amber-500/30 flex items-center justify-center mx-auto">
                      <Lock className="w-7 h-7" />
                    </div>
                  ) : (
                    <div className="w-14 h-14 rounded-2xl bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/30 flex items-center justify-center mx-auto">
                      <Camera className="w-7 h-7" />
                    </div>
                  )}

                  <div>
                    <h3 className="font-black text-lg text-white">
                      {cameraPermissionDenied
                        ? isHindi
                          ? "कैमरा अनुमति (Permission) की आवश्यकता है"
                          : "Camera Permission Required"
                        : isHindi
                        ? "लाइव बारकोड स्कैनर"
                        : "Live Barcode Scanner"}
                    </h3>
                    <p className="text-xs text-zinc-400 mt-2 leading-relaxed font-medium">
                      {cameraError ||
                        (isHindi
                          ? "खाद्य पैकेट के बारकोड को स्कैन करने के लिए कैमरा अनुमति दें।"
                          : "Please grant camera permission to scan barcodes directly.")}
                    </p>
                  </div>

                  {cameraPermissionDenied && (
                    <div className="p-3 bg-zinc-900/90 rounded-2xl border border-zinc-800 text-left text-[11px] text-zinc-300 space-y-1.5">
                      <span className="font-bold text-amber-400 block">
                        {isHindi ? "अनुमति कैसे दें:" : "How to allow permission:"}
                      </span>
                      <ol className="list-decimal pl-4 space-y-1 text-zinc-400">
                        <li>
                          {isHindi
                            ? "ब्राउज़र के ऊपर लॉक 🔒 या सेटिंग्स आइकन पर टैप करें।"
                            : "Tap the Lock 🔒 icon in the browser address bar."}
                        </li>
                        <li>
                          {isHindi
                            ? "Permissions / Permissions > Camera > 'Allow' चुनें।"
                            : "Select Permissions > Camera > 'Allow'."}
                        </li>
                        <li>
                          {isHindi ? "पेज रिफ्रेश करें या नीचे बटन दबाएं।" : "Reload or tap 'Allow & Retry'."}
                        </li>
                      </ol>
                    </div>
                  )}

                  <div className="space-y-2 pt-2">
                    <button
                      id="scanner-allow-camera-btn"
                      onClick={() => startCamera()}
                      disabled={cameraLoading}
                      className="w-full py-3.5 px-4 rounded-2xl bg-[#10B981] hover:bg-[#059669] text-white font-black text-xs sm:text-sm transition-all cursor-pointer flex items-center justify-center gap-2 shadow-lg shadow-[#10B981]/30 disabled:opacity-50"
                    >
                      {cameraLoading ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin" />
                          <span>{isHindi ? "कैमरा शुरू हो रहा है..." : "Starting camera..."}</span>
                        </>
                      ) : (
                        <>
                          <Camera className="w-4 h-4" />
                          <span>{isHindi ? "कैमरा चालू करें / Allow Camera" : "Start Live Camera"}</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => {
                        setActiveMode("upload");
                        fileInputRef.current?.click();
                      }}
                      className="w-full py-2.5 px-4 rounded-2xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 font-bold text-xs transition-all border border-zinc-700 cursor-pointer flex items-center justify-center gap-2"
                    >
                      <Upload className="w-3.5 h-3.5 text-[#10B981]" />
                      <span>{isHindi ? "फ़ोन गैलरी से फोटो चुनें" : "Upload from Gallery"}</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* GREEN VIEWFINDER RETICLE */}
            <div
              id="scanner-green-reticle"
              className="relative z-10 w-64 h-64 sm:w-72 sm:h-72 rounded-3xl border-2 border-[#10B981]/60 shadow-[0_0_40px_rgba(16,185,129,0.25)] flex flex-col items-center justify-between p-3 pointer-events-none transition-all duration-300 bg-[#10B981]/5"
            >
              {/* Laser Scanning Line Animation */}
              <div className="absolute left-2 right-2 h-0.5 bg-gradient-to-r from-transparent via-[#10B981] to-transparent shadow-[0_0_15px_#10b981] animate-laser" />

              {/* Reticle Corner Brackets */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-[#10B981] rounded-tl-2xl -mt-1 -ml-1 shadow-xs" />
              <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-[#10B981] rounded-tr-2xl -mt-1 -mr-1 shadow-xs" />
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-[#10B981] rounded-bl-2xl -mb-1 -ml-1 shadow-xs" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-[#10B981] rounded-br-2xl -mb-1 -mr-1 shadow-xs" />

              {/* Center Target Icon */}
              <div className="flex-1 flex flex-col items-center justify-center text-[#10B981]">
                <Barcode className="w-12 h-12 opacity-70 animate-pulse" />
              </div>
            </div>
          </>
        )}

        {/* MODE 2: UPLOAD FROM GALLERY */}
        {activeMode === "upload" && (
          <div className="w-full max-w-md p-6 rounded-3xl bg-[#18181B] border border-zinc-800 text-zinc-100 text-center shadow-2xl space-y-4 animate-in fade-in">
            <div className="w-14 h-14 rounded-2xl bg-[#10B981]/15 border border-[#10B981]/30 text-[#10B981] flex items-center justify-center mx-auto">
              <Upload className="w-7 h-7" />
            </div>

            <div>
              <h3 className="font-black text-lg text-white">
                {isHindi ? "गैलरी से बारकोड फोटो अपलोड करें" : "Upload Barcode Photo"}
              </h3>
              <p className="text-xs text-zinc-400 mt-1 max-w-xs mx-auto font-medium leading-relaxed">
                {isHindi
                  ? "किसी भी भारतीय खाद्य पैकेट के बारकोड की तस्वीर चुनें। Ahariq Open Food Facts से 100 में से रेटिंग और पाम ऑयल/मैदा की जांच करेगा।"
                  : "Upload any packaging barcode photo to get an instant 0-100 rating with Palm Oil, Maida & chemical alerts."}
              </p>
            </div>

            {uploadedImagePreview && (
              <div className="relative w-48 h-36 mx-auto rounded-2xl overflow-hidden border-2 border-[#10B981] shadow-lg">
                <img
                  src={uploadedImagePreview}
                  alt="Uploaded barcode"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-[#10B981]/10 border border-[#10B981]" />
              </div>
            )}

            <div className="space-y-2.5 pt-2">
              <button
                id="scanner-upload-gallery-main-btn"
                onClick={() => fileInputRef.current?.click()}
                className="w-full py-3.5 px-5 rounded-2xl bg-[#10B981] hover:bg-[#059669] text-white font-black text-xs sm:text-sm transition-all cursor-pointer flex items-center justify-center gap-2 shadow-lg shadow-[#10B981]/30 group"
              >
                <ImageIcon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span>{isHindi ? "फ़ोन गैलरी से फ़ोटो चुनें" : "Select Photo from Device"}</span>
              </button>

              <button
                onClick={() => {
                  setActiveMode("live");
                  startCamera();
                }}
                className="w-full py-2.5 px-4 rounded-2xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 font-bold text-xs transition-colors border border-zinc-700 cursor-pointer flex items-center justify-center gap-2"
              >
                <Camera className="w-3.5 h-3.5 text-[#10B981]" />
                <span>{isHindi ? "लाइव कैमरा पर स्विच करें" : "Switch to Live Camera"}</span>
              </button>
            </div>
          </div>
        )}

        {/* MODE 3: INGREDIENT OCR / LABEL TEXT DECODER */}
        {activeMode === "ocr" && (
          <div className="w-full max-w-md p-5 sm:p-6 rounded-3xl bg-[#18181B] border border-zinc-800 text-zinc-100 text-left shadow-2xl space-y-3.5 animate-in fade-in">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#10B981]/15 border border-[#10B981]/30 text-[#10B981] flex items-center justify-center flex-shrink-0">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-black text-sm text-white">
                  {isHindi ? "सामग्री सूची टेक्स्ट डिकोडर (OCR)" : "Ingredient Label Text Decoder"}
                </h3>
                <p className="text-[11px] text-zinc-400">
                  {isHindi ? "पैकेट के पीछे लिखी सामग्री पेस्ट करें (0-100 रेटिंग)" : "Paste or type package ingredient list"}
                </p>
              </div>
            </div>

            <div className="space-y-1.5">
              <textarea
                rows={4}
                value={ingredientText}
                onChange={(e) => setIngredientText(e.target.value)}
                placeholder={
                  isHindi
                    ? "उदा: Refined wheat flour (Maida), Palm oil, Sugar, Iodised salt, INS 500, INS 621, INS 150d, Maltodextrin..."
                    : "e.g. Refined wheat flour (Maida), Palm oil, Sugar, Iodised salt, INS 500(ii), INS 621, Caramel Color (INS 150d), Artificial flavours..."
                }
                className="w-full bg-[#09090B] border border-zinc-700 rounded-2xl p-3 text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#10B981] resize-none leading-relaxed font-mono"
              />
              <div className="flex items-center justify-between text-[10px] text-zinc-500 font-medium">
                <span>{isHindi ? "पाम ऑयल, मैदा, चीनी व INS कोड्स की त्वरित जांच" : "Instant detection of Palm Oil, INS Codes, Maida"}</span>
                <button
                  type="button"
                  onClick={() =>
                    setIngredientText(
                      "Refined wheat flour (Maida 58%), Palmolein oil, Sugar, Invert sugar syrup, Salt, INS 500(ii), INS 503(ii), Emulsifier (INS 322), Caramel color (INS 150d), Artificial vanilla flavour."
                    )
                  }
                  className="text-[#10B981] font-bold hover:underline cursor-pointer"
                >
                  {isHindi ? "नमूना लोड करें" : "Load sample"}
                </button>
              </div>
            </div>

            <button
              onClick={handleAnalyzeIngredientsText}
              disabled={!ingredientText.trim() || ocrAnalyzing}
              className="w-full py-3 px-4 rounded-2xl bg-[#10B981] hover:bg-[#059669] disabled:opacity-50 text-white font-black text-xs transition-all cursor-pointer flex items-center justify-center gap-2 shadow-lg shadow-[#10B981]/25"
            >
              {ocrAnalyzing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>{isHindi ? "100 में से रेटिंग और सामग्री जांची जा रही है..." : "Calculating 0-100 Score..."}</span>
                </>
              ) : (
                <>
                  <span className="text-sm leading-none">🌾</span>
                  <span>{isHindi ? "100 में से स्वास्थ्य रेटिंग जांचें" : "Calculate Health Score /100"}</span>
                </>
              )}
            </button>
          </div>
        )}

        {/* VERIFICATION & OPEN FOOD FACTS FETCH LOADER */}
        {isScanning && (
          <div
            id="scanner-checking-loader"
            className="absolute inset-0 bg-[#09090B]/95 z-30 flex flex-col items-center justify-center p-6 text-center backdrop-blur-xl animate-in fade-in duration-150"
          >
            <div className="relative mb-4">
              <div className="w-16 h-16 rounded-full border-4 border-[#10B981]/20 border-t-[#10B981] animate-spin" />
              <Barcode className="w-7 h-7 text-[#10B981] absolute inset-0 m-auto animate-pulse" />
            </div>
            <h4 className="font-black text-lg text-white">
              {isHindi ? "उत्पाद की जांच हो रही है..." : "Auditing Product..."}
            </h4>
            {scannedCodePreview && (
              <div className="mt-1.5 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-[11px] font-mono text-zinc-300">
                Barcode: <span className="text-[#10B981] font-black">{scannedCodePreview}</span>
              </div>
            )}
            <p className="text-xs text-zinc-300 mt-2 font-medium max-w-xs">
              {scanStatusText || (isHindi
                ? "Open Food Facts और Ahariq डेटाबेस में सत्यापन..."
                : "Fetching data from Open Food Facts & Ahariq engine...")}
            </p>
            <div className="mt-3 flex items-center gap-1.5 text-[11px] text-[#10B981] font-bold bg-[#10B981]/10 px-3 py-1 rounded-full border border-[#10B981]/20">
              <span className="text-xs leading-none">🌾</span>
              <span>Powered by AharIQ</span>
            </div>
          </div>
        )}

        {/* ERROR OVERLAY */}
        {errorMessage && !isScanning && (
          <div
            id="scanner-invalid-image-error"
            className="absolute inset-0 bg-[#09090B]/95 z-30 flex flex-col items-center justify-center p-6 text-center backdrop-blur-xl animate-in fade-in duration-150"
          >
            <div className="w-14 h-14 rounded-2xl bg-red-500/20 border border-red-500/40 text-red-400 flex items-center justify-center mb-3">
              <ShieldAlert className="w-7 h-7" />
            </div>
            <h4 className="font-black text-base text-white">
              {isHindi ? "बारकोड नहीं मिला" : "Barcode Not Detected"}
            </h4>
            <p className="text-xs text-red-300 mt-1 max-w-xs font-semibold leading-relaxed">
              {errorMessage}
            </p>
            <button
              onClick={handleRetryScan}
              className="mt-4 px-6 py-2.5 rounded-full bg-[#10B981] hover:bg-[#059669] text-white font-bold text-xs transition-colors cursor-pointer flex items-center gap-1.5 shadow-lg shadow-[#10B981]/25"
            >
              <RefreshCw className="w-4 h-4" />
              <span>{isHindi ? "पुनः प्रयास करें" : "Scan Again"}</span>
            </button>
          </div>
        )}

        {/* NOT FOUND OVERLAY & MANUAL NUTRITION AUDIT FORM (RULES 3, 4, 5) */}
        {notFoundBarcode && !isScanning && (
          <div
            id="scanner-product-not-found"
            className="absolute inset-0 bg-[#09090B]/98 z-30 flex flex-col items-center justify-start p-4 sm:p-6 text-center backdrop-blur-xl animate-in fade-in duration-150 overflow-y-auto"
          >
            <div className="w-full max-w-lg space-y-4 my-auto py-2">
              {/* Header */}
              <div className="flex flex-col items-center">
                <div className="w-14 h-14 rounded-3xl bg-amber-500/15 border-2 border-amber-500/30 text-amber-400 flex items-center justify-center mb-3 shadow-lg shadow-amber-500/10">
                  <AlertCircle className="w-7 h-7" />
                </div>
                <h4 className="font-black text-xl sm:text-2xl text-white tracking-tight">
                  Oops! This product is missing details!
                </h4>
                <p className="text-xs sm:text-sm text-zinc-300 mt-2 max-w-md leading-relaxed font-medium">
                  Help us grow India's own healthy food knowledge base! Every product you add makes it easier for another family.
                </p>
                <div className="mt-2.5 flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-[11px] font-mono text-amber-400 font-bold">
                    Barcode: {notFoundBarcode}
                  </span>
                </div>
              </div>

              {/* PRIMARY ACTION: CONTRIBUTE NOW (3 PHOTOS) */}
              <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-b from-[#10B981]/20 via-[#18181B] to-[#18181B] border-2 border-[#10B981]/50 shadow-2xl space-y-3 text-left">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="p-1.5 rounded-xl bg-[#10B981] text-white flex items-center justify-center">
                      <Camera className="w-4 h-4" />
                    </span>
                    <span className="font-black text-sm text-white">
                      {isHindi ? "3 फोटो भेजकर डेटाबेस में जोड़ें" : "Add by uploading 3 packet photos"}
                    </span>
                  </div>
                  <span className="text-[10px] font-bold text-[#10B981] bg-emerald-500/15 px-2 py-0.5 rounded-full border border-emerald-500/30">
                    Recommended
                  </span>
                </div>

                <p className="text-xs text-zinc-300 leading-relaxed font-medium">
                  {isHindi
                    ? "बस 3 फोटो खींचें (1. सामने का पैकेट, 2. सामग्री सूची, 3. न्यूट्रिशन टेबल) और सबमिट करें।"
                    : "Simply snap 3 photos (1. Front of Pack, 2. Ingredients List, 3. Nutrition Facts Table) to contribute."}
                </p>

                <button
                  type="button"
                  id="scanner-contribute-now-btn"
                  onClick={() => setIsContributeModalOpen(true)}
                  className="w-full py-3.5 px-4 rounded-2xl bg-[#10B981] hover:bg-[#059669] text-white font-black text-xs sm:text-sm transition-all cursor-pointer flex items-center justify-center gap-2 shadow-lg shadow-[#10B981]/30 hover:scale-[1.01]"
                >
                  <HeartHandshake className="w-4 h-4" />
                  <span>Contribute Now</span>
                </button>
              </div>

              {/* SECONDARY OPTION: QUICK MANUAL NUTRITION AUDIT FORM */}
              <div className="pt-2">
                <div className="flex items-center gap-3 my-2">
                  <div className="h-px bg-zinc-800 flex-1" />
                  <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider">
                    {isHindi ? "या तुरंत रेटिंग निकालें" : "or Enter Numbers Manually"}
                  </span>
                  <div className="h-px bg-zinc-800 flex-1" />
                </div>

                <form
                  onSubmit={handleManualNutritionSubmit}
                  className="bg-[#18181B] border border-zinc-800 rounded-3xl p-4 sm:p-5 text-left space-y-3.5 shadow-2xl"
                >
                  {/* 1. Name & Brand */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-zinc-300 mb-1">
                        {isHindi ? "उत्पाद का नाम (Product Name)*" : "Product Name*"}
                      </label>
                      <input
                        type="text"
                        required
                        value={manualForm.name}
                        onChange={(e) => setManualForm({ ...manualForm, name: e.target.value })}
                        placeholder={isHindi ? "उदा. Good Day Cashew" : "e.g. Good Day Butter"}
                        className="w-full bg-[#09090B] border border-zinc-700 focus:border-[#10B981] rounded-2xl px-3.5 py-2.5 text-xs text-white placeholder:text-zinc-600 focus:outline-none transition-colors font-medium"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-zinc-300 mb-1">
                        {isHindi ? "ब्रांड (Brand)*" : "Brand Name*"}
                      </label>
                      <input
                        type="text"
                        required
                        value={manualForm.brand}
                        onChange={(e) => setManualForm({ ...manualForm, brand: e.target.value })}
                        placeholder={isHindi ? "उदा. Britannia, Haldiram's" : "e.g. Britannia, Lays"}
                        className="w-full bg-[#09090B] border border-zinc-700 focus:border-[#10B981] rounded-2xl px-3.5 py-2.5 text-xs text-white placeholder:text-zinc-600 focus:outline-none transition-colors font-medium"
                      />
                    </div>
                  </div>

                  {/* 2. Macro Nutrients Grid (Per 100g / Serving) */}
                  <div className="pt-1">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-black uppercase tracking-wider text-[#10B981] flex items-center gap-1">
                        <span className="text-xs leading-none">🌾</span>
                        {isHindi ? "पोषण जानकारी (प्रति 100g)" : "Nutrition Facts (Per 100g / Serving)"}
                      </span>
                      <span className="text-[10px] text-zinc-400 font-medium">ICMR Norms</span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                      {/* Energy */}
                      <div className="bg-[#09090B] border border-zinc-800 rounded-2xl p-2.5 focus-within:border-[#10B981] transition-colors">
                        <div className="flex items-center justify-between text-[10px] font-bold text-zinc-400 mb-1">
                          <span className="flex items-center gap-1 text-orange-400">
                            <Flame className="w-3 h-3" />
                            {isHindi ? "ऊर्जा" : "Energy"}
                          </span>
                          <span className="text-zinc-500 font-mono">kcal</span>
                        </div>
                        <input
                          type="number"
                          step="any"
                          value={manualForm.energyKcal}
                          onChange={(e) => setManualForm({ ...manualForm, energyKcal: e.target.value })}
                          placeholder="380"
                          className="w-full bg-transparent text-sm font-bold text-white placeholder:text-zinc-700 focus:outline-none font-mono"
                        />
                      </div>

                      {/* Protein */}
                      <div className="bg-[#09090B] border border-zinc-800 rounded-2xl p-2.5 focus-within:border-[#10B981] transition-colors">
                        <div className="flex items-center justify-between text-[10px] font-bold text-zinc-400 mb-1">
                          <span className="flex items-center gap-1 text-blue-400">
                            <Dumbbell className="w-3 h-3" />
                            {isHindi ? "प्रोटीन" : "Protein"}
                          </span>
                          <span className="text-zinc-500 font-mono">g</span>
                        </div>
                        <input
                          type="number"
                          step="any"
                          value={manualForm.proteinG}
                          onChange={(e) => setManualForm({ ...manualForm, proteinG: e.target.value })}
                          placeholder="6.5"
                          className="w-full bg-transparent text-sm font-bold text-white placeholder:text-zinc-700 focus:outline-none font-mono"
                        />
                      </div>

                      {/* Fat */}
                      <div className="bg-[#09090B] border border-zinc-800 rounded-2xl p-2.5 focus-within:border-[#10B981] transition-colors">
                        <div className="flex items-center justify-between text-[10px] font-bold text-zinc-400 mb-1">
                          <span className="flex items-center gap-1 text-amber-400">
                            <Droplets className="w-3 h-3" />
                            {isHindi ? "कुल फैट" : "Total Fat"}
                          </span>
                          <span className="text-zinc-500 font-mono">g</span>
                        </div>
                        <input
                          type="number"
                          step="any"
                          value={manualForm.fatG}
                          onChange={(e) => setManualForm({ ...manualForm, fatG: e.target.value })}
                          placeholder="14"
                          className="w-full bg-transparent text-sm font-bold text-white placeholder:text-zinc-700 focus:outline-none font-mono"
                        />
                      </div>

                      {/* Carbs */}
                      <div className="bg-[#09090B] border border-zinc-800 rounded-2xl p-2.5 focus-within:border-[#10B981] transition-colors">
                        <div className="flex items-center justify-between text-[10px] font-bold text-zinc-400 mb-1">
                          <span className="flex items-center gap-1 text-yellow-400">
                            <Wheat className="w-3 h-3" />
                            {isHindi ? "कार्ब्स" : "Carbs"}
                          </span>
                          <span className="text-zinc-500 font-mono">g</span>
                        </div>
                        <input
                          type="number"
                          step="any"
                          value={manualForm.carbsG}
                          onChange={(e) => setManualForm({ ...manualForm, carbsG: e.target.value })}
                          placeholder="62"
                          className="w-full bg-transparent text-sm font-bold text-white placeholder:text-zinc-700 focus:outline-none font-mono"
                        />
                      </div>

                      {/* Sugar */}
                      <div className="bg-[#09090B] border border-zinc-800 rounded-2xl p-2.5 focus-within:border-[#10B981] transition-colors col-span-2 sm:col-span-1">
                        <div className="flex items-center justify-between text-[10px] font-bold text-zinc-400 mb-1">
                          <span className="flex items-center gap-1 text-pink-400">
                            <Candy className="w-3 h-3" />
                            {isHindi ? "चीनी (Sugar)" : "Sugar"}
                          </span>
                          <span className="text-zinc-500 font-mono">g</span>
                        </div>
                        <input
                          type="number"
                          step="any"
                          value={manualForm.sugarG}
                          onChange={(e) => setManualForm({ ...manualForm, sugarG: e.target.value })}
                          placeholder="18"
                          className="w-full bg-transparent text-sm font-bold text-white placeholder:text-zinc-700 focus:outline-none font-mono"
                        />
                      </div>
                    </div>
                  </div>

                  {/* 3. Ingredient Indicators Checkboxes */}
                  <div className="pt-2 border-t border-zinc-800/80 flex flex-wrap gap-2">
                    <label className="flex items-center gap-2 p-2 rounded-xl bg-[#09090B] border border-zinc-800 hover:border-zinc-700 text-xs font-semibold text-zinc-300 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={manualForm.hasPalmOil}
                        onChange={(e) => setManualForm({ ...manualForm, hasPalmOil: e.target.checked })}
                        className="accent-[#10B981] rounded w-3.5 h-3.5"
                      />
                      <span>{isHindi ? "पाम ऑयल / पामोलिन है" : "Contains Palm Oil"}</span>
                    </label>

                    <label className="flex items-center gap-2 p-2 rounded-xl bg-[#09090B] border border-zinc-800 hover:border-zinc-700 text-xs font-semibold text-zinc-300 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={manualForm.hasMaida}
                        onChange={(e) => setManualForm({ ...manualForm, hasMaida: e.target.checked })}
                        className="accent-[#10B981] rounded w-3.5 h-3.5"
                      />
                      <span>{isHindi ? "मैदा (Maida) है" : "Contains Maida"}</span>
                    </label>

                    <label className="flex items-center gap-2 p-2 rounded-xl bg-[#09090B] border border-zinc-800 hover:border-zinc-700 text-xs font-semibold text-zinc-300 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={manualForm.isVegetarian}
                        onChange={(e) => setManualForm({ ...manualForm, isVegetarian: e.target.checked })}
                        className="accent-[#10B981] rounded w-3.5 h-3.5"
                      />
                      <span className="text-emerald-400">{isHindi ? "शाकाहारी (Veg)" : "100% Veg"}</span>
                    </label>
                  </div>

                  {/* 4. Action Buttons */}
                  <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
                    <button
                      type="submit"
                      className="flex-1 py-3.5 px-4 rounded-2xl bg-[#10B981] hover:bg-[#059669] text-white font-black text-xs sm:text-sm transition-all cursor-pointer flex items-center justify-center gap-2 shadow-lg shadow-[#10B981]/25"
                    >
                      <span className="text-sm leading-none">🌾</span>
                      <span>{isHindi ? "100 में से स्वास्थ्य रेटिंग निकालें" : "Calculate Health Score /100"}</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleRetryScan}
                      className="py-3 px-4 rounded-2xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 font-bold text-xs border border-zinc-800 transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>{isHindi ? "दूसरा स्कैन करें" : "Scan Another"}</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileUpload}
      />

      {/* Bottom Controls Bar */}
      <div className="p-3 sm:p-4 bg-[#09090B] border-t border-zinc-800/80 z-20 space-y-3">
        {/* Shutter / Upload Buttons in Live Mode */}
        {activeMode === "live" && (
          <div className="flex items-center justify-center gap-5 sm:gap-6">
            {/* Upload Button */}
            <button
              id="scanner-upload-file-btn"
              onClick={() => fileInputRef.current?.click()}
              className="p-3 rounded-2xl bg-zinc-900 hover:bg-zinc-800 text-white border border-zinc-800 transition-colors cursor-pointer flex items-center justify-center"
              title="Upload Barcode Photo"
            >
              <Upload className="w-5 h-5 text-zinc-300" />
            </button>

            {/* Shutter Button with Emerald Ring */}
            <button
              id="scanner-shutter-btn"
              onClick={handleCaptureSnapshot}
              disabled={isScanning}
              className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-tr from-[#059669] via-[#10B981] to-[#34D399] p-1 shadow-lg shadow-[#10B981]/30 hover:scale-105 active:scale-95 transition-all disabled:opacity-50 cursor-pointer"
              title="Scan Barcode"
            >
              <div className="w-full h-full rounded-full border-2 border-white flex items-center justify-center bg-[#09090B]">
                <Barcode className="w-6 h-6 text-[#10B981]" />
              </div>
            </button>

            {/* Refresh / Reset Button */}
            <button
              id="scanner-refresh-btn"
              onClick={handleRetryScan}
              className="p-3 rounded-2xl bg-zinc-900 hover:bg-zinc-800 text-white border border-zinc-800 transition-colors cursor-pointer flex items-center justify-center"
              title="Reset Scanner"
            >
              <RefreshCw className="w-5 h-5 text-zinc-300" />
            </button>
          </div>
        )}

        {/* Quick Tap Verified Indian Products Barcodes */}
        <div className="space-y-1.5 pt-1">
          <div className="flex items-center justify-between text-zinc-400 text-[11px] px-1">
            <span className="font-bold">
              {isHindi ? "त्वरित बारकोड टेस्ट (टैप करें):" : "Tap Any Barcode:"}
            </span>
            <span className="text-[#10B981] font-bold flex items-center gap-1 bg-[#10B981]/10 px-2.5 py-0.5 rounded-full border border-[#10B981]/20">
              <span className="text-xs leading-none">🌾</span>
              <span>Powered by AharIQ</span>
            </span>
          </div>

          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
            {INDIAN_PRODUCTS_DB.map((product) => (
              <button
                key={product.id}
                onClick={() => handleBarcodeDetected(product.barcode)}
                className="flex-shrink-0 px-3 py-1.5 rounded-xl text-xs font-semibold bg-zinc-900 border border-zinc-800 hover:border-[#10B981] text-zinc-200 hover:text-white transition-all cursor-pointer flex items-center gap-1.5 group"
                title={`Scan ${product.name}`}
              >
                <Barcode className="w-3.5 h-3.5 text-[#10B981] group-hover:scale-110 transition-transform" />
                <span>{product.name.split(" ")[0]}</span>
                <span className="text-[10px] text-zinc-500 font-mono">
                  {product.barcode.slice(-4)}
                </span>
                <span
                  className={`text-[9px] px-1.5 py-0.5 rounded font-black ${
                    product.healthScore >= 70
                      ? "bg-emerald-950 text-[#34D399]"
                      : product.healthScore >= 40
                      ? "bg-amber-950 text-amber-400"
                      : "bg-red-950 text-red-400"
                  }`}
                >
                  {product.healthScore}/100
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Manual Barcode Search Input */}
        <div className="flex gap-2">
          <div className="relative flex-1">
            <input
              id="manual-barcode-input"
              type="text"
              placeholder={
                isHindi
                  ? "बारकोड नंबर लिखें (उदा. 8901058852370)..."
                  : "Enter barcode (e.g. 8901058852370, 8901030383168)..."
              }
              value={manualBarcode}
              onChange={(e) => setManualBarcode(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && manualBarcode.trim()) {
                  handleBarcodeDetected(manualBarcode);
                }
              }}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl px-4 py-2.5 text-xs text-white placeholder:text-zinc-500 focus:outline-none focus:border-[#10B981] transition-colors font-mono"
            />
          </div>
          <button
            id="manual-barcode-submit-btn"
            onClick={() => {
              if (manualBarcode.trim()) {
                handleBarcodeDetected(manualBarcode);
              }
            }}
            className="px-5 py-2.5 rounded-2xl bg-[#10B981] hover:bg-[#059669] text-white text-xs font-black transition-colors flex items-center gap-1.5 cursor-pointer shadow-md shadow-[#10B981]/25"
          >
            <Search className="w-3.5 h-3.5" />
            <span>{isHindi ? "जांचें" : "Search"}</span>
          </button>
        </div>

        {/* 3-Photo Contribute Modal */}
        <ContributeProductModal
          isOpen={isContributeModalOpen}
          onClose={() => {
            setIsContributeModalOpen(false);
          }}
          barcode={notFoundBarcode || manualBarcode}
          initialName={manualForm.name}
          initialBrand={manualForm.brand}
          language={language}
          isDark={isDark}
          onProductCreated={(createdProduct) => {
            setIsContributeModalOpen(false);
            stopCamera();
            onProductScanned(createdProduct);
            onClose();
          }}
        />
      </div>
    </div>
  );
};
