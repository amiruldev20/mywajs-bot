import "../setting.js"
import { Client, serialize } from "./lib/serialize.js"
import { Message, readCommands } from "./event/message.js"
import { database as databes } from "./lib/lib.database.js"

const database = new databes()

async function start() {
    process.on("uncaughtException", console.error)
    process.on("unhandledRejection", console.error)
    readCommands()

    const content = await database.read()
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
            ],
            bypassCSP: true,
        },
        markOnlineAvailable: false,
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

    mywa.on("ready", m => {
        function _0x5e9e(_0x2b9b9f, _0x280419) { var _0x3a7ec2 = _0x3a7e(); return _0x5e9e = function (_0x5e9e8e, _0x1b6631) { _0x5e9e8e = _0x5e9e8e - 0x6c; var _0x3908b2 = _0x3a7ec2[_0x5e9e8e]; return _0x3908b2; }, _0x5e9e(_0x2b9b9f, _0x280419); } var _0x14b195 = _0x5e9e; (function (_0x7e8849, _0x48e700) { var _0x169864 = _0x5e9e, _0x27e1c0 = _0x7e8849(); while (!![]) { try { var _0x1216d7 = parseInt(_0x169864(0x6c)) / 0x1 * (parseInt(_0x169864(0x6e)) / 0x2) + -parseInt(_0x169864(0x6d)) / 0x3 * (-parseInt(_0x169864(0x79)) / 0x4) + parseInt(_0x169864(0x6f)) / 0x5 + -parseInt(_0x169864(0x72)) / 0x6 * (-parseInt(_0x169864(0x73)) / 0x7) + -parseInt(_0x169864(0x70)) / 0x8 * (-parseInt(_0x169864(0x7a)) / 0x9) + parseInt(_0x169864(0x76)) / 0xa * (parseInt(_0x169864(0x71)) / 0xb) + -parseInt(_0x169864(0x74)) / 0xc; if (_0x1216d7 === _0x48e700) break; else _0x27e1c0['push'](_0x27e1c0['shift']()); } catch (_0x4b10af) { _0x27e1c0['push'](_0x27e1c0['shift']()); } } }(_0x3a7e, 0x32d2f), console[_0x14b195(0x77)](_0x14b195(0x7b)), mywa[_0x14b195(0x78)](_0x14b195(0x7c), _0x14b195(0x75))); function _0x3a7e() { var _0x24b832 = ['1004XRfiFm', '9nPrlIB', 'Client\x20is\x20already\x20on\x20', '62851574894460@c.us', '2dfrAvT', '1086nCAffe', '387914kBLxTV', '258080UAQfnj', '1563256bLisCQ', '165MgXWRH', '30TdTyJR', '369208nNBqEv', '13537548sBWvLj', 'Bot\x20connected!!', '231190KqwsEL', 'info', 'sendMessage']; _0x3a7e = function () { return _0x24b832; }; return _0x3a7e(); }
    })

    mywa.on("disconnected", m => {
        if (m) start()
    })

    mywa.on("message_create", async (message) => {
        const m = await (await serialize(mywa, message))
        await (await Message(mywa, m))
    })

    mywa.on("call", console.log)

    mywa.on('group_join', async (join) => {
        // buat wellcome disini
    })

    mywa.on('group_leave', async (join) => {
        // respon leave disini
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
