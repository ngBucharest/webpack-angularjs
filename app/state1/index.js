'use strict';

require('./state1.scss');

var mod = angular.module('foo.state1', [
]);

register(mod.name).controller('State1Controller', require('./state1.js'));

module.exports = mod;
