import React, { useState, useEffect } from "react";
import { Download, Smartphone, X, Sparkles } from "lucide-react";
import { Language } from "../types";
import { triggerHaptic } from "../utils/haptics";

interface NativeAppInstallBannerProps {
  language: Language;
  isDark: boolean;
  onOpenInstallModal: () => void;
}

export const NativeAppInstallBanner: React.FC<NativeAppInstallBannerProps> = ({
  language,
  isDark,
  onOpenInstallModal,
}) => {
  const isHindi = language === "hi";
  const [isDismissed, setIsDismissed] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    // Check if running in standalone mode (already installed as PWA)
    const runningStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as any).standalone === true;
    setIsStandalone(runningStandalone);

    // Check if dismissed in this session
    const dismissed = sessionStorage.getItem("ahariq_pwa_banner_dismissed");
    if (dismissed === "true") {
      setIsDismissed(true);
    }
  }, []);

  const handleDismiss = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDismissed(true);
    sessionStorage.setItem("ahariq_pwa_banner_dismissed", "true");
  };

  const handleInstallClick = () => {
    triggerHaptic("medium");
    onOpenInstallModal();
  };

  // If already installed or dismissed, do not render
  if (isStandalone || isDismissed) {
    return null;
  }

  return (
    <div
      id="native-app-install-floating-banner"
      onClick={handleInstallClick}
      className={`w-full mx-auto px-3 py-2 border-b transition-all flex items-center justify-between gap-2.5 cursor-pointer app-pressable ${
        isDark
          ? "bg-gradient-to-r from-emerald-950/80 via-zinc-900 to-emerald-950/80 border-emerald-800/40 text-zinc-200"
          : "bg-gradient-to-r from-emerald-50 via-white to-emerald-50 border-emerald-200 text-stone-900 shadow-2xs"
      }`}
    >
      <div className="flex items-center gap-2 min-w-0 flex-1">
        <div className="w-7 h-7 rounded-xl bg-gradient-to-tr from-[#059669] to-[#10B981] flex items-center justify-center text-white shadow-xs flex-shrink-0">
          <Smartphone className="w-4 h-4" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <span className="text-[11.5px] font-black tracking-tight text-emerald-800 dark:text-emerald-300 truncate">
              {isHindi ? "AharIQ असली ऐप इनस्टॉल करें" : "Install AharIQ Mobile App"}
            </span>
            <span className="text-[8.5px] font-bold px-1.5 py-0.2 rounded-full bg-emerald-500 text-white flex items-center gap-0.5 flex-shrink-0">
              <Sparkles className="w-2.5 h-2.5" /> FREE
            </span>
          </div>
          <p className="text-[10px] text-gray-500 dark:text-zinc-400 font-medium truncate">
            {isHindi
              ? "बिना ब्राउज़र URL बार के फुल स्क्रीन में खोलें"
              : "Full screen native mode without browser bars"}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-1 flex-shrink-0">
        <button
          type="button"
          onClick={handleInstallClick}
          className="px-2.5 py-1 rounded-lg bg-[#10B981] hover:bg-[#059669] text-white text-[10.5px] font-bold shadow-xs flex items-center gap-1 cursor-pointer active:scale-95 transition-transform"
        >
          <Download className="w-3 h-3" />
          <span>{isHindi ? "जोड़ें" : "Install"}</span>
        </button>
        <button
          type="button"
          onClick={handleDismiss}
          className="p-1 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-zinc-200 hover:bg-gray-200/50 dark:hover:bg-zinc-800 cursor-pointer"
          title="Dismiss"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
