'use strict';

class Header {
  /*@ngInject*/
  constructor() {
    this.template = require('./header.jade');
    this.restrict = 'E';
    this.controller = HeaderController;
    this.controllerAs = 'ctrl';
    this.bindToController = true;
    this.scope = {
    };
  }
}

class HeaderController {
  /*@ngInject*/
  constructor() {
  }
}

module.exports = Header;
