import ReadableStream from './constructor';

/**
 * @param ms
 * @param fn = null
 * @returns {ReadableStream}
 */
export default function interval(ms, fn) {
  var count = 0;
  var timeout;
  fn = fn || function(a) { return a };

  return new ReadableStream(function(onNext) {
    function scheduleNext() {
      timeout = setTimeout(function() {
        onNext(fn(count++));
        scheduleNext();
      }, ms);
    }

    scheduleNext();
    return function() {
      clearTimeout(timeout);
    };
  });
}
