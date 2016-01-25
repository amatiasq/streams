define(require => {
  let { es6class } = require('./utils');

  return es6class(require('./readable/constructor'), {

  }, {
    subscribe: require('./readable/subscribe'),
  });

  // let empty = require('./readable/static-empty');
  // let fromArray = require('./readable/static-from-array');
  // let fromEvent = require('./readable/static-from-event');
  // let fromPromise = require('./readable/static-from-promise');
  // let fromStream = require('./readable/static-from-stream');
  // let fromWritable = require('./readable/static-from-writable');
  // let _from = require('./readable/static-from');
  // let interval = require('./readable/static-interval');
  // let merge = require('./readable/static-merge');
  // let noop = require('./readable/static-noop');
  // let range = require('./readable/static-range');
  // let repeat = require('./readable/static-repeat');
  // let staticSingle = require('./readable/static-single');
  // let _throw = require('./readable/static-throw');
  // let staticZip = require('./readable/static-zip');

  // let accumulate = require('./readable/accumulate');
  // let concat = require('./readable/concat');
  // let delay = require('./readable/delay');
  // let every = require('./readable/every');
  // let filter = require('./readable/filter');
  // let first = require('./readable/first');
  // let flatten = require('./readable/flatten');
  // let flattenArray = require('./readable/flatten-array');
  // let forEach = require('./readable/for-each');
  // let last = require('./readable/last');
  // let map = require('./readable/map');
  // let reduce = require('./readable/reduce');
  // let single = require('./readable/single');
  // let skip = require('./readable/skip');
  // let skipUntil = require('./readable/skip-until');
  // let some = require('./readable/some');
  // let subscribe = require('./readable/subscribe');
  // let take = require('./readable/take');
  // let takeUntil = require('./readable/take-until');
  // let toArray = require('./readable/to-array');
  // let toPromise = require('./readable/to-promise');
  // let unique = require('./readable/unique');
  // let until = require('./readable/until');
  // let zip = require('./readable/zip';}));


  Object.assign(ReadableStream, {
    // empty,
    // fromArray,
    // fromEvent,
    // fromPromise,
    // fromStream,
    // fromWritable,
    // from: _from,
    // interval,
    // merge,
    // noop,
    // range,
    // repeat,
    // single: staticSingle,
    // throw: _throw,
    // zip: staticZip,
  });

  Object.assign(ReadableStream.prototype, {
    // accumulate,
    // concat,
    // delay,
    // every,
    // filter,
    // first,
    // flatten,
    // flattenArray,
    // forEach,
    // last,
    // map,
    // reduce,
    // single,
    // skip,
    // skipUntil,
    // some,
    // subscribe,
    // take,
    // takeUntil,
    // toArray,
    // toPromise,
    // unique,
    // until,
    // zip,
  });

  return ReadableStream;
});
