/* eslint-disable no-console */
import { connect, ConnectOptions } from "mongoose";
import "dotenv/config";

import { seed } from "./seed";

const databaseConfig: ConnectOptions = {
  user: process.env.DATABASE_USER,
  pass: process.env.DATABASE_PASSWORD,
};

if (!process.env.DATABASE_BASE_URI || !process.env.MICROSERVICE_NAME)
  throw new Error("Missing .env key : DATABASE_BASE_URI or MICROSERVICE_NAME");
connect(
  process.env.NODE_ENV === "production"
    ? `${process.env.DATABASE_URI}`
    : `${process.env.DATABASE_BASE_URI}/${process.env.MICROSERVICE_NAME}`,
  databaseConfig
)
  .then(() => seed())
  .catch(console.error);
