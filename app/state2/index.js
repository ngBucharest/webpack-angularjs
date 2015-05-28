'use strict';

require('./state2.scss');

var mod = angular.module('foo.state2', [
]);

register(mod.name).controller('State2Controller', require('./state2.js'));

module.exports = mod;
