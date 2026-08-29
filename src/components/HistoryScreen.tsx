import React, { useState } from "react";
import { FoodProduct, Language, UserProfile } from "../types";
import {
  History,
  Trash2,
  ScanLine,
  ShieldCheck,
  User,
  LogIn
} from "lucide-react";
import { ContactSupport } from "./ContactSupport";

interface HistoryScreenProps {
  scanHistory: FoodProduct[];
  onSelectProduct: (product: FoodProduct) => void;
  onClearHistory: () => void;
  onOpenScanner: () => void;
  language: Language;
  isDark: boolean;
  user?: UserProfile;
  onOpenAuth?: () => void;
}

export const HistoryScreen: React.FC<HistoryScreenProps> = ({
  scanHistory,
  onSelectProduct,
  onClearHistory,
  onOpenScanner,
  language,
  isDark,
  user,
  onOpenAuth,
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
      className={`min-h-screen pb-28 transition-colors w-full max-w-full overflow-x-hidden ${
        isDark ? "bg-[#090C10] text-zinc-100" : "bg-[#F8FAFC] text-[#0F172A]"
      }`}
    >
      <div className="max-w-2xl mx-auto px-4 sm:px-5 py-4 sm:py-5 space-y-4 w-full">
        {/* User Privacy & Isolation Header Pill */}
        <div
          className={`px-3.5 py-2 rounded-2xl border flex items-center justify-between text-xs transition-all ${
            isDark ? "bg-[#161C24] border-slate-800 text-slate-300" : "bg-white border-slate-200/90 text-slate-600 shadow-2xs"
          }`}
        >
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-6 h-6 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center flex-shrink-0">
              <User className="w-3.5 h-3.5" />
            </div>
            <span className="truncate font-semibold">
              {user?.isLoggedIn
                ? `${user.name || user.email || "User"} (${isHindi ? "निजी स्कैन डेटा" : "Private History"})`
                : isHindi
                ? "गेस्ट मोड (केवल इस डिवाइस पर)"
                : "Guest Mode (Local Device)"}
            </span>
          </div>

          {!user?.isLoggedIn && onOpenAuth && (
            <button
              onClick={onOpenAuth}
              className="text-[#059669] dark:text-[#34D399] font-bold text-xs hover:underline flex items-center gap-1 flex-shrink-0 cursor-pointer"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>{isHindi ? "लॉगिन करें" : "Sign In"}</span>
            </button>
          )}
        </div>

        {/* Title Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl sm:text-2xl font-black tracking-tight flex items-center gap-2">
              <History className="w-5 h-5 text-[#059669]" />
              <span>{isHindi ? "स्कैन इतिहास" : "Scan History"}</span>
            </h1>
            <p className="text-xs text-slate-400 mt-0.5">
              {isHindi ? "आपके द्वारा अब तक स्कैन किए गए उत्पाद" : "All products scanned in your account"}
            </p>
          </div>

          {scanHistory.length > 0 && (
            <button
              onClick={onClearHistory}
              className="p-1.5 px-3 rounded-xl text-slate-400 hover:text-red-500 hover:bg-red-500/10 text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>{isHindi ? "इतिहास साफ़ करें" : "Clear All"}</span>
            </button>
          )}
        </div>

        {/* Stats Pill Bar (Clean & Lightweight) */}
        {scanHistory.length > 0 && (
          <div className="grid grid-cols-3 gap-2.5">
            <div className="p-2.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-center">
              <span className="text-lg font-black text-emerald-600 dark:text-emerald-400">
                {greenCount}
              </span>
              <p className="text-[10px] font-bold text-emerald-700 dark:text-emerald-300 uppercase">
                {isHindi ? "सुरक्षित" : "Clean"}
              </p>
            </div>

            <div className="p-2.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-center">
              <span className="text-lg font-black text-amber-600 dark:text-amber-400">
                {yellowCount}
              </span>
              <p className="text-[10px] font-bold text-amber-700 dark:text-amber-300 uppercase">
                {isHindi ? "मध्यम" : "Moderate"}
              </p>
            </div>

            <div className="p-2.5 rounded-2xl bg-red-500/10 border border-red-500/20 text-center">
              <span className="text-lg font-black text-red-600 dark:text-red-400">
                {redCount}
              </span>
              <p className="text-[10px] font-bold text-red-700 dark:text-red-300 uppercase">
                {isHindi ? "सीमित करें" : "Limit"}
              </p>
            </div>
          </div>
        )}

        {/* Filter Tabs */}
        {scanHistory.length > 0 && (
          <div
            className={`flex p-1 rounded-2xl border text-xs font-semibold ${
              isDark ? "bg-[#161C24] border-slate-800" : "bg-white border-slate-200"
            }`}
          >
            <button
              onClick={() => setFilterVerdict("all")}
              className={`flex-1 py-1.5 rounded-xl transition-all text-center cursor-pointer ${
                filterVerdict === "all"
                  ? "bg-[#059669] text-white shadow-2xs font-bold"
                  : "text-slate-500"
              }`}
            >
              {isHindi ? "सभी" : "All"} ({scanHistory.length})
            </button>
            <button
              onClick={() => setFilterVerdict("green")}
              className={`flex-1 py-1.5 rounded-xl transition-all text-center cursor-pointer ${
                filterVerdict === "green"
                  ? "bg-[#059669] text-white shadow-2xs font-bold"
                  : "text-slate-500"
              }`}
            >
              {isHindi ? "ग्रीन" : "Green"} ({greenCount})
            </button>
            <button
              onClick={() => setFilterVerdict("yellow")}
              className={`flex-1 py-1.5 rounded-xl transition-all text-center cursor-pointer ${
                filterVerdict === "yellow"
                  ? "bg-[#059669] text-white shadow-2xs font-bold"
                  : "text-slate-500"
              }`}
            >
              {isHindi ? "येलो" : "Yellow"} ({yellowCount})
            </button>
            <button
              onClick={() => setFilterVerdict("red")}
              className={`flex-1 py-1.5 rounded-xl transition-all text-center cursor-pointer ${
                filterVerdict === "red"
                  ? "bg-[#059669] text-white shadow-2xs font-bold"
                  : "text-slate-500"
              }`}
            >
              {isHindi ? "रेड" : "Red"} ({redCount})
            </button>
          </div>
        )}

        {/* History Items Feed */}
        {filteredHistory.length === 0 ? (
          <div
            className={`p-8 rounded-3xl border text-center space-y-3 ${
              isDark ? "bg-[#161C24] border-slate-800" : "bg-white border-slate-200"
            }`}
          >
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
              <History className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-sm">
              {isHindi ? "कोई स्कैन इतिहास नहीं मिला" : "No scan history yet"}
            </h3>
            <p className="text-xs text-slate-400 max-w-xs mx-auto">
              {isHindi
                ? "किसी भी किराना उत्पाद का बारकोड स्कैन करें और उसकी स्वास्थ्य रिपोर्ट देखें।"
                : "Scan barcodes to analyze palm oil, sugar, preservatives, and health scores."}
            </p>
            <button
              onClick={onOpenScanner}
              className="px-4 py-2.5 rounded-xl bg-[#059669] hover:bg-[#047857] text-white font-bold text-xs inline-flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
            >
              <ScanLine className="w-4 h-4" />
              <span>{isHindi ? "बारकोड स्कैन करें" : "Scan Barcode"}</span>
            </button>
          </div>
        ) : (
          <div className="space-y-2.5">
            {filteredHistory.map((item, idx) => {
              const isGreen = item.healthScore >= 70;
              const isYellow = item.healthScore >= 40 && item.healthScore < 70;

              return (
                <div
                  key={(item.id || item.barcode) + idx}
                  onClick={() => onSelectProduct(item)}
                  className={`p-3.5 rounded-2xl border flex items-center gap-3.5 cursor-pointer hover:border-[#10B981]/50 transition-all ${
                    isDark ? "bg-[#161C24] border-slate-800/80 hover:bg-[#1A222C]" : "bg-white border-slate-200/80 hover:border-emerald-300 shadow-2xs"
                  }`}
                >
                  <div className="w-13 h-13 rounded-xl bg-slate-100 dark:bg-slate-800 overflow-hidden flex-shrink-0 border border-slate-200/60 dark:border-slate-700/60">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <span className="text-[11px] font-medium text-slate-400 block truncate">
                      {item.brand}
                    </span>
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white truncate">
                      {isHindi ? item.nameHindi || item.name : item.name}
                    </h4>
                    <div className="flex items-center gap-1.5 mt-1">
                      <span
                        className={`w-2 h-2 rounded-full flex-shrink-0 ${
                          isGreen ? "bg-emerald-500" : isYellow ? "bg-amber-500" : "bg-red-500"
                        }`}
                      />
                      <span
                        className={`text-xs font-semibold ${
                          isGreen
                            ? "text-emerald-600 dark:text-emerald-400"
                            : isYellow
                            ? "text-amber-600 dark:text-amber-400"
                            : "text-red-600 dark:text-red-400"
                        }`}
                      >
                        {item.verdict || (isGreen ? "Clean" : isYellow ? "Moderate" : "Avoid")}
                      </span>
                      {item.scannedAt && (
                        <span className="text-[10px] text-slate-400 font-mono ml-auto">
                          {new Date(item.scannedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      )}
                    </div>
                  </div>

                  <div
                    className={`w-11 h-11 rounded-xl flex flex-col items-center justify-center font-black text-white flex-shrink-0 shadow-2xs ${
                      isGreen ? "bg-[#10B981]" : isYellow ? "bg-amber-500" : "bg-red-500"
                    }`}
                  >
                    <span className="text-sm font-black leading-none">{item.healthScore}</span>
                    <span className="text-[7px] font-bold uppercase tracking-wider opacity-85 mt-0.5">/100</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <ContactSupport language={language} isDark={isDark} />
      </div>
    </div>
  );
};
