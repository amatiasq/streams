interface CancellablePromise<T> extends ExtendedPromise<T> {
  cancel() : void;
}
