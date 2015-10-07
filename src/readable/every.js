/**
 * @param {Function} test
 * @param {Object} context
 * @returns {Promise<bool>}
 */
export default function every(test, context) {

  return new Promise((resolve, reject) => {
    var count = 0;
    var subscription = this.subscribe(onNext.bind(this), reject, onComplete);
    return subscription;

    function onNext(value) {
      if (!test.call(context, value, count++, this)) {
        subscription.cancel();
        resolve(false);
      }
    }

    function onComplete() {
      resolve(true);
    }
  });
}
