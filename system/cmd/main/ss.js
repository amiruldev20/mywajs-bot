const {
    MessageMedia
} = require('wwebjs')
module.exports = {
    cmd: 'ss',
    run: async (mywa, m, {
        text,
        args
    }) => {
        let fileLock = path.join(process.cwd(), `./tmp/sswa.jpg`)
        let media = await mywa.pupPage.screenshot()
        mywa.sendMessage(m.from, new MessageMedia("image/jpg", Buffer.from(media).toString("base64"), fileLock), {
            caption: "BETA WHATSAPP BOT",
            quotedMessageId: m.id._serialized
        })

    }
}