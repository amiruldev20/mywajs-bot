import './setting.js'
import {
    promises as fs
} from 'node:fs';
const __dirname = npm.path.dirname(npm.fileURLToPath(import.meta.url))

console.log('Starting MyWA BOT...')


function start() {
    let args = [npm.path.join(__dirname, "system", "mywa.js"), ...process.argv.slice(2)]
    let p = npm.spawn(process.argv[0], args, {
        stdio: ['inherit', 'inherit', 'inherit', 'ipc']
    })
        .on('message', data => {
            if (data == 'reset') {
                console.log('Restarting...')
                p.kill()
                start()
            }
        })
        .on("exit", () => {
            start()
        })
}

setInterval(async () => {
    npm.exec('rm -rf temp/*')
}, 60000);
start()