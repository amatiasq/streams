"use strict";
function delay(ms, fn) {
  return setTimeout(fn, ms);
}
delay.cancel = function(id) {
  clearTimeout(id);
};
exports.delay = delay;

var immediate = delay.bind(null, 0);
immediate.cancel = delay.cancel;
exports.immediate = immediate;