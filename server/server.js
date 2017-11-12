const express = require('express');
const http = require('http');
const path = require('path');
const socketIO = require('socket.io');

const { generateMessage, generateLocationMessage } = require('./utils/message')

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

    // socket.emit('newMessage', {
    //     from: 'Steve',
    //     text: 'Hello to all',
    //     createdAt: 123
    // });

    // socket.on('createEmail', (newEmail) => {
    //     console.log('creatEmail', newEmail);
    // });

    // Emite uma mensagem apenas para quem está se conectando
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app')); 

    // Emite uma mensagem para todos, menos para quem está se conectando
    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));

    socket.on('createMessage', (message, callback) => {
        console.log('createMessage', message);

        // Emite a mensagem para todos incluindo o cliente que emitiu
        io.emit('newMessage', generateMessage(message.from, message.text));
        callback();

        // Emite a mensagem para todos, menos o cliente que emitiu
        // socket.broadcast.emit('newMessage', {
        //     from: message.from,
        //     text: message.text,
        //     createdAt: new Date().getTime()
        // });
    });

    socket.on('createLocationMessage', (coords) => {
        io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
    });

    socket.on('disconnect', () => {
        console.log(('User was disconnected'));
    });
});

server.listen(port, () => {
    console.log(`Server is up on port ${port}`);
})