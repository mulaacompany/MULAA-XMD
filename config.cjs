// MULAA XMD BOT - Configuration Chronicles
// Creator: Amantle Mpaekae (Mulax Prime)
// Location: /config.cjs (Configuration Sanctum)
// Sigil: [MULAA_XMD_CONFIG]

require("dotenv").config();

const config = {
  // CORE ESSENCE
  SESSION_ID: process.env.SESSION_ID || "MULAA~H4sIAAAAAAAAA5VUyZKjOBD9lQld7Wiz2GCIqIgBvIAx3rfyRB8EEiBb7AKDO/zvE7iquvow01PDSWh5+TLfy/wB4oQU2MYNUH+ANCcVZLhdsibFQAV66fs4B12AIINABdIIHrcjpWIWtnVxyZEZvb+eFumkhv4wCkxF2CtmSO8TIXkBjy5IS5cS7zeAWrkYO0Rg0xNFFwr523h24Yq8NOuBaBrk/FptccCsA7y1gC0iJDmJg3Ea4gjnkNq4WUGSf40+se/X245NmHc+Z5vLYISOs0rx6bzx1729wpz5LL3tdCPi91+jH1dyReaTg+Js9JM8R4Ecnlz7dhqbTS0MD69xYV4tV9iazfiNfkGCGCML4ZgR1ny57kN9zgTf9ObubbGVWWOYmjUTymnAcXZib3U7CrJLoc2kwxfrPpoMQ6dPO1hZuSS9V9muPO062dqFhVEbs5M73txH9/zQjPe/El/lH165/p+6WzrZ4HjJJXcl95Z4VWcXvtkYnnO417t0lgzjFbrU0eHwVfrHys/GlXUq0yiXd7yVNWiTZtnYOkLJQGs0mp7hdOL2zvvbJ33Iyvx3LO881c/mEG2cuCP63OQs28HW9Tl52ZlNdCvsBV5sSNrcyl4HxnoqLu7Em9Ig1D0tMmHoWk7o7gKk9+t0ky17NJN5M7y9PDO64sZCQOUfXZDjgBQsh4wkcbsnCGIXQFRtsZdj9iwv0KR+f7MeHgvY6AFLr1djwImGqDWzQXiUp2E60cx47ShpyL2ALkjzxMNFgZFJCpbkjYOLAga4AOpf37sgxjV7E64NJ/Jd4JO8YPu4TGkC0YeqH4fQ85IyZtsm9ox2gXOgcp/bmDESB0VbxzKGuReSChshZAVQfUgL/DNDnGMEVJaX+GfXGglqCy/trbWj2FvQBdFTEIKACgRJlgd9SVD4vsoLfxbfbi0qTNNvMWagC2LYXgZOSSH8w0iiFMYN6AL6fMwP+7zECf2ByCn9gdwCtAePn7zbMAgzSGgBVGAsRZrJjj6eV0fmJNOpNg40I9DAZ54fhnkThLuMLvZJ3i05YnNHqVo3UDMTqBuLg1XVYj3nT50qsWd8s3/5BxCggouUpXZQRbjU3ZqM+uxa9eguRdNtgmi1EuwNg9rKJ4KT98MxXsB14TER08Fd0hhyyTm5jk7FsVcPqM6M9CqKYTpq3dUFCFfEw78GOxYjC9vzyW2Ft4k1zwYXDr023CnmO5vdKTPuQUhpNpqyFXJvY8Imp4ZQpcmN2cJzsIb2lwteuoayU85mPRPvXn/Jh9qblZ+tRN9HGHmarFWw/fUJfk6Ed6n+S9E33q3vuEf3F4j3EfMvbaoj69ZvaIe7M4uwSZlzThTo0jRYXw7b+RANt8qhl0sGQR4Fj8f3LkgpZH6SR0AFReRC0AV5UrYutmI/+U0kQwssLQgWbdYUFkz77IwdiXDBYJQClZclSZIGnKC83VrlSWrCIgQqEIPVfnZtbd5oabplkH00GtDazwpW4PE3Bp5Ci4QHAAA=",
  PREFIX: process.env.PREFIX || '.',
  MODE: process.env.MODE || "public",
  
  // AUTOMATION
  AUTO_REACT: process.env.AUTO_REACT !== undefined ? process.env.AUTO_REACT === 'true' : true,
  AUTO_STATUS_SEEN: process.env.AUTO_STATUS_SEEN !== undefined ? process.env.AUTO_STATUS_SEEN === 'true' : true,
  AUTO_STATUS_REPLY: process.env.AUTO_STATUS_REPLY !== undefined ? process.env.AUTO_STATUS_REPLY === 'true' : false,
  STATUS_READ_MSG: process.env.STATUS_READ_MSG || '✅ Status chronicled by MULAA XMD BOT',
  
  // SECURITY
  AUTO_BLOCK: process.env.AUTO_BLOCK !== undefined ? process.env.AUTO_BLOCK === 'true' : true,
  REJECT_CALL: process.env.REJECT_CALL !== undefined ? process.env.REJECT_CALL === 'true' : false,
  
  // MULAA IDENTITY
  BOT_NAME: process.env.BOT_NAME || "MULAA-XMD",
  MENU_IMAGE: process.env.MENU_IMAGE || "https://files.catbox.moe/52699c.jpg",
  DESCRIPTION: process.env.DESCRIPTION || "© ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴀᴍᴀɴᴛʟᴇ ᴍᴘᴀᴇᴋᴀᴇ (ᴍᴜʟᴀx ᴘʀɪᴍᴇ)",
  
  // CREATOR ESSENCE
  OWNER_NAME: process.env.OWNER_NAME || "Amantle Mpaekae (Mulax Prime)",
  OWNER_NUMBER: process.env.OWNER_NUMBER || "26775462914",
  OWNER_NUMBERS: process.env.OWNER_NUMBERS ? 
    process.env.OWNER_NUMBERS.split(',').map(num => num.trim()) : 
    ["26775462914", "26776660902"],
  
  // EXTERNAL APIS
  GEMINI_KEY: process.env.GEMINI_KEY || "",
  REPOSITORY_URL: process.env.REPOSITORY_URL || "https://github.com/romeobwiii/MULAA-XMD",
  
  // GROUP SETTINGS
  WELCOME: process.env.WELCOME !== undefined ? process.env.WELCOME === 'true' : true,
  ANTILINK: process.env.ANTILINK !== undefined ? process.env.ANTILINK === 'true' : true,
  
  // MULAA SIGNATURES
  MULAA_SIGNATURE: process.env.MULAA_SIGNATURE || "#6A11CB",
  PROJECT_NAME: process.env.PROJECT_NAME || "MULAA XMD BOT",
  VERSION: process.env.VERSION || "2.0.0",
  
  // PATHS
  CHRONICLE_PATH: process.env.CHRONICLE_PATH || "./chronicles",
  LOG_PATH: process.env.LOG_PATH || "./logs",
  
  // PERFORMANCE
  MAX_CONNECTIONS: parseInt(process.env.MAX_CONNECTIONS) || 500,
  
  // SERVER
  PORT: parseInt(process.env.PORT) || 50900,
  HOST: process.env.HOST || "0.0.0.0",
  NODE_ENV: process.env.NODE_ENV || "production",
  
  // DEBUG
  DEBUG_MODE: process.env.DEBUG_MODE !== undefined ? process.env.DEBUG_MODE === 'true' : false,
  LOG_LEVEL: process.env.LOG_LEVEL || "info"
};

// Simple validation
if (config.SESSION_ID && config.SESSION_ID !== "MULAA~YourChronicleEssenceHere") {
  if (!config.SESSION_ID.startsWith("MULAA~")) {
    console.warn("[MULAA] ⚠️ SESSION_ID should start with 'MULAA~'");
  }
}

if (config.OWNER_NUMBER) {
  const cleanNumber = config.OWNER_NUMBER.replace(/[^0-9]/g, '');
  if (cleanNumber.length < 10) {
    console.warn(`[MULAA] ⚠️ OWNER_NUMBER ${config.OWNER_NUMBER} may be invalid`);
  }
}

console.log(`
╔══════════════════════════════════════════════════╗
║          MULAA XMD CONFIGURATION LOADED          ║
╠══════════════════════════════════════════════════╣
║  Creator: ${config.OWNER_NAME}                   ║
║  Bot Name: ${config.BOT_NAME}                    ║
║  Version: ${config.VERSION}                      ║
║  Prefix: ${config.PREFIX}                        ║
║  Mode: ${config.MODE}                            ║
║  Owner: ${config.OWNER_NUMBER}                   ║
║                                                  ║
║  For Legacy. For the Code. For MULAA.            ║
╚══════════════════════════════════════════════════╝
`);

module.exports = config;
