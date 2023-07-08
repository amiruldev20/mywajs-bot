import { fileURLToPath, URL } from 'url'
import { join, dirname } from 'path'
import { Server } from "socket.io"
import express from 'express'
import http from 'http'
const app = express()
const server = http.createServer(app);
const __dirname = dirname(fileURLToPath(import.meta.url))
const io = new Server(server);


export function cconnect(mywa, PORT) {
	app.get('/', (req, res) => {
 res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('chat message', (msg) => {
    console.log('message: ' + msg);
  });
  socket.on('disconnect', () => {
    console.log('user disconnected');
    server.close()
  });
});

server.listen(PORT, () => {
 // console.log('listening on *:3000');
});
}