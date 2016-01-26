/**
 * Extends standard promise to include some useful features.
 */
export default class ExtendedPromise extends Promise {
  /**
   * Invokes the callback either the promise is fullfiled succesfully or it fails.
   * Whatever the case is it will be executed only once.
   * Return promise will not be affected for the function at all.
   *
   *
   * @param {function()} action - The function to be executed when the promise gets fulfilled or rejected.
   * @returns {ExtendedPromise} Returns this same promise without changing anything.
   */
  finally(action) {
    this.then(action, action);
    return this;
  }
}
