"use strict";
/**
 * @param {Function} test
 * @param {Object} context
 * @returns {Promise<bool>}
 */
exports["default"] = function every(test, context) {
  var self = this;
  var count = 0;
  return new Promise(function(resolve, reject) {
    var subscription = self.subscribe(function(value) {
      if (!test.call(context, value, count++, self)) {
        subscription.cancel();
        resolve(false);
      }
    }, reject, resolve.bind(null, true));

    return subscription;
  });
}