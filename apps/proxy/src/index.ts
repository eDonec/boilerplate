/* eslint-disable no-console */
import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";

const app = express();
const port = process.env.PORT || 3000;

/** PROXY */

app.use(
  "/auth*",
  createProxyMiddleware({ target: "http://localhost:3005/", ws: true })
);

app.use(
  "/dashboard*",
  createProxyMiddleware({ target: "http://localhost:3001/", ws: true })
);

app.use(
  "/api/v1*",
  createProxyMiddleware({ target: "http://localhost:4000/", ws: true })
);

app.use(
  "/*",
  createProxyMiddleware({ target: "http://localhost:4200/", ws: true })
);

app.listen(port, () => {
  console.log(`Main app listening on port http://localhost:${port}`);
  console.log(
    "Everything else should've been reverse proxied to that same port"
  );
});
