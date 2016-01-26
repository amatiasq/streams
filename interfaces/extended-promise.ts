interface ExtendedPromise<T> extends Promise<T> {
  finally(() => {}) : void;
}
