import qrt from 'qrcode-terminal'
import module from 'module'
global.require = module.createRequire(import.meta.url)

const client = require('../../index');

client.on("qr", qr => {
    console.log(`[ ! ] Scan this QR...`)
    qrt.generate(qr, {small: true});
});