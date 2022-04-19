import { FULL_ACCESS, PRIVILEGE } from "../auth/access";

it('Full access should have all the privilages!"', () => {
  expect(JSON.stringify(FULL_ACCESS)).toBe(
    JSON.stringify([
      PRIVILEGE.READ,
      PRIVILEGE.READ_SELF,
      PRIVILEGE.WRITE,
      PRIVILEGE.WRITE_SELF,
      PRIVILEGE.DELETE,
      PRIVILEGE.DELETE_SELF,
      PRIVILEGE.GRANT,
      PRIVILEGE.REVOKE,
    ])
  );
});
