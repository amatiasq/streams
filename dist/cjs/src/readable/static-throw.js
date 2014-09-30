"use strict";
var ReadableStream = require("./constructor")["default"];

/**
 * @returns {ReadableStream}
 */
exports["default"] = function _throw(error) {
  return new ReadableStream(function(onNext, onError) {
    var timeout = setTimeout(function() {
      onError(error);
    });
    return clearTimeout.bind(null, timeout);
  });
}