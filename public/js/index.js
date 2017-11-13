var socket = io();

function scrollToBotton () {
  // Selectors
  var messages = document.getElementById('messages');
  var newMessage = messages.lastElementChild;

  //console.log(messages)
  //console.log(newMessage)

  // Heights
  var scrollTop = messages.scrollTop;
  var clientHeight = messages.clientHeight;
  var scrollHeight = messages.scrollHeight;
  var newMessageHeight = newMessage.clientHeight;
  var lastMessageHeight = newMessage.previousElementSibling ? newMessage.previousElementSibling.clientHeight : 0;
  //var lastMessageHeight = newMessage.clientHeight;

  //console.log(scrollTop);
  //console.log(clientHeight);
  //console.log(scrollHeight);
  //console.log('New Message:', newMessageHeight);
  //console.log('Last Message:', lastMessageHeight);
  
  if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
    //console.log('Should scroll')
    messages.scrollTop = scrollHeight
  }
}

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
  var template = document.getElementById('message-template').innerHTML;
  var html = Mustache.render(template, {
    from: message.from,
    text: message.text,
    createdAt: formattedTime
  });

  //console.log(html);
  jQuery('#messages').append(html);

  scrollToBotton();

  //document.getElementById('messages').appendChild(html);
  
  // var formattedTime = moment(message.crearedAt).format('h:mm a');
  // var li = jQuery('<li></li>');
  // li.text(`${message.from} ${formattedTime}: ${message.text}`);

  // jQuery('#messages').append(li);
});

socket.on('newLocationMessage', function (message) {
  var formattedTime = moment(message.crearedAt).format('h:mm a');
  var template = jQuery('#location-message-template').html();
  var html = Mustache.render(template, {
    from: message.from,
    url: message.url,
    createdAt: formattedTime
  });

  jQuery('#messages').append(html);

  scrollToBotton();

  // var formattedTime = moment(message.crearedAt).format('h:mm a');
  // var li = jQuery('<li></li>');
  // var a = jQuery('<a target="_blank">My current location</a>');

  // li.text(`${message.from} ${formattedTime}: `);
  // a.attr('href', message.url);
  // li.append(a);
  // jQuery('#messages').append(li);
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
    messageTextbox.focus();
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
