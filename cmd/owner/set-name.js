export default {
  name: "setname",
  cmd: ["cn"],
  tags: "owner",
  desc: "change name bot",
  example: `*Example Command*
%prefixsetname Mywa BOT`,
  run: async ({ mywa, m }) => {
    let text = m.quoted ? m.quoted.body : m.text;
    m.reply(`Done!!`);
    mywa.changeMyname(text);
  },
  isOwner: true,
};
