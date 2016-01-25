declare var Value<T> = T | Promise<T>;

interface Iterator<T> {
  (entry : T, index : Number, collection : ICollection<T>) : void;
}

interface TestIterator<T> {
  (entry : T, index : Number, collection : ICollection<T>) : Boolean;
}

interface MapIterator<T, Y> {
  (entry : T, index : Number, collection : ICollection<T>) : Y;
}

interface ReduceIterator<T, Y> {
  (result : Y, entry : T, index : Number, collection : ICollection<T>) : Y;
}

interface CompareIterator<T> {
  (a : T, b : T) : Number;
}

