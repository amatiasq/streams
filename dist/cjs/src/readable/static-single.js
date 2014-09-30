"use strict";
var ReadableStream = require("./constructor")["default"];

/**
 * @returns {ReadableStream}
 */
exports["default"] = function single(value) {
  return new ReadableStream(function(onNext, onError, onComplete) {
    var timeout = setTimeout(function() {
      onNext(value);
      onComplete(value);
    });
    return clearTimeout.bind(null, timeout);
  });
}