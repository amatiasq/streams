import ReadableStream from './constructor';

/**
 * Returns a stream which will stream all but the first N items of this stream.
 *
 * @param {Number} count A positive integer - The number of items to skip.
 * @returns {ReadableStream<T>}
 */
export default function skip(count) {
  return new ReadableStream((push, fail, complete) => {
    var remaining = count;
    return this.subscribe(onNext, fail, complete);

    function onNext(value) {
      if (remaining > 0)
        remaining--;
      else
        push(value);
    }
  });
}
