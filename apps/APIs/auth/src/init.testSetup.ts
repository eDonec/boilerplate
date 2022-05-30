/* eslint-disable no-console */
import "dotenv/config";

import app from "./init";
import router from "./routes";

app.use("/api/v1/auth", router);

export default app;
