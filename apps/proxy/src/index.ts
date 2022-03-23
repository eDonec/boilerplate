/* eslint-disable no-console */
import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

const app = express();
const port = process.env.port || 3000;

/** Route */

app.use(
  '/dashboard*',
  createProxyMiddleware({ target: `http://localhost:3001/`, ws: true })
);
app.use(
  '/api/v1',
  createProxyMiddleware({ target: `http://localhost:4000/`, ws: true })
);
app.use(
  '/*',
  createProxyMiddleware({ target: `http://localhost:4200/`, ws: true })
);

app.listen(port, () => {
  console.log(`Main app listening on port http://localhost:${port}`);
  console.log(
    `Everything else should've been reverse proxied to that same port`
  );
});

// !important add inside generator the ability to populate this file and document the process
// ask in the generator for port as well as base url
// update in the CRA the base url for the route
// do something for the next app as well as the express app
