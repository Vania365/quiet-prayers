/* Pray with Me Plus: configuration. Edit this file only.
   1) RevenueCat public SDK keys (RevenueCat dashboard -> Project -> API keys). The Android key starts with "goog_", the iOS key with "appl_".
      While a key is still the placeholder below, the Plus screen shows the prices from PLANS and purchases say "coming soon".
   2) Product ids must match Google Play / App Store Connect AND the RevenueCat offering "default":
      plus_monthly (subscription), plus_yearly (subscription, 7-day free trial), plus_lifetime (one-time, in-app product).
   3) Free tier: FREE_DAILY prayers in "For you" per day and FREE_PER_TAB in each category tab. */
window.PLUS_CONFIG = {
  REVENUECAT_ANDROID_KEY: "goog_REPLACE_ME",
  REVENUECAT_IOS_KEY: "appl_REPLACE_ME",
  ENTITLEMENT: "plus",
  PLANS: {
    yearly:   { id: "plus_yearly",   price: "$24.99", perMonth: "$2.08", trialDays: 7 },
    monthly:  { id: "plus_monthly",  price: "$3.99" },
    lifetime: { id: "plus_lifetime", price: "$39.99" }
  },
  FULL_DAYS: 3,                            // first days after install: everything open (a taste of Plus), then the free tier below
  FREE_DAILY: 3,
  FREE_PER_TAB: 2,
  FREE_TABS: ["saved", "people"],          // never gated
  TRIAL_REMINDER_DAYS_BEFORE: 2,
  SUPPORT_EMAIL: "ifirsov21@gmail.com",
  // "Arthur prays your name": POST {name, forWhom, from, note, ts} as JSON to this URL (Google Apps Script / Form).
  // Empty = the app opens an email to SUPPORT_EMAIL instead.
  NAMES_ENDPOINT: "",
  TERMS_URL: "https://vania365.github.io/quiet-prayers/",
  PRIVACY_URL: "https://vania365.github.io/quiet-prayers/privacy_policy.html",
  PLAY_URL: "https://play.google.com/store/apps/details?id=com.quietprayers.daily"
};
