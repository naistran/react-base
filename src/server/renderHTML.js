import React from 'react';
import Html from './Html';

function renderHTML(component) {
  const html = <Html component={component}/>;
  return `<!DOCTYPE html>${React.renderToString(html)}`;
}

export default renderHTML;
