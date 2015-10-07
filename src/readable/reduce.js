/**
 * @param {Function} iterator
 * @param {Any} initialValue
 * @returns {Promise<T>}
 */
export default function reduce(iterator, initialValue = null) {
  return new Promise((resolve, reject) => {
    var count = 0;
    var accumulated = initialValue;
    this.subscribe(onNext.bind(this), reject, onComplete);

    function onNext(value) {
      accumulated = count === 0 && !accumulated ?
        value :
        iterator(accumulated, value, count++, this);
    }

    function onComplete() {
      resolve(accumulated);
    }
  });
}
