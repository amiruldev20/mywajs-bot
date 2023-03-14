import okg from 'glob'
const {
    glob
} = okg
import {
    promisify
} from 'util';
import func from './lib/func.js'
const gPro = promisify(glob);

export default async (mywa) => {
    // COMMAND
    const fileCmd = await gPro("system/cmd/**/*.js");
    fileCmd.map(async (value) => {
        const file = await import(`../${value}`);
        // console.log("check file ", file.default.cmd);
        const split = value.split("/");
        const dir = split[split.length - 2];

        if (file.default.cmd && dir) {
            const properties = {
                dir,
                ...file,
            };
            mywa.cmd.set(file.default.cmd, properties);
        }
    });

    global.mywa = mywa;
    global.func = func;

    // EVENT
    const fileEvent = await gPro(`system/event/*.js`);
    fileEvent.map(async (value) => await import(`../${value}`));
}
