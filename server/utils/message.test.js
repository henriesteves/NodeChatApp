const expect = require('expect');

var { generateMessage, generateLocationMessage } = require('./message');

describe('generateMessage', () => {
  it('should generate correct message object', () => {
    var from = 'Henrique';
    var text = 'Text from Henrique';
    var message = generateMessage(from, text)
    
    expect(message.from).toBe(from)
    expect(message.text).toBe(text)
    // Mesmo que
    expect(message).toMatchObject({ from, text });

    expect(typeof message.createdAt).toBe('number')
  });
});

describe('generateLocationMessage', () => {
  it('should generate correct location object', () => {
    var from = 'Henrique';
    var latitude = 15;
    var longitude = 20;
    var url = `https://www.google.com/maps?q=${latitude},${longitude}`;
    var message = generateLocationMessage(from, latitude, longitude);

    expect(message).toMatchObject({ from, url });
    expect(typeof message.createdAt).toBe('number')
  });
});