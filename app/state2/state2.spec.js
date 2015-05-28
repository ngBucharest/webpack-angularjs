'use strict';

require('angular');
require('ui-router');
require('angular-mocks/angular-mocks');

angular.module('foo.state2', []);
register('foo.state2').controller('State2Controller', require('./state2.js'));

describe('Controller: State 2', function () {
  var State2Controller,
    scope,
    state,
    controller;

  var createController = function createController() {
    return controller('State2Controller', {
      $rootScope: scope,
      $state: state,
    });
  };

  beforeEach(window.module('foo.state2'));
  beforeEach(window.module('ui.router'));

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, $state) {
    scope = $rootScope.$new();
    state = $state;
    controller = $controller;
  }));

  it('should instantiate', function () {
    State2Controller = createController();

    expect(!!State2Controller).to.equal(true);
  });
});
