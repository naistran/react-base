import React from 'react';
import serialize from 'serialize-javascript';
import DocumentMeta from 'react-document-meta';

function renderHTML(assets, component, store) {
  const str = React.renderToString(component);
  const meta = DocumentMeta.rewind({ asHtml: true });
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charSet="UTF-8">
      ${meta}
      ${Object.keys(assets.styles).map(style =>
        `<link href="${assets.styles[style]}"" media="screen, projection" rel="stylesheet" type="text/css">`
      )}
    </head>
    <body>
      <div id="body">${str}</div>
      <script>window.__INITIAL_STATE__=${serialize(store.getState())}</script>
      <script src="${assets.javascript.main}"></script>
    </body>
    </html>`;
}

export default renderHTML;
