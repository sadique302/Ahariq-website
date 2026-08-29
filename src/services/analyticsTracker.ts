import {
  collection,
  addDoc,
  doc,
  setDoc,
  getDoc,
  getDocs,
  query,
  orderBy,
  limit,
} from "firebase/firestore";
import { db } from "../lib/firebase";
import { ActivityEventType, UserActivityEvent, UserProfile, UserSessionRecord } from "../types";

// Persistent Visitor/Device ID
export function getVisitorId(): string {
  try {
    const key = "ahariq_visitor_id";
    let id = localStorage.getItem(key);
    if (!id) {
      id = "vis_" + Math.random().toString(36).substring(2, 10) + "_" + Date.now().toString(36);
      localStorage.setItem(key, id);
    }
    return id;
  } catch (e) {
    return "vis_" + Math.random().toString(36).substring(2, 10);
  }
}

// Device Classifier
export function getDeviceType(): "Mobile" | "Desktop" | "Tablet" {
  if (typeof window === "undefined" || !navigator) return "Desktop";
  const ua = navigator.userAgent;
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    return "Tablet";
  }
  if (
    /Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/i.test(
      ua
    )
  ) {
    return "Mobile";
  }
  return "Desktop";
}

// Traffic Source & Campaign Detector
export interface TrafficSourceInfo {
  source: string; // "Instagram", "WhatsApp", "Google", "Twitter / X", "Facebook", "YouTube", "Direct", "Other"
  referrer: string;
  isInstagramInAppBrowser: boolean;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
}

export function detectTrafficSource(): TrafficSourceInfo {
  if (typeof window === "undefined") {
    return {
      source: "Direct",
      referrer: "Direct",
      isInstagramInAppBrowser: false,
    };
  }

  const ua = navigator.userAgent || "";
  const isInstagramInAppBrowser = ua.includes("Instagram");
  const referrer = document.referrer || "";
  
  // Parse URL Search Parameters for UTM
  let utmSource = "";
  let utmMedium = "";
  let utmCampaign = "";

  try {
    const urlParams = new URLSearchParams(window.location.search);
    utmSource = urlParams.get("utm_source") || "";
    utmMedium = urlParams.get("utm_medium") || "";
    utmCampaign = urlParams.get("utm_campaign") || "";
  } catch (e) {
    // Ignore URL parse error
  }

  let source = "Direct";

  if (isInstagramInAppBrowser || referrer.includes("instagram.com") || utmSource.toLowerCase().includes("instagram") || utmSource.toLowerCase().includes("ig")) {
    source = "Instagram";
  } else if (referrer.includes("whatsapp") || utmSource.toLowerCase().includes("whatsapp")) {
    source = "WhatsApp";
  } else if (referrer.includes("google.") || utmMedium.toLowerCase().includes("organic") || utmSource.toLowerCase().includes("google")) {
    source = "Google / Search";
  } else if (referrer.includes("t.co") || referrer.includes("twitter.com") || referrer.includes("x.com") || utmSource.toLowerCase().includes("twitter")) {
    source = "Twitter / X";
  } else if (referrer.includes("facebook.com") || referrer.includes("fb.com") || ua.includes("FBAN") || ua.includes("FBAV")) {
    source = "Facebook";
  } else if (referrer.includes("youtube.com") || referrer.includes("youtu.be")) {
    source = "YouTube";
  } else if (referrer.includes("linkedin.com")) {
    source = "LinkedIn";
  } else if (referrer.length > 0) {
    try {
      const refHost = new URL(referrer).hostname;
      source = refHost ? `Web (${refHost})` : "Referral";
    } catch {
      source = "Referral";
    }
  }

  return {
    source,
    referrer: referrer || (isInstagramInAppBrowser ? "Instagram In-App Browser" : "Direct / Bio Link"),
    isInstagramInAppBrowser,
    utmSource: utmSource || undefined,
    utmMedium: utmMedium || undefined,
    utmCampaign: utmCampaign || undefined,
  };
}

// Location / Geo Detection Helper (Cached in localStorage for instant speed)
export interface GeoLocationInfo {
  country?: string;
  countryCode?: string;
  city?: string;
  region?: string;
  timezone?: string;
  browserLanguage?: string;
}

