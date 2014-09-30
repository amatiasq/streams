"use strict";
var ReadableStream = require("./constructor")["default"];

/**
 * @param {Function} test
 * @param {Object} context
 * @returns {ReadableStream}
 */
exports["default"] = function filter(test, context) {
  var self = this;
  var count = 0;
  return new ReadableStream(function(onNext, onError, onComplete) {
    return self.subscribe(function(value) {
      if (test.call(context, value, count++, self))
        onNext(value);
    }, onError, onComplete);
  });
}