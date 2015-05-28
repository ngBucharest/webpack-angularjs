'use strict';

require('angular');
require('ui-router');
require('angular-mocks/angular-mocks');

angular.module('foo.header', []);

register('foo.header').directive('header', require('./header.js'));

describe('Directive: header', function () {
  beforeEach(window.module('foo.header'));

  var elementHtml = '<header>></header>';

  it('should fail to run as a function', function () {
    var cls = require('./header.js');
    expect(function(){
      cls();
    }).to.throw('Cannot call a class as a function');
  });

  it('should correctly render', inject(function ($compile, _$rootScope_) {
    var element = angular.element(elementHtml);
    var $scope = _$rootScope_.$new();

    element = $compile(element)($scope);
    $scope.$digest();

    expect(element.find('nav').length).to.equal(1);

    expect(element.find('li a').eq(0).text()).to.equal('Home');
    expect(element.find('li a').eq(1).text()).to.equal('Page 2');
  }));
});
