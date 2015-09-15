# webpack-angularjs

A boilerplate to kickstart development using Webpack, Gulp, AngularJS and ES6. Needs better documentation.

Features
---
* Gulp and Webpack as a build system.
* Superstatic, webpack-dev-server and BrowserSync for development.
* ES6 via babel and [register.js](http://www.michaelbromley.co.uk/blog/350/using-es6-classes-in-angularjs-1-x), with ESLint.
* SASS with Bootstrap and Bourbon.
* Support for jQuery, Modernizr.
* Support for [lazy loading via ocLazyLoad and webpack's code splitting mechanism](https://github.com/voidberg/webpack-angularjs-lazyload).
* Modular code structure inspired by Google's recommendations.
* Unit tests with support for Bamboo and code coverage via Istanbul.
* E2E tests, local and remote (SauceLabs), with support for Bamboo.

See this presentation for the background: [Towards AngularJS 2, with Webpack and ES6](http://alexandrubadiu.ro/talks/angular_webpack/#/).

Global dependencies installation
---

* Install node
* npm install -g gulp webpack

Installation of local dependencies
---

* Install node dependencies: ```npm install```
* Install bower dependencies: ```bower install```

#### You might get an error when installing webdriver

There is a known bug with higher versions of node, where the chromedriver fails to uncompress.

In these cases, you can :
1) Download the chrome driver from http://chromedriver.storage.googleapis.com/index.html
2) Manually decompress it
3) copy the driver to `node_modules/protractor/selenium/chromedriver`

Details of the bug here : https://github.com/angular/protractor/issues/1005

Workflow
---

* Run development server: ```gulp```
* Build project: ```gulp build```
  * Example: production-type build with development environment variables: ```gulp build --build-type=production --build-environment=development```

Environments and build types
---
* **Build type:** Using ```--build-type``` you can specify whether to use ```development``` (default) or ```production``` build type.
* **Build environment variables:** Using ```--build-environment``` you can specify whether to use ```development``` (default), ```stage``` or ```production``` environment variables.

Unit tests
---
* Tests are written using Mocha, Chai and Sinon (in ```tests/unit```).
* They are ran by Karma.
* Run ```gulp test --type=unit``` for one round of tests or ```gulp test --type=unit --watch``` for continuous testing.
* Add the ```--bamboo``` option if the tests are ran for Bamboo (will create mocha.json).
* They will generate coverage reports in the ```coverage``` directory.

Browser tests
---
* Tests are written as features using Mocha, Chai and Sinon (in ```tests/{folder}```).
* They are run by Protractor.
* Run ```gulp test --type={folder}``` for local testing or ```gulp test --type={folder} --where=remote``` for remote testing using SauceLabs.
* Add the ```--bamboo``` option if the tests are ran for Bamboo (will create mocha.json).

Testing using SauceLabs needs credentials to be set via the shell.

Bash
```
export SAUCE_USERNAME=username
export SAUCE_ACCESS_KEY=foo-bar-baz
```

Fish
```
set -x SAUCE_USERNAME username
set -x SAUCE_ACCESS_KEY foo-bar-baz
```
