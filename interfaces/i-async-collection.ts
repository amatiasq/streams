interface IAsyncCollection<T> implements ICollection<T> {
  // Returns subinterface
  concat(...collection : ICollection) : IAsyncCollection; // Waits for 1st collection to finish to concat next one
  filter(test : TestIterator<T>) : IAsyncCollection<T>;
  map(iterator : MapIterator<T, Y>) : IAsyncCollection<Y>;
  slice(start : Number, end : Number = this.length) : IAsyncCollection<T>;
  flatten() : IAsyncCollection<T>;

  // Returns value
  forEach(iterator : Iterator<T>) : Promise<null>; // promise fulfills when stream is closed
  entries() : Generator<Promise<T>>;
  keys() : Generator<Promise<Number>>;
  values() : Generator<Promise<Array<Number, T>>>;
  every(iterator : Iterator<T>) : Promise<Boolean>;
  includes(search : T, fromIndex : Number = 0) : Promise<Boolean>;
  join(separator : String = ',') : Promise<String>;
  reduce(iteartor : ReduceIterator<T, Y>, initialValue : Y = null) : Promise<Y>;
  some(test : TestIterator<T>) : Promise<Boolean>;
  length : Promise<Number>;

  // extras
  flatten() : IAsyncCollection<T>;
  skipUntil(test : TestIterator<T>) : IAsyncCollection<T>;
  takeUntil(test : TestIterator<T>) : IAsyncCollection<T>;
  skip(count : Number) : IAsyncCollection<T>;
  take(count : Number) : IAsyncCollection<T>;
  zip(... collection : ICollection) : IAsyncCollection;
  single() : Promise<T>;
  first() : Promise<T>;
  last() : Promise<T>;

  // Async only
  accumulate(iterator : ReduceIterator<T, Y>) : IAsyncCollection<Y>; // Like reduce but returns for each iteration
  delay(milliseconds : Number) : IAsyncCollection<T>;
}
