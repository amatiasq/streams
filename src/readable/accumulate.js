import ReadableStream from './constructor';

/**
 * This behaves similar to {@link ReadableStream#reduce} but instead of a
 *   promise this one returns a stream. With every new value a partial total
 *   will be sent over the new stream. Watch the example for more information.
 *
 * @method ReadableStream#accumulate
 * @see {@link http://jsfiddle.net/amatiasq/uxzc91vm/|Fiddle example}
 *
 * @param accumulator {Function}
 * @param initialValue {*}
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
        iterator(accumulated, value, count, self);

      onNext(accumulated);
      count++;
    }, onError, onComplete);
  });
}
