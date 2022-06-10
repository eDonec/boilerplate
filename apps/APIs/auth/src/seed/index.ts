/* eslint-disable no-console */
import { connect, ConnectOptions } from "mongoose";
import "dotenv/config";

import { populateRedis } from "./populateRedis";
import { seed } from "./seed";

const databaseConfig: ConnectOptions = {
  user: process.env.DATABASE_USER,
  pass: process.env.DATABASE_PASSWORD,
};

if (!process.env.DATABASE_URI)
  throw new Error("Missing .env key : DATABASE_URI");
connect(process.env.DATABASE_URI || "", databaseConfig)
  .then(() => {
    seed().then(() => {
      populateRedis();
    });
  })
  .catch(console.error);
