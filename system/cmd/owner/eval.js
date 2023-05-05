import { Buttons } from 'mywajs'
export default {
    name: "eval",
    cmd: [">", ">>"],
    tags: 'owner',
    desc: "Eval",
    run: async (opt) => {
        const {
            m,
            mywa
        } = opt

        let evalCmd
        try {
            evalCmd = /await/i.test(m.text) ? eval("(async() => { " + m.text + " })()") : eval(m.text)
        } catch (e) {
            m.reply(npm.util.format(e))
        }
        new Promise(async (resolve, reject) => {
            try {
                resolve(evalCmd);
            } catch (err) {
                reject(err)
            }
        })
            ?.then((res) => m.reply(npm.util.format(res)))
            ?.catch((err) => m.reply(npm.util.format(err)))
    },
    isOwner: true,
    noPrefix: true
}