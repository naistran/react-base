import koa from 'koa';
import createStore from './Root/createStore';
import runRouter from './Root/runRouter';
import renderHTML from './Root/Html/renderHTML';
import pkg from '../package';

const PORT = 3000;
const app = koa();

app.use(function* render() {
  if (__DEV__) {
    // Don't cache webpack stats: the script file would change since
    // hot module replacement is enabled in development
    webpackIsomorphicTools.refresh();
  }

  const store = createStore();
  const {
    component,
    redirectPath,
  } = yield runRouter(this.path, this.search, undefined, store);

  if (redirectPath) {
    return this.redirect(redirectPath);
  }

  this.body = renderHTML(webpackIsomorphicTools.assets(), component, store);
});

app.listen(PORT, err => {
  /* eslint no-console: 0 */
  if (err) console.error(err);
  console.log('%s@%s listening on %d', pkg.name, pkg.version, PORT);
});

export default app;
