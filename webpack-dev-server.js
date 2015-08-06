const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.config');

const PORT = 3000;
const DEV_PORT = 3001;

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
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
