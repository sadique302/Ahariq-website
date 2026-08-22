import React, { useState } from "react";
import { Language, AdulterationGuide } from "../types";
import {
  FlaskConical,
  Flame,
  Milk,
  Sparkles,
  Wheat,
  ShieldCheck,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  Info,
  Beaker
} from "lucide-react";
import { ADULTERATION_GUIDES } from "../data/adulterationGuides";
import { ContactSupport } from "./ContactSupport";

interface AdulterationGuideScreenProps {
  language: Language;
  isDark: boolean;
}

export const AdulterationGuideScreen: React.FC<AdulterationGuideScreenProps> = ({
  language,
  isDark,
}) => {
  const isHindi = language === "hi";
  const [expandedGuideId, setExpandedGuideId] = useState<string>(ADULTERATION_GUIDES[0].id);

  const toggleExpand = (id: string) => {
    setExpandedGuideId(expandedGuideId === id ? "" : id);
  };

  return (
    <div
      id="adulteration-guide-screen-view"
      className={`min-h-screen pb-24 transition-colors ${
        isDark ? "bg-stone-950 text-stone-100" : "bg-stone-100/90 text-stone-900"
      }`}
    >
      <div className="max-w-3xl mx-auto p-4 space-y-4">
        {/* Top Header */}
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-600 dark:text-amber-400">
              <FlaskConical className="w-5 h-5" />
            </div>
            <h1 className="text-xl sm:text-2xl font-black tracking-tight">
              {isHindi ? "घरेलू मिलावट जांच लैब" : "FSSAI DART Adulteration Lab"}
            </h1>
          </div>
          <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed font-normal">
            {isHindi
              ? "भारतीय मानक प्राधिकरण (FSSAI) द्वारा प्रमाणित 2 मिनट के आसान घरेलू परीक्षण।"
              : "Simple 2-minute rapid kitchen tests approved by FSSAI DART to detect dangerous adulterants."}
          </p>
        </div>

        {/* FSSAI Disclaimer Notice */}
        <div
          className={`p-4 rounded-2xl border flex items-start gap-3 text-xs ${
            isDark ? "bg-stone-900 border-stone-800 text-stone-300" : "bg-white border-stone-200 text-stone-700 shadow-xs"
          }`}
        >
          <ShieldCheck className="w-5 h-5 text-[#22c55e] flex-shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-stone-900 dark:text-stone-100">
              {isHindi ? "एफएसएसएआई (FSSAI) सुरक्षा दिशानिर्देश" : "FSSAI DART Standards"}
            </span>
            <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-0.5 font-normal">
              {isHindi
                ? "इन परीक्षणों से आप दूध, तेल, घी, मसाले और शहद में होने वाली जहरीली मिलावट को घर पर ही पकड़ सकते हैं।"
                : "Verify everyday kitchen staples for toxic dyes, Argemone oil, detergent starch, and artificial syrups."}
            </p>
          </div>
        </div>

        {/* List of Interactive Kitchen Tests (16px gap) */}
        <div className="space-y-4">
          {ADULTERATION_GUIDES.map((guide) => {
            const isExpanded = expandedGuideId === guide.id;

            return (
              <div
                key={guide.id}
                id={`adulteration-guide-${guide.id}`}
                className={`rounded-3xl border transition-all overflow-hidden ${
                  isDark ? "bg-stone-900 border-stone-800" : "bg-white border-stone-200 shadow-xs"
                }`}
              >
                {/* Accordion Header */}
                <button
                  onClick={() => toggleExpand(guide.id)}
                  className="w-full p-4 flex items-center justify-between text-left hover:bg-stone-500/5 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-[#22c55e]/15 border border-[#22c55e]/25 text-[#15803d] dark:text-[#22c55e] flex items-center justify-center flex-shrink-0">
                      {guide.icon === "Milk" ? (
                        <Milk className="w-5 h-5" />
                      ) : guide.icon === "Flame" ? (
                        <Flame className="w-5 h-5" />
                      ) : guide.icon === "Wheat" ? (
                        <Wheat className="w-5 h-5" />
                      ) : (
                        <span className="text-base leading-none">🌾</span>
                      )}
                    </div>
                    <div>
                      <span className="text-[10px] font-mono font-bold text-amber-600 dark:text-amber-400">
                        {guide.fssaiRef}
                      </span>
                      <h3 className="font-bold text-sm text-stone-900 dark:text-stone-100">
                        {isHindi ? guide.foodItemHi : guide.foodItemEn}
                      </h3>
                      <p className="text-[11px] text-rose-600 dark:text-rose-400 font-medium">
                        ⚠️ {isHindi ? guide.adulterantHi : guide.adulterantEn}
                      </p>
                    </div>
                  </div>

                  <div className="text-stone-400">
                    {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </div>
                </button>

                {/* Expanded Testing Steps & Pure vs Adulterated Visual Comparison */}
                {isExpanded && (
                  <div className="p-4 pt-0 border-t border-stone-100 dark:border-stone-800/80 space-y-4 text-xs animate-in fade-in duration-200">
                    {/* Test Method Name */}
                    <div className="mt-3 p-3 rounded-2xl bg-stone-100 dark:bg-stone-800/60 flex items-center justify-between">
                      <span className="font-bold text-stone-700 dark:text-stone-300">
                        {isHindi ? "परीक्षण विधि:" : "Test Method:"}{" "}
                        <span className="text-[#22c55e] font-extrabold">
                          {isHindi ? guide.testNameHi : guide.testNameEn}
                        </span>
                      </span>
                    </div>

                    {/* Step-by-Step Instructions */}
                    <div className="space-y-2">
                      <h4 className="font-bold text-xs uppercase tracking-wider text-stone-500">
                        {isHindi ? "परीक्षण के चरण (Step-by-Step):" : "Testing Instructions:"}
                      </h4>
                      <ol className="space-y-2 text-stone-700 dark:text-stone-300">
                        {(isHindi ? guide.stepByStepHi : guide.stepByStepEn).map((step, idx) => (
                          <li key={idx} className="flex items-start gap-2.5">
                            <span className="w-5 h-5 rounded-full bg-[#22c55e] text-white font-bold text-[10px] flex items-center justify-center flex-shrink-0 mt-0.5">
                              {idx + 1}
                            </span>
                            <span className="leading-relaxed">{step}</span>
                          </li>
                        ))}
                      </ol>
                    </div>

                    {/* Comparison Cards: Pure vs Adulterated (16px gap) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                      {/* Pure Result */}
                      <div className="p-3.5 rounded-2xl bg-[#22c55e]/10 border border-[#22c55e]/30 text-stone-900 dark:text-emerald-100">
                        <div className="flex items-center gap-1.5 font-bold text-xs text-[#15803d] dark:text-[#22c55e] mb-1">
                          <CheckCircle2 className="w-4 h-4" />
                          <span>{isHindi ? "शुद्ध होने पर (Pure Result):" : "Pure Sample Result:"}</span>
                        </div>
                        <p className="text-[11px] leading-relaxed">
                          {isHindi ? guide.resultPureHi : guide.resultPureEn}
                        </p>
                      </div>

                      {/* Adulterated Positive Result */}
                      <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-950 dark:text-rose-100">
                        <div className="flex items-center gap-1.5 font-bold text-xs text-rose-700 dark:text-rose-400 mb-1">
                          <AlertTriangle className="w-4 h-4" />
                          <span>{isHindi ? "मिलावटी होने पर (Adulterated):" : "Adulterated Sample:"}</span>
                        </div>
                        <p className="text-[11px] leading-relaxed">
                          {isHindi ? guide.resultPositiveHi : guide.resultPositiveEn}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Contact Support Section */}
        <ContactSupport language={language} isDark={isDark} />
      </div>
    </div>
  );
};
