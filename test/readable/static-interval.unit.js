//jshint unused:false

import ReadableStream from '../../src/readable';
import TestScheduler from '../test-scheduler';
import { ok as assert } from 'assert';
import { spy as createSpy } from 'sinon';
import {
  object as isObject,
  fn as isFunction
} from 'is';

describe('ReadableStream.interval', function() {
  var onNext, onError, onComplete, scheduler, sut;

  function testNotFinished() {
    assert(!onError.called, 'A error was received');
    assert(!onComplete.called, 'Stream was completed');
  }

  beforeEach(function() {
    onNext = createSpy();
    onError = createSpy();
    onComplete = createSpy();
    scheduler = new TestScheduler();
    sut = ReadableStream.interval(scheduler);
    sut.subscribe(onNext, onError, onComplete);
  });

  afterEach(testNotFinished);

  describe('when scheduler is not fired', function() {
    it('should not invoke any callback', function() {
      assert(!onNext.called, 'Some value was received');
    });
  });

  describe('and scheduler is fired once', function() {
    it('should return an stream with one value', function() {
      scheduler.flush();
      assert(onNext.called, 'No value was received');
      assert(onNext.calledOnce, 'More than one value was received');
    });

    it('should invoke `onNext` with 0 as value', function() {
      scheduler.flush();
      assert(onNext.calledWithExactly(0), 'Other value was passed');
    });
  });

  describe('and scheduler is fired twice', function() {
    it('should return an stream with two values', function() {
      scheduler.flush();
      scheduler.flush();
      assert(onNext.called, 'No value was received');
      assert(!onNext.calledOnce, 'Only one value was received');
      assert(onNext.calledTwice, 'More than two values were received');
    });

    it('should invoke `onNext` with 0 and 1 as value', function() {
      scheduler.flush();
      scheduler.flush();
      assert(onNext.withArgs(0).called, 'No 0 was passed');
      assert(onNext.withArgs(1).called, 'No 1 was passed');
    });
  });

  describe('with generator function', function() {

  });
});
