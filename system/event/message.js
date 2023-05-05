import "../../setting.js"

import fs from "node:fs"
import moment from "moment-timezone"
import path from "node:path"
import { format } from "node:util"
import chalk from "chalk"
import Collection from "../lib/collection.js"
import { fileURLToPath } from "node:url"


global.tags = []
const __dirname = path.dirname(fileURLToPath(import.meta.url))
const commands = new Collection()
const aliases = new Collection()


const Message = async (mywa, m) => {
    try {
        if (!global.set.opt.public && !m.isOwner) return
        if (!m) return
        if (m.isBot) return

        global.set.exif = {
            packId: "https://instagram.com/amirul.dev",
            packName: `Dibuat Oleh :\nMyWA WWEBJS\nIG: https://instagram.com/amirul.dev\n\nPada :\n${set.func.tanggal(new Date)}, ${set.func.jam(new Date)}\n\nOleh :\n${m.pushName}`,
            packPublish: "",
            packEmail: "amiruldev20@gmail.com",
            packWebsite: "https://instgaram.com/amirul.dev",
            androidApp: "https://play.google.com/store/apps/details?id=com.bitsmedia.android.muslimpro",
            iOSApp: "https://apps.apple.com/id/app/muslim-pro-al-quran-adzan/id388389451?|=id",
            emojis: ['😹', '😎', '😱'],
            isAvatar: 0
        }
        const prefix = m.prefix = /^[°•π÷×¶∆£¢€¥®™+✓_=|~!?@#%^&.©^😁🥴😶]/gi.test(m.body) ? m.body.match(/^[°•π÷×¶∆£¢€¥®™+✓_=|~!?@#%^&.©^😁🥴😶]/gi)[0] : ""
        const cmd = m.cmd = m.body && m.body.slice(prefix.length).trim().split(/ +/).shift().toLowerCase()
        const command = m.command = commands.get(cmd) || commands.find((v) => v.aliases && v.aliases.includes(cmd)) || aliases.get(cmd)
        const quoted = m?.hasQuotedMsg ? m.quoted : m
        const isBotadm = m.isGroup ? m.metadata.participants.find(
            (chatObj) => chatObj.id.user === mywa.info.wid.user
        )?.isAdmin : false
        const isAdmin = m.isGroup ? m.metadata.participants.find(
            (chatObj) => chatObj.id._serialized === m.author
        )?.isAdmin || m.isOwner : false
            ; (await import("../lib/database.js")).loadDatabase(m)

        // log chat
        //console.log(isBotadm)
        if (m && !m.isBot) {
            console.log(chalk.black(chalk.bgWhite("- FROM")), chalk.black(chalk.bgGreen(m.pushName)), chalk.black(chalk.yellow(m.sender)) + "\n" + chalk.black(chalk.bgWhite("- IN")), chalk.black(chalk.bgGreen(m.isGroup ? "Group Chat" : "Private Chat", m.from)) + "\n" + chalk.black(chalk.bgWhite("- MESSAGE")), chalk.black(chalk.bgGreen(m.body || m.type)))
            m.exp = Math.ceil(Math.random() * 15)
        }

        if (command && !m.isBot) {
            if (command.default.main) {
                return global.mess("main", m)
            }

            if (command.default.isMedia && !quoted.mime) {
                if (typeof command.default.isMedia === 'object' && command.default.isMedia !== null) {
                    if (command.default.isMedia.Sticker && !/webp/i.test(quoted.mime)) return m.reply('Reply Sticker...')
                    if (command.default.isMedia.Image && !/image/i.test(quoted.mime)) return m.reply('Reply or Send Caption With Image...')
                    if (command.default.isMedia.Video && !/video/i.test(quoted.mime)) return m.reply('Reply or Send Caption With Video...')
                    if (command.default.isMedia.Audio && !/audio|voice/i.test(quoted.mime)) return m.reply('Reply Audio...')
                    if (command.default.isMedia.Text && !/text/i.test(quoted.mime)) return m.reply('Reply Media Text...')
                    if (command.default.isMedia.Font && !/font/i.test(quoted.mime)) return m.reply('Reply Media Font...')
                    if (command.default.isMedia.Application && !/application/i.test(quoted.mime)) return m.reply('Reply Media Application...')
                    if (command.default.isMedia.ViewOnce && !quoted.isViewOnce) return m.reply('Reply View Once...')
                } else {
                    return global.mess("media", m)
                }
            }

            if (command.default.isQuoted && !m.hasQuotedMsg) {
                return global.mess("quoted", m)
            }

            if (command.default.isOwner && !m.isOwner && !m.fromMe) {
                var pp = await mywa.getProfilePicUrl(m.sender).catch(_ => '')
                return mywa.sendMessage(m.from, `*OWNER ONLY*

Fitur ini hanya untuk owner!!`, {
                    extra: {
                        ctwaContext: {
                            title: 'ACCESS DENIED',
                            description: `© wwebjs by Amirul Dev`,
                            thumbnailUrl: pp,
                            sourceUrl: 'https://wa.me/stickerpack/amiruldev'
                        }
                    }
                })
            }

            if (command.default.isBotAdm && isBotadm) {
                var pp = await mywa.getProfilePicUrl(m.sender).catch(_ => '')
                return mywa.sendMessage(m.from, `*BOT NOT ADMIN*

Agar fitur ini dapat bekerja dengan baik, jadikan bot sebagai admin grup !!`, {
                    extra: {
                        ctwaContext: {
                            title: 'BOT NOT ADMIN',
                            description: `© wwebjs by Amirul Dev`,
                            thumbnailUrl: pp,
                            sourceUrl: 'https://wa.me/stickerpack/amiruldev'
                        }
                    }
                })
            }

            if (command.default.isAdmin && isAdmin) {
                var pp = await mywa.getProfilePicUrl(m.sender).catch(_ => '')
                return mywa.sendMessage(m.from, `*ADMIN ONLY*

Fitur ini hanya dapat digunakan oleh admin grup !!`, {
                    extra: {
                        ctwaContext: {
                            title: 'ADMIN ONLY',
                            description: `© wwebjs by Amirul Dev`,
                            thumbnailUrl: pp,
                            sourceUrl: 'https://wa.me/stickerpack/amiruldev'
                        }
                    }
                })
            }

            if (command.default.isGroup && !m.isGroup) {
                var pp = await mywa.getProfilePicUrl(m.sender).catch(_ => '')
                return mywa.sendMessage(m.from, `*GROUP ONLY*

Fitur ini hanya dapat digunakan didalam grup !!`, {
                    extra: {
                        ctwaContext: {
                            title: 'GROUP ONLY',
                            description: `© wwebjs by Amirul Dev`,
                            thumbnailUrl: pp,
                            sourceUrl: 'https://wa.me/stickerpack/amiruldev'
                        }
                    }
                })
            }

            if (command.default.isPrivate && m.isGroup) {
                var pp = await mywa.getProfilePicUrl(m.sender).catch(_ => '')
                return mywa.sendMessage(m.from, `*PRIVATE ONLY*

Fitur ini hanya dapat digunakan di private chat !!`, {
                    extra: {
                        ctwaContext: {
                            title: 'PRIVATE ONLY',
                            description: `© wwebjs by Amirul Dev`,
                            thumbnailUrl: pp,
                            sourceUrl: 'https://wa.me/stickerpack/amiruldev'
                        }
                    }
                })
            }

            if (command.default.isBot && m.fromMe) {
                var pp = await mywa.getProfilePicUrl(m.sender).catch(_ => '')
                return mywa.sendMessage(m.from, `*BOT ONLY*

Fitur ini hanya untuk bot !!`, {
                    extra: {
                        ctwaContext: {
                            title: 'ACCESS DENIED',
                            description: `© wwebjs by Amirul Dev`,
                            thumbnailUrl: pp,
                            sourceUrl: 'https://wa.me/stickerpack/amiruldev'
                        }
                    }
                })
            }

            if (command.default.isPremium && !m.isPremium) {
                var pp = await mywa.getProfilePicUrl(m.sender).catch(_ => '')
                return mywa.sendMessage(m.from, `*PREMIUM ONLY*

Fitur ini hanya untuk user premium !!`, {
                    extra: {
                        ctwaContext: {
                            title: 'ACCESS DENIED',
                            description: `© wwebjs by Amirul Dev`,
                            thumbnailUrl: pp,
                            sourceUrl: 'https://wa.me/stickerpack/amiruldev'
                        }
                    }
                })
            }

            if (command.default.isVIP && !m.isVIP) {
                var pp = await mywa.getProfilePicUrl(m.sender).catch(_ => '')
                return mywa.sendMessage(m.from, `*VIP ONLY*

Fitur ini hanya untuk user VIP !!`, {
                    extra: {
                        ctwaContext: {
                            title: 'ACCESS DENIED',
                            description: `© wwebjs by Amirul Dev`,
                            thumbnailUrl: pp,
                            sourceUrl: 'https://wa.me/stickerpack/amiruldev'
                        }
                    }
                })
            }

            if (command.default.example && !m.text) {
                return m.reply(command.default.example.replace(/%prefix/gi, prefix).replace(/%command/gi, command.default.name).replace(/%text/gi, m.text))
            }


            // for command no prefix
            if (!prefix && command.default.noPrefix) {
                command.default.run({
                    mywa,
                    m,
                    command: cmd,
                    quoted,
                    prefix,
                    commands
                })
                    ?.then(a => a)
                    ?.catch((err) => {
                        //global.db.users[m.sender].limit += 1
                        let text = format(err)
                        /*
                        for (let key of Object.values(global.APIKeys))
                        text = text.replace(new RegExp(key, 'g'), "#HIDDEN#")
                        */
                        m.react("❌")
                        m.reply(`*Error Command*\n\n*- Name :* ${command.default.name}\n*- Sender :* ${m.sender.split`@`[0]} (@${m.sender.split`@`[0]})\n*- Time :* ${moment(m.timestamp * 1000).tz("Asia/Jakarta")}\n*- Log :*\n\n${text}`, { mentions: [m.sender] })
                    })
            }

            // for command with prefix
            if (!!prefix && m.body.startsWith(prefix)) {
                command.default.run({
                    mywa,
                    m,
                    command: cmd,
                    quoted,
                    prefix,
                    commands
                })
                    ?.then(a => a)
                    ?.catch((err) => {
                        //global.db.users[m.sender].limit += 1
                        let text = format(err)
                        /*for (let key of Object.values(global.APIKeys))
                        text = text.replace(new RegExp(key, 'g'), "#HIDDEN#")*/
                        m.react("❌")
                        m.reply(`*Error Command*\n\n*- Name :* ${command.default.name}\n*- Sender :* ${m.sender.split`@`[0]} (@${m.sender.split`@`[0]})\n*- Time :* ${moment(m.timestamp * 1000).tz("Asia/Jakarta")}\n*- Log :*\n\n${text}`, { mentions: [m.sender] })
                    })
            }
        }
    } catch (e) {
        console.error(e)
    }
}

const readCommands = async (pathname = "cmd", filename = "") => {
    const dir = path.join(__dirname, "..", pathname)
    const dirs = fs.readdirSync(dir)
    dirs.filter(a => a !== "function").map(async (res) => {
        let files = fs.readdirSync(`${dir}/${res}`).filter((file) => file.endsWith(".js"))
        for (const file of files) {
            const command = await import(`../${pathname}/${res}/${file}`)
            reloadFile(set.func.__filename(`${dir}/${res}/${file}`, false))
            commands.set(command.default.name, command)
            if (command.default.cmd) command.default.cmd.forEach((alias) => aliases.set(alias, command))
            if (!global.tags.includes(command.default.tags)) global.tags.push(command.default.tags)
        }
    })
    commands.sort()
}

export { Message, readCommands }


reloadFile(import.meta.url)
