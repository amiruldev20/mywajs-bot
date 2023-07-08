/*
/*************************
* Pake tinggal make
* jangan hapus sumbernya
**************************
* Github: amiruldev20
* Wa: 085157489446
*/

//-- import config
import "../setting.js";
import chokidar from "chokidar";
import * as conf from "../setting.js";

//-- import file
import Function from "./lib/function.js";
import { Client, serialize } from "./lib/serialize.js";
import { Message, readCommands } from "./event/messages.js";
import { Localdb } from "./lib/localdb.js";
import { idb } from "./lib/database.js";
import Collection from "./lib/collection.js";
const port = process.env.PORT || 1337;
const { cconnect } = await import("../server.js");

//-- global system
global.commands = new Collection();

async function start() {
  process.on("uncaughtException", console.error);
  process.on("unhandledRejection", console.error);
  readCommands();

  const props = new Localdb(global.database);

  const mywa = new Client({
    authStrategy: new conf.mywajs.LocalAuth(),
    playwright: {
      headless: true,
      devtools: false,
      args: [
        "--aggressive-tab-discard",
        "--disable-accelerated-2d-canvas",
        "--disable-application-cache",
        "--disable-cache",
        "--disable-dev-shm-usage",
        "--disable-gpu",
        "--disable-offline-load-stale-cache",
        "--disable-setuid-sandbox",
        "--disable-setuid-sandbox",
        "--disk-cache-size=0",
        "--ignore-certificate-errors",
        "--no-first-run",
        "--no-sandbox",
        "--no-zygote",
        //'--enable-features=WebContentsForceDark:inversion_method/cielab_based/image_behavior/selective/text_lightness_threshold/150/background_lightness_threshold/205'
      ],
      //executablePath: platform() === 'win32' ? chromium.executablePath() : '/usr/bin/google-chrome-stable',
      bypassCSP: true,
    },
    markOnlineAvailable: false,
    qrMaxRetries: 6,
    userAgent:
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_5) AppleWebKit/603.2.4 (KHTML, like Gecko) Version/11.1.2 Safari/603.2.4",
    takeoverTimeoutMs: "Infinity",
    clearSessions: true,
  });
  await cconnect(mywa, port);
  mywa.initialize();

  global.db = {
    users: [],
    groups: [],
    store: [],
    setting: {},
    command: {},
    ...((await props.fetch()) || {}),
  };
  await props.save(global.db);

  mywa.on("qr", (qr) => {
    console.info("Loading QR Code for WhatsApp, Please Scan...");
    conf.qrcode.generate(qr, { small: true });
  });

  mywa.on("loading_screen", (percent, message) => {});

  mywa.on("auth_failure", console.error);

  mywa.on("ready", (m) => {
    console.info("Client is already on ");
  });

  mywa.on("disconnected", (m) => {
    if (m) start();
  });

  mywa.on("message_create", async (message) => {
    const m = await await serialize(mywa, message);
    await await Message(mywa, m);
    await idb(m);
    //console.log("msg ", m)
  })
  
  mywa.on('poll_vote', (vote) => {
    console.log("myv ", vote)
});

  // rewrite database every 3 seconds
  setInterval(async () => {
    if (global.db) await props.save(global.db);
  }, 3000);

  return mywa;
}

start();

let choki = chokidar.watch(
  [
    conf.path.join(process.cwd(), set.opt.pathCommand),
    conf.path.join(process.cwd(), "system", "event"),
  ],
  {
    //   ignored: /^\.|mywajs.js/,
    persistent: true,
  }
);
choki
  .on("change", async (Path) => {
    console.log(`Changed ${Path}`);
    await Function.reloadDir(Path, global.commands);
  })
  .on("add", async function (Path) {
    await Function.reloadDir(Path, global.commands);
  });
console.log("Loading chat...");
set.reloadFile(import.meta.url);
