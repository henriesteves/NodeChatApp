var socket = io();

socket.on('connect', function () {
  console.log('Connected to server'); 

  // socket.emit('createEmail', {
  //   to: 'lola@example.com',
  //   text: 'Hey Lola, where is my sock'
  // })

  socket.emit('createMessage', {
    from: 'Lola',
    text: 'Hey Steve, feed me'
  })
});

// socket.on('newEmail', function (email) {
//   console.log('New email', email);
// });

socket.on('newMessage', function (message) {
  console.log('New message', message)
});

socket.on('disconnect', function () {
  console.log('Disconnected from server');
});
