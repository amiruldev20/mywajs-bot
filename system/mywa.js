import "../setting.js"
import { Client, serialize } from "./lib/serialize.js"
import { Message, readCommands } from "./event/message.js"
import { database as databes } from "./lib/lib.database.js"
const database = new databes()

async function start() {
    process.on("uncaughtException", console.error)
    process.on("unhandledRejection", console.error)
    readCommands()

const content = await database.read();
if (content && content.data) {
  global.db = {
    users: {},
    groups: {},
    ...(content.data || {}),
  };
  await database.write();
} else {
  global.db = content?.data;
}

    const mywa = new Client({
        authStrategy: new npm.mywajs.LocalAuth(),
        playwright: {
            headless: true,
            devtools: false,
            args: [
                '--aggressive-tab-discard',
                '--disable-accelerated-2d-canvas',
                '--disable-application-cache',
                '--disable-cache',
                '--disable-dev-shm-usage',
                '--disable-gpu',
                '--disable-offline-load-stale-cache',
                '--disable-setuid-sandbox',
                '--disable-setuid-sandbox',
                '--disk-cache-size=0',
                '--ignore-certificate-errors',
                '--no-first-run',
                '--no-sandbox',
                '--no-zygote',
                //'--enable-features=WebContentsForceDark:inversion_method/cielab_based/image_behavior/selective/text_lightness_threshold/150/background_lightness_threshold/205'
            ],
            bypassCSP: true,
        },
        markOnlineAvailable: true,
        qrMaxRetries: 2,
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36',
        takeoverTimeoutMs: 'Infinity',
        clearSessions: true
    })

    mywa.initialize()

    mywa.on("qr", qr => {
        console.info("Loading QR Code for WhatsApp, Please Scan...")
        npm.qrcode.generate(qr, { small: true })
    })

    mywa.on("loading_screen", (percent, message) => {
        console.log(npm.chalk.bgBlack(npm.chalk.green(message)) + " :" + npm.chalk.bgBlack(npm.chalk.yellow(percent)))
    })

    mywa.on("authenticated", console.info)

    mywa.on("auth_failure", console.error)

    mywa.on("ready", m => {
        console.info("Client is already on ")
        mywa.sendMessage("6285157489446@c.us", 'Bot connected!!')
    })

    mywa.on("disconnected", m => {
        if (m) start()
    })

    mywa.on("message_create", async (message) => {
        const m = await (await serialize(mywa, message))
    })

    mywa.on("call", console.log)

    mywa.on('group_join', async (join) => {
    })

    mywa.on('group_leave', async (join) => {
    })

    mywa.on('group_admin_changed', async (gc) => {
        console.log(gc)
    })
    // rewrite database every 30 seconds
    setInterval(async () => {
        if (global.db) await database.write(global.db)
    }, 3000)

    return mywa
}


start()


reloadFile(import.meta.url)
