import clsx from 'core-utils/src/clsx';
import express from 'express';

const app = express();
const port = process.env.port || 4000;

app.get('/api/v1', (_req, res) => {
  res.send(clsx(['Hello'], 'World', { ['!']: true }));
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening at http://localhost:${port}`);
});
