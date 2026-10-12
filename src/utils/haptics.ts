/**
 * Native Haptic Feedback & Touch Vibration Utility
 * Provides native vibration sensation on mobile devices for buttons, tabs, scans, and cards.
 */

export const triggerHaptic = (type: 'light' | 'medium' | 'heavy' | 'success' | 'warning' = 'light') => {
  if (typeof window === 'undefined' || !('navigator' in window) || !('vibrate' in navigator)) {
    return;
  }

  try {
    switch (type) {
      case 'light':
        navigator.vibrate(10); // subtle tap (tabs, toggles)
        break;
      case 'medium':
        navigator.vibrate(25); // button click, modal open
        break;
      case 'heavy':
        navigator.vibrate(45); // critical action, delete, clear
        break;
      case 'success':
        navigator.vibrate([15, 30, 20]); // double tap on scan found or save
        break;
      case 'warning':
        navigator.vibrate([30, 40, 30]); // harmful ingredient detected
        break;
      default:
        navigator.vibrate(12);
    }
  } catch (e) {
    // Ignore if permission denied or unsupported in browser
  }
};
