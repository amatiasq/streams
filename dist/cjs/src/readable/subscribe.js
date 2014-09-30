"use strict";
var Subscription = require("../subscription")["default"];

/**
 * Allows you to listen to the stream values. It's implementation depends on
 *   argument passed to {@link ReadableStream#constructor}.
 *
 * @todo Maybe add example fiddle?
 * @method ReadableStream#subscribe
 * @param [onNext] {ReadableStream~onNext} Callback to invoke when the stream has
 *   a new value. The value will be passed as argument.
 * @param [onError] {ReadableStream~onError} Callback to be invoked if the streams
 *   fails. The error object will be passed as argument.
 * @param [onComplete] {ReadableStream~onComplete} Callback to be invoked when the
 *   stream has finished sending values. No arguments.
 * @returns {Subscription} A subscription object to cancel the streamming.
 */
exports["default"] = function subscribe(onNext, onError, onComplete) {
  var cancellation = this._subscribe(onNext, onError, onComplete);
  return new Subscription(cancellation);
}

/**
 * Callback to be invoked each time the stream has a new value.
 *
 * @callback ReadableStream~onNext
 * @param value {*} The new value
 */

/**
 * Callback to be invoked when a stream has an error. The subscription will be
 *   cancelled after this callback is invoked.
 *
 * @callback ReadableStream~onError
 * @param error {Error} The error object
 */

/**
 * Callback to be invoked when a stream has completed. The subscription will be
 *   cancelled after this callback is invoked.
 *
 * @callback ReadableStream~onComplete
 */