import koa from 'koa';
import { route, renderHTML } from './app';
import pkg from '../package';

const PORT = 3000;
const app = koa();

app.use(function* render() {
  const { path, search } = this;
  const { component, redirectPath } = yield route(path, search);

  if (redirectPath) {
    return this.redirect(redirectPath);
  }

  this.body = renderHTML(component);
});

app.listen(PORT, err => {
  /* eslint no-console: 0 */
  if (err) console.error(err);
  console.log('%s@%s listening on %d', pkg.name, pkg.version, PORT);
});

export default app;
