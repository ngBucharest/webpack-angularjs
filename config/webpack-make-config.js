var path = require('path');
var webpack = require('webpack');
var bourbon = require('node-bourbon').includePaths;

module.exports = function(options) {
  var output = {
    path: options.dir,
    pathinfo: true,
    filename: '[name].js'
  };

  if (options.sourcemaps) {
    output.sourceMapFilename = '[name].map';
  }

  var entry = {
    main: './main.js',
    vendor: [
      'angular',
      'ocLazyLoad',
      'ui-router',
      'lodash',
      'modernizr',
      'jquery'
    ]
  };

  var modulesDirectories = [
    '../node_modules',
    '../vendor'
  ];

  var aliases = {
    'angular': path.resolve(__dirname, '../vendor/angular/'),
    'jquery': path.resolve(__dirname, '../vendor/jquery/dist/jquery.js'),
    'lodash': path.resolve(__dirname, '../vendor/lodash/lodash.js'),
    'modernizr': path.resolve(__dirname, '../vendor/modernizr/modernizr.js'),
    'ocLazyLoad': path.resolve(__dirname, '../vendor/ocLazyLoad/dist/ocLazyLoad.js'),
    'registerjs': path.resolve(__dirname, '../app/components/util/register.js'),
    'ui-router': path.resolve(__dirname, '../vendor/angular-ui-router/release/angular-ui-router.js')
  };

  var loaders = [
    {
      test: /\.js$/,
      exclude: [
        /[\\\/]node_modules/,
        /[\\\/]vendor/,
        /bootstrap-sass.config.js/
      ],
      loader: 'ng-annotate!babel'
    },
    {
      test: /\.es6$/,
      loader: 'ng-annotate!babel'
    },
    {
      test: /[\\\/]vendor[\\\/]angular[\\\/]angular\.js$/,
      loader: "imports?$=jquery"
    },
    {
      test: /[\\\/]vendor[\\\/]jquery[\\\/]dist[\\\/]jquery\.js$/,
      loader: 'expose?jQuery!expose?$'
    },
    {
      test: /[\\\/]vendor[\\\/]modernizr[\\\/]modernizr\.js$/,
      loader: "imports?this=>window!exports?window.Modernizr"
    },
    {
      test: /\.jade$/,
      loader: 'html!jade-html'
    },
    {
      test: /\.html$/,
      loader: 'html'
    },
    {
      test: /\.css$/,
      exclude: [
        /bootstrap[\\\/]js[\\\/]/
      ],
      loader: 'style!css'
    },
    {
      test: /\.scss$/,
      exclude: [
        /bootstrap[\\\/]js[\\\/]/
      ],
      loader: 'style!css!autoprefixer!sass?includePaths[]=' + bourbon
    },
    {
      test: /\.png$/,
      loader: 'url?limit=100000&mimetype=image/png&name=assets/[name].[hash].[ext]'
    },
    {
      test: /\.jpg$/,
      exclude: [
        '/app\/assets/'
      ],
      loader: 'file?name=assets/[name].[hash].[ext]'
    },
    {
      test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'url?limit=10000&minetype=application/font-woff&name=assets/[name].[hash].[ext]'
    },
    {
      test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'url?limit=10000&minetype=application/font-woff2&name=assets/[name].[hash].[ext]'
    },
    {
      test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'url?limit=10000&minetype=application/octet-stream&name=assets/[name].[hash].[ext]'
    },
    {
      test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'file?name=assets/[name].[hash].[ext]'
    },
    {
      test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'url?limit=10000&minetype=image/svg+xml&name=assets/[name].[hash].[ext]'
    }
  ];

  var plugins = [
    new webpack.ProvidePlugin({
      _: 'lodash',
      Modernizr: 'modernizr',
      $: 'jquery',
      jQuery: 'jquery',
      register: 'registerjs'
    }),
    new webpack.optimize.OccurenceOrderPlugin(true)
  ];

  if(options.chunk) {
    plugins.push(new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js'));
    plugins.push(new webpack.optimize.AggressiveMergingPlugin({}));
  }

  if (options.minimize) {
    plugins.push(new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      warnings: false,
      mangle: {
        except: ['$q', '$ocLazyLoad']
      },
      sourceMap: false
    }));
  }

  if (options.defines) {
    plugins.push(new webpack.DefinePlugin(options.defines));
  }

  var postLoaders = [];
  if (options.testing) {
    postLoaders.push({
      test: /\.js/,
      exclude: /(test|node_modules|vendor|config|\.spec|index\.js|register\.js)/,
      loader: 'istanbul-instrumenter'
    });
    postLoaders.push({
      test: /\.es6/,
      exclude: /(test|node_modules|vendor|config|\.spec|index\.js|register\.js)/,
      loader: 'istanbul-instrumenter'
    });
  }

  return {
    entry: entry,
    context: __dirname + '/../app',
    output: output,

    devtool: options.devtool,
    debug: options.debug,

    module: {
      loaders: loaders,
      postLoaders: postLoaders,
      noParse: /\.min\.js/
    },

    resolve: {
      extensions: ['', '.js', '.json'],
      modulesDirectories: modulesDirectories,
      alias: aliases
    },

    plugins: plugins
  };
};
