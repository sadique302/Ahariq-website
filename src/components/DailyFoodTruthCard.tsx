import React, { useState } from "react";
import { DAILY_FOOD_TRUTHS, getTodayFoodTruth, DailyFoodTruth } from "../data/dailyFoodTruths";
import { Language } from "../types";
import {
  HelpCircle,
  CheckCircle2,
  XCircle,
  Share2,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Lightbulb
} from "lucide-react";

interface DailyFoodTruthCardProps {
  language: Language;
  isDark: boolean;
}

export const DailyFoodTruthCard: React.FC<DailyFoodTruthCardProps> = ({
  language,
  isDark,
}) => {
  const isHindi = language === "hi";
  const defaultTruth = getTodayFoodTruth();
  const [currentIndex, setCurrentIndex] = useState(() => {
    const idx = DAILY_FOOD_TRUTHS.findIndex((t) => t.id === defaultTruth.id);
    return idx >= 0 ? idx : 0;
  });

  const truth: DailyFoodTruth = DAILY_FOOD_TRUTHS[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % DAILY_FOOD_TRUTHS.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + DAILY_FOOD_TRUTHS.length) % DAILY_FOOD_TRUTHS.length);
  };

  const handleShareWhatsApp = () => {
    const title = isHindi ? truth.titleHi : truth.titleEn;
    const myth = isHindi ? truth.mythHi : truth.mythEn;
    const fact = isHindi ? truth.truthHi : truth.truthEn;
    const tip = isHindi ? truth.fssaiTipHi : truth.fssaiTipEn;

    const message = `💡 *AharIQ • आज का खाद्य सच (Daily Food Truth)* 💡\n\n❓ *${title}*\n\n❌ *आम भ्रम (Myth):* ${myth}\n\n✅ *वैज्ञानिक सच्चाई (Truth):* ${fact}\n\n🛡️ *सुरक्षा सलाह:* ${tip}\n\n📲 *आहार IQ (Ahariq) पर अपने परिवार का खाना जांचें:* https://ahariq.app`;

    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <div
      id="daily-food-truth-card"
      className={`rounded-3xl p-4.5 sm:p-5 border transition-all relative overflow-hidden ${
        isDark
          ? "bg-[#161C24] border-slate-800 text-zinc-100"
          : "bg-white border-emerald-200/90 text-slate-800 shadow-2xs"
      }`}
    >
      {/* Header Pill & Pagination */}
      <div className="flex items-center justify-between gap-2 pb-3 border-b border-slate-100 dark:border-slate-800/80">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-amber-500/15 text-amber-600 dark:text-amber-400 flex items-center justify-center flex-shrink-0">
            <Lightbulb className="w-4.5 h-4.5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#059669] dark:text-[#34D399]">
                {isHindi ? "दैनिक जागरूकता" : "Daily Food Truth"}
              </span>
              <span className="text-[10px] px-2 py-0.2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold">
                {isHindi ? truth.badgeHi : truth.badgeEn}
              </span>
            </div>
            <span className="text-[10px] text-slate-400 font-medium">
              {currentIndex + 1} of {DAILY_FOOD_TRUTHS.length} • FSSAI & ICMR {isHindi ? "तथ्य" : "Facts"}
            </span>
          </div>
        </div>

        {/* Carousel controls */}
        <div className="flex items-center gap-1">
          <button
            onClick={handlePrev}
            aria-label="Previous truth"
            className="w-7 h-7 rounded-lg border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={handleNext}
            aria-label="Next truth"
            className="w-7 h-7 rounded-lg border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Question Headline */}
      <div className="pt-3 pb-2.5">
        <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white tracking-tight leading-snug">
          {isHindi ? truth.titleHi : truth.titleEn}
        </h3>
      </div>

      {/* Myth vs Reality Comparison */}
      <div className="space-y-2.5 text-xs sm:text-sm">
        {/* The Common Myth */}
        <div
          className={`p-3 rounded-2xl border flex items-start gap-2.5 ${
            isDark ? "bg-red-950/20 border-red-900/40 text-red-200" : "bg-red-50/70 border-red-200/80 text-red-900"
          }`}
        >
          <XCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
          <div>
            <span className="font-extrabold uppercase tracking-wider text-[10px] text-red-600 dark:text-red-400 block">
              {isHindi ? "आम भ्रम (Myth)" : "Common Myth"}
            </span>
            <p className="mt-0.5 leading-relaxed font-medium">
              {isHindi ? truth.mythHi : truth.mythEn}
            </p>
          </div>
        </div>

        {/* The Verified Truth */}
        <div
          className={`p-3 rounded-2xl border flex items-start gap-2.5 ${
            isDark
              ? "bg-emerald-950/20 border-emerald-900/40 text-emerald-200"
              : "bg-emerald-50/70 border-emerald-200/80 text-emerald-950"
          }`}
        >
          <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
          <div>
            <span className="font-extrabold uppercase tracking-wider text-[10px] text-[#059669] dark:text-[#34D399] block">
              {isHindi ? "वैज्ञानिक सच्चाई (The Reality)" : "Scientific Reality"}
            </span>
            <p className="mt-0.5 leading-relaxed font-medium">
              {isHindi ? truth.truthHi : truth.truthEn}
            </p>
          </div>
        </div>

        {/* Practical Buyer Tip */}
        <div
          className={`p-3 rounded-2xl border flex items-start gap-2.5 ${
            isDark ? "bg-slate-800/60 border-slate-700/80 text-slate-300" : "bg-slate-50 border-slate-200 text-slate-700"
          }`}
        >
          <ShieldCheck className="w-4 h-4 text-[#059669] flex-shrink-0 mt-0.5" />
          <div className="text-xs">
            <span className="font-bold text-slate-900 dark:text-slate-100 block">
              {isHindi ? "खरीदते समय क्या देखें:" : "Smart Buyer Action:"}
            </span>
            <p className="mt-0.5 text-slate-500 dark:text-slate-400 leading-relaxed">
              {isHindi ? truth.fssaiTipHi : truth.fssaiTipEn}
            </p>
          </div>
        </div>
      </div>

      {/* Footer Action: Share on WhatsApp */}
      <div className="pt-3 mt-1 flex items-center justify-between gap-3">
        <span className="text-[11px] text-slate-400 font-medium truncate">
          {isHindi ? "परिवार को जागरूक करें" : "Share with family"}
        </span>

        <button
          onClick={handleShareWhatsApp}
          id="share-daily-truth-whatsapp-btn"
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs shadow-xs transition-colors cursor-pointer"
        >
          <Share2 className="w-3.5 h-3.5" />
          <span>{isHindi ? "WhatsApp पर शेयर करें" : "Share on WhatsApp"}</span>
        </button>
      </div>
    </div>
  );
};
