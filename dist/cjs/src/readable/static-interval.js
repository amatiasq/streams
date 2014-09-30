"use strict";
var ReadableStream = require("./constructor")["default"];
var immediate = require("../schedulers").immediate;

/**
 * Creates a infinite stream that will use `scheduler` to fire values. You can
 *   also provide a function to generate the values, otherwise the value will be
 *   the index.
 *
 * @example
 *   ReadableStream.interval().subscribe(...);
 *
 * @method ReadableStream.interval
 * @see {@link http://jsfiddle.net/amatiasq/4d63ytvh/|Fiddle example}
 *
 * @param [scheduler=Scheduler.immediate] {Scheduler} A scheduler to schedule
 *   values streaming. Defaults to {@link Schedulers.immediate}.
 * @param [valueGenerator] {Function} A function to generate the values to be
 *   sent.
 * @returns {ReadableStream} A stream that will emit a value returned by
 *   `valueGenerator` each time `scheduler` fires.
 */
exports["default"] = function interval(scheduler, fn) {
  var count = 0;
  var timeout;
  fn = fn || function(a) { return a };
  scheduler = scheduler || immediate;

  return new ReadableStream(function(onNext) {
    function scheduleNext() {
      timeout = scheduler(function() {
        scheduleNext();
        onNext(fn(count++));
      });
    }

    scheduleNext();
    return function() {
      scheduler.cancel(timeout);
    };
  });
}