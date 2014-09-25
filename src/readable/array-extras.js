import ReadableStream from './constructor';

/**
 * @param {Function} iterator
 * @param {Object} context
 * @returns {Promise<null>} A promise to be rejected if the stream throws an
 *   error or to be resolved when the stream is completed.
 */
export function forEach(iterator, context) {
  var self = this;
  var count = 0;
  return new Promise(function(resolve, reject) {
    self.subscribe(function(value) {
      iterator.call(context, value, count++, self);
    }, reject, resolve);
  });
}

/**
 * @param {Function} iterator
 * @param {Object} context
 * @returns {ReadableStream}
 */
export function map(iterator, context) {
  var self = this;
  var count = 0;
  return new ReadableStream(function(onNext, onError, onComplete) {
    return self.subscribe(function(value) {
      onNext(iterator.call(context, value, count++, self));
    }, onError, onComplete);
  });
}

/**
 * @param {Function} test
 * @param {Object} context
 * @returns {ReadableStream}
 */
export function filter(test, context) {
  var self = this;
  var count = 0;
  return new ReadableStream(function(onNext, onError, onComplete) {
    return self.subscribe(function(value) {
      if (test.call(context, value, count++, self))
        onNext(value);
    }, onError, onComplete);
  });
}

/**
 * @param {Function} test
 * @param {Object} context
 * @returns {Promise<bool>}
 */
export function some(test, context) {
  var self = this;
  var count = 0;
  return new Promise(function(resolve, reject) {
    var subscription = self.subscribe(function(value) {
      if (test.call(context, value, count++, self)) {
        subscription.cancel();
        resolve(true);
      }
    }, reject, resolve.bind(null, false));

    return subscription;
  });
}

/**
 * @param {Function} test
 * @param {Object} context
 * @returns {Promise<bool>}
 */
export function every(test, context) {
  var self = this;
  var count = 0;
  return new Promise(function(resolve, reject) {
    var subscription = self.subscribe(function(value) {
      if (!test.call(context, value, count++, self)) {
        subscription.cancel();
        resolve(false);
      }
    }, reject, resolve.bind(null, true));

    return subscription;
  });
}

/**
 * @param {Function} iterator
 * @param {Any} initialValue
 * @returns {Promise<T>}
 */
export function reduce(iterator, initialValue) {
  var self = this;
  var count = 0;
  var accumulated = initialValue || null;
  return new Promise(function(resolve, reject) {
    self.subscribe(function(value) {
      accumulated = count === 0 && !accumulated ?
        value :
        iterator(accumulated, value, count++, self);
    }, reject, function() {
      resolve(accumulated);
    });
  });
}

/**
 * @param {ReadableStream} stream
 * @returns {ReadableStream}
 */
export function concat(stream) {
  var self = this;
  var subscr1, subscr2;

  return new ReadableStream(function(onNext, onError, onComplete) {
    subscr1 = self.subscribe(onNext, onError, function() {
      subscr2 = stream.subscribe(onNext, onError, onComplete);
    });

    return function() {
      subscr1.cancel();
      if (subscr2)
        subscr2.cancel();
    };
  });
}
