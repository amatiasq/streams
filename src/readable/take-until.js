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
    return takeUntil_function.call(this, value, context);

  if (isPromise(value))
    return takeUntil_promise.call(this, value);

  return takeUntil_stream.call(this, value);
}


function takeUntil_function(test, context) {
  return new ReadableStream((push, fail, complete) => {
    var subscription = self.subscribe(onNext, fail, complete);
    return subscription;

    function onNext(value) {
      if (test.call(context, value)) {
        subscription.cancel();
        complete();
      } else {
        push(value);
      }
    }
  });
}


function takeUntil_promise(promise) {
  return new ReadableStream((push, fail, complete) => {
    var subscription = this.subscribe(push, fail, complete);

    promise
      .then(() => subscription.cancel(), () => subscription.cancel())
      .then(complete, fail);

    return subscription;
  });
}


function takeUntil_stream(stream) {
  return new ReadableStream((push, fail, complete) => {
    var subscription = this.subscribe(push, fail, complete);
    var secondSubscription = stream.subscribe(end, onError, end);

    return end;

    function end() {
      secondSubscription.cancel();
      subscription.cancel();
      complete();
    }

    function onError(error) {
      subscription.cancel();
      fail(error);
    }
  });
}
