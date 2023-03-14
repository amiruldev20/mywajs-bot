import axios from "axios";
import wweb from 'wwebjs'
const { MessageMedia } = wweb
import fs from "fs";

export default {
    cmd: "tt",
    desc: "tiktok downloader",
    tags: "downloader",
    qt: "masukan urlnya!!",
    run: async (myww, m, { mc, text }) => {

        try {
            let name = await func.rand(5);
            m.reply("Downloading...");
            var res = await axios.post("https://ssyoutube.com/api/convert", `url=${text}`);

            let json = res.data;
            let file = await func.downloadFile(`${name}.mp4`, json.url[0].url);

            await func.delay(5000);

            const media = MessageMedia.fromFilePath(`./tmp/${name}.mp4`);
            m.reply(media, false, {
                caption: `*TIKTOK DOWNLOADER*

Title: ${json.meta.title}
Duration: ${json.meta.duration}`,
            });
            await fs.unlinkSync(`./tmp/${name}.mp4`);
        } catch {
            m.reply("Permintaan tidak dapat diproses, cobalagi nanti!!");
        }
    },
    isQ: true,
};
