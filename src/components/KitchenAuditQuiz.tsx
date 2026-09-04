import React, { useState, useEffect } from "react";
import { Language } from "../types";
import {
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Share2,
  ShieldCheck,
  ChevronRight,
  Flame,
  Award
} from "lucide-react";

interface KitchenAuditQuizProps {
  language: Language;
  isDark: boolean;
}

interface Question {
  id: string;
  titleEn: string;
  titleHi: string;
  options: {
    textEn: string;
    textHi: string;
    points: number;
    tipEn: string;
    tipHi: string;
  }[];
}

const QUESTIONS: Question[] = [
  {
    id: "oil",
    titleEn: "Which cooking oil is used in your daily kitchen?",
    titleHi: "आपकी रसोई में रोज कौन सा तेल इस्तेमाल होता है?",
    options: [
      {
        textEn: "Cold-Pressed Kacchi Ghani (Mustard/Groundnut/Sesame) or Desi Ghee",
        textHi: "कच्ची घानी (सरसों/मूंगफली/तिल) या शुद्ध देसी घी",
        points: 20,
        tipEn: "Excellent choice! Traditional cold-pressed oils retain micronutrients.",
        tipHi: "उत्कृष्ट चुनाव! पारंपरिक कच्ची घानी तेल में पोषक तत्व सुरक्षित रहते हैं।"
      },
      {
        textEn: "Normal Branded Refined Oil (Sunflower, Soybean, Rice Bran)",
        textHi: "ब्रांडेड रिफाइंड तेल (सनफ्लावर, सोयाबीन, राइस ब्रान)",
        points: 12,
        tipEn: "Moderate: Solvent refining uses high heat. Consider switching to cold-pressed.",
        tipHi: "मध्यम: रिफाइनिंग में केमिकल सॉल्वेंट का उपयोग होता है। कच्ची घानी पर स्विच करें।"
      },
      {
        textEn: "Refined Palm Olein, Vanaspati (Dalda), or Loose Unbranded Oil",
        textHi: "रिफाइंड पाम ऑयल, वनस्पति (डालडा) या खुला लोकल तेल",
        points: 2,
        tipEn: "High Risk: Rich in palmitic saturated fats and potential trans-fat residues.",
        tipHi: "उच्च जोखिम: अधिक पामिटिक सैचुरेटेड फैट और इंडस्ट्रियल ट्रांस-फैट का खतरा।"
      }
    ]
  },
  {
    id: "snacks",
    titleEn: "What do you usually eat with evening tea?",
    titleHi: "शाम की चाय के साथ आमतौर पर क्या खाया जाता है?",
    options: [
      {
        textEn: "Roasted Makhana, Roasted Chana, Peanuts, or Homemade Khakhra",
        textHi: "भुना मखाना, भुना चना, मूंगफली या घर का बना खाखरा/नाश्ता",
        points: 20,
        tipEn: "Superb! Natural protein and fiber without palm oil or preservatives.",
        tipHi: "शानदार! बिना पाम ऑयल और बिना प्रिजर्वेटिव्स का प्राकृतिक प्रोटीन व फाइबर।"
      },
      {
        textEn: "100% Atta Biscuits or Bakery Whole Wheat Rusk",
        textHi: "100% साबुत आटा बिस्कुट या बेकरी व्हीट रस्क",
        points: 14,
        tipEn: "Good step! Make sure palm oil is not substituted as vegetable fat.",
        tipHi: "अच्छा विकल्प! ध्यान रखें कि इसमें भी पाम ऑयल न मिलाया गया हो।"
      },
      {
        textEn: "Commercial Cream/Glucose Biscuits (Parle-G, Good Day, Bourbon) or Namkeen",
        textHi: "क्रीम या ग्लूकोज बिस्कुट (पारले-जी, गुड डे) या तली हुई नमकीन",
        points: 4,
        tipEn: "Common trap: 65% maida + 30% sugar + palm olein. High insulin spike.",
        tipHi: "आम आदत: 65% मैदा + 30% चीनी + पाम ऑयल। इंसुलिन स्पाइक का कारण।"
      }
    ]
  },
  {
    id: "breakfast",
    titleEn: "What is the most frequent breakfast in your home?",
    titleHi: "आपके घर में सबसे ज्यादा बनने वाला नाश्ता क्या है?",
    options: [
      {
        textEn: "Traditional Fresh Food: Poha, Idli, Besan Chilla, Eggs, or Sattu",
        textHi: "पारंपरिक ताजा नाश्ता: पोहा, इडली, बेसन चीला, अंडे या सत्तू",
        points: 20,
        tipEn: "Golden standard of Indian nutrition. Clean complex carbs and protein.",
        tipHi: "भारतीय पोषण का स्वर्ण मानक! स्वच्छ कॉम्प्लेक्स कार्ब्स और प्राकृतिक प्रोटीन।"
      },
      {
        textEn: "Plain Rolled Oats or Daliya (Broken Wheat) with milk",
        textHi: "सादा रोल्ड ओट्स या दलिया दूध के साथ",
        points: 16,
        tipEn: "Healthy soluble fiber (beta-glucan) supports heart health.",
        tipHi: "स्वस्थ घुलनशील फाइबर जो दिल और पाचन के लिए उत्तम है।"
      },
      {
        textEn: "Commercial White Bread + Jam, Sugary Chocos/Flakes, or Instant Noodles",
        textHi: "सफेद ब्रेड + जैम, मीठे चोकोस/कॉर्नफ्लेक्स या इंस्टेंट नूडल्स",
        points: 4,
        tipEn: "Ultra-processed: Lacks fiber and leads to mid-morning energy crashes.",
        tipHi: "अल्ट्रा-प्रोसेस्ड: फाइबर की कमी और सुबह 11 बजे तक कमजोरी या भूख लगना।"
      }
    ]
  },
  {
    id: "spices",
    titleEn: "How do you source basic spices (Turmeric, Red Chilli, Garam Masala)?",
    titleHi: "हल्दी, लाल मिर्च और गरम मसाले आप कहां से खरीदते हैं?",
    options: [
      {
        textEn: "AGMARK certified sealed packets or Whole Spices ground at home",
        textHi: "एगमार्क (AGMARK) सीलबंद मसाले या साबुत लाकर घर पर पिसवाते हैं",
        points: 20,
        tipEn: "Safest method! Protects your family from illegal dyes and lead chromate.",
        tipHi: "सबसे सुरक्षित! परिवार को लेड क्रोमेट और हानिकारक रंगों से बचाता है।"
      },
      {
        textEn: "Standard National Brand Packets (Everest, MDH, Catch)",
        textHi: "मानक राष्ट्रीय ब्रांडेड पैकेट्स (एवरेस्ट, एमडीएच, कैच)",
        points: 14,
        tipEn: "Decent: Check batch manufacturing and look for FSSAI registration.",
        tipHi: "ठीक विकल्प: बैच नंबर और एफएसएसएआई लाइसेंस हमेशा जांचें।"
      },
      {
        textEn: "Loose unbranded powder from local baniya/weekly mandi",
        textHi: "स्थानीय किराना या साप्ताहिक हाट से खुला बिना ब्रांड पिसा मसाला",
        points: 2,
        tipEn: "Critical Risk: Highest incidence of starch, sawdust and industrial dyes.",
        tipHi: "गंभीर जोखिम: स्टार्च, लकड़ी का बुरादा और केमिकल रंगों की सबसे ज्यादा मिलावट।"
      }
    ]
  },
  {
    id: "dairy_sweet",
    titleEn: "How is milk consumed by kids and family members?",
    titleHi: "परिवार में या बच्चों के लिए दूध कैसे पिया जाता है?",
    options: [
      {
        textEn: "Plain Milk or with homemade crushed Almonds, Cardamom & Saffron",
        textHi: "सादा दूध या घर पर बने बादाम, इलायची व केसर के ड्राई फ्रूट पाउडर के साथ",
        points: 20,
        tipEn: "Pure authentic nourishment without artificial flavors or sugar addiction.",
        tipHi: "शुद्ध पोषण! बिना कृत्रिम स्वाद या चीनी की लत के।"
      },
      {
        textEn: "With a small amount of Desi Jaggery (Gud) or Honey",
        textHi: "थोड़े से देसी गुड़ या प्राकृतिक शहद के साथ",
        points: 15,
        tipEn: "Good natural alternative to refined white sugar.",
        tipHi: "सफेद रिफाइंड चीनी की तुलना में बेहतर प्राकृतिक विकल्प।"
      },
      {
        textEn: "Daily 2-3 spoons of commercial powders (Bournvita, Horlicks, Boost)",
        textHi: "रोज 2-3 चम्मच बाजार के माल्टेड पाउडर (बोर्नविटा, हॉर्लिक्स आदि)",
        points: 5,
        tipEn: "Hidden sugar: Adds 10-15g of pure sugar per glass, defeating milk benefits.",
        tipHi: "छिपी हुई चीनी: हर गिलास में 10-15 ग्राम अतिरिक्त चीनी घोल देता है।"
      }
    ]
  }
];

export const KitchenAuditQuiz: React.FC<KitchenAuditQuizProps> = ({
  language,
  isDark
}) => {
  const isHindi = language === "hi";

  // Load saved audit if exists
  const [answers, setAnswers] = useState<Record<number, number>>(() => {
    try {
      const saved = localStorage.getItem("ahariq_kitchen_audit_answers");
      return saved ? JSON.parse(saved) : {};
    } catch (e) {
      return {};
    }
  });

  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isCompleted, setIsCompleted] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem("ahariq_kitchen_audit_completed");
      return saved === "true";
    } catch (e) {
      return false;
    }
  });

  const totalQuestions = QUESTIONS.length;
  const answeredCount = Object.keys(answers).length;

  const totalScore = Object.entries(answers).reduce((acc, [qIdx, optIdx]) => {
    const q = QUESTIONS[parseInt(qIdx, 10)];
    if (!q) return acc;
    const opt = q.options[Number(optIdx)];
    return acc + (opt ? opt.points : 0);
  }, 0);

  const handleSelectOption = (questionIdx: number, optionIdx: number) => {
    const updated = { ...answers, [questionIdx]: optionIdx };
    setAnswers(updated);
    localStorage.setItem("ahariq_kitchen_audit_answers", JSON.stringify(updated));

    if (questionIdx + 1 < totalQuestions) {
      setCurrentStep(questionIdx + 1);
    } else {
      setIsCompleted(true);
      localStorage.setItem("ahariq_kitchen_audit_completed", "true");
    }
  };

  const handleReset = () => {
    setAnswers({});
    setCurrentStep(0);
    setIsCompleted(false);
    localStorage.removeItem("ahariq_kitchen_audit_answers");
    localStorage.removeItem("ahariq_kitchen_audit_completed");
  };

  const handleShareWhatsApp = () => {
    const statusText =
      totalScore >= 80
        ? "🌟 शुद्ध एवं सुरक्षित रसोई (Clean & Safe Kitchen)"
        : totalScore >= 50
        ? "⚠️ मध्यम रसोई - सुधार योग्य (Moderate Pantry)"
        : "🚨 उच्च जोखिम रसोई (Ultra-Processed Pantry)";

    const message = `🍳 *AharIQ • मेरी रसोई का शुद्धता स्कोर* 🍳\n\n🎯 *स्कोर:* ${totalScore} / 100\n📊 *श्रेणी:* ${statusText}\n\n👉 *FSSAI व ICMR मानकों पर आधारित 2-मिनट टेस्ट।*\n\nआप भी अपनी रसोई का स्कोर चेक करें: https://ahariq.app`;

    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  const activeQuestion = QUESTIONS[currentStep];

  return (
    <div
      id="kitchen-audit-view"
      className={`rounded-3xl p-4.5 sm:p-5 border transition-all ${
        isDark ? "bg-[#161C24] border-slate-800 text-zinc-100" : "bg-white border-slate-200/90 text-slate-900 shadow-2xs"
      }`}
    >
      {/* Quiz Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center flex-shrink-0">
            <ShieldCheck className="w-4.5 h-4.5" />
          </div>
          <div>
            <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">
              {isHindi ? "2-मिनट रसोई शुद्धता टेस्ट" : "2-Minute Kitchen Clean Audit"}
            </h3>
            <p className="text-[11px] text-slate-400">
              {isHindi ? "5 आसान सवाल • बिना किसी बारकोड स्कैन के" : "5 quick questions • No scanning needed"}
            </p>
          </div>
        </div>

        {answeredCount > 0 && (
          <button
            onClick={handleReset}
            className="text-[11px] font-bold text-slate-400 hover:text-red-500 transition-colors flex items-center gap-1 cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            <span>{isHindi ? "रीसेट" : "Reset"}</span>
          </button>
        )}
      </div>

      {/* Progress Bar */}
      <div className="pt-3 pb-2">
        <div className="flex items-center justify-between text-[11px] font-bold text-slate-400 mb-1.5">
          <span>{isHindi ? `सवाल ${currentStep + 1} / ${totalQuestions}` : `Question ${currentStep + 1} of ${totalQuestions}`}</span>
          <span>{Math.round(((currentStep + (isCompleted ? 1 : 0)) / totalQuestions) * 100)}%</span>
        </div>
        <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
          <div
            className="h-full bg-[#059669] transition-all duration-300"
            style={{ width: `${((currentStep + (isCompleted ? 1 : 0)) / totalQuestions) * 100}%` }}
          />
        </div>
      </div>

      {/* COMPLETED RESULT VIEW */}
      {isCompleted ? (
        <div className="py-4 space-y-4 text-center">
          {/* Circular Score display */}
          <div className="relative inline-flex items-center justify-center">
            <div
              className={`w-24 h-24 rounded-full flex flex-col items-center justify-center font-black text-white shadow-lg ${
                totalScore >= 80
                  ? "bg-gradient-to-tr from-emerald-600 to-teal-500 shadow-emerald-500/20"
                  : totalScore >= 50
                  ? "bg-gradient-to-tr from-amber-500 to-yellow-400 shadow-amber-500/20"
                  : "bg-gradient-to-tr from-red-600 to-rose-500 shadow-rose-500/20"
              }`}
            >
              <span className="text-3xl leading-none">{totalScore}</span>
              <span className="text-[10px] font-bold opacity-85 mt-0.5">/ 100</span>
            </div>
          </div>

          <div>
            <h4 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
              {totalScore >= 80
                ? isHindi ? "🌟 आपकी रसोई बहुत साफ और शुद्ध है!" : "🌟 Clean & Safe Kitchen!"
                : totalScore >= 50
                ? isHindi ? "⚠️ मध्यम रसोई - 2 बदलावों की जरूरत है" : "⚠️ Moderate Pantry - Needs 2 Swaps"
                : isHindi ? "🚨 आपकी रसोई में प्रोसेस्ड फूड बहुत ज्यादा है" : "🚨 High Ultra-Processed Exposure"}
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto mt-1">
              {totalScore >= 80
                ? isHindi
                  ? "आप पारंपरिक, बिना पाम ऑयल और बिना केमिकल वाली चीजें चुन रहे हैं।"
                  : "You prioritize cold-pressed oils, whole grains, and clean staples."
                : isHindi
                ? "किराना स्वैप लिस्ट में दिए गए विकल्पों को अपनाकर आप अपने स्कोर को 85+ तक ले जा सकते हैं।"
                : "Check our Grocery Swap List to replace palm oil biscuits and refined additives."}
            </p>
          </div>

          {/* Actionable Swaps recommended for low scoring areas */}
          <div className="text-left space-y-2 pt-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
              {isHindi ? "सुझाए गए सुधार (Actionable Swaps):" : "Recommended Swaps:"}
            </span>

            {QUESTIONS.map((q, idx) => {
              const selectedOptIdx = answers[idx];
              if (selectedOptIdx === undefined) return null;
              const selectedOpt = q.options[selectedOptIdx];
              if (selectedOpt.points === 20) return null; // Already perfect

              return (
                <div
                  key={q.id}
                  className={`p-3 rounded-2xl border text-xs ${
                    isDark ? "bg-slate-800/50 border-slate-700/80" : "bg-amber-50/60 border-amber-200 text-amber-950"
                  }`}
                >
                  <div className="flex items-center gap-1.5 font-bold text-slate-900 dark:text-slate-100">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
                    <span>{isHindi ? q.titleHi : q.titleEn}</span>
                  </div>
                  <p className="mt-1 text-slate-600 dark:text-slate-300">
                    {isHindi ? selectedOpt.tipHi : selectedOpt.tipEn}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Share Button & Retake */}
          <div className="flex flex-col sm:flex-row gap-2 pt-2">
            <button
              onClick={handleShareWhatsApp}
              id="share-kitchen-audit-whatsapp-btn"
              className="flex-1 py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
            >
              <Share2 className="w-4 h-4" />
              <span>{isHindi ? "WhatsApp पर स्कोर शेयर करें" : "Share Score on WhatsApp"}</span>
            </button>

            <button
              onClick={handleReset}
              className="py-3 px-4 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              {isHindi ? "दोबारा टेस्ट दें" : "Retake Audit"}
            </button>
          </div>
        </div>
      ) : (
        /* ACTIVE QUESTION VIEW */
        <div className="pt-3 space-y-3">
          <h4 className="text-sm sm:text-base font-black text-slate-900 dark:text-white leading-snug">
            {isHindi ? activeQuestion.titleHi : activeQuestion.titleEn}
          </h4>

          <div className="space-y-2">
            {activeQuestion.options.map((opt, optIdx) => {
              const isSelected = answers[currentStep] === optIdx;

              return (
                <button
                  key={optIdx}
                  onClick={() => handleSelectOption(currentStep, optIdx)}
                  className={`w-full p-3.5 rounded-2xl border text-left transition-all flex items-start gap-3 cursor-pointer group ${
                    isSelected
                      ? "bg-emerald-500/15 border-[#059669] text-slate-900 dark:text-white ring-2 ring-[#059669]/20"
                      : isDark
                      ? "bg-[#1A222C] border-slate-800 hover:border-slate-700 text-slate-200"
                      : "bg-slate-50/80 border-slate-200/90 hover:border-emerald-300 hover:bg-white text-slate-800"
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full border flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors ${
                      isSelected
                        ? "border-[#059669] bg-[#059669] text-white"
                        : "border-slate-300 dark:border-slate-600 group-hover:border-[#059669]"
                    }`}
                  >
                    {isSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
                  </div>

                  <div className="min-w-0 flex-1">
                    <span className="text-xs sm:text-sm font-semibold block leading-snug">
                      {isHindi ? opt.textHi : opt.textEn}
                    </span>
                    <span className="text-[11px] text-slate-400 mt-1 block leading-normal">
                      {isHindi ? opt.tipHi : opt.tipEn}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => setCurrentStep((prev) => Math.max(0, prev - 1))}
              disabled={currentStep === 0}
              className="text-xs font-bold text-slate-400 disabled:opacity-30 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
            >
              {isHindi ? "← पिछला सवाल" : "← Previous"}
            </button>

            <span className="text-xs text-slate-400">
              {isHindi ? "एक विकल्प चुनें" : "Tap an option to proceed"}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
