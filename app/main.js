'use strict';

require('angular');
require('ui-router');
require('ocLazyLoad');

require('bootstrap-sass-loader!../config/bootstrap-sass.config.js');

angular.module('webpack.angular', [
  'ui.router',
  'oc.lazyLoad',
  require('./components/core').name,
  require('./components/header').name,
  require('./state1').name,
  require('./state2').name
  ]);

angular.module('webpack.angular')

  .config(/*@ngInject*/function ($stateProvider, $locationProvider, $urlRouterProvider) {
      $stateProvider
        .state('state1', {
          url: '/state1',
          template: require('./state1/state1.jade'),
          controller: 'State1Controller',
          controllerAs: 'ctrl'
        })
        .state('state2', {
          url: '/state2',
          template: require('./state2/state2.jade'),
          controller: 'State2Controller',
          controllerAs: 'ctrl'
        });

      $locationProvider.html5Mode(true);

      $urlRouterProvider.otherwise('/state1');
    });
