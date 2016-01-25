// This file is just to keep track of not-included array methods

interface Array implements ~ISyncCollection {
  // Mutates collection
  pop() : Object;
  shift() : Object;
  push(...value : Object) : Number;
  unshift(...value : Object) : Number;
  splice(start : Number, deleteCount : Number, ...value : Object = null) : Array;

  // can be useful async
  findIndex(test : TestIterator) : Number;
  indexOf(search : Object, fromIndex : Number = 0) : Number;
}
