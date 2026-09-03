import React from "react";
import {
  Mail,
  Headphones,
  HeartHandshake,
  ShieldCheck,
  Info,
  Lock,
  Crown,
  AlertTriangle,
  BadgeCheck,
  Briefcase
} from "lucide-react";
import { Language } from "../types";

interface ContactSupportProps {
  language?: Language;
  isDark?: boolean;
  onOpenAbout?: () => void;
  onOpenPrivacy?: () => void;
  onOpenDisclaimer?: () => void;
  onOpenAdmin?: () => void;
  isOwner?: boolean;
}

export const ContactSupport: React.FC<ContactSupportProps> = ({
  language = "en",
  isDark = false,
  onOpenAbout,
  onOpenPrivacy,
  onOpenDisclaimer,
  onOpenAdmin,
  isOwner = false,
}) => {
  const isHindi = language === "hi";

  return (
    <div
      id="contact-support-card"
      style={{ padding: "20px" }}
      className={`rounded-3xl border-2 p-5 sm:p-6 transition-all shadow-sm space-y-4 ${
        isDark
          ? "bg-stone-900 border-stone-800 text-stone-100"
          : "bg-[#FFFFFF] border-[#E5E7EB] text-[#111827] shadow-stone-900/5"
      }`}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-stone-200 dark:border-stone-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#22c55e]/15 flex items-center justify-center text-[#22c55e] flex-shrink-0">
            <Headphones className="w-5 h-5" />
          </div>
          <div>
            <h3
              className="text-base sm:text-lg font-bold text-[#000000] dark:text-stone-100 tracking-tight"
              style={{ fontWeight: 700, color: isDark ? undefined : "#000000" }}
            >
              {isHindi ? "संपर्क एवं सहायता (Contact Support)" : "Contact & Support"}
            </h3>
            <p
              className="text-xs text-[#111827] dark:text-stone-300 font-normal mt-0.5"
              style={{ color: isDark ? undefined : "#111827" }}
            >
              {isHindi
                ? "उत्पाद ऑडिट, प्रश्न या सहायता के लिए हमारी टीम से संपर्क करें।"
                : "Get in touch with the Ahariq team for queries, feedback, or food audits."}
            </p>
          </div>
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#22c55e]/10 border border-[#22c55e]/20 text-[#22c55e] text-xs font-bold self-start sm:self-auto">
          <HeartHandshake className="w-3.5 h-3.5" />
          <span>{isHindi ? "24x7 सहायता" : "24x7 Support"}</span>
        </div>
      </div>

      {/* Trust & Safety Highlights Badge */}
      <div
        className={`p-3.5 rounded-2xl border flex items-center gap-3 text-xs ${
          isDark
            ? "bg-[#22c55e]/10 border-[#22c55e]/20 text-stone-200"
            : "bg-[#F0FDF4] border-[#DCFCE7] text-[#15803d]"
        }`}
      >
        <ShieldCheck className="w-4 h-4 text-[#22c55e] flex-shrink-0" />
        <span className="font-medium">
          {isHindi
            ? "सार्वजनिक खाद्य सुरक्षा मानकों (FSSAI/ICMR Guidelines) पर आधारित स्वतंत्र उपभोक्ता विश्लेषण।"
            : "Independent consumer awareness based on FSSAI & ICMR public food safety benchmarks."}
        </span>
      </div>

      {/* Quick Navigation Quick-Links */}
      <div className={`grid ${isOwner && onOpenAdmin ? "grid-cols-2 sm:grid-cols-4" : "grid-cols-3"} gap-2.5 pt-1`}>
        {onOpenAbout && (
          <button
            id="footer-about-us-btn"
            onClick={onOpenAbout}
            className={`p-2.5 rounded-2xl border flex items-center justify-center gap-1.5 text-xs font-bold transition-all cursor-pointer ${
              isDark
                ? "bg-zinc-800/80 border-zinc-700 hover:bg-zinc-700 text-zinc-100"
                : "bg-emerald-50/70 border-emerald-200/80 hover:bg-emerald-100/70 text-[#059669]"
            }`}
          >
            <Info className="w-3.5 h-3.5 text-[#10B981] flex-shrink-0" />
            <span className="truncate">{isHindi ? "हमारे बारे में" : "About Us"}</span>
          </button>
        )}

        {onOpenDisclaimer && (
          <button
            id="footer-disclaimer-btn"
            onClick={onOpenDisclaimer}
            className={`p-2.5 rounded-2xl border flex items-center justify-center gap-1.5 text-xs font-bold transition-all cursor-pointer ${
              isDark
                ? "bg-amber-950/40 border-amber-800/60 hover:bg-amber-900/50 text-amber-300"
                : "bg-amber-50 border-amber-200 hover:bg-amber-100 text-amber-800"
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
            <span className="truncate">{isHindi ? "अस्वीकरण" : "Disclaimer"}</span>
          </button>
        )}

        {onOpenPrivacy && (
          <button
            id="footer-privacy-btn"
            onClick={onOpenPrivacy}
            className={`p-2.5 rounded-2xl border flex items-center justify-center gap-1.5 text-xs font-bold transition-all cursor-pointer ${
              isDark
                ? "bg-zinc-800/80 border-zinc-700 hover:bg-zinc-700 text-zinc-100"
                : "bg-emerald-50/70 border-emerald-200/80 hover:bg-emerald-100/70 text-[#059669]"
            }`}
          >
            <Lock className="w-3.5 h-3.5 text-[#10B981] flex-shrink-0" />
            <span className="truncate">{isHindi ? "गोपनीयता नीति" : "Privacy Policy"}</span>
          </button>
        )}

        {/* SECRET FOUNDER BUTTON - STRICTLY ONLY VISIBLE WHEN LOGGED IN AS SADIQUEHAVARI@GMAIL.COM */}
        {isOwner && onOpenAdmin && (
          <button
            id="footer-admin-btn"
            onClick={onOpenAdmin}
            className={`p-2.5 rounded-2xl border flex items-center justify-center gap-1.5 text-xs font-bold transition-all cursor-pointer ${
              isDark
                ? "bg-amber-950/40 border-amber-800/60 hover:bg-amber-900/50 text-amber-300"
                : "bg-amber-50 border-amber-200 hover:bg-amber-100 text-amber-800"
            }`}
          >
            <Crown className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
            <span className="truncate">{isHindi ? "एडमिन पैनल" : "Founder Panel"}</span>
          </button>
        )}
      </div>

      {/* Founder & Leadership Spotlight */}
      <div
        id="founder-leadership-spotlight"
        className={`p-4 sm:p-4.5 rounded-2xl border transition-all ${
          isDark
            ? "bg-gradient-to-r from-stone-800/90 via-stone-800/60 to-stone-900/90 border-stone-700/80"
            : "bg-gradient-to-r from-emerald-50/60 via-white to-stone-50/70 border-emerald-200/90 shadow-xs"
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3.5">
          <div className="flex items-center gap-3.5">
            {/* Executive Monogram Avatar */}
            <div className="relative flex-shrink-0">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#10B981] to-[#047857] text-white font-extrabold text-sm sm:text-base flex items-center justify-center shadow-md shadow-emerald-500/20 ring-2 ring-emerald-400/30 tracking-wider">
                SS
              </div>
              <div
                className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-white dark:bg-stone-900 flex items-center justify-center shadow-xs"
                title="Verified Founder & Leadership"
              >
                <BadgeCheck className="w-4 h-4 text-emerald-500 fill-emerald-500/20" />
              </div>
            </div>

            {/* Executive Bio */}
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h4
                  className="text-sm sm:text-base font-extrabold text-[#000000] dark:text-stone-100 tracking-tight"
                  style={{ fontWeight: 800, color: isDark ? undefined : "#000000" }}
                >
                  Sadique Samtaan
                </h4>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/15 border border-emerald-500/30 text-[#059669] dark:text-[#34D399]">
                  <Briefcase className="w-3 h-3 text-[#10B981]" />
                  CEO & Co-Founder
                </span>
              </div>
              <p
                className="text-xs text-[#111827] dark:text-stone-300 font-medium mt-0.5"
                style={{ fontWeight: 500, color: isDark ? undefined : "#111827" }}
              >
                {isHindi
                  ? "संस्थापक एवं मुख्य कार्यकारी अधिकारी (CEO) • आहार आईक्यू (Ahariq)"
                  : "Founder & Chief Executive Officer • Ahariq Health"}
              </p>
              <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-1 hidden sm:block">
                {isHindi
                  ? "भारतीय परिवारों के लिए पारदर्शी, मिलावट-मुक्त और स्वच्छ भोजन जागरूकता का राष्ट्रीय मिशन।"
                  : "Leading India's consumer movement for clean-label, unadulterated & transparent food."}
              </p>
            </div>
          </div>

          {/* Connect with Founder */}
          <div className="flex items-center gap-2 pt-2 sm:pt-0 border-t sm:border-t-0 border-stone-200 dark:border-stone-700 self-start sm:self-center">
            <a
              id="contact-founder-direct-btn"
              href="mailto:support@ahariq.app?subject=Founder%20Desk%20-%20To%20Sadique%20Samtaan%20(CEO)"
              className={`px-3.5 py-2 rounded-xl border text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                isDark
                  ? "bg-stone-800 hover:bg-stone-700 border-stone-600 text-stone-200"
                  : "bg-white hover:bg-emerald-50 border-emerald-300 text-emerald-800 shadow-xs"
              }`}
              title="Write directly to the Founder's Desk"
            >
              <Mail className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
              <span>{isHindi ? "संस्थापक से संपर्क" : "Founder's Desk"}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Official Support Email Card */}
      <div>
        <a
          id="contact-email-btn"
          href="mailto:support@ahariq.app"
          className={`p-4 rounded-2xl border transition-all flex items-center gap-3.5 group cursor-pointer ${
            isDark
              ? "bg-stone-800/60 border-stone-700/80 hover:border-[#22c55e] hover:bg-stone-800"
              : "bg-white border-stone-200 hover:border-[#22c55e] hover:bg-[#F0FDF4] shadow-sm"
          }`}
          title="Send email to support@ahariq.app"
        >
          <div className="w-11 h-11 rounded-2xl bg-[#22c55e]/20 text-[#22c55e] group-hover:bg-[#22c55e] group-hover:text-white transition-all flex items-center justify-center flex-shrink-0 shadow-xs">
            <Mail className="w-5 h-5" />
          </div>
          <div className="min-w-0 flex-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#22c55e] block">
              {isHindi ? "आधिकारिक ईमेल (OFFICIAL SUPPORT EMAIL)" : "OFFICIAL SUPPORT EMAIL"}
            </span>
            <span
              className="text-xs sm:text-sm font-semibold text-[#000000] dark:text-stone-100 group-hover:text-[#15803d] dark:group-hover:text-[#22c55e] transition-colors truncate block mt-0.5"
              style={{ fontWeight: 600, color: isDark ? undefined : "#000000" }}
            >
              support@ahariq.app
            </span>
            <span className="text-[11px] text-[#22c55e] font-medium block mt-0.5" style={{ fontWeight: 500 }}>
              {isHindi ? "क्लिक करके मेल भेजें →" : "Click to send email →"}
            </span>
          </div>
        </a>
      </div>

      {/* Copyright & Disclaimer Line */}
      <div className="mt-4 pt-3.5 border-t border-stone-200 dark:border-stone-800 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#111827] dark:text-stone-300 gap-2">
        <span className="font-semibold text-[#111827] dark:text-stone-300">© 2026 Ahariq • Independent Food Awareness</span>
        <span className="text-[#22c55e] font-bold">
          {isHindi ? "स्वस्थ भारत 🇮🇳" : "Clean Food for India 🇮🇳"}
        </span>
      </div>
    </div>
  );
};
