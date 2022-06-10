/* eslint-disable no-console */
import { connect, ConnectOptions } from "mongoose";
import { Client } from "redis-om";
import "dotenv/config";

import app from "./init";
import router from "./routes";

const client = new Client();

client.open("redis://localhost:6379");

const port = process.env.PORT || 4000;

const databaseConfig: ConnectOptions = {
  user: process.env.DATABASE_USER,
  pass: process.env.DATABASE_PASSWORD,
};

try {
  import("./seed");
} catch (error) {
  console.log("Seeding is not available");
}

if (!process.env.DATABASE_URI)
  throw new Error("Missing .env key : DATABASE_URI");

app.use("/api/v1/auth", router);

connect(process.env.DATABASE_URI, databaseConfig)
  .then(() => {
    app.listen(port, () => {
      console.log(`🚀 Server listening at http://localhost:${port}`);
    });
  })
  .catch(console.error);
