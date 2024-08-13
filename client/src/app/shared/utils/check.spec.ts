import { isString } from './check';

describe('testing isString func', () => {
  it('string = true', () => {
    expect(isString('')).toBe(true);
  });
  it('number = false', () => {
    expect(isString(10)).toBe(false);
  });
  it('null = false', () => {
    expect(isString(null)).toBe(false);
  });
  it('bigint = false', () => {
    expect(isString(BigInt(666))).toBe(false);
  });
  it('undefined = false', () => {
    expect(isString(undefined)).toBe(false);
  });
  it('object = false', () => {
    expect(isString({})).toBe(false);
  });
  it('arrow func = false', () => {
    expect(isString(() => {})).toBe(false);
  });
});
