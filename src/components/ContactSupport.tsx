import React from "react";
import {
  Mail,
  Phone,
  Headphones,
  HeartHandshake,
  ShieldCheck,
  Info,
  Lock,
  Crown
} from "lucide-react";
import { Language } from "../types";

interface ContactSupportProps {
  language?: Language;
  isDark?: boolean;
  onOpenAbout?: () => void;
  onOpenPrivacy?: () => void;
  onOpenAdmin?: () => void;
  isOwner?: boolean;
}

export const ContactSupport: React.FC<ContactSupportProps> = ({
  language = "en",
  isDark = false,
  onOpenAbout,
  onOpenPrivacy,
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

      {/* Quick Navigation Quick-Links: About Us, Privacy Policy, [Founder Admin if logged in] */}
      <div className={`grid ${isOwner && onOpenAdmin ? "grid-cols-3" : "grid-cols-2"} gap-2.5 pt-1`}>
        {onOpenAbout && (
          <button
            id="footer-about-us-btn"
            onClick={onOpenAbout}
            className={`p-3 rounded-2xl border flex items-center justify-center gap-2 text-xs font-bold transition-all cursor-pointer ${
              isDark
                ? "bg-zinc-800/80 border-zinc-700 hover:bg-zinc-700 text-zinc-100"
                : "bg-emerald-50/70 border-emerald-200/80 hover:bg-emerald-100/70 text-[#059669]"
            }`}
          >
            <Info className="w-4 h-4 text-[#10B981] flex-shrink-0" />
            <span className="truncate">{isHindi ? "हमारे बारे में" : "About Us"}</span>
          </button>
        )}

        {onOpenPrivacy && (
          <button
            id="footer-privacy-btn"
            onClick={onOpenPrivacy}
            className={`p-3 rounded-2xl border flex items-center justify-center gap-2 text-xs font-bold transition-all cursor-pointer ${
              isDark
                ? "bg-zinc-800/80 border-zinc-700 hover:bg-zinc-700 text-zinc-100"
                : "bg-emerald-50/70 border-emerald-200/80 hover:bg-emerald-100/70 text-[#059669]"
            }`}
          >
            <Lock className="w-4 h-4 text-[#10B981] flex-shrink-0" />
            <span className="truncate">{isHindi ? "गोपनीयता नीति" : "Privacy Policy"}</span>
          </button>
        )}

        {/* SECRET FOUNDER BUTTON - STRICTLY ONLY VISIBLE WHEN LOGGED IN AS SADIQUEHAVARI@GMAIL.COM */}
        {isOwner && onOpenAdmin && (
          <button
            id="footer-admin-btn"
            onClick={onOpenAdmin}
            className={`p-3 rounded-2xl border flex items-center justify-center gap-2 text-xs font-bold transition-all cursor-pointer ${
              isDark
                ? "bg-amber-950/40 border-amber-800/60 hover:bg-amber-900/50 text-amber-300"
                : "bg-amber-50 border-amber-200 hover:bg-amber-100 text-amber-800"
            }`}
          >
            <Crown className="w-4 h-4 text-amber-500 flex-shrink-0" />
            <span className="truncate">{isHindi ? "एडमिन पैनल" : "Founder Panel"}</span>
          </button>
        )}
      </div>

      {/* 2 Big Action Cards: Email & Phone */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {/* Email Direct Action Button */}
        <a
          id="contact-email-btn"
          href="mailto:sadiquehavari@gmail.com"
          className={`p-4 rounded-2xl border transition-all flex items-center gap-3.5 group cursor-pointer ${
            isDark
              ? "bg-stone-800/60 border-stone-700/80 hover:border-[#22c55e] hover:bg-stone-800"
              : "bg-white border-stone-200 hover:border-[#22c55e] hover:bg-[#F0FDF4] shadow-sm"
          }`}
          title="Send email to sadiquehavari@gmail.com"
        >
          <div className="w-11 h-11 rounded-2xl bg-[#22c55e]/20 text-[#22c55e] group-hover:bg-[#22c55e] group-hover:text-white transition-all flex items-center justify-center flex-shrink-0 shadow-xs">
            <Mail className="w-5 h-5" />
          </div>
          <div className="min-w-0 flex-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#22c55e] block">
              {isHindi ? "आधिकारिक ईमेल (OFFICIAL EMAIL)" : "OFFICIAL EMAIL"}
            </span>
            <span
              className="text-xs sm:text-sm font-semibold text-[#000000] dark:text-stone-100 group-hover:text-[#15803d] dark:group-hover:text-[#22c55e] transition-colors truncate block mt-0.5"
              style={{ fontWeight: 600, color: isDark ? undefined : "#000000" }}
            >
              sadiquehavari@gmail.com
            </span>
            <span className="text-[11px] text-[#22c55e] font-medium block mt-0.5" style={{ fontWeight: 500 }}>
              {isHindi ? "क्लिक करके मेल भेजें →" : "Click to send email →"}
            </span>
          </div>
        </a>

        {/* Phone Helpline Direct Action Button */}
        <a
          id="contact-phone-btn"
          href="tel:+917355163471"
          className={`p-4 rounded-2xl border transition-all flex items-center gap-3.5 group cursor-pointer ${
            isDark
              ? "bg-stone-800/60 border-stone-700/80 hover:border-[#22c55e] hover:bg-stone-800"
              : "bg-white border-stone-200 hover:border-[#22c55e] hover:bg-[#F0FDF4] shadow-sm"
          }`}
          title="Call +91 7355163471"
        >
          <div className="w-11 h-11 rounded-2xl bg-[#22c55e]/20 text-[#22c55e] group-hover:bg-[#22c55e] group-hover:text-white transition-all flex items-center justify-center flex-shrink-0 shadow-xs">
            <Phone className="w-5 h-5" />
          </div>
          <div className="min-w-0 flex-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#22c55e] block">
              {isHindi ? "हेल्पलाइन फ़ोन (HELPLINE PHONE)" : "HELPLINE PHONE"}
            </span>
            <span
              className="text-xs sm:text-sm font-semibold text-[#000000] dark:text-stone-100 group-hover:text-[#15803d] dark:group-hover:text-[#22c55e] transition-colors truncate block mt-0.5"
              style={{ fontWeight: 600, color: isDark ? undefined : "#000000" }}
            >
              +91 7355163471
            </span>
            <span className="text-[11px] text-[#22c55e] font-medium block mt-0.5" style={{ fontWeight: 500 }}>
              {isHindi ? "क्लिक करके कॉल करें →" : "Click to call →"}
            </span>
          </div>
        </a>
      </div>

      {/* Copyright Line */}
      <div className="mt-4 pt-3.5 border-t border-stone-200 dark:border-stone-800 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#111827] dark:text-stone-300 gap-2">
        <span className="font-semibold text-[#111827] dark:text-stone-300">© 2026 Ahariq • Promoting Healthier Eating for India</span>
        <span className="text-[#22c55e] font-bold">
          {isHindi ? "स्वस्थ भारत 🇮🇳" : "Clean Food for India 🇮🇳"}
        </span>
      </div>
    </div>
  );
};
