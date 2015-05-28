var gulp = require('gulp');
var path = require('path');

var gutil = require('gutil');
var opn = require('opn');

var jade = require('gulp-jade');

var eslint = require('gulp-eslint');

var webpack = require('webpack');
var webpackDevServer = require("webpack-dev-server");

var browserSync = require('browser-sync');
var reload      = browserSync.reload;

var fs = require('fs');
var runSequence = require('run-sequence');
var clean = require('gulp-clean');
var argv = require('optimist').argv;

var protractor = require('gulp-protractor').protractor;
var webdriver_standalone = require('gulp-protractor').webdriver_standalone;
var webdriver_update = require('gulp-protractor').webdriver_update;
var sauceConnectLauncher = require('sauce-connect-launcher');
var karma = require('karma').server;

var superstatic = require('superstatic').server;

var buildConfig = {};

/** Type of build: production or development. */
buildConfig.type = argv['build-type'] || 'development';
/** The environent that the build uses. */
buildConfig.environment = argv['build-environment'] || 'development';
buildConfig.testing = false;

var testConfig = {};
/** Type of test: unit or e2e. */
testConfig.type = argv['type'] || 'unit';
/** Where to test: local or remote. */
testConfig.where = argv['where'] || 'local';
/** Exit after tests? Works only on unit. */
testConfig.watch = argv['watch'] ? true : false;
/** If we're running tests for bamboo. */
testConfig.bamboo = argv['bamboo'] ? true : false;

/** Read the environment variables. */
var environmentConfig = JSON.parse(fs.readFileSync('./config/environments.json', 'utf8'));
buildConfig.gtmID = environmentConfig[buildConfig.environment].gtmID;

/** Override the host. */
var host = argv['host'] ? argv['host'] : '127.0.0.1';

/** HTTP server for testing. */
var app = superstatic({
  config: './config/superstatic.json',
  port: 3000,
  host: host
});

/**
 * Vars
 * Sets watch / development specific variables.
 * Used for the dev task.
 */
gulp.task('vars:dev', function() {
  /** The build directory. */
  buildConfig.dir = '.build';
});

/**
 * Vars
 * Sets build specific variables.
 * Used for the build task.
 */
gulp.task('vars:build', function() {
  /** The build directory. */
  buildConfig.dir = 'build';
});

/**
 * Clean
 * Cleans the build directory before a build.
 * Used for the build task.
 */
gulp.task('clean', function() {
  return gulp.src(buildConfig.dir).pipe(clean());
});

/**
 * Index
 * Converts the main index template to a html file and copies it to the build directory.
 * Used for the build and dev tasks.
 */
gulp.task('index', function () {
  var stream = gulp.src('app/index.jade')
    .pipe(jade({
      pretty: true,
      locals: {
        buildType: buildConfig.type,
        buildEnvironment: buildConfig.environment,
        gtmID: buildConfig.gtmID
      }
    }))
    .pipe(gulp.dest(buildConfig.dir));

  return stream;
});

/**
 * ESLint
 * Checks the sourcecode for errors with ESLint. Used for the build and dev tasks.
 */
gulp.task('lint', function () {
  return gulp.src(['app/**/*.js'])
    .pipe(eslint({ useEslintrc: true }))
    .pipe(eslint.format());
});

/**
 * Testing
 * Unit tests.
 */
gulp.task('test', function (done) {
  if (testConfig.type === 'unit') {
    gulp.start('test-unit');
  }
  else {
    if (testConfig.where === 'local') {
      gulp.start('test-local-browser');
    }
    else {
      gulp.start('test-remote-browser');
    }
  }
});

/**
 * Testing
 * Unit tests.
 */
gulp.task('test-unit', function (done) {
  var config = {
    configFile: __dirname + '/config/karma.config.js',
    singleRun: !testConfig.watch
  };

  if (testConfig.bamboo) {
    config.reporters = ['mocha', 'bamboo'];
  }

  karma.start(config, done);
});

/**
 * Testing
 * Selenium update tasks.
 */
gulp.task('webdriver_update', webdriver_update);
gulp.task('webdriver_standalone', webdriver_standalone);

/**
 * Testing
 * Runs a webserver.
 */
gulp.task('e2e-serve', [], function (done) {
  server = app.listen(function () {
    done();
  });
});


/**
 * Testing
 * Runs the state tests locally.
 */
gulp.task('test-local-browser', ['e2e-serve', 'webdriver_update'], function (done) {
  var args = [
    '--baseUrl',
    'http://127.0.0.1:3000',
  ];

  if (testConfig.bamboo) {
    args.push('--bamboo');
  }

  gulp.src("./test/e2e/*.spec.js")
    .pipe(protractor({
      configFile: "config/protractor-local.config.js",
      args: args
    }))
    .on('error', function (e) {
      gutil.log(e);

      server.close();
      done();
    })
    .on('end', function () {
      server.close();
      done();
    });
});

/**
 * Testing
 * Runs the state tests in the cloud via SauceLabs.
 */
gulp.task('test-remote-browser', ['e2e-serve'], function (done) {
  var args = [
    '--baseUrl',
    'http://127.0.0.1:3000',
  ];

  if (testConfig.bamboo) {
    args.push('--bamboo');
  }

  sauceConnectLauncher({
    logger: gutil.log
  }, function (err, sauceConnectProcess) {
    if (err) {
      gutil.log(err.message);
      return done();
    }

    gutil.log("Sauce Connect ready");

    gulp.src("./test/e2e/*.spec.js")
      .pipe(protractor({
        configFile: "config/protractor-remote.config.js",
        args: args
      }))
      .on('error', function(e) {
        gutil.log(e);
        sauceConnectProcess.close(function () {
          gutil.log("Closed Sauce Connect process");

          server.close();
          done();
        });
      })
      .on('end', function (e) {
        sauceConnectProcess.close(function () {
          gutil.log("Closed Sauce Connect process");

          server.close();
          done();
        });
      });
  });
});

/**
 * Build
 * Performs all the build tasks except webpack.
 */
gulp.task('pre-build', function(done) {
  runSequence(
    'vars:build',
    'clean',
    ['lint', 'index'],
    done
  );
});

/**
 * Webpack
 * Processes the Webpack configuration file.
 */
function webpackConfig() {
  var options = {};

  options.dir = path.resolve(__dirname, buildConfig.dir);

  options.defines = {
    __TESTING__: buildConfig.testing,
    __DEV__: buildConfig.environment === 'development' ? true : false,
    __STAGE__: buildConfig.environment === 'stage' ? true : false,
    __PRODUCTION__: buildConfig.environment === 'production' ? true : false
  };

  if (buildConfig.type === 'development') {
    options.sourcemaps = true;
    options.devtool = 'eval';
    options.debug = true;
    options.minimize = false;
    options.chunk = !buildConfig.testing;
  }
  else if (buildConfig.type === 'stage') {
    options.sourcemaps = true;
    options.devtool = 'eval';
    options.debug = true;
    options.minimize = false;
    options.chunk = !buildConfig.testing;
  }
  else {
    options.sourcemaps = false;
    options.devtool = '';
    options.debug = false;
    options.minimize = true;
    options.chunk = !buildConfig.testing;
  }

  return require('./config/webpack-make-config')(options);
}

/**
 * Webpack
 * Builds an app bundle once. Used for the build task.
 */
gulp.task('webpack-build', ['pre-build'], function(callback) {
  var compiler = webpack(webpackConfig());

  compiler.run(function(err, stats) {
    if (err) {
      throw new gutil.PluginError('webpack-build', err);
    }

    gutil.log("[webpack:build]", stats.toString({
      colors: true
    }));

    callback();
  });
});

/**
 * Webpack
 * Starts a webpack dev server that rebuilds the app bundle on file changes.
 * Used for the dev task.
 */
gulp.task('webpack-dev-server', ['vars:dev', 'index'], function(done) {
  var compiler = webpack(webpackConfig());

  compiler.plugin("done", function(stats) {
    /** Reload all connected browsers. */
    reload();
  });

  new webpackDevServer(compiler, {
    contentBase: buildConfig.dir,
    quiet: false,
    noInfo: false,
    watchDelay: 300,
    historyApiFallback: true,
    stats: {
      colors: true
    }
  }).listen(8080, host, function(err) {
    if(err) {
      throw new gutil.PluginError('webpack-dev-server', err);
    }

    done();
  });
});

/**
 * BrowserSync
 * Reloads the browsers after the other tasks have finished.
 */
gulp.task('index-watch', ['index'], browserSync.reload);

/**
 * Build
 * Builds the project.
 */
gulp.task('build', ['webpack-build'], function () {
  gutil.log((buildConfig.type == 'development' ? 'Development' : 'Production') + ' build done for environment ' + buildConfig.environment + ' in ./' + buildConfig.dir + '.');
});

/**
 * Development
 * Starts a development environment that reloads on code changes.
 */
gulp.task('dev', ['webpack-dev-server'], function () {
  gulp.watch(['app/index.jade'], ['index-watch']);

  browserSync({
    proxy: '127.0.0.1:8080',
    open: false
  }, function () {
    opn('http://127.0.0.1:3000');
  });
});

/** Default task: development. */
gulp.task('default', ['dev']);
