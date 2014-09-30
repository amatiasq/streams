"use strict";
var ReadableStream = require("./constructor")["default"];
var fromArray = require("./static-from-array")["default"];
var fromPromise = require("./static-from-promise")["default"];
var fromStream = require("./static-from-stream")["default"];
var isPromise = require("../utils").isPromise;

/**
 * @returns {ReadableStream}
 */
exports["default"] = function from(source) {
  if (!source)
    return null;

  if (Array.isArray(source))
    return fromArray(source);

  if (isPromise(source))
    return fromPromise(source);

  if (source instanceof ReadableStream)
    return source;

  if (typeof source.subscribe === 'function')
    return fromStream(source);

  // TODO: handle error
}