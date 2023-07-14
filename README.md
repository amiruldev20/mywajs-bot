[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#table-of-contents)

# MYWAJS BASE (ESM)

> **NB:** Versi cjs nanti di up di branch cjs. PROJECT INI AKTIF. AKAN TERUS DIKEMBANGKAN

> Note : fitur akan terus dikembangkan. untuk membuat cmd silahkan lihat paling bawah examplenya

# instalasi
```
git clone https://github.com/amiruldev20/wwebjs-base
cd mywajs-bot
npm i
npm start
```

# informasi
```
versi gratis beberapa fitur memakai api dari
1. xfarr.com
2. xzn.wtf
3. lolhuman
jika ingin versi scrape anda dapat membeli script premium
```

# example cmd
```
opsi yang ada ✅ berarti wajib di tambahkan. yang tidak ada centang berarti tidak masalah jika tidak ada

boolean = true atau false

export default {
    name: 'this name', //✅ nama command
    cmd: ['cmd1', 'cmd2'], //✅ command (bisa satu atau dua)
    tags: 'main', //✅ tags menu
    desc: 'this description', // deskripsi menu
    run: async({mywa, m}) => {
        m.reply('halo') // contoh saja
    },
    isOwner: boolean, // opsi bagian ini dan dibawah bisa ditambahkan atau tidak
    isBotAdm: boolean, // bot admin
    isAdmin: boolean, // admin gc
    isGroup: boolean, // group only
    isPrivate: boolean, // pc only
    isPremium: boolean, // premium
    isVIP: boolean, // vip
}
```
