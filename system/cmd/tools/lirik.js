const solenolyrics = require("solenolyrics");

module.exports = {
  cmd: 'lirik',
  desc: 'cari lirik lagu',
  tags: 'tools',
  qt: 'Masukan judul lagunya!!',
  run: async(mywa, m, { mc, text }) => {
    m.reply(`Mencari lirik ${text}`)
    let kimak = await solenolyrics.requestLyricsFor(text)
    m.reply(`*LIRIK LAGU ${text}*
    
    ${kimak}`)
    },
    isQ: true
}
  