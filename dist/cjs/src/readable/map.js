"use strict";
var ReadableStream = require("./constructor")["default"];

/**
 * @param {Function} iterator
 * @param {Object} context
 * @returns {ReadableStream}
 */
exports["default"] = function map(iterator, context) {
  var self = this;
  var count = 0;
  return new ReadableStream(function(onNext, onError, onComplete) {
    return self.subscribe(function(value) {
      onNext(iterator.call(context, value, count++, self));
    }, onError, onComplete);
  });
}