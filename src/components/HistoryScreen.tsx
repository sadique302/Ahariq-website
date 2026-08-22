import React, { useState } from "react";
import { FoodProduct, Language } from "../types";
import {
  History,
  Trash2,
  ScanLine,
  Filter,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Sparkles,
  ArrowRight
} from "lucide-react";
import { ContactSupport } from "./ContactSupport";

interface HistoryScreenProps {
  scanHistory: FoodProduct[];
  onSelectProduct: (product: FoodProduct) => void;
  onClearHistory: () => void;
  onOpenScanner: () => void;
  language: Language;
  isDark: boolean;
}

export const HistoryScreen: React.FC<HistoryScreenProps> = ({
  scanHistory,
  onSelectProduct,
  onClearHistory,
  onOpenScanner,
  language,
  isDark,
}) => {
  const isHindi = language === "hi";
  const [filterVerdict, setFilterVerdict] = useState<"all" | "green" | "yellow" | "red">("all");

  const filteredHistory = scanHistory.filter((item) => {
    if (filterVerdict === "all") return true;
    return item.verdictType === filterVerdict;
  });

  const greenCount = scanHistory.filter((p) => p.verdictType === "green").length;
  const yellowCount = scanHistory.filter((p) => p.verdictType === "yellow").length;
  const redCount = scanHistory.filter((p) => p.verdictType === "red").length;

  return (
    <div
      id="history-screen-view"
      className={`min-h-screen pb-24 transition-colors w-full max-w-full overflow-x-hidden ${
        isDark ? "bg-stone-950 text-stone-100" : "bg-stone-100/90 text-stone-900"
      }`}
    >
      <div className="max-w-3xl mx-auto px-3 sm:px-4 py-3 sm:py-4 space-y-4 w-full">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl sm:text-2xl font-black tracking-tight flex items-center gap-2">
              <History className="w-5 h-5 text-[#22c55e]" />
              <span>{isHindi ? "स्कैन इतिहास (Scan History)" : "Scan History"}</span>
            </h1>
            <p className="text-xs text-stone-500">
              {isHindi ? "आपके द्वारा अब तक स्कैन किए गए खाद्य उत्पाद" : "All previously analyzed products"}
            </p>
          </div>

          {scanHistory.length > 0 && (
            <button
              onClick={onClearHistory}
              className="p-2 px-3 rounded-full text-stone-400 hover:text-rose-500 hover:bg-rose-500/10 text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
            >
              <Trash2 className="w-4 h-4" />
              <span>{isHindi ? "साफ़ करें" : "Clear All"}</span>
            </button>
          )}
        </div>

        {/* Scan Health Stats Summary Cards (16px gap) */}
        {scanHistory.length > 0 && (
          <div className="grid grid-cols-3 gap-4">
            <div className="p-3.5 rounded-2xl bg-[#22c55e]/10 border border-[#22c55e]/30 text-center">
              <span className="text-xl font-black text-[#15803d] dark:text-[#22c55e]">
                {greenCount}
              </span>
              <p className="text-[10px] font-bold text-[#15803d] dark:text-[#22c55e] uppercase mt-0.5">
                {isHindi ? "सुरक्षित" : "Clean"}
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-center">
              <span className="text-xl font-black text-amber-700 dark:text-amber-400">
                {yellowCount}
              </span>
              <p className="text-[10px] font-bold text-amber-700 dark:text-amber-300 uppercase mt-0.5">
                {isHindi ? "मध्यम" : "Moderate"}
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-center">
              <span className="text-xl font-black text-rose-700 dark:text-rose-400">
                {redCount}
              </span>
              <p className="text-[10px] font-bold text-rose-700 dark:text-rose-300 uppercase mt-0.5">
                {isHindi ? "हानिकारक" : "Avoid"}
              </p>
            </div>
          </div>
        )}

        {/* Filter Tabs */}
        {scanHistory.length > 0 && (
          <div
            className={`flex p-1 rounded-2xl border text-xs font-semibold ${
              isDark ? "bg-stone-900 border-stone-800" : "bg-white border-stone-200"
            }`}
          >
            <button
              onClick={() => setFilterVerdict("all")}
              className={`flex-1 py-2 rounded-xl transition-all text-center cursor-pointer ${
                filterVerdict === "all"
                  ? "bg-[#22c55e] text-white shadow-xs"
                  : "text-stone-500"
              }`}
            >
              {isHindi ? "सभी" : "All"} ({scanHistory.length})
            </button>
            <button
              onClick={() => setFilterVerdict("green")}
              className={`flex-1 py-2 rounded-xl transition-all text-center cursor-pointer ${
                filterVerdict === "green"
                  ? "bg-[#22c55e] text-white shadow-xs"
                  : "text-stone-500"
              }`}
            >
              {isHindi ? "ग्रीन" : "Green"} ({greenCount})
            </button>
            <button
              onClick={() => setFilterVerdict("yellow")}
              className={`flex-1 py-2 rounded-xl transition-all text-center cursor-pointer ${
                filterVerdict === "yellow"
                  ? "bg-[#22c55e] text-white shadow-xs"
                  : "text-stone-500"
              }`}
            >
              {isHindi ? "येलो" : "Yellow"} ({yellowCount})
            </button>
            <button
              onClick={() => setFilterVerdict("red")}
              className={`flex-1 py-2 rounded-xl transition-all text-center cursor-pointer ${
                filterVerdict === "red"
                  ? "bg-[#22c55e] text-white shadow-xs"
                  : "text-stone-500"
              }`}
            >
              {isHindi ? "रेड" : "Red"} ({redCount})
            </button>
          </div>
        )}

        {/* History List (16px gap) */}
        {filteredHistory.length === 0 ? (
          <div
            className={`p-10 rounded-3xl border text-center space-y-3 ${
              isDark ? "bg-stone-900 border-stone-800" : "bg-white border-stone-200"
            }`}
          >
            <div className="w-14 h-14 rounded-2xl bg-stone-100 dark:bg-stone-800 text-stone-400 flex items-center justify-center mx-auto">
              <History className="w-7 h-7" />
            </div>
            <h3 className="font-bold text-sm">
              {isHindi ? "कोई हालिया स्कैन नहीं मिला" : "No scan history recorded"}
            </h3>
            <p className="text-xs text-stone-500 max-w-xs mx-auto">
              {isHindi
                ? "किराना उत्पाद का बारकोड स्कैन करें या सामग्री की फोटो खींचें।"
                : "Scan a barcode or take an ingredients photo to start analyzing."}
            </p>
            <button
              onClick={onOpenScanner}
              className="px-4 py-2 rounded-full bg-[#22c55e] hover:bg-[#16a34a] text-white font-bold text-xs inline-flex items-center gap-1.5 shadow-md shadow-[#22c55e]/20 transition-colors cursor-pointer"
            >
              <ScanLine className="w-4 h-4" />
              <span>{isHindi ? "नया स्कैन करें" : "Start New Scan"}</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredHistory.map((item) => (
              <div
                key={item.id + (item.scannedAt || "")}
                onClick={() => onSelectProduct(item)}
                className={`p-4 rounded-2xl border flex items-center gap-4 cursor-pointer transition-all hover:scale-[1.01] ${
                  isDark ? "bg-stone-900 border-stone-800 hover:border-stone-700" : "bg-white border-stone-200/80 shadow-xs hover:border-[#22c55e]"
                }`}
              >
                <div className="w-14 h-14 rounded-2xl bg-stone-100 dark:bg-stone-800 overflow-hidden flex-shrink-0 border border-stone-200 dark:border-stone-700">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400">
                    {item.brand}
                  </span>
                  <h4 className="font-medium text-sm text-stone-900 dark:text-stone-100 truncate">
                    {isHindi ? item.nameHindi : item.name}
                  </h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span
                      className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                        item.verdictType === "green"
                          ? "bg-[#22c55e]/15 text-[#15803d] dark:text-[#22c55e]"
                          : item.verdictType === "yellow"
                          ? "bg-amber-500/15 text-amber-700 dark:text-amber-300"
                          : "bg-rose-500/15 text-rose-700 dark:text-rose-300"
                      }`}
                    >
                      {item.verdict}
                    </span>
                    {item.scannedAt && (
                      <span className="text-[10px] text-stone-400 font-mono">
                        {new Date(item.scannedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    )}
                  </div>
                </div>

                <div
                  className={`w-10 h-10 rounded-2xl flex items-center justify-center font-black text-xs text-white flex-shrink-0 ${
                    item.healthScore >= 70
                      ? "bg-[#22c55e]"
                      : item.healthScore >= 40
                      ? "bg-amber-500"
                      : "bg-rose-600"
                  }`}
                >
                  {item.healthScore}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Contact Support Section */}
        <ContactSupport language={language} isDark={isDark} />
      </div>
    </div>
  );
};
