import koa from 'koa';
import serve from 'koa-static';
import pkg from '../../package';
import render from './render';

const PORT = 3000;
const app = koa();

app.use(serve('./src/assets', {
  maxage: 24 * 60 * 60 * 1000, // 1 day
}));

app.use(render);

app.listen(PORT, err => {
  /* eslint no-console: 0 */
  if (err) console.error(err);
  console.log('%s@%s listening on %d', pkg.name, pkg.version, PORT);
});

export default app;
