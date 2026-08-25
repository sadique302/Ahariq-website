import React from "react";
import { Language } from "../types";
import { Home, ScanLine, Bookmark, History, Dumbbell, FlaskConical } from "lucide-react";

interface BottomNavProps {
  currentTab: "home" | "scanner" | "saved" | "history" | "gym" | "adulteration";
  onSelectTab: (tab: "home" | "scanner" | "saved" | "history" | "gym" | "adulteration") => void;
  language: Language;
  isDark: boolean;
  savedCount: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentTab,
  onSelectTab,
  language,
  isDark,
  savedCount,
}) => {
  const isHindi = language === "hi";

  const navItems = [
    {
      id: "home" as const,
      labelEn: "Home",
      labelHi: "होम",
      icon: Home,
    },
    {
      id: "saved" as const,
      labelEn: "Mere List",
      labelHi: "मेरी लिस्ट",
      icon: Bookmark,
      badge: savedCount > 0 ? savedCount : undefined,
    },
    {
      id: "scanner" as const,
      labelEn: "Scan",
      labelHi: "स्कैन",
      icon: ScanLine,
      isCenter: true,
    },
    {
      id: "history" as const,
      labelEn: "History",
      labelHi: "इतिहास",
      icon: History,
    },
    {
      id: "gym" as const,
      labelEn: "Gym IQ",
      labelHi: "Gym IQ",
      icon: Dumbbell,
    },
    {
      id: "adulteration" as const,
      labelEn: "Lab",
      labelHi: "जांच लैब",
      icon: FlaskConical,
    },
  ];

  return (
    <nav
      id="bottom-navigation-bar"
      className={`fixed bottom-0 left-0 right-0 z-40 border-t transition-colors ${
        isDark
          ? "bg-[#09090B]/95 border-zinc-800 text-zinc-300 backdrop-blur-lg"
          : "bg-white/95 border-gray-200 text-gray-700 backdrop-blur-lg shadow-sm"
      }`}
    >
      <div className="max-w-lg mx-auto px-2 py-1.5 flex items-center justify-between">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;
          const label = isHindi ? item.labelHi : item.labelEn;

          if (item.isCenter) {
            return (
              <button
                key={item.id}
                id="bottom-nav-center-scan-btn"
                onClick={() => onSelectTab(item.id)}
                className="flex flex-col items-center -mt-6 group focus:outline-none cursor-pointer flex-1 max-w-[70px]"
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#059669] via-[#10B981] to-[#34D399] text-white flex items-center justify-center shadow-lg shadow-[#10B981]/35 border-4 border-white dark:border-[#09090B] group-hover:scale-105 active:scale-95 transition-transform">
                  <ScanLine className="w-5 h-5 animate-pulse" />
                </div>
                <span className="text-[10px] font-bold mt-0.5 text-[#10B981]">
                  {label}
                </span>
              </button>
            );
          }

          return (
            <button
              key={item.id}
              id={`bottom-nav-${item.id}-btn`}
              onClick={() => onSelectTab(item.id)}
              className={`flex flex-col items-center py-1 px-1.5 rounded-xl transition-all relative cursor-pointer flex-1 max-w-[65px] ${
                isActive
                  ? isDark
                    ? "text-[#10B981] font-bold"
                    : "text-[#059669] font-bold"
                  : "text-gray-500 dark:text-zinc-400 hover:text-gray-900 dark:hover:text-zinc-200"
              }`}
            >
              <div className="relative">
                <Icon className={`w-4.5 h-4.5 ${isActive ? "scale-110 text-[#10B981]" : ""}`} />
                {item.badge !== undefined && (
                  <span className="absolute -top-1.5 -right-2 bg-[#10B981] text-white text-[8px] font-extrabold px-1 py-0.2 rounded-full min-w-[14px] text-center shadow-xs">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="text-[9.5px] mt-0.5 leading-tight tracking-tight whitespace-nowrap truncate max-w-full">
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
