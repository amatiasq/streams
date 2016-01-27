interface ICollection<T> {
  // Returns subinterface
  concat(... collection : ICollection) : ICollection;
  filter(test : TestIterator<T>) : ICollection<T>;
  map(iterator : MapIterator<T, Y>) : ICollection<Y>;
  slice(start : Number, end : Number = this.length) : ICollection<T>;

  // Returns value
  forEach(iterator : Iterator<T>) : Value<null>;
  every(iterator : Iterator<T>) : Value<Boolean>;
  // join(separator : String = ',') : Value<String>;
  reduce(accumulator : Accumulator< T, Y >, initialValue : Y = null) : Value<Y>;
  some(test : TestIterator<T>) : Value<Boolean>;
  entries() : Generator<Value<T>>;
  keys() : Generator<Value<Number>>;
  values() : Generator<Value<Array<Number, T>>>;
  length: Value<Number>;

  // extras
  flatten(options : { deep : Boolean }) : ICollection<T>;
  zip(... collection : ICollection) : ICollection; // zip([1,2],[3,4],[5,6]) = [[1,3,5],[2,4,6]];
  single() : Value<T>; // throws error if length !== 1
  first() : Value<T>; // immutable shift
  last() : Value<T>; // immutable pop

  // Conversions
  toArray() : ISyncCollection<T>;
  toStream() : IAsyncCollection<T>;

  // Deprecated in favor of .slice() & .filter()
  skipUntil(test : TestIterator<T>) : ICollection<T>;
  takeUntil(test : TestIterator<T>) : ICollection<T>;
  skip(count : Number) : ICollection<T>;
  take(count : Number) : ICollection<T>;
}
