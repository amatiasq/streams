/**
 * A callback to be invoked when someone subscribes to a stream. This callback is responsible to manage the stream subscription.
 *
 * @typedef {function} onSubscribe
 *
 * @param {function(value:?Object)} onNext - This callback must be invoked each time the stream has a new value.
 * @param {function(error:!Object)} onError - This callback must be invoked if an error is produced.
 * @param {function()} onComplete - This callback must be invoked as soon as we know this stream will not send more values anymore.
 * @returns {?(CancellablePromise|function())} A cancellable promise or a function to cancel the subscription.
 */
