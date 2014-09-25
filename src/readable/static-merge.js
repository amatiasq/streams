import ReadableStream from './constructor';

/**
 * @returns {ReadableStream}
 */
export default function merge(/* ...sources */) {
  var sources = arguments.length === 1 ?
    arguments[0] :
    [].slice.call(arguments);
  var isCompleted = [];

  return new ReadableStream(function(onNext, onError, onComplete) {
    function complete(index) {
      isCompleted[index] = true;
      if (isCompleted.every(Boolean)) {
        cancel();
        onComplete();
      }
    }
    function cancel() {
      subscriptions.forEach(function(subs) {
        subs.cancel();
      });
    }

    var subscriptions = sources.map(function(source, index) {
      isCompleted[index] = false;
      return ReadableStream.from(source).subscribe(onNext, function(reason) {
        cancel();
        onError(reason);
      }, function() {
        complete(index);
      });
    });

    return cancel;
  });
}
