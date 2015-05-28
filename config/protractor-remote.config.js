var argv = require('optimist').argv;

exports.config = {
  allScriptsTimeout: 11000,
  
  sauceUser: process.env.SAUCE_USERNAME,
  sauceKey: process.env.SAUCE_ACCESS_KEY,

  multiCapabilities: [{
    'browserName': 'firefox'
  }, {
    'browserName': 'chrome'
  }],

  framework: 'mocha',

  mochaOpts: {
    reporter: argv['bamboo'] ? 'mocha-bamboo-reporter' : 'spec',
    slow: 3000,
    timeout: 1000000
  }
};