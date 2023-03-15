import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
console.log('Starting . . .');

function start() {
  let args = [path.join(__dirname, 'index.js'), ...process.argv.slice(2)];
  let p = spawn(process.argv[0], args, { stdio: ['inherit', 'inherit', 'inherit', 'ipc'] })
    .on('message', data => {
      if (data == 'reset') {
        console.log('Restarting...');
        p.kill();
        start();
      }
    })
    .on('exit', code => {
      start();
    });
}

start();
