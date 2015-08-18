require('babel/register')({
  ignore: false,
  only: new RegExp(`${__dirname}\/src\/`),
});

global.__CLIENT__ = false;
global.__SERVER__ = true;
global.__DEV__ = process.env.NODE_ENV !== 'production';

const WebpackIsomorphicTools = require('webpack-isomorphic-tools');
global.webpackIsomorphicTools = new WebpackIsomorphicTools(require('./webpack-isomorphic-tools'))
  .development(__DEV__)
  .server(__dirname, function () {
    require('./src/server');
  });
