import { NonSingleValueStreamError } from '../errors';

/**
 * Returns a promise with the only value for this stream, if the stream has more
 *  than one item or no item the returned promise will fail.
 *
 * @throws {NonSingleValueStreamError}
 * @returns {Promise<T>} A promise with the only value of this stream
 */
export default function single() {
  return new Promise((resolve, reject) => {
    var valueReceipt = false;
    var result;

    this.subscribe(onNext, reject, onComplete);

    function onNext(value) {
      if (valueReceipt)
        reject(new NonSingleValueStreamError());

      valueReceipt = true;
      result = value;
    }

    function onComplete() {
      if (valueReceipt)
        resolve(result);
      reject(new NonSingleValueStreamError());
    }
  });
}
