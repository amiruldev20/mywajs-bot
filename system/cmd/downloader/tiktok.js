const axios = require("axios")
const {
    MessageMedia
} = require("wwebjs")
const fs = require("fs")
module.exports = {
    cmd: 'tt',
    desc: 'tiktok downloader',
    tags: 'downloader',
    qt: 'masukan urlnya!!',
    run: async (myww, m, {
        mc,
        text
    }) => {
        try {
        let name = await func.rand(5)
        m.reply('Downloading...')
        var res = await axios("https://ssyoutube.com/api/convert", {
            method: "POST",
            data: `url=${text}`
        })

        let json = res.data
        let file = await func.downloadFile(json.url[0].url, name)
        //  console.log(json)
        await func.delay(5000)
        const media = MessageMedia.fromFilePath(`./tmp/${name}.mp4`)
        // console.log(media)
        m.reply(media, false, {
            caption: `*TIKTOK DOWNLOADER*

Title: ${json.meta.title}
Duration: ${json.meta.duration}`
        })
        fs.unlinkSync(`./tmp/${name}.mp4`)
    } catch {
        m.reply(`Permintaan tidak dapat diposes, cobalagi nanti!!`)
    }
    },
    isQ: true
}