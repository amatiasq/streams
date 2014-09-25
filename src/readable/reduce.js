/**
 * @param {Function} iterator
 * @param {Any} initialValue
 * @returns {Promise<T>}
 */
export default function reduce(iterator, initialValue) {
  var self = this;
  var count = 0;
  var accumulated = initialValue || null;
  return new Promise(function(resolve, reject) {
    self.subscribe(function(value) {
      accumulated = count === 0 && !accumulated ?
        value :
        iterator(accumulated, value, count++, self);
    }, reject, function() {
      resolve(accumulated);
    });
  });
}
