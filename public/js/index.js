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

  var formattedTime = moment(message.crearedAt).format('h:mm a');
  var li = jQuery('<li></li>');
  li.text(`${message.from} ${formattedTime}: ${message.text}`);

  jQuery('#messages').append(li);
});

socket.on('newLocationMessage', function (message) {
  var formattedTime = moment(message.crearedAt).format('h:mm a');
  var li = jQuery('<li></li>');
  var a = jQuery('<a target="_blank">My current location</a>');

  li.text(`${message.from} ${formattedTime}: `);
  a.attr('href', message.url);
  li.append(a);
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

  var messageTextbox = jQuery('[name=message]');

  socket.emit('createMessage', {
    from: 'User',
    text: messageTextbox.val()
  }, function () {
    messageTextbox.val('');
  });
});

var locationButton = document.getElementById('send-location');
locationButton.addEventListener('click', function () {
  if (!navigator.geolocation) {
    return alert('Geolocation not supported by your browser.')
  }

  locationButton.disabled = true;
  locationButton.innerHTML = 'Sending location...';

  navigator.geolocation.getCurrentPosition(function (position) {
    console.log(position);

    locationButton.disabled = false;
    locationButton.innerHTML = 'Send location';

    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, function () {
    locationButton.disabled = false;
    locationButton.innerHTML = 'Send location';
    alert('Unable to fetch location.')
  })
});
