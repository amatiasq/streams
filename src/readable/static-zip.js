import ReadableStream from './constructor';
import streamFrom from './static-from';

/**
 * Returns a new stream that will send data when all sources have emmited value.
 *
 * @param {Rest<Promise|Stream>} ...sources Streams or promises to watch for
 * @param {Function} mapper The function to transform the results in a single
 *  value.
 * @returns {ReadableStream} The stream with the result values
 */
export default function zip(mapper, ...sources) {
  return new ReadableStream((push, fail, complete) => {
    var queues = [];
    var isCompleted = [];

    var subscriptions = sources.map((source, index) => {
      queues[index] = [];
      isCompleted[index] = false;
      return streamFrom(source).subscribe(onNext, onError, onComplete);

      // TODO throw error unknown source type

      function onNext(value) {
        queues[index].push(value);
        if (queues.every(q => q.length > 0)) {
          var values = queues.map(q => q.shift());
          onNext(mapper(...values));
        }
      }
      function onError(reason) {
        cancel();
        onError(reason);
      }
      function onComplete() {
        isCompleted[index] = true;
        if (isCompleted.every(Boolean)) {
          cancel();
          complete();
        }
      }
    });

    return cancel;

    function cancel() {
      subscriptions
        .filter(Boolean)
        .forEach(subs => subs.cancel());
    }
  });
}
