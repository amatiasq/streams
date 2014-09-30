"use strict";
// jshint ignore:start
var ReadableStream = require("./constructor")["default"];

/**
 * @param {Function} modifier
 * @returns {ReadableStream}
 */
exports["default"] = function unique(modifier) {
  modifier = modifier || function(a) { return a };
  var self = this;

  // TODO
  throw new Error('Not implemented');
  return new ReadableStream(function(onNext, onError, onComplete) {
    var subscription = self.subscribe(function(value) {

    }, onError, onComplete)
  });
}