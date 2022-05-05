/* eslint-disable no-console */
import Role from "models/Role";

import { seedRoles } from "constants/defaultRoles";

export const seed = async () => {
  console.log(`Connected to database`);
  console.log(`Seeding Started...`);
  try {
    await Role.init();
    const promises = seedRoles.map((role) =>
      Role.findOneAndUpdate({ name: role.name }, role, {
        upsert: true,
        new: true,
      })
    );

    await Promise.all(promises);
    console.log(`Seeded and updated ${seedRoles.length} roles`);
    console.log(`Seeding Completed...`);
  } catch (error) {
    console.log("seeding unavailable");
  }
};
