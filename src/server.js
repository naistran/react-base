import koa from 'koa';
import React from 'react';
import Location from 'react-router/lib/Location';
import { App, Html, routes, runRouter } from './app';
import pkg from '../package';

const PORT = 3000;
const app = koa();

app.use(function* render() {
  const location = new Location(this.path, this.search);
  const {
    component,
    redirectPath,
  } = yield runRouter(routes, App, location);

  if (redirectPath) {
    return this.redirect(redirectPath);
  }

  const html = <Html component={component}/>;
  this.body = `<!DOCTYPE html>${React.renderToString(html)}`;
});

app.listen(PORT, err => {
  /* eslint no-console: 0 */
  if (err) console.error(err);
  console.log('%s@%s listening on %d', pkg.name, pkg.version, PORT);
});

export default app;
