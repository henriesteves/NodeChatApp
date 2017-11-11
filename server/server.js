const express = require('express');
const http = require('http');
const path = require('path');
const socketIO = require('socket.io');

const app = express();
const publicPath = path.join(__dirname + '/../public');
const port = process.env.PORT || 3000;
const server = http.createServer(app);
const io = socketIO(server);
 
// console.log(publicPath);
// console.log(__dirname + '/../public');

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connected');

    // socket.emit('newEmail', {
    //     from: 'steve@example.com',
    //     text: 'Hey. What\'s up!!!',
    //     createdAt: 123
    // });

    socket.emit('newMessage', {
        from: 'Steve',
        text: 'Hello to all',
        createdAt: 123
    });

    // socket.on('createEmail', (newEmail) => {
    //     console.log('creatEmail', newEmail);
    // });

    socket.on('createMessage', (message) => {
        console.log('createMessage', message)
    });

    socket.on('disconnect', () => {
        console.log(('User was disconnected'));
    });
});

server.listen(port, () => {
    console.log(`Server is up on port ${port}`);
})