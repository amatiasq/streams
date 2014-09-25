import ReadableStream from './constructor';

/**
 * @param {Function} modifier
 * @param {Any} initialValue
 * @returns {ReadableStream}
 */
export default function accumulate(iterator, initialValue) {
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
