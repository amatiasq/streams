import ReadableStream from './constructor';

/**
 * @returns {ReadableStream}
 */
export default function fromPromise(promise) {
  return new ReadableStream(function(onNext, onError, onComplete) {
    promise.then(function(value) {
      onNext(value);
      onComplete();
    }, onError);
  });
}
