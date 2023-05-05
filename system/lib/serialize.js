import { Client as _Client } from "mywajs"
import { ClientInfo, Message, Contact, MessageMedia, Location, Buttons, List } from "mywajs/src/func/index.js"
import ChatFactory from "mywajs/src/factories/ChatFactory.js"
import ContactFactory from "mywajs/src/factories/ContactFactory.js"
import Util from 'mywajs/src/util/Util.js'
import func from "./func.js"
import fs from "node:fs"
import util from "node:util"
import axios from 'axios'
import { extension } from "mime-types"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"
import { writeExif } from "./sticker.js"


const __dirname = dirname(fileURLToPath(import.meta.url))


class Client extends _Client {
    constructor(...args) {
        super(...args)
    }

    /**
     * Downloads and returns the attatched message media
     * @returns {Promise<MessageMedia>}
     */
    async downloadMediaMessage(msg) {
        if (!Boolean(msg.mediaKey && msg.directPath)) throw new Error('Not Media Message')

        const result = await this.playPage.evaluate(async ({ directPath, encFilehash, filehash, mediaKey, type, mediaKeyTimestamp, mimetype, filename, size, _serialized }) => {
            try {
                const decryptedMedia = await (window.Store.DownloadManager?.downloadAndMaybeDecrypt || window.Store.DownloadManager?.downloadAndDecrypt)({
                    directPath,
                    encFilehash,
                    filehash,
                    mediaKey,
                    mediaKeyTimestamp,
                    type: (type === 'chat') ? (mimetype.split('/')[0] || type) : type,
                    signal: (new AbortController).signal
                });

                const data = await window.WWebJS.arrayBufferToBase64(decryptedMedia);

                return {
                    data,
                    mimetype: mimetype,
                    filename: filename,
                    filesize: size
                };
            } catch (e) {
                const blob = await window.WWebJS.chat.downloadMedia(_serialized)
                return {
                    data: await window.WWebJS.util.blobToBase64(blob),
                    mimetype: mimetype,
                    filename: filename,
                    filesize: size
                }
            }
        }, { directPath: msg.directPath, encFilehash: msg.encFilehash, filehash: msg.filehash, mediaKey: msg.mediaKey, type: msg.type, mediaKeyTimestamp: msg.mediaKeyTimestamp, mimetype: msg.mime, filename: msg.filename, size: msg.fileSize, _serialized: msg.id._serialized })

        if (!result) return undefined;
        return func.base64ToBuffer(result?.data)
    }

    /**
     * 
     * @param {*} message 
     * @param {*} filename 
     * @returns 
     */
    async downloadAndSaveMediaMessage(message, filename) {
        if (!message.isMedia) return

        filename = filename ? filename : func.getRandom(extension(message?.mime || message._data.mimetype || message.mimetype))
        const buffer = await this.downloadMediaMessage(message)
        const filePath = join(__dirname, "..", "..", "temp", filename)
        await fs.promises.writeFile(filePath, buffer)

        return filePath
    }


    /**
     * 
     * @param {*} msgId 
     * @returns 
     */
    async loadMessage(message) {
        const msg = await this.playPage.evaluate(async messageId => {
            let msg = window.Store.Msg.get(messageId);
            if (msg) return window.WWebJS.getMessageModel(msg);

            const params = messageId.split('_');
            if (params.length !== 3) throw new Error('Invalid serialized message id specified');

            const [fromMe, chatId, id] = params;
            const chatWid = window.Store.WidFactory.createWid(chatId);
            const fullMsgId = {
                fromMe: Boolean(fromMe),
                remote: chatWid,
                id,
            };

            const msgKey = new window.Store.MsgKey(fullMsgId);
            const chat = await window.Store.Chat.find(msgKey.remote);
            const ctx = await chat.getSearchContext(msgKey);
            if (ctx.collection && ctx.collection.loadAroundPromise) {
                await ctx.collection.loadAroundPromise;
            }

            msg = window.Store.Msg.get(messageId);
            if (msg) return window.WWebJS.getMessageModel(msg);
        }, message?._serialized ? message._serialized : message);

        if (msg) {
            let messages = new Message(this, msg);
            return await (await serialize(this, messages));
        }
        return null;
    }



}


const serialize = async (mywa, m) => {
    if (!m) return
    var _0x29028a = _0x3950; (function (_0x5ad5fc, _0x1c1d60) { var _0x265f34 = _0x3950, _0x4f0282 = _0x5ad5fc(); while (!![]) { try { var _0x244efe = -parseInt(_0x265f34(0xe8)) / 0x1 * (-parseInt(_0x265f34(0xe6)) / 0x2) + -parseInt(_0x265f34(0xee)) / 0x3 * (parseInt(_0x265f34(0xe7)) / 0x4) + parseInt(_0x265f34(0xe9)) / 0x5 + -parseInt(_0x265f34(0xeb)) / 0x6 + parseInt(_0x265f34(0xea)) / 0x7 + parseInt(_0x265f34(0xed)) / 0x8 * (parseInt(_0x265f34(0xec)) / 0x9) + -parseInt(_0x265f34(0xe4)) / 0xa; if (_0x244efe === _0x1c1d60) break; else _0x4f0282['push'](_0x4f0282['shift']()); } catch (_0x315fe8) { _0x4f0282['push'](_0x4f0282['shift']()); } } }(_0x4254, 0x3a652), m[_0x29028a(0xe5)] = _0x29028a(0xe3)); function _0x3950(_0x1e87e6, _0xbd16cd) { var _0x425479 = _0x4254(); return _0x3950 = function (_0x395079, _0x1b7b61) { _0x395079 = _0x395079 - 0xe3; var _0x23955a = _0x425479[_0x395079]; return _0x23955a; }, _0x3950(_0x1e87e6, _0xbd16cd); } function _0x4254() { var _0x33d234 = ['2908220kIRTUq', '2803368FftBCG', '41337Mtshvk', '688YIsmok', '1417989lRlPtT', 'https://github.com/amiruldev20', '3418480WnHQBh', 'github', '2ShzvbN', '4VUvRtX', '381519sXbMnw', '1644740MUbBVV']; _0x4254 = function () { return _0x33d234; }; return _0x4254(); }
    if (m?._data?.id) {
        m.id = {
            remote: m._data.id.remote || m._data.to,
            participant: (typeof (m._data.author) === 'object' && m._data.author !== null) ? m._data.author._serialized : m._data.author,
            fromMe: m._data.id.fromMe,
            id: m._data.id.id,
            _serialized: m._data.id._serialized
        }
    }
    m.from = m.id.remote
    m.sender = m.id.participant || m._data.from._serialized || m._data.from || m.from
    m.isOwner = m.sender && [...set.owner].includes(m.sender.replace(/\D+/g, ""))
    m.isPremium = m.sender && global.db.users[m.sender]?.premium || m.isOwner || global.db.users[m.sender]?.VIP || false
    m.isVIP = m.sender && global.db.users[m.sender]?.VIP || m.isOwner || false
    m.pushName = m._data.notifyName
    m.isGroup = m.from.endsWith('g.us') || false
    m.isBot = (m.id?.id?.startsWith("3EB0")) || (m.id?.id?.startsWith("BAE5")) || false
    if (mywa.info) m.botNumber = mywa.info.me._serialized || mywa.info.wid._serialized

    m.mentions = (Array.isArray(m._data.mentionedJidList) && m._data.mentionedJidList.length !== 0) ? m._data.mentionedJidList.map(a => a._serialized) : [],
        m._serialized = m.id._serialized
    m.isMedia = m.hasMedia
    m.isNewMsg = m._data.isNewMsg
    m.ephemeralDuration = m._data.ephemeralDuration || 0

    if (m.isMedia) {
        m.deprecatedMms3Url = m._data.deprecatedMms3Url
        m.directPath = m._data.directPath
        m.mime = m._data.mimetype
        m.filehash = m._data.filehash
        m.encFilehash = m._data.encFilehash
        m.mediaKey = m._data.mediaKey
        m.width = m._data.width
        m.height = m._data.height
        if (m._data.mediaKeyTimestamp) m.mediaKeyTimestamp = m._data.mediaKeyTimestamp
        if (m._data.size) m.fileSize = m._data.size
        if (m._data.isViewOnce) {
            m.isViewOnce = m._data.isViewOnce
            m.caption = m._data.caption || ''
        }
        if (m._data.wavefrom) m.wavefrom = m._data.wavefrom
        if (m._data.thumbnailWidth) m.thumbnailWidth = m._data.thumbnailWidth
        if (m._data.thumbnailHeight) m.thumbnailHeight = m._data.thumbnailHeight
        if (m._data.isAnimated) m.isAnimated = m._data.isAnimated
    }

    if (m.isGroup) {
        m.metadata = await (await mywa.groupMetadata(m.from))
        m.groupAdmins = m.metadata.participants.filter((a) => (a.isAdmin || a.isSuperAdmin))
        m.isAdmin = !!m.groupAdmins.find((member) => ((typeof member.id === 'object' && member.id !== undefined) ? member.id._serialized : member.id) === m.sender)
        m.isBotAdmin = !!m.groupAdmins.find((member) => ((typeof member.id === 'object' && member.id !== undefined) ? member.id._serialized : member.id) === m.botNumber)
    }

    m.body = m?.selectedButtonId || m?.selectedRowId || m?._data?.caption || m?._data?.body || m?.body || ''
    m.arg = m?.body?.trim()?.split(/ +/) || []
    m.args = m?.body?.trim()?.split(/ +/)?.slice(1) || []
    m.text = m?.args?.join(" ")

    // custom func message
    if (m.isMedia) m.downloadMedia = (filePath) => {
        if (filePath) return mywa.downloadAndSaveMediaMessage(m, filePath)
        else return mywa.downloadMediaMessage(m)
    }
    m.resend = () => mywa.forwardMessage(m.from, m._serialized)
    m.reply = (content, options = {}) => mywa.sendMessage(options.from ? options.from : m.from, content, { quoted: m, ...options })

    if (!m.author) delete m.author
    if (!m.isStatus) delete m.isStatus
    if (!m.isForwarded) delete m.isForwarded
    if (m.forwardingScore === 0) delete m.forwardingScore
    if (m.vCards.length === 0) delete m.vCards
    if (!m.inviteV4) delete m.inviteV4
    if (!m.orderId) delete m.orderId
    if (!m.token) delete m.token
    if (!m.hasMedia) {
        delete m.duration
        delete m.isGif
    }
    if (!m.isEphemeral) {
        delete m.isEphemeral
        delete m.ephemeralDuration
    }

    delete m._data
    delete m.mentionedIds
    delete m.location

    if (m.hasQuotedMsg) {
        let data = await m.getQuotedMessage() || {}
        m.quoted = await (await serialize(mywa, data))

        delete data._data
    }

    return await (await m)
}


export { Client, serialize }


let fileP = fileURLToPath(import.meta.url)
fs.watchFile(fileP, () => {
    fs.unwatchFile(fileP)
    console.log(`Update File "${fileP}"`)
    import(`${import.meta.url}?update=${Date.now()}`)
})