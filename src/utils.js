
export function extend(target) {
  [].slice.call(arguments, 1).forEach(function(source) {
    Object.keys(source).forEach(function(key) {
      target[key] = source[key];
    });
  });
}

export function isFunction(object) {
  return typeof object === 'function';
}

export function isPromise(object) {
  return object && isFunction(object.then);
}

export function identity(value) {
  return value;
}