let cachedGeo: GeoLocationInfo | null = null;

export async function detectGeoLocation(): Promise<GeoLocationInfo> {
  const browserLanguage = typeof navigator !== "undefined" ? navigator.language : "en-IN";
  let timezone = "Asia/Kolkata";
  try {
    timezone = Intl.DateTimeFormat().resolvedOptions().timeZone || "Asia/Kolkata";
  } catch (e) {}

  // Check in-memory or localStorage cache first
  if (cachedGeo) return cachedGeo;

  try {
    const local = localStorage.getItem("ahariq_geo_cache");
    if (local) {
      const parsed = JSON.parse(local);
      if (parsed && parsed.country) {
        cachedGeo = parsed;
        return parsed;
      }
    }
  } catch (e) {}

  // Fallback defaults based on timezone / browser
  const defaultGeo: GeoLocationInfo = {
    country: timezone.includes("Kolkata") || timezone.includes("Calcutta") || browserLanguage.includes("IN") ? "India" : "Global",
    countryCode: timezone.includes("Kolkata") || browserLanguage.includes("IN") ? "IN" : "GL",
    city: timezone.includes("Kolkata") ? "India" : "",
    region: "",
    timezone,
    browserLanguage,
  };

  // Asynchronously fetch accurate City/Country without blocking
  try {
    fetch("https://ipwho.is/")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.success !== false && data.country) {
          const freshGeo: GeoLocationInfo = {
            country: data.country || "India",
            countryCode: data.country_code || "IN",
            city: data.city || "",
            region: data.region || "",
            timezone: data.timezone?.id || timezone,
            browserLanguage,
          };
          cachedGeo = freshGeo;
          try {
            localStorage.setItem("ahariq_geo_cache", JSON.stringify(freshGeo));
          } catch (e) {}
        }
      })
      .catch(() => {});
  } catch (e) {}

  cachedGeo = defaultGeo;
  return defaultGeo;
}

// Global cached session state
let sessionStartTime = Date.now();
let actionCount = 0;
let recentSearchesList: string[] = [];
let recentProductsList: string[] = [];
let actionsTrailList: string[] = [];

/**
 * Log a granular user activity into Firestore `user_activities` and update `user_sessions`
 */
export async function trackUserActivity(params: {
  eventType: ActivityEventType;
  title: string;
  details?: Record<string, any>;
  user?: UserProfile | null;
}) {
  try {
    const visitorId = getVisitorId();
    const now = new Date();
    const nowIso = now.toISOString();
    const deviceType = getDeviceType();
    const traffic = detectTrafficSource();
    const geo = cachedGeo || {
      country: "India",
      countryCode: "IN",
      timezone: "Asia/Kolkata",
      browserLanguage: navigator.language,
    };

    const isLoggedIn = !!(params.user && params.user.isLoggedIn);
    const userId = params.user?.id || visitorId;
    const userName = params.user?.name || (isLoggedIn ? "Registered User" : "Guest Visitor");
    const userEmail = params.user?.email || "";

    actionCount++;

    // Track search query or product name in local session cache
    if (params.eventType === "SEARCH" && params.details?.query) {
      const q = String(params.details.query).trim();
      if (q && !recentSearchesList.includes(q)) {
        recentSearchesList = [q, ...recentSearchesList.slice(0, 9)];
      }
    }
    if (params.eventType === "PRODUCT_VIEW" && params.details?.productName) {
      const p = String(params.details.productName).trim();
      if (p && !recentProductsList.includes(p)) {
        recentProductsList = [p, ...recentProductsList.slice(0, 9)];
      }
    }

    // Append to actions trail (max 15 steps)
    const trailItem = `${params.title} (${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })})`;
    actionsTrailList = [trailItem, ...actionsTrailList.slice(0, 14)];

    const activityData: UserActivityEvent = {
      visitorId,
      userId,
      userName,
      userEmail,
      isLoggedIn,
      eventType: params.eventType,
      title: params.title,
      details: params.details || {},
      deviceType,
      trafficSource: traffic.source,
      country: geo.country || "India",
      city: geo.city || "",
      timestamp: nowIso,
      createdAt: nowIso,
    };

    // 1. Add to `user_activities` collection (fire and forget safely)
    const actCol = collection(db, "user_activities");
    addDoc(actCol, activityData).catch((err) => {
      console.warn("Analytics activity log fallback:", err?.message || err);
    });

    // 2. Compute Engagement Status
    const durationSeconds = Math.max(1, Math.round((Date.now() - sessionStartTime) / 1000));
    let engagementStatus: "Bounced" | "Browsing" | "Engaged" = "Browsing";
    if (durationSeconds < 15 && actionCount <= 1) {
      engagementStatus = "Bounced";
    } else if (durationSeconds > 60 || actionCount >= 3) {
      engagementStatus = "Engaged";
    }

    // 3. Upsert / update `user_sessions/{visitorId}` document
    const sessionDocRef = doc(db, "user_sessions", visitorId);
    const sessionPayload: Partial<UserSessionRecord> = {
      id: visitorId,
      visitorId,
      userId,
      userName,
      userEmail,
      isLoggedIn,
      deviceType,
      lastActiveAt: nowIso,
      durationSeconds,
      totalActions: actionCount,
      lastAction: params.title,
      trafficSource: traffic.source,
      referrerUrl: traffic.referrer,
      utmSource: traffic.utmSource,
      utmMedium: traffic.utmMedium,
      utmCampaign: traffic.utmCampaign,
      isInstagramInAppBrowser: traffic.isInstagramInAppBrowser,
      country: geo.country || "India",
      countryCode: geo.countryCode || "IN",
      city: geo.city || "",
      region: geo.region || "",
      timezone: geo.timezone || "Asia/Kolkata",
      browserLanguage: geo.browserLanguage || navigator.language,
      engagementStatus,
      actionsTrail: actionsTrailList,
      recentSearches: recentSearchesList,
      recentProductsViewed: recentProductsList,
    };

    // Merge session document
    setDoc(sessionDocRef, sessionPayload, { merge: true }).catch((err) => {
      console.warn("Analytics session update fallback:", err?.message || err);
    });
  } catch (err) {
    console.warn("Analytics tracking error:", err);
  }
}

/**
 * Initialize session tracking on app start
 */
