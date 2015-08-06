require('babel/register')({
  ignore: false,
  only: new RegExp(`${__dirname}\/src\/`),
});
require('./src/server');
