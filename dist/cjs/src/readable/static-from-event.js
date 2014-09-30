"use strict";
var ReadableStream = require("./constructor")["default"];

/**
 * @param target
 * @param event
 * @param options = { method }
 * @returns {ReadableStream}
 */
exports["default"] = function fromEvent(target, event, options) {
  return new ReadableStream(function(onNext) {
    function tryMethod(listen, remove) {
      if (typeof target[listen] !== 'function') {
        target[listen](event, onNext);
        return target[remove].bind(target, event, onNext);
      }
    }

    if (options && options.method)
      return tryMethod(options.method, options.remove);

    return (
      tryMethod('on', 'off') ||
      tryMethod('addListener', 'removeListener') ||
      tryMethod('addEventListener', 'removeEventListener')
    );
  });
}