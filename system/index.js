const {
    glob
} = require("glob");
const {
    promisify
} = require("util");

const gPro = promisify(glob);

module.exports = async (mywa) => {
    // COMMAND
    const fileCmd = await gPro(`system/cmd/**/*.js`);
    fileCmd.map((value) => {
        const file = require('../' + value);
        const split = value.split("/");
        const dir = split[split.length - 2];

        if (file.cmd) {
            const properties = {
                dir,
                ...file
            };
            mywa.cmd.set(file.cmd, properties);
        }
    });

    global.mywa = mywa
    // EVENT
    const fileEvent = await gPro(`system/event/*.js`);
    fileEvent.map((value) => require('../' + value));
}
