var socket = io();

socket.on('connect', function () {
  console.log('Connected to server'); 

  // socket.emit('createEmail', {
  //   to: 'lola@example.com',
  //   text: 'Hey Lola, where is my sock'
  // })

  // socket.emit('createMessage', {
  //   from: 'Lola',
  //   text: 'Hey Steve, feed me'
  // })
});

// socket.on('newEmail', function (email) {
//   console.log('New email', email);
// });

socket.on('newMessage', function (message) {
  console.log('New message', message)

  var li = jQuery('<li></li>');
  li.text(`${message.from}: ${message.text}`);

  jQuery('#messages').append(li);
});

socket.on('disconnect', function () {
  console.log('Disconnected from server');
});

// socket.emit('createMessage', {
//   from: 'Henrique',
//   text: 'hi'
// }, function (data) {
//   console.log('Got it', data)
// });

jQuery('#message-form').on('submit', function (e) {
  e.preventDefault();

  socket.emit('createMessage', {
    from: 'User',
    text: jQuery('[name=message]').val()
  }, function () {

  });
});
