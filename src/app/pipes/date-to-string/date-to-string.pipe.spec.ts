import { DateToStringPipe } from './date-to-string.pipe';

describe('DateToStringPipe', () => {
  it('create an instance', () => {
    const pipe = new DateToStringPipe();
    expect(pipe).toBeTruthy();
  });
});
