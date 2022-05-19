/* eslint-disable no-console */
import Auth from "models/Auth";
import Role from "models/Role";
import { ACCESS_TYPE, AUTH_PROVIDERS } from "shared-types";

import { seedRoles } from "constants/defaultRoles";

const DEFAULT_USER = {
  // TODO: move this to .env and github secrets
  email: process.env.ROOT_USER_EMAIL,
  password: process.env.ROOT_USER_PASSWORD,
  authType: ACCESS_TYPE.USER,
  authProvider: [AUTH_PROVIDERS.CLASSIC],
  isActive: true,
};

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
    const seededRoles = await Promise.all(promises);

    const newRootUser = await Auth.findOneAndUpdate(
      {
        email: DEFAULT_USER.email,
      },
      {
        ...DEFAULT_USER,
        role: seededRoles.find((role) => role.name === "GOD")?._id,
      },
      {
        upsert: true,
        new: true,
      }
    );

    console.log(`Seeded and updated ${seedRoles.length} roles`);
    console.log(
      `Seeded and updated default user with email ${newRootUser.email} with role "GOD"`
    );
    console.log(`Seeding Completed...`);
  } catch (error) {
    console.log("seeding unavailable");
  }
};
