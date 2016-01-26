import CancellablePromise from '../cancellable-promise';

/**
 * The some() method tests whether some element in the stream passes the test implemented by the provided function.
 *
 * @method ReadableStream#some
 * @param {TestIterator} test - Function to test for each element.
 * @param {Object} [context] - Value to use as this when executing callback.
 * @returns {Promise<bool>} Returns a promise which will be resolved to true if some element passes the test, will be fulfilled with false otherwise.
 */
export default function some(test, context) {
  return new CancellablePromise((resolve, reject) => {
    let subscription = this.forEach((value, index, stream) => {
      if (!test.call(context, value, index, stream))
        return;

      subscription.cancel();
      resolve(true);
    });

    subscription.then(() => resolve(false), reject);
    return () => subscription.cancel();
  });
}
