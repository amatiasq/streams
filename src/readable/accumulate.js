import ReadableStream from './constructor';

/**
 * This behaves similar to {@link ReadableStream#reduce} but instead of a
 *   promise ReadableStream#accumulate returns a stream.
 *   With every new value a partial total will be sent over the new stream.
 *   See the example for more information.
 *
 * @method ReadableStream#accumulate
 * @see {@link http://jsfiddle.net/amatiasq/uxzc91vm/|Fiddle example}
 *
 * @param {Function} iterator Operation to be applied over every entry
 * @param {Object?} initialValue Value to pass as total for the first call.
 * @returns {ReadableStream} A new stream emitting the modified values.
 */
export default function accumulate(iterator, initialValue = null) {
  return new ReadableStream((push, fail, complete) => {
    var count = 0;
    var accumulated = initialValue;
    return this.subscribe(onValue.bind(this), fail, complete);

    function onValue(value) {
      accumulated = count === 0 && !accumulated ?
        value :
        iterator(accumulated, value, count, this);

      push(accumulated);
      count++;
    }
  });
}
