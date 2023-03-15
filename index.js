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
import wweb from 'wwebjs'
const {
    Client,
    LocalAuth
} = wweb
import {
    Collection
} from '@discordjs/collection';
import puppeteer from 'puppeteer';
import fs from 'fs';
import cron from 'node-cron';
import axios from 'axios';
import handlerMessage from './system/event/msg.js';

import dotenv from 'dotenv';
dotenv.config();

const mywa = new Client({
    authStrategy: new LocalAuth(),
    qrMaxRetries: 3,
    takeoverOnConflict: true,
    takeoverTimeoutMs: 3000,
    bypassCSP: true,
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36',
    puppeteer: {
        headless: true,
        defaultViewport: {
               width: 800,
               height: 1288
           },
        args: [
            '--no-sandbox',
            '--disable-web-security',
            '--no-first-run',
            '--no-default-browser-check',
            '--disable-setuid-sandbox',
            '--disable-accelerated-2d-canvas',
            '--disable-session-crashed-bubble',
            '--start-maximized',
	    '--disable-features=LightMode',
            '--force-dark-mode'
        ],
        ignoreHTTPSErrors: true,
        executablePath: '/usr/bin/google-chrome'
	    //'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
    }
});
// setingan diatas untuk menjalankan puppeteer di panel (goldpanel lebih tepatnya)
// run dipanel silahkan true headles
// panelmu ga sup puppeteer? pakailah goldpanel

export default mywa;

mywa.cmd = new Collection();
(await import("./system/index.js")).default(mywa)
mywa.initialize();

cron.schedule('*/3 * * * *', () => { 
try {
  console.log('Starting autoclear...');
  func.clearF("./tmp/")
} catch {
}
});

mywa.on('loading_screen', (percent, message) => {
    console.log('LOADING SCREEN', percent, message);
});

mywa.on("message_create", async (m) => {
    if (!m._data.isNewMsg) return
    //  let m = await serialize(hisoka, message)
    await handlerMessage(mywa, m)
})
