/**
 * The filter() method creates a new stream with all elements that pass the test implemented by the provided function.
 *
 * @method ReadableStream#filter
 * @param {TestIterator} test - Function to test each element of the array. Return true to keep the element, false otherwise.
 * @param {Object} [context] - Value to use as this when executing callback.
 * @returns {ReadableStream} A subset of this stream.
 */
export default function filter(test, context) {
  return new this.constructor(push => {
    return this.forEach((value, index, stream) => {
      if (test.call(context, value, index, stream))
        push(value);
    });
  });
}
