export default {
    name: 'switch',
    cmd: ['switch'],
    tags: 'owner',
    desc: 'switch mode public or self',
    run: ({ m }) => {
        if (set.opt.public) {
            set.opt.public = false
            m.reply('Self mode active')
        } else {
            set.opt.public = true
            m.reply('Public mode active')
        }
    },
    isOwner: true
}