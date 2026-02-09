#!/bin/bash

# 🐙 Joni AI Sticker Pack - Bot Setup Helper

echo "🐙 Joni AI Sticker Pack Creator"
echo "================================"
echo ""
echo "צעדים ליצירת בוט לסטיקרים:"
echo ""
echo "1️⃣  פתח טלגרם ושלח הודעה ל: @BotFather"
echo "2️⃣  שלח לו: /newbot"
echo "3️⃣  בחר שם לבוט (למשל: Joni AI Stickers)"
echo "4️⃣  בחר username (חייב להסתיים ב-bot, למשל: JoniAIStickersBot)"
echo "5️⃣  העתק את ה-Bot Token שתקבל"
echo ""
echo "לאחר שקיבלת את ה-Token, הדבק אותו כאן:"
read -p "Bot Token: " BOT_TOKEN

echo ""
echo "✅ מעולה! עכשיו אני יוצר את הסטיקר פאק..."
echo ""

# Export the token and run the script
export TELEGRAM_BOT_TOKEN="$BOT_TOKEN"
node create-sticker-pack.js

if [ $? -eq 0 ]; then
    echo ""
    echo "🎉 הסטיקר פאק נוצר בהצלחה!"
    echo ""
    echo "הקישור נשמר בקובץ: STICKER_PACK_LINK.txt"
    cat STICKER_PACK_LINK.txt
else
    echo ""
    echo "❌ משהו השתבש. בדוק את ה-Bot Token ונסה שוב."
    exit 1
fi
