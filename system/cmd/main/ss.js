import wwebjs from 'wwebjs'
const { MessageMedia } = wwebjs

export default {
    cmd: "ss",
    desc: "Screnshoot whatsapp bot",
    tags: 'main',
    run: async (mywa, m, { text, args }) => {
        m.reply("waiting...");
        let media = await mywa.pupPage.screenshot();
        let base64Media = Buffer.from(media).toString("base64");

        mywa.sendMessage(m.from, new MessageMedia("image/jpg", base64Media), {
            caption: "BETA WHATSAPP BOT",
            quotedMessageId: m.id._serialized,
        });
    },
};
