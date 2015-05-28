/**
 * @file Example webpack config for the stage environment.
 * This is not directly used since we need to be able to override values.
 * It can be used for quick testing via webpack-dev-server or webpack CLI tools.
 *
 * @author Alexandru Badiu <andu@ctrlz.ro> 
 */

var path = require('path');
var environmentConfig = JSON.parse(fs.readFileSync(path.resolve(__dirname, './environments.json'), 'utf8'));

module.exports = require('./webpack-make-config')({
  dir: path.resolve(__dirname, '../build'),

  defines: {
    __TESTING__: false,
    __DEV__: false,
    __STAGE__: true,
    __PRODUCTION__: false
  },

  sourcemaps: true,
  devtool: 'eval',
  debug: true,
  minimize: false,
  chunk: true
});