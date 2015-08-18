import React from 'react';
import Html from './';

function renderHTML(assets, component, store) {
  const html = <Html assets={assets} component={component} store={store}/>;
  return `<!DOCTYPE html>${React.renderToString(html)}`;
}

export default renderHTML;
