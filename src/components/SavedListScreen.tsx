import React, { useState, useMemo } from "react";
import { FoodProduct, Language, UserProfile } from "../types";
import {
  Bookmark,
  Trash2,
  Share2,
  ScanLine,
  User,
  LogIn,
  ShoppingBag,
  ShieldCheck,
} from "lucide-react";
import { ContactSupport } from "./ContactSupport";
import { SmartGroceryChecklist } from "./SmartGroceryChecklist";
import { KitchenAuditQuiz } from "./KitchenAuditQuiz";

interface SavedListScreenProps {
  savedProducts: FoodProduct[];
  onSelectProduct: (product: FoodProduct) => void;
  onRemoveProduct: (productId: string) => void;
  onOpenScanner: () => void;
  language: Language;
  isDark: boolean;
  user?: UserProfile;
  onOpenAuth?: () => void;
}

export const SavedListScreen: React.FC<SavedListScreenProps> = ({
  savedProducts,
  onSelectProduct,
  onRemoveProduct,
  onOpenScanner,
  language,
  isDark,
  user,
  onOpenAuth,
}) => {
  const isHindi = language === "hi";

  // Mode: "grocery" (Smart Grocery Checklist), "saved" (Scanned & Bookmarked items), "audit" (2-Min Kitchen Quiz)
  const [activeSection, setActiveSection] = useState<"grocery" | "saved" | "audit">(() => {
    // If user has saved products, default to saved, otherwise to grocery
    return savedProducts.length > 0 ? "saved" : "grocery";
  });

  const [filterType, setFilterType] = useState<"all" | "clean" | "avoid">("all");

  // Calculate Pantry Health Score for saved products
  const pantryHealthScore = useMemo(() => {
    if (savedProducts.length === 0) return 0;
    const total = savedProducts.reduce((acc, p) => acc + p.healthScore, 0);
    return Math.round(total / savedProducts.length);
  }, [savedProducts]);

  const filteredList = useMemo(() => {
    return savedProducts.filter((p) => {
      if (filterType === "clean") return p.healthScore >= 70;
      if (filterType === "avoid") return p.healthScore < 70;
      return true;
    });
  }, [savedProducts, filterType]);

  const handleExportShoppingList = () => {
    if (savedProducts.length === 0) return;

    const cleanItems = savedProducts.filter((p) => p.healthScore >= 70);
    const avoidItems = savedProducts.filter((p) => p.healthScore < 40);

    const message = `🛒 *AharIQ Clean Grocery List* 🛒\n\n✅ *Clean Purchases (${cleanItems.length}):*\n${cleanItems.map(c => `• ${c.name} (${c.brand})`).join("\n") || "None yet"}\n\n❌ *Avoid Buying (${avoidItems.length}):*\n${avoidItems.map(a => `• ⚠️ ${a.name}`).join("\n") || "None"}\n\n📲 Generated via AharIQ App: https://ahariq.app`;

    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div
      id="saved-list-screen-view"
      className={`min-h-screen pb-28 transition-colors w-full max-w-full overflow-x-hidden ${
        isDark ? "bg-[#090C10] text-zinc-100" : "bg-[#F8FAFC] text-[#0F172A]"
      }`}
    >
      <div className="max-w-2xl mx-auto px-4 sm:px-5 py-4 sm:py-5 space-y-4 w-full">
        {/* User Privacy & Isolation Header Pill */}
        <div
          className={`px-3.5 py-2 rounded-2xl border flex items-center justify-between text-xs transition-all ${
            isDark ? "bg-[#161C24] border-slate-800 text-slate-300" : "bg-white border-slate-200/90 text-slate-600 shadow-2xs"
          }`}
        >
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-6 h-6 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center flex-shrink-0">
              <User className="w-3.5 h-3.5" />
            </div>
            <span className="truncate font-semibold">
              {user?.isLoggedIn
                ? `${user.name || user.email || "User"} (${isHindi ? "निजी सहेजी गई लिस्ट" : "Private Saved Items"})`
                : isHindi
                ? "गेस्ट मोड (केवल इस डिवाइस पर)"
                : "Guest Mode (Local Device)"}
            </span>
          </div>

          {!user?.isLoggedIn && onOpenAuth && (
            <button
              onClick={onOpenAuth}
              className="text-[#059669] dark:text-[#34D399] font-bold text-xs hover:underline flex items-center gap-1 flex-shrink-0 cursor-pointer"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>{isHindi ? "लॉगिन करें" : "Sign In"}</span>
            </button>
          )}
        </div>

        {/* 3-Section Segment Switcher */}
        <div
          className={`flex p-1 rounded-2xl border text-xs font-bold ${
            isDark ? "bg-[#161C24] border-slate-800" : "bg-white border-slate-200 shadow-2xs"
          }`}
        >
          <button
            id="tab-grocery-swaps-btn"
            onClick={() => setActiveSection("grocery")}
            className={`flex-1 py-2 px-2 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              activeSection === "grocery"
                ? "bg-[#059669] text-white shadow-2xs"
                : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span className="truncate">{isHindi ? "किराना स्वैप" : "Grocery Swaps"}</span>
          </button>

          <button
            id="tab-saved-scans-btn"
            onClick={() => setActiveSection("saved")}
            className={`flex-1 py-2 px-2 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              activeSection === "saved"
                ? "bg-[#059669] text-white shadow-2xs"
                : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
            }`}
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span className="truncate">
              {isHindi ? "सहेजे गए स्कैन" : "Saved Scans"}
              {savedProducts.length > 0 && ` (${savedProducts.length})`}
            </span>
          </button>

          <button
            id="tab-kitchen-audit-btn"
            onClick={() => setActiveSection("audit")}
            className={`flex-1 py-2 px-2 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              activeSection === "audit"
                ? "bg-[#059669] text-white shadow-2xs"
                : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span className="truncate">{isHindi ? "रसोई टेस्ट" : "Kitchen Audit"}</span>
          </button>
        </div>

        {/* SECTION 1: SMART GROCERY CHECKLIST */}
        {activeSection === "grocery" && (
          <SmartGroceryChecklist language={language} isDark={isDark} />
        )}

        {/* SECTION 2: KITCHEN CLEANLINESS AUDIT */}
        {activeSection === "audit" && (
          <KitchenAuditQuiz language={language} isDark={isDark} />
        )}

        {/* SECTION 3: SAVED SCANNED ITEMS */}
        {activeSection === "saved" && (
          <div className="space-y-4">
            {/* Title & WhatsApp Export Button */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-xl sm:text-2xl font-black tracking-tight flex items-center gap-2">
                  <Bookmark className="w-5 h-5 text-[#059669]" />
                  <span>{isHindi ? "मेरी सहेजी गई लिस्ट" : "My Saved Scans"}</span>
                </h1>
                <p className="text-xs text-slate-400 mt-0.5">
                  {isHindi ? "स्कैन किए गए सुरक्षित एवं वर्जित उत्पाद" : "Saved staples & watchlist items"}
                </p>
              </div>

              {savedProducts.length > 0 && (
                <button
                  id="export-shopping-list-btn"
                  onClick={handleExportShoppingList}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#059669] hover:bg-[#047857] text-white font-bold text-xs shadow-xs transition-colors cursor-pointer"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>{isHindi ? "शेयर करें" : "WhatsApp"}</span>
                </button>
              )}
            </div>

            {/* Clean Pantry Score Card */}
            {savedProducts.length > 0 && (
              <div
                className={`p-3.5 rounded-2xl border flex items-center justify-between gap-4 ${
                  isDark ? "bg-[#161C24] border-slate-800" : "bg-white border-slate-200/90 shadow-2xs"
                }`}
              >
                <div>
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    {isHindi ? "रसोई का शुद्धता स्कोर" : "Pantry Clean Score"}
                  </span>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-2xl font-black text-[#059669] dark:text-[#34D399]">
                      {pantryHealthScore}
                    </span>
                    <span className="text-xs text-slate-400">/ 100</span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        pantryHealthScore >= 70
                          ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300"
                          : "bg-amber-500/15 text-amber-700 dark:text-amber-300"
                      }`}
                    >
                      {pantryHealthScore >= 70
                        ? isHindi ? "शुद्ध एवं संतुलित" : "Clean Pantry"
                        : isHindi ? "सुधार योग्य" : "Needs Swaps"}
                    </span>
                  </div>
                </div>

                <span className="text-xs text-slate-400 font-semibold">
                  {savedProducts.length} {isHindi ? "आइटम" : "Items"}
                </span>
              </div>
            )}

            {/* Filter Tabs */}
            {savedProducts.length > 0 && (
              <div
                className={`flex p-1 rounded-2xl border text-xs font-semibold ${
                  isDark ? "bg-[#161C24] border-slate-800" : "bg-white border-slate-200"
                }`}
              >
                <button
                  onClick={() => setFilterType("all")}
                  className={`flex-1 py-1.5 rounded-xl transition-all text-center cursor-pointer ${
                    filterType === "all"
                      ? "bg-[#059669] text-white shadow-2xs font-bold"
                      : "text-slate-500"
                  }`}
                >
                  {isHindi ? "सभी" : "All"} ({savedProducts.length})
                </button>
                <button
                  onClick={() => setFilterType("clean")}
                  className={`flex-1 py-1.5 rounded-xl transition-all text-center cursor-pointer ${
                    filterType === "clean"
                      ? "bg-[#059669] text-white shadow-2xs font-bold"
                      : "text-slate-500"
                  }`}
                >
                  {isHindi ? "सुरक्षित (Clean)" : "Clean"} (
                  {savedProducts.filter((p) => p.healthScore >= 70).length})
                </button>
                <button
                  onClick={() => setFilterType("avoid")}
                  className={`flex-1 py-1.5 rounded-xl transition-all text-center cursor-pointer ${
                    filterType === "avoid"
                      ? "bg-[#059669] text-white shadow-2xs font-bold"
                      : "text-slate-500"
                  }`}
                >
                  {isHindi ? "वॉचलिस्ट (Avoid)" : "Avoid"} (
                  {savedProducts.filter((p) => p.healthScore < 70).length})
                </button>
              </div>
            )}

            {/* Saved Items Feed */}
            {filteredList.length === 0 ? (
              <div
                className={`p-8 rounded-3xl border text-center space-y-3 ${
                  isDark ? "bg-[#161C24] border-slate-800" : "bg-white border-slate-200"
                }`}
              >
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
                  <Bookmark className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-sm">
                  {isHindi ? "आपकी स्कैन लिस्ट अभी खाली है" : "Your saved scan list is empty"}
                </h3>
                <p className="text-xs text-slate-400 max-w-xs mx-auto">
                  {isHindi
                    ? "किसी भी प्रोडक्ट के पेज पर बुकमार्क आइकन दबाकर उसे यहां जोड़ें। या ऊपर 'किराना स्वैप' टैब देखें।"
                    : "Tap the bookmark icon on any product page to save it here, or check 'Grocery Swaps' above."}
                </p>
                <div className="flex justify-center gap-2 pt-1">
                  <button
                    onClick={onOpenScanner}
                    className="px-4 py-2.5 rounded-xl bg-[#059669] hover:bg-[#047857] text-white font-bold text-xs inline-flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
                  >
                    <ScanLine className="w-4 h-4" />
                    <span>{isHindi ? "बारकोड स्कैन करें" : "Scan Barcode"}</span>
                  </button>
                  <button
                    onClick={() => setActiveSection("grocery")}
                    className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>{isHindi ? "किराना स्वैप देखें" : "View Grocery Swaps"}</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-2.5">
                {filteredList.map((item) => {
                  const isGreen = item.healthScore >= 70;
                  const isYellow = item.healthScore >= 40 && item.healthScore < 70;

                  return (
                    <div
                      key={item.id}
                      className={`p-3.5 rounded-2xl border flex items-center gap-3.5 transition-all ${
                        isDark ? "bg-[#161C24] border-slate-800/80" : "bg-white border-slate-200/80 shadow-2xs"
                      }`}
                    >
                      <div
                        onClick={() => onSelectProduct(item)}
                        className="w-13 h-13 rounded-xl bg-slate-100 dark:bg-slate-800 overflow-hidden flex-shrink-0 border border-slate-200/60 dark:border-slate-700/60 cursor-pointer"
                      >
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>

                      <div
                        onClick={() => onSelectProduct(item)}
                        className="flex-1 min-w-0 cursor-pointer"
                      >
                        <span className="text-[11px] font-medium text-slate-400 block truncate">
                          {item.brand}
                        </span>
                        <h4 className="font-bold text-sm text-slate-900 dark:text-white truncate">
                          {isHindi ? item.nameHindi || item.name : item.name}
                        </h4>
                        <div className="flex items-center gap-1.5 mt-1">
                          <span
                            className={`w-2 h-2 rounded-full ${
                              isGreen ? "bg-emerald-500" : isYellow ? "bg-amber-500" : "bg-red-500"
                            }`}
                          />
                          <span
                            className={`text-xs font-semibold ${
                              isGreen
                                ? "text-emerald-600 dark:text-emerald-400"
                                : isYellow
                                ? "text-amber-600 dark:text-amber-400"
                                : "text-red-600 dark:text-red-400"
                            }`}
                          >
                            {isGreen
                              ? isHindi ? "उत्कृष्ट" : "Clean"
                              : isYellow
                              ? isHindi ? "मध्यम" : "Moderate"
                              : isHindi ? "बचने की सलाह" : "Avoid"}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 flex-shrink-0">
                        <div
                          className={`w-10 h-10 rounded-xl flex flex-col items-center justify-center font-black text-white text-xs ${
                            isGreen ? "bg-[#10B981]" : isYellow ? "bg-amber-500" : "bg-red-500"
                          }`}
                        >
                          <span>{item.healthScore}</span>
                          <span className="text-[7px] uppercase font-bold opacity-80 leading-none">/100</span>
                        </div>

                        <button
                          onClick={() => onRemoveProduct(item.id)}
                          className="p-2 text-slate-400 hover:text-red-500 transition-colors cursor-pointer"
                          title={isHindi ? "हटाएं" : "Remove"}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Global Footer Support */}
        <ContactSupport language={language} isDark={isDark} />
      </div>
    </div>
  );
};
