/* eslint strict: 0 */
'use strict';

const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const nodemon = require('nodemon');
const path = require('path');
const clientConfig = require('./webpack.config')[0];
const serverConfig = require('./webpack.config')[1];

const PORT = 3000;
const DEV_PORT = 3001;

// watch client

new WebpackDevServer(webpack(clientConfig), {
  publicPath: clientConfig.output.publicPath,
  hot: true,
  quiet: true,
  noInfo: true,
  stats: { colors: true },
  proxy: [{
    path: /^(?!.*\.hot-update\.js)(.*)$/,
    target: `http://localhost:${PORT}`,
  }],
}).listen(DEV_PORT, '0.0.0.0', function listen(err) {
  /* eslint no-console: 0 */
  if (err) console.error(err);
  console.log(`webpack-dev-server listening on ${DEV_PORT}`);
});

// watch server

let serverStarted = false;

webpack(serverConfig).watch(100, function watch(err) {
  if (err) {
    /* eslint no-console: 0 */
    console.error(err);
  }

  if (!serverStarted) {
    serverStarted = true;
    nodemon({
      script: path.resolve(__dirname, 'server'),
      watch: [path.resolve(__dirname, 'src', 'server')],
    });
  }

  nodemon.restart();
});
