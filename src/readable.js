// jshint strict:false
import { extend } from './utils';
import ReadableStream from 'readable/constructor';

import {
  forEach,
  map,
  filter,
  some,
  every,
  reduce,
  concat
} from './readable/array-extras';

import {
  single,
  first,
  last,
  take,
  skip,
  takeUntil,
  skipUntil,
  until
} from './readable/slicing';

import {
  flatten,
  flattenArray,
  delay,
  unique,
  accumulate,
  toArray,
  toPromise,
  dispose
} from './readable/methods';


extend(ReadableStream.prototype, {
  forEach: forEach,
  map: map,
  filter: filter,
  some: some,
  every: every,
  reduce: reduce,
  concat: concat,

  single: single,
  first: first,
  last: last,
  take: take,
  skip: skip,
  takeUntil: takeUntil,
  skipUntil: skipUntil,
  until: until,

  flatten: flatten,
  flattenArray: flattenArray,
  delay: delay,
  unique: unique,
  accumulate: accumulate,
  toArray: toArray,
  toPromise: toPromise,
  dispose: dispose,
});


export default ReadableStream;
