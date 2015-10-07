import { isFunction } from './utils';

/**
 * This class is used to control a subscription to a {@link ReadableStream}.
 *
 * @class
 * @name Subscription
 */
export default class Subscription {
  constructor(action) {
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
  cancel() { }
}
