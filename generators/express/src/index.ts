import clsx from "core-utils/clsx";
import express from "express";

const app = express();
const port = process.env.port || 4000;

app.get("{BASE_PATH}", (_req, res) => {
  res.send(clsx(["Hello"], "World", { ["!"]: true }));
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening at http://localhost:${port}`);
});
