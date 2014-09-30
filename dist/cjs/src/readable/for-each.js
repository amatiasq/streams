"use strict";
/**
 * @param {Function} iterator
 * @param {Object} context
 * @returns {Promise<null>} A promise to be rejected if the stream throws an
 *   error or to be resolved when the stream is completed.
 */
exports["default"] = function forEach(iterator, context) {
  var self = this;
  var count = 0;
  return new Promise(function(resolve, reject) {
    self.subscribe(function(value) {
      iterator.call(context, value, count++, self);
    }, reject, resolve);
  });
}