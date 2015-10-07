import ReadableStream from './constructor';

/**
 * @returns {ReadableStream}
 */
export default function merge(...sources) {
  var isCompleted = [];

  return new ReadableStream((push, fail, complete) => {
    var subscriptions = sources.map((source, index) => {
      isCompleted[index] = false;
      return ReadableStream.from(source)
        .subscribe(push, onError, () => onComplete(index));
    });

    return cancel;

    function onError(reason) {
      cancel();
      fail(reason);
    }

    function onComplete(index) {
      isCompleted[index] = true;
      if (isCompleted.every(Boolean)) {
        cancel();
        complete();
      }
    }

    function cancel() {
      subscriptions.forEach(subs => subs.cancel());
    }
  });
}
