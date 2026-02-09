# 🐙 Joni AI Sticker Pack - Setup Instructions

## צעדים ליצירת הסטיקר פאק

### 1️⃣ צור Telegram Bot (אם עדיין אין לך)

1. פתח שיחה עם [@BotFather](https://t.me/BotFather) בטלגרם
2. שלח `/newbot`
3. בחר שם לבוט (למשל: "Joni AI Stickers")
4. בחר username לבוט (חייב להסתיים ב-`bot`, למשל: `JoniAIStickersBot`)
5. שמור את ה-**Bot Token** שמקבלים (משהו כמו: `1234567890:ABCdefGHIjklMNOpqrsTUVwxyz`)

### 2️⃣ התקן Dependencies

```bash
cd /Users/hogeg/.openclaw/workspace/joni-stickers
npm init -y
npm install form-data
```

### 3️⃣ הרץ את הסקריפט

```bash
export TELEGRAM_BOT_TOKEN="YOUR_BOT_TOKEN_HERE"
node create-sticker-pack.js
```

או בשורה אחת:

```bash
TELEGRAM_BOT_TOKEN="YOUR_BOT_TOKEN_HERE" node create-sticker-pack.js
```

### 4️⃣ תוצאה צפויה

הסקריפט יעשה את הדברים הבאים:

1. ✅ יעלה את כל 25 הסטיקרים לטלגרם
2. ✅ יצור סטיקר פאק חדש
3. ✅ יוסיף את כל הסטיקרים לפאק
4. ✅ יחזיר קישור לסטיקר פאק
5. ✅ ישמור את הקישור ב-`STICKER_PACK_LINK.txt`

פלט לדוגמה:
```
🐙 Joni AI Sticker Pack Creator

🤖 Bot: @JoniAIStickersBot

📦 Found 25 stickers

📤 Uploading: 01-happy.png...
✅ Uploaded! File ID: AgACAgQAAxkDAAIB...
...
🎨 Creating sticker set: Joni AI - Multi-Agent Platform...
✅ Sticker set created!
➕ Adding sticker with emoji ❤️...
✅ Sticker added!
...

🎉 SUCCESS! Sticker pack created!

📦 Name: Joni AI - Multi-Agent Platform
🔗 Link: https://t.me/addstickers/JoniAI_by_JoniAIStickersBot

✨ Total stickers: 25

🎯 You can now use the stickers: https://t.me/addstickers/JoniAI_by_JoniAIStickersBot
```

## 🎨 רשימת הסטיקרים

| # | שם | אמוג'י |
|---|---|---|
| 01 | happy | 😊 |
| 02 | love | ❤️ |
| 03 | sad | 😢 |
| 04 | angry | 😠 |
| 05 | surprised | 😲 |
| 06 | laughing | 😂 |
| 07 | cool | 😎 |
| 08 | thumbs-up | 👍 |
| 09 | thumbs-down | 👎 |
| 10 | thank-you | 🙏 |
| 11 | sorry | 😔 |
| 12 | wow | 😮 |
| 13 | thinking | 🤔 |
| 14 | coding | 💻 |
| 15 | sleeping | 😴 |
| 16 | working | 💪 |
| 17 | celebrating | 🎉 |
| 18 | coffee | ☕ |
| 19 | dancing | 💃 |
| 20 | waving | 👋 |
| 21 | debugging | 🐛 |
| 22 | deploying | 🚀 |
| 23 | learning | 📚 |
| 24 | success | 🏆 |
| 25 | loading | ⏳ |

## 🔧 Troubleshooting

### Error: "TELEGRAM_BOT_TOKEN environment variable is not set"
פתרון: הגדר את משתנה הסביבה לפני הרצת הסקריפט

### Error: "Bad Request: STICKERSET_INVALID"
פתרון: הסטיקר פאק כבר קיים עם השם הזה. שנה את `stickerSetName` בקוד או מחק את הפאק הקיים

### Error: "Flood control"
פתרון: טלגרם מגביל קצב העלאות. הסקריפט כולל המתנות של 500ms בין העלאות, אבל אולי צריך להאט יותר

## 📝 הערות

- כל הסטיקרים הם 512x512 PNG עם רקע שקוף (כנדרש ע"י טלגרם)
- הסטיקרים מוגדרים כ-`static` (לא אנימציה)
- ה-User ID (8297455287) הוא של Adam - הוא יהיה הבעלים של הסטיקר פאק
- הבוט רק משמש להעלאה - אחרי שהפאק נוצר, כולם יכולים להשתמש בו

## 🚀 Quick Start (אם יש לך כבר bot token)

```bash
cd /Users/hogeg/.openclaw/workspace/joni-stickers
npm install form-data
TELEGRAM_BOT_TOKEN="1234567890:ABCD..." node create-sticker-pack.js
```

Done! 🎉
