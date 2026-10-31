# Pray with Me Plus (v1.1): מה צריך להקים כדי שהרכישות יעבדו

הקוד באפליקציה מוכן (`www/plus.js`, `www/plus_config.js`). עד שמכניסים מפתח RevenueCat אמיתי, מסך ה-Plus מציג את המחירים מהקובץ, וכפתור הרכישה אומר "not available yet". **אין להעלות את v1.1 ל-Play לפני שלבים 1–4.**

## 1. מוצרים ב-Google Play Console (Monetize → Products)
צריך שלושה מוצרים, בדיוק עם המזהים האלה:

| סוג | Product ID | Base plan / פרטים | מחיר |
|---|---|---|---|
| Subscription | `plus_yearly` | base plan `yearly` (P1Y, auto-renew) + **Offer: Free trial 7 days** (eligibility: new customer) | 24.99 USD |
| Subscription | `plus_monthly` | base plan `monthly` (P1M, auto-renew) | 3.99 USD |
| In-app product (one-time) | `plus_lifetime` | non-consumable | 39.99 USD |

שם לתצוגה: "Pray with Me Plus (Yearly / Monthly / Lifetime)". להפעיל (Activate) כל אחד.
Play מחייב שיהיה release עם billing permission לפני שאפשר ליצור מוצרים. ה-AAB של v1.1 (עם הפלאגין) חייב להיות מועלה לפחות ל-Internal testing קודם. לכן הסדר: build v1.1 → upload internal → create products → test.

## 2. פרויקט RevenueCat (app.revenuecat.com, חינם עד 2,500$ הכנסה חודשית)
1. New project "Pray with Me" → Add app → Google Play, package `com.quietprayers.daily`.
2. להעלות Service Account JSON מ-Google Cloud (ההוראות בתוך RevenueCat: Play Console → Setup → API access). בלי זה RevenueCat לא רואה את הרכישות.
3. Products → Import מ-Play (או ידנית): `plus_yearly`, `plus_monthly`, `plus_lifetime`.
4. Entitlements → New: identifier **`plus`** → לצרף אליו את שלושת המוצרים.
5. Offerings → `default` → Packages: `$rc_annual` → plus_yearly, `$rc_monthly` → plus_monthly, `$rc_lifetime` → plus_lifetime. לסמן את default כ-current.
6. API keys → להעתיק את **Public app-specific key** של Google Play (מתחיל ב-`goog_`).

## 3. להכניס את המפתח
ב-`www/plus_config.js`:
```
REVENUECAT_ANDROID_KEY: "goog_XXXXXXXX",
```
(iOS: אותו דבר עם `appl_` אחרי שיהיה App Store Connect). לעשות commit + push, ואז build `android-release` ב-Codemagic. versionCode כבר 2, versionName 1.1.

## 4. בדיקה בלי לשלם
Play Console → Setup → License testing → להוסיף את ה-Gmail של הבודקים. אצלם הרכישה תהיה "Test card, always approves", והמנוי מתחדש כל 5 דקות (שנתי = 30 דקות). לבדוק:
- מסך Plus נפתח אחרי ה-onboarding, X מופיע אחרי 3 שניות.
- "Start my 7-day free trial" → דיאלוג של Google Play → אחרי אישור: הגדרות מציגות "Free trial ✓", כל הטאבים נפתחים.
- התראת תזכורת: בטסט המנוי קצר, אז התזכורת (יומיים לפני הסיום) לא תישלח. בפרודקשן היא נקבעת אוטומטית.
- Restore purchases במכשיר שני עם אותו חשבון Google.

## 5. "Arthur prays your name"
כרגע, בלי שרת, הכפתור פותח מייל ל-`SUPPORT_EMAIL`. כדי שהשמות יגיעו לטבלה: ליצור Google Form (שדות name, forWhom, note, from) → Apps Script Web App שמקבל POST → להדביק את ה-URL ב-`NAMES_ENDPOINT`. 15 דקות עבודה, אפשר אחרי ההשקה.

## 6. קובץ האודיו של ארתור (מסך 6 ב-onboarding)
המסך מציג נגן רק אם קיים `www/arthur_welcome.mp3` (10–15 שניות, הקול המשובט). בלי הקובץ מוצג רק הטקסט. הטקסט לקריינות:
> "Hello. I'm Arthur. I started writing these prayers for the people who wrote to me every evening: about a dog that had passed, a child who stopped calling, a house gone quiet. Every prayer here was written for someone real. Tonight, it is for you."

## מה חינם ומה Plus (לא לשנות אחרי ההשקה לכיוון של פחות חינם)
- חינם: 3 תפילות ביום ב-For you, 2 ראשונות בכל טאב, Saved, My people, Quiet mode, שיתוף כתמונה, תזכורת.
- Plus: כל 450 התפילות, 15 תפילות ביום, "Arthur prays your name".
- המספרים: `FREE_DAILY` ו-`FREE_PER_TAB` ב-`plus_config.js`.
- בדיקה בדפדפן: `?plus=1` מדמה מנוי, `?plus=0` מבטל.
