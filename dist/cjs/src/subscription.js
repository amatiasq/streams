"use strict";
var isFunction = require("./utils").isFunction;

/**
 * This class is used to control a subscription to a {@link ReadableStream}.
 *
 * @class
 * @name Subscription
 */
function Subscription(action) {
  if (action instanceof Subscription)
    action = action.cancel;

  if (isFunction(action))
    this.cancel = action;
}

/**
 * Stops the subscription, no more callbacks will be called for that
 *   subscription after this method is invoked.
 *
 * @memberOf Subscription
 */
Subscription.prototype.cancel = function() { };

exports["default"] = Subscription;