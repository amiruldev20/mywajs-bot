import { Client as _Client } from "mywajs";
/*
/*************************
* Pake tinggal make
* jangan hapus sumbernya
**************************
* Github: amiruldev20
* Wa: 085157489446
*/
import {
  Message,
  MessageMedia,
  Contact,
  Location,
  Buttons,
  List,
} from "mywajs/src/structures/index.js";
import Function from "./function.js";
import fs, { stat } from "fs";
import { extension } from "mime-types";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import Util from "mywajs/src/util/Util.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

class Client extends _Client {
  constructor(...args) {
    super(...args);
  }

  async setProfilePic(chatId, content, type = "normal") {
    let data;
    if (
      Buffer.isBuffer(content) ||
      /^data:.*?\/.*?;base64,/i.test(content) ||
      /^https?:\/\//.test(content) ||
      fs.existsSync(content)
    ) {
      let media = await Function.getFile(content);
      if (type === "long") {
        data = {
          img: await (
            await Function.resizeImage(media?.data, 720)
          ).toString("base64"),
          preview: await (
            await Function.resizeImage(media?.data, 120)
          ).toString("base64"),
        };
      } else if (type === "normal") {
        data = {
          img: await (
            await Function.resizeImage(media?.data, 640)
          ).toString("base64"),
          preview: await (
            await Function.resizeImage(media?.data, 96)
          ).toString("base64"),
        };
      }
    }

    return this.mPage.evaluate(
      async ({ chatId, preview, image, type }) => {
        let chatWid = await window.Store.WidFactory.createWid(chatId);

        if (type === "delete")
          return window.Store.GroupUtils.requestDeletePicture(chatWid);

        return window.Store.GroupUtils.sendSetPicture(chatWid, image, preview);
      },
      { chatId, preview: data.img, image: data.preview, type }
    );
  }

  /**
   *
   * @param {*} text
   * @returns
   */
  parseMention(text) {
    return (
      [...text.matchAll(/@([0-9]{5,16}|0)/g)].map((v) => v[1] + "@c.us") || []
    );
  }
}

const serialize = async (mywa, m) => {
  if (!m) return;

  if (m?._data?.id) {
    m.id = {
      remote: m._data.id.remote || m._data.to,
      participant:
        typeof m._data.author === "object" && m._data.author !== null
          ? m._data.author._serialized
          : m._data.author,
      fromMe: m._data.id.fromMe,
      id: m._data.id.id,
      _serialized: m._data.id._serialized,
    };
  }
  m.from = m.id.remote;
  m.sender =
    m.id.participant || m._data.from._serialized || m._data.from || m.from;
  m.isOwner =
    m.sender && [...global.set.owner].includes(m.sender.replace(/\D+/g, ""));
  //m.isPremium = m.sender && global.db.users[m.sender]?.premium || m.isOwner || global.db.users[m.sender]?.VIP || false
  m.isVIP = (m.sender && global.db.users[m.sender]?.VIP) || m.isOwner || false;
  m.pushName = m._data.notifyName;
  m.isGroup = m.from.endsWith("g.us") || false;
  m.isBot =
    m.id?.id?.startsWith("3EB0") || m.id?.id?.startsWith("BAE5") || false;
  if (mywa.info)
    m.botNumber = mywa.info.me._serialized || mywa.info.wid._serialized;

  (m.mentions =
    Array.isArray(m._data.mentionedJidList) &&
    m._data.mentionedJidList.length !== 0
      ? m._data.mentionedJidList.map((a) => a._serialized)
      : []),
    (m._serialized = m.id._serialized);
  m.isMedia = m.hasMedia;
  m.isNewMsg = m._data.isNewMsg;
  m.ephemeralDuration = m._data.ephemeralDuration || 0;

  if (m.isMedia) {
    m.deprecatedMms3Url = m._data.deprecatedMms3Url;
    m.directPath = m._data.directPath;
    m.mime = m._data.mimetype;
    m.filehash = m._data.filehash;
    m.encFilehash = m._data.encFilehash;
    m.mediaKey = m._data.mediaKey;
    m.width = m._data.width;
    m.height = m._data.height;
    if (m._data.mediaKeyTimestamp)
      m.mediaKeyTimestamp = m._data.mediaKeyTimestamp;
    if (m._data.size) m.fileSize = m._data.size;
    if (m._data.isViewOnce) {
      m.isViewOnce = m._data.isViewOnce;
      m.caption = m._data.caption || "";
    }
    if (m._data.wavefrom) m.wavefrom = m._data.wavefrom;
    if (m._data.thumbnailWidth) m.thumbnailWidth = m._data.thumbnailWidth;
    if (m._data.thumbnailHeight) m.thumbnailHeight = m._data.thumbnailHeight;
    if (m._data.isAnimated) m.isAnimated = m._data.isAnimated;
  }

  if (m.isGroup) {
    m.metadata = await await mywa.groupMetadata(m.from);
    m.groupAdmins = m.metadata.participants.filter(
      (a) => a.isAdmin || a.isSuperAdmin
    );
    m.isAdmin = !!m.groupAdmins.find(
      (member) =>
        (typeof member.id === "object" && member.id !== undefined
          ? member.id._serialized
          : member.id) === m.sender
    );
    m.isBotAdmin = !!m.groupAdmins.find(
      (member) =>
        (typeof member.id === "object" && member.id !== undefined
          ? member.id._serialized
          : member.id) === m.botNumber
    );
    m.isRent = !!global.db.groups[m.from]?.isRent;
  }

  m.body =
    m?.selectedButtonId ||
    m?.selectedRowId ||
    (typeof m._data.caption === "string" ? m._data.caption : "") ||
    (typeof m._data.body === "string" ? m._data.body : "") ||
    "";
  if (typeof m.body !== "string") {
    m.body = "";
  }
  if (
    m.hasMedia &&
    typeof global.db.command === "object" &&
    m.filehash in global.db.command
  ) {
    let command = global.db.command[m.filehash];
    m.body =
      command.command + command.mentions.length !== 0
        ? " " + command.mentions.join(",")
        : "";
  }
  m.prefix = global.set.prefix.test(m.body)
    ? m.body.match(global.set.prefix)[0]
    : "";
  m.cmd =
    m.body &&
    m.body.replace(m.prefix, "").trim().split(/ +/).shift().toLowerCase();
  m.arg =
    m.body
      .trim()
      .split(/ +/)
      .filter((a) => a) || [];
  m.args =
    m.body
      .trim()
      .split(/ +/)
      .slice(1)
      .filter((a) => a) || [];
  m.text = m.args.join(" ")?.replace(m.cmd, "");

  // custom function message
  if (m.isMedia)
    m.downloadMedia = (filePath) => {
      if (filePath) return mywa.downloadAndSaveMediaMessage(m, filePath);
      else return mywa.downloadMediaMessage(m);
    };
  m.resend = () => mywa.forwardMessage(m.from, m._serialized);
  m.reply = (content, options = {}) =>
    mywa.sendMessage(options.from ? options.from : m.from, content, {
      quoted: m,
      ...options,
    });

  if (!m.author) delete m.author;
  if (!m.isStatus) delete m.isStatus;
  if (!m.isForwarded) delete m.isForwarded;
  if (m.forwardingScore === 0) delete m.forwardingScore;
  if (m.vCards.length === 0) delete m.vCards;
  if (!m.inviteV4) delete m.inviteV4;
  if (!m.orderId) delete m.orderId;
  if (!m.token) delete m.token;
  if (!m.hasMedia) {
    delete m.duration;
    delete m.isGif;
  }
  if (!m.isEphemeral) {
    delete m.isEphemeral;
    delete m.ephemeralDuration;
  }

  delete m._data;
  delete m.mentionedIds;
  delete m.location;

  if (m.hasQuotedMsg) {
    let data = (await m.getQuotedMessage()) || {};
    m.quoted = await await serialize(mywa, data);

    delete data._data;
  }

  return await await m;
};

export { Client, serialize };

async function reloadFile(file) {
  let fileP = fileURLToPath(file);
  fs.watchFile(fileP, () => {
    fs.unwatchFile(fileP);
    console.log(`[ UPDATE ] file => "${fileP}"`);
    import(`${file}?update=${Date.now()}`);
  });
}
reloadFile(import.meta.url);
