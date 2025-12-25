// MULAA XMD BOT - Enhanced Session Handler
// Creator: Amantle Mpaekae (Mulax Prime)
// Location: /index.js (Updated Session Download Section)
// Sigil: [MULAA_XMD_SESSION_V2]

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
import { inflateSync } from 'zlib'; // For decompression
const { emojis, doReact } = pkg;

// ========================
// ENHANCED SESSION HANDLER
// ========================

/**
 * Detect session ID format and handle appropriately
 * @param {String} sessionId - The SESSION_ID from config
 * @returns {Object} - Format detection result
 */
function detectSessionFormat(sessionId) {
    console.log("[MULAA] 🔍 Analyzing session format...");
    
    if (!sessionId) {
        return { type: 'none', valid: false, message: 'No session ID provided' };
    }
    
    // Check if it's MEGA.nz format (MULAA~fileID#decryptKey)
    if (sessionId.startsWith("MULAA~") && sessionId.includes("#")) {
        const parts = sessionId.replace("MULAA~", "").split("#");
        if (parts.length === 2) {
            const [fileId, decryptKey] = parts;
            
            // Validate MEGA format lengths
            if (fileId.length >= 11 && fileId.length <= 12 && 
                decryptKey.length >= 43 && decryptKey.length <= 44) {
                return {
                    type: 'mega',
                    valid: true,
                    fileId,
                    decryptKey,
                    message: 'MEGA.nz session format detected'
                };
            }
        }
    }
    
    // Check if it's Base64 compressed format
    if (sessionId.startsWith("MULAA~") && sessionId.length > 1000) {
        // Likely compressed session data
        const compressedData = sessionId.replace("MULAA~", "");
        
        // Check if it's valid Base64
        const base64Regex = /^[A-Za-z0-9+/=]+$/;
        if (base64Regex.test(compressedData)) {
            return {
                type: 'compressed',
                valid: true,
                data: compressedData,
                message: 'Compressed session format detected'
            };
        }
    }
    
    // Check if it's direct JSON
    if (sessionId.startsWith("{") || sessionId.startsWith("[")) {
        try {
            JSON.parse(sessionId);
            return {
                type: 'json',
                valid: true,
                message: 'Direct JSON session format'
            };
        } catch (e) {
            // Not valid JSON
        }
    }
    
    return {
        type: 'unknown',
        valid: false,
        message: 'Unknown session format'
    };
}

/**
 * Download session from MEGA.nz
 */
async function downloadMegaSession(fileId, decryptKey) {
    console.log("[MULAA] 🌐 Downloading from MEGA.nz...");
    
    try {
        const file = File.fromURL(`https://mega.nz/file/${fileId}#${decryptKey}`);
        
        const essence = await new Promise((resolve, reject) => {
            file.download((err, data) => {
                if (err) reject(err);
                else resolve(data);
            });
        });
        
        // Save to creds.json
        const essencePath = path.join(mulaaSanctum, 'creds.json');
        await fs.promises.writeFile(essencePath, essence);
        
        console.log("[MULAA] ✅ MEGA session downloaded successfully!");
        return true;
    } catch (error) {
        console.error('[MULAA] ❌ MEGA download failed:', error.message);
        return false;
    }
}

/**
 * Decompress and save compressed session
 */
async function handleCompressedSession(compressedData) {
    console.log("[MULAA] 🔄 Decompressing session data...");
    
    try {
        // Decode Base64
        const buffer = Buffer.from(compressedData, 'base64');
        
        // Check if it's gzipped (starts with 0x1F8B)
        let sessionData;
        if (buffer[0] === 0x1F && buffer[1] === 0x8B) {
            // Gzipped data
            sessionData = inflateSync(buffer);
        } else {
            // Direct data
            sessionData = buffer;
        }
        
        // Parse as JSON to validate
        const parsed = JSON.parse(sessionData.toString());
        
        // Save to creds.json
        const essencePath = path.join(mulaaSanctum, 'creds.json');
        await fs.promises.writeFile(essencePath, JSON.stringify(parsed, null, 2));
        
        console.log("[MULAA] ✅ Compressed session restored successfully!");
        return true;
    } catch (error) {
        console.error('[MULAA] ❌ Session decompression failed:', error.message);
        return false;
    }
}

/**
 * Enhanced chronicle essence handler
 */
async function downloadChronicleEssence() {
    console.log("[MULAA] 🔍 Verifying chronicle essence...");

    if (!config.SESSION_ID || config.SESSION_ID === "MULAA~YourChronicleEssenceHere") {
        console.log('[MULAA] ⚠️ No valid session ID found in config');
        return false;
    }

    // Detect session format
    const format = detectSessionFormat(config.SESSION_ID);
    console.log(`[MULAA] 📊 Format: ${format.type} - ${format.message}`);

    if (!format.valid) {
        console.error('[MULAA] ❌ Invalid session format');
        return false;
    }

    try {
        switch (format.type) {
            case 'mega':
                return await downloadMegaSession(format.fileId, format.decryptKey);
                
            case 'compressed':
                return await handleCompressedSession(format.data);
                
            case 'json':
                // Direct JSON - save as is
                const essencePath = path.join(mulaaSanctum, 'creds.json');
                await fs.promises.writeFile(essencePath, config.SESSION_ID);
                console.log("[MULAA] ✅ Direct JSON session saved!");
                return true;
                
            default:
                console.error('[MULAA] ❌ Unsupported session format');
                return false;
        }
    } catch (error) {
        console.error('[MULAA] ❌ Session handling failed:', error);
        return false;
    }
}

// ========================
// SESSION COMPRESSION TOOL (NEW)
// ========================

/**
 * Tool to compress existing session for easy sharing
 * Run: node compress-session.js
 */
function createCompressionTool() {
    const compressionTool = `
// MULAA XMD BOT - Session Compression Tool
// Location: /tools/compress-session.js
// Run: node tools/compress-session.js

const fs = require('fs');
const path = require('path');
const { gzipSync } = require('zlib');

async function compressSession() {
    const sessionPath = path.join(__dirname, '../chronicles/creds.json');
    
    if (!fs.existsSync(sessionPath)) {
        console.error('❌ No session file found at:', sessionPath);
        console.log('Please run the bot first to generate a session.');
        return;
    }
    
    try {
        // Read session file
        const sessionData = fs.readFileSync(sessionPath, 'utf8');
        
        // Compress using gzip
        const compressed = gzipSync(sessionData);
        const base64 = compressed.toString('base64');
        
        // Create MULAA~ format
        const compressedSession = \`MULAA~\${base64}\`;
        
        console.log('✅ Session compressed successfully!');
        console.log('\\n📋 Your compressed session ID:');
        console.log('='.repeat(60));
        console.log(compressedSession);
        console.log('='.repeat(60));
        console.log('\\n📏 Length:', compressedSession.length, 'characters');
        console.log('\\n💡 Add this to your config.cjs:');
        console.log('SESSION_ID = "' + compressedSession + '"');
        console.log('\\n⚠️ Keep this session ID secure!');
        
        // Also save to file
        fs.writeFileSync('compressed-session.txt', compressedSession);
        console.log('📁 Also saved to: compressed-session.txt');
        
    } catch (error) {
        console.error('❌ Compression failed:', error.message);
    }
}

compressSession();
`;

    // Create tools directory if it doesn't exist
    const toolsDir = path.join(process.cwd(), 'tools');
    if (!fs.existsSync(toolsDir)) {
        fs.mkdirSync(toolsDir, { recursive: true });
    }
    
    // Save compression tool
    const toolPath = path.join(toolsDir, 'compress-session.js');
    fs.writeFileSync(toolPath, compressionTool);
    console.log("[MULAA] 🔧 Created session compression tool at:", toolPath);
}

// ========================
// YOUR EXISTING CODE (UPDATED)
// ========================

// MULAA Configuration Essence
const prefix = process.env.PREFIX || config.PREFIX;
const sessionName = "chronicle";
const app = express();
const mulaaPurple = chalk.bold.hex("#6A11CB");
const mulaaGold = chalk.bold.hex("#FFD700");
let useQR = false;
let initialCommunion = true;
const PORT = process.env.PORT || 50900;

// Sacred Logger - Chronicles all events
const MULAA_LOGGER = pino({
    timestamp: () => \`,"time":"\${new Date().toJSON()}"\`
});
const logger = MULAA_LOGGER.child({});
logger.level = "trace";

const msgRetryCounterCache = new NodeCache();

const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);

// Chronicle Sanctum Paths
const mulaaSanctum = path.join(__dirname, 'chronicles');
const essencePath = path.join(mulaaSanctum, 'creds.json');

if (!fs.existsSync(mulaaSanctum)) {
    fs.mkdirSync(mulaaSanctum, { recursive: true });
}

// Create compression tool on first run
createCompressionTool();

async function awakenMulaaConduit() {
    try {
        const { state, saveCreds } = await useMultiFileAuthState(mulaaSanctum);
        const { version, isLatest } = await fetchLatestBaileysVersion();
        console.log(\`[MULAA] ⚡ XMD BOT using WA v\${version.join('.')}, Latest: \${isLatest}\`);
        
        const MulaaConduit = makeWASocket({
            version,
            logger: pino({ level: 'silent' }),
            printQRInTerminal: useQR,
            browser: ["MULAA-XMD", "safari", "1.0"],
            auth: state,
            getMessage: async (key) => {
                return { conversation: "MULAA XMD BOT - Tribute Automation System" };
            }
        });

        // ... [KEEP YOUR EXISTING EVENT HANDLERS HERE] ...
        // They remain exactly the same

    } catch (error) {
        console.error('[MULAA] ⚡ Critical Communion Error:', error);
        process.exit(1);
    }
}

async function initiateMulaaRitual() {
    if (fs.existsSync(essencePath)) {
        console.log("[MULAA] 📜 Chronicle essence found, awakening conduit...");
        await awakenMulaaConduit();
    } else {
        console.log("[MULAA] 🔄 Checking for session configuration...");
        
        const format = detectSessionFormat(config.SESSION_ID);
        console.log(\`[MULAA] 📊 Detected format: \${format.type}\`);
        
        if (format.valid) {
            const downloaded = await downloadChronicleEssence();
            if (downloaded) {
                console.log("[MULAA] ✅ Session loaded, initiating communion...");
                await awakenMulaaConduit();
            } else {
                console.log("[MULAA] ❌ Session download failed, showing QR...");
                useQR = true;
                await awakenMulaaConduit();
            }
        } else {
            console.log("[MULAA] ✨ No valid session found - QR sigil will manifest...");
            useQR = true;
            await awakenMulaaConduit();
        }
    }
}

initiateMulaaRitual();

app.get('/', (req, res) => {
    res.send('MULAA XMD BOT - The Heartstone is active. For Legacy. For the Code. For MULAA.');
});

app.get('/chronicle', (req, res) => {
    res.json({
        project: "MULAA XMD BOT",
        creator: "Amantle Mpaekae (Mulax Prime)",
        purpose: "Tribute automation and cinematic integration",
        status: "Heartstone Active",
        version: "2.0.0",
        session_format: detectSessionFormat(config.SESSION_ID).type,
        timestamp: new Date().toISOString()
    });
});

app.get('/session-info', (req, res) => {
    const format = detectSessionFormat(config.SESSION_ID);
    res.json({
        has_session: !!config.SESSION_ID,
        session_format: format.type,
        session_valid: format.valid,
        session_length: config.SESSION_ID?.length || 0,
        supports: ['mega', 'compressed', 'json', 'qr'],
        tools_available: ['/tools/compress-session.js']
    });
});

app.listen(PORT, () => {
    const format = detectSessionFormat(config.SESSION_ID);
    console.log(mulaaPurple(\`
╔══════════════════════════════════════════════════╗
║           MULAA XMD BOT - HEARTSTONE ACTIVE      ║
╠══════════════════════════════════════════════════╣
║                                                  ║
║  Creator: Amantle Mpaekae (Mulax Prime)          ║
║  Project: MULAA XMD BOT v2.0                     ║
║  Communion Port: \${PORT}                         ║
║  Session Format: \${format.type.toUpperCase()}    ║
║  Session Valid: \${format.valid ? '✅' : '❌'}     \${format.valid ? '' : '(QR will show)'}\$
║                                                  ║
║  Endpoints:                                      ║
║  • /chronicle - Bot info                         ║
║  • /session-info - Session details               �║
║                                                  ║
║  Tools:                                          ║
║  • node tools/compress-session.js                ║
║                                                  ║
║  For Legacy. For the Code. For MULAA.            ║
║                                                  ║
╚══════════════════════════════════════════════════╝
\`));
});
