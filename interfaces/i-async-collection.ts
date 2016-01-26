interface IAsyncCollection<T> implements ICollection<T> {
  // Returns subinterface
  concat(...collection : ICollection) : IAsyncCollection; // Waits for 1st collection to finish to concat next one
  filter(test : TestIterator<T>) : IAsyncCollection<T>;
  map(iterator : MapIterator<T, Y>) : IAsyncCollection<Y>;
  slice(start : Number, end : Number = this.length) : IAsyncCollection<T>;
  flatten() : IAsyncCollection<T>;

  // Returns value
  forEach(iterator: Iterator<T>): CancellablePromise<null>; // promise fulfills when stream is closed
  entries() : Generator<CancellablePromise<T>>;
  // join(separator : String = ',') : CancellablePromise<String>;
  reduce(accumulator : Accumulator< T, Y >, initialValue : Y = null) : CancellablePromise<Y>;
  some(test : TestIterator<T>) : CancellablePromise<Boolean>;
  keys() : Generator<CancellablePromise<Number>>;
  values() : Generator<CancellablePromise<Array<Number, T>>>;
  every(iterator : Iterator<T>) : CancellablePromise<Boolean>;
  length: CancellablePromise<Number>;

  // extras
  flatten() : IAsyncCollection<T>;
  zip(...collection : ICollection) : IAsyncCollection;
  single() : CancellablePromise<T>;
  first() : CancellablePromise<T>;
  last() : CancellablePromise<T>;

  // Async only
  accumulate(iterator : Accumulator<T, Y>) : IAsyncCollection<Y>; // Like reduce but returns for each iteration
  delay(milliseconds : Number) : IAsyncCollection<T>;

  // Deprecated in favor of .slice() & .filter()
  skipUntil(test : TestIterator<T>) : IAsyncCollection<T>;
  takeUntil(test : TestIterator<T>) : IAsyncCollection<T>;
  skip(count : Number) : IAsyncCollection<T>;
  take(count : Number) : IAsyncCollection<T>;
}
