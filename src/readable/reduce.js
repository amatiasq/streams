import CancellablePromise from '../cancellable-promise';

/**
 * The reduce() method applies a function against an accumulator and each value of the stream to reduce it to a single value.
 *
 * @method ReadableStream#reduce
 * @param {Accumulator} accumulator - Function to execute on each value in the array
 * @param {?*} [initialValue] - Value to use as this when executing callback.
 * @returns {ReadableStream} A subset of this stream.
 */
export default function reduce(accumulator, initialValue = null) {
  let hasInitial = arguments.length > 1;
  let accumulated = initialValue;

  return new CancellablePromise((resolve, reject) => {
    let subscription = this.forEach((value, index, stream) => {
      if (index === 0 && !hasInitial) {
        accumulated = value;
        return;
      }

      accumulated = accumulator(accumulated, value, index, stream);
    });

    subscription.then(length => {
      if (length === 0 && !hasInitial)
        reject(new TypeError('Reduce of empty stream with no initial value'));
      else
        resolve(accumulated);
    }, reject);

    return () => subscription.cancel();
  });
}
