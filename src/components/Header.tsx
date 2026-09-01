import React, { useState, useRef, useEffect } from "react";
import { Language, UserProfile } from "../types";
import { SUPPORTED_LANGUAGES, SupportedLanguage } from "../i18n/translations";
import {
  Languages,
  Globe,
  ChevronDown,
  CheckCircle,
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
  Dumbbell,
  Heart,
  ExternalLink,
  Smartphone,
  Download,
  AlertTriangle
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
  onNavigateTab: (tab: "home" | "scanner" | "saved" | "history" | "gym" | "adulteration") => void;
  onOpenAbout: () => void;
  onOpenPrivacy: () => void;
  onOpenDisclaimer?: () => void;
  onOpenAdmin?: () => void;
  onOpenInstallPwa?: () => void;
  onSelectLanguage?: (lang: SupportedLanguage) => void;
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
  onOpenDisclaimer,
  onOpenAdmin,
  onOpenInstallPwa,
  onSelectLanguage,
}) => {
  const isHindi = language === "hi";
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const langMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (langMenuRef.current && !langMenuRef.current.contains(event.target as Node)) {
        setIsLangMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const activeLang = SUPPORTED_LANGUAGES.find(l => l.code === (language as string)) || SUPPORTED_LANGUAGES[0];
  const isOwner =
    user?.isLoggedIn &&
    (user?.role === "admin" ||
      user?.email?.toLowerCase().trim() === "sadiquehavari@gmail.com" ||
      user?.email?.toLowerCase().includes("sadiquehavari") ||
      user?.email?.toLowerCase().startsWith("admin@"));

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
      className={`sticky top-0 z-40 transition-colors duration-200 border-b w-full max-w-full ${
        isDark
          ? "bg-[#09090B]/95 border-zinc-800 text-zinc-100 backdrop-blur-md"
          : "bg-white/95 border-gray-200/90 text-[#111827] backdrop-blur-md"
      }`}
    >
      <div className="max-w-4xl mx-auto px-2.5 sm:px-4 py-2.5 sm:py-3 flex items-center justify-between gap-1 sm:gap-2">
        {/* Brand Logo */}
        <button
          id="brand-home-btn"
          onClick={() => onNavigateTab("home")}
          className="flex items-center gap-1.5 sm:gap-2.5 text-left group cursor-pointer min-w-0 flex-shrink"
        >
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-2xl bg-gradient-to-br from-[#059669] to-[#10B981] flex items-center justify-center text-white shadow-md shadow-[#10B981]/25 group-hover:scale-105 transition-transform flex-shrink-0">
            <ShieldCheck className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1 sm:gap-1.5">
              <span className="font-black text-base sm:text-xl tracking-tight text-[#000000] dark:text-white">
                Ahariq
              </span>
              <span className="text-[9px] sm:text-[11px] font-bold px-1.5 sm:px-2 py-0.5 rounded-full bg-[#10B981]/15 text-[#059669] dark:text-[#34D399] border border-[#10B981]/30 font-hindi">
                आहार IQ
              </span>
            </div>
            <p className="hidden sm:block text-[11px] text-gray-500 dark:text-zinc-400 font-medium truncate">
              {isHindi ? "शुद्ध भारतीय फूड स्कैनर" : "Indian Food Health & Barcode Scanner"}
            </p>
          </div>
        </button>

        {/* Action Controls */}
        <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
          {/* Global Multi-Language Selector Dropdown with Globe Icon */}
          <div className="relative" ref={langMenuRef}>
            <button
              id="language-toggle-btn"
              onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
              className={`flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-xl text-[11px] sm:text-xs font-bold border transition-all cursor-pointer shadow-2xs ${
                isDark
                  ? "bg-zinc-800/90 border-zinc-700 hover:bg-zinc-700 text-zinc-100 hover:border-emerald-500/50"
                  : "bg-white border-gray-200 hover:bg-emerald-50/60 text-[#111827] hover:border-emerald-300"
              }`}
              title="Select Language / भाषा चुनें"
            >
              <Globe className="w-3.5 h-3.5 text-[#10B981] flex-shrink-0" />
              <span>{activeLang?.nativeName || (isHindi ? "हिन्दी" : "English")}</span>
              <ChevronDown className="w-3 h-3 text-gray-400" />
            </button>

            {/* Language Dropdown Menu */}
            {isLangMenuOpen && (
              <div
                className={`absolute right-0 mt-2 w-64 rounded-2xl shadow-2xl border p-2 z-50 animate-in fade-in zoom-in-95 duration-150 ${
                  isDark ? "bg-[#18181B] border-zinc-700 text-white" : "bg-white border-gray-200 text-gray-900 shadow-xl"
                }`}
              >
                <div className="px-3 py-2 border-b border-gray-100 dark:border-zinc-800 text-[10px] font-bold text-gray-400 dark:text-zinc-400 uppercase tracking-wider flex items-center justify-between">
                  <span>Choose Language / भाषा</span>
                  <span className="text-[9px] bg-emerald-500/10 text-[#059669] dark:text-[#34D399] px-1.5 py-0.5 rounded font-mono font-bold">100% Free</span>
                </div>
                <div className="max-h-72 overflow-y-auto py-1 space-y-0.5">
                  {SUPPORTED_LANGUAGES.map((lang) => {
                    const isSelected = language === lang.code || (language === "hi" && lang.code === "hi") || (language === "en" && lang.code === "en");
                    return (
                      <button
                        key={lang.code}
                        onClick={() => {
                          if (onSelectLanguage) {
                            onSelectLanguage(lang.code);
                          } else {
                            if ((lang.code === "hi" && language !== "hi") || (lang.code === "en" && language !== "en")) {
                              onToggleLanguage();
                            }
                          }
                          setIsLangMenuOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium flex items-center justify-between transition-colors cursor-pointer ${
                          isSelected
                            ? "bg-[#059669] text-white font-bold"
                            : isDark
                            ? "hover:bg-zinc-800 text-zinc-300"
                            : "hover:bg-gray-100 text-gray-700"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-sm">{lang.flag}</span>
                          <div>
                            <div className="font-bold leading-tight">{lang.nativeName}</div>
                            <div className={`text-[10px] ${isSelected ? "text-emerald-100" : "text-gray-400 dark:text-zinc-500"}`}>{lang.region}</div>
                          </div>
                        </div>
                        {isSelected && <CheckCircle className="w-4 h-4 text-white flex-shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Dark Mode Toggle */}
          <button
            id="theme-toggle-btn"
            onClick={onToggleDark}
            className={`p-1.5 sm:p-2 rounded-xl border transition-colors cursor-pointer ${
              isDark
                ? "bg-zinc-800 border-zinc-700 text-amber-400 hover:bg-zinc-700"
                : "bg-gray-100 border-gray-200 text-gray-700 hover:bg-gray-200"
            }`}
            title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {isDark ? <Sun className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <Moon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
          </button>

          {/* User Profile / OTP Login */}
          <button
            id="user-profile-btn"
            onClick={onOpenAuth}
            className={`flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1.5 rounded-xl text-[11px] sm:text-xs font-semibold border transition-all cursor-pointer ${
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
            <span className="hidden sm:inline-block max-w-[80px] truncate font-bold">
              {user.isLoggedIn ? (user.name ? user.name.split(" ")[0] : "Account") : isHindi ? "लॉगिन" : "Login"}
            </span>
          </button>

          {/* Menu Dropdown Toggle */}
          <div className="relative" ref={menuRef}>
            <button
              id="header-menu-btn"
              onClick={() => setIsMenuOpen((prev) => !prev)}
              className={`p-1.5 sm:p-2 rounded-xl border transition-colors cursor-pointer flex items-center justify-center ${
                isMenuOpen
                  ? "bg-[#10B981] text-white border-[#10B981]"
                  : isDark
                  ? "bg-zinc-800 border-zinc-700 text-zinc-200 hover:bg-zinc-700"
                  : "bg-gray-100 border-gray-200 text-gray-800 hover:bg-gray-200"
              }`}
              title="Menu Options"
            >
              {isMenuOpen ? <X className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <Menu className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
            </button>

            {/* Menu Dropdown Card */}
            {isMenuOpen && (
              <div
                id="header-menu-dropdown"
                className={`absolute right-0 mt-2 w-64 sm:w-72 max-h-[calc(100vh-80px)] overflow-y-auto rounded-2xl border shadow-2xl p-2.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150 ${
                  isDark
                    ? "bg-[#18181B] border-zinc-700 text-zinc-100 shadow-black/80"
                    : "bg-white border-gray-200 text-[#111827] shadow-xl"
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
                      {user.isLoggedIn ? (isHindi ? "क्लाउड सिंक सक्रिय" : "Cloud Sync Active") : isHindi ? "Google / OTP से लॉगिन" : "Sync history to cloud"}
                    </span>
                  </div>
                </button>

                {/* Secret Founder & Admin Panel (Visible for Admin Accounts) */}
                {isOwner && onOpenAdmin && (
                  <button
                    id="menu-owner-admin-btn"
                    onClick={() => {
                      setIsMenuOpen(false);
                      onOpenAdmin();
                    }}
                    className="w-full px-3 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2.5 bg-amber-500/15 hover:bg-amber-500/25 text-amber-700 dark:text-amber-300 border border-amber-500/30 transition-colors text-left cursor-pointer mb-1"
                  >
                    <ShieldCheck className="w-4 h-4 text-amber-500 flex-shrink-0" />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="block font-black text-amber-900 dark:text-amber-100">
                          {isHindi ? "👑 एडमिन व लाइव ट्रैफिक" : "👑 Founder & Admin Dashboard"}
                        </span>
                        <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-amber-500 text-white font-bold">
                          FOUNDER
                        </span>
                      </div>
                      <span className="text-[10px] text-amber-700/80 dark:text-amber-300/80 block">
                        {isHindi ? "लाइव यूज़र्स और स्कैन डेटा देखें" : "View Live Cloud Users & Scans"}
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

                {/* Disclaimer Option */}
                {onOpenDisclaimer && (
                  <button
                    id="menu-disclaimer-btn"
                    onClick={() => {
                      setIsMenuOpen(false);
                      onOpenDisclaimer();
                    }}
                    className="w-full px-3 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2.5 hover:bg-amber-500/10 hover:text-amber-700 dark:hover:text-amber-300 transition-colors text-left cursor-pointer"
                  >
                    <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0" />
                    <div>
                      <span className="block font-bold text-[#000000] dark:text-white">
                        {isHindi ? "अस्वीकरण (Disclaimer)" : "Disclaimer & Notice"}
                      </span>
                      <span className="text-[10px] text-gray-500 dark:text-zinc-400 block">
                        {isHindi ? "कानूनी व चिकित्सीय जानकारी" : "Legal & Educational Notice"}
                      </span>
                    </div>
                  </button>
                )}

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

                {/* Gym IQ Option */}
                <button
                  id="menu-gym-iq-btn"
                  onClick={() => {
                    setIsMenuOpen(false);
                    onNavigateTab("gym");
                  }}
                  className="w-full px-3 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2.5 hover:bg-[#10B981]/10 hover:text-[#059669] dark:hover:text-[#10B981] transition-colors text-left cursor-pointer"
                >
                  <Dumbbell className="w-4 h-4 text-[#10B981] flex-shrink-0" />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="block font-bold text-[#000000] dark:text-white">
                        Gym IQ
                      </span>
                      <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-emerald-500 text-white font-bold">
                        NEW
                      </span>
                    </div>
                    <span className="text-[10px] text-gray-500 dark:text-zinc-400 block">
                      {isHindi ? "फिटनेस प्रोडक्ट्स व तुलना" : "Fitness Hub & Comparator"}
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

                {/* Install App / PWA Option */}
                {onOpenInstallPwa && (
                  <>
                    <div className="h-px bg-gray-100 dark:bg-zinc-800 my-1" />
                    <button
                      id="menu-install-pwa-btn"
                      onClick={() => {
                        setIsMenuOpen(false);
                        onOpenInstallPwa();
                      }}
                      className="w-full px-3 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2.5 bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 text-[#059669] dark:text-[#34D399] border border-emerald-200 dark:border-emerald-800 transition-colors text-left cursor-pointer mt-1"
                    >
                      <Download className="w-4 h-4 text-[#10B981] flex-shrink-0" />
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="block font-black text-slate-900 dark:text-white">
                            {isHindi ? "📲 ऐप इनस्टॉल करें" : "📲 Install App"}
                          </span>
                          <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-[#10B981] text-white font-bold">
                            PWA
                          </span>
                        </div>
                        <span className="text-[10px] text-[#059669] dark:text-[#34D399] block font-medium">
                          {isHindi ? "होम स्क्रीन पर 1-टैप में जोड़ें" : "Add to Phone Home Screen"}
                        </span>
                      </div>
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
