import React, { useState, useEffect, useMemo } from "react";
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
  ScanLine,
  Eye,
  Volume2,
  LogIn,
  Layers,
  Clock,
  Laptop,
  Radio,
  Filter,
  BarChart3,
  Flame,
  ArrowRight
} from "lucide-react";
import {
  fetchRealAdminStatsFromCloud,
  fetchLiveUserActivities,
  fetchLiveUserSessions,
  listenToLiveUserActivities,
} from "../lib/firebase";
import { Language, UserActivityEvent, UserSessionRecord, ActivityEventType } from "../types";

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
    totalContributions?: number;
    contributions?: any[];
    error?: string;
  }>({
    totalUsers: 0,
    users: [],
    totalScans: 0,
    recentScans: [],
    totalSaved: 0,
    savedItems: [],
    totalContributions: 0,
    contributions: [],
  });

  const [activities, setActivities] = useState<UserActivityEvent[]>([]);
  const [sessions, setSessions] = useState<UserSessionRecord[]>([]);
  const [activeSubTab, setActiveSubTab] = useState<"overview" | "activities" | "sessions" | "searches" | "users" | "contributions">("activities");
  const [searchFilter, setSearchFilter] = useState("");
  const [selectedEventType, setSelectedEventType] = useState<string>("ALL");
  const [selectedSessionVisitor, setSelectedSessionVisitor] = useState<string | null>(null);

  const loadData = async () => {
    setLoading(true);
    try {
      const [adminData, actsData, sessData] = await Promise.all([
        fetchRealAdminStatsFromCloud(),
        fetchLiveUserActivities(120),
        fetchLiveUserSessions(100),
      ]);
      setStats(adminData);
      setActivities(actsData);
      setSessions(sessData);
    } catch (e) {
      console.warn("Load admin stats warning:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      loadData();
      // Attach realtime live stream listener
      const unsub = listenToLiveUserActivities((liveActs) => {
        if (liveActs && liveActs.length > 0) {
          setActivities(liveActs);
        }
      });
      return () => {
        if (unsub) unsub();
      };
    }
  }, [isOpen]);

  // Aggregate Top Search Queries
  const topSearches = useMemo(() => {
    const counts: Record<string, { query: string; count: number; lastSearched: string }> = {};
    activities.forEach((act) => {
      if (act.eventType === "SEARCH" && act.details?.query) {
        const q = String(act.details.query).trim().toLowerCase();
        if (q) {
          if (!counts[q]) {
            counts[q] = { query: act.details.query, count: 0, lastSearched: act.createdAt };
          }
          counts[q].count += 1;
        }
      }
    });
    return Object.values(counts).sort((a, b) => b.count - a.count);
  }, [activities]);

  // Aggregate Top Viewed Products
  const topProducts = useMemo(() => {
    const counts: Record<string, { name: string; brand?: string; count: number; healthScore?: number }> = {};
    activities.forEach((act) => {
      if (act.eventType === "PRODUCT_VIEW" && act.details?.productName) {
        const name = String(act.details.productName);
        if (!counts[name]) {
          counts[name] = {
            name,
            brand: act.details.brand,
            count: 0,
            healthScore: act.details.healthScore,
          };
        }
        counts[name].count += 1;
      }
    });
    return Object.values(counts).sort((a, b) => b.count - a.count);
  }, [activities]);

  if (!isOpen) return null;

  // Filter activities
  const filteredActivities = activities.filter((act) => {
    const matchesType = selectedEventType === "ALL" || act.eventType === selectedEventType;
    const matchesVisitor = !selectedSessionVisitor || act.visitorId === selectedSessionVisitor;
    const matchesSearch =
      !searchFilter ||
      (act.title && act.title.toLowerCase().includes(searchFilter.toLowerCase())) ||
      (act.userName && act.userName.toLowerCase().includes(searchFilter.toLowerCase())) ||
      (act.userEmail && act.userEmail.toLowerCase().includes(searchFilter.toLowerCase())) ||
      (act.visitorId && act.visitorId.toLowerCase().includes(searchFilter.toLowerCase()));

    return matchesType && matchesVisitor && matchesSearch;
  });

  const filteredUsers = stats.users.filter(
    (u) =>
      (u.name && u.name.toLowerCase().includes(searchFilter.toLowerCase())) ||
      (u.email && u.email.toLowerCase().includes(searchFilter.toLowerCase())) ||
      (u.phoneNumber && u.phoneNumber.includes(searchFilter))
  );

  const getEventBadge = (type: ActivityEventType) => {
    switch (type) {
      case "SEARCH":
        return { bg: "bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/30", icon: Search, label: "Search" };
      case "PRODUCT_VIEW":
        return { bg: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30", icon: Eye, label: "Product View" };
      case "SCAN":
        return { bg: "bg-purple-500/15 text-purple-600 dark:text-purple-400 border-purple-500/30", icon: ScanLine, label: "Live Scan" };
      case "VOICE_LISTEN":
        return { bg: "bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30", icon: Volume2, label: "Voice Audio" };
      case "BOOKMARK":
        return { bg: "bg-pink-500/15 text-pink-600 dark:text-pink-400 border-pink-500/30", icon: BookmarkCheck, label: "Bookmark" };
      case "LOGIN":
        return { bg: "bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 border-indigo-500/30", icon: LogIn, label: "Login" };
      case "APP_VISIT":
        return { bg: "bg-teal-500/15 text-teal-600 dark:text-teal-400 border-teal-500/30", icon: Radio, label: "App Visit" };
      default:
        return { bg: "bg-zinc-500/15 text-zinc-600 dark:text-zinc-400 border-zinc-500/30", icon: Activity, label: "Action" };
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-5 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className={`w-full max-w-5xl max-h-[92vh] rounded-3xl border shadow-2xl flex flex-col overflow-hidden ${
          isDark
            ? "bg-[#121214] border-zinc-800 text-zinc-100"
            : "bg-white border-stone-200 text-stone-900"
        }`}
      >
        {/* Top Header */}
        <div className="p-4 sm:p-5 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between gap-3 bg-gradient-to-r from-emerald-500/10 via-transparent to-transparent">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-black shadow-lg shadow-emerald-600/20">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-black tracking-tight">
                  {isHindi ? "AharIQ स्टार्टअप व यूज़र ट्रैकिंग सेंटर" : "AharIQ Founder & Live Analytics Center"}
                </h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                  LIVE TELEMETRY
                </span>
              </div>
              <p className="text-xs text-stone-500 dark:text-zinc-400 mt-0.5">
                Owner Account: <span className="font-semibold text-emerald-600 dark:text-emerald-400">{adminEmail}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              id="admin-refresh-stats-btn"
              onClick={loadData}
              disabled={loading}
              className={`p-2 sm:px-3 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                isDark
                  ? "bg-zinc-800 border-zinc-700 hover:bg-zinc-700 text-zinc-200"
                  : "bg-stone-100 border-stone-200 hover:bg-stone-200 text-stone-800"
              }`}
            >
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
              <span className="hidden sm:inline">{isHindi ? "रिफ्रेश" : "Refresh"}</span>
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
        <div className="flex border-b border-zinc-200 dark:border-zinc-800 px-3 sm:px-6 pt-2 bg-stone-50 dark:bg-[#18181B] overflow-x-auto no-scrollbar gap-1">
          <button
            onClick={() => { setActiveSubTab("activities"); setSelectedSessionVisitor(null); }}
            className={`px-3.5 py-2.5 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeSubTab === "activities"
                ? "border-emerald-500 text-emerald-600 dark:text-emerald-400"
                : "border-transparent text-stone-500 hover:text-stone-800 dark:text-zinc-400"
            }`}
          >
            ⚡ {isHindi ? "लाइव यूज़र एक्टिविटी" : "Live Activity Feed"} ({activities.length})
          </button>

          <button
            onClick={() => setActiveSubTab("sessions")}
            className={`px-3.5 py-2.5 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeSubTab === "sessions"
                ? "border-emerald-500 text-emerald-600 dark:text-emerald-400"
                : "border-transparent text-stone-500 hover:text-stone-800 dark:text-zinc-400"
            }`}
          >
            🌐 {isHindi ? "विजिटर सेशन्स" : "Visitor Sessions"} ({sessions.length})
          </button>

          <button
            onClick={() => setActiveSubTab("searches")}
            className={`px-3.5 py-2.5 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeSubTab === "searches"
                ? "border-emerald-500 text-emerald-600 dark:text-emerald-400"
                : "border-transparent text-stone-500 hover:text-stone-800 dark:text-zinc-400"
            }`}
          >
            🔍 {isHindi ? "सर्च व ट्रेंडिंग इनसाइट्स" : "Search & Demand"} ({topSearches.length})
          </button>

          <button
            onClick={() => setActiveSubTab("overview")}
            className={`px-3.5 py-2.5 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeSubTab === "overview"
                ? "border-emerald-500 text-emerald-600 dark:text-emerald-400"
                : "border-transparent text-stone-500 hover:text-stone-800 dark:text-zinc-400"
            }`}
          >
            📊 {isHindi ? "ग्रोथ ओवरव्यू" : "Startup KPIs"}
          </button>

          <button
            onClick={() => setActiveSubTab("users")}
            className={`px-3.5 py-2.5 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeSubTab === "users"
                ? "border-emerald-500 text-emerald-600 dark:text-emerald-400"
                : "border-transparent text-stone-500 hover:text-stone-800 dark:text-zinc-400"
            }`}
          >
            👥 {isHindi ? "रजिस्टर्ड खाते" : "Users"} ({stats.totalUsers})
          </button>

          <button
            onClick={() => setActiveSubTab("contributions")}
            className={`px-3.5 py-2.5 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeSubTab === "contributions"
                ? "border-emerald-500 text-emerald-600 dark:text-emerald-400"
                : "border-transparent text-stone-500 hover:text-stone-800 dark:text-zinc-400"
            }`}
          >
            📸 {isHindi ? "कम्युनिटी फोटो" : "Crowdsource"} ({stats.totalContributions || 0})
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-6 space-y-4">
          {loading ? (
            <div className="py-20 text-center space-y-3">
              <div className="w-10 h-10 border-3 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="text-sm font-semibold text-stone-500">
                {isHindi ? "Firestore से लाइव यूज़र एक्टिविटी और सेशन्स लोड हो रहे हैं..." : "Connecting to Live User Activity Stream..."}
              </p>
            </div>
          ) : activeSubTab === "activities" ? (
            /* LIVE ACTIVITY FEED */
            <div className="space-y-4">
              {/* Event Filter Pills & Search */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
                <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
                  {[
                    { id: "ALL", label: "All Events", icon: Layers },
                    { id: "SEARCH", label: "Searches", icon: Search },
                    { id: "PRODUCT_VIEW", label: "Product Views", icon: Eye },
                    { id: "SCAN", label: "Scans", icon: ScanLine },
                    { id: "VOICE_LISTEN", label: "Voice", icon: Volume2 },
                    { id: "BOOKMARK", label: "Bookmarks", icon: BookmarkCheck },
                    { id: "LOGIN", label: "Logins", icon: LogIn },
                  ].map((filter) => {
                    const Icon = filter.icon;
                    const isSelected = selectedEventType === filter.id;
                    return (
                      <button
                        key={filter.id}
                        onClick={() => setSelectedEventType(filter.id)}
                        className={`px-2.5 py-1 rounded-xl text-xs font-bold border flex items-center gap-1 cursor-pointer transition-all ${
                          isSelected
                            ? "bg-emerald-600 border-emerald-600 text-white shadow-xs"
                            : "bg-zinc-100 dark:bg-zinc-800/80 border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:border-emerald-400"
                        }`}
                      >
                        <Icon className="w-3.5 h-3.5" />
                        <span>{filter.label}</span>
                      </button>
                    );
                  })}
                </div>

                <div className="relative min-w-[220px]">
                  <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
                  <input
                    type="text"
                    placeholder={isHindi ? "एक्टिविटी में खोजें..." : "Filter live activity..."}
                    value={searchFilter}
                    onChange={(e) => setSearchFilter(e.target.value)}
                    className={`w-full pl-8 pr-3 py-1.5 rounded-xl text-xs border outline-none ${
                      isDark
                        ? "bg-zinc-800 border-zinc-700 text-white placeholder-zinc-500"
                        : "bg-stone-50 border-stone-300 text-stone-900 placeholder-stone-400"
                    }`}
                  />
                </div>
              </div>

              {/* Active Visitor Filter Banner */}
              {selectedSessionVisitor && (
                <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between text-xs">
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                    Showing actions for visitor: <strong className="font-mono">{selectedSessionVisitor}</strong>
                  </span>
                  <button
                    onClick={() => setSelectedSessionVisitor(null)}
                    className="font-bold text-emerald-700 dark:text-emerald-300 underline cursor-pointer"
                  >
                    Clear Filter
                  </button>
                </div>
              )}

              {/* Activity Timeline List */}
              {filteredActivities.length === 0 ? (
                <div className="p-10 text-center border rounded-2xl border-dashed border-zinc-300 dark:border-zinc-800 text-xs text-stone-500 space-y-2">
                  <Activity className="w-8 h-8 mx-auto text-zinc-400" />
                  <p className="font-bold">
                    {isHindi ? "कोई एक्टिविटी इवेंट नहीं मिला।" : "No user events logged in this category yet."}
                  </p>
                  <p className="text-[11px] text-zinc-400">
                    {isHindi
                      ? "जब भी कोई यूजर ऐप खोलेगा, सर्च करेगा या प्रोडक्ट पर क्लिक करेगा, वह यहां तुरंत लाइव दिखाई देगा!"
                      : "When anyone opens the app, searches, or taps a product, events appear here in real-time."}
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  {filteredActivities.map((act) => {
                    const badge = getEventBadge(act.eventType);
                    const Icon = badge.icon;
                    const timeAgo = act.createdAt ? new Date(act.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }) : "Just now";
                    const isGuest = act.isGuest || !act.userEmail;

                    return (
                      <div
                        key={act.id}
                        className={`p-3 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs ${
                          isDark ? "bg-[#18181B] border-zinc-800/80 hover:border-zinc-700" : "bg-white border-stone-200 shadow-xs hover:border-emerald-200"
                        }`}
                      >
                        <div className="flex items-start sm:items-center gap-3">
                          <div className={`w-8 h-8 rounded-xl border flex items-center justify-center flex-shrink-0 ${badge.bg}`}>
                            <Icon className="w-4 h-4" />
                          </div>

                          <div>
                            <div className="flex flex-wrap items-center gap-1.5">
                              <span className="font-bold text-stone-900 dark:text-zinc-100">{act.title}</span>
                              <span className={`px-1.5 py-0.2 rounded-md text-[9px] font-bold border uppercase ${badge.bg}`}>
                                {badge.label}
                              </span>
                            </div>

                            <div className="flex flex-wrap items-center gap-x-2.5 gap-y-0.5 text-[11px] text-stone-500 dark:text-zinc-400 mt-0.5">
                              <span>
                                User: <strong className="text-stone-800 dark:text-zinc-300">{act.userName || (isGuest ? "Guest Visitor" : "AharIQ User")}</strong>
                              </span>
                              {act.userEmail && (
                                <span className="text-emerald-600 dark:text-emerald-400 font-mono">({act.userEmail})</span>
                              )}
                              <span className="font-mono text-[10px] text-zinc-400">Device: {act.deviceType || "mobile"}</span>
                              <button
                                onClick={() => setSelectedSessionVisitor(act.visitorId)}
                                className="text-[10px] font-mono text-zinc-500 hover:text-emerald-500 underline cursor-pointer"
                                title="Filter by this visitor session"
                              >
                                ID: {act.visitorId ? act.visitorId.slice(0, 12) + "..." : "dev"}
                              </button>
                            </div>
                          </div>
                        </div>

                        <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center border-t sm:border-t-0 pt-1.5 sm:pt-0 border-zinc-100 dark:border-zinc-800 flex-shrink-0">
                          <span className="font-mono text-[11px] text-stone-500 dark:text-zinc-400 font-medium">
                            {timeAgo}
                          </span>
                          {act.details?.healthScore !== undefined && (
                            <span className="text-[10px] font-extrabold text-emerald-600 dark:text-emerald-400">
                              Score: {act.details.healthScore}/100
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ) : activeSubTab === "sessions" ? (
            /* VISITOR SESSIONS SUMMARY */
            <div className="space-y-4">
              <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-xs flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-emerald-700 dark:text-emerald-300">
                    {isHindi ? "लाइव यूज़र सेशन्स व रिटेंशन" : "Live Device Sessions & User Retention"}
                  </h4>
                  <p className="text-stone-600 dark:text-zinc-400 text-[11px]">
                    {isHindi
                      ? "हर यूजर के कुल विज़िट, ऐप पर बिताया समय और किए गए एक्शन्स की पूरी ट्रैकिंग।"
                      : "Shows duration spent on app, device platform, total actions, and whether user logged in or browsed as guest."}
                  </p>
                </div>
                <span className="px-3 py-1 rounded-xl bg-emerald-600 text-white font-extrabold text-xs">
                  {sessions.length} Devices
                </span>
              </div>

              {sessions.length === 0 ? (
                <div className="p-8 text-center border rounded-2xl border-dashed border-zinc-300 dark:border-zinc-800 text-xs text-stone-500">
                  {isHindi ? "कोई एक्टिव सेशन नहीं मिला।" : "No session records stored yet."}
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {sessions.map((sess) => {
                    const durationMin = Math.round((sess.sessionDurationSeconds || 0) / 60);
                    const isGuest = sess.isGuest || !sess.userEmail;

                    return (
                      <div
                        key={sess.id}
                        className={`p-4 rounded-2xl border space-y-2.5 ${
                          isDark ? "bg-[#18181B] border-zinc-800" : "bg-white border-stone-200 shadow-xs"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-black text-sm text-stone-900 dark:text-white">
                                {sess.userName || (isGuest ? "Guest Explorer" : "Registered User")}
                              </span>
                              <span
                                className={`px-2 py-0.2 rounded-full text-[9px] font-bold ${
                                  isGuest
                                    ? "bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300"
                                    : "bg-emerald-500/20 text-emerald-600 font-extrabold"
                                }`}
                              >
                                {isGuest ? "GUEST" : "LOGGED IN"}
                              </span>
                            </div>
                            {sess.userEmail && (
                              <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-mono mt-0.5">
                                {sess.userEmail}
                              </p>
                            )}
                          </div>

                          <div className="text-right">
                            <span className="text-xs font-bold text-stone-800 dark:text-zinc-200 block">
                              {sess.totalActions || 1} Actions
                            </span>
                            <span className="text-[10px] text-stone-400 font-mono">
                              {durationMin > 0 ? `${durationMin}m on app` : `${sess.sessionDurationSeconds || 5}s`}
                            </span>
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center justify-between text-[11px] text-stone-500 dark:text-zinc-400 pt-2 border-t border-zinc-100 dark:border-zinc-800/80">
                          <span className="font-mono text-[10px]">
                            Visitor ID: {sess.visitorId ? sess.visitorId.slice(0, 10) + "..." : "dev"}
                          </span>
                          <button
                            onClick={() => {
                              setSelectedSessionVisitor(sess.visitorId);
                              setActiveSubTab("activities");
                            }}
                            className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-0.5 cursor-pointer"
                          >
                            <span>Inspect Actions</span>
                            <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ) : activeSubTab === "searches" ? (
            /* SEARCH & PRODUCT DEMAND INSIGHTS */
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Top Search Queries */}
                <div
                  className={`p-4 rounded-2xl border space-y-3 ${
                    isDark ? "bg-[#18181B] border-zinc-800" : "bg-white border-stone-200 shadow-xs"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <h4 className="font-black text-sm flex items-center gap-2">
                      <Search className="w-4 h-4 text-emerald-500" />
                      <span>{isHindi ? "सबसे ज्यादा सर्च किए गए शब्द (Top Searches)" : "Top User Search Queries"}</span>
                    </h4>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600">
                      LIVE DEMAND
                    </span>
                  </div>

                  {topSearches.length === 0 ? (
                    <p className="text-xs text-zinc-500 py-6 text-center">
                      {isHindi ? "अभी तक कोई सर्च क्वेरी लॉग नहीं हुई।" : "No search queries logged yet."}
                    </p>
                  ) : (
                    <div className="space-y-2">
                      {topSearches.slice(0, 10).map((s, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between p-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 text-xs"
                        >
                          <div className="flex items-center gap-2.5">
                            <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-600 font-black text-[10px] flex items-center justify-center">
                              {idx + 1}
                            </span>
                            <span className="font-bold text-stone-900 dark:text-zinc-100">{s.query}</span>
                          </div>
                          <span className="font-extrabold px-2 py-0.5 rounded-md bg-emerald-600 text-white text-[10px]">
                            {s.count} searches
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Most Viewed Products */}
                <div
                  className={`p-4 rounded-2xl border space-y-3 ${
                    isDark ? "bg-[#18181B] border-zinc-800" : "bg-white border-stone-200 shadow-xs"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <h4 className="font-black text-sm flex items-center gap-2">
                      <Eye className="w-4 h-4 text-blue-500" />
                      <span>{isHindi ? "सबसे ज्यादा देखे गए प्रोडक्ट्स (Most Clicked)" : "Most Clicked Products"}</span>
                    </h4>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-500/15 text-blue-600">
                      HIGH INTEREST
                    </span>
                  </div>

                  {topProducts.length === 0 ? (
                    <p className="text-xs text-zinc-500 py-6 text-center">
                      {isHindi ? "अभी तक कोई प्रोडक्ट क्लिक लॉग नहीं हुआ।" : "No product clicks logged yet."}
                    </p>
                  ) : (
                    <div className="space-y-2">
                      {topProducts.slice(0, 10).map((p, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between p-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 text-xs"
                        >
                          <div className="flex items-center gap-2.5">
                            <span className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-600 font-black text-[10px] flex items-center justify-center">
                              {idx + 1}
                            </span>
                            <div>
                              <span className="font-bold text-stone-900 dark:text-zinc-100 block">{p.name}</span>
                              {p.brand && <span className="text-[10px] text-stone-400">{p.brand}</span>}
                            </div>
                          </div>
                          <span className="font-extrabold px-2 py-0.5 rounded-md bg-blue-600 text-white text-[10px]">
                            {p.count} views
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : activeSubTab === "overview" ? (
            /* OVERVIEW TAB */
            <div className="space-y-6">
              {/* Metric Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div
                  className={`p-4 rounded-2xl border ${
                    isDark ? "bg-zinc-800/60 border-zinc-700/60" : "bg-emerald-50/70 border-emerald-200"
                  }`}
                >
                  <div className="flex items-center justify-between text-emerald-600 dark:text-emerald-400">
                    <span className="text-xs font-bold uppercase tracking-wider">
                      {isHindi ? "कुल यूज़र्स" : "Total Users"}
                    </span>
                    <Users className="w-5 h-5" />
                  </div>
                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="text-2xl sm:text-3xl font-black">{stats.totalUsers}</span>
                    <span className="text-xs text-emerald-600 font-semibold">Firebase</span>
                  </div>
                  <p className="text-[10px] text-stone-500 dark:text-zinc-400 mt-1">
                    Registered accounts
                  </p>
                </div>

                <div
                  className={`p-4 rounded-2xl border ${
                    isDark ? "bg-zinc-800/60 border-zinc-700/60" : "bg-blue-50/70 border-blue-200"
                  }`}
                >
                  <div className="flex items-center justify-between text-blue-600 dark:text-blue-400">
                    <span className="text-xs font-bold uppercase tracking-wider">
                      {isHindi ? "लाइव सेशन्स" : "Live Sessions"}
                    </span>
                    <Radio className="w-5 h-5" />
                  </div>
                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="text-2xl sm:text-3xl font-black">{sessions.length}</span>
                    <span className="text-xs text-blue-600 font-semibold">Devices</span>
                  </div>
                  <p className="text-[10px] text-stone-500 dark:text-zinc-400 mt-1">
                    Visitors tracked
                  </p>
                </div>

                <div
                  className={`p-4 rounded-2xl border ${
                    isDark ? "bg-zinc-800/60 border-zinc-700/60" : "bg-purple-50/70 border-purple-200"
                  }`}
                >
                  <div className="flex items-center justify-between text-purple-600 dark:text-purple-400">
                    <span className="text-xs font-bold uppercase tracking-wider">
                      {isHindi ? "कुल एक्टिविटीज" : "Total Events"}
                    </span>
                    <Activity className="w-5 h-5" />
                  </div>
                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="text-2xl sm:text-3xl font-black">{activities.length}</span>
                    <span className="text-xs text-purple-600 font-semibold">Logged</span>
                  </div>
                  <p className="text-[10px] text-stone-500 dark:text-zinc-400 mt-1">
                    Granular telemetry
                  </p>
                </div>

                <div
                  className={`p-4 rounded-2xl border ${
                    isDark ? "bg-zinc-800/60 border-zinc-700/60" : "bg-amber-50/70 border-amber-200"
                  }`}
                >
                  <div className="flex items-center justify-between text-amber-600 dark:text-amber-400">
                    <span className="text-xs font-bold uppercase tracking-wider">
                      {isHindi ? "कुल स्कैन" : "Total Scans"}
                    </span>
                    <ScanLine className="w-5 h-5" />
                  </div>
                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="text-2xl sm:text-3xl font-black">{stats.totalScans}</span>
                    <span className="text-xs text-amber-600 font-semibold">Audited</span>
                  </div>
                  <p className="text-[10px] text-stone-500 dark:text-zinc-400 mt-1">
                    Packaged food scans
                  </p>
                </div>
              </div>

              {/* Cloud Connection status banner */}
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
                      {isHindi ? "Google Cloud Firestore डेटाबेस 100% लाइव" : "Google Cloud Firestore Engine 100% Active"}
                    </h4>
                    <p className="text-[11px] text-stone-500 dark:text-zinc-400">
                      Project ID: <span className="font-mono text-emerald-600">steel-wonder-j40ks</span> | Collections: user_activities, user_sessions, users, scans
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
            </div>
          ) : activeSubTab === "users" ? (
            /* USERS TAB */
            <div className="space-y-4">
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
                            Low Sugar
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            /* CROWDSOURCED CONTRIBUTIONS TAB */
            <div className="space-y-3">
              {(!stats.contributions || stats.contributions.length === 0) ? (
                <div className="p-8 text-center border rounded-2xl border-dashed border-zinc-300 dark:border-zinc-800 text-xs text-stone-500 space-y-1.5">
                  <p className="font-bold">📸 {isHindi ? "अभी तक कोई कम्युनिटी प्रोडक्ट सबमिट नहीं हुआ।" : "No crowdsourced product contributions yet."}</p>
                </div>
              ) : (
                stats.contributions.map((c, i) => (
                  <div
                    key={c.id || i}
                    className={`p-4 rounded-2xl border space-y-3 ${
                      isDark ? "bg-zinc-800/50 border-zinc-700/50" : "bg-white border-stone-200 shadow-sm"
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-black text-sm text-stone-900 dark:text-white">
                            {c.productName || "Product"}
                          </h4>
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
                            {c.status || "Verified"}
                          </span>
                        </div>
                        <p className="text-[11px] text-stone-500 dark:text-zinc-400 mt-0.5">
                          Brand: <span className="font-semibold text-stone-700 dark:text-zinc-200">{c.brand || "Indian Brand"}</span> • Barcode: <span className="font-mono text-emerald-600">{c.barcode}</span>
                        </p>
                      </div>

                      <div className="text-right text-[11px] text-stone-500 dark:text-zinc-400">
                        <span>Submitted by: <strong className="text-stone-800 dark:text-zinc-200">{c.submittedBy || "Community User"}</strong></span>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2 pt-1 border-t border-zinc-200 dark:border-zinc-800/60">
                      <div className="rounded-xl overflow-hidden bg-zinc-900 border border-zinc-700/50 flex flex-col">
                        <div className="p-1 text-[10px] font-bold text-center bg-zinc-800 text-zinc-300">
                          1. Front Pack
                        </div>
                        <div className="h-24 sm:h-28 flex items-center justify-center bg-black/40">
                          {c.frontPhotoUrl ? (
                            <img
                              src={c.frontPhotoUrl}
                              alt="Front"
                              className="w-full h-full object-cover cursor-pointer hover:scale-105 transition-transform"
                              onClick={() => window.open(c.frontPhotoUrl, "_blank")}
                            />
                          ) : (
                            <span className="text-[10px] text-zinc-500">No Photo</span>
                          )}
                        </div>
                      </div>

                      <div className="rounded-xl overflow-hidden bg-zinc-900 border border-zinc-700/50 flex flex-col">
                        <div className="p-1 text-[10px] font-bold text-center bg-zinc-800 text-zinc-300">
                          2. Ingredients
                        </div>
                        <div className="h-24 sm:h-28 flex items-center justify-center bg-black/40">
                          {c.ingredientsPhotoUrl ? (
                            <img
                              src={c.ingredientsPhotoUrl}
                              alt="Ingredients"
                              className="w-full h-full object-cover cursor-pointer hover:scale-105 transition-transform"
                              onClick={() => window.open(c.ingredientsPhotoUrl, "_blank")}
                            />
                          ) : (
                            <span className="text-[10px] text-zinc-500">No Photo</span>
                          )}
                        </div>
                      </div>

                      <div className="rounded-xl overflow-hidden bg-zinc-900 border border-zinc-700/50 flex flex-col">
                        <div className="p-1 text-[10px] font-bold text-center bg-zinc-800 text-zinc-300">
                          3. Nutrition Table
                        </div>
                        <div className="h-24 sm:h-28 flex items-center justify-center bg-black/40">
                          {c.nutritionPhotoUrl ? (
                            <img
                              src={c.nutritionPhotoUrl}
                              alt="Nutrition"
                              className="w-full h-full object-cover cursor-pointer hover:scale-105 transition-transform"
                              onClick={() => window.open(c.nutritionPhotoUrl, "_blank")}
                            />
                          ) : (
                            <span className="text-[10px] text-zinc-500">No Photo</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3.5 border-t border-zinc-200 dark:border-zinc-800 bg-stone-50 dark:bg-[#18181B] flex items-center justify-between text-xs text-stone-500">
          <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-bold">
            <CheckCircle2 className="w-4 h-4" /> Live Firestore Connected ({activities.length} events active)
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-zinc-200 dark:bg-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-700 font-bold cursor-pointer transition-colors"
          >
            {isHindi ? "बंद करें" : "Close"}
          </button>
        </div>
      </div>
    </div>
  );
};
