"use strict";
/**
 * @returns {Promise<null>}
 */
exports["default"] = function toPromise() {
  var self = this;
  return new Promise(function(resolve, reject) {
    self.subscribe(null, reject, resolve);
  });
}