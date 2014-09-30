"use strict";

function FakePromise() {
  this.queue = [];
}

FakePromise.prototype.then = function(onSuccess, onError) {
  this.queue.push([ onSuccess, onError ]);
};

FakePromise.prototype.invoke = function(index, arg) {
  var queue = this.queue;
  this.queue = [];
  queue
    .map(function(a) { return a[index] })
    .filter(Boolean)
    .forEach(function(fn) { fn(arg) });
};

FakePromise.prototype.resolve = function(value) {
  this.invoke(0, value);
};

FakePromise.prototype.reject = function(reason) {
  this.invoke(1, reason);
};

exports["default"] = FakePromise;