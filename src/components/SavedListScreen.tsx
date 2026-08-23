import React, { useState, useMemo } from "react";
import { FoodProduct, Language } from "../types";
import {
  Bookmark,
  Trash2,
  Share2,
  ShoppingBag,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  ScanLine
} from "lucide-react";
import { ContactSupport } from "./ContactSupport";

interface SavedListScreenProps {
  savedProducts: FoodProduct[];
  onSelectProduct: (product: FoodProduct) => void;
  onRemoveProduct: (productId: string) => void;
  onOpenScanner: () => void;
  language: Language;
  isDark: boolean;
}

export const SavedListScreen: React.FC<SavedListScreenProps> = ({
  savedProducts,
  onSelectProduct,
  onRemoveProduct,
  onOpenScanner,
  language,
  isDark,
}) => {
  const isHindi = language === "hi";
  const [filterType, setFilterType] = useState<"all" | "clean" | "avoid">("all");

  // Calculate Pantry Health Index
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

    const message = `🛒 *AharIQ Clean Indian Grocery List* 🛒\n\n✅ *Clean Purchases (${cleanItems.length}):*\n${cleanItems.map(c => `• ${c.name} (${c.brand})`).join("\n") || "None yet"}\n\n❌ *Avoid Buying (${avoidItems.length}):*\n${avoidItems.map(a => `• ⚠️ ${a.name} (${a.warnings.map(w => w.titleEn).join(", ")})`).join("\n") || "None"}\n\n📲 Generated via AharIQ - Indian Food Health Companion`;

    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div
      id="saved-list-screen-view"
      className={`min-h-screen pb-24 transition-colors w-full max-w-full overflow-x-hidden ${
        isDark ? "bg-stone-950 text-stone-100" : "bg-stone-100/90 text-stone-900"
      }`}
    >
      <div className="max-w-3xl mx-auto px-3 sm:px-4 py-3 sm:py-4 space-y-4 w-full">
        {/* Top Title & Pantry Score Card */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl sm:text-2xl font-black tracking-tight flex items-center gap-2">
              <Bookmark className="w-5 h-5 text-[#22c55e]" />
              <span>{isHindi ? "मेरी लिस्ट (Mere List)" : "My Grocery List"}</span>
            </h1>
            <p className="text-xs text-stone-500">
              {isHindi ? "सहेजे गए सुरक्षित एवं वर्जित उत्पाद" : "Saved staples & watchlist items"}
            </p>
          </div>

          {savedProducts.length > 0 && (
            <button
              id="export-shopping-list-btn"
              onClick={handleExportShoppingList}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#22c55e] hover:bg-[#16a34a] text-white font-bold text-xs shadow-sm transition-colors cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{isHindi ? "व्हाट्सएप लिस्ट भेजें" : "Export to WhatsApp"}</span>
            </button>
          )}
        </div>

        {/* Pantry Health Index Header Card */}
        {savedProducts.length > 0 && (
          <div
            className={`p-4 rounded-3xl border flex items-center justify-between gap-4 ${
              isDark ? "bg-stone-900 border-stone-800" : "bg-white border-stone-200 shadow-xs"
            }`}
          >
            <div>
              <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider">
                {isHindi ? "आपकी रसोई का शुद्धता स्कोर" : "Pantry Clean Quotient"}
              </span>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-3xl font-black text-[#22c55e]">
                  {pantryHealthScore}
                </span>
                <span className="text-xs text-stone-400">/ 100</span>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    pantryHealthScore >= 70
                      ? "bg-[#22c55e]/20 text-[#15803d] dark:text-[#22c55e]"
                      : "bg-amber-500/20 text-amber-700 dark:text-amber-300"
                  }`}
                >
                  {pantryHealthScore >= 70 ? (isHindi ? "शुद्ध एवं संतुलित" : "High Clean Pantry") : (isHindi ? "सुधार योग्य" : "Needs Clean Swaps")}
                </span>
              </div>
            </div>

            <div className="text-right">
              <span className="text-xs font-semibold text-stone-500">
                {savedProducts.length} {isHindi ? "सहेजे उत्पाद" : "Saved Products"}
              </span>
              <p className="text-[10px] text-[#22c55e] font-bold">
                {savedProducts.filter((p) => p.healthScore >= 70).length} {isHindi ? "क्लीन उत्पाद" : "Clean choices"}
              </p>
            </div>
          </div>
        )}

        {/* Filter Pills: All, Clean Options, Avoid Items */}
        <div
          className={`flex p-1 rounded-2xl border text-xs font-semibold ${
            isDark ? "bg-stone-900 border-stone-800" : "bg-white border-stone-200"
          }`}
        >
          <button
            onClick={() => setFilterType("all")}
            className={`flex-1 py-2 rounded-xl transition-all text-center cursor-pointer ${
              filterType === "all"
                ? "bg-[#22c55e] text-white shadow-xs"
                : "text-stone-500 hover:text-stone-900 dark:hover:text-stone-100"
            }`}
          >
            {isHindi ? "सभी उत्पाद" : "All Items"} ({savedProducts.length})
          </button>
          <button
            onClick={() => setFilterType("clean")}
            className={`flex-1 py-2 rounded-xl transition-all text-center cursor-pointer ${
              filterType === "clean"
                ? "bg-[#22c55e] text-white shadow-xs"
                : "text-stone-500 hover:text-stone-900 dark:hover:text-stone-100"
            }`}
          >
            {isHindi ? "हरी सूची (Clean)" : "Clean Pantry"} ({savedProducts.filter((p) => p.healthScore >= 70).length})
          </button>
          <button
            onClick={() => setFilterType("avoid")}
            className={`flex-1 py-2 rounded-xl transition-all text-center cursor-pointer ${
              filterType === "avoid"
                ? "bg-[#22c55e] text-white shadow-xs"
                : "text-stone-500 hover:text-stone-900 dark:hover:text-stone-100"
            }`}
          >
            {isHindi ? "बचने की सूची (Avoid)" : "Watchlist"} ({savedProducts.filter((p) => p.healthScore < 70).length})
          </button>
        </div>

        {/* Product Items List (16px gap) */}
        {filteredList.length === 0 ? (
          <div
            className={`p-10 rounded-3xl border text-center space-y-3 ${
              isDark ? "bg-stone-900 border-stone-800" : "bg-white border-stone-200"
            }`}
          >
            <div className="w-14 h-14 rounded-2xl bg-[#22c55e]/10 border border-[#22c55e]/20 text-[#22c55e] flex items-center justify-center mx-auto">
              <ShoppingBag className="w-7 h-7" />
            </div>
            <h3 className="font-bold text-sm">
              {isHindi ? "आपकी लिस्ट अभी खाली है" : "Your list is currently empty"}
            </h3>
            <p className="text-xs text-stone-500 max-w-xs mx-auto">
              {isHindi
                ? "किराना उत्पाद को स्कैन करें और 'मेरे लिस्ट में डालो' बटन दबाकर सहेजें।"
                : "Scan Indian packaged groceries and tap 'Mere List Mein Daalo' to add them here."}
            </p>
            <button
              onClick={onOpenScanner}
              className="px-4 py-2 rounded-full bg-[#22c55e] hover:bg-[#16a34a] text-white font-bold text-xs inline-flex items-center gap-1.5 shadow-md shadow-[#22c55e]/20 transition-colors cursor-pointer"
            >
              <ScanLine className="w-4 h-4" />
              <span>{isHindi ? "उत्पाद स्कैन करें" : "Scan Products Now"}</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredList.map((product) => {
              const isGreen = product.healthScore >= 70;
              const isYellow = product.healthScore >= 40 && product.healthScore < 70;

              return (
                <div
                  key={product.id}
                  className={`p-4 rounded-2xl border flex items-center gap-4 transition-all ${
                    isDark ? "bg-stone-900 border-stone-800" : "bg-white border-stone-200/80 shadow-xs"
                  }`}
                >
                  <div
                    onClick={() => onSelectProduct(product)}
                    className="w-14 h-14 rounded-2xl bg-stone-100 dark:bg-stone-800 overflow-hidden flex-shrink-0 border border-stone-200 dark:border-stone-700 cursor-pointer"
                  >
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  <div
                    onClick={() => onSelectProduct(product)}
                    className="flex-1 min-w-0 cursor-pointer"
                  >
                    <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400">
                      {product.brand}
                    </span>
                    <h4 className="font-medium text-sm text-stone-900 dark:text-stone-100 truncate">
                      {isHindi ? product.nameHindi : product.name}
                    </h4>
                    <span
                      className={`text-[9px] font-bold px-2 py-0.5 rounded-full mt-1 inline-block ${
                        isGreen
                          ? "bg-[#22c55e]/15 text-[#15803d] dark:text-[#22c55e]"
                          : isYellow
                          ? "bg-amber-500/15 text-amber-700 dark:text-amber-300"
                          : "bg-rose-500/15 text-rose-700 dark:text-rose-300"
                      }`}
                    >
                      {product.verdict}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    <div
                      className={`w-10 h-10 rounded-2xl flex items-center justify-center font-black text-xs text-white ${
                        isGreen
                          ? "bg-[#22c55e]"
                          : isYellow
                          ? "bg-amber-500"
                          : "bg-rose-600"
                      }`}
                    >
                      {product.healthScore}
                    </div>

                    <button
                      onClick={() => onRemoveProduct(product.id)}
                      className="p-2 rounded-xl text-stone-400 hover:text-rose-500 hover:bg-rose-500/10 transition-colors cursor-pointer"
                      title="Remove from List"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Contact Support Section */}
        <ContactSupport language={language} isDark={isDark} />
      </div>
    </div>
  );
};
