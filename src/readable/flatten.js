import ReadableStream from './constructor';

/**
 * @returns {ReadableStream}
 */
export default function flatten() {
  var self = this;
  var promises = [];

  return new ReadableStream(function(onNext, onError, onComplete) {
    return self.subscribe(function(value) {
      if (value instanceof ReadableStream) {
        value.subscribe(onNext, onError);
        promises.push(value.toPromise());
      } else
        onNext(value);
    }, onError, function() {
      Promise.all(promises).then(onComplete);
    });
  });
}
