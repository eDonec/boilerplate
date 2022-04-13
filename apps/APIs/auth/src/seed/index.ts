/* eslint-disable no-console */
import Role from "models/Role";
import { connect, ConnectOptions } from "mongoose";
import "dotenv/config";

import { seedRoles } from "constants/defaultRoles";

const databaseConfig: ConnectOptions = {
  user: process.env.DATABASE_USER,
  pass: process.env.DATABASE_PASSWORD,
};

if (!process.env.DATABASE_URI)
  throw new Error("Missing .env key : DATABASE_URI");

connect(process.env.DATABASE_URI, databaseConfig)
  .then(async () => {
    console.log(`Connected to database`);
    console.log(`Seeding Started...`);
    await Role.init();
    await Role.create(seedRoles);

    console.log(`Seeded ${seedRoles.length} roles`);

    console.log(`Seeding Completed...`);
    process.exit(0);
  })
  .catch(console.error);
