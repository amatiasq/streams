// jshint strict:false
import { extend } from './utils';
import ReadableStream from './readable/constructor';

import empty from './readable/static-empty';
import fromArray from './readable/static-from-array';
import fromEvent from './readable/static-from-event';
import fromPromise from './readable/static-from-promise';
import fromStream from './readable/static-from-stream';
import fromWritable from './readable/static-from-writable';
import from from './readable/static-from';
import interval from './readable/static-interval';
import merge from './readable/static-merge';
import noop from './readable/static-noop';
import range from './readable/static-range';
import repeat from './readable/static-repeat';
import staticSingle from './readable/static-single';
import _throw from './readable/static-throw';
import staticZip from './readable/static-zip';

import accumulate from './readable/accumulate';
import concat from './readable/concat';
import delay from './readable/delay';
import every from './readable/every';
import filter from './readable/filter';
import first from './readable/first';
import flatten from './readable/flatten';
import flattenArray from './readable/flatten-array';
import forEach from './readable/for-each';
import last from './readable/last';
import map from './readable/map';
import reduce from './readable/reduce';
import single from './readable/single';
import skip from './readable/skip';
import skipUntil from './readable/skip-until';
import some from './readable/some';
import subscribe from './readable/subscribe';
import take from './readable/take';
import takeUntil from './readable/take-until';
import toArray from './readable/to-array';
import toPromise from './readable/to-promise';
import unique from './readable/unique';
import until from './readable/until';
import zip from './readable/zip';

extend(ReadableStream, {
  empty: empty,
  fromArray: fromArray,
  fromEvent: fromEvent,
  fromPromise: fromPromise,
  fromStream: fromStream,
  fromWritable: fromWritable,
  from: from,
  interval: interval,
  merge: merge,
  noop: noop,
  range: range,
  repeat: repeat,
  single: staticSingle,
  throw: _throw,
  zip: staticZip,
});

extend(ReadableStream.prototype, {
  accumulate: accumulate,
  concat: concat,
  delay: delay,
  every: every,
  filter: filter,
  first: first,
  flatten: flatten,
  flattenArray: flattenArray,
  forEach: forEach,
  last: last,
  map: map,
  reduce: reduce,
  single: single,
  skip: skip,
  skipUntil: skipUntil,
  some: some,
  subscribe: subscribe,
  take: take,
  takeUntil: takeUntil,
  toArray: toArray,
  toPromise: toPromise,
  unique: unique,
  until: until,
  zip: zip,
});

export default ReadableStream;
