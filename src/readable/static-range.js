import ReadableStream from './constructor';

/**
 * @returns {ReadableStream}
 */
export default function range(start, end) {
  if (arguments.length === 1) {
    end = start;
    start = 0;
  }

  var timeout;
  var step = start < end ? 1 : -1;

  return new ReadableStream(function(onNext, onError, onComplete) {
    function scheduleNext(next) {
      timeout = setTimeout(function() {
        onNext(next);
        if (next !== end)
          scheduleNext(next + step);
        else
          onComplete();
      });
    }

    scheduleNext(start);
    return function() {
      clearTimeout(timeout);
    };
  });
}
