import ReadableStream from './constructor';
import interval from './static-interval';

/**
 * It returns a {@link ReadableStream} that will start streaming the array items
 *   when someone subscribes to it. Stream flow can be defined using a
 *   {@link Scheduler} function.
 *
 * @returns {ReadableStream}
 */
export default function fromArray(array, scheduler) {
  var flow = interval(scheduler);

  return new ReadableStream(function(onNext, onError, onComplete) {
    var subscription = flow.subscribe(function(index) {
      if (index < array.length)
        onNext(array[index]);

      if (index === array.length)
        end();
    }, onError, onComplete);

    function end() {
      subscription.cancel();
      onComplete();
    }

    return end;
  });
}
