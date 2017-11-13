const expect = require('expect');

const { isRealString } = require('./validation');

describe('isRealString', () => {
  it ('should reject non-string values', () => {
    var res = isRealString(98);

    expect(res).toBe(false);
  });

  it ('should reject string with only spaces', () => {
    var res = isRealString('   ');

    expect(res).toBe(false);
  });

  it ('should allow string with non-space characters', () => {
    var res = isRealString(' name=Henrique ');
    var res1 = isRealString(' name=Henrique&room=NodeJS ');
    var res2 = isRealString('name=');

    expect(res).toBe(true);
    expect(res1).toBe(true);
    expect(res2).toBe(true);
  });
});