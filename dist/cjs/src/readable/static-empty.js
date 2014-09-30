"use strict";
var ReadableStream = require("./constructor")["default"];

/**
 * @returns {ReadableStream}
 */
exports["default"] = function empty() {
  return new ReadableStream(function(onNext, onError, onComplete) {
    var timeout = setTimeout(onComplete);
    return clearTimeout.bind(null, timeout);
  });
}