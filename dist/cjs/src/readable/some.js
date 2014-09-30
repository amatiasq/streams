"use strict";
/**
 * @param {Function} test
 * @param {Object} context
 * @returns {Promise<bool>}
 */
exports["default"] = function some(test, context) {
  var self = this;
  var count = 0;
  return new Promise(function(resolve, reject) {
    var subscription = self.subscribe(function(value) {
      if (test.call(context, value, count++, self)) {
        subscription.cancel();
        resolve(true);
      }
    }, reject, resolve.bind(null, false));

    return subscription;
  });
}