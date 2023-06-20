/* eslint-disable no-console */
import "dotenv/config";

import app, { baseUrl } from "./init";
import router from "./routes";

const port = process.env.PORT || 4000;

if (!process.env.DATABASE_BASE_URI || !process.env.MICROSERVICE_NAME)
  throw new Error("Missing .env key : DATABASE_BASE_URI or MICROSERVICE_NAME");

app.use(baseUrl, router);

app.listen(port, () => {
  import("events/listeners");
  console.log(`🚀 Server listening at http://localhost:${port}`);
});
