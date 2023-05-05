export default {
    name: 'sswa',
    cmd: ['listchat', 'listmsg'],
    tags: 'owner',
    desc: "Screenshot homepage whatsapp web",
    run: async ({
        mywa,
        m
    }) => {
        await mywa.playPage.setViewportSize({ width:961, height: 2000 })
        let media = await mywa.playPage.screenshot()
        console.log("hasil ", media)
        await mywa.sendMsg(m.from, media, { quoted: m })
    },
    isOwner: true
}