export default {
  name: "sswa",
  cmd: ["listchat", "listmsg"],
  tags: "owner",
  desc: "Screenshot homepage whatsapp web",
  run: async ({ mywa, m }) => {
    await mywa.mPage.setViewportSize({ width: 961, height: 2000 });
    let media = await mywa.mPage.screenshot();

    await mywa.sendMessage(m.from, media, { quoted: m });
  },
  isOwner: true,
};
