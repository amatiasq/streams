"use strict";
var ReadableStream = require("./constructor")["default"];

/**
 * @returns {ReadableStream}
 */
exports["default"] = function fromStream(stream) {
  if (stream instanceof ReadableStream)
    return stream;

  return new ReadableStream(function(onNext, onError, onComplete) {
    return stream.subscribe(onNext, onError, onComplete);
  });
}