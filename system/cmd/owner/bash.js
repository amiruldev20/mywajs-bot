import {
    exec
} from "child_process";
import util from "util";

export default {
    cmd: "$",
    desc: "Exec tools",
    tags: "owner",
    qt: "Input command!",
    run: async (mywa, m, {
        text
    }) => {
        m.reply("Please wait...");
        exec(text, async (err, stdout) => {
            if (err) return m.reply(err);
            if (stdout) return m.reply(stdout);
        });
    },
    isOwner: true,
    isQ: true,
};
