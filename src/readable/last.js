/**
 * Returns a promise with the last N items of this stream.
 *
 * @param {Number} count A positive integer - The number of items to collect.
 * @returns {Promise<Array<T>>}
 */
export default function last(count = 1) {
  return new Promise(function(resolve, reject) {
    var values = [];
    this.subscribe(onNext, reject, onComplete);

    function onNext(value) {
      values.push(value);
      if (values.length >= count)
        values.shift();
    }

    function onComplete() {
      resolve(values);
    }
  });
}
