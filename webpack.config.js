/* eslint camelcase: 0 */

const webpack = require('webpack');
const merge = require('lodash.merge');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
const webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(require('./webpack-isomorphic-tools'));

const NODE_ENV = process.env.NODE_ENV;
const DEBUG = NODE_ENV !== 'production';
// these can be moved to a config file
const DEV_PORT = 3001;
const BUILD_PATH = 'build';
const JS_OUTPUT = 'index.js';
const CSS_OUTPUT = 'index.css';
const SRC = 'src';
const PUBLIC_PATH = `/${BUILD_PATH}/`;
const NODE_MODULES = path.resolve(__dirname, 'node_modules');

/**
 * Loaders.
 */

// don't want to use bluebirdCoroutines on the client (too big)
const babel = 'babel?blacklist=bluebirdCoroutines';
const JS_LOADER = DEBUG ? ['react-hot', babel] : [babel];

const STYLE_LOADER = 'style';
const CSS_LOADER = DEBUG ?
  'css?sourceMap!cssnext?sourceMap' :
  'css?minimize!cssnext';

/**
 * Config.
 */

const config = {
  cache: DEBUG,
  debug: DEBUG,

  resolve: {
    extensions: ['', '.js'],
  },

  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
  ],

  module: {
    loaders: [
      { test: /\.js$/, loaders: JS_LOADER, exclude: NODE_MODULES },
      // { test: /\.view\/index\.js$/, loaders: CHUNK_LOADER, exclude: NODE_MODULES },
      // disable `amd` even in /node_modules - uncomment depending on the project's deps
      { test: /\.js$/, loader: 'imports?define=>false' },
      { test: /\.json$/, loader: 'json' },
      { test: webpackIsomorphicToolsPlugin.regular_expression('images'), loader: 'url?limit=10240' },
    ],
  },

  cssnext: {
    import: {
      path: [
        path.resolve(__dirname, SRC),
      ],
    },
  },
  // some modules need this
  node: {
    console: true,
  },
};

const clientConfig = merge({}, config, {
  entry: [path.resolve(__dirname, SRC, 'client')]
    .concat(DEBUG ? [
      `webpack-dev-server/client?http://0.0.0.0:${DEV_PORT}`,
      'webpack/hot/only-dev-server',
    ] : []),
  output: {
    filename: '[name]-[hash].js',
    chunkFilename: '[name]-[chunkhash].js',
    publicPath: PUBLIC_PATH,
    path: path.resolve(__dirname, SRC, 'assets', BUILD_PATH),
  },
  devtool: DEBUG ? 'cheap-module-eval-source-map' : false,
  plugins: config.plugins.concat([
    new webpack.DefinePlugin({
      __CLIENT__: true,
      __SERVER__: false,
      __DEV__: DEBUG,
      'process.env': {
        NODE_ENV: JSON.stringify(NODE_ENV),
      },
    }),
  ].concat(DEBUG ? [
    new webpack.HotModuleReplacementPlugin(),
    webpackIsomorphicToolsPlugin.development(),
  ] : [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      screw_ie8: true,
      compress: {
        keep_fnames: true,
        drop_console: true,
      },
      mangle: {
        keep_fnames: true,
      },
    }),
    new webpack.optimize.AggressiveMergingPlugin(),
    new ExtractTextPlugin('[name]-[chunkhash].css', { allChunks: true }),
    webpackIsomorphicToolsPlugin,
  ])),
  module: {
    loaders: config.module.loaders.concat({
      test: /\.css$/,
      loader: DEBUG ?
        `${STYLE_LOADER}!${CSS_LOADER}` :
        ExtractTextPlugin.extract(STYLE_LOADER, CSS_LOADER),
    }),
  },
});

module.exports = clientConfig;
