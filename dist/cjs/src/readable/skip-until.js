"use strict";
var ReadableStream = require("./constructor")["default"];
var isPromise = require("../utils").isPromise;

/**
 * This function can receive a Promise, a Stream or a function.
 *
 * - If the argument is a Promise it will return a new stream that will echo the
 *  values of this stream when the promise is completed, if the promise is
 *  rejected the returned stream will send an error.
 *
 * - If the argument is a Stream it will return a new stream that will echo the
 *  values of this stream when the first value of the argument is receipt.
 *
 * - If the argument is a function it will return a new stream that will invoke
 *  echoing the function on every value and will start to echo the value if the
 *  function returns thruthy.
 *
 * @param {Promise|Stream|Function} value
 * @param {Object} context In case `value` is a function this will be it's
 *  context
 * @returns {ReadableStream}
 */
exports["default"] = function skipUntil(value, context) {
  if (typeof value === 'function')
    return skipUntil_function(this, value, context);
  if (isPromise(value))
    return skipUntil_promise(this, value);
  return skipUntil_stream(this, value);
}

function skipUntil_function(self, test, context) {
  var enabled = false;

  return new ReadableStream(function(onNext, onError, onComplete) {
    return self.subscribe(function(value) {
      if (!enabled && test.call(context, value))
        enabled = true;

      if (enabled)
        onNext(value);
    }, onError, onComplete);
  });
}

function skipUntil_promise(self, promise) {
  return new ReadableStream(function(onNext, onError, onComplete) {
    var subscription;
    promise.then(function() {
      subscription = self.subscribe(onNext, onError, onComplete);
    }, onError);

    return function() {
      subscription.cancel();
    };
  });
}

function skipUntil_stream(self, stream) {
  return new ReadableStream(function(onNext, onError, onComplete) {
    var subscription = stream.subscribe(start, onError, start);

    function start() {
      subscription.cancel();
      subscription = self.subscribe(onNext, onError, onComplete);
    }

    return function() {
      subscription.cancel();
    };
  });
}