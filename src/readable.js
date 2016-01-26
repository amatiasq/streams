/**
 * A consumable stream which is controlled by the creator.
 */
export default class ReadableStream {
  /**
   * Creates a readable stream, you can listen to the stream values using {@link ReadableStream#forEach}
   * It receives a function that will be invoked when someone subscribes to this stream, this function should handle the callbacks for the subscription:
   *
   * - `onNext(value)`
   * - `onError(error)`
   * - `onComplete()`
   *
   * That function may return a `Function` or a {@link CancellablePromise} instance, in that case if the subscription for this stream is cancelled the returned function will be invoked or the returned promise will be cancelled.
   *
   * @param {onSubscribe} onSubscribe - Function to be invoked when someone subscribes to this stream.
   * @returns {ReadableStream} A new instance
   */
  constructor(onSubscribe) {
    this._subscribe = onSubscribe;
  }

  /**
   * A promise representing the length property represents an unsigned, 32-bit integer that is always numerically greater than the highest index in the array.
   * @type {Promise<Number>}
   */
  get length() {
    if (!this._length)
      this._length = this.forEach(() => {});
    return this._length;
  }

  // DEBUG ONLY
  /** @private */
  log(prefix = '[STREAM-LOGGER]') {
    /* globals console */
    return this
      .forEach(value => console.log(prefix, '[VALUE]', value))
      .catch(error => console.log(prefix, '[ERROR]', error))
      .then(() => console.log(prefix, '[COMPLETED]'));
  }
}


import { es6class } from './utils';
import concat from './readable/concat';
import entries from './readable/entries';
import every from './readable/every';
import filter from './readable/filter';
import forEach from './readable/for-each';
import keys from './readable/keys';
import map from './readable/map';
import reduce from './readable/reduce';
import slice from './readable/slice';
import some from './readable/some';
import values from './readable/values';

es6class(ReadableStream, {

}, {
  concat,
  entries,
  every,
  filter,
  forEach,
  keys,
  map,
  reduce,
  slice,
  some,
  values,
});
