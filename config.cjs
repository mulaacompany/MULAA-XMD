// config.js
const fs = require("fs");
require("dotenv").config();

const config = {
  SESSION_ID: process.env.SESSION_ID || "MULAA~H4sIAAAAAAAAA5VUyZKjOBD9lQld7Wiz2GCIqIgBvIAx3rfyRB8EEiBb7AKDO/zvE7iquvow01PDSWh5+TLfy/wB4oQU2MYNUH+ANCcVZLhdsibFQAV66fs4B12AIINABdIIHrcjpWIWtnVxyZEZvb+eFumkhv4wCkxF2CtmSO8TIXkBjy5IS5cS7zeAWrkYO0Rg0xNFFwr523h24Yq8NOuBaBrk/FptccCsA7y1gC0iJDmJg3Ea4gjnkNq4WUGSf40+se/X245NmHc+Z5vLYISOs0rx6bzx1729wpz5LL3tdCPi91+jH1dyReaTg+Js9JM8R4Ecnlz7dhqbTS0MD69xYV4tV9iazfiNfkGCGCML4ZgR1ny57kN9zgTf9ObubbGVWWOYmjUTymnAcXZib3U7CrJLoc2kwxfrPpoMQ6dPO1hZuSS9V9muPO062dqFhVEbs5M73txH9/zQjPe/El/lH165/p+6WzrZ4HjJJXcl95Z4VWcXvtkYnnO417t0lgzjFbrU0eHwVfrHys/GlXUq0yiXd7yVNWiTZtnYOkLJQGs0mp7hdOL2zvvbJ33Iyvx3LO881c/mEG2cuCP63OQs28HW9Tl52ZlNdCvsBV5sSNrcyl4HxnoqLu7Em9Ig1D0tMmHoWk7o7gKk9+t0ky17NJN5M7y9PDO64sZCQOUfXZDjgBQsh4wkcbsnCGIXQFRtsZdj9iwv0KR+f7MeHgvY6AFLr1djwImGqDWzQXiUp2E60cx47ShpyL2ALkjzxMNFgZFJCpbkjYOLAga4AOpf37sgxjV7E64NJ/Jd4JO8YPu4TGkC0YeqH4fQ85IyZtsm9ox2gXOgcp/bmDESB0VbxzKGuReSChshZAVQfUgL/DNDnGMEVJaX+GfXGglqCy/trbWj2FvQBdFTEIKACgRJlgd9SVD4vsoLfxbfbi0qTNNvMWagC2LYXgZOSSH8w0iiFMYN6AL6fMwP+7zECf2ByCn9gdwCtAePn7zbMAgzSGgBVGAsRZrJjj6eV0fmJNOpNg40I9DAZ54fhnkThLuMLvZJ3i05YnNHqVo3UDMTqBuLg1XVYj3nT50qsWd8s3/5BxCggouUpXZQRbjU3ZqM+uxa9eguRdNtgmi1EuwNg9rKJ4KT98MxXsB14TER08Fd0hhyyTm5jk7FsVcPqM6M9CqKYTpq3dUFCFfEw78GOxYjC9vzyW2Ft4k1zwYXDr023CnmO5vdKTPuQUhpNpqyFXJvY8Imp4ZQpcmN2cJzsIb2lwteuoayU85mPRPvXn/Jh9qblZ+tRN9HGHmarFWw/fUJfk6Ed6n+S9E33q3vuEf3F4j3EfMvbaoj69ZvaIe7M4uwSZlzThTo0jRYXw7b+RANt8qhl0sGQR4Fj8f3LkgpZH6SR0AFReRC0AV5UrYutmI/+U0kQwssLQgWbdYUFkz77IwdiXDBYJQClZclSZIGnKC83VrlSWrCIgQqEIPVfnZtbd5oabplkH00GtDazwpW4PE3Bp5Ci4QHAAA=",
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
