/**
 * @returns {Promise<Array>}
 */
export default function toArray() {
  var self = this;
  var result = [];

  return new Promise(function(resolve, reject) {
    self.subscribe(
      function(value) { result.push(value) },
      reject,
      function() { resolve(result) });
  });
}
