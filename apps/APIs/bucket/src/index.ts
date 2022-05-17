/* eslint-disable no-console */
import { json } from "body-parser";
import clsx from "core-utils/clsx";
import express from "express";
import fs from "fs-extra";
import { resolvePath } from "init";
import { connect, ConnectOptions } from "mongoose";
import "dotenv/config";

import router from "./routes";

const app = express();

app.use(json());

fs.mkdirSync(resolvePath("public"), { recursive: true });

const port = process.env.PORT || 4000;

const databaseConfig: ConnectOptions = {
  user: process.env.DATABASE_USER,
  pass: process.env.DATABASE_PASSWORD,
};

if (!process.env.DATABASE_URI)
  throw new Error("Missing .env key : DATABASE_URI");

app.use("/api/v1/bucket", router);
app.use("/api/v1/bucket*", (_req, res) => {
  res.send(clsx(["Hello"], "Bucket", { "!": true }));
});

connect(process.env.DATABASE_URI, databaseConfig)
  .then(() => {
    app.listen(port, () => {
      console.log(`🚀 Server listening at http://localhost:${port}`);
    });
  })
  .catch(console.error);
