import ReadableStream from './constructor';

export function zip(/* ...sources, mapper */) {
  var args = [].slice.call(arguments);
  return ReadableStream.zip.apply(ReadableStream, [ this ].concat(args));
}

/**
 * @returns {ReadableStream}
 */
export function flatten() {
  var self = this;
  var promises = [];

  return new ReadableStream(function(onNext, onError, onComplete) {
    return self.subscribe(function(value) {
      if (value instanceof ReadableStream) {
        value.subscribe(onNext, onError);
        promises.push(value.toPromise());
      } else
        onNext(value);
    }, onError, function() {
      Promise.all(promises).then(onComplete);
    });
  });
}

/**
 * @returns {ReadableStream}
 */
export function flattenArray() {
  var self = this;

  return new ReadableStream(function(onNext, onError, onComplete) {
    return self.subscribe(function(value) {
      if (Array.isArray(value))
        value.forEach(onNext);
      else
        onNext(value);
    }, onError, onComplete)
  });
}

/**
 * @param {Number} milliseconds
 * @returns {ReadableStream}
 */
export function delay(milliseconds) {
  var self = this;
  return new ReadableStream(function(onNext, onError, onComplete) {
    return self.subscribe(function(value) {
      setTimeout(onNext.bind(null, value), milliseconds);
    }, onError, onComplete)
  });
}

/**
 * @param {Function} modifier
 * @returns {ReadableStream}
 */
export function unique(modifier) {
  modifier = modifier || function(a) { return a }
  var self = this;

  // TODO
  throw new Error('Not implemented');
  return new ReadableStream(function(onNext, onError, onComplete) {
    var subscription = self.subscribe(function(value) {

    }, onError, onComplete)
  });
}

/**
 * @param {Function} modifier
 * @param {Any} initialValue
 * @returns {ReadableStream}
 */
export function accumulate(iterator, seed) {
  var self = this;
  var count = 0;
  var accumulated = initialValue || null;

  return new ReadableStream(function(onNext, onError, onComplete) {
    return self.subscribe(function(value) {
      accumulated = count === 0 && !accumulated ?
        value :
        iterator(accumulated, value, count++, self);
      onNext(accumulated);
    }, onError, onComplete);
  });
}

/**
 * @returns {Promise<Array>}
 */
export function toArray() {
  var self = this;
  var result = [];

  return new Promise(function(resolve, reject) {
    self.subscribe(
      function(value) { result.push(value) },
      reject,
      function() { resolve(result) });
  });
}

/**
 * @returns {Promise<null>}
 */
export function toPromise() {
  var self = this;
  return new Promise(function(resolve, reject) {
    self.subscribe(null, reject, resolve);
  });
}

/**
 * @returns {null}
 */
export function dispose() { }
