import { Client, Message } from 'wwebjs'

module.exports = {
    name: 'ping',
    run: async(client, message, args) => {
        message.reply(`okay`);
    }
}