"use strict";
var ReadableStream = require("./constructor")["default"];

/**
 * Returns a stream which will stream all but the first N items of this stream.
 *
 * @param {Number} count A positive integer - The number of items to skip.
 * @returns {ReadableStream<T>}
 */
exports["default"] = function skip(count) {
  var self = this;
  var remaining = count;

  return new ReadableStream(function(onNext, onError, onComplete) {
    return self.subscribe(function(value) {
      if (remaining > 0)
        remaining--;
      else
        onNext(value);
    }, onError, onComplete);
  });
}