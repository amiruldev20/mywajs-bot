import { Client } from "wwebjs"
import { promisify } from "util"
import { glob } from "glob"
import module from 'module'

const gPro = promisify(glob);
global.require = module.createRequire(import.meta.url)

module.exports = async (client) => {
    // command
    const fileCmd = await gPro(`cmd/**/*.js`);
    fileCmd.map((value) => {
        const file = require('./' + value);
        const split = value.split("/");
        const dir = split[split.length - 2];

        if (file.name) {
            const properties = { dir, ...file };
            client.cmd.set(file.name, properties);
        }
    });

    // Event
    const eventFile = await gPro(`event/*.js`);
    eventFile.map((value) => require('./' + value));
}