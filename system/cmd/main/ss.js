const {
    MessageMedia
} = require('wwebjs')
module.exports = {
    cmd: 'ss',
    run: async (mywa, m, {
        text,
        args
    }) => {
        m.reply('waiting...')
        let media = await mywa.pupPage.screenshot()
        mywa.sendMessage(m.from, new MessageMedia("image/jpg", Buffer.from(media).toString("base64")), {
            caption: "BETA WHATSAPP BOT",
            quotedMessageId: m.id._serialized
        })

    }
}