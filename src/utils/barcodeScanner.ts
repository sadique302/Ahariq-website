import {
  BarcodeFormat,
  DecodeHintType,
  RGBLuminanceSource,
  BinaryBitmap,
  HybridBinarizer,
  MultiFormatReader,
} from "@zxing/library";

// Set up ZXing reader with popular consumer barcode formats
const hints = new Map();
const formats = [
  BarcodeFormat.EAN_13,
  BarcodeFormat.EAN_8,
  BarcodeFormat.UPC_A,
  BarcodeFormat.UPC_E,
  BarcodeFormat.CODE_128,
  BarcodeFormat.CODE_39,
  BarcodeFormat.ITF,
  BarcodeFormat.QR_CODE,
  BarcodeFormat.DATA_MATRIX,
];
hints.set(DecodeHintType.POSSIBLE_FORMATS, formats);
hints.set(DecodeHintType.TRY_HARDER, true);

const zxingReader = new MultiFormatReader();
zxingReader.setHints(hints);

export interface BarcodeScanResult {
  success: boolean;
  code?: string;
  format?: string;
  error?: string;
}

/**
 * Checks if the browser has native BarcodeDetector support (e.g. Chrome on Android / Mac / Windows)
 */
export function hasNativeBarcodeDetector(): boolean {
  return typeof window !== "undefined" && "BarcodeDetector" in window;
}

/**
 * Scan a canvas or image for Barcode or QR code with multi-pass enhancement
 */
export async function decodeBarcodeFromCanvas(
  canvas: HTMLCanvasElement
): Promise<BarcodeScanResult> {
  // 1. Try Native BarcodeDetector if available
  if (hasNativeBarcodeDetector()) {
    try {
      const formatsSupported = [
        "ean_13",
        "ean_8",
        "upc_a",
        "upc_e",
        "code_128",
        "code_39",
        "itf",
        "qr_code",
      ];
      // @ts-ignore
      const detector = new window.BarcodeDetector({ formats: formatsSupported });
      const barcodes = await detector.detect(canvas);
      if (barcodes && barcodes.length > 0 && barcodes[0].rawValue) {
        return {
          success: true,
          code: barcodes[0].rawValue.trim(),
          format: barcodes[0].format || "barcode",
        };
      }
    } catch (e) {
      // Fallback to ZXing
    }
  }

  // 2. Try ZXing MultiFormatReader with Standard & High-Contrast Passes
  try {
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) {
      return {
        success: false,
        error: "Invalid image canvas. Please retry.",
      };
    }

    const width = canvas.width;
    const height = canvas.height;
    const imageData = ctx.getImageData(0, 0, width, height);
    const data = imageData.data;
    const pixelCount = width * height;

    // Pass A: Standard Grayscale Luminance
    const luminances = new Uint8ClampedArray(pixelCount);
    for (let i = 0; i < pixelCount; i++) {
      const idx = i * 4;
      luminances[i] = ((data[idx] * 306 + data[idx + 1] * 601 + data[idx + 2] * 117) >> 10) & 0xff;
    }

    try {
      const luminanceSource = new RGBLuminanceSource(luminances, width, height);
      const binaryBitmap = new BinaryBitmap(new HybridBinarizer(luminanceSource));
      const result = zxingReader.decode(binaryBitmap);

      if (result && result.getText()) {
        return {
          success: true,
          code: result.getText().trim(),
          format: result.getBarcodeFormat().toString(),
        };
      }
    } catch (errNormal) {
      // Continue to high-contrast / center crop pass
    }

    // Pass B: Inverted & High-Contrast (for shiny/dark/crinkled packaging)
    const highContrastLuminances = new Uint8ClampedArray(pixelCount);
    for (let i = 0; i < pixelCount; i++) {
      const lum = luminances[i];
      // Increase contrast threshold
      highContrastLuminances[i] = lum < 128 ? Math.max(0, lum - 35) : Math.min(255, lum + 35);
    }

    try {
      const hcSource = new RGBLuminanceSource(highContrastLuminances, width, height);
      const hcBitmap = new BinaryBitmap(new HybridBinarizer(hcSource));
      const result = zxingReader.decode(hcBitmap);

      if (result && result.getText()) {
        return {
          success: true,
          code: result.getText().trim(),
          format: result.getBarcodeFormat().toString(),
        };
      }
    } catch (errHc) {
      // Continue
    }

    // Pass C: Center Crop (Targeting the barcode viewfinder area)
    if (width > 200 && height > 200) {
      const cropW = Math.floor(width * 0.7);
      const cropH = Math.floor(height * 0.5);
      const startX = Math.floor((width - cropW) / 2);
      const startY = Math.floor((height - cropH) / 2);

      const cropLuminances = new Uint8ClampedArray(cropW * cropH);
      let targetIdx = 0;
      for (let y = startY; y < startY + cropH; y++) {
        for (let x = startX; x < startX + cropW; x++) {
          cropLuminances[targetIdx++] = luminances[y * width + x];
        }
      }

      try {
        const cropSource = new RGBLuminanceSource(cropLuminances, cropW, cropH);
        const cropBitmap = new BinaryBitmap(new HybridBinarizer(cropSource));
        const result = zxingReader.decode(cropBitmap);

        if (result && result.getText()) {
          return {
            success: true,
            code: result.getText().trim(),
            format: result.getBarcodeFormat().toString(),
          };
        }
      } catch (errCrop) {
        // Fall through
      }
    }
  } catch (err) {
    // Canvas read error
  }

  return {
    success: false,
    error: "No barcode detected. Ensure the barcode is clear, centered and well-lit.",
  };
}
