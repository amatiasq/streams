"use strict";
var ReadableStream = require("./constructor")["default"];
var interval = require("./static-interval")["default"];

/**
 * It returns a {@link ReadableStream} that will start streaming the array items
 *   when someone subscribes to it. Stream flow can be defined using a
 *   {@link Scheduler} function.
 *
 * @method ReadableStream.fromArray
 * @see {@link http://jsfiddle.net/amatiasq/hL26kwhd/|Fiddle example}
 * @todo Improve `scheduler` description
 *
 * @param array {Array} Any array-like object (must have `.lenght` and index
 *   accessors).
 * @param [scheduler=Scheduler.immediate] {Scheduler} The scheduler to schedule
 *   the items streaming.
 * @returns {ReadableStream} A stream that will emit the array values at the
 *   rithm of `scheduler`.
 */
exports["default"] = function fromArray(array, scheduler) {
  var flow = interval(scheduler);

  return new ReadableStream(function(onNext, onError, onComplete) {
    if (!array.length) {
      scheduler(onComplete);
      return;
    }

    var subscription = flow.subscribe(function(index) {
      onNext(array[index]);
      if (index + 1 === array.length)
        end();
    }, onError, onComplete);

    function end() {
      subscription.cancel();
      onComplete();
    }

    return end;
  });
}