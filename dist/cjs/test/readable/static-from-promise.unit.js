"use strict";
//jshint unused:false
/*global xdescribe*/

var ReadableStream = require("../../src/readable")["default"];
var FakePromise = require("../fake-promise")["default"];
var assert = require("assert").ok;
var createSpy = require("sinon").spy;

describe('ReadableStream.fromPromise', function() {
  var onNext, onError, onComplete, promise, sut;

  beforeEach(function() {
    onNext = createSpy();
    onError = createSpy();
    onComplete = createSpy();
    promise = new FakePromise();
    sut = ReadableStream.fromPromise(promise);
    sut.subscribe(onNext, onError, onComplete);
  });

  describe('when invoked with a non completed promise', function() {
    it('should not invoke any callback', function() {
      assert(!onNext.called, 'A value was received');
      assert(!onError.called, 'An error was received');
      assert(!onComplete.called, 'Stream was completed');
    });
  });

  describe('when invoked with rejected promise', function() {
    var error = {};
    beforeEach(function() {
      promise.reject(error);
    });

    it('should send an error', function() {
      assert(!onNext.called, 'Some value was received');
      assert(onError.called, 'No error was received');
      assert(onError.calledOnce, 'More than one error was received');
      assert(!onComplete.called, 'Stream was completed');
    });

    it('should pass the error object to the error callback', function() {
      assert(onError.calledWithExactly(error), 'The error object was not passed');
    });
  });

  describe('when invoked with a resolved promise', function() {
    var value = {};
    beforeEach(function() {
      promise.resolve(value);
    });

    it('should not send any error', function() {
      assert(!onError.called, 'An error was received');
    });

    it('should complete the stream.', function() {
      assert(onComplete.called, 'Stream was not completed');
    });

    it('should stream the promise\'s value', function() {
      assert(onNext.called, 'No value was received');
      assert(onNext.calledOnce, 'More than one value was received');
      assert(onNext.calledWithExactly(value), 'The value was not passed');
    });
  });
});