/**
 * @param {Function} iterator
 * @param {Object} context
 * @returns {Promise<null>} A promise to be rejected if the stream throws an
 *   error or to be resolved when the stream is completed.
 */
export default function forEach(iterator, context) {
  return new Promise((resolve, reject) => {
    var count = 0;
    this.subscribe(onNext.bind(this), reject, resolve);

    function onNext(value) {
      iterator.call(context, value, count++, this);
    }
  });
}
