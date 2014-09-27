import { isFunction } from '../utils';

/**
 * Creates a readable stream, you can listen to the stream values using
 *  {@link ReadableStream#subscribe}
 * It receives a function that will be invoked when someone subscribes to this
 *   stream, this function should handle the callbacks for the subscription:
 *
 * - `onNext(value)`
 * - `onError(error)`
 * - `onSubscribe()
 *
 * That function may return a `Function` or a {@link Subscription} instance,
 *   in that case if the subscription for this stream is cancelled the returned
 *   function will be invoked or the returned subscription will be cancelled.
 *
 * @class
 * @constructor
 * @param {Function} onSubscribe Function to be invoked when someone subscribes
 *   to this stream.
 */
function ReadableStream(onSubscribe) {
  this._subscribe = onSubscribe;
}


/**
 * Allows you to listen to the stream values. It's implementation depends on
 *   argument passed to {@link ReadableStream#constructor}.
 *
 * @memberof ReadableStream
 * @param {Function} onNext Callback to invoke when the stream has a new value.
 *   the value will be passed as argument.
 * @param {Function} onError Callback to be invoked if the streams fails. The
 *   error object will be passed as argument.
 * @param {Function} onComplete Callback to be invoked when the stream has
 *   finished sending values. No arguments.
 * @returns {Subscription} A subscription object to cancel the streamming.
 */
ReadableStream.prototype.subscribe = function(onNext, onError, onComplete) {
  var cancellation = this._subscribe(onNext, onError, onComplete);

  function cancel() {
    if (isFunction(cancellation))
      cancellation();
    else if (isFunction(cancellation.cancel))
      cancellation.cancel();
  }

  return { cancel: cancel };
};

export default ReadableStream;
