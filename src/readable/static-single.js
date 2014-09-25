import ReadableStream from './constructor';

/**
 * @returns {ReadableStream}
 */
export default function single(value) {
  return new ReadableStream(function(onNext, onError, onComplete) {
    var timeout = setTimeout(function() {
      onNext(value);
      onComplete(value);
    });
    return clearTimeout.bind(null, timeout);
  });
}
