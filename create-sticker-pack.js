#!/usr/bin/env node

/**
 * Joni AI Sticker Pack Creator
 * Creates a Telegram sticker pack from local PNG files
 */

const https = require('https');
const fs = require('fs');
const path = require('path');
const FormData = require('form-data');

// Configuration
const CONFIG = {
  botToken: process.env.TELEGRAM_BOT_TOKEN || '',
  userId: 8297455287, // Adam's Telegram user ID
  stickerSetName: 'JoniAI_by_bot', // Will be suffixed with bot username
  stickerSetTitle: 'Joni AI - Multi-Agent Platform',
  stickersDir: __dirname,
};

// Sticker emoji mapping
const STICKER_EMOJIS = {
  '01-happy': '😊',
  '02-love': '❤️',
  '03-sad': '😢',
  '04-angry': '😠',
  '05-surprised': '😲',
  '06-laughing': '😂',
  '07-cool': '😎',
  '08-thumbs-up': '👍',
  '09-thumbs-down': '👎',
  '10-thank-you': '🙏',
  '11-sorry': '😔',
  '12-wow': '😮',
  '13-thinking': '🤔',
  '14-coding': '💻',
  '15-sleeping': '😴',
  '16-working': '💪',
  '17-celebrating': '🎉',
  '18-coffee': '☕',
  '19-dancing': '💃',
  '20-waving': '👋',
  '21-debugging': '🐛',
  '22-deploying': '🚀',
  '23-learning': '📚',
  '24-success': '🏆',
  '25-loading': '⏳',
};

/**
 * Make a Telegram Bot API request
 */
function telegramRequest(method, formData) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.telegram.org',
      path: `/bot${CONFIG.botToken}/${method}`,
      method: 'POST',
      headers: formData.getHeaders(),
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          if (json.ok) {
            resolve(json.result);
          } else {
            reject(new Error(`API Error: ${json.description}`));
          }
        } catch (err) {
          reject(err);
        }
      });
    });

    req.on('error', reject);
    formData.pipe(req);
  });
}

/**
 * Upload a sticker file
 */
async function uploadStickerFile(filePath) {
  const form = new FormData();
  form.append('user_id', CONFIG.userId.toString());
  form.append('sticker', fs.createReadStream(filePath));
  form.append('sticker_format', 'static');

  console.log(`📤 Uploading: ${path.basename(filePath)}...`);
  const result = await telegramRequest('uploadStickerFile', form);
  console.log(`✅ Uploaded! File ID: ${result.file_id}`);
  return result.file_id;
}

/**
 * Create a new sticker set
 */
async function createNewStickerSet(firstStickerFileId, firstEmoji) {
  const form = new FormData();
  form.append('user_id', CONFIG.userId.toString());
  form.append('name', CONFIG.stickerSetName);
  form.append('title', CONFIG.stickerSetTitle);
  form.append('stickers', JSON.stringify([
    {
      sticker: firstStickerFileId,
      emoji_list: [firstEmoji],
      format: 'static',
    }
  ]));
  form.append('sticker_format', 'static');

  console.log(`🎨 Creating sticker set: ${CONFIG.stickerSetTitle}...`);
  await telegramRequest('createNewStickerSet', form);
  console.log(`✅ Sticker set created!`);
}

/**
 * Add a sticker to an existing set
 */
async function addStickerToSet(fileId, emoji) {
  const form = new FormData();
  form.append('user_id', CONFIG.userId.toString());
  form.append('name', CONFIG.stickerSetName);
  form.append('sticker', JSON.stringify({
    sticker: fileId,
    emoji_list: [emoji],
    format: 'static',
  }));

  console.log(`➕ Adding sticker with emoji ${emoji}...`);
  await telegramRequest('addStickerToSet', form);
  console.log(`✅ Sticker added!`);
}

/**
 * Get bot information
 */
async function getBotInfo() {
  const form = new FormData();
  const result = await telegramRequest('getMe', form);
  return result;
}

/**
 * Main function
 */
async function main() {
  try {
    // Validate bot token
    if (!CONFIG.botToken) {
      throw new Error('❌ TELEGRAM_BOT_TOKEN environment variable is not set!');
    }

    console.log('🐙 Joni AI Sticker Pack Creator\n');

    // Get bot info and update sticker set name
    const botInfo = await getBotInfo();
    console.log(`🤖 Bot: @${botInfo.username}\n`);
    CONFIG.stickerSetName = `JoniAI_by_${botInfo.username}`;

    // Get all sticker files (numbered 01-25)
    const stickerFiles = [];
    for (let i = 1; i <= 25; i++) {
      const num = i.toString().padStart(2, '0');
      const fileName = Object.keys(STICKER_EMOJIS).find(k => k.startsWith(num));
      if (fileName) {
        const filePath = path.join(CONFIG.stickersDir, `${fileName}.png`);
        if (fs.existsSync(filePath)) {
          stickerFiles.push({ path: filePath, emoji: STICKER_EMOJIS[fileName], name: fileName });
        } else {
          console.warn(`⚠️  File not found: ${filePath}`);
        }
      }
    }

    if (stickerFiles.length === 0) {
      throw new Error('❌ No sticker files found!');
    }

    console.log(`📦 Found ${stickerFiles.length} stickers\n`);

    // Upload all stickers first
    const uploadedStickers = [];
    for (const sticker of stickerFiles) {
      const fileId = await uploadStickerFile(sticker.path);
      uploadedStickers.push({ fileId, emoji: sticker.emoji, name: sticker.name });
      // Rate limiting: wait a bit between uploads
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    console.log('\n');

    // Create the sticker set with the first sticker
    await createNewStickerSet(uploadedStickers[0].fileId, uploadedStickers[0].emoji);

    // Add remaining stickers
    for (let i = 1; i < uploadedStickers.length; i++) {
      await addStickerToSet(uploadedStickers[i].fileId, uploadedStickers[i].emoji);
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    // Success!
    const stickerPackUrl = `https://t.me/addstickers/${CONFIG.stickerSetName}`;
    console.log('\n🎉 SUCCESS! Sticker pack created!\n');
    console.log(`📦 Name: ${CONFIG.stickerSetTitle}`);
    console.log(`🔗 Link: ${stickerPackUrl}`);
    console.log(`\n✨ Total stickers: ${uploadedStickers.length}`);

    // Save the link to a file
    fs.writeFileSync(
      path.join(CONFIG.stickersDir, 'STICKER_PACK_LINK.txt'),
      `Joni AI Sticker Pack\n\n${stickerPackUrl}\n\nCreated: ${new Date().toISOString()}\n`
    );

    return stickerPackUrl;
  } catch (error) {
    console.error('\n❌ Error:', error.message);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main().then(url => {
    console.log(`\n🎯 You can now use the stickers: ${url}\n`);
  });
}

module.exports = { main };
