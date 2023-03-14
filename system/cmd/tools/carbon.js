import car from 'unofficial-carbon-now'
import wweb from 'wwebjs'
const { MessageMedia } = wweb
import fs from "fs";
const bon = new car.createCarbon();

export default {
    cmd: "carbon",
    desc: "generate carbon.sh",
    tags: "tools",
    qt: "masukan teks / codenya!!",
    run: async (mywa, m, { text }) => {
        m.reply("Waiting...");
        let carbon = await bon.setCode(text);
        if (!carbon) return m.reply(eror);

        let res = await car.generateCarbon(carbon);
        console.log(res);
        let name = await func.rand(2);
        let file = await fs.writeFileSync(`./tmp/${name}.jpg`, res);

        let media = MessageMedia.fromFilePath(`./tmp/${name}.jpg`);
        m.reply(media);
    },
    isQ: true,
};
