import ReadableStream from './constructor';
import { isPromise } from '../utils';

/**
 * This function can receive a Promise, a Stream or a function.
 *
 * - If the argument is a Promise it will return a new stream that will echo the
 *  values of this stream when the promise is completed, if the promise is
 *  rejected the returned stream will send an error.
 *
 * - If the argument is a Stream it will return a new stream that will echo the
 *  values of this stream when the first value of the argument is receipt.
 *
 * - If the argument is a function it will return a new stream that will invoke
 *  echoing the function on every value and will start to echo the value if the
 *  function returns thruthy.
 *
 * @param {Promise|Stream|Function} value
 * @param {Object} context In case `value` is a function this will be it's
 *  context
 * @returns {ReadableStream}
 */
export default function skipUntil(value, context) {
  if (typeof value === 'function')
    return skipUntil_function.call(this, value, context);

  if (isPromise(value))
    return skipUntil_promise.call(this, value);

  return skipUntil_stream.call(this, value);
}


function skipUntil_function(test, context) {
  return new ReadableStream((push, fail, complete) => {
    var enabled = false;
    return this.subscribe(onNext, fail, complete);

    function onNext(value) {
      if (!enabled && test.call(context, value))
        enabled = true;

      if (enabled)
        onNext(value);
    }
  });
}


function skipUntil_promise(promise) {
  return new ReadableStream((push, fail, complete) => {
    var subscription;
    promise.then(() => subscription = self.subscribe(push, fail, complete), fail);
    return () => subscription.cancel();
  });
}


function skipUntil_stream(stream) {
  return new ReadableStream((push, fail, complete) => {
    var subscription = stream.subscribe(start.bind(this), fail, start.bind(this));

    function start() {
      subscription.cancel();
      subscription = this.subscribe(push, fail, complete);
    }

    return () => subscription.cancel();
  });
}
