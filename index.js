import wwebjs from 'wwebjs'
const { Client, LocalAuth } = wwebjs
import { Collection } from '@discordjs/collection'
import module from 'module'
import "dotenv/config";

global.require = module.createRequire(import.meta.url)

const client = new Client({
    restartOnAuthFail: true,
    puppeteer: {
        headless: true,
        args: [ '--no-sandbox', '--disable-setuid-sandbox' ]
    },
    authStrategy: new LocalAuth({ clientId: "client" })
});
module.exports = client;

// Global Variable
client.cmd = new Collection();
require("./system")(client);

client.initialize();
