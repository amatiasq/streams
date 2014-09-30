"use strict";
/**
 * Creates a readable stream, you can listen to the stream values using
 *  {@link ReadableStream#subscribe}
 * It receives a function that will be invoked when someone subscribes to this
 *   stream, this function should handle the callbacks for the subscription:
 *
 * - `onNext(value)`
 * - `onError(error)`
 * - `onSubscribe()`
 *
 * That function may return a `Function` or a {@link Subscription} instance,
 *   in that case if the subscription for this stream is cancelled the returned
 *   function will be invoked or the returned subscription will be cancelled.
 *
 * @constructor
 * @param onSubscribe {ReadableStream~onSubscribe} Function to be invoked when
 *   someone subscribes to this stream.
 */
function ReadableStream(onSubscribe) {
  this._subscribe = onSubscribe;
}

// DEBUG ONLY
ReadableStream.prototype.log = function(prefix) {
  prefix = prefix || '[STREAM-LOGGER]';
  var log = console.log.bind(console, prefix);
  return this.subscribe(
    log.bind(null, '[value]'),
    log.bind(null, '[error]'),
    log.bind(null, '[completed]')
  );
};

exports["default"] = ReadableStream;


/**
 * A callback to be invoked when someone subscribes to a stream. This callback
 *   is responsible to manage the stream subscription.
 *
 * @callback ReadableStream~onSubscribe
 * @param onNext {ReadableStream~onNext} This callback must be invoked each
 *   time the stream has a new value.
 * @param onError {ReadableStream~onError} This callback must be invoked if an
 *   error is produced.
 * @param onComplete {ReadableStream~onComplete} This callback must be invoked
 *   as soon as we know this stream will not send more values in the future.
 * @returns {Subscription|Function|null} A subscription object or a function to
 *   cancel the subscription.
 */