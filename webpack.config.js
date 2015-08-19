/* eslint camelcase: 0 */

const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const path = require('path');
const fs = require('fs');
const merge = require('lodash.merge');

const NODE_ENV = process.env.NODE_ENV;
const DEBUG = NODE_ENV !== 'production';
// these can be moved to a config file
const DEV_PORT = 3001;
const BUILD_PATH = 'build';
const GLOBALS = {
  __CLIENT__: false,
  __SERVER__: false,
  __DEV__: DEBUG,
  'process.env': {
    NODE_ENV: JSON.stringify(NODE_ENV),
  },
};

const rootDir = __dirname;
const srcDir = path.resolve(__dirname, 'src');

const nodeModulesExternals = {};
fs.readdirSync('node_modules')
  .filter(function filter(x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function forEach(mod) {
    nodeModulesExternals[mod] = 'commonjs ' + mod;
  });

/**
 * Loaders.
 */

// don't want to use bluebirdCoroutines on the client (too big)
const babel = 'babel?blacklist=bluebirdCoroutines';
const js = DEBUG ? ['react-hot', babel] : [babel];
const style = 'style';
const css = `css?modules&importLoaders=2&sourceMap&localIdentName=[local]__[hash:base64:5]&${DEBUG ? 'sourceMap!cssnext?sourceMap' : 'minimize!cssnext'}`;

/**
 * Config.
 */

const common = {
  cache: DEBUG,
  debug: DEBUG,

  resolve: {
    extensions: ['', '.js'],
  },

  output: {
    path: path.resolve(srcDir, 'assets', BUILD_PATH),
  },

  module: {
    loaders: [
      { test: /\.js$/, loaders: js, exclude: path.resolve(rootDir, 'node_modules') },
      // disable `amd` even in /node_modules - uncomment depending on the project's deps
      { test: /\.js$/, loader: 'imports?define=>false' },
      { test: /\.json$/, loader: 'json' },
      { test: /(\.png$|\.jpg$|\.jpeg$|\.gif$|\.svg$)/, loader: 'url?limit=10240' },
    ],
  },

  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
  ],

  cssnext: {
    import: {
      path: [
        srcDir,
      ],
    },
  },
};

const clientConfig = merge({}, common, {
  // client config
  name: 'client',
  devtool: DEBUG ? 'cheap-module-eval-source-map' : false,

  entry: [path.resolve(srcDir, 'client')]
    .concat(DEBUG ? [
      `webpack-dev-server/client?http://0.0.0.0:${DEV_PORT}`,
      'webpack/hot/only-dev-server',
    ] : []),

  output: {
    filename: DEBUG ? 'index.js' : '[name]-[hash].js',
    chunkFilename: '[name]-[chunkhash].js',
    publicPath: `/${BUILD_PATH}/`,
  },

  module: {
    loaders: common.module.loaders.concat({
      test: /\.css$/,
      loader: DEBUG ?
        `${style}!${css}` :
        ExtractTextPlugin.extract(style, css),
    }),
  },

  plugins: common.plugins.concat([
    new webpack.DefinePlugin(merge({}, GLOBALS, { __CLIENT__: true })),
  ]).concat(DEBUG ? [
    new webpack.HotModuleReplacementPlugin(),
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
    new ManifestPlugin(),
  ]),

  // some modules need this
  node: {
    console: true,
  },
});

const serverConfig = merge({}, common, {
  // server config
  name: 'server',
  devtool: '#source-map',
  entry: path.resolve(srcDir, 'shared', 'runRouter'),
  target: 'node',
  externals: nodeModulesExternals,

  output: {
    // The filename of the entry chunk as relative path inside the output.path directory
    filename: 'runRouter.js',
    libraryTarget: 'commonjs2',
  },

  module: {
    loaders: common.module.loaders.concat({
      test: /\.css$/,
      loader: css,
    }),
  },

  plugins: common.plugins.concat([
    new webpack.DefinePlugin(merge({}, GLOBALS, { __SERVER__: true })),
    new webpack.BannerPlugin('require("source-map-support").install();',
      { raw: true, entryOnly: false }),
  ]),
});

module.exports = [clientConfig, serverConfig];
