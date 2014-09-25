/**
 * Returns a promise with the last N items of this stream.
 *
 * @param {Number} count A positive integer - The number of items to collect.
 * @returns {Promise<Array<T>>}
 */
export default function last(count) {
  count = count || 1;
  var self = this;
  var values = [];

  return new Promise(function(resolve, reject) {
    self.subscribe(function(value) {
      values.push(value);
      if (values.length >= count)
        values.shift();
    }, reject, function() {
      resolve(values);
    });
  });
}
