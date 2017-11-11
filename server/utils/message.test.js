const expect = require('expect');

var { generateMessage } = require('./message');

describe('generateMessage', () => {
  it('should generate correct message object', () => {
    var from = 'Henrique';
    var text = 'Text from Henrique';
    var message = generateMessage(from, text)
    
    expect(message.from).toBe('Henrique')
    expect(message.text).toBe('Text from Henrique')
    // Mesmo que
    expect(message).toMatchObject({ from, text });

    expect(typeof message.createdAt).toBe('number')
  });
});