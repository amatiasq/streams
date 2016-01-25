interface ISyncCollection<T> implements ICollection<T> {
  // Returns subinterface
  concat(... collection : ISyncCollection) : ISyncCollection;
  filter(test : TestIterator<T>) : ISyncCollection<T>;
  map(iterator : MapIterator<T, Y>) : ISyncCollection<Y>;
  slice(start : Number, end : Number = this.length) : ISyncCollection<T>;

  // Returns value
  forEach(iterator : Iterator<T>) : null;
  entries() : Generator<T>;
  keys() : Generator<Number>;
  values() : Generator<Array<Number, T>>;
  every(iterator : Iterator<T>) : Boolean;
  includes(search : T, fromIndex : Number = 0) : Boolean;
  join(separator : String = ',') : String;
  reduce(iteartor : ReduceIterator<T, Y>, initialValue : Y = null) : Y;
  some(test : TestIterator<T>) : Boolean;
  length : Number;

  // extras
  flatten() : ISyncCollection<T>;
  skipUntil(test : TestIterator<T>) : ISyncCollection<T>;
  takeUntil(test : TestIterator<T>) : ISyncCollection<T>;
  skip(count : Number) : ISyncCollection<T>;
  take(count : Number) : ISyncCollection<T>;
  zip(... collection : ICollection) : ICollection;
  single() : T;
  first() : T;
  last() : T;

  // Sync only
  fill(value : Object, start : Number = 0, end : Number = this.length) : void;
  lastIndexOf(search : Object, fromIndex : Number = this.length - 1) : Number;
  reduceRight(iteartor : ReduceIterator, initialValue : Object = null) : Object;
  reverse() : ISyncCollection;
  sort(compare : CompareIterator = null) : ISyncCollection;
}
