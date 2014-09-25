// jshint strict:false
import { extend } from './utils';
import ReadableStream from 'readable/constructor';

import empty from './readable/static-empty.js';
import fromArray from './readable/static-from-array.js';
import fromEvent from './readable/static-from-event.js';
import fromPromise from './readable/static-from-promise.js';
import fromStream from './readable/static-from-stream.js';
import fromWritable from './readable/static-from-writable.js';
import from from './readable/static-from.js';
import interval from './readable/static-interval.js';
import merge from './readable/static-merge.js';
import noop from './readable/static-noop.js';
import range from './readable/static-range.js';
import repeat from './readable/static-repeat.js';
import single from './readable/static-single.js';
import _throw from './readable/static-throw.js';
import zip from './readable/static-zip.js';

import accumulate from './readable/accumulate.js';
import concat from './readable/concat.js';
import delay from './readable/delay.js';
import every from './readable/every.js';
import filter from './readable/filter.js';
import first from './readable/first.js';
import flatten from './readable/flatten.js';
import flattenArray from './readable/flatten-array.js';
import forEach from './readable/for-each.js';
import last from './readable/last.js';
import map from './readable/map.js';
import reduce from './readable/reduce.js';
import single from './readable/single.js';
import skip from './readable/skip.js';
import skipUntil from './readable/skip-until.js';
import some from './readable/some.js';
import take from './readable/take.js';
import takeUntil from './readable/take-until.js';
import toArray from './readable/to-array.js';
import toPromise from './readable/to-promise.js';
import unique from './readable/unique.js';
import until from './readable/until.js';
import zip from './readable/zip.js';

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
  single: single,
  throw: _throw,
  zip: zip,
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
  take: take,
  takeUntil: takeUntil,
  toArray: toArray,
  toPromise: toPromise,
  unique: unique,
  until: until,
  zip: zip,
});

export default ReadableStream;
