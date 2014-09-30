"use strict";
var Subscription = require("../../src/subscription")["default"];
var ReadableStream = require("../../src/readable")["default"];
var assert = require("assert").ok;
var createSpy = require("sinon").spy;
var isObject = require("is").object;
var isFunction = require("is").fn;

describe('ReadableStream#subscribe', function() {
  var onNext = function() {};
  var onError = function() {};
  var onComplete = function() {};
  var spy, sut;

  beforeEach(function() {
    spy = createSpy();
    sut = new ReadableStream(spy);
  });

  describe('when invoked', function() {
    it('should invoke the callback we pass to the constructor', function() {
      assert(!spy.called, 'Callback was invoked before #subscribe was called');
      sut.subscribe();
      assert(spy.called, 'Callback was not invoked');
      assert(spy.calledOnce, 'Callback was invoked more than once');
    });

    it('should pass the listeners to the callback we pass to the constructor', function() {
      sut.subscribe(onNext, onError, onComplete);
      assert(spy.calledWithExactly(onNext, onError, onComplete));
    });
  });

  describe('return value', function() {
    it('should be a subscription object with cancel method', function() {
      var subscription = sut.subscribe(onNext, onError, onComplete);
      assert(isObject(subscription), 'Returned value is not an object');
      assert(isFunction(subscription.cancel), 'It has not cancel method');
    });

    describe('when .cancel invoked', function() {
      describe('if value returned by callback was a function', function() {
        it('should invoke the function returned by the callback we passed to the constructor', function() {
          var sut = new ReadableStream(function() { return spy });
          var subscription = sut.subscribe(onNext, onError, onComplete);
          assert(!spy.called, 'Function was invoked before .cancel was called');
          subscription.cancel();
          assert(spy.called, 'Function was not invoked');
          assert(spy.calledOnce, 'Function was invoked more than once');
        });
      });

      describe('if value returned by callback was a subscription object', function() {
        it('should invoke the function returned by the callback we passed to the constructor', function() {
          var fakeSubscription = new Subscription(spy);
          var sut = new ReadableStream(function() { return fakeSubscription });
          var subscription = sut.subscribe(onNext, onError, onComplete);
          assert(!spy.called, 'Subscription was cancelled before .cancel was called');
          subscription.cancel();
          assert(spy.called, 'Subscription was not cancelled');
          assert(spy.calledOnce, 'Subscription was cancelled more than once');
        });
      });
    });
  });
});