import { FULL_ACCESS, PRIVILEGE } from "../auth/access";

it('Full access should have all the privilages!"', () => {
  expect(JSON.stringify(FULL_ACCESS)).toBe(
    JSON.stringify([
      PRIVILEGE.DELETE,
      PRIVILEGE.WRITE,
      PRIVILEGE.DELETE,
      PRIVILEGE.GRANT,
    ])
  );
});
