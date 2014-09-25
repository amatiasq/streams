import ReadableStream from './constructor';

/**
 * @param {Number} milliseconds
 * @returns {ReadableStream}
 */
export default function delay(milliseconds) {
  var self = this;
  return new ReadableStream(function(onNext, onError, onComplete) {
    return self.subscribe(function(value) {
      setTimeout(onNext.bind(null, value), milliseconds);
    }, onError, onComplete);
  });
}
