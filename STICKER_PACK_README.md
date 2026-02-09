# 🐙 Joni AI Telegram Sticker Pack Creator

## 🚀 Quick Start (2 דקות)

### אופציה 1: עם סקריפט אינטראקטיבי (מומלץ)
```bash
cd /Users/hogeg/.openclaw/workspace/joni-stickers
./setup-bot.sh
```
הסקריפט ידריך אותך שלב אחר שלב.

### אופציה 2: הרצה ישירה (אם יש לך כבר Bot Token)
```bash
cd /Users/hogeg/.openclaw/workspace/joni-stickers
TELEGRAM_BOT_TOKEN="YOUR_TOKEN_HERE" node create-sticker-pack.js
```

---

## 📋 מה כולל החבילה?

### ✅ 25 סטיקרים מוכנים
כל הסטיקרים הם **512x512 PNG** עם **רקע שקוף**, מוכנים להעלאה לטלגרם:

- 😊 01-happy
- ❤️ 02-love
- 😢 03-sad
- 😠 04-angry
- 😲 05-surprised
- 😂 06-laughing
- 😎 07-cool
- 👍 08-thumbs-up
- 👎 09-thumbs-down
- 🙏 10-thank-you
- 😔 11-sorry
- 😮 12-wow
- 🤔 13-thinking
- 💻 14-coding
- 😴 15-sleeping
- 💪 16-working
- 🎉 17-celebrating
- ☕ 18-coffee
- 💃 19-dancing
- 👋 20-waving
- 🐛 21-debugging
- 🚀 22-deploying
- 📚 23-learning
- 🏆 24-success
- ⏳ 25-loading

### ✅ סקריפט אוטומטי מלא
הסקריפט `create-sticker-pack.js` מטפל בכל התהליך:
- ✅ העלאת כל 25 הסטיקרים
- ✅ יצירת Sticker Set
- ✅ הוספת כל הסטיקרים לסט
- ✅ החזרת קישור מוכן לשימוש
- ✅ שמירת הקישור לקובץ

---

## 🔧 איך ליצור את הסטיקר פאק? (מדריך מפורט)

### שלב 1: צור Telegram Bot

1. **פתח טלגרם** ושלח הודעה ל-[@BotFather](https://t.me/BotFather)
2. שלח: `/newbot`
3. **בחר שם** לבוט (למשל: `Joni AI Stickers`)
4. **בחר username** (חייב להסתיים ב-`bot`, למשל: `JoniAIStickersBot`)
5. **שמור את ה-Bot Token** (נראה כך: `1234567890:ABCdefGHIjklMNOpqrsTUVwxyz`)

### שלב 2: הרץ את הסקריפט

**דרך קלה (אינטראקטיבי):**
```bash
cd /Users/hogeg/.openclaw/workspace/joni-stickers
./setup-bot.sh
```

**דרך ישירה:**
```bash
cd /Users/hogeg/.openclaw/workspace/joni-stickers
TELEGRAM_BOT_TOKEN="1234567890:ABCD..." node create-sticker-pack.js
```

### שלב 3: קבל את הקישור!

הסקריפט יחזיר:
```
🎉 SUCCESS! Sticker pack created!

📦 Name: Joni AI - Multi-Agent Platform
🔗 Link: https://t.me/addstickers/JoniAI_by_YourBotName

✨ Total stickers: 25
```

הקישור נשמר גם ב-`STICKER_PACK_LINK.txt`

---

## 📂 מבנה הקבצים

```
joni-stickers/
├── 01-happy.png          # סטיקר 1
├── 02-love.png           # סטיקר 2
├── ...                   # 23 סטיקרים נוספים
├── 25-loading.png        # סטיקר 25
├── create-sticker-pack.js    # הסקריפט הראשי ✨
├── setup-bot.sh              # עוזר אינטראקטיבי 🤖
├── SETUP_INSTRUCTIONS.md     # הוראות מפורטות
├── STICKER_PACK_README.md    # הקובץ הזה
└── package.json              # Dependencies
```

---

## 🎯 פרטי הסטיקר פאק

- **שם:** Joni AI - Multi-Agent Platform
- **שם קצר:** `JoniAI_by_[YourBotName]`
- **בעלים:** User ID 8297455287 (Adam)
- **פורמט:** Static PNG (512x512)
- **כמות:** 25 סטיקרים

---

## ❓ שאלות נפוצות

### Q: האם אני צריך בוט חדש או יכול להשתמש בבוט קיים?
**A:** אפשר להשתמש בכל בוט - חדש או קיים. הבוט רק משמש ליצירת הסטיקר פאק. אחר כך כולם יכולים להשתמש בסטיקרים.

### Q: מה קורה אם הסקריפט נכשל באמצע?
**A:** הסקריפט כולל rate limiting (המתנות של 500ms) כדי למנוע בעיות. אם זה עדיין נכשל, זה בד"כ בגלל:
- Bot Token שגוי
- הסטיקר פאק כבר קיים עם השם הזה
- בעיית רשת

### Q: האם אפשר לשנות את הסטיקר פאק אחרי שנוצר?
**A:** כן! אפשר להוסיף עוד סטיקרים, למחוק, או לשנות סדר. בדוק את [Telegram Bot API docs](https://core.telegram.org/bots/api#stickers) לפרטים.

### Q: מי יכול להשתמש בסטיקרים?
**A:** כולם! ברגע שהסטיקר פאק נוצר, כל משתמש טלגרם יכול להוסיף אותו ולהשתמש בו.

---

## 🐛 Troubleshooting

### ❌ Error: "TELEGRAM_BOT_TOKEN environment variable is not set"
**פתרון:** וודא שהגדרת את משתנה הסביבה או השתמש ב-`./setup-bot.sh`

### ❌ Error: "Bad Request: STICKERSET_INVALID"
**פתרון:** הסטיקר פאק כבר קיים. שנה את `stickerSetName` בקוד או מחק את הפאק הקיים ב-@Stickers

### ❌ Error: "Flood control"
**פתרון:** טלגרם מגביל קצב. חכה כמה דקות ונסה שוב

### ❌ Error: "File too large"
**פתרון:** הקבצים צריכים להיות מתחת ל-512KB. כל הסטיקרים הנוכחיים עומדים בדרישה

---

## 📚 קישורים שימושיים

- [Telegram Bot API - Stickers](https://core.telegram.org/bots/api#stickers)
- [BotFather](https://t.me/BotFather)
- [Stickers Bot](https://t.me/Stickers)

---

## 🎉 אחרי היצירה

לאחר שהסטיקר פאק נוצר:

1. **פתח את הקישור** שהתקבל (או מ-`STICKER_PACK_LINK.txt`)
2. **לחץ על "Add Stickers"** בטלגרם
3. **התחל להשתמש!** 🐙✨

הסטיקרים יופיעו בחלון הסטיקרים שלך ואפשר להשתמש בהם בכל שיחה!

---

**Created by:** OpenClaw Agent 🐙  
**Date:** Feb 9, 2026  
**Version:** 1.0.0
