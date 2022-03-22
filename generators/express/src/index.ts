import clsx from 'core-utils/clsx';
import express from 'express';

const app = express();
const port = 4000;


app.get('/', (_req, res) => {
  res.send(clsx(['Hello'], 'World', { ['!']: true }));
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening at http://localhost:${port}`);
});
