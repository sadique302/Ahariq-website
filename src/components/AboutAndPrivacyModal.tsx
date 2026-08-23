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
            <div className="space-y-5 animate-in fade-in duration-200">
              {/* Mission Statement Box */}
              <div
                className={`p-4 sm:p-5 rounded-2xl border ${
                  isDark
                    ? "bg-stone-800/90 border-[#22c55e]/30 text-stone-100"
                    : "bg-emerald-50/50 border-emerald-200 text-[#111827] shadow-sm"
                }`}
              >
                <div className="flex items-center gap-2 text-[#22c55e] font-black text-sm mb-2.5">
                  <ShieldCheck className="w-5 h-5" />
                  <span className="font-bold text-base text-[#059669] dark:text-[#34D399]">
                    {isHindi ? "हमारा मिशन: स्वस्थ भारत - स्वच्छ भोजन" : "Our Mission: Clean & Honest Food for India"}
                  </span>
                </div>
                
                <p className="text-sm sm:text-base leading-relaxed text-[#111827] dark:text-stone-100 font-medium">
                  {isHindi
                    ? "AharIQ (आहार IQ) भारत के 140 करोड़ नागरिकों और परिवारों को अल्ट्रा-प्रोसेस्ड पैकेज्ड फूड और खतरनाक खाद्य रसायनों के चंगुल से बचाने के लिए बनाया गया एक 100% स्वतंत्र और निष्पक्ष डिजिटल प्लेटफॉर्म है।"
                    : "AharIQ is a 100% independent public initiative built to empower Indian families with lab-grade transparency against ultra-processed foods, hidden toxins, and adulterated grocery items."}
                </p>

                <div className="mt-3 pt-3 border-t border-emerald-200 dark:border-stone-700 flex flex-wrap items-center justify-between gap-2 text-xs font-bold text-emerald-800 dark:text-emerald-300">
                  <span>🇮🇳 100% Free & Open For Every Indian</span>
                  <span>🔬 Based on FSSAI & Global Food Standards</span>
                </div>
              </div>

              {/* DANGEROUS DISEASES & HEALTH WARNING SECTION */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400">
                  <AlertTriangle className="w-5 h-5 flex-shrink-0 animate-bounce" />
                  <h3 className="font-black text-sm sm:text-base tracking-wide uppercase">
                    {isHindi ? "⚠️ पैकेज्ड फूड का सच: जानलेवा बीमारियां और खतरे" : "⚠️ The Hidden Health Epidemic in Packaged Foods"}
                  </h3>
                </div>

                <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                  {isHindi
                    ? "आज भारत में बिकने वाले 80% से अधिक पैकेज्ड फूड (बिस्कुट, चिप्स, नूडल्स, सीरियल्स, सॉफ्ट ड्रिंक्स) में ऐसे केमिकल्स और तेल होते हैं जो धीरे-धीरे शरीर के मुख्य अंगों को नुकसान पहुँचाते हैं:"
                    : "Over 80% of ultra-processed packaged snacks and drinks in India contain hidden compounds scientifically linked to chronic lifestyle diseases:"}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  {/* Disease 1: Heart Attack & Palm Oil */}
                  <div
                    className={`p-3.5 rounded-2xl border flex items-start gap-3 ${
                      isDark ? "bg-rose-950/20 border-rose-900/50" : "bg-rose-50/60 border-rose-200"
                    }`}
                  >
                    <div className="w-8 h-8 rounded-xl bg-rose-500/20 text-rose-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <HeartPulse className="w-4 h-4" />
                    </div>
                    <div>
                      <strong className="block text-xs font-black text-rose-950 dark:text-rose-200">
                        {isHindi ? "1. कम उम्र में हार्ट अटैक व ब्लॉक नसें" : "1. Early Heart Attack & Clogged Arteries"}
                      </strong>
                      <p className="text-[11px] text-stone-700 dark:text-stone-300 mt-1 leading-relaxed">
                        {isHindi
                          ? "पाम ऑयल (Palmolein) और हाइड्रोजनेटेड फैट्स धमनियों में एलडीएल (गंदा कोलेस्ट्रॉल) जमा करते हैं, जिससे 25-40 साल के युवाओं में अचानक कार्डियक अरेस्ट का खतरा बढ़ रहा है।"
                          : "Cheap Palmolein oil & industrial trans-fats build arterial plaque, rapidly spiking cardiovascular disease risks in young adults."}
                      </p>
                    </div>
                  </div>

                  {/* Disease 2: Type 2 Diabetes & Hidden Sugars */}
                  <div
                    className={`p-3.5 rounded-2xl border flex items-start gap-3 ${
                      isDark ? "bg-amber-950/20 border-amber-900/50" : "bg-amber-50/60 border-amber-200"
                    }`}
                  >
                    <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Flame className="w-4 h-4" />
                    </div>
                    <div>
                      <strong className="block text-xs font-black text-amber-950 dark:text-amber-200">
                        {isHindi ? "2. टाइप-2 डायबिटीज़ और इंसुलिन क्रैश" : "2. Type-2 Diabetes & Insulin Crash"}
                      </strong>
                      <p className="text-[11px] text-stone-700 dark:text-stone-300 mt-1 leading-relaxed">
                        {isHindi
                          ? "माल्टोडेक्सट्रिन (Maltodextrin GI 110), लिक्विड ग्लूकोज और इनवर्ट सिरप साधारण चीनी से भी 2 गुना तेजी से ब्लड शुगर स्पाइक कर पेनक्रियाज को थका देते हैं।"
                          : "Maltodextrin (GI up to 110) & liquid invert sugars spike blood sugar faster than pure table sugar, accelerating metabolic failure."}
                      </p>
                    </div>
                  </div>

                  {/* Disease 3: Fatty Liver in Children */}
                  <div
                    className={`p-3.5 rounded-2xl border flex items-start gap-3 ${
                      isDark ? "bg-purple-950/20 border-purple-900/50" : "bg-purple-50/60 border-purple-200"
                    }`}
                  >
                    <div className="w-8 h-8 rounded-xl bg-purple-500/20 text-purple-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Activity className="w-4 h-4" />
                    </div>
                    <div>
                      <strong className="block text-xs font-black text-purple-950 dark:text-purple-200">
                        {isHindi ? "3. बच्चों में नॉन-अल्कोहलिक फैटी लिवर (NAFLD)" : "3. Non-Alcoholic Fatty Liver (NAFLD)"}
                      </strong>
                      <p className="text-[11px] text-stone-700 dark:text-stone-300 mt-1 leading-relaxed">
                        {isHindi
                          ? "बिना शराब पिए भी 10-15 साल के बच्चों में लिवर में फैट जमा हो रहा है। इसका मुख्य कारण पैकेज्ड कोल्ड ड्रिंक्स और स्नैक्स का हाई फ्रुक्टोज कॉर्न सिरप है।"
                          : "High Fructose Corn Syrup & ultra-refined starches directly convert to liver fat, triggering fatty liver even in young school kids."}
                      </p>
                    </div>
                  </div>

                  {/* Disease 4: Cancer Risk & Synthetic Colors */}
                  <div
                    className={`p-3.5 rounded-2xl border flex items-start gap-3 ${
                      isDark ? "bg-red-950/20 border-red-900/50" : "bg-red-50/60 border-red-200"
                    }`}
                  >
                    <div className="w-8 h-8 rounded-xl bg-red-500/20 text-red-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <AlertTriangle className="w-4 h-4" />
                    </div>
                    <div>
                      <strong className="block text-xs font-black text-red-950 dark:text-red-200">
                        {isHindi ? "4. कैंसर और सेलुलर टॉक्सिसिटी का खतरा" : "4. Carcinogenic Additives & Dyes"}
                      </strong>
                      <p className="text-[11px] text-stone-700 dark:text-stone-300 mt-1 leading-relaxed">
                        {isHindi
                          ? "सिंथेटिक फूड कलर्स (Red 40 / E129, Sunset Yellow E110, Tartrazine E102, Titanium Dioxide E171) यूरोप में बैन या कड़े प्रतिबंधों में हैं, लेकिन भारत में धड़ल्ले से इस्तेमाल हो रहे हैं।"
                          : "Synthetic coal-tar dyes (Allura Red, Sunset Yellow, Titanium Dioxide) banned or restricted in Europe are widely fed to Indian children."}
                      </p>
                    </div>
                  </div>

                  {/* Disease 5: Brain Fog & ADHD in Kids */}
                  <div
                    className={`p-3.5 rounded-2xl border flex items-start gap-3 ${
                      isDark ? "bg-blue-950/20 border-blue-900/50" : "bg-blue-50/60 border-blue-200"
                    }`}
                  >
                    <div className="w-8 h-8 rounded-xl bg-blue-500/20 text-blue-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div>
                      <strong className="block text-xs font-black text-blue-950 dark:text-blue-200">
                        {isHindi ? "5. बच्चों में चिड़चिड़ापन और ADHD" : "5. ADHD, Hyperactivity & Gut Damage"}
                      </strong>
                      <p className="text-[11px] text-stone-700 dark:text-stone-300 mt-1 leading-relaxed">
                        {isHindi
                          ? "प्रिजर्वेटिव्स (Sodium Benzoate E211, Potassium Sorbate) आंतों के गुड बैक्टीरिया को नष्ट कर बच्चों के दिमाग और एकाग्रता पर गहरा दुष्प्रभाव डालते हैं।"
                          : "Harsh chemical preservatives destroy gut microbiota, directly impacting dopamine regulation, attention span, and mood in growing children."}
                      </p>
                    </div>
                  </div>

                  {/* Disease 6: High Blood Pressure & MSG */}
                  <div
                    className={`p-3.5 rounded-2xl border flex items-start gap-3 ${
                      isDark ? "bg-orange-950/20 border-orange-900/50" : "bg-orange-50/60 border-orange-200"
                    }`}
                  >
                    <div className="w-8 h-8 rounded-xl bg-orange-500/20 text-orange-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <AlertTriangle className="w-4 h-4" />
                    </div>
                    <div>
                      <strong className="block text-xs font-black text-orange-950 dark:text-orange-200">
                        {isHindi ? "6. हाई ब्लड प्रेशर और किडनी पर दबाव" : "6. High Blood Pressure & Renal Strain"}
                      </strong>
                      <p className="text-[11px] text-stone-700 dark:text-stone-300 mt-1 leading-relaxed">
                        {isHindi
                          ? "इंस्टेंट नूडल्स, नमकीन और सॉस में सोडियम और MSG (E621) का अत्यधिक स्तर साइलेंट किलर की तरह ब्लड प्रेशर बढ़ाकर किडनी को नुकसान पहुंचाता है।"
                          : "Massive hidden sodium & flavour enhancers (MSG/E621, HVP) cause water retention, blood pressure spikes, and long-term renal damage."}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Companies Marketing Traps vs Reality */}
              <div className="space-y-3">
                <h3 className="font-bold text-sm uppercase tracking-wider text-[#000000] dark:text-stone-200">
                  {isHindi ? "पैकेजिंग के झूठे दावे vs असली सच्चाई:" : "Marketing Gimmicks vs Brutal Truth:"}
                </h3>
                <div className="space-y-2">
                  <div
                    className={`p-3 rounded-2xl border ${
                      isDark ? "bg-stone-800/60 border-stone-700" : "bg-white border-stone-200 shadow-sm"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 text-xs">
                      <span className="font-bold text-rose-600">❌ "100% Atta / Wheat" दावा</span>
                      <span className="font-bold text-emerald-600 dark:text-emerald-400">✅ AharIQ सच: 60% मैदा + पाम ऑयल</span>
                    </div>
                  </div>

                  <div
                    className={`p-3 rounded-2xl border ${
                      isDark ? "bg-stone-800/60 border-stone-700" : "bg-white border-stone-200 shadow-sm"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 text-xs">
                      <span className="font-bold text-rose-600">❌ "Zero Added Sugar" दावा</span>
                      <span className="font-bold text-emerald-600 dark:text-emerald-400">✅ AharIQ सच: Maltodextrin & Sucralose</span>
                    </div>
                  </div>

                  <div
                    className={`p-3 rounded-2xl border ${
                      isDark ? "bg-stone-800/60 border-stone-700" : "bg-white border-stone-200 shadow-sm"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 text-xs">
                      <span className="font-bold text-rose-600">❌ "Real Fruit Juice" दावा</span>
                      <span className="font-bold text-emerald-600 dark:text-emerald-400">✅ AharIQ सच: 2% पल्प + 98% चीनी व पानी</span>
                    </div>
                  </div>
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
                      Dedicated to Clean, Honest & Disease-Free Food for India
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

              {/* Footer Note */}
              <div
                className={`p-3.5 rounded-2xl border flex items-center justify-between text-xs ${
                  isDark ? "bg-stone-800 border-stone-700" : "bg-white border-stone-200 shadow-sm"
                }`}
              >
                <div className="flex items-center gap-2">
                  <Heart className="w-4 h-4 text-rose-500" />
                  <span className="font-bold text-[#000000] dark:text-stone-200">
                    {isHindi ? "Ahariq (आहार IQ) • अपने परिवार को स्वस्थ रखें" : "Ahariq • Protect Your Family's Health"}
                  </span>
                </div>
                <span className="text-[11px] text-[#111827] dark:text-stone-300 font-bold">100% Free & Open 🇮🇳</span>
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
