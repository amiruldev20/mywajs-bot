import { exec } from "child_process";
import util from "util";
export default {
  name: "$",
  cmd: ["$"],
  tags: "owner",
  desc: "Exec",
  run: async ({ m }) => {
    try {
      exec(m.text, async (err, stdout) => {
        if (err) return m.reply(util.format(err));
        if (stdout) return m.reply(util.format(stdout));
      });
    } catch (e) {
      m.reply(util.format(e));
    }
  },
  isOwner: true,
  noPrefix: true,
};
