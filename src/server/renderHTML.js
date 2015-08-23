import React from 'react';
import serialize from 'serialize-javascript';
import DocumentMeta from 'react-document-meta';

const manifest = __DEV__ ? {
  'main.js': 'index.js',
  'main.css': 'index.css',
} : require('../assets/build/manifest');

function renderHTML(component, initialState) {
  const app = React.renderToString(component);
  const meta = DocumentMeta.rewind({ asHtml: true });

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charSet="UTF-8">
  ${meta}
  <link href="/build/${manifest['main.css']}" media="screen, projection" rel="stylesheet" type="text/css">
</head>
<body>
  <div id="body">${app}</div>
  <script>window.__INITIAL_STATE__=${serialize(initialState)}</script>
  <script src="/build/${manifest['main.js']}"></script>
</body>
</html>`;
}

export default renderHTML;
