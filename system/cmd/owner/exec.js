export default {
    name: "exec",
    cmd: ["$"],
    tags: 'owner',
    desc: "Exec",
    run: async ({
        m
    }) => {
        try {
            npm.exec(m.text, async (err, stdout) => {
                if (err) return m.reply(set.func.Format(err))
                if (stdout) return m.reply(set.func.Format(stdout))
            })
        } catch (e) {
            m.reply(set.func.Format(e))
        }
    },
    isOwner: true,
    noPrefix: true
}