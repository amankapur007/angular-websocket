const express = require('express');
const socket = require('socket.io');
var path=require('path');
const PORT = 8080;

const app = express();

const server = app.listen(PORT,()=>{
    console.log(`Web server listening in ${PORT}`);
});

app.use(express.static(__dirname+"/dist"));

var io = socket(server);

io.on('connection',(socket)=>{
    socket.on('chat',(data)=>{
        console.log(data)
        io.sockets.emit('chat',data);
    })

    socket.on('chattyping',(data)=>{
        socket.broadcast.emit('chattyping',data);
    })
})
app.get('/*',(req, res)=>{
    res.sendFile(path.join(__dirname+'/dist/index.html'));
});