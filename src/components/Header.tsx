import React, { useState, useRef, useEffect } from "react";
import { Language, UserProfile } from "../types";
import {
  Languages,
  Moon,
  Sun,
  ShieldCheck,
  User,
  Menu,
  X,
  Info,
  Lock,
  Headphones,
  FlaskConical,
  Heart,
  ExternalLink
} from "lucide-react";

interface HeaderProps {
  language: Language;
  onToggleLanguage: () => void;
  isDark: boolean;
  onToggleDark: () => void;
  user: UserProfile;
  onOpenAuth: () => void;
  onOpenScanner: () => void;
  savedCount: number;
  onNavigateTab: (tab: "home" | "scanner" | "saved" | "history" | "adulteration") => void;
  onOpenAbout: () => void;
  onOpenPrivacy: () => void;
  onOpenAdmin?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  language,
  onToggleLanguage,
  isDark,
  onToggleDark,
  user,
  onOpenAuth,
  savedCount,
  onNavigateTab,
  onOpenAbout,
  onOpenPrivacy,
  onOpenAdmin,
}) => {
  const isHindi = language === "hi";
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const isOwner = user.email === "sadiquehavari@gmail.com";

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  const handleScrollToSupport = () => {
    setIsMenuOpen(false);
    const element = document.getElementById("contact-support-section");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      id="app-header"
      className={`sticky top-0 z-30 transition-colors duration-200 border-b ${
        isDark
          ? "bg-[#09090B]/95 border-zinc-800 text-zinc-100 backdrop-blur-md"
          : "bg-white/95 border-gray-200/90 text-[#111827] backdrop-blur-md"
      }`}
    >
      <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Brand Logo */}
        <button
          id="brand-home-btn"
          onClick={() => onNavigateTab("home")}
          className="flex items-center gap-2.5 text-left group cursor-pointer"
        >
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#059669] to-[#10B981] flex items-center justify-center text-white shadow-md shadow-[#10B981]/25 group-hover:scale-105 transition-transform">
            <ShieldCheck className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-black text-xl tracking-tight text-[#000000] dark:text-white">
                Ahariq
              </span>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#10B981]/15 text-[#059669] dark:text-[#34D399] border border-[#10B981]/30 font-hindi">
                आहार IQ
              </span>
            </div>
            <p className="text-[11px] text-gray-500 dark:text-zinc-400 font-medium">
              {isHindi ? "शुद्ध भारतीय फूड स्कैनर" : "Indian Food Health & Barcode Scanner"}
            </p>
          </div>
        </button>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Language Switcher */}
          <button
            id="language-toggle-btn"
            onClick={onToggleLanguage}
            className={`flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
              isDark
                ? "bg-zinc-800 border-zinc-700 hover:bg-zinc-700 text-zinc-200"
                : "bg-emerald-50 border-emerald-200 hover:bg-emerald-100 text-[#059669]"
            }`}
            title="Switch Language / भाषा बदलें"
          >
            <Languages className="w-3.5 h-3.5 text-[#10B981]" />
            <span>{isHindi ? "EN" : "हिन्दी"}</span>
          </button>

          {/* Dark Mode Toggle */}
          <button
            id="theme-toggle-btn"
            onClick={onToggleDark}
            className={`p-2 rounded-xl border transition-colors cursor-pointer ${
              isDark
                ? "bg-zinc-800 border-zinc-700 text-amber-400 hover:bg-zinc-700"
                : "bg-gray-100 border-gray-200 text-gray-700 hover:bg-gray-200"
            }`}
            title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* User Profile / OTP Login */}
          <button
            id="user-profile-btn"
            onClick={onOpenAuth}
            className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
              user.isLoggedIn
                ? isDark
                  ? "bg-emerald-950/60 border-emerald-700/50 text-[#10B981]"
                  : "bg-emerald-50 border-emerald-300 text-[#059669]"
                : isDark
                ? "bg-zinc-800 border-zinc-700 text-zinc-300 hover:bg-zinc-700"
                : "bg-gray-100 border-gray-200 text-[#111827] hover:bg-gray-200"
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span className="max-w-[80px] truncate font-bold">
              {user.isLoggedIn ? (user.name ? user.name.split(" ")[0] : "Account") : isHindi ? "साइन अप / लॉगिन" : "Login"}
            </span>
          </button>

          {/* Menu Dropdown Toggle */}
          <div className="relative" ref={menuRef}>
            <button
              id="header-menu-btn"
              onClick={() => setIsMenuOpen((prev) => !prev)}
              className={`p-2 rounded-xl border transition-colors cursor-pointer flex items-center justify-center ${
                isMenuOpen
                  ? "bg-[#10B981] text-white border-[#10B981]"
                  : isDark
                  ? "bg-zinc-800 border-zinc-700 text-zinc-200 hover:bg-zinc-700"
                  : "bg-gray-100 border-gray-200 text-gray-800 hover:bg-gray-200"
              }`}
              title="Menu Options"
            >
              {isMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>

            {/* Menu Dropdown Card */}
            {isMenuOpen && (
              <div
                id="header-menu-dropdown"
                className={`absolute right-0 mt-2 w-56 rounded-2xl border shadow-xl p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150 ${
                  isDark
                    ? "bg-[#18181B] border-zinc-800 text-zinc-100"
                    : "bg-white border-gray-200 text-[#111827]"
                }`}
              >
                {/* Account / Login Option in Menu */}
                <button
                  id="menu-account-auth-btn"
                  onClick={() => {
                    setIsMenuOpen(false);
                    onOpenAuth();
                  }}
                  className="w-full px-3 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2.5 bg-emerald-500/10 hover:bg-emerald-500/20 text-[#059669] dark:text-[#10B981] transition-colors text-left cursor-pointer mb-1"
                >
                  <User className="w-4 h-4 text-[#10B981] flex-shrink-0" />
                  <div>
                    <span className="block font-bold text-[#000000] dark:text-white">
                      {user.isLoggedIn ? user.name || "My Account" : isHindi ? "साइन अप / लॉगिन करें" : "Sign In / Register"}
                    </span>
                    <span className="text-[10px] text-gray-500 dark:text-zinc-400 block">
                      {user.isLoggedIn ? "Firebase Cloud Synced" : isHindi ? "Google / OTP से लॉगिन" : "Sync history to cloud"}
                    </span>
                  </div>
                </button>

                {/* Secret Founder & Admin Panel (Only visible to sadiquehavari@gmail.com) */}
                {isOwner && onOpenAdmin && (
                  <button
                    id="menu-owner-admin-btn"
                    onClick={() => {
                      setIsMenuOpen(false);
                      onOpenAdmin();
                    }}
                    className="w-full px-3 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2.5 bg-amber-500/15 hover:bg-amber-500/25 text-amber-700 dark:text-amber-300 border border-amber-500/30 transition-colors text-left cursor-pointer mb-1 animate-pulse"
                  >
                    <ShieldCheck className="w-4 h-4 text-amber-500 flex-shrink-0" />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="block font-black text-amber-900 dark:text-amber-100">
                          {isHindi ? "👑 एडमिन व लाइव ट्रैफिक" : "👑 Founder Admin & Traffic"}
                        </span>
                      </div>
                      <span className="text-[10px] text-amber-700/80 dark:text-amber-300/80 block">
                        {isHindi ? "लाइव यूज़र्स और स्कैन डेटा देखें" : "View Live Users & Scans in Cloud"}
                      </span>
                    </div>
                  </button>
                )}

                <div className="h-px bg-gray-100 dark:bg-zinc-800 my-1" />

                {/* About Us Option */}
                <button
                  id="menu-about-us-btn"
                  onClick={() => {
                    setIsMenuOpen(false);
                    onOpenAbout();
                  }}
                  className="w-full px-3 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2.5 hover:bg-[#10B981]/10 hover:text-[#059669] dark:hover:text-[#10B981] transition-colors text-left cursor-pointer"
                >
                  <Info className="w-4 h-4 text-[#10B981] flex-shrink-0" />
                  <div>
                    <span className="block font-bold text-[#000000] dark:text-white">
                      {isHindi ? "हमारे बारे में" : "About Us"}
                    </span>
                    <span className="text-[10px] text-gray-500 dark:text-zinc-400 block">
                      {isHindi ? "मिशन और उद्देश्य" : "Mission & Vision"}
                    </span>
                  </div>
                </button>

                {/* Privacy Policy Option */}
                <button
                  id="menu-privacy-policy-btn"
                  onClick={() => {
                    setIsMenuOpen(false);
                    onOpenPrivacy();
                  }}
                  className="w-full px-3 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2.5 hover:bg-[#10B981]/10 hover:text-[#059669] dark:hover:text-[#10B981] transition-colors text-left cursor-pointer"
                >
                  <Lock className="w-4 h-4 text-[#10B981] flex-shrink-0" />
                  <div>
                    <span className="block font-bold text-[#000000] dark:text-white">
                      {isHindi ? "गोपनीयता नीति" : "Privacy Policy"}
                    </span>
                    <span className="text-[10px] text-gray-500 dark:text-zinc-400 block">
                      {isHindi ? "100% डेटा सुरक्षा" : "Zero-Tracker Guarantee"}
                    </span>
                  </div>
                </button>

                <div className="h-px bg-gray-100 dark:bg-zinc-800 my-1" />

                {/* Contact Support Option */}
                <button
                  id="menu-contact-support-btn"
                  onClick={handleScrollToSupport}
                  className="w-full px-3 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2.5 hover:bg-[#10B981]/10 hover:text-[#059669] dark:hover:text-[#10B981] transition-colors text-left cursor-pointer"
                >
                  <Headphones className="w-4 h-4 text-[#10B981] flex-shrink-0" />
                  <div>
                    <span className="block font-bold text-[#000000] dark:text-white">
                      {isHindi ? "संपर्क सहायता" : "Contact Support"}
                    </span>
                    <span className="text-[10px] text-gray-500 dark:text-zinc-400 block">
                      Ahariq Team Helpline
                    </span>
                  </div>
                </button>

                {/* DART Adulteration Guide Option */}
                <button
                  id="menu-adulteration-guide-btn"
                  onClick={() => {
                    setIsMenuOpen(false);
                    onNavigateTab("adulteration");
                  }}
                  className="w-full px-3 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2.5 hover:bg-[#10B981]/10 hover:text-[#059669] dark:hover:text-[#10B981] transition-colors text-left cursor-pointer"
                >
                  <FlaskConical className="w-4 h-4 text-[#10B981] flex-shrink-0" />
                  <div>
                    <span className="block font-bold text-[#000000] dark:text-white">
                      {isHindi ? "मिलावट जांच गाइड" : "Adulteration Guide"}
                    </span>
                    <span className="text-[10px] text-gray-500 dark:text-zinc-400 block">
                      FSSAI DART Home Tests
                    </span>
                  </div>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
