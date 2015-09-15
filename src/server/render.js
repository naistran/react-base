import React from 'react';
import { renderToString } from 'react-dom/server';
import { RoutingContext, match } from 'react-router';
import { Provider } from 'react-redux';
import Helmet from 'react-helmet';
import createLocation from 'history/lib/createLocation';
import serialize from 'serialize-javascript';
import createStore from '../shared/createStore';
import routes from '../shared/build/routes';

const manifest = __DEV__ ? {
  'main.js': 'index.js',
  'main.css': 'index.css',
} : require('../assets/build/manifest');

function renderHTML(app, head, initialState) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charSet="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>${head.title}</title>
  ${head.meta}
  <link href="/build/${manifest['main.css']}" media="screen, projection" rel="stylesheet" type="text/css">
</head>
<body>
  <div id="root">${app}</div>
  <script>window.__INITIAL_STATE__=${initialState}</script>
  <script src="/build/${manifest['main.js']}"></script>
</body>
</html>`;
}

function* render() {
  const store = createStore();
  const location = createLocation(this.url);

  match({ routes, location }, (err, redirectLocation, renderProps) => {
    if (err) throw err;

    if (redirectLocation) {
      const { pathname, search } = redirectLocation;
      return this.redirect(pathname + search);
    }

    const app = renderToString(
      <Provider store={store}>
        <RoutingContext {...renderProps}/>
      </Provider>
    );
    const head = Helmet.rewind();
    const initialState = serialize(store.getState());

    this.body = renderHTML(app, head, initialState);
  });
}

export default render;
