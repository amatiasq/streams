import ReadableStream from './constructor';
import empty from './static-empty';

/**
 * Returns a stream which will stream the first N items of this stream.
 *  It will complete after this items are sent.
 *
 * @param {Number} count A positive integer - The number of items to collect.
 * @returns {ReadableStream<T>}
 */
export default function take(count) {
  if (count <= 0)
    return empty();

  return new ReadableStream((push, fail, complete) => {
    var remaining = count;
    var subscription = this.subscribe(onNext, fail, complete);
    return subscription;

    function onNext(value) {
      push(value);
      remaining--;

      if (remaining <= 0) {
        subscription.cancel();
        complete();
      }
    }
  });
}
