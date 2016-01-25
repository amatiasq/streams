define(require => {
  return {
    es6class,
  };

  function es6class(constructor, static, instance) {
    Object.defineProperties(constructor, toDescriptors(static));
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
      descriptors[name] = Object.assign({ value: methods[name], }, properties);
    });

    return descriptors;
  }
});
