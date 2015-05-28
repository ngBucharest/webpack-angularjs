'use strict';

module.exports = {
  triggerKeyDown: function triggerKeyDown(element, keyCode) {
    var e = $.Event('keydown'); // eslint-disable-line new-cap

    e.which = keyCode;
    e.keyCode = keyCode;
    element.trigger(e);
  },

  triggerKeyPress: function triggerKeyPress(element, keyCode) {
    var e = $.Event('keypress'); // eslint-disable-line new-cap
    e.which = keyCode;
    e.keyCode = keyCode;
    element.trigger(e);
  },

  triggerKeyUp: function triggerKeyUp(element, keyCode) {
    var e = $.Event('keyup'); // eslint-disable-line new-cap
    e.which = keyCode;
    e.keyCode = keyCode;
    element.trigger(e);
  }
};
