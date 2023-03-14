import util from "util";
import pkg from 'wwebjs'
const {
    Buttons,
    MessageMedia
} = pkg

export default {
    cmd: ">",
    desc: "Live test eval javascript",
    qt: "Silahkan masukan kodenya",
    tags: "owner",
    run: async (mywa, m, {
        mc,
        text,
        quoted
    }) => {
        let code2 = text.replace("°", ".toString()");
        try {
            let resultTest = await eval(code2);
            if (typeof resultTest === "object") {
                m.reply(util.format(resultTest));
            } else {
                m.reply(util.format(resultTest));
            }
        } catch (err) {
            m.reply(util.format(err));
        }
        return;
    },
    isOwner: true,
    isQ: true,
};
