# Quiet Prayers: בנייה בענן (GitHub + Codemagic) – צעד אחר צעד

הכול מוכן בתיקייה הזו (`quiet_prayers_native`): יש כבר `.gitignore`, `codemagic.yaml`,
תיקיית `docs` עם מדיניות הפרטיות ודף התמיכה, וחתימת release ב-Gradle שקוראת את המפתח מ-Codemagic.
מה שנשאר דורש חשבונות אישיים שלך (אני לא יכול לפתוח אותם בשבילך).

## שלב 1 – חשבון GitHub והעלאת הקוד (חינם)
1. פתח חשבון ב-https://github.com/signup (אפשר עם ifirsov21@gmail.com).
2. צור מאגר חדש: https://github.com/new → Repository name: `quiet-prayers` → Public (צריך Public כדי ש-GitHub Pages יהיה חינמי) → **בלי** README (יש לנו) → Create.
3. בטרמינל, בתוך התיקייה הזו (הקומיט הראשון כבר קיים מקומית):
   ```
   git remote add origin https://github.com/<שם-המשתמש-שלך>/quiet-prayers.git
   git push -u origin main
   ```
   בפעם הראשונה ייפתח חלון התחברות של GitHub (Git Credential Manager) – התחבר ואשר.

## שלב 2 – מדיניות פרטיות בכתובת ציבורית (GitHub Pages, חינם)
1. במאגר ב-GitHub: Settings → Pages → Build and deployment → Source: *Deploy from a branch* → Branch: `main`, Folder: `/docs` → Save.
2. אחרי כדקה הדפים יהיו זמינים ב:
   - מדיניות פרטיות: `https://vania365.github.io/quiet-prayers/privacy_policy.html`
   - דף תמיכה: `https://vania365.github.io/quiet-prayers/`
3. הכנס את שתי הכתובות ב-`quiet_prayers_store/store_listing.md` וב-Play Console (App content → Privacy policy).

## שלב 3 – Codemagic (חינם: 500 דקות בנייה בחודש)
1. הירשם ב-https://codemagic.io/signup עם החשבון של GitHub ("Sign up with GitHub").
2. Add application → GitHub → בחר `quiet-prayers` → Project type: *Capacitor* (או "Other" – בכל מקרה יש `codemagic.yaml`).
3. **בנייה לבדיקה (APK):** Start new build → Workflow: `Android test APK` → Start. בסיום מורידים את ה-APK (Artifacts) ושולחים לטלפון אנדרואיד להתקנה (צריך לאשר "התקנה ממקורות לא ידועים").
4. **מפתח חתימה ל-Google Play:** Teams → Personal team → Code signing identities → Android keystores → *Generate key* (או Upload) → Reference name: `quiet_prayers_keystore` (בדיוק כך – זה השם ב-codemagic.yaml) → שמור. חשוב: הורד את קובץ ה-keystore ושמור גיבוי שלו + הסיסמאות במקום בטוח. בלי המפתח הזה אי אפשר לעדכן את האפליקציה בעתיד.
5. **בנייה ל-Google Play (AAB):** Start new build → Workflow: `Android release (Google Play .aab)` → Start → הורד את `app-release.aab`.
6. ב-Play Console: Testing → Internal testing → Create new release → העלה את ה-AAB → ממלאים את "App content" (privacy policy, data safety: לא אוספים כלום, ads: no, target audience: 18+) → Review → Rollout. אחר כך Closed testing עם 12 בודקים ל-14 יום (דרישה לחשבון אישי חדש) לפני Production.

## שלב 4 – iOS (רק אחרי רכישת Apple Developer, 99$ לשנה)
1. ב-App Store Connect: Users and Access → Integrations → App Store Connect API → צור מפתח (Admin) והורד את ה-.p8.
2. ב-Codemagic: Teams → Integrations → App Store Connect → הוסף את המפתח בשם `quiet_prayers_asc` (השם ב-codemagic.yaml).
3. Code signing identities → iOS → "Fetch/Generate" certificates & profiles דרך ה-API key (Codemagic עושה את זה אוטומטית ב-workflow: `xcode-project use-profiles`).
4. צור את האפליקציה ב-App Store Connect (Bundle ID `com.quietprayers.daily`), ואז Start new build → `iOS App Store build` → ה-build עולה ל-TestFlight.

## עדכון גרסה בעתיד
1. עורכים את האפליקציה ב-`../quiet_prayers_app`.
2. בתיקייה הזו: `npm run web` (מעתיק ל-www) → `git add -A` → `git commit -m "..."` → `git push`.
3. מעלים את `versionCode` (+1) ו-`versionName` ב-`android/app/build.gradle` (ול-iOS: `ios/App/App.xcodeproj` – CURRENT_PROJECT_VERSION ו-MARKETING_VERSION) לפני בנייה חדשה.
4. Codemagic → Start new build.
