import dotenv from 'dotenv';
dotenv.config();

import {
    makeWASocket,
    Browsers,
    fetchLatestBaileysVersion,
    DisconnectReason,
    useMultiFileAuthState,
} from '@whiskeysockets/baileys';
import { Handler, Callupdate, GroupUpdate } from './data/index.js';
import express from 'express';
import pino from 'pino';
import fs from 'fs';
import { File } from 'megajs';
import NodeCache from 'node-cache';
import path from 'path';
import chalk from 'chalk';
import moment from 'moment-timezone';
import axios from 'axios';
import config from './config.cjs';
import pkg from './lib/autoreact.cjs';
const { emojis, doReact } = pkg;
import zlib from 'zlib';

const prefix = process.env.PREFIX || config.PREFIX;
const sessionName = "session";
const app = express();
const orange = chalk.bold.hex("#FFA500");
const lime = chalk.bold.hex("#32CD32");
let useQR = false;
let initialConnection = true;
const PORT = process.env.PORT || 3000;

const MAIN_LOGGER = pino({
    timestamp: () => `,"time":"${new Date().toJSON()}"`
});
const logger = MAIN_LOGGER.child({});
logger.level = "trace";

const msgRetryCounterCache = new NodeCache();

const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);

const sessionDir = path.join(__dirname, 'session');
const credsPath = path.join(sessionDir, 'creds.json');

if (!fs.existsSync(sessionDir)) {
    fs.mkdirSync(sessionDir, { recursive: true });
}

async function decodeBase64Session() {
    console.log("🔍 Checking for base64 session...");
    
    if (!config.SESSION_ID || typeof config.SESSION_ID !== 'string') {
        console.error('❌ No SESSION_ID found in config!');
        return false;
    }
    
    // Check if it's base64 (common base64 pattern)
    const isBase64 = /^[A-Za-z0-9+/=]+$/.test(config.SESSION_ID);
    const isGzippedBase64 = config.SESSION_ID.startsWith('H4sI'); // gzip magic bytes in base64
    
    if (!isBase64 && !isGzippedBase64) {
        console.error('❌ SESSION_ID does not appear to be valid base64!');
        return false;
    }
    
    try {
        console.log("🔄 Decoding base64 session data...");
        
        // Decode base64
        const buffer = Buffer.from(config.SESSION_ID, 'base64');
        
        let sessionData;
        
        // Check if it's gzipped (starts with gzip magic bytes: 0x1f 0x8b)
        if (buffer[0] === 0x1f && buffer[1] === 0x8b) {
            console.log("📦 Detected gzipped data, decompressing...");
            sessionData = zlib.gunzipSync(buffer);
        } else {
            console.log("📄 Using raw base64 data...");
            sessionData = buffer;
        }
        
        // Try to parse as JSON to verify it's valid
        try {
            const jsonData = JSON.parse(sessionData.toString());
            console.log("✅ Valid JSON session data detected");
        } catch (e) {
            console.log("⚠️ Session data is not JSON, writing as raw data...");
        }
        
        // Write to file
        await fs.promises.writeFile(credsPath, sessionData);
        console.log("✅ Session successfully loaded from base64!");
        console.log("📁 Session saved to:", credsPath);
        
        // Show file size
        const stats = fs.statSync(credsPath);
        console.log(`📊 Session file size: ${stats.size} bytes`);
        
        return true;
    } catch (error) {
        console.error('❌ Failed to decode/process base64 session:', error.message);
        console.error('Stack:', error.stack);
        return false;
    }
}

async function downloadSessionData() {
    console.log("🔍 Checking for Mega.nz session...");
    
    if (!config.SESSION_ID || !config.SESSION_ID.startsWith('IK~')) {
        console.log('ℹ️ No Mega.nz session ID found (should start with IK~)');
        return false;
    }

    const sessdata = config.SESSION_ID.split("IK~")[1];

    if (!sessdata || !sessdata.includes("#")) {
        console.error('❌ Invalid Mega.nz SESSION_ID format!');
        return false;
    }

    const [fileID, decryptKey] = sessdata.split("#");

    try {
        console.log("🔄 Downloading Mega.nz session...");
        const file = File.fromURL(`https://mega.nz/file/${fileID}#${decryptKey}`);

        const data = await new Promise((resolve, reject) => {
            file.download((err, data) => {
                if (err) reject(err);
                else resolve(data);
            });
        });

        await fs.promises.writeFile(credsPath, data);
        console.log("✅ Mega.nz session successfully loaded!");
        return true;
    } catch (error) {
        console.error('❌ Failed to download Mega.nz session:', error);
        return false;
    }
}

async function start() {
    try {
        const { state, saveCreds } = await useMultiFileAuthState(sessionDir);
        const { version, isLatest } = await fetchLatestBaileysVersion();
        console.log(`🤖 JAWAD-MD using WA v${version.join('.')}, isLatest: ${isLatest}`);
        
        const Matrix = makeWASocket({
            version,
            logger: pino({ level: 'silent' }),
            printQRInTerminal: useQR,
            browser: ["JAWAD-MD", "safari", "3.3"],
            auth: state,
            getMessage: async (key) => {
                if (store) {
                    const msg = await store.loadMessage(key.remoteJid, key.id);
                    return msg.message || undefined;
                }
                return { conversation: "JAWAD-MD whatsapp user bot" };
            }
        });

        Matrix.ev.on('connection.update', (update) => {
            const { connection, lastDisconnect } = update;
            if (connection === 'close') {
                const shouldReconnect = lastDisconnect.error?.output?.statusCode !== DisconnectReason.loggedOut;
                console.log('Connection closed due to ', lastDisconnect.error, ', reconnecting ', shouldReconnect);
                if (shouldReconnect) {
                    setTimeout(start, 5000); // Reconnect after 5 seconds
                }
            } else if (connection === 'open') {
                if (initialConnection) {
                    console.log(chalk.green("✅ Connected Successfully JAWAD MD 🤍"));
                    // Send welcome message
                    Matrix.sendMessage(Matrix.user.id, { 
                        image: { url: "https://files.catbox.moe/pf270b.jpg" }, 
                        caption: `*Hello there JAWAD-MD User! 👋🏻* 

> Simple, Straightforward, But Loaded With Features 🎊. Meet JAWAD-MD WhatsApp Bot.

*Thanks for using JAWAD-MD 🚩* 

> Join WhatsApp Channel: ⤵️  
https://whatsapp.com/channel/0029VatOy2EAzNc2WcShQw1j

- *YOUR PREFIX:* = ${prefix}

Don't forget to give a star to the repo ⬇️  
https://github.com/JawadTechXD/JAWAD-MD

> © Powered BY JawadTechX 🖤`
                    });
                    initialConnection = false;
                } else {
                    console.log(chalk.blue("♻️ Connection reestablished."));
                }
            }
        });
        
        Matrix.ev.on('creds.update', saveCreds);

        Matrix.ev.on("messages.upsert", async chatUpdate => await Handler(chatUpdate, Matrix, logger));
        Matrix.ev.on("call", async (json) => await Callupdate(json, Matrix));
        Matrix.ev.on("group-participants.update", async (messag) => await GroupUpdate(Matrix, messag));

        if (config.MODE === "public") {
            Matrix.public = true;
        } else if (config.MODE === "private") {
            Matrix.public = false;
        }

        // Combined messages.upsert handler
        Matrix.ev.on('messages.upsert', async (chatUpdate) => {
            try {
                const mek = chatUpdate.messages[0];
                if (!mek || !mek.key) return;
                
                const fromJid = mek.key.participant || mek.key.remoteJid;
                
                // Auto-react feature
                if (!mek.key.fromMe && config.AUTO_REACT && mek.message) {
                    const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
                    await doReact(randomEmoji, mek, Matrix);
                }
                
                // Auto status seen feature
                if (mek.key && mek.key.remoteJid === 'status@broadcast' && config.AUTO_STATUS_SEEN) {
                    await Matrix.readMessages([mek.key]);
                    
                    if (config.AUTO_STATUS_REPLY) {
                        const customMessage = config.STATUS_READ_MSG || '✅ Auto Status Seen Bot By JAWAD-MD';
                        await Matrix.sendMessage(fromJid, { text: customMessage }, { quoted: mek });
                    }
                }
            } catch (err) {
                console.error('Error in messages.upsert handler:', err);
            }
        });

    } catch (error) {
        console.error('Critical Error:', error);
        console.error('Stack:', error.stack);
        setTimeout(start, 10000); // Try to restart after 10 seconds
    }
}

async function init() {
    console.log(chalk.cyan("🚀 Starting JAWAD-MD Bot..."));
    console.log(chalk.yellow(`📁 Session directory: ${sessionDir}`));
    
    // Check if session already exists
    if (fs.existsSync(credsPath)) {
        console.log(chalk.green("✅ Found existing session file"));
        const stats = fs.statSync(credsPath);
        console.log(chalk.blue(`📊 Session file size: ${stats.size} bytes`));
        await start();
        return;
    }
    
    // Try different session loading methods
    console.log(chalk.yellow("🔍 Looking for session configuration..."));
    
    if (config.SESSION_ID) {
        console.log(chalk.blue(`📝 SESSION_ID found (length: ${config.SESSION_ID.length})`));
        
        // Try Mega.nz first if it starts with IK~
        if (config.SESSION_ID.startsWith('IK~')) {
            console.log(chalk.cyan("🔗 Mega.nz session detected"));
            const downloaded = await downloadSessionData();
            if (downloaded) {
                await start();
                return;
            }
        }
        
        // Try base64 decoding
        console.log(chalk.cyan("🔐 Trying base64 session decoding..."));
        const decoded = await decodeBase64Session();
        if (decoded) {
            await start();
            return;
        }
    }
    
    // If no session found or all methods failed
    console.log(chalk.yellow("⚠️ No valid session found. Using QR code authentication..."));
    useQR = true;
    await start();
}

init();

app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>JAWAD-MD Bot</title>
            <style>
                body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }
                h1 { color: #333; }
                .status { 
                    background: #4CAF50; 
                    color: white; 
                    padding: 10px 20px; 
                    border-radius: 5px;
                    display: inline-block;
                }
            </style>
        </head>
        <body>
            <h1>🤖 JAWAD-MD WhatsApp Bot</h1>
            <div class="status">🟢 Bot is running</div>
            <p>Check the console for QR code if not authenticated</p>
            <p>Port: ${PORT}</p>
        </body>
        </html>
    `);
});

app.listen(PORT, () => {
    console.log(chalk.green(`🌐 Express server running on port ${PORT}`));
    console.log(chalk.green(`🌐 Web interface: http://localhost:${PORT}`));
});
