"use strict";

function extend(target) {
  [].slice.call(arguments, 1).forEach(function(source) {
    Object.keys(source).forEach(function(key) {
      target[key] = source[key];
    });
  });
}

exports.extend = extend;function isFunction(object) {
  return typeof object === 'function';
}

exports.isFunction = isFunction;function isPromise(object) {
  return object && isFunction(object.then);
}

exports.isPromise = isPromise;function identity(value) {
  return value;
}

exports.identity = identity;