import React, { useState, useEffect } from "react";
import {
  Download,
  X,
  Share2,
  PlusSquare,
  Sparkles,
  Smartphone,
  CheckCircle2,
  ExternalLink,
  Info,
  MoreVertical
} from "lucide-react";
import { Language } from "../types";

interface InstallPwaPromptProps {
  language: Language;
  isDark: boolean;
  isOpen: boolean;
  onClose: () => void;
}

export const InstallPwaPrompt: React.FC<InstallPwaPromptProps> = ({
  language,
  isDark,
  isOpen,
  onClose,
}) => {
  const isHindi = language === "hi";
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isInIframe, setIsInIframe] = useState(false);
  const [showManualSteps, setShowManualSteps] = useState(false);

  useEffect(() => {
    // Check if running inside iframe
    try {
      setIsInIframe(window.self !== window.top);
    } catch (e) {
      setIsInIframe(true);
    }

    // Check if running in standalone mode (already installed)
    const isRunningStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as any).standalone === true;
    setIsStandalone(isRunningStandalone);

    // Detect iOS
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
    setIsIOS(isIosDevice);

    // Capture beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    // Listen for app installed event
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
    };

    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      try {
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === "accepted") {
          setIsInstalled(true);
          onClose();
        }
        setDeferredPrompt(null);
      } catch (err) {
        console.warn("PWA install error:", err);
        setShowManualSteps(true);
      }
    } else {
      // If native deferred prompt is not available, show manual steps
      setShowManualSteps(true);
    }
  };

  const handleOpenInNewTab = () => {
    window.open(window.location.href, "_blank");
  };

  if (!isOpen) return null;

  return (
    <div
      id="pwa-install-modal-overlay"
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        id="pwa-install-modal"
        className={`w-full max-w-md rounded-3xl p-5 sm:p-6 border shadow-2xl transition-all animate-scale-up max-h-[90vh] overflow-y-auto ${
          isDark
            ? "bg-[#18181B] border-zinc-800 text-zinc-100"
            : "bg-white border-gray-200 text-[#111827]"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-3 pb-3 border-b border-gray-100 dark:border-zinc-800">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#059669] to-[#10B981] flex items-center justify-center text-white shadow-lg shadow-[#10B981]/25 flex-shrink-0">
              <Smartphone className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-black tracking-tight text-[#000000] dark:text-white">
                  {isHindi ? "AharIQ ऐप इनस्टॉल करें" : "Install AharIQ App"}
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#10B981]/15 text-[#059669] dark:text-[#34D399] border border-[#10B981]/30">
                  PWA App
                </span>
              </div>
              <p className="text-xs text-gray-500 dark:text-zinc-400 font-medium">
                {isHindi ? "फोन होम स्क्रीन पर 1-क्लिक में जोड़ें" : "Direct 1-tap mobile installation"}
              </p>
            </div>
          </div>
          <button
            id="close-pwa-install-modal-btn"
            onClick={onClose}
            className="p-1.5 rounded-xl border border-gray-200 dark:border-zinc-800 hover:bg-gray-100 dark:hover:bg-zinc-800 text-gray-400 hover:text-gray-700 dark:hover:text-zinc-200 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Benefits List */}
        <div className="py-3 space-y-2">
          <div className="flex items-start gap-2.5 text-xs text-gray-700 dark:text-zinc-300">
            <CheckCircle2 className="w-4 h-4 text-[#10B981] flex-shrink-0 mt-0.5" />
            <span>
              {isHindi
                ? "📱 बिना ब्राउज़र URL बार के असली ऐप जैसा फुल-स्क्रीन अनुभव"
                : "⚡ Full screen native-like experience without browser URL bars"}
            </span>
          </div>
          <div className="flex items-start gap-2.5 text-xs text-gray-700 dark:text-zinc-300">
            <CheckCircle2 className="w-4 h-4 text-[#10B981] flex-shrink-0 mt-0.5" />
            <span>
              {isHindi
                ? "📦 होम स्क्रीन पर AharIQ का असली लोगो और आइकन"
                : "🔍 Instant launcher icon on your mobile home screen"}
            </span>
          </div>
          <div className="flex items-start gap-2.5 text-xs text-gray-700 dark:text-zinc-300">
            <CheckCircle2 className="w-4 h-4 text-[#10B981] flex-shrink-0 mt-0.5" />
            <span>
              {isHindi
                ? "💾 फोन स्टोरेज पर शून्य लोड (1 MB से भी कम साइज)"
                : "📱 Zero phone storage clutter (less than 1MB install size)"}
            </span>
          </div>
        </div>

        {/* If inside preview iframe notice */}
        {isInIframe && (
          <div className="p-3 mb-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-900 dark:text-amber-300 space-y-1.5">
            <div className="flex items-center gap-1.5 font-bold">
              <Info className="w-4 h-4 text-amber-600" />
              <span>{isHindi ? "ब्राउज़र में खोलें (Install करने के लिए)" : "Open in Browser to Install"}</span>
            </div>
            <p className="text-[11px] text-gray-600 dark:text-zinc-400">
              {isHindi
                ? "प्रीव्यू फ्रेम से बाहर सीधे क्रोम/सफारी में खोलने पर 1-क्लिक 'Install' बटन एक्टिव हो जाता है।"
                : "Open directly in Chrome/Safari to enable 1-click home screen installation."}
            </p>
            <button
              onClick={handleOpenInNewTab}
              className="w-full py-2 px-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer mt-1"
            >
              <span>{isHindi ? "पूरे ब्राउज़र में खोलें (Open in Tab)" : "Open in Full Browser Tab"}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Instructions / Action Area */}
        {isStandalone || isInstalled ? (
          <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 text-center space-y-1">
            <p className="text-xs font-bold text-[#059669] dark:text-[#34D399]">
              {isHindi
                ? "✅ AharIQ ऐप पहले से ही आपकी होम स्क्रीन पर इनस्टॉल है!"
                : "✅ AharIQ is already installed on your device home screen!"}
            </p>
            <p className="text-[11px] text-gray-500 dark:text-zinc-400">
              {isHindi
                ? "होम स्क्रीन पर AharIQ आइकन पर टैप करें, यह बिना URL बार के फुल स्क्रीन में खुलेगा।"
                : "Open from your home screen icon to enjoy full-screen standalone mode."}
            </p>
          </div>
        ) : isIOS ? (
          /* iOS Safari Guide */
          <div className="p-3.5 rounded-2xl bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 space-y-2">
            <p className="text-xs font-bold text-gray-800 dark:text-zinc-200 flex items-center gap-1.5">
              <Smartphone className="w-4 h-4 text-[#10B981]" />
              <span>{isHindi ? "iPhone / iPad (Safari) पर कैसे इनस्टॉल करें:" : "How to install on iPhone / iPad (Safari):"}</span>
            </p>
            <ol className="text-xs space-y-1.5 text-gray-600 dark:text-zinc-400 list-decimal list-inside">
              <li>
                {isHindi ? "नीचे सफारी के " : "Tap the Safari "}
                <span className="font-bold text-[#10B981] inline-flex items-center gap-1">
                  <Share2 className="w-3.5 h-3.5 inline" /> Share
                </span>
                {isHindi ? " बटन पर टैप करें।" : " button below."}
              </li>
              <li>
                {isHindi ? "लिस्ट में नीचे जाकर " : "Scroll down and tap "}
                <span className="font-bold text-[#10B981] inline-flex items-center gap-1">
                  <PlusSquare className="w-3.5 h-3.5 inline" /> {isHindi ? "होम स्क्रीन पर जोड़ें" : "Add to Home Screen"}
                </span>
                {isHindi ? " चुनें।" : "."}
              </li>
              <li>
                {isHindi ? "ऊपर दाएँ कोने में 'Add' पर टैप करें।" : "Tap 'Add' in the top right corner."}
              </li>
            </ol>
          </div>
        ) : (
          /* Android / Chrome / Edge 1-Click Install */
          <div className="space-y-3">
            <button
              id="confirm-install-pwa-btn"
              onClick={handleInstallClick}
              className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-[#059669] to-[#10B981] hover:from-[#047857] hover:to-[#059669] text-white font-black text-sm shadow-lg shadow-[#10B981]/25 flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-98"
            >
              <Download className="w-4 h-4 text-white" />
              <span>{isHindi ? "अभी ऐप इनस्टॉल करें (Install App)" : "Install App Now"}</span>
            </button>

            {/* Manual steps fallback for Android Chrome */}
            <div className="p-3.5 rounded-2xl bg-emerald-50/80 dark:bg-zinc-900 border border-emerald-200 dark:border-zinc-800 space-y-2 text-left">
              <p className="text-xs font-bold text-gray-800 dark:text-zinc-200 flex items-center gap-1.5">
                <MoreVertical className="w-4 h-4 text-[#10B981]" />
                <span>{isHindi ? "फोन होम स्क्रीन पर ऐप कैसे आएगी (2 सेकंड का तरीका):" : "How AharIQ adds to your phone screen (2 Steps):"}</span>
              </p>
              <div className="text-xs space-y-2 text-gray-600 dark:text-zinc-400">
                <div className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[11px] font-black flex-shrink-0">1</span>
                  <span>{isHindi ? "ऊपर 'पूरे ब्राउज़र में खोलें' या क्रोम में ऊपर दाएँ कोने के 3 डॉट्स (⋮) पर टैप करें।" : "Tap 'Open in Full Browser Tab' or tap 3 dots (⋮) in Chrome."}</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[11px] font-black flex-shrink-0">2</span>
                  <span>
                    {isHindi ? "वहाँ " : "Click "}
                    <strong className="text-emerald-700 dark:text-emerald-400 font-bold">
                      {isHindi ? "'Install app' या 'Add to Home screen' (होम स्क्रीन में जोड़ें)" : "'Install app' or 'Add to Home screen'"}
                    </strong>
                    {isHindi ? " पर क्लिक करें।" : "."}
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[11px] font-black flex-shrink-0">3</span>
                  <span>{isHindi ? "🎉 बस! AharIQ ऐप आपके फोन की स्क्रीन पर असली ऐप आइकन के साथ आ जाएगी और बिना ब्राउज़र बार के फुल स्क्रीन में चलेगी।" : "🎉 That's it! AharIQ appears on your phone screen with its green icon and runs standalone."}</span>
                </div>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 text-left space-y-1">
              <span className="text-[11px] font-black text-stone-900 dark:text-stone-100 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                {isHindi ? "APK फाइल डाउनलोड क्यों नहीं करनी पड़ती?" : "Why no heavy APK download needed?"}
              </span>
              <p className="text-[11px] text-stone-600 dark:text-stone-300 leading-relaxed">
                {isHindi
                  ? "AharIQ एक आधुनिक PWA (Progressive Web App) है। इसे भारी 50MB APK फाइल डाउनलोड करने या 'Unknown Sources' परमिशन देने की ज़रूरत नहीं होती। यह सीधे आपके फोन में ओरिजिनल ऐप की तरह 1 MB से कम साइज में सुरक्षित इनस्टॉल हो जाती है।"
                  : "AharIQ is a verified PWA. It installs in 1 second without downloading large APK files, saving memory and keeping your phone 100% secure."}
              </p>
            </div>

            <p className="text-[11px] text-center text-gray-500 dark:text-zinc-400 font-medium">
              {isHindi
                ? "💡 PWA ऐप इनस्टॉल होने के बाद असली ऐप की तरह बिना URL बार के खुलती है।"
                : "💡 Once installed, AharIQ opens standalone without browser bars."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
