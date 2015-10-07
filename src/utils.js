
export function isFunction(object) {
  return typeof object === 'function';
}

export function isPromise(object) {
  return object && isFunction(object.then);
}

export function isStream(object) {
  return object && isFunction(object.subscribe);
}
