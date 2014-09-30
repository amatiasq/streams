"use strict";

function TestScheduler() {
  var queue = [];

  function schedule(fn) {
    queue.push(fn);
    return fn;
  }

  function cancel(fn) {
    var index = queue.indexOf(fn);
    if (index === -1) return;
    queue.splice(index, 1);
  }

  function flush() {
    var _queue = queue;
    queue = [];
    _queue.forEach(function(fn) { fn() });
  }

  schedule.cancel = cancel;
  schedule.flush = flush;
  return schedule;
}

exports["default"] = TestScheduler;