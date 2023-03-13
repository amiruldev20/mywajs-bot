[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#table-of-contents)
# WWEBJS BASE (CJS)
Versi esm comingsoon

 <p align="center">
<img width="" src="https://img.shields.io/github/repo-size/amiruldev20/wwebjs-base?color=green&label=Repo%20Size&style=for-the-badge&logo=appveyor">
</p>
 
 > **Note**: ini sudah bisa digunakan tetapi belum 100% fix. silahkan tunggu update jika ingin yang 100% fix dan banyak menu
 
GRUP INFO: [KLIK DISINI](https://chat.whatsapp.com/Htfi5uzYWOt0ekPu66YK4Y)

# baca detail cara buat command dipaling bawah

#### alasan pindah ke wwebjs bukan baileys
```
akhir" ini saya pakai baileys sering ke banned / kena spam
add 1 member juga langsung banned.
lalu saya coba bikin versi wwebjs untuk fitur
- autoread story
- auto add member to grup
aman testing 2 hari tidak keban / kena spam
mungkin karena wwebjs memakai puppeteer yang bsa live jg
jadi bisa meminimalisir banned / spam
```

# NB
```
untuk menjalankan bot ini, perlu tempat deploy
yang support puppeteer.
tidak semua panel run bot support puppeteer.
jika ingin panel supp keperluan bot dll
pakailah GOLDPANEL. panel yang saya manage
100% aman
```

# detail command
tanda centang berarti itu wajib dibuat (diisi)
```
module.exports = {
cmd: 'tes', // ✅ comandnya (saat ini hanya bisa 1 command)
desc: 'deskripsi', // deskripsi command
tags: 'main', // ✅ tag command
qt: 'Input command', // query text biar ga perlu kyk if (!text) return m.reply("input command")
run: async(mywa, m, { text, dll }) => { // dll ubah sesuai yg anda inginkan. cek opsinya di event/message (cmdOpt)

m.reply('hello world') // isi menu

},
isQ: boolean, // query text
isOwner: boolean, // owner only
isGc: boolean // group only
}

# instalasi
- git clone https://github.com/amiruldev20/wwebjs-base
- cd wwebjs-base
- npm i
- npm run dev