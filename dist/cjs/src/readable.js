"use strict";
// jshint strict:false
var extend = require("./utils").extend;
var ReadableStream = require("./readable/constructor")["default"];

var empty = require("./readable/static-empty")["default"];
var fromArray = require("./readable/static-from-array")["default"];
var fromEvent = require("./readable/static-from-event")["default"];
var fromPromise = require("./readable/static-from-promise")["default"];
var fromStream = require("./readable/static-from-stream")["default"];
var fromWritable = require("./readable/static-from-writable")["default"];
var from = require("./readable/static-from")["default"];
var interval = require("./readable/static-interval")["default"];
var merge = require("./readable/static-merge")["default"];
var noop = require("./readable/static-noop")["default"];
var range = require("./readable/static-range")["default"];
var repeat = require("./readable/static-repeat")["default"];
var staticSingle = require("./readable/static-single")["default"];
var _throw = require("./readable/static-throw")["default"];
var staticZip = require("./readable/static-zip")["default"];

var accumulate = require("./readable/accumulate")["default"];
var concat = require("./readable/concat")["default"];
var delay = require("./readable/delay")["default"];
var every = require("./readable/every")["default"];
var filter = require("./readable/filter")["default"];
var first = require("./readable/first")["default"];
var flatten = require("./readable/flatten")["default"];
var flattenArray = require("./readable/flatten-array")["default"];
var forEach = require("./readable/for-each")["default"];
var last = require("./readable/last")["default"];
var map = require("./readable/map")["default"];
var reduce = require("./readable/reduce")["default"];
var single = require("./readable/single")["default"];
var skip = require("./readable/skip")["default"];
var skipUntil = require("./readable/skip-until")["default"];
var some = require("./readable/some")["default"];
var subscribe = require("./readable/subscribe")["default"];
var take = require("./readable/take")["default"];
var takeUntil = require("./readable/take-until")["default"];
var toArray = require("./readable/to-array")["default"];
var toPromise = require("./readable/to-promise")["default"];
var unique = require("./readable/unique")["default"];
var until = require("./readable/until")["default"];
var zip = require("./readable/zip")["default"];

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

exports["default"] = ReadableStream;