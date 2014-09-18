
interface Stream {

  static noop() : Readable;
  static empty() : Readable;
  static single(value) : Readable;
  static range(start = 0, end) : Readable;
  static repeat(value, count, [Scheduler]) : Readable
  static throw(error) : Readable;
  static zip(...args, iteartor) : Readable;
  static interval(ms, fn = null) : Readable;
  static from(Iterable) : Readable;
  static fromArray(array) : Readable;
  static fromWritable(stream) : Readable;
  static fromStream(stream, listen) : Readable;
  static fromEvent(target, event, { method }) : Readable;
  static merge(Readable, Readable) : Readable;

  forEach(onNext) : null;
  map(iterator) : Readable;
  filter(test) : Readable;
  reduce(iterator, seed) : Promise<T>;
  some(test) : Promise<bool>;
  every(test) : Promise<bool>;
  concat(Readable) : Readable

  single() : Promise<T>;
  first(count = 1) : Promise<T>;
  last(count = 1) : Promise<T>;
  skip(count) : Readable;
  take(count) : Readable;
  skipWhile(test) : Readable;
  takeWhile(test) : Readable;
  flatten() : Readable;
  flattenArray() : Readable;
  until(Readable | Promise) : Readable;
  delay(ms) : Readable;
  toArray() : Promise<Array>;
  toPromise() : Promise<null>

  unique(modifier = _.identity) : Readable;
  accumulate(iterator, seed) : Readable;

  dispose() : null;
}
