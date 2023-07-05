/*
/*************************
* Pake tinggal make
* jangan hapus sumbernya
**************************
* Github: amiruldev20
* Wa: 085157489446
*/
import "../../setting.js";

const idb = (m) => {
  if (m.isBot) return;
  const isNumber = (x) => typeof x === "number" && !isNaN(x);
  let user = global.db.users.find((v) => v.jid == m.sender);

  if (user) {
    if (!("name" in user)) user.name = m.pushName;
    if (!("lastChat" in user)) user.lastChat = new Date() * 1;
    if (!user.register) user.register = false;
    if (!isNumber(user.exp)) user.exp = 0;
    if (!isNumber(user.limit)) user.limit = 10;
    if (!user.VIP) user.VIP = m.isOwner ? true : false;
    if (!user.banned) user.banned = false;
  } else {
    global.db.users.push({
      jid: m.sender,
      name: m.pushName,
      lastChat: new Date() * 1,
      register: false,
      exp: 0,
      limit: 10,
      VIP: m.isOwner ? true : false,
      banned: false,
    });
  }

  if (m.isGroup) {
    let group = global.db.groups.find((v) => v.jid == m.from);
    if (group) {
      if (!("name" in group)) group.name = m.metadata.subject;
      if (!group.mute) group.mute = false;
    } else {
      global.db.groups.push({
        jid: m.from,
        name: m.metadata.subject,
        mute: false,
      });
    }
  }

  // ATUR NOMOR OWNER SEMUA DIBAWAH INI
  let setting = global.db.setting;
  if (setting) {
    if (!("name" in setting)) setting.name = "MywaBOT";
    if (!("version" in setting)) setting.version = "1.0.3";
    if (!("public" in setting)) setting.public = true;
    if (!Array.isArray("owner" in setting))
      setting.owner = ["6285157489446", "6285155060790"];
    if (!("lang" in setting)) setting.lang = "id";
  } else {
    global.db.setting = {
      name: "MywaBOT",
      version: "1.0.3",
      public: true,
      owner: ["628515748946", "62851550602790"],
      lang: "id",
    };
  }
};
export { idb };
set.reloadFile(import.meta.url);
