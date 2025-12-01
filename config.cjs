// config.js
const fs = require("fs");
require("dotenv").config();

const config = {
  SESSION_ID: process.env.SESSION_ID || "eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiS0Y4RTI3KzhoQ2FYcmdLdll6VGlPUEpWUm1nUDFKVk5DZFNCNW5mSTcxOD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRStmTXpjMFN3ZFhEMWhDTm9pVDlhaXlxUVFjN2JoRHgyL05WZlROVUFrZz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ5T3M1Y3BvZEhSMHdtV3NSbzA3OUhmeU9VM3JZT3E3MlkrV3JFRWRTV253PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJmYTlIWTllTVRDVU1SaVVhbW1sY0s5dzhMZHZrUGUwTDE3b0pDUUhtdmpFPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlFDMnE1WlhlK0tzbmR3eFVubTFmUm5id2pmZGhqeVVEYlBQL3pCU3l6bW89In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InNtWjdSME1Vd253YUJkeWk2dGJMTWk2clgzSWl1VEliWWxXOG03VzA5REU9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiR0NuSTBFRDQ0c3M5NzNneVF3RXEydWpuL3NSL0xhTGwyRTBJaDAzMTRuND0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQU8yYUxTQ2cwMjBYVzZTeW9DQ05OdU9RTm1zWit1RnZTUWNXYWlLVEhEWT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im5qOCs3MG9lU3QvRVloSkZraFBGZHZBTlZ1SmJSTkp3MnVGbnNkaU1TaW44Q1pHRm96a3Fsd2NMK0taQVozUEc2QUVHdDVEQ3Y2OTA1a0FvZ1IvQmlBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTEwLCJhZHZTZWNyZXRLZXkiOiJIalQvQm90TVh3Rm1QN25Kb3dkaU9SUFdvOUN4UzFwbSsyTC9OQk5YWkI0PSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwicmVnaXN0ZXJlZCI6dHJ1ZSwicGFpcmluZ0NvZGUiOiI0TjFKU1Y0NCIsIm1lIjp7ImlkIjoiMjY3NzU0NjI5MTQ6OEBzLndoYXRzYXBwLm5ldCIsIm5hbWUiOiJNdWxhYSBDb21wYW55IiwibGlkIjoiMTg0MTYwMjQ1MzA5NDU3OjhAbGlkIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNPemxxN01CRU9YNXRNa0dHQVlnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiIwakRqS1g3VE8waUswVzZ2UXlhQUhvYUJDTlZJdngzeEwxWCt2b0tKMXlVPSIsImFjY291bnRTaWduYXR1cmUiOiJQa0U1WXpSY0dzRkwrMCs0cG96TTY0UE4ydm1xYnRiMlAvTmtyTmQzazdaVFcxZkQ0YXJhYnhidDdNSU9FSm0vL3lWTWRtWUdzSEFtTzUwZzVrdFlCdz09IiwiZGV2aWNlU2lnbmF0dXJlIjoiQjJEdjIvcjU5cFdUSzVTZlJWN1NSbHRYZ1VLaUJjeGtWWDU3OW53eEE0ZE5WVjhxRzV6eXpOZmtiWThXVnFvTlRvd0pERndQakZSUXIzNFRlOG5YaXc9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyNjc3NTQ2MjkxNDo4QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQmRJdzR5bCswenRJaXRGdXIwTW1nQjZHZ1FqVlNMOGQ4UzlWL3I2Q2lkY2wifX1dLCJwbGF0Zm9ybSI6InNtYmEiLCJyb3V0aW5nSW5mbyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkNBZ0lBZ2dOIn0sImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTc2NDU3MjQwNiwibGFzdFByb3BIYXNoIjoiM2dQVUprIn0=",
  PREFIX: process.env.PREFIX || '.',
  AUTO_STATUS_SEEN: process.env.AUTO_STATUS_SEEN !== undefined ? process.env.AUTO_STATUS_SEEN === 'true' : true, 
  AUTO_STATUS_REPLY: process.env.AUTO_STATUS_REPLY !== undefined ? process.env.AUTO_STATUS_REPLY === 'true' : true,
  STATUS_READ_MSG: process.env.STATUS_READ_MSG || '',
  ANTI_DELETE: process.env.ANTI_DELETE !== undefined ? process.env.ANTI_DELETE === 'true' : true, 
  ANTI_DELETE_PATH: process.env.ANTI_DELETE_PATH || "inbox", // set same for same chat 
  AUTO_DL: process.env.AUTO_DL !== undefined ? process.env.AUTO_DL === 'true' : false,
  AUTO_READ: process.env.AUTO_READ !== undefined ? process.env.AUTO_READ === 'true' : false,
  AUTO_TYPING: process.env.AUTO_TYPING !== undefined ? process.env.AUTO_TYPING === 'true' : false,
  AUTO_RECORDING: process.env.AUTO_RECORDING !== undefined ? process.env.AUTO_RECORDING === 'true' : false,
  ALWAYS_ONLINE: process.env.ALWAYS_ONLINE !== undefined ? process.env.ALWAYS_ONLINE === 'true' : false,
  AUTO_REACT: process.env.AUTO_REACT !== undefined ? process.env.AUTO_REACT === 'true' : false,
   /*auto block only for 212 */
  AUTO_BLOCK: process.env.AUTO_BLOCK !== undefined ? process.env.AUTO_BLOCK === 'true' : true,
  REJECT_CALL: process.env.REJECT_CALL !== undefined ? process.env.REJECT_CALL === 'true' : false, 
  NOT_ALLOW: process.env.NOT_ALLOW !== undefined ? process.env.NOT_ALLOW === 'true' : true,
  MODE: process.env.MODE || "public",
  BOT_NAME: process.env.BOT_NAME || "MULAA-XMD",
  MENU_IMAGE: process.env.MENU_IMAGE || "https://files.catbox.moe/7l1tt5.jpg",
  DESCRIPTION: process.env.DESCRIPTION || "© ᴘᴏᴡᴇʀᴇᴅ ʙʏ MULAA-XMD",
  OWNER_NAME: process.env.OWNER_NAME || "MULAA-XMD",
  OWNER_NUMBER: process.env.OWNER_NUMBER || "267 76 660 902",
  GEMINI_KEY: process.env.GEMINI_KEY || "AIzaSyCUPaxfIdZawsKZKqCqJcC-GWiQPCXKTDc",
  WELCOME: process.env.WELCOME !== undefined ? process.env.WELCOME === 'true' : false, 
};


module.exports = config;
