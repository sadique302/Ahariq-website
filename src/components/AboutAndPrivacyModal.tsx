import React, { useState } from "react";
import {
  X,
  Info,
  ShieldCheck,
  Lock,
  Camera,
  Database,
  EyeOff,
  CheckCircle2,
  Heart,
  Sparkles,
  Mail,
  Phone,
  Building2
} from "lucide-react";
import { Language } from "../types";

interface AboutAndPrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: "about" | "privacy";
  language: Language;
  isDark: boolean;
}

export const AboutAndPrivacyModal: React.FC<AboutAndPrivacyModalProps> = ({
  isOpen,
  onClose,
  initialTab = "about",
  language,
  isDark,
}) => {
  const [activeTab, setActiveTab] = useState<"about" | "privacy">(initialTab);
  const isHindi = language === "hi";

  if (!isOpen) return null;

  return (
    <div
      id="about-privacy-modal-backdrop"
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
    >
      <div
        id="about-privacy-modal-card"
        className={`w-full max-w-xl rounded-3xl border shadow-2xl overflow-hidden flex flex-col max-h-[90vh] ${
          isDark
            ? "bg-stone-900 border-stone-800 text-stone-100"
            : "bg-white border-stone-200 text-stone-900"
        }`}
      >
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#15803d] to-[#22c55e] flex items-center justify-center text-white shadow-md shadow-[#22c55e]/20">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-black text-lg sm:text-xl tracking-tight bg-gradient-to-r from-[#15803d] via-[#16a34a] to-[#22c55e] dark:from-[#22c55e] dark:to-emerald-300 bg-clip-text text-transparent">
                Ahariq (आहार IQ)
              </h2>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                {isHindi ? "पारदर्शिता, सुरक्षा, नेतृत्व और मिशन" : "Transparency, Security & Mission"}
              </p>
            </div>
          </div>

          <button
            id="close-about-privacy-btn"
            onClick={onClose}
            className="p-2 rounded-full hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="px-4 pt-3 pb-1 border-b border-stone-100 dark:border-stone-800 flex gap-2">
          <button
            id="tab-about-btn"
            onClick={() => setActiveTab("about")}
            className={`flex-1 py-2.5 rounded-2xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeTab === "about"
                ? "bg-[#22c55e] text-white shadow-md shadow-[#22c55e]/25"
                : "text-[#1F2937] dark:text-stone-300 hover:text-[#111827] dark:hover:text-white hover:bg-stone-100 dark:hover:bg-stone-800"
            }`}
          >
            <Info className="w-4 h-4" />
            <span>{isHindi ? "हमारे बारे में (About Us)" : "About Us"}</span>
          </button>

          <button
            id="tab-privacy-btn"
            onClick={() => setActiveTab("privacy")}
            className={`flex-1 py-2.5 rounded-2xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeTab === "privacy"
                ? "bg-[#22c55e] text-white shadow-md shadow-[#22c55e]/25"
                : "text-[#1F2937] dark:text-stone-300 hover:text-[#111827] dark:hover:text-white hover:bg-stone-100 dark:hover:bg-stone-800"
            }`}
          >
            <Lock className="w-4 h-4" />
            <span>{isHindi ? "गोपनीयता नीति (Privacy Policy)" : "Privacy Policy"}</span>
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4 text-xs sm:text-sm">
          {activeTab === "about" ? (
            <div className="space-y-4 animate-in fade-in duration-200">
              {/* Official Mission Box */}
              <div
                className={`p-4 rounded-2xl border ${
                  isDark
                    ? "bg-stone-800 border-[#22c55e]/30 text-stone-100"
                    : "bg-white border-stone-200 text-[#111827] shadow-sm"
                }`}
                style={{ padding: "16px" }}
              >
                <div className="flex items-center gap-2 text-[#22c55e] font-black text-sm mb-2.5">
                  <span className="text-sm leading-none">🌾</span>
                  <span className="font-bold text-sm text-[#22c55e]">{isHindi ? "हमारा लक्ष्य (About Us)" : "About Ahariq"}</span>
                </div>
                
                {/* Hindi / Hinglish Message */}
                <p
                  className="text-base leading-[1.6] font-normal text-[#111827] dark:text-stone-100"
                  style={{ fontSize: "16px", lineHeight: "1.6", fontWeight: 400, color: isDark ? undefined : "#111827" }}
                >
                  "Ahariq (Aahaar IQ) Bharat ke parivaron ke liye bana hai. Hum packaged food ke ingredients, poshak tatva aur suraksha ki jaanch karte hain taaki aap behtar faisla le saken. Hamara lakshya hai Swasth Bharat - Har Ghar Me Saaf aur Imaandar Khana."
                </p>

                {/* English Translation */}
                <div className="mt-3 pt-3 border-t border-stone-200 dark:border-stone-700">
                  <p
                    className="text-sm leading-[1.6] font-normal text-[#111827] dark:text-stone-200"
                    style={{ lineHeight: "1.6", fontWeight: 400, color: isDark ? undefined : "#111827" }}
                  >
                    "Ahariq (Aahaar IQ) is made for Indian families to check packaged food products. We analyze ingredients, nutrition, and safety so you can make informed choices. Our mission is Swasth Bharat - Clean and Honest Food for Every Indian Home."
                  </p>
                </div>
              </div>

              {/* Company Team & Contact Box */}
              <div
                className={`p-4 rounded-2xl border flex items-center justify-between gap-3 ${
                  isDark
                    ? "bg-stone-800/80 border-stone-700 text-stone-100"
                    : "bg-white border-stone-200 text-[#111827] shadow-sm"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#22c55e]/20 text-[#22c55e] flex items-center justify-center flex-shrink-0">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#22c55e] block">
                      ORGANIZATION & TEAM
                    </span>
                    <h4 className="font-bold text-sm text-[#000000] dark:text-stone-100" style={{ fontWeight: 700, color: isDark ? undefined : "#000000" }}>
                      Ahariq Team (Aahaar IQ)
                    </h4>
                    <p className="text-[11px] text-[#111827] dark:text-stone-300 font-normal">
                      Promoting Clean and Honest Food for India
                    </p>
                  </div>
                </div>

                <div className="flex flex-col items-end text-right gap-1.5">
                  <a
                    href="mailto:sadiquehavari@gmail.com"
                    className="text-xs font-semibold text-[#000000] dark:text-stone-100 hover:text-[#22c55e] dark:hover:text-[#22c55e] flex items-center gap-1"
                    style={{ color: isDark ? undefined : "#000000", fontWeight: 600 }}
                  >
                    <Mail className="w-3.5 h-3.5 text-[#22c55e]" />
                    <span className="font-semibold text-[#000000] dark:text-stone-100">sadiquehavari@gmail.com</span>
                  </a>
                  <a
                    href="tel:+917355163471"
                    className="text-xs font-semibold text-[#000000] dark:text-stone-100 hover:text-[#22c55e] dark:hover:text-[#22c55e] flex items-center gap-1"
                    style={{ color: isDark ? undefined : "#000000", fontWeight: 600 }}
                  >
                    <Phone className="w-3.5 h-3.5 text-[#22c55e]" />
                    <span className="font-semibold text-[#000000] dark:text-stone-100">+91 7355163471</span>
                  </a>
                </div>
              </div>

              {/* What We Stand For */}
              <div className="space-y-3">
                <h3 className="font-bold text-sm uppercase tracking-wider text-[#000000] dark:text-stone-200" style={{ fontWeight: 700, color: isDark ? undefined : "#000000" }}>
                  {isHindi ? "AharIQ क्या करता है:" : "What Ahariq Delivers:"}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div
                    className={`p-3.5 rounded-2xl border flex items-start gap-2.5 ${
                      isDark ? "bg-stone-800/50 border-stone-700" : "bg-white border-stone-200 shadow-sm"
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#22c55e] flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-xs font-bold text-[#000000] dark:text-stone-100" style={{ fontWeight: 700, color: isDark ? undefined : "#000000" }}>
                        {isHindi ? "पाम ऑयल और मैदा डिटेक्शन" : "Palm Oil & Maida Audit"}
                      </strong>
                      <p className="text-[11px] text-[#111827] dark:text-stone-300 mt-0.5" style={{ color: isDark ? undefined : "#111827" }}>
                        {isHindi
                          ? "भारतीय पैकेज्ड फूड में छिपे हानिकारक तेलों और रिफाइंड आटे की पहचान।"
                          : "Identifies hidden saturated fats, palmolein, and high-glycemic flour."}
                      </p>
                    </div>
                  </div>

                  <div
                    className={`p-3.5 rounded-2xl border flex items-start gap-2.5 ${
                      isDark ? "bg-stone-800/50 border-stone-700" : "bg-white border-stone-200 shadow-sm"
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#22c55e] flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-xs font-bold text-[#000000] dark:text-stone-100" style={{ fontWeight: 700, color: isDark ? undefined : "#000000" }}>
                        {isHindi ? "FSSAI DART मिलावट जांच" : "FSSAI DART Lab Tests"}
                      </strong>
                      <p className="text-[11px] text-[#111827] dark:text-stone-300 mt-0.5" style={{ color: isDark ? undefined : "#111827" }}>
                        {isHindi
                          ? "दूध, तेल, घी, शहद व मसालों के लिए 2 मिनट के आसान घरेलू परीक्षण।"
                          : "2-minute rapid kitchen tests approved by FSSAI for everyday staples."}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Team Note */}
              <div
                className={`p-3.5 rounded-2xl border flex items-center justify-between text-xs ${
                  isDark ? "bg-stone-800 border-stone-700" : "bg-white border-stone-200 shadow-sm"
                }`}
              >
                <div className="flex items-center gap-2">
                  <Heart className="w-4 h-4 text-rose-500" />
                  <span className="font-bold text-[#000000] dark:text-stone-200" style={{ fontWeight: 700, color: isDark ? undefined : "#000000" }}>
                    {isHindi ? "Ahariq (आहार IQ) • स्वस्थ भारत" : "Ahariq • Made for India"}
                  </span>
                </div>
                <span className="text-[11px] text-[#111827] dark:text-stone-300 font-bold" style={{ color: isDark ? undefined : "#111827" }}>100% Free & Open 🇮🇳</span>
              </div>
            </div>
          ) : (
            <div className="space-y-4 animate-in fade-in duration-200">
              {/* Official Privacy Policy Box */}
              <div
                className={`p-4 rounded-2xl border ${
                  isDark
                    ? "bg-stone-800 border-[#22c55e]/30 text-stone-100"
                    : "bg-white border-stone-200 text-[#111827] shadow-sm"
                }`}
                style={{ padding: "16px" }}
              >
                <div className="flex items-center gap-2 text-[#22c55e] font-black text-sm mb-2">
                  <ShieldCheck className="w-4 h-4" />
                  <span className="font-bold text-[#22c55e]">{isHindi ? "100% डेटा गोपनीयता (Privacy Guarantee)" : "Privacy Policy"}</span>
                </div>
                <p className="leading-[1.6] font-normal text-base text-[#111827] dark:text-stone-100" style={{ fontSize: "16px", lineHeight: "1.6", fontWeight: 400, color: isDark ? undefined : "#111827" }}>
                  {isHindi
                    ? "Ahariq व्यक्तिगत उपयोगकर्ता डेटा एकत्र, संग्रहीत या साझा नहीं करता है। कैमरा एक्सेस का उपयोग पूरी तरह से उत्पाद बारकोड को स्कैन करने के लिए किया जाता है। स्कैन इतिहास आपके डिवाइस पर स्थानीय रूप से संग्रहीत किया जाता है और इसे कभी भी हटाया जा सकता है।"
                    : "Ahariq does not collect, store, or share personal user data. Camera access is used solely for scanning product barcodes. Scan history is stored locally on your device and can be deleted anytime."}
                </p>
              </div>

              {/* Privacy Breakdown Cards */}
              <div className="space-y-2.5">
                <div
                  className={`p-4 rounded-2xl border flex items-start gap-3 ${
                    isDark ? "bg-stone-800/50 border-stone-700" : "bg-white border-stone-200 shadow-sm"
                  }`}
                >
                  <div className="w-8 h-8 rounded-xl bg-[#22c55e]/15 text-[#22c55e] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Camera className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-sm font-bold text-[#000000] dark:text-stone-100" style={{ fontWeight: 700, color: isDark ? undefined : "#000000" }}>
                      {isHindi ? "Camera Permissions (कैमरा अनुमतियाँ)" : "Camera Permissions"}
                    </strong>
                    <p className="text-xs text-[#111827] dark:text-stone-300 mt-1 leading-relaxed font-normal" style={{ fontWeight: 400, color: isDark ? undefined : "#111827" }}>
                      {isHindi
                        ? "कैमरा फीड केवल आपके डिवाइस पर बारकोड पहचानने के लिए प्रोसेस होती है। कोई फोटो या वीडियो हमारे सर्वर पर अपलोड नहीं की जाती।"
                        : "Camera feed is processed strictly on-device to decode product barcodes. No video streams are saved or uploaded."}
                    </p>
                  </div>
                </div>

                <div
                  className={`p-4 rounded-2xl border flex items-start gap-3 ${
                    isDark ? "bg-stone-800/50 border-stone-700" : "bg-white border-stone-200 shadow-sm"
                  }`}
                >
                  <div className="w-8 h-8 rounded-xl bg-[#22c55e]/15 text-[#22c55e] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Database className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-sm font-bold text-[#000000] dark:text-stone-100" style={{ fontWeight: 700, color: isDark ? undefined : "#000000" }}>
                      {isHindi ? "Local Device Storage (लोकल स्टोरेज)" : "Local Device Storage"}
                    </strong>
                    <p className="text-xs text-[#111827] dark:text-stone-300 mt-1 leading-relaxed font-normal" style={{ fontWeight: 400, color: isDark ? undefined : "#111827" }}>
                      {isHindi
                        ? "आपकी सहेजी गई लिस्ट और स्कैन इतिहास केवल आपके ब्राउज़र के LocalStorage में रहता है। आप इसे कभी भी हटा सकते हैं।"
                        : "Your grocery list and scan history reside solely in your browser's local memory and can be cleared instantly."}
                    </p>
                  </div>
                </div>

                <div
                  className={`p-4 rounded-2xl border flex items-start gap-3 ${
                    isDark ? "bg-stone-800/50 border-stone-700" : "bg-white border-stone-200 shadow-sm"
                  }`}
                >
                  <div className="w-8 h-8 rounded-xl bg-[#22c55e]/15 text-[#22c55e] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <EyeOff className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-sm font-bold text-[#000000] dark:text-stone-100" style={{ fontWeight: 700, color: isDark ? undefined : "#000000" }}>
                      {isHindi ? "Zero Third-Party Trackers" : "Zero Third-Party Trackers"}
                    </strong>
                    <p className="text-xs text-[#111827] dark:text-stone-300 mt-1 leading-relaxed font-normal" style={{ fontWeight: 400, color: isDark ? undefined : "#111827" }}>
                      {isHindi
                        ? "हम उपयोगकर्ता की प्रोफाइलिंग नहीं करते और न ही किसी तीसरे पक्ष के साथ डेटा साझा करते हैं।"
                        : "We do not sell advertising data, use intrusive tracking cookies, or perform cross-site user profiling."}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Support Quick Contacts */}
        <div className="p-4 bg-stone-50 dark:bg-stone-800/60 border-t border-stone-200 dark:border-stone-800 flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-bold text-[#111827] dark:text-stone-200">
              Ahariq Support:
            </span>
            <a
              href="mailto:sadiquehavari@gmail.com"
              className="text-xs font-semibold text-[#111827] dark:text-stone-200 hover:text-[#22c55e] dark:hover:text-[#22c55e] flex items-center gap-1"
            >
              <Mail className="w-3.5 h-3.5 text-[#22c55e]" />
              <span>sadiquehavari@gmail.com</span>
            </a>
            <a
              href="tel:+917355163471"
              className="text-xs font-semibold text-[#111827] dark:text-stone-200 hover:text-[#22c55e] dark:hover:text-[#22c55e] flex items-center gap-1"
            >
              <Phone className="w-3.5 h-3.5 text-[#22c55e]" />
              <span>+91 7355163471</span>
            </a>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-full bg-[#22c55e] text-white font-bold text-xs hover:bg-[#16a34a] transition-colors cursor-pointer"
          >
            {isHindi ? "बंद करें" : "Close"}
          </button>
        </div>
      </div>
    </div>
  );
};