export function initSessionTracker(user?: UserProfile | null) {
  const visitorId = getVisitorId();
  const nowIso = new Date().toISOString();
  const sessionDocRef = doc(db, "user_sessions", visitorId);
  const traffic = detectTrafficSource();
  
  // Kick off non-blocking Geo detection
  detectGeoLocation().then((geo) => {
    // Initial activity log with source and location
    trackUserActivity({
      eventType: "APP_VISIT",
      title: traffic.source === "Instagram" 
        ? "Visitor opened from Instagram bio/story link"
        : user?.isLoggedIn 
        ? `User ${user.name || "Logged In"} opened app` 
        : `New Visitor opened app (${traffic.source})`,
      details: { 
        referrer: traffic.referrer, 
        source: traffic.source,
        isInstagramInAppBrowser: traffic.isInstagramInAppBrowser,
        country: geo.country,
        city: geo.city,
      },
      user,
    });
  });

  // Set initial session start if not already existing
  getDoc(sessionDocRef)
    .then((snap) => {
      const geo = cachedGeo || { country: "India", countryCode: "IN" };
      if (!snap.exists()) {
        const initialSession: UserSessionRecord = {
          id: visitorId,
          visitorId,
          userId: user?.id || visitorId,
          userName: user?.name || "Guest Visitor",
          userEmail: user?.email || "",
          isLoggedIn: !!user?.isLoggedIn,
          deviceType: getDeviceType(),
          startedAt: nowIso,
          lastActiveAt: nowIso,
          durationSeconds: 1,
          totalActions: 1,
          lastAction: traffic.source === "Instagram" ? "Arrived from Instagram" : "App Opened",
          trafficSource: traffic.source,
          referrerUrl: traffic.referrer,
          utmSource: traffic.utmSource,
          utmMedium: traffic.utmMedium,
          utmCampaign: traffic.utmCampaign,
          isInstagramInAppBrowser: traffic.isInstagramInAppBrowser,
          country: geo.country || "India",
          countryCode: geo.countryCode || "IN",
          engagementStatus: "Browsing",
          actionsTrail: [`Arrived via ${traffic.source}`],
          recentSearches: [],
          recentProductsViewed: [],
        };
        setDoc(sessionDocRef, initialSession, { merge: true }).catch(() => {});
      } else {
        // Update started session with fresh source info if new visit
        setDoc(
          sessionDocRef,
          {
            lastActiveAt: nowIso,
            isLoggedIn: !!user?.isLoggedIn,
            userName: user?.name || snap.data()?.userName || "Guest Visitor",
            userEmail: user?.email || snap.data()?.userEmail || "",
            trafficSource: snap.data()?.trafficSource || traffic.source,
            referrerUrl: snap.data()?.referrerUrl || traffic.referrer,
          },
          { merge: true }
        ).catch(() => {});
      }
    })
    .catch(() => {});

  // Keep session duration updated every 30 seconds while active
  const interval = setInterval(() => {
    const durationSeconds = Math.max(1, Math.round((Date.now() - sessionStartTime) / 1000));
    let engagementStatus: "Bounced" | "Browsing" | "Engaged" = "Browsing";
    if (durationSeconds < 15 && actionCount <= 1) {
      engagementStatus = "Bounced";
    } else if (durationSeconds > 60 || actionCount >= 3) {
      engagementStatus = "Engaged";
    }

    setDoc(
      sessionDocRef,
      {
        lastActiveAt: new Date().toISOString(),
        durationSeconds,
        engagementStatus,
      },
      { merge: true }
    ).catch(() => {});
  }, 30000);

  // Track tab leave / visibility change
  const handleVisibilityChange = () => {
    if (document.visibilityState === "hidden") {
      const durationSeconds = Math.max(1, Math.round((Date.now() - sessionStartTime) / 1000));
      let engagementStatus: "Bounced" | "Browsing" | "Engaged" = "Browsing";
      if (durationSeconds < 15 && actionCount <= 1) {
        engagementStatus = "Bounced";
      } else if (durationSeconds > 60 || actionCount >= 3) {
        engagementStatus = "Engaged";
      }

      setDoc(
        sessionDocRef,
        {
          lastActiveAt: new Date().toISOString(),
          durationSeconds,
          lastAction: "App Closed / Left Screen",
          engagementStatus,
        },
        { merge: true }
      ).catch(() => {});
    }
  };

  document.addEventListener("visibilitychange", handleVisibilityChange);

  return () => {
    clearInterval(interval);
    document.removeEventListener("visibilitychange", handleVisibilityChange);
  };
}

/**
 * Fetch detailed live telemetry & user analytics for Founder / Admin Dashboard
 */
export async function fetchLiveTelemetryStats() {
  try {
    // 1. Fetch latest 150 activities
    const actCol = collection(db, "user_activities");
    let activities: UserActivityEvent[] = [];
    try {
      const qAct = query(actCol, orderBy("timestamp", "desc"), limit(150));
      const snapAct = await getDocs(qAct);
      snapAct.forEach((d) => {
        activities.push({ id: d.id, ...(d.data() as any) });
      });
    } catch (e) {
      // Fallback if index is building
      const snapAct = await getDocs(query(actCol, limit(150)));
      snapAct.forEach((d) => {
        activities.push({ id: d.id, ...(d.data() as any) });
      });
      activities.sort(
        (a, b) => new Date(b.timestamp || 0).getTime() - new Date(a.timestamp || 0).getTime()
      );
    }

    // 2. Fetch visitor sessions
    const sessCol = collection(db, "user_sessions");
    let sessions: UserSessionRecord[] = [];
    try {
      const qSess = query(sessCol, orderBy("lastActiveAt", "desc"), limit(150));
      const snapSess = await getDocs(qSess);
      snapSess.forEach((d) => {
        sessions.push({ id: d.id, ...(d.data() as any) });
      });
    } catch (e) {
      const snapSess = await getDocs(query(sessCol, limit(150)));
      snapSess.forEach((d) => {
        sessions.push({ id: d.id, ...(d.data() as any) });
      });
      sessions.sort(
        (a, b) => new Date(b.lastActiveAt || 0).getTime() - new Date(a.lastActiveAt || 0).getTime()
      );
    }

    // 3. Compute Top Searches
    const searchCounts: Record<string, number> = {};
    activities.forEach((act) => {
      if (act.eventType === "SEARCH" && act.details?.query) {
        const q = String(act.details.query).trim().toLowerCase();
        if (q) searchCounts[q] = (searchCounts[q] || 0) + 1;
      }
    });
    const topSearches = Object.entries(searchCounts)
      .map(([query, count]) => ({ query, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    // 4. Compute Top Viewed Products
    const productViewCounts: Record<string, { count: number; score?: number; brand?: string }> = {};
    activities.forEach((act) => {
      if (act.eventType === "PRODUCT_VIEW" && act.details?.productName) {
        const name = String(act.details.productName).trim();
        if (name) {
          if (!productViewCounts[name]) {
            productViewCounts[name] = {
              count: 0,
              score: act.details.healthScore,
              brand: act.details.brand,
            };
          }
          productViewCounts[name].count += 1;
        }
      }
    });
    const topProducts = Object.entries(productViewCounts)
      .map(([name, info]) => ({ name, ...info }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    // 5. Traffic Source Breakdown
    const trafficSourcesCount: Record<string, number> = {};
    sessions.forEach((s) => {
      const src = s.trafficSource || "Direct";
      trafficSourcesCount[src] = (trafficSourcesCount[src] || 0) + 1;
    });

    // 6. Country & City Breakdown
    const countryCounts: Record<string, number> = {};
    const cityCounts: Record<string, number> = {};
    sessions.forEach((s) => {
      const c = s.country || "India";
      countryCounts[c] = (countryCounts[c] || 0) + 1;
      if (s.city) {
        cityCounts[s.city] = (cityCounts[s.city] || 0) + 1;
      }
    });

    // 7. Instagram Visitors Specific Count
    const instagramSessions = sessions.filter(
      (s) => s.trafficSource === "Instagram" || s.isInstagramInAppBrowser || (s.referrerUrl && s.referrerUrl.toLowerCase().includes("instagram"))
    );

    // 8. Active Users Breakdown & Bounce Metrics
    const loggedInSessions = sessions.filter((s) => s.isLoggedIn).length;
    const guestSessions = sessions.length - loggedInSessions;
    const bouncedSessions = sessions.filter((s) => s.engagementStatus === "Bounced" || ((s.durationSeconds || 0) < 15 && (s.totalActions || 1) <= 1)).length;
    const engagedSessions = sessions.filter((s) => s.engagementStatus === "Engaged" || ((s.durationSeconds || 0) >= 45) || (s.totalActions || 1) >= 3).length;

    const totalActions = sessions.reduce((acc, s) => acc + (s.totalActions || 1), 0);
    const avgDuration =
      sessions.length > 0
        ? Math.round(
            sessions.reduce((acc, s) => acc + (s.durationSeconds || 0), 0) / sessions.length
          )
        : 0;

    return {
      activities,
      sessions,
      topSearches,
      topProducts,
      totalSessions: sessions.length,
      loggedInSessions,
      guestSessions,
      bouncedSessions,
      engagedSessions,
      trafficSourcesCount,
      countryCounts,
      cityCounts,
      instagramSessionsCount: instagramSessions.length,
      totalActions,
      avgDuration,
    };
  } catch (err: any) {
    console.warn("fetchLiveTelemetryStats error:", err);
    return {
      activities: [],
      sessions: [],
      topSearches: [],
      topProducts: [],
      totalSessions: 0,
      loggedInSessions: 0,
      guestSessions: 0,
      bouncedSessions: 0,
      engagedSessions: 0,
      trafficSourcesCount: {},
      countryCounts: {},
      cityCounts: {},
      instagramSessionsCount: 0,
      totalActions: 0,
      avgDuration: 0,
    };
  }
}
