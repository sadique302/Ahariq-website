import React, { useState, useMemo } from "react";
import { Language } from "../types";
import {
  GROCERY_CHECKLIST_DATA,
  GroceryChecklistItem,
} from "../data/groceryChecklistData";
import {
  Check,
  Plus,
  Share2,
  Trash2,
  AlertOctagon,
  ArrowRight,
  ShieldCheck,
  ShoppingBag,
  Filter
} from "lucide-react";

interface SmartGroceryChecklistProps {
  language: Language;
  isDark: boolean;
}

interface CustomGroceryItem {
  id: string;
  name: string;
  checked: boolean;
}

export const SmartGroceryChecklist: React.FC<SmartGroceryChecklistProps> = ({
  language,
  isDark,
}) => {
  const isHindi = language === "hi";

  // Check state for curated items
  const [checkedIds, setCheckedIds] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem("ahariq_grocery_checked_ids");
      return saved ? JSON.parse(saved) : {};
    } catch (e) {
      return {};
    }
  });

  // Custom user-added grocery items
  const [customItems, setCustomItems] = useState<CustomGroceryItem[]>(() => {
    try {
      const saved = localStorage.getItem("ahariq_custom_grocery_items");
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const [newItemText, setNewItemText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const toggleItem = (id: string) => {
    const updated = { ...checkedIds, [id]: !checkedIds[id] };
    setCheckedIds(updated);
    localStorage.setItem("ahariq_grocery_checked_ids", JSON.stringify(updated));
  };

  const toggleCustomItem = (id: string) => {
    const updated = customItems.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setCustomItems(updated);
    localStorage.setItem("ahariq_custom_grocery_items", JSON.stringify(updated));
  };

  const handleAddCustomItem = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = newItemText.trim();
    if (!trimmed) return;

    const newItem: CustomGroceryItem = {
      id: "custom_" + Date.now(),
      name: trimmed,
      checked: false,
    };

    const updated = [newItem, ...customItems];
    setCustomItems(updated);
    localStorage.setItem("ahariq_custom_grocery_items", JSON.stringify(updated));
    setNewItemText("");
  };

  const handleRemoveCustomItem = (id: string) => {
    const updated = customItems.filter((i) => i.id !== id);
    setCustomItems(updated);
    localStorage.setItem("ahariq_custom_grocery_items", JSON.stringify(updated));
  };

  const categories = [
    { id: "all", labelEn: "All", labelHi: "सभी" },
    { id: "oils", labelEn: "Oil & Ghee", labelHi: "तेल व घी" },
    { id: "snacks", labelEn: "Biscuits & Snacks", labelHi: "बिस्कुट व स्नैक्स" },
    { id: "breakfast", labelEn: "Breakfast", labelHi: "नाश्ता" },
    { id: "spices", labelEn: "Spices & Salt", labelHi: "मसाले व नमक" },
    { id: "kids_dairy", labelEn: "Kids & Dairy", labelHi: "बच्चों के ड्रिंक्स" },
    { id: "sauces", labelEn: "Sauces", labelHi: "सॉस व चटनी" },
  ];

  const filteredItems = useMemo(() => {
    if (selectedCategory === "all") return GROCERY_CHECKLIST_DATA;
    return GROCERY_CHECKLIST_DATA.filter((i) => i.category === selectedCategory);
  }, [selectedCategory]);

  const handleShareWhatsApp = () => {
    // Generate clean WhatsApp shopping message
    const itemsList = GROCERY_CHECKLIST_DATA.map((item) => {
      const isChecked = checkedIds[item.id];
      const checkMark = isChecked ? "✅" : "🛒";
      const cleanSwap = isHindi ? item.cleanSwapHi : item.cleanSwapEn;
      const avoid = isHindi ? item.avoidItemHi : item.avoidItemEn;
      return `${checkMark} *${isHindi ? item.titleHi : item.titleEn}*\n  • ✅ *Clean Swap:* ${cleanSwap}\n  • ❌ *Avoid:* ${avoid}`;
    }).join("\n\n");

    const customList =
      customItems.length > 0
        ? `\n\n📝 *अन्य घरेलू सामान:*\n` +
          customItems.map((c) => `${c.checked ? "✅" : "🛒"} ${c.name}`).join("\n")
        : "";

    const message = `🛒 *AharIQ • स्मार्ट स्वच्छ किराना लिस्ट (Clean Grocery List)* 🛒\n\n${itemsList}${customList}\n\n👉 *FSSAI व ICMR मानकों के अनुसार स्वच्छ भोजन की तैयारी!*\n📲 https://ahariq.app`;

    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <div id="smart-grocery-checklist" className="space-y-4">
      {/* Action Header: WhatsApp Export */}
      <div
        className={`p-4 rounded-3xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${
          isDark
            ? "bg-gradient-to-r from-emerald-950/30 to-[#161C24] border-emerald-800/40 text-zinc-100"
            : "bg-gradient-to-r from-emerald-50 via-white to-stone-50 border-emerald-200 text-slate-800 shadow-2xs"
        }`}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#059669] text-white flex items-center justify-center flex-shrink-0 shadow-sm shadow-emerald-700/20">
            <ShoppingBag className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white">
              {isHindi ? "स्मार्ट किराना स्वैप गाइड" : "Smart Clean Grocery Swaps"}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {isHindi
                ? "बाजार या Blinkit/Zepto से खरीदते समय पाम ऑयल व मिलावट से बचें"
                : "Avoid palm oil, excess sugar & adulterants while shopping"}
            </p>
          </div>
        </div>

        <button
          onClick={handleShareWhatsApp}
          id="export-clean-grocery-whatsapp-btn"
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs shadow-sm transition-colors cursor-pointer w-full sm:w-auto justify-center"
        >
          <Share2 className="w-4 h-4" />
          <span>{isHindi ? "पूरी लिस्ट WhatsApp पर भेजें" : "Share List on WhatsApp"}</span>
        </button>
      </div>

      {/* Quick Add Custom Item Input */}
      <form onSubmit={handleAddCustomItem} className="flex gap-2">
        <input
          type="text"
          placeholder={isHindi ? "अपनी जरूरत का कोई सामान जोड़ें (उदा. 5kg आटा, देसी घी)..." : "Add your custom item (e.g. 5kg Atta, Cow Ghee)..."}
          value={newItemText}
          onChange={(e) => setNewItemText(e.target.value)}
          className={`flex-1 px-4 py-3 rounded-2xl text-xs sm:text-sm border transition-all ${
            isDark
              ? "bg-[#161C24] border-slate-800 text-zinc-100 placeholder:text-slate-500 focus:border-[#059669]"
              : "bg-white border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-[#059669] shadow-2xs"
          }`}
        />
        <button
          type="submit"
          disabled={!newItemText.trim()}
          className="px-4 py-3 rounded-2xl bg-[#059669] hover:bg-[#047857] disabled:opacity-40 text-white font-bold text-xs flex items-center gap-1 cursor-pointer transition-colors shadow-2xs"
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">{isHindi ? "जोड़ें" : "Add"}</span>
        </button>
      </form>

      {/* User Custom Items Pill List (if any) */}
      {customItems.length > 0 && (
        <div className="space-y-1.5">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block px-1">
            {isHindi ? "आपके द्वारा जोड़े गए सामान:" : "My Custom Items:"}
          </span>
          <div className="space-y-1.5">
            {customItems.map((item) => (
              <div
                key={item.id}
                className={`p-2.5 sm:p-3 rounded-2xl border flex items-center justify-between gap-3 ${
                  isDark ? "bg-[#161C24] border-slate-800" : "bg-white border-slate-200 shadow-2xs"
                }`}
              >
                <div
                  onClick={() => toggleCustomItem(item.id)}
                  className="flex items-center gap-3 flex-1 min-w-0 cursor-pointer"
                >
                  <div
                    className={`w-5 h-5 rounded-lg border flex items-center justify-center flex-shrink-0 transition-colors ${
                      item.checked
                        ? "bg-[#059669] border-[#059669] text-white"
                        : "border-slate-300 dark:border-slate-600"
                    }`}
                  >
                    {item.checked && <Check className="w-3.5 h-3.5" />}
                  </div>
                  <span
                    className={`text-xs sm:text-sm font-medium truncate ${
                      item.checked ? "line-through text-slate-400" : "text-slate-800 dark:text-slate-200"
                    }`}
                  >
                    {item.name}
                  </span>
                </div>

                <button
                  onClick={() => handleRemoveCustomItem(item.id)}
                  className="text-slate-400 hover:text-red-500 p-1 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Category Filter Horizontal Scroll */}
      <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-colors cursor-pointer ${
                isActive
                  ? "bg-[#059669] text-white shadow-2xs"
                  : isDark
                  ? "bg-slate-800/80 text-slate-300 hover:bg-slate-700"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {isHindi ? cat.labelHi : cat.labelEn}
            </button>
          );
        })}
      </div>

      {/* Curated Clean Grocery Items List */}
      <div className="space-y-3">
        {filteredItems.map((item) => {
          const isChecked = !!checkedIds[item.id];

          return (
            <div
              key={item.id}
              className={`p-4 rounded-3xl border transition-all ${
                isChecked
                  ? isDark
                    ? "bg-emerald-950/20 border-emerald-900/40"
                    : "bg-emerald-50/50 border-emerald-200"
                  : isDark
                  ? "bg-[#161C24] border-slate-800"
                  : "bg-white border-slate-200/90 shadow-2xs"
              }`}
            >
              {/* Card Top: Checkbox, Title & Category */}
              <div className="flex items-start justify-between gap-3">
                <div
                  onClick={() => toggleItem(item.id)}
                  className="flex items-start gap-3 flex-1 min-w-0 cursor-pointer"
                >
                  <div
                    className={`w-5 h-5 rounded-lg border flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors ${
                      isChecked
                        ? "bg-[#059669] border-[#059669] text-white"
                        : "border-slate-300 dark:border-slate-600"
                    }`}
                  >
                    {isChecked && <Check className="w-3.5 h-3.5" />}
                  </div>

                  <div>
                    <h4
                      className={`text-sm sm:text-base font-black tracking-tight ${
                        isChecked
                          ? "line-through text-slate-400"
                          : "text-slate-900 dark:text-white"
                      }`}
                    >
                      {isHindi ? item.titleHi : item.titleEn}
                    </h4>
                    <span className="text-[10px] font-bold text-slate-400 block mt-0.2">
                      {isHindi ? item.categoryNameHi : item.categoryNameEn}
                    </span>
                  </div>
                </div>

                <span
                  className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                    isChecked
                      ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-500"
                  }`}
                >
                  {isChecked ? (isHindi ? "खरीदा गया" : "Bought") : isHindi ? "बाजार लिस्ट" : "In List"}
                </span>
              </div>

              {/* Avoid vs Swap Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3 text-xs">
                {/* ❌ Avoid */}
                <div
                  className={`p-3 rounded-2xl border ${
                    isDark ? "bg-red-950/20 border-red-900/40 text-red-200" : "bg-red-50/70 border-red-200 text-red-900"
                  }`}
                >
                  <span className="font-extrabold text-[10px] uppercase tracking-wider text-red-600 dark:text-red-400 block">
                    ❌ {isHindi ? "क्या खरीदने से बचें:" : "Avoid Buying:"}
                  </span>
                  <p className="font-bold mt-1 text-slate-900 dark:text-white">
                    {isHindi ? item.avoidItemHi : item.avoidItemEn}
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                    {isHindi ? item.avoidReasonHi : item.avoidReasonEn}
                  </p>
                </div>

                {/* ✅ Clean Swap */}
                <div
                  className={`p-3 rounded-2xl border ${
                    isDark
                      ? "bg-emerald-950/20 border-emerald-900/40 text-emerald-200"
                      : "bg-emerald-50/70 border-emerald-200 text-emerald-950"
                  }`}
                >
                  <span className="font-extrabold text-[10px] uppercase tracking-wider text-[#059669] dark:text-[#34D399] block">
                    ✅ {isHindi ? "सुरक्षित विकल्प (Clean Swap):" : "Clean Swap To Buy:"}
                  </span>
                  <p className="font-bold mt-1 text-slate-900 dark:text-white">
                    {isHindi ? item.cleanSwapHi : item.cleanSwapEn}
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                    {isHindi ? item.smartTipHi : item.smartTipEn}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
