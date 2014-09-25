import ReadableStream from './constructor';

/**
 * @returns {ReadableStream}
 */
export default function empty() {
  return new ReadableStream(function(onNext, onError, onComplete) {
    var timeout = setTimeout(onComplete);
    return clearTimeout.bind(null, timeout);
  });
}
