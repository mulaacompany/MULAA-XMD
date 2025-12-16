// config.js
const fs = require("fs");
require("dotenv").config();

const config = {
  SESSION_ID: process.env.SESSION_ID || "IK~H4sIAAAAAAAAA5VU25KiSBD9lY161RihUQEjOmIBEUHxhhd0Yx5KqoAS5FIUIE747xvY3TP9sDvby1NRlZF58pyT+QMkKSnwDDdg9ANklFSQ4fbImgyDEVBL38cUdAGCDIIR6GhWIB34Y3SpqKftfbqXj1mZWzN5JtmUozknnKUdXg+uu1fw6IKsPMfE+01CaaDC2UTgT0V5um2zQ137+jZ4qU/i4ZIsd1gTe/esdBAN7FfwaDNCQkkS6FmIr5jCeIabFST0a/CNqZ/7G6MMxp252ZmZdFivVi9pX7ZZs88sPNtmKFa26lHXvwbfcDnIOWtncoKD/VJSdn69twfGUoBnmWqqh3ImoY2g39X0DX5BggQjE+GEEdZ8mXfDWI0HNNZ5ToeT8f2wXUXYXke9U3C0toHQz4pY2SWD3XzvfQ34xFmKar6Bszm8lJ39cop25cE7VaGl3WepLTNrMhHO/bAg68/AV/TDK9H/4T033E4iy5NbZeRlL6zN5mBa6dFEvmUHa5rsyGXtoKZYJPbX4As2yjpL14gw4rS55lDi9tAWT9ROqZWNtmk41TTGqCdqn+BDVtLfoVwt1SmMX6bN0quanmqdDLVfH4zVfBNEF1e6hVkt25ZS1/S8XKzS7eBiqP1M6ojjncuLa7ezWdQnXE+LiUepUJqEv55J/frsKMKNicCIf3QBxQEpGIWMpMnzTuoCiCoHexSzJ7vgYBlkmm62yPHl4V6c+xOj2nU0IVrwxtbODUO2L2HgneSl9wq6IKOph4sCoykpWEobGxcFDHABRn9974IE39ibbm01ge8Cn9CC7ZIyi1OIPkT9eISel5YJc5rE09oDpmDE/brGjJEkKFoaywRSLyQV1kLICjDyYVzgnw1iihEYMVrin0OrpajlfT2ere3B2AZdcH3qQRAYgRdRFOShJAhif8SLfxbf6jYrzLJvCWagC+JnFC+JLzLPiwNRfHkZDNvI9qELEtjmAhZs/rBg01L+jrgtgDCDJC7ACGjWdXHPo4m+cL1ASg1D0QNFCxTwq8MPp7xJwXdU88A1Uel25hw1ctfcRI3bsdXwvqGmpvT0BtfzunDH5us/JGltJmdIS0Vx0+BpbPFycXJvZY96QkyHO+1270/to7rpx4Z73uiLchvXNVWP+fnEa+PlEQ5VvkDJMbroOlV0eMvGYqSqwWtbDeGKePhzscWFd87r8tar99l4MKyyFdyGyjBMI3XqVNU8Rck+UjHp9+NcqLKLI4VYUGDVlMSxwjkeLLQj8llSxXkeiZzQqXMvCN48/Jyh+H13kae9Wu3aX5/g5yp4V+G/tHzD3TqOe3Q/pXjfLf8ynyryA2fC7Gwe94g8u+Vxo5/suHdRjh4HGyVY3eyk0KT5pG7A4/G9C7IYMj+lVzACMEE0fTqFpmVrYTPx098U05TAVILAaRuPYcGUX2OxJVdcMHjNwIgXhwNpKHCc/Ba1omk2hUXYrqiNfBLk1uONkmUOg+xjyoDSfqshBY+/AftIHYmABwAA",
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
