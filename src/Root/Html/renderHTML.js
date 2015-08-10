import React from 'react';
import Html from './';

function renderHTML(component, store) {
  const html = <Html component={component} store={store}/>;
  return `<!DOCTYPE html>${React.renderToString(html)}`;
}

export default renderHTML;
