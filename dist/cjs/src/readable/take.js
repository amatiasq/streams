"use strict";
var ReadableStream = require("./constructor")["default"];

/**
 * Returns a stream which will stream the first N items of this stream.
 *  It will complete after this items are sent.
 *
 * @param {Number} count A positive integer - The number of items to collect.
 * @returns {ReadableStream<T>}
 */
exports["default"] = function take(count) {
  var self = this;
  var remaining = count;

  //if (remaining <= 0)
  //  return ReadableStream.empty();

  return new ReadableStream(function(onNext, onError, onComplete) {
    var subscription = self.subscribe(function(value) {
      onNext(value);
      remaining--;
      if (remaining === 0) {
        subscription.cancel();
        onComplete();
      }
    }, onError, onComplete);

    return subscription;
  });
}