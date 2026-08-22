import React, { useState, useEffect } from "react";
import {
  Users,
  Activity,
  BookmarkCheck,
  RefreshCw,
  ShieldCheck,
  Search,
  Calendar,
  Mail,
  Smartphone,
  CheckCircle2,
  XCircle,
  Database,
  ExternalLink,
  ChevronRight,
  TrendingUp,
} from "lucide-react";
import { fetchRealAdminStatsFromCloud } from "../lib/firebase";
import { Language } from "../types";

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  isDark: boolean;
  adminEmail: string;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  isOpen,
  onClose,
  language,
  isDark,
  adminEmail,
}) => {
  const isHindi = language === "hi";
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<{
    totalUsers: number;
    users: any[];
    totalScans: number;
    recentScans: any[];
    totalSaved: number;
    savedItems: any[];
    error?: string;
  }>({
    totalUsers: 0,
    users: [],
    totalScans: 0,
    recentScans: [],
    totalSaved: 0,
    savedItems: [],
  });

  const [activeSubTab, setActiveSubTab] = useState<"overview" | "users" | "scans">("overview");
  const [searchFilter, setSearchFilter] = useState("");

  const loadData = async () => {
    setLoading(true);
    const data = await fetchRealAdminStatsFromCloud();
    setStats(data);
    setLoading(false);
  };

  useEffect(() => {
    if (isOpen) {
      loadData();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const filteredUsers = stats.users.filter(
    (u) =>
      (u.name && u.name.toLowerCase().includes(searchFilter.toLowerCase())) ||
      (u.email && u.email.toLowerCase().includes(searchFilter.toLowerCase())) ||
      (u.phoneNumber && u.phoneNumber.includes(searchFilter))
  );

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-5 bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className={`w-full max-w-4xl max-h-[90vh] rounded-3xl border shadow-2xl flex flex-col overflow-hidden ${
          isDark
            ? "bg-zinc-900 border-zinc-700/80 text-zinc-100"
            : "bg-white border-stone-200 text-stone-900"
        }`}
      >
        {/* Top Header */}
        <div className="p-4 sm:p-5 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between gap-3 bg-gradient-to-r from-emerald-500/10 via-transparent to-transparent">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-black shadow-md">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-black tracking-tight">
                  {isHindi ? "AharIQ ओनर व एडमिन लाइव एनालिटिक्स" : "AharIQ Live Founder & Admin Panel"}
                </h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                  REAL-TIME CLOUD
                </span>
              </div>
              <p className="text-xs text-stone-500 dark:text-zinc-400 mt-0.5">
                Authenticated Owner: <span className="font-semibold text-emerald-600 dark:text-emerald-400">{adminEmail}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              id="admin-refresh-stats-btn"
              onClick={loadData}
              disabled={loading}
              className={`p-2 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                isDark
                  ? "bg-zinc-800 border-zinc-700 hover:bg-zinc-700 text-zinc-200"
                  : "bg-stone-100 border-stone-200 hover:bg-stone-200 text-stone-800"
              }`}
            >
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
              <span className="hidden sm:inline">{isHindi ? "रिफ्रेश करें" : "Refresh"}</span>
            </button>
            <button
              id="admin-close-modal-btn"
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-zinc-200 dark:bg-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-700 flex items-center justify-center font-bold text-sm cursor-pointer"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Navigation Sub-Tabs */}
        <div className="flex border-b border-zinc-200 dark:border-zinc-800 px-4 sm:px-6 pt-2 bg-stone-50 dark:bg-zinc-900/60">
          <button
            onClick={() => setActiveSubTab("overview")}
            className={`px-4 py-2.5 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer ${
              activeSubTab === "overview"
                ? "border-emerald-500 text-emerald-600 dark:text-emerald-400"
                : "border-transparent text-stone-500 hover:text-stone-800 dark:text-zinc-400"
            }`}
          >
            📊 {isHindi ? "लाइव ओवरव्यू" : "Live Overview"}
          </button>
          <button
            onClick={() => setActiveSubTab("users")}
            className={`px-4 py-2.5 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
              activeSubTab === "users"
                ? "border-emerald-500 text-emerald-600 dark:text-emerald-400"
                : "border-transparent text-stone-500 hover:text-stone-800 dark:text-zinc-400"
            }`}
          >
            👥 {isHindi ? "यूजर लिस्ट" : "Registered Users"} ({stats.totalUsers})
          </button>
          <button
            onClick={() => setActiveSubTab("scans")}
            className={`px-4 py-2.5 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
              activeSubTab === "scans"
                ? "border-emerald-500 text-emerald-600 dark:text-emerald-400"
                : "border-transparent text-stone-500 hover:text-stone-800 dark:text-zinc-400"
            }`}
          >
            ⚡ {isHindi ? "स्कैन हिस्ट्री फीड" : "Live Scan Feed"} ({stats.totalScans})
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {stats.error && (
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-900 dark:text-amber-300 text-xs space-y-1">
              <p className="font-bold">⚠️ Firestore Database Notice:</p>
              <p>{stats.error}</p>
              <p className="text-[11px] text-stone-500 dark:text-zinc-400 mt-1">
                {isHindi
                  ? "यदि आप Vercel पर कस्टम Firebase का उपयोग कर रहे हैं, तो सुनिश्चित करें कि Firebase Console में Cloud Firestore Database बना हुआ है और Rules में read/write की अनुमति है।"
                  : "If you are using custom Firebase keys on Vercel, ensure Cloud Firestore Database is initialized in Firebase Console and Security Rules allow read/write."}
              </p>
            </div>
          )}

          {loading ? (
            <div className="py-16 text-center space-y-3">
              <div className="w-10 h-10 border-3 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="text-sm font-semibold text-stone-500">
                {isHindi ? "Firebase क्लाउड से लाइव डेटा लोड हो रहा है..." : "Connecting to Firestore live records..."}
              </p>
            </div>
          ) : activeSubTab === "overview" ? (
            <div className="space-y-6">
              {/* Metric Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                <div
                  className={`p-4 rounded-2xl border ${
                    isDark ? "bg-zinc-800/60 border-zinc-700/60" : "bg-emerald-50/70 border-emerald-200"
                  }`}
                >
                  <div className="flex items-center justify-between text-emerald-600 dark:text-emerald-400">
                    <span className="text-xs font-bold uppercase tracking-wider">
                      {isHindi ? "कुल रजिस्टर्ड यूज़र्स" : "Total Users"}
                    </span>
                    <Users className="w-5 h-5" />
                  </div>
                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="text-2xl sm:text-3xl font-black">{stats.totalUsers}</span>
                    <span className="text-xs text-emerald-600 font-semibold">Live in Firebase</span>
                  </div>
                  <p className="text-[11px] text-stone-500 dark:text-zinc-400 mt-1">
                    {isHindi ? "Google और Mobile से जुड़े असली यूज़र्स" : "Real accounts in 'users' Firestore collection"}
                  </p>
                </div>

                <div
                  className={`p-4 rounded-2xl border ${
                    isDark ? "bg-zinc-800/60 border-zinc-700/60" : "bg-amber-50/70 border-amber-200"
                  }`}
                >
                  <div className="flex items-center justify-between text-amber-600 dark:text-amber-400">
                    <span className="text-xs font-bold uppercase tracking-wider">
                      {isHindi ? "कुल लाइव स्कैन" : "Total Scans"}
                    </span>
                    <Activity className="w-5 h-5" />
                  </div>
                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="text-2xl sm:text-3xl font-black">{stats.totalScans}</span>
                    <span className="text-xs text-amber-600 font-semibold">Real AI Scans</span>
                  </div>
                  <p className="text-[11px] text-stone-500 dark:text-zinc-400 mt-1">
                    {isHindi ? "यूज़र्स द्वारा स्कैन किए गए पैकेज्ड फूड" : "Packaged items scanned by community"}
                  </p>
                </div>

                <div
                  className={`p-4 rounded-2xl border ${
                    isDark ? "bg-zinc-800/60 border-zinc-700/60" : "bg-blue-50/70 border-blue-200"
                  }`}
                >
                  <div className="flex items-center justify-between text-blue-600 dark:text-blue-400">
                    <span className="text-xs font-bold uppercase tracking-wider">
                      {isHindi ? "सेव किए प्रोडक्ट्स" : "Saved Bookmarks"}
                    </span>
                    <BookmarkCheck className="w-5 h-5" />
                  </div>
                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="text-2xl sm:text-3xl font-black">{stats.totalSaved}</span>
                    <span className="text-xs text-blue-600 font-semibold">Active Sync</span>
                  </div>
                  <p className="text-[11px] text-stone-500 dark:text-zinc-400 mt-1">
                    {isHindi ? "यूज़र्स के पसंदीदा सुरक्षित प्रोडक्ट्स" : "Saved healthy items in 'saved_items' collection"}
                  </p>
                </div>
              </div>

              {/* Database & Cloud Connection Status */}
              <div
                className={`p-4 rounded-2xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                  isDark ? "bg-zinc-800/40 border-zinc-700/50" : "bg-stone-50 border-stone-200"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-600/20 text-emerald-600 flex items-center justify-center font-bold">
                    <Database className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold">
                      {isHindi ? "Google Cloud Firestore डेटाबेस एक्टिव" : "Google Cloud Firestore Engine Active"}
                    </h4>
                    <p className="text-[11px] text-stone-500 dark:text-zinc-400">
                      Project ID: <span className="font-mono text-emerald-600">steel-wonder-j40ks</span> | 100% Live Storage
                    </p>
                  </div>
                </div>

                <a
                  href="https://console.firebase.google.com"
                  target="_blank"
                  rel="noreferrer"
                  className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-sm"
                >
                  <span>{isHindi ? "Firebase कंसोल खोलें" : "Open Firebase Console"}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Recent 5 Scans Preview */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-sm">
                    {isHindi ? "हालिया लाइव एक्टिविटी (Live Activity)" : "Recent Cloud Activity"}
                  </h3>
                  <button
                    onClick={() => setActiveSubTab("scans")}
                    className="text-xs text-emerald-600 font-bold hover:underline"
                  >
                    {isHindi ? "सभी देखें →" : "View All →"}
                  </button>
                </div>

                {stats.recentScans.length === 0 ? (
                  <div className="p-6 text-center border rounded-2xl border-dashed border-zinc-300 dark:border-zinc-800 text-xs text-stone-500">
                    {isHindi ? "अभी तक कोई स्कैन रिकॉर्ड नहीं हुआ है। ऐप में कोई बारकोड स्कैन करें!" : "No scan logs found yet. Start scanning products in the app!"}
                  </div>
                ) : (
                  <div className="space-y-2">
                    {stats.recentScans.slice(0, 5).map((scan, idx) => (
                      <div
                        key={scan.id || idx}
                        className={`p-3 rounded-xl border flex items-center justify-between gap-3 text-xs ${
                          isDark ? "bg-zinc-800/50 border-zinc-700/50" : "bg-white border-stone-200"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-600 font-bold flex items-center justify-center text-[10px]">
                            {idx + 1}
                          </span>
                          <div>
                            <span className="font-bold block">{scan.productName || "Scanned Product"}</span>
                            <span className="text-[10px] text-stone-500 dark:text-zinc-400">
                              Brand: {scan.brand || "N/A"} • Barcode: {scan.barcode || "AI Vision"}
                            </span>
                          </div>
                        </div>

                        <div className="text-right">
                          <span
                            className={`inline-block px-2 py-0.5 rounded-full font-bold text-[10px] ${
                              scan.healthScore >= 70
                                ? "bg-emerald-500/20 text-emerald-600"
                                : scan.healthScore >= 40
                                ? "bg-amber-500/20 text-amber-600"
                                : "bg-red-500/20 text-red-600"
                            }`}
                          >
                            Score: {scan.healthScore}/100
                          </span>
                          <span className="block text-[10px] text-stone-400 mt-0.5">
                            {scan.scannedAt ? new Date(scan.scannedAt).toLocaleTimeString() : "Just now"}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ) : activeSubTab === "users" ? (
            <div className="space-y-4">
              {/* Search Bar */}
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                <input
                  type="text"
                  placeholder={isHindi ? "नाम, ईमेल या फोन नंबर से खोजें..." : "Search users by name, email, phone..."}
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                  className={`w-full pl-9 pr-4 py-2 rounded-xl text-xs border outline-none ${
                    isDark
                      ? "bg-zinc-800 border-zinc-700 text-white placeholder-zinc-500"
                      : "bg-stone-50 border-stone-300 text-stone-900 placeholder-stone-400"
                  }`}
                />
              </div>

              {filteredUsers.length === 0 ? (
                <div className="p-8 text-center border rounded-2xl border-dashed border-zinc-300 dark:border-zinc-800 text-xs text-stone-500">
                  {isHindi ? "कोई यूजर नहीं मिला।" : "No registered users found matching filter."}
                </div>
              ) : (
                <div className="space-y-2">
                  {filteredUsers.map((usr, i) => (
                    <div
                      key={usr.id || i}
                      className={`p-3.5 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs ${
                        isDark ? "bg-zinc-800/50 border-zinc-700/50" : "bg-white border-stone-200 shadow-xs"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center text-sm shadow-sm flex-shrink-0">
                          {(usr.name || "U")[0].toUpperCase()}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-sm text-stone-900 dark:text-stone-100">
                              {usr.name || "AharIQ Member"}
                            </span>
                            {usr.email === adminEmail && (
                              <span className="px-1.5 py-0.2 rounded-full text-[9px] font-extrabold bg-amber-500 text-white">
                                OWNER / ADMIN
                              </span>
                            )}
                          </div>
                          <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 text-[11px] text-stone-500 dark:text-zinc-400 mt-0.5">
                            {usr.email && (
                              <span className="flex items-center gap-1">
                                <Mail className="w-3 h-3 text-emerald-500" />
                                {usr.email}
                              </span>
                            )}
                            {usr.phoneNumber && (
                              <span className="flex items-center gap-1">
                                <Smartphone className="w-3 h-3 text-blue-500" />
                                {usr.phoneNumber}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Dietary Filters enabled by this user */}
                      <div className="flex flex-wrap items-center gap-1.5">
                        {usr.strictNoPalmOil && (
                          <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
                            No Palm Oil
                          </span>
                        )}
                        {usr.isPureVeg && (
                          <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-green-500/10 text-green-600 border border-green-500/20">
                            Pure Veg
                          </span>
                        )}
                        {usr.isDiabeticConscious && (
                          <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-purple-500/10 text-purple-600 border border-purple-500/20">
                            Diabetic Low Sugar
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            /* Scans Feed Tab */
            <div className="space-y-2">
              {stats.recentScans.length === 0 ? (
                <div className="p-8 text-center border rounded-2xl border-dashed border-zinc-300 dark:border-zinc-800 text-xs text-stone-500">
                  {isHindi ? "कोई स्कैन लॉग नहीं मिला।" : "No scan logs present in Firestore yet."}
                </div>
              ) : (
                stats.recentScans.map((scan, i) => (
                  <div
                    key={scan.id || i}
                    className={`p-3.5 rounded-2xl border flex items-center justify-between gap-3 text-xs ${
                      isDark ? "bg-zinc-800/50 border-zinc-700/50" : "bg-white border-stone-200"
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm">{scan.productName || "Product"}</span>
                        {scan.verdict && (
                          <span className="text-[10px] px-2 py-0.2 rounded-full bg-zinc-200 dark:bg-zinc-700 font-semibold">
                            {scan.verdict}
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-stone-500 dark:text-zinc-400 mt-0.5">
                        Brand: <span className="font-semibold text-stone-700 dark:text-stone-300">{scan.brand || "Generic"}</span> • Barcode: {scan.barcode || "AI Visual"}
                      </p>
                    </div>

                    <div className="text-right">
                      <span className="font-black text-sm text-emerald-600 block">
                        {scan.healthScore}/100
                      </span>
                      <span className="text-[10px] text-stone-400">
                        {scan.scannedAt ? new Date(scan.scannedAt).toLocaleDateString() : ""}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3.5 border-t border-zinc-200 dark:border-zinc-800 bg-stone-50 dark:bg-zinc-900/60 flex items-center justify-between text-xs text-stone-500">
          <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-bold">
            <CheckCircle2 className="w-4 h-4" /> 100% Real Production Database Connected
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-zinc-200 dark:bg-zinc-800 hover:bg-zinc-300 font-bold cursor-pointer"
          >
            {isHindi ? "बंद करें" : "Close"}
          </button>
        </div>
      </div>
    </div>
  );
};
