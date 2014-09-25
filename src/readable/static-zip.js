import ReadableStream from './constructor';
import { isPromise } from '../utils';

/**
 * Returns a new stream that will send data when all sources have emmited value.
 *
 * @param {Rest<Promise|Stream>} ...sources Streams or promises to watch for
 * @param {Function} mapper The function to transform the results in a single
 *  value.
 * @returns {ReadableStream} The stream with the result values
 */
export default function zip(/* ...sources, mapper*/) {
  var sources = [].slice.call(sources);
  var mapper = sources.pop();
  var queues = [];
  var isCompleted = [];

  return new ReadableStream(function(onNext, onError, onComplete) {

    function cancel() {
      subscriptions
        .filter(Boolean)
        .forEach(function(a) { a.cancel() });
    }

    var subscriptions = sources.map(function(source, index) {
      queues[index] = [];
      isCompleted[index] = false;

      function onNextSingle(value) {
        queues[index].push(value);
        if (queues.every(function(q) { return q.length > 0 })) {
          var values = queues.map(function(q) { return q.shift() });
          onNext(mapper.apply(null, values));
        }
      }
      function onErrorSingle(reason) {
        cancel();
        onError(reason);
      }
      function onCompleteSingle() {
        isCompleted[index] = true;
        if (isCompleted.every(Boolean)) {
          cancel();
          onComplete();
        }
      }

      if (source instanceof ReadableStream)
        return source.subscribe(onNextSingle, onErrorSingle, onCompleteSingle);

      if (isPromise(source)) {
        source.then(function(value) {
          onNextSingle(value);
          onCompleteSingle();
        }, onErrorSingle);
        return;
      }

      if (Array.isArray(source)) {
        setTimeout(function() {
          source.forEach(onNextSingle);
          onCompleteSingle();
        });
      }

      // TODO throw error unknown source type
    });

    return cancel;
  });
}
