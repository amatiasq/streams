import ReadableStream from '../../src/readable';
import TestScheduler from '../test-scheduler';
import { ok as assert } from 'assert';
import { spy as createSpy } from 'sinon';

describe('ReadableStream.interval', function() {
  var onNext, onError, onComplete, scheduler;

  function testNotFinished() {
    assert(!onError.called, 'A error was received');
    assert(!onComplete.called, 'Stream was completed');
  }

  beforeEach(function() {
    onNext = createSpy();
    onError = createSpy();
    onComplete = createSpy();
    scheduler = new TestScheduler();
  });

  afterEach(testNotFinished);

  describe('without value generator function', function() {
    var sut, subscription;
    beforeEach(function() {
      sut = ReadableStream.interval(scheduler);
      subscription = sut.subscribe(onNext, onError, onComplete);
    });

    describe('when scheduler is not fired', function() {
      it('should not invoke any callback', function() {
        assert(!onNext.called, 'Some value was received');
      });
    });

    describe('when scheduler is fired once', function() {
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

    describe('when scheduler is fired twice', function() {
      beforeEach(function() {
        scheduler.flush();
        scheduler.flush();
      });

      it('should return an stream with two values', function() {
        assert(onNext.called, 'No value was received');
        assert(!onNext.calledOnce, 'Only one value was received');
        assert(onNext.calledTwice, 'More than two values were received');
      });

      it('should invoke `onNext` with 0 and 1 as value', function() {
        assert(onNext.withArgs(0).called, 'No 0 was passed');
        assert(onNext.withArgs(1).called, 'No 1 was passed');
      });

      describe('and subscription is cancelled', function() {
        describe('and scheduler is fired one more time', function() {
          it('shouldn\'t invoke `onNext` again', function() {
            subscription.cancel();
            scheduler.flush();
            assert(onNext.calledTwice, 'More than two values were received');
          });
        });
      });
    });
  });

  describe('with value generator function', function() {
    function generator(index) { return values[index] }
    var values = [ {}, [] ];
    var sut;
    beforeEach(function() {
      sut = ReadableStream.interval(scheduler, generator);
      sut.subscribe(onNext, onError, onComplete);
    });

    describe('and scheduler is flushed once', function() {
      it('should stream the first value returned by iterator', function() {
        scheduler.flush();
        assert(onNext.called, 'No value was passed');
        assert(onNext.calledOnce, 'More than one value was passed');
        assert(onNext.calledWithExactly(values[0]), 'Other value was passed');
      });
    });

    describe('and scheduler is fired twice', function() {
      it('should stream the first two values returned by iterator', function() {
        scheduler.flush();
        scheduler.flush();
        assert(onNext.called, 'No value was passed');
        assert(!onNext.calledOnce, 'Only one value was passed');
        assert(onNext.calledTwice, 'More than two values were passed');
        assert(onNext.withArgs(values[1]).called, 'Other value was passed');
        assert(onNext.withArgs(values[1]).calledOnce, 'It was  value was passed');
      });
    });
  });
});
