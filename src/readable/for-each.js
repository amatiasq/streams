import { isTheneable } from '../utils';
import CancellablePromise from '../cancellable-promise';

/**
 * The forEach() method executes a provided function once per array element.
 * When this method is invoked the ReadableStream is connected to it's source.
 * It's implementation depends on argument passed to {@link ReadableStream#constructor}.
 *
 * @todo Add fiddle example
 * @method ReadableStream#forEach
 *
 * @param {Iterator} iterator Callback to invoke when the stream has a new value.
 * @param {Object} [context] Value to use as this when executing callback.
 * @returns {CancellablePromise<null>} A promise to be rejected if the stream throws an error or to be resolved when the stream is completed. Cancel the promise should remove all listeners.
 */
export default function forEach(iterator, context) {
  let index = 0;

  return new CancellablePromise((resolve, reject) => {
    var promise = this._subscribe(
      value => iterator.call(context, value, index++, this),
      () => resolve(index),
      error => reject(error)
    );

    if (isTheneable(promise))
      promise.then(() => resolve(index), reject);

    return promise;
  });
}
