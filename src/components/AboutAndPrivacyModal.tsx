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
  Mail,
  Phone,
  Building2,
  AlertTriangle,
  Flame,
  Activity,
  HeartPulse
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

  React.useEffect(() => {
    if (isOpen) {
      setActiveTab(initialTab);
    }
  }, [initialTab, isOpen]);

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
              {/* Mission Statement Box */}
              <div
                className={`p-4 sm:p-5 rounded-2xl border ${
                  isDark
                    ? "bg-stone-800/90 border-[#22c55e]/30 text-stone-100"
                    : "bg-emerald-50/60 border-emerald-200 text-[#111827] shadow-sm"
                }`}
              >
                <div className="flex items-center gap-2 text-[#22c55e] font-black text-sm mb-2.5">
                  <ShieldCheck className="w-5 h-5 flex-shrink-0" />
                  <h3 className="font-bold text-base sm:text-lg text-[#059669] dark:text-[#34D399]">
                    {isHindi ? "हमारा मिशन: स्वस्थ भारत - स्वच्छ भोजन" : "Our Mission: Clean & Honest Food for India"}
                  </h3>
                </div>

                <p className="text-sm sm:text-base leading-relaxed text-[#111827] dark:text-stone-100 font-medium">
                  {isHindi
                    ? "Ahariq (आहार IQ) का मकसद आपको पैकेज्ड फूड के लेबल पढ़ना सिखाना है। भारत में बिकने वाले 80% से अधिक पैकेज्ड फूड में अधिक चीनी, नमक और संतृप्त वसा (Saturated Fat) होती है, जिसके अधिक सेवन को WHO और FSSAI मोटापा, हाई ब्लड प्रेशर (High BP) और दिल से जुड़ी समस्याओं के जोखिम से जोड़ते हैं।"
                    : "Ahariq (Aahar IQ) is designed to teach you how to read packaged food labels. Over 80% of packaged foods sold in India contain high sugar, sodium, and saturated fats, which WHO and FSSAI associate with risks of obesity, hypertension, and cardiovascular issues."}
                </p>

                <div className="mt-3 pt-3 border-t border-emerald-200/80 dark:border-stone-700 flex flex-wrap items-center justify-between gap-2 text-xs font-bold text-emerald-800 dark:text-emerald-300">
                  <span>🇮🇳 100% Free & Open For Every Indian</span>
                  <span>🔬 Based on FSSAI & Global Food Standards</span>
                </div>
              </div>

              {/* 3 Key Points Cards */}
              <div className="space-y-3">
                {/* 1. Palm Oil & Hydrogenated Fat */}
                <div
                  className={`p-3.5 rounded-2xl border flex items-start gap-3 ${
                    isDark ? "bg-stone-800/70 border-stone-700" : "bg-white border-stone-200 shadow-sm"
                  }`}
                >
                  <div className="w-8 h-8 rounded-xl bg-amber-500/15 text-amber-600 flex items-center justify-center flex-shrink-0 mt-0.5 font-black text-xs">
                    1
                  </div>
                  <div>
                    <strong className="block text-xs sm:text-sm font-bold text-[#111827] dark:text-white">
                      {isHindi
                        ? "पाम ऑयल और हाइड्रोजनीकृत वसा (Palm Oil & Hydrogenated Fat)"
                        : "Palm Oil & Hydrogenated Fat"}
                    </strong>
                    <p className="text-xs text-stone-700 dark:text-stone-300 mt-1 leading-relaxed">
                      {isHindi
                        ? "इनमें संतृप्त वसा (Saturated Fat) अधिक होती है। विशेषज्ञ इसके अधिक सेवन को LDL (खराब कोलेस्ट्रॉल) बढ़ने से जोड़ते हैं।"
                        : "These contain high saturated fat. Health experts associate its excess intake with elevated LDL (bad cholesterol)."}
                    </p>
                  </div>
                </div>

                {/* 2. Synthetic Food Colors */}
                <div
                  className={`p-3.5 rounded-2xl border flex items-start gap-3 ${
                    isDark ? "bg-stone-800/70 border-stone-700" : "bg-white border-stone-200 shadow-sm"
                  }`}
                >
                  <div className="w-8 h-8 rounded-xl bg-rose-500/15 text-rose-600 flex items-center justify-center flex-shrink-0 mt-0.5 font-black text-xs">
                    2
                  </div>
                  <div>
                    <strong className="block text-xs sm:text-sm font-bold text-[#111827] dark:text-white">
                      {isHindi
                        ? "सिंथेटिक फूड कलर्स (Synthetic Food Colors - E129, E110, E102)"
                        : "Synthetic Food Colors (E129, E110, E102)"}
                    </strong>
                    <p className="text-xs text-stone-700 dark:text-stone-300 mt-1 leading-relaxed">
                      {isHindi
                        ? "कुछ अध्ययनों में इनके अधिक सेवन को बच्चों में अति-सक्रियता (Hyperactivity) से जोड़ा गया है, इसलिए यूरोप में इनपर चेतावनी लेबल अनिवार्य है।"
                        : "Certain studies link high intake with hyperactivity in children, which is why warning labels are mandatory across Europe."}
                    </p>
                  </div>
                </div>

                {/* 3. Preservatives */}
                <div
                  className={`p-3.5 rounded-2xl border flex items-start gap-3 ${
                    isDark ? "bg-stone-800/70 border-stone-700" : "bg-white border-stone-200 shadow-sm"
                  }`}
                >
                  <div className="w-8 h-8 rounded-xl bg-blue-500/15 text-blue-600 flex items-center justify-center flex-shrink-0 mt-0.5 font-black text-xs">
                    3
                  </div>
                  <div>
                    <strong className="block text-xs sm:text-sm font-bold text-[#111827] dark:text-white">
                      {isHindi
                        ? "प्रिजर्वेटिव्स (Preservatives - E211, E202)"
                        : "Preservatives (E211, E202)"}
                    </strong>
                    <p className="text-xs text-stone-700 dark:text-stone-300 mt-1 leading-relaxed">
                      {isHindi
                        ? "ये खाने को खराब होने से बचाते हैं। कुछ लोगों में इनके प्रति संवेदनशीलता (Sensitivity) हो सकती है।"
                        : "These prevent food spoilage and extend shelf life. Some individuals may have sensitivities to them."}
                    </p>
                  </div>
                </div>
              </div>

              {/* Awareness & Data Sources Box */}
              <div
                className={`p-3.5 rounded-2xl border ${
                  isDark
                    ? "bg-emerald-950/20 border-emerald-800/40 text-emerald-200"
                    : "bg-emerald-50 border-emerald-200 text-emerald-900"
                }`}
              >
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <p className="text-xs sm:text-sm leading-relaxed font-medium">
                    {isHindi
                      ? "हमारा काम आपको डराना नहीं, बल्कि जागरूक करना है। सारी जानकारी Open Food Facts, FSSAI और WHO की सार्वजनिक रिपोर्ट्स (Public Reports) पर आधारित है।"
                      : "Our goal is not to scare, but to educate. All information is sourced from Open Food Facts, FSSAI, and WHO public reports."}
                  </p>
                </div>
              </div>

              {/* Mandatory Medical Disclaimer Box */}
              <div
                className={`p-3.5 rounded-2xl border ${
                  isDark
                    ? "bg-amber-950/20 border-amber-800/40 text-amber-200"
                    : "bg-amber-50 border-amber-200 text-amber-900"
                }`}
              >
                <div className="flex items-start gap-2.5">
                  <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                  <p className="text-xs leading-relaxed font-medium">
                    {isHindi ? (
                      <>
                        <strong>अस्वीकरण (Disclaimer):</strong> यह ऐप मेडिकल सलाह नहीं है। किसी भी स्वास्थ्य समस्या के लिए डॉक्टर से संपर्क करें।
                      </>
                    ) : (
                      <>
                        <strong>Disclaimer:</strong> This app is for informational purposes and does not substitute professional medical advice. Always consult a physician for health concerns.
                      </>
                    )}
                  </p>
                </div>
              </div>

              {/* Company Team & Contact Box */}
              <div
                className={`p-4 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                  isDark
                    ? "bg-stone-800/90 border-stone-700 text-stone-100"
                    : "bg-white border-stone-200 text-[#111827] shadow-sm"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#22c55e]/20 text-[#22c55e] flex items-center justify-center flex-shrink-0">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#22c55e] block">
                      FOUNDER & LEADERSHIP
                    </span>
                    <h4 className="font-bold text-sm text-[#000000] dark:text-stone-100">
                      Sadique Samtaan & Ahariq Team
                    </h4>
                    <p className="text-[11px] text-[#111827] dark:text-stone-300 font-normal">
                      Dedicated to Clean & Honest Food Awareness
                    </p>
                  </div>
                </div>

                <div className="flex flex-col items-start sm:items-end gap-1.5 pt-2 sm:pt-0 border-t sm:border-t-0 border-stone-100 dark:border-stone-700">
                  <a
                    href="mailto:sadiquehavari@gmail.com"
                    className="text-xs font-semibold text-[#000000] dark:text-stone-100 hover:text-[#22c55e] dark:hover:text-[#22c55e] flex items-center gap-1.5"
                  >
                    <Mail className="w-3.5 h-3.5 text-[#22c55e]" />
                    <span>sadiquehavari@gmail.com</span>
                  </a>
                  <a
                    href="tel:+917355163471"
                    className="text-xs font-semibold text-[#000000] dark:text-stone-100 hover:text-[#22c55e] dark:hover:text-[#22c55e] flex items-center gap-1.5"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#22c55e]" />
                    <span>+91 7355163471</span>
                  </a>
                </div>
              </div>

              {/* Structured Mission & Integrity Card */}
              <div
                className={`p-4 sm:p-5 rounded-2xl border space-y-3 ${
                  isDark
                    ? "bg-stone-800/80 border-stone-700 text-stone-100"
                    : "bg-emerald-50/50 border-emerald-200/90 text-stone-900 shadow-xs"
                }`}
              >
                {/* Header with Brand & Tagline */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2.5 border-b border-stone-200 dark:border-stone-700">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-[#22c55e]/20 text-[#22c55e] flex items-center justify-center flex-shrink-0">
                      <Heart className="w-4 h-4 text-rose-500 fill-rose-500/20" />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-sm sm:text-base text-stone-900 dark:text-white flex items-center gap-1.5">
                        <span>Ahariq (Aahar IQ)</span>
                      </h4>
                      <p className="text-xs text-[#059669] dark:text-[#34D399] font-bold">
                        {isHindi ? "लेबल पढ़ना सीखें • सही भोजन चुनें" : "Learn to Read Labels • Choose Healthy"}
                      </p>
                    </div>
                  </div>

                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-[#059669] dark:text-[#34D399] text-xs font-black self-start sm:self-auto">
                    🇮🇳 100% Free & Open
                  </span>
                </div>

                {/* 3 Structured Pillars */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 text-xs">
                  <div className="p-2.5 rounded-xl bg-white dark:bg-stone-800 border border-stone-200/70 dark:border-stone-700 flex items-start gap-2">
                    <div className="w-4 h-4 rounded-full bg-emerald-100 dark:bg-emerald-900/60 text-[#059669] dark:text-[#34D399] flex items-center justify-center flex-shrink-0 text-[10px] font-bold mt-0.5">
                      ✓
                    </div>
                    <div>
                      <strong className="block font-bold text-stone-900 dark:text-stone-100">
                        {isHindi ? "पूर्णतः निःशुल्क" : "100% Free Forever"}
                      </strong>
                      <span className="text-[11px] text-stone-600 dark:text-stone-300 leading-tight block mt-0.5">
                        {isHindi ? "हर भारतीय नागरिक के लिए हमेशा मुफ्त" : "Open public awareness for all Indians"}
                      </span>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-white dark:bg-stone-800 border border-stone-200/70 dark:border-stone-700 flex items-start gap-2">
                    <div className="w-4 h-4 rounded-full bg-emerald-100 dark:bg-emerald-900/60 text-[#059669] dark:text-[#34D399] flex items-center justify-center flex-shrink-0 text-[10px] font-bold mt-0.5">
                      ✓
                    </div>
                    <div>
                      <strong className="block font-bold text-stone-900 dark:text-stone-100">
                        {isHindi ? "प्रमाणित मानक" : "Scientific Standards"}
                      </strong>
                      <span className="text-[11px] text-stone-600 dark:text-stone-300 leading-tight block mt-0.5">
                        {isHindi ? "FSSAI, WHO व ICMR दिशानिर्देश" : "FSSAI, WHO & ICMR backed rules"}
                      </span>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-white dark:bg-stone-800 border border-stone-200/70 dark:border-stone-700 flex items-start gap-2">
                    <div className="w-4 h-4 rounded-full bg-emerald-100 dark:bg-emerald-900/60 text-[#059669] dark:text-[#34D399] flex items-center justify-center flex-shrink-0 text-[10px] font-bold mt-0.5">
                      ✓
                    </div>
                    <div>
                      <strong className="block font-bold text-stone-900 dark:text-stone-100">
                        {isHindi ? "100% निष्पक्ष" : "Zero Brand Bias"}
                      </strong>
                      <span className="text-[11px] text-stone-600 dark:text-stone-300 leading-tight block mt-0.5">
                        {isHindi ? "कोई विज्ञापन या पेड प्रमोशन नहीं" : "No sponsored promotions or ads"}
                      </span>
                    </div>
                  </div>
                </div>
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
