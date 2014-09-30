"use strict";
var NonSingleValueStreamError = require("../errors").NonSingleValueStreamError;

/**
 * Returns a promise with the only value for this stream, if the stream has more
 *  than one item or no item the returned promise will fail.
 *
 * @throws {NonSingleValueStreamError}
 * @returns {Promise<T>} A promise with the only value of this stream
 */
exports["default"] = function single() {
  var self = this;
  return new Promise(function(resolve, reject) {
    var valueReceipt = false;
    var value;

    self.subscribe(function(val) {
      if (valueReceipt)
        reject(new NonSingleValueStreamError());

      valueReceipt = true;
      value = val;
    }, reject, function() {
      if (valueReceipt)
        resolve(value);
      reject(new NonSingleValueStreamError());
    });
  });
}