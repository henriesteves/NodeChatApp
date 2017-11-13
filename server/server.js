const express = require('express');
const http = require('http');
const path = require('path');
const socketIO = require('socket.io');

const { generateMessage, generateLocationMessage } = require('./utils/message');
const { isRealString } = require('./utils/validation');
const { Users } = require('./utils/users');

const app = express();
const publicPath = path.join(__dirname + '/../public');
const port = process.env.PORT || 3000;
const server = http.createServer(app);
const io = socketIO(server);
const users = new Users();
 
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
    // socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app')); 

    // Emite uma mensagem para todos, menos para o usuario atual
    // socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));

    socket.on('join', (params, callback) => {
        if (!isRealString(params.name) || !isRealString(params.room)) {
            return callback('Name and room name are reuiqred.')
        }

        socket.join(params.room);
        users.removeUser(socket.id);
        users.addUser(socket.id, params.name, params.room);

        //socket.leave('Room name')

        // Emite apenas para um room especifico
        // io.emit -> io.to('Room name').emit

        // Emite para todos do room, menos o usuario atual
        // socket.broadcast.emit -> socket.broadcast.to('Room name').emit

        // Emite para um usuario especifico
        // socket.emit

        io.to(params.room).emit('updateUserList', users.getUserList(params.room));

        socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

        socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined`));

        callback();
    });

    socket.on('createMessage', (message, callback) => {
        //console.log('createMessage', message);

        var user = users.getUser(socket.id);

        if (user && isRealString(message.text)) {
            io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
        }

        // Emite a mensagem para todos incluindo o cliente que emitiu
        //io.emit('newMessage', generateMessage(message.from, message.text));

        callback();

        // Emite a mensagem para todos, menos o cliente que emitiu
        // socket.broadcast.emit('newMessage', {
        //     from: message.from,
        //     text: message.text,
        //     createdAt: new Date().getTime()
        // });
    });

    socket.on('createLocationMessage', (coords) => {
        var user = users.getUser(socket.id);

        if (user) {
            io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude));
        }
    });

    socket.on('disconnect', () => {
        console.log(('User was disconnected'));

        var user = users.removeUser(socket.id);

        if (user) {
            io.to(user.room).emit('updateUserList', users.getUserList(user.room));
            io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left`));
        }
    });
});

server.listen(port, () => {
    console.log(`Server is up on port ${port}`);
})