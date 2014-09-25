import ReadableStream from './constructor';

/**
 * @returns {ReadableStream}
 */
export default function flattenArray() {
  var self = this;

  return new ReadableStream(function(onNext, onError, onComplete) {
    return self.subscribe(function(value) {
      if (Array.isArray(value))
        value.forEach(onNext);
      else
        onNext(value);
    }, onError, onComplete);
  });
}
