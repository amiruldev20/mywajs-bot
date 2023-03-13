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
        headless: false,
        defaultViewport: {
            width: 800,
            height: 1288
        },
        args: ['--no-sandbox',
            '--no-first-run',
            '--no-default-browser-check',
            '--disable-setuid-sandbox',
            '--disable-accelerated-2d-canvas',
            '--disable-session-crashed-bubble',
            '--start-maximized'
        ],
        ignoreHTTPSErrors: true
    }
});
// setingan diatas untuk menjalankan puppeteer di rdp
// run dipanel silahkan true headles
// panelmu ga sup puppeteer? pakailah goldpanel
module.exports = mywa;

mywa.cmd = new Collection();
require("./system")(mywa);
mywa.initialize();
mywa.on('loading_screen', (percent, message) => {
    console.log('LOADING SCREEN', percent, message);
});