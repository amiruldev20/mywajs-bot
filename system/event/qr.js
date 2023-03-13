const qrcode = require('qrcode-terminal');

mywa.on("qr", qr => {
    console.log("CONNECTED, SCAN THIS QR...")
    qrcode.generate(qr, {
        small: true
    });
});

mywa.on('authenticated', () => {
    console.log('AUTHENTICATED');
});

mywa.on('auth_failure', msg => {
    console.error('AUTHENTICATION FAILURE', msg);
});
