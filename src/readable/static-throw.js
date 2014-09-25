import ReadableStream from './constructor';

/**
 * @returns {ReadableStream}
 */
export default function _throw(error) {
  return new ReadableStream(function(onNext, onError) {
    var timeout = setTimeout(function() {
      onError(error);
    });
    return clearTimeout.bind(null, timeout);
  });
}
