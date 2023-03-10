import { Client } from "wwebjs"
import { promisify } from "util"
import { glob } from "glob"
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const gPro = promisify(glob);
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
