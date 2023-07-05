import util from 'util'
export default {
    name: ">",
    cmd: ["eval",">>"],
    tags: 'owner',
    desc: "Eval",
    run: async(opt) => {
        const { m, mywa } = opt
        let evalCmd
        try {
            evalCmd = /await/i.test(m.text) ? eval("(async() => { " + m.text + " })()") : eval(m.text)
        } catch (e) {
            m.reply(util.format(e))
        }
        new Promise(async (resolve, reject) => {
            try {
                resolve(evalCmd);
            } catch (err) {
                reject(err)
            }   
        })
        ?.then((res) => m.reply(util.format(res)))
        ?.catch((err) => m.reply(util.format(err)))
    },
    isOwner: true,
    noPrefix: true
}