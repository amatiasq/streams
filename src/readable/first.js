/**
 * Returns a promise with the first N items of this stream.
 *
 * @param {Number} count A positive integer - The number of items to collect.
 * @returns {Promise<Array<T>>}
 */
export default function first(count) {
  count = count || 1;
  var self = this;
  var values = [];

  return new Promise(function(resolve, reject) {
    var subscription = self.subscribe(function(value) {
      values.push(value);
      if (values.length === count) {
        resolve(values);
        subscription.cancel();
      }
    }, reject, function() {
      resolve(values);
    });
  });
}
