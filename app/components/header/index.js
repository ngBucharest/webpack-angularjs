'use strict';

require('./header.scss');

var mod = angular.module('foo.header', [
]);

register(mod.name).directive('header', require('./header.js'));

module.exports = mod;
