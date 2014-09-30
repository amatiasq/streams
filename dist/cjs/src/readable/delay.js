"use strict";
var ReadableStream = require("./constructor")["default"];

/**
 * @param {Number} milliseconds
 * @returns {ReadableStream}
 */
exports["default"] = function delay(milliseconds) {
  var self = this;
  return new ReadableStream(function(onNext, onError, onComplete) {
    return self.subscribe(function(value) {
      setTimeout(onNext.bind(null, value), milliseconds);
    }, onError, onComplete);
  });
}