const express = require('express');
const {createServer} = require('http');
const {Server} = require('socket.io');
const cors = require('cors');

const app = express();
const isDev = app.settings.env === 'development';
const URL = isDev ? 'http://localhost:3002' : 'https://sketchbook-nu.vercel.app/'
app.use(cors({
    origin: URL
}))
const httpServer = createServer(app);
const io = new Server(httpServer,{
    cors: URL
});
io.on('connection',(socket) => {
    console.log('server connected');
    socket.on('beginPath',(args) => {
        socket.broadcast.emit('beginPath',args)
    })
    socket.on('drawLine',(args) => {
        socket.broadcast.emit('drawLine',args)
    })
    socket.on('changeConfig',(args) => {
        socket.broadcast.emit('changeConfig',args)
    })
})
httpServer.listen(5001)