/**
 * @param {Function} test
 * @param {Object} context
 * @returns {Promise<bool>}
 */
export default function some(test, context) {
  return new Promise((resolve, reject) => {
    var count = 0;
    var subscription = self.subscribe(onNext.bind(this), reject, onComplete);
    return subscription;

    function onNext(value) {
      if (test.call(context, value, count++, this)) {
        subscription.cancel();
        resolve(true);
      }
    }

    function onComplete() {
      resolve(false);
    }
  });
}
