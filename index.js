/*
|=================================|
| NAME: WWEBJS BASE               |
| VERSION: 1.0.1                  |
| CREATOR: Amirul Dev             |
| GITHUB: amiruldev20             |
| IG: @amirul.dev                 |
|=================================|
| Thanks To:                      |
| - Istiqmal                      |
| - Hisoka                        |
| - And you                       |
|=================================|
*/
const {
    Client,
    LocalAuth
} = require('wwebjs')
const {
    Collection
} = require('@discordjs/collection')
require('dotenv').config()

const mywa = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
      //  headless: false, //uncomment ini jika ingin live chromium
        args: ['--no-sandbox'] // hide ini untuk live chromium
    }
});
// setingan diatas untuk menjalankan puppeteer di panel run bot
// panelmu ga sup puppeteer? pakailah goldpanel
module.exports = mywa;

mywa.cmd = new Collection();
require("./system")(mywa);
mywa.initialize();
mywa.on('loading_screen', (percent, message) => {
    console.log('LOADING SCREEN', percent, message);
});
