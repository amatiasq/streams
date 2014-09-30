"use strict";
var ReadableStream = require("./constructor")["default"];

/**
 * @returns {ReadableStream}
 */
exports["default"] = function noop() {
  return new ReadableStream(function() { });
}