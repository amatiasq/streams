/**
 * @returns {Promise<null>}
 */
export default function toPromise() {
  var self = this;
  return new Promise(function(resolve, reject) {
    self.subscribe(null, reject, resolve);
  });
}
