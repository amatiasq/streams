import ReadableStream from './constructor';

/**
 * Returns a stream that will be completed with the only one value of the
 *   promise, immediately after that the stream will be completed. If the
 *   promise is rejected the stream will send and error.
 *
 * @method ReadableStream.fromPromise
 * @see {@link http://jsfiddle.net/amatiasq/u6c27h6s/|Fiddle example}
 *
 * @param promise {Promise} The promise to listen.
 * @returns {ReadableStream} A steam with only one value.
 */
export default function fromPromise(promise) {
  return new ReadableStream((push, fail, complete) => {
    promise.then(value => {
      push(value);
      complete();
    }, fail);
  });
}
