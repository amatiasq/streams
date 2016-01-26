/**
 * The map() method creates a new stream with the results of calling a provided function on every element in this stream.
 *
 * @method ReadableStream#map
 * @param {Iterator} iterator - Function that produces an element of the new stream.
 * @param {Object} [context] - Value to use as this when executing callback.
 * @returns {ReadableStream} A new stream with the new elements.
 */
export default function map(iterator, context) {
  return new this.constructor(next => {
    return this.forEach((value, index, stream) => {
      next(iterator.call(context, value, index, stream));
    });
  });
}
