/* eslint-disable no-console */
import { connect, ConnectOptions } from "mongoose";
import "dotenv/config";

import app, { baseUrl } from "./init";
import router from "./routes";

const port = process.env.PORT || 4000;

const databaseConfig: ConnectOptions = {
  user: process.env.DATABASE_USER,
  pass: process.env.DATABASE_PASSWORD,
};

if (!process.env.DATABASE_BASE_URI || !process.env.MICROSERVICE_NAME)
  throw new Error("Missing .env key : DATABASE_BASE_URI or MICROSERVICE_NAME");

app.use(baseUrl, router);

connect(
  process.env.NODE_ENV === "production"
    ? `${process.env.DATABASE_URI}`
    : `${process.env.DATABASE_BASE_URI}/${process.env.MICROSERVICE_NAME}`,
  databaseConfig
)
  .then(() => {
    import("helpers/cron");
    app.listen(port, () => {
      console.log(`🚀 Server listening at http://localhost:${port}`);
    });
  })
  .catch(console.error);
