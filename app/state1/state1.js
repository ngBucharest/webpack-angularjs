'use strict';

class State1Controller {
  /*@ngInject*/
  constructor($state) {
    this.$state = $state;

    this.somevar = 3;
  }
}

module.exports = State1Controller;
