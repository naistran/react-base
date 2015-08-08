require('babel/register')({
  ignore: false,
  only: new RegExp(`${__dirname}\/src\/`),
});

global.__CLIENT__ = false;
global.__SERVER__ = true;

require('./src/server');
