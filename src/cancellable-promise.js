import { isFunction } from './utils';
import ExtendedPromise from './extended-promise';

/**
 * This promise represents a asynchronous operation than can be cancelled.
 */
export default class CancellablePromise extends ExtendedPromise {
  /**
   * Creates a new cancellable promise
   *
   * @param {PromiseExecutor} handler
   *   This function receives `resolve` and `reject` like any promise handler but it's
   *   expected to return a CancellablePromise instance or a function which will be
   *   invoked if the promise is cancelled.
   * @returns {CancellablePromise} A new instance
   */
  constructor(handler) {
    super((resolve, reject) => {
      this._cancel = handler(resolve, reject);
    });
  }

  /**
   * Cancels the operation this promise is representing.
   *
   * @returns {?boolean} Will return false if it was not possible to cancel the operation.
   */
  cancel() {
    if (this._cancel instanceof CancellablePromise)
      return this._cancel.cancel();

    if (isFunction(this._cancel))
      return this._cancel.call() !== false;

    return false;
  }
}
