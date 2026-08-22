import React from "react";
import { Language } from "../types";
import { Home, ScanLine, Bookmark, History, FlaskConical } from "lucide-react";

interface BottomNavProps {
  currentTab: "home" | "scanner" | "saved" | "history" | "adulteration";
  onSelectTab: (tab: "home" | "scanner" | "saved" | "history" | "adulteration") => void;
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
      id: "adulteration" as const,
      labelEn: "Adulteration",
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
      <div className="max-w-md mx-auto px-3 py-2 flex items-center justify-around">
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
                className="flex flex-col items-center -mt-6 group focus:outline-none cursor-pointer"
              >
                <div className="w-13 h-13 rounded-full bg-gradient-to-tr from-[#059669] via-[#10B981] to-[#34D399] text-white flex items-center justify-center shadow-lg shadow-[#10B981]/35 border-4 border-white dark:border-[#09090B] group-hover:scale-105 active:scale-95 transition-transform">
                  <ScanLine className="w-6 h-6 animate-pulse" />
                </div>
                <span className="text-[11px] font-bold mt-1 text-[#10B981]">
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
              className={`flex flex-col items-center py-1.5 px-3 rounded-2xl transition-all relative cursor-pointer ${
                isActive
                  ? isDark
                    ? "text-[#10B981] font-bold"
                    : "text-[#059669] font-bold"
                  : "text-gray-500 dark:text-zinc-400 hover:text-gray-900 dark:hover:text-zinc-200"
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 ${isActive ? "scale-110 text-[#10B981]" : ""}`} />
                {item.badge !== undefined && (
                  <span className="absolute -top-1.5 -right-2 bg-[#10B981] text-white text-[9px] font-extrabold px-1.5 py-0.2 rounded-full min-w-[16px] text-center shadow-xs">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="text-[10px] mt-1 leading-tight tracking-tight">
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
