export default async function({ m, mywa }) {
//console.log(m)

if (/bot/i.test(m.body)){
m.reply(`_Bot aktif ${m.pushName}_`)
}
}