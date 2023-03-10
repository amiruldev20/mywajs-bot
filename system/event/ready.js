import module from 'module'
global.require = module.createRequire(import.meta.url)

const client = require('../../index');

client.on("ready", async () => {
    console.log(`BOT READY!!`)
});