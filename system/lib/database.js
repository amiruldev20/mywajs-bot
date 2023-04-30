const loadDatabase = (m) => {
const isNumber = x => typeof x === "number" && !isNaN(x)
const isBoolean = x => typeof x === "boolean" && Boolean(x)
let user = global.db.users[m.sender]
if (typeof user !== "object") global.db.users[m.sender] = {}
if (user) {
if (!isNumber(user.limit)) user.limit = global.set.limit.free
if (!isBoolean(user.premium)) user.premium = m.isOwner ? true : false
if (!isBoolean(user.VIP)) user.VIP = m.isOwner ? true : false
if (!isBoolean(user.registered)) user.registered = false
if (!("lastChat" in user)) user.lastChat = new Date * 1
if (!("name" in user)) user.name = m.pushName
if (!isNumber(user.exp)) user.exp = 0
if (!("masaPremium" in user)) user.masaPremium = 0
if (!("masaVIP" in user)) user.masaVIP = 0
if (!isBoolean(user.autoDownload)) user.autoDownload = true
if (!isBoolean(user.autoSticker)) user.autoSticker = true
if (!isBoolean(user.banned)) user.banned = false
if (!isBoolean(user.blacklist)) user.blacklist = false
} else {
global.db.users[m.sender] = {
limit: global.set.limit.free,
lastChat: new Date * 1,
premium: m.isOwner ? true : false,
VIP: m.isOwner ? true : false,
registered: false,
name: m.pushName,
exp: 0,
masaPremium: 0,
masaVIP: 0,
autoDownload: true,
autoSticker: true,
banned: false,
blacklist: false,
}
}

if (m.isGroup) {
let group = global.db.groups[m.from]
if (typeof group !== "object") global.db.groups[m.from] = {}
if (group) {
if (!isBoolean(group.mute)) group.mute = false
if (!isNumber(group.lastChat)) group.lastChat = new Date * 1
if (!("welcome" in group)) group.welcome = null
if (!("leave" in group)) group.leave = null
if (!("promote" in group)) group.promote = null
if (!("demote" in group)) group.demote = null
if (!("announcement" in group)) group.announcement = null
if (!("not_announcement" in group)) group.not_announcement = null
if (!("subject" in group)) group.subject = m.metadata.subject
if (!("description" in group)) group.description = null
if (!("ephemeral" in group)) group.ephemeral = null
if (!("not_ephemeral" in group)) group.not_ephemeral = null
if (!isBoolean(group.antiLink)) group.antiLink = false
if (!isBoolean(group.antiTag)) group.antiTag = false
if (!isBoolean(group.antiDelete)) group.antiDelete = false
if (!isBoolean(group.antiBot))
group.antiBot = false
} else {
global.db.groups[m.from] = {
lastChat: new Date * 1,
mute: false,
welcome: null,
leave: null,
promote: null,
demote: null,
announcement: null,
not_announcement: null,
subject: m.metadata.subject,
description: null,
ephemeral: null,
not_ephemeral: null,
antiLink: false,
antiTag: false,
antiDelete: false,
antibot: false
}
}
}
}

export { loadDatabase }


reloadFile(import.meta.url)