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

// Global cached session state
let sessionStartTime = Date.now();
let lastActivityLoggedAt = 0;
let actionCount = 0;
let recentSearchesList: string[] = [];
let recentProductsList: string[] = [];

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
      timestamp: nowIso,
      createdAt: nowIso,
    };

    // 1. Add to `user_activities` collection (fire and forget safely)
    const actCol = collection(db, "user_activities");
    addDoc(actCol, activityData).catch((err) => {
      console.warn("Analytics activity log fallback:", err?.message || err);
    });

    // 2. Upsert / update `user_sessions/{visitorId}` document
    const durationSeconds = Math.max(1, Math.round((Date.now() - sessionStartTime) / 1000));
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

  // Set initial session start if not already existing
  getDoc(sessionDocRef)
    .then((snap) => {
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
          lastAction: "App Opened",
          recentSearches: [],
          recentProductsViewed: [],
        };
        setDoc(sessionDocRef, initialSession, { merge: true }).catch(() => {});
      } else {
        // Update started session
        setDoc(
          sessionDocRef,
          {
            lastActiveAt: nowIso,
            isLoggedIn: !!user?.isLoggedIn,
            userName: user?.name || snap.data()?.userName || "Guest Visitor",
            userEmail: user?.email || snap.data()?.userEmail || "",
          },
          { merge: true }
        ).catch(() => {});
      }
    })
    .catch(() => {});

  // Log initial visit event
  trackUserActivity({
    eventType: "APP_VISIT",
    title: user?.isLoggedIn ? `User ${user.name || "Logged In"} opened app` : "New Guest Visitor opened app",
    details: { referrer: document.referrer || "Direct", screen: "Home" },
    user,
  });

  // Keep session duration updated every 45 seconds while active
  const interval = setInterval(() => {
    const durationSeconds = Math.max(1, Math.round((Date.now() - sessionStartTime) / 1000));
    setDoc(
      sessionDocRef,
      {
        lastActiveAt: new Date().toISOString(),
        durationSeconds,
      },
      { merge: true }
    ).catch(() => {});
  }, 45000);

  // Track tab leave / visibility change
  const handleVisibilityChange = () => {
    if (document.visibilityState === "hidden") {
      const durationSeconds = Math.max(1, Math.round((Date.now() - sessionStartTime) / 1000));
      setDoc(
        sessionDocRef,
        {
          lastActiveAt: new Date().toISOString(),
          durationSeconds,
          lastAction: "App Closed / Inactive",
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
    // 1. Fetch latest 100 activities
    const actCol = collection(db, "user_activities");
    let activities: UserActivityEvent[] = [];
    try {
      const qAct = query(actCol, orderBy("timestamp", "desc"), limit(100));
      const snapAct = await getDocs(qAct);
      snapAct.forEach((d) => {
        activities.push({ id: d.id, ...(d.data() as any) });
      });
    } catch (e) {
      // Fallback if index is building
      const snapAct = await getDocs(query(actCol, limit(100)));
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
      const qSess = query(sessCol, orderBy("lastActiveAt", "desc"), limit(100));
      const snapSess = await getDocs(qSess);
      snapSess.forEach((d) => {
        sessions.push({ id: d.id, ...(d.data() as any) });
      });
    } catch (e) {
      const snapSess = await getDocs(query(sessCol, limit(100)));
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

    // 5. Active Users Breakdown
    const loggedInSessions = sessions.filter((s) => s.isLoggedIn).length;
    const guestSessions = sessions.length - loggedInSessions;
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
      totalActions: 0,
      avgDuration: 0,
    };
  }
}
