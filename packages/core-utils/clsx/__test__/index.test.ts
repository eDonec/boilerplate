import clsx from '..';

it('should return "Hello World !"', () => {
  expect(clsx('Hello', 'World', '!')).toBe('Hello World !');
});
