import numberWithCommas from './numberWithCommas';

describe('numberWithCommas', () => {
  test('Нет пробелов', () => {
    expect(numberWithCommas(-1)).toBe('-1');
  });
  test('Нет пробелов', () => {
    expect(numberWithCommas(0)).toBe('0');
  });
  test('Нет пробелов', () => {
    expect(numberWithCommas(1)).toBe('1');
  });
  test('Один пробел', () => {
    expect(numberWithCommas(5_000)).toBe('5 000');
  });
  test('Два пробела', () => {
    expect(numberWithCommas(10_000_000)).toBe('10 000 000');
  });
  test('Три пробела', () => {
    expect(numberWithCommas(1_000_000_000)).toBe('1 000 000 000');
  });
});
