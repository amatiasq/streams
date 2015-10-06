
export function isFunction(object) {
  return typeof object === 'function';
}

export function isPromise(object) {
  return object && isFunction(object.then);
}

export function identity(value) {
  return value;
}
