"use strict";
var ReadableStream = require("./constructor")["default"];

/**
 * @returns {ReadableStream}
 */
exports["default"] = function flattenArray() {
  var self = this;

  return new ReadableStream(function(onNext, onError, onComplete) {
    return self.subscribe(function(value) {
      if (Array.isArray(value))
        value.forEach(onNext);
      else
        onNext(value);
    }, onError, onComplete);
  });
}