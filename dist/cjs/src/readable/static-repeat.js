"use strict";
var ReadableStream = require("./constructor")["default"];

/**
 * @returns {ReadableStream}
 */
exports["default"] = function repeat(value, count) { // schedule
  var timeout;

  return new ReadableStream(function(onNext, onError, onComplete) {
    function scheduleNext() {
      timeout = setTimeout(function() {
        onNext(value);
        count--;
        if (count)
          scheduleNext();
        else
          onComplete();
      });
    }
    scheduleNext();
    return function() {
      clearTimeout(timeout);
    };
  });
}