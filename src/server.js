import http from 'http';
import React from 'react';
import Html from 'components/Html';
import App from 'components/App';
import pkg from '../package';

const PORT = 3000;

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  const html = React.renderToString(<Html component={<App/>}/>);
  res.end(`<!DOCTYPE html>${html}`);
});

server.listen(PORT, err => {
  /* eslint no-console: 0 */
  if (err) console.error(err);
  console.log('%s@%s listening on %d', pkg.name, pkg.version, PORT);
});

export default server;
