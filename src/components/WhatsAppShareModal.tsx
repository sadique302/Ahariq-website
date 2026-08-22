import React, { useRef, useState } from "react";
import { FoodProduct, Language } from "../types";
import { X, Share2, Download, Check, ShieldCheck, AlertTriangle, Sparkles } from "lucide-react";
import html2canvas from "html2canvas";

interface WhatsAppShareModalProps {
  product: FoodProduct;
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

export const WhatsAppShareModal: React.FC<WhatsAppShareModalProps> = ({
  product,
  isOpen,
  onClose,
  language,
}) => {
  const isHindi = language === "hi";
  const cardRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleShareToWhatsApp = async () => {
    setIsGenerating(true);
    try {
      const text = `🚨 *AharIQ Indian Food Health Audit* 🚨\n\n*Product:* ${product.name}\n*Brand:* ${product.brand}\n*Health Score:* ${product.healthScore}/100 (${product.verdict})\n\n⚠️ *Key Alerts:* ${product.warnings.map(w => w.titleEn).join(", ") || "Clean label"}\n\n✅ *Cleaner Alternative:* ${product.cleanerAlternatives[0]?.name || "Natural Whole Foods"}\n\n📲 Scanned with AharIQ - India's Smart Packaged Food Scanner`;
      const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
      window.open(whatsappUrl, "_blank");
    } catch (e) {
      console.error(e);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownloadImage = async () => {
    if (!cardRef.current) return;
    setIsGenerating(true);
    try {
      const canvas = await html2canvas(cardRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#064e3b",
      });
      const link = document.createElement("a");
      link.download = `AharIQ-Score-${product.name.replace(/\s+/g, "_")}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (e) {
      console.error("Failed to generate image card", e);
    } finally {
      setIsGenerating(false);
    }
  };

  const getScoreBg = () => {
    if (product.healthScore >= 70) return "from-emerald-600 to-teal-800 text-emerald-100 border-emerald-400";
    if (product.healthScore >= 40) return "from-amber-600 to-yellow-800 text-amber-100 border-amber-400";
    return "from-rose-600 to-red-900 text-rose-100 border-rose-400";
  };

  return (
    <div
      id="whatsapp-share-modal"
      className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in"
    >
      <div className="bg-stone-900 border border-stone-800 rounded-3xl max-w-sm w-full overflow-hidden shadow-2xl">
        {/* Modal Header */}
        <div className="p-4 border-b border-stone-800 flex items-center justify-between text-white">
          <div className="flex items-center gap-2">
            <Share2 className="w-4 h-4 text-emerald-400" />
            <h3 className="font-bold text-sm">
              {isHindi ? "व्हाट्सएप शेयर कार्ड" : "WhatsApp Score Card"}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-stone-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* The Branded Visual Card to Share/Export */}
        <div className="p-4 bg-stone-950 flex justify-center">
          <div
            ref={cardRef}
            className="w-full bg-gradient-to-br from-emerald-950 via-stone-900 to-stone-950 border-2 border-emerald-500/30 rounded-2xl p-4 text-white shadow-xl relative overflow-hidden"
          >
            {/* Top Brand Header */}
            <div className="flex items-center justify-between border-b border-emerald-800/40 pb-2 mb-3">
              <div className="flex items-center gap-1.5">
                <div className="w-6 h-6 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-bold text-xs">
                  आ
                </div>
                <span className="font-extrabold text-sm tracking-tight text-white">
                  AharIQ
                </span>
                <span className="text-[10px] text-amber-400 font-semibold bg-amber-950/60 px-1.5 py-0.2 rounded border border-amber-500/20">
                  आहार ऑडिट
                </span>
              </div>
              <span className="text-[9px] text-stone-400 uppercase tracking-widest font-mono">
                FSSAI WATCH
              </span>
            </div>

            {/* Score & Verdict Banner */}
            <div className="flex items-center gap-3 my-2">
              <div
                className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${getScoreBg()} border-2 flex flex-col items-center justify-center shadow-lg flex-shrink-0`}
              >
                <span className="text-2xl font-black leading-none">
                  {product.healthScore}
                </span>
                <span className="text-[9px] font-bold opacity-80">/ 100</span>
              </div>

              <div>
                <span
                  className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wide ${
                    product.verdictType === "green"
                      ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                      : product.verdictType === "yellow"
                      ? "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                      : "bg-rose-500/20 text-rose-300 border border-rose-500/40"
                  }`}
                >
                  {product.verdict}
                </span>
                <h4 className="font-bold text-xs text-white mt-1 leading-tight line-clamp-1">
                  {product.name}
                </h4>
                <p className="text-[10px] text-stone-400">{product.brand}</p>
              </div>
            </div>

            {/* Indian Specific Warnings Highlights */}
            {product.warnings.length > 0 && (
              <div className="my-2.5 space-y-1 bg-stone-900/90 rounded-xl p-2 border border-stone-800">
                <div className="text-[10px] font-bold text-amber-400 flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3" />
                  <span>{isHindi ? "प्रमुख खतरे / Watchouts:" : "Key Indian Hazards Detected:"}</span>
                </div>
                <div className="flex flex-wrap gap-1 mt-1">
                  {product.warnings.slice(0, 3).map((w, idx) => (
                    <span
                      key={idx}
                      className="text-[9px] bg-red-950/80 border border-red-800/60 text-red-200 px-1.5 py-0.5 rounded"
                    >
                      ⚠️ {w.titleEn}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Cleaner Alternative Suggestion */}
            {product.cleanerAlternatives.length > 0 && (
              <div className="mt-2 pt-2 border-t border-emerald-900/50 flex items-center justify-between text-[10px]">
                <span className="text-emerald-400 font-semibold flex items-center gap-1">
                  <span className="text-xs leading-none">🌾</span>
                  {isHindi ? "बेहतर विकल्प:" : "Cleaner Choice:"}
                </span>
                <span className="text-stone-300 font-medium truncate max-w-[140px]">
                  {product.cleanerAlternatives[0].name}
                </span>
              </div>
            )}

            {/* Footer QR / Tag */}
            <div className="mt-3 pt-2 border-t border-stone-800 flex items-center justify-between text-[9px] text-stone-400">
              <span>Scan your grocery on AharIQ</span>
              <span className="text-emerald-400 font-mono font-bold">#EatCleanIndia</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="p-4 space-y-2 bg-stone-900">
          <button
            id="share-whatsapp-direct-btn"
            onClick={handleShareToWhatsApp}
            disabled={isGenerating}
            className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/40 transition-colors"
          >
            <Share2 className="w-4 h-4" />
            <span>{isHindi ? "व्हाट्सएप पर भेजें (WhatsApp Share)" : "Share on WhatsApp"}</span>
          </button>

          <button
            id="download-share-card-btn"
            onClick={handleDownloadImage}
            disabled={isGenerating}
            className="w-full py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 font-semibold text-xs flex items-center justify-center gap-2 border border-stone-700 transition-colors"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Download className="w-4 h-4" />}
            <span>{copied ? (isHindi ? "डाउनलोड हो गया!" : "Card Downloaded!") : isHindi ? "इमेज डाउनलोड करें (Save Image)" : "Download Card Image"}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
