var argv = require('optimist').argv;

exports.config = {
  allScriptsTimeout: 50000,

  capabilities: {
    'browserName': 'chrome'
  },

  onPrepare: function () {
    browser.driver.manage().window().maximize();
  },

  rootElement: 'html',

  framework: 'mocha',

  mochaOpts: {
    reporter: argv['bamboo'] ? 'mocha-bamboo-reporter' : 'spec',
    slow: 3000,
    timeout: 1000000
  }
};
