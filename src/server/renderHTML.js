import React from 'react';
import serialize from 'serialize-javascript';
import DocumentMeta from 'react-document-meta';
const manifest = __DEV__ ? {
  'main.js': 'index.js',
  'main.css': 'index.css',
} : require('../assets/build/manifest');

function renderHTML(component, store) {
  const app = React.renderToString(component);
  const meta = DocumentMeta.rewind({ asHtml: true });
  const initialState = serialize(store.getState());
  // weird indentation because otherwise the response html has extra indentation
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charSet="UTF-8">
  ${meta}
  <link href="/build/${manifest['main.css']}" media="screen, projection" rel="stylesheet" type="text/css">
</head>
<body>
  <div id="body">${app}</div>
  <script>window.__INITIAL_STATE__=${initialState}</script>
  <script src="/build/${manifest['main.js']}"></script>
</body>
</html>`;
}

export default renderHTML;
