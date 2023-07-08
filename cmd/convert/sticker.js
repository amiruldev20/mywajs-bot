export default {
  name: "sticker",
  cmd: ["st", "s", "stiker"],
  tags: "convert",
  desc: "Sticker maker",
  run: async ({ mywa, m }) => {
    try {
      let q = m.quoted
        ? await m.quoted.downloadMedia()
        : await mywa.downloadMediaMessage(m);
      m.reply(`Permintaan sedang diproses...`);

      await mywa.sendMessage(m.from, q, { asSticker: true, quoted: m });
    } catch {
      m.reply("Permintaan tidak dapat diproses!!");
    }
  },
  //noPrefix: true
};
