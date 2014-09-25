import ReadableStream from './constructor';
import { isPromise } from '../utils';

/**
 * This function can receive a Promise, a Stream or a function.
 *
 * - If the argument is a Promise it will return a new stream echoing the values
 *  of this stream to be completed or rejected with the promise, no values will
 *  be sent after that.
 *
 * - If the argument is a Stream it will return a new stream echoing the values
 *  of this stream to be completed when the first value of the argument is
 *  receipt, no values will be sent after that.
 *
 * - If the argument is a function it will return a new stream that will invoke
 *  echoing the function on every value and will echo the value while the
 *  function returns falsy, when the function returns thruthy the stream will be
 *  completed.
 *
 * @param {Promise|Stream|Function} value
 * @param {Object} context In case `value` is a function this will be it's
 *  context
 * @returns {ReadableStream}
 */
export default function takeUntil(value, context) {
  if (typeof value === 'function')
    return takeUntil_function(this, value, context);
  if (isPromise(value))
    return takeUntil_promise(this, value);
  return takeUntil_stream(this, value);
}

function takeUntil_function(self, test, context) {
  return new ReadableStream(function(onNext, onError, onComplete) {
    var subscription = self.subscribe(function(value) {
      if (test.call(context, value)) {
        subscription.cancel();
        onComplete();
      } else
        onNext(value);
    }, onError, onComplete);

    return subscription;
  });
}

function takeUntil_promise(self, promise) {
  return new ReadableStream(function(onNext, onError, onComplete) {
    var subscription = self.subscribe(onNext, onError, onComplete);
    promise
      .then(subscription.cancel, subscription.cancel)
      .then(onComplete, onError);
    return subscription;
  });
}

function takeUntil_stream(self, stream) {
  return new ReadableStream(function(onNext, onError, onComplete) {
    var subscription = self.subscribe(onNext, onError, onComplete);
    var secondSubscription = stream.subscribe(end, function(error) {
      subscription.cancel();
      onError(error);
    }, end);

    function end() {
      secondSubscription.cancel();
      subscription.cancel();
      onComplete();
    }

    return end;
  });
}
