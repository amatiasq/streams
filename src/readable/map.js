import ReadableStream from './constructor';

/**
 * @param {Function} iterator
 * @param {Object} context
 * @returns {ReadableStream}
 */
export default function map(iterator, context) {
  return new ReadableStream((push, fail, complete) => {
    var count = 0;
    return this.subscribe(onNext.bind(this), fail, complete);

    function onNext(value) {
      push(iterator.call(context, value, count++, this));
    }
  });
}
