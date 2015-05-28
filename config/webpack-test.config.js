/**
 * @file Webpack config for the unit test environment.
 *
 * @author Alexandru Badiu <andu@ctrlz.ro> 
 */

var path = require('path');

module.exports = require('./webpack-make-config')({
  dir: path.resolve(__dirname, '../.build'),

  sourcemaps: true,
  devtool: 'eval',
  debug: true,
  minimize: false,
  chunk: false,
  testing: true
});