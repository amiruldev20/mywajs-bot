import client from '../../index';
const prefix = process.env.prefix
client.on('message', async mes => {
    var prf = prefix ? /^[./!#+]/gi.test(mes.body) ? mes.body.match(/^[./!#+]/gi)[0] : "" : prefix ?? global.prf

    if (!mes.body.toLowerCase().startsWith(prf)) return;
    
    const [cmd, ...args] = mes.body.substring(prf.length).split(/ +/g);
        
    const command = client.cmd.get(cmd.toLowerCase()) || client.cmd.find(c => c.aliases?.includes(cmd.toLowerCase()));

    if (!command) return;
    await command.run(client, mes, args);
    
});