import "dotenv/config";

import app, { baseUrl } from "./init";
import router from "./routes";

app.use(baseUrl, router);

export { baseUrl };

export default app;
