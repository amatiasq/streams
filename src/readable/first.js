/**
 * Returns a promise with the first N items of this stream.
 *
 * @param {Number} count A positive integer - The number of items to collect.
 * @returns {Promise<Array<T>>}
 */
export default function first(count = 1) {
  return new Promise((resolve, reject) => {
    var values = [];
    var subscription = this.subscribe(onNext, reject, onComplete);

    function onNext(value) {
      values.push(value);
      if (values.length === count) {
        resolve(values);
        subscription.cancel();
      }
    }

    function onComplete() {
      resolve(values);
    }
  });
}
