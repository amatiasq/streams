import CancellablePromise from '../cancellable-promise';

/**
 * The every() method tests whether all elements in the stream pass the test implemented by the provided function.
 *
 * @method ReadableStream#every
 * @param {TestIterator} test - Function to test for each element.
 * @param {Object} [context] - Value to use as this when executing callback.
 * @returns {Promise<bool>} Returns a promise which will be resolved to true if every element passes the test, will be fulfilled with false otherwise.
 */
export default function every(test, context) {
  return new CancellablePromise((resolve, reject) => {
    let subscription = this.forEach((value, index, stream) => {
      if (test.call(context, value, index, stream))
        return;

      subscription.cancel();
      resolve(false);
    });

    subscription.then(() => resolve(true), reject);
    return () => subscription.cancel();
  });
}
