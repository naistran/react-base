require('babel/register')({
  ignore: [
    new RegExp(`${__dirname}\/node_modules\/`),
    new RegExp(`${__dirname}\/src\/shared\/build\/`),
  ],
});

global.__CLIENT__ = false;
global.__SERVER__ = true;
global.__DEV__ = process.env.NODE_ENV !== 'production';

require('./src/server');
