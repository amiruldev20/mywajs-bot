import { spawn } from 'child_process';
import path from 'path';
import fs from 'fs';

console.log('Starting . . .');

function start() {
  let args = [path.join(__dirname, 'src', 'index.js'), ...process.argv.slice(2)];
  let p = spawn(process.argv[0], args, { stdio: ['inherit', 'inherit', 'inherit', 'ipc'] })
    .on('message', data => {
      if (data == 'reset') {
        console.log('Restarting...');
        p.kill();
        start();
        delete p;
      }
    })
    .on('exit', code => {
      start();
    });
}

start();
