interface ISyncCollection<T> implements ICollection<T> {
  // Returns subinterface
  concat(... collection : ISyncCollection) : ISyncCollection;
  filter(test : TestIterator<T>) : ISyncCollection<T>;
  map(iterator : MapIterator<T, Y>) : ISyncCollection<Y>;
  slice(start : Number, end : Number = this.length) : ISyncCollection<T>;

  // Returns value
  forEach(iterator : Iterator<T>) : null;
  every(iterator : Iterator<T>) : Boolean;
  // join(separator : String = ',') : String;
  reduce(accumulator: Accumulator<T, Y>, initialValue: Y = null): Y;
  some(test : TestIterator<T>) : Boolean;
  entries(): Generator<T>;
  keys(): Generator<Number>;
  values(): Generator<Array<Number, T>>;
  length: Number;

  // extras
  flatten() : ISyncCollection<T>;
  zip(... collection : ICollection) : ICollection;
  single() : T;
  first() : T;
  last() : T;

  // Sync only
  fill(value : T, start : Number = 0, end : Number = this.length) : void;
  lastIndexOf(search : T, fromIndex : Number = this.length - 1) : Number;
  reduceRight(iteartor: Accumulator<T, Y>, initialValue: Y = null): Y;
  reverse() : ISyncCollection;
  sort(compare : CompareIterator<T> = null) : ISyncCollection;

  // Deprecated in favor of .slice() & .filter()
  skipUntil(test: TestIterator<T>): ISyncCollection<T>;
  takeUntil(test: TestIterator<T>): ISyncCollection<T>;
  skip(count: Number): ISyncCollection<T>;
  take(count: Number): ISyncCollection<T>;
}
