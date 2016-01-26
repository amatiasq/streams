/** @private */
export function es6class(constructor, statics, instance) {
  Object.defineProperties(constructor, toDescriptors(statics));
  Object.defineProperties(constructor.prototype, toDescriptors(instance));
  return constructor;
}

function toDescriptors(methods, properties = {
  writable: true,
  configurable: true,
  enumerable: false,
}) {
  var descriptors = {};

  Object.keys(methods).forEach(name => {
    let method = methods[name];
    descriptors[name] = Object.assign({ value: method }, properties);
  });

  return descriptors;
}
