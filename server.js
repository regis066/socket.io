const path = require("path");
const express = require("express");
const http = require("http");
const socketio = require('socket.io')
const formatMessage = require('./utils/messages')


const app = express()
const server = http.createServer(app)
const io = socketio(server);

const botName = 'ChatChordBot';

io.on('connection', socket => {
    console.log("New WS connection established");
    socket.emit("message", formatMessage(botName, "Welcome to chatCord Room"));


    socket.broadcast.emit("message", formatMessage(botName,"A user has joined the chat"));

    socket.on("disconnect", () => {
        io.emit("message", formatMessage(botName,"The user has left the chat"));
    })

    socket.on('chatMessage' , msg => {
        io.emit('message', formatMessage('USER', msg));
    })
})
app.use(express.static(path.join(__dirname, "public")))
const PORT = 4000 || process.env.PORT;
server.listen(PORT, console.log(`Server running on port ${PORT}`))
