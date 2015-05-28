'use strict';

require('angular');
require('ui-router');
require('angular-mocks/angular-mocks');

angular.module('foo.state1', []);
register('foo.state1').controller('State1Controller', require('./state1.js'));

describe('Controller: State 1', function () {
  var State1Controller,
    scope,
    state,
    controller;

  var createController = function createController() {
    return controller('State1Controller', {
      $rootScope: scope,
      $state: state,
    });
  };

  beforeEach(window.module('foo.state1'));
  beforeEach(window.module('ui.router'));

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, $state) {
    scope = $rootScope.$new();
    state = $state;
    controller = $controller;
  }));

  it('should instantiate', function () {
    State1Controller = createController();

    expect(!!State1Controller).to.equal(true);
  });

  it('should set somevar to 3', function () {
    State1Controller = createController();

    expect(State1Controller.somevar).to.equal(3);
  });
});
