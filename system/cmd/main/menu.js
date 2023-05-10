function toUpper(query) {
const arr = query.split(" ")
for (var i = 0; i < arr.length; i++) {
arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1)
}

return arr.join(" ")
//return query.replace(/^\w/, c => c.toUpperCase())
}

export default {
name: "menu",
cmd: ["menu", "help", "list"],
tags: 'main',
desc: "To display the menu by list, and see how to use the menu",
run: async ({
mywa,
m,
prefix,
command,
commands
}) => {
function clockString(ms) {
let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}
let _uptime = process.uptime() * 1000
let _muptime
if (process.send) {
process.send('uptime')
_muptime = await new Promise(resolve => {
process.once('message', resolve)
setTimeout(resolve, 1000)
}) * 1000
}
let muptime = clockString(_muptime)
let uptime = clockString(_uptime)
let totalusr = Object.keys(db.users).length
let totalreg = Object.values(db.users).filter(user => user.registered == true).length

if (m.args.length >= 1) {
let data = []
const nama = m.text.toLowerCase()
const cmd = commands.get(nama) ?? commands.find((cmd) => cmd.aliases && cmd.aliases.includes(nama))

if (cmd === undefined) return m.reply(`Command tidak ditemukan
contoh:
#menu ping`)
if (cmd.default.isOwner && !m.isOwner) return m.reply(`Comand ini hanya untuk owner!!`)
if (!cmd) return m.reply("Command Not Found")
if (cmd.default.name) data.push(`*- Name :* ${cmd.default.name}`)
if (cmd.default.cmd) data.push(`*- Command :* ${cmd.default.cmd.join(", ")}`)
if (cmd.default.desc) data.push(`*- Desc :* ${cmd.default.desc.replace(/%prefix/gi, prefix).replace(/%command/gi, cmd.default.name)}`)
if (cmd.default.example) data.push(`*- Example :* ${cmd.default.example.replace(/%prefix/gi, prefix).replace(/%command/gi, command)}`)
if (cmd.default.isLimit) data.push(`*- Use Limit :* Command uses limit to work`)
if (cmd.default.limit) data.push(`*- Amount of Limit :* ${cmd.default.limit}`)

m.reply(`*Detail Command*\n\n${data.join("\n")}`)
} else {
let teks = `Halo, *@${m.sender.split("@")[0]}* 👋
selamat datang di *MyWA BOT*
bot ini masih dalam tahap beta
INFO MENU:
 🅟 : Khusus Premium
 🅛 : Memakai Limit

 *𖢖 ═══ MyWA BOT ═══ 𖢖*
✬ Version: *1.0.2*
✬ Library: *MywaJS*
✬ Server: *DIKODE*
✬ Runtime: *${uptime}*
✬ Database: ${totalreg} of ${totalusr}
✬ Total Module: *2*

`

const tag = Array.from(commands.values()).filter((a) => global.tags.some(b => a.default.tags === b))
const list = {}

tag.forEach((a) => {
if (!(a.default.tags in list)) list[a.default.tags] = []
list[a.default.tags].push(a)
})

Object.entries(list).map(([tags, command]) => {
teks += `*⦿ ${toUpper(tags)} Menu*\n`
teks += `⌬ ${command.map((a) => `${(a.default.noPrefix ? `${a.default.name}` : `${prefix + a.default.name}`)} ${(a.default.isLimit ? "(" + (a?.default.limit || 1 + " Limit") + ")" : "")}`).join('\n⌬ ')}\n\n`
}).join(`\n\n`)

mywa.sendMessage(m.from, `${teks}
ketik .menu *command*
untuk melihat detail command!!
contoh:
.menu ping`, {
mentions: await mywa.parseMention(teks),
extra: {
ctwaContext: {
title: `MyWA BOT BETA`,
thumbnailUrl: 'https://i.ibb.co/Sn9yWxj/1663290082297.jpg',
description: set.func.tanggal(new Date),
sourceUrl: 'https://wa.me/stickerpack/amirul.dev',
linkPreview: true
}
}
})
}
}
}