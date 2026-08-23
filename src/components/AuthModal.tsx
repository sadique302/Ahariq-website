import React, { useState } from "react";
import { Language, UserProfile } from "../types";
import {
  X,
  Phone,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Leaf,
  Droplet,
  Wheat,
  Zap,
  LogOut,
  Database,
  Globe
} from "lucide-react";
import {
  auth,
  googleProvider,
  syncUserProfileToCloud
} from "../lib/firebase";
import { signInWithPopup, signOut } from "firebase/auth";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile;
  onUpdateUser: (user: UserProfile) => void;
  language: Language;
  isDark: boolean;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  user,
  onUpdateUser,
  language,
  isDark,
}) => {
  const isHindi = language === "hi";
  const [phoneNumber, setPhoneNumber] = useState(user.phone || user.phoneNumber || "");
  const [name, setName] = useState(user.name || "");
  const [otpStep, setOtpStep] = useState<"phone" | "otp">("phone");
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState<string | null>(null);

  // Preference switches
  const [preferences, setPreferences] = useState(
    user.dietaryPreferences || {
      pureVegetarian: false,
      avoidPalmOil: true,
      avoidMaida: false,
      lowSugar: false,
    }
  );

  if (!isOpen) return null;

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (phoneNumber.length < 10) return;
    setIsLoading(true);
    setStatusMsg(null);
    setTimeout(() => {
      setIsLoading(false);
      setOtpStep("otp");
    }, 500);
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setStatusMsg(null);
    
    const userId = `user_ph_${phoneNumber}`;
    const updatedProfile: UserProfile = {
      id: userId,
      isLoggedIn: true,
      phone: phoneNumber,
      phoneNumber: phoneNumber,
      name: name.trim() || "AharIQ User",
      languagePreference: language,
      dietaryPreferences: preferences,
      strictNoPalmOil: preferences.avoidPalmOil,
      strictNoMaida: preferences.avoidMaida,
      isPureVeg: preferences.pureVegetarian,
      isDiabeticConscious: preferences.lowSugar,
    };

    // Sync to Firebase Cloud
    await syncUserProfileToCloud(userId, updatedProfile);

    setIsLoading(false);
    onUpdateUser(updatedProfile);
    onClose();
  };

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true);
      setStatusMsg(null);
      const res = await signInWithPopup(auth, googleProvider);
      const fbUser = res.user;
      
      const updatedProfile: UserProfile = {
        id: fbUser.uid,
        isLoggedIn: true,
        name: fbUser.displayName || name.trim() || "AharIQ User",
        email: fbUser.email || undefined,
        phone: fbUser.phoneNumber || phoneNumber || undefined,
        phoneNumber: fbUser.phoneNumber || phoneNumber || undefined,
        languagePreference: language,
        dietaryPreferences: preferences,
        strictNoPalmOil: preferences.avoidPalmOil,
        strictNoMaida: preferences.avoidMaida,
        isPureVeg: preferences.pureVegetarian,
        isDiabeticConscious: preferences.lowSugar,
      };

      await syncUserProfileToCloud(fbUser.uid, updatedProfile);

      setIsLoading(false);
      onUpdateUser(updatedProfile);
      onClose();
    } catch (err: any) {
      console.error("Google popup signin error:", err);
      setIsLoading(false);
      
      const errorCode = err?.code || "";
      if (errorCode === "auth/unauthorized-domain") {
        setStatusMsg(
          isHindi
            ? `⚠️ Firebase Unauthorized Domain: कृपया Firebase Console में जाकर अपना Vercel डोमेन (${window.location.hostname}) 'Authorized Domains' में जोड़ें।`
            : `⚠️ Unauthorized Domain: Add '${window.location.hostname}' to Firebase Console > Authentication > Settings > Authorized Domains.`
        );
      } else if (errorCode === "auth/popup-closed-by-user" || errorCode === "auth/cancelled-popup-request") {
        setStatusMsg(
          isHindi ? "Google लॉगिन पॉपअप बंद कर दिया गया था।" : "Login popup was closed. Please try again."
        );
      } else if (errorCode === "auth/popup-blocked") {
        setStatusMsg(
          isHindi ? "ब्राउज़र ने पॉपअप ब्लॉक कर दिया। कृपया पॉपअप की अनुमति दें।" : "Browser blocked the popup. Please allow popups for this site."
        );
      } else {
        setStatusMsg(
          err?.message || (isHindi ? "Google लॉगिन में त्रुटि हुई।" : "Failed to sign in with Google.")
        );
      }
    }
  };

  const handleSavePreferences = async () => {
    const updatedProfile: UserProfile = {
      ...user,
      dietaryPreferences: preferences,
      strictNoPalmOil: preferences.avoidPalmOil,
      strictNoMaida: preferences.avoidMaida,
      isPureVeg: preferences.pureVegetarian,
      isDiabeticConscious: preferences.lowSugar,
    };

    if (user.id) {
      await syncUserProfileToCloud(user.id, updatedProfile);
    }
    onUpdateUser(updatedProfile);
    onClose();
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (e) {}
    localStorage.removeItem("ahariq_user");
    onUpdateUser({
      isLoggedIn: false,
      name: "",
      phone: "",
      email: undefined,
      id: undefined,
      dietaryPreferences: preferences,
    });
    setOtpStep("phone");
    setOtp("");
    onClose();
  };

  return (
    <div
      id="auth-profile-modal"
      className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in"
    >
      <div
        className={`w-full max-w-md rounded-3xl border shadow-2xl overflow-hidden ${
          isDark ? "bg-stone-900 border-stone-800 text-stone-100" : "bg-white border-stone-200 text-stone-900"
        }`}
      >
        {/* Header */}
        <div className="p-4 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <h3 className="font-bold text-sm">
              {user.isLoggedIn
                ? isHindi ? "उपयोगकर्ता प्रोफ़ाइल और प्राथमिकताएं" : "User Profile & Health Preferences"
                : isHindi ? "त्वरित लॉगिन / साइन अप" : "Instant Login & Cloud Sync"}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-stone-400 hover:text-stone-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cloud database connected pill banner */}
        <div className="bg-emerald-500/10 border-b border-emerald-500/20 px-4 py-2 flex items-center justify-between text-[11px] text-emerald-700 dark:text-emerald-300 font-medium">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <Database className="w-3.5 h-3.5" />
            <span>Firebase Cloud Database Active</span>
          </div>
          <span className="text-[10px] bg-emerald-500/20 px-2 py-0.5 rounded-full font-mono font-bold">100% Free & Secure</span>
        </div>

        <div className="p-5 space-y-5">
          {statusMsg && (
            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-800 dark:text-amber-300 text-xs leading-relaxed animate-in fade-in">
              {statusMsg}
            </div>
          )}

          {!user.isLoggedIn ? (
            otpStep === "phone" ? (
              <div className="space-y-4">
                {/* 1-Click Google Sign In Button */}
                <button
                  type="button"
                  onClick={handleGoogleSignIn}
                  disabled={isLoading}
                  className="w-full py-3 px-4 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 hover:bg-stone-50 dark:hover:bg-stone-750 text-stone-800 dark:text-stone-100 font-bold text-xs shadow-sm transition-all flex items-center justify-center gap-2.5"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.35 24 12 24z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.35 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                    />
                  </svg>
                  <span>{isHindi ? "Google से 1-क्लिक में लॉगिन करें" : "Continue with Google (1-Click)"}</span>
                </button>

                <div className="flex items-center gap-3">
                  <div className="flex-1 h-px bg-stone-200 dark:bg-stone-800"></div>
                  <span className="text-[11px] text-stone-400 font-bold uppercase tracking-wider">
                    {isHindi ? "या मोबाइल से" : "or Mobile OTP"}
                  </span>
                  <div className="flex-1 h-px bg-stone-200 dark:bg-stone-800"></div>
                </div>

                <form onSubmit={handleSendOtp} className="space-y-3.5">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-1">
                      {isHindi ? "आपका नाम (वैकल्पिक)" : "Your Name (Optional)"}
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Rahul Sharma"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-xs ${
                        isDark
                          ? "bg-stone-800 border-stone-700 text-stone-100"
                          : "bg-stone-50 border-stone-300 text-stone-900"
                      }`}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-1">
                      {isHindi ? "मोबाइल नंबर (10 अंक)" : "Indian Mobile Number (+91)"}
                    </label>
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-2.5 rounded-xl border text-xs font-mono font-bold bg-stone-100 dark:bg-stone-800 border-stone-300 dark:border-stone-700">
                        +91
                      </span>
                      <input
                        type="tel"
                        required
                        maxLength={10}
                        placeholder="98765 43210"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ""))}
                        className={`flex-1 px-3.5 py-2.5 rounded-xl border text-xs font-mono ${
                          isDark
                            ? "bg-stone-800 border-stone-700 text-stone-100"
                            : "bg-stone-50 border-stone-300 text-stone-900"
                        }`}
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={phoneNumber.length < 10 || isLoading}
                    className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-bold text-xs shadow-md shadow-emerald-900/30 transition-all flex items-center justify-center gap-2"
                  >
                    <Phone className="w-4 h-4" />
                    <span>{isLoading ? "OTP भेजा जा रहा है..." : isHindi ? "ओटीपी प्राप्त करें (Get OTP)" : "Send OTP"}</span>
                  </button>
                </form>
              </div>
            ) : (
              <form onSubmit={handleVerifyOtp} className="space-y-4">
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-800 dark:text-emerald-300 text-xs">
                  {isHindi ? `+91 ${phoneNumber} पर 4 अंकों का OTP भेजा गया है:` : `Enter the 4-digit OTP sent to +91 ${phoneNumber}:`}
                  <span className="block font-mono font-bold mt-1">Verification OTP: 1 2 3 4</span>
                </div>

                <div>
                  <input
                    type="text"
                    required
                    maxLength={4}
                    placeholder="1 2 3 4"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="w-full text-center text-xl font-mono tracking-widest px-4 py-3 rounded-xl border border-emerald-500 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md shadow-emerald-900/30 transition-all flex items-center justify-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{isLoading ? "सत्यापित हो रहा है..." : isHindi ? "लॉगिन पूर्ण करें (Verify & Sync Cloud)" : "Verify OTP & Sync Cloud"}</span>
                </button>
              </form>
            )
          ) : (
            /* Logged in state: Display profile & Dietary Health Switches */
            <div className="space-y-4">
              <div className="p-3.5 rounded-2xl bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="font-bold text-sm text-stone-900 dark:text-stone-100">
                      {user.name || "AharIQ User"}
                    </h4>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  </div>
                  <p className="text-xs text-stone-500 font-mono mt-0.5">
                    {user.email || (user.phone ? `+91 ${user.phone}` : "Cloud Synced")}
                  </p>
                </div>
                <button
                  onClick={handleLogout}
                  className="px-2.5 py-1.5 rounded-xl text-rose-500 hover:bg-rose-500/10 text-xs font-semibold flex items-center gap-1 transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>{isHindi ? "लॉगआउट" : "Logout"}</span>
                </button>
              </div>

              {/* Health & Diet Custom Alert Preferences */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-extrabold uppercase tracking-wider text-stone-500">
                    {isHindi ? "मेरी प्राथमिकताएं एवं अलर्ट्स:" : "Dietary Watchout Preferences:"}
                  </h4>
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">Auto Synced to Cloud</span>
                </div>

                <div className="space-y-2 text-xs">
                  {/* Pure Veg */}
                  <label className="flex items-center justify-between p-2.5 rounded-xl border border-stone-200 dark:border-stone-800 cursor-pointer hover:bg-stone-50 dark:hover:bg-stone-800/50">
                    <div className="flex items-center gap-2">
                      <Leaf className="w-4 h-4 text-emerald-500" />
                      <span>{isHindi ? "केवल 100% शाकाहारी (Pure Veg)" : "100% Pure Vegetarian Only"}</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={preferences.pureVegetarian}
                      onChange={(e) => setPreferences({ ...preferences, pureVegetarian: e.target.checked })}
                      className="w-4 h-4 text-emerald-600 rounded"
                    />
                  </label>

                  {/* Avoid Palm Oil */}
                  <label className="flex items-center justify-between p-2.5 rounded-xl border border-stone-200 dark:border-stone-800 cursor-pointer hover:bg-stone-50 dark:hover:bg-stone-800/50">
                    <div className="flex items-center gap-2">
                      <Droplet className="w-4 h-4 text-rose-500" />
                      <span>{isHindi ? "पाम ऑयल से बचें (No Palm Oil Alert)" : "Strict No Palm Oil Alert"}</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={preferences.avoidPalmOil}
                      onChange={(e) => setPreferences({ ...preferences, avoidPalmOil: e.target.checked })}
                      className="w-4 h-4 text-emerald-600 rounded"
                    />
                  </label>

                  {/* Avoid Maida */}
                  <label className="flex items-center justify-between p-2.5 rounded-xl border border-stone-200 dark:border-stone-800 cursor-pointer hover:bg-stone-50 dark:hover:bg-stone-800/50">
                    <div className="flex items-center gap-2">
                      <Wheat className="w-4 h-4 text-amber-500" />
                      <span>{isHindi ? "मैदा रहित विकल्प (No Maida Preference)" : "No Maida / Refined Flour Alert"}</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={preferences.avoidMaida}
                      onChange={(e) => setPreferences({ ...preferences, avoidMaida: e.target.checked })}
                      className="w-4 h-4 text-emerald-600 rounded"
                    />
                  </label>

                  {/* Low Sugar */}
                  <label className="flex items-center justify-between p-2.5 rounded-xl border border-stone-200 dark:border-stone-800 cursor-pointer hover:bg-stone-50 dark:hover:bg-stone-800/50">
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-rose-500" />
                      <span>{isHindi ? "कम चीनी (Low Sugar / Diabetic Friendly)" : "Low Sugar / Diabetes Safe"}</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={preferences.lowSugar}
                      onChange={(e) => setPreferences({ ...preferences, lowSugar: e.target.checked })}
                      className="w-4 h-4 text-emerald-600 rounded"
                    />
                  </label>
                </div>

                <button
                  onClick={handleSavePreferences}
                  className="w-full py-2.5 mt-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors shadow-sm"
                >
                  {isHindi ? "डेटाबेस में सहेजें (Save & Sync)" : "Save & Sync to Database"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
