import ReadableStream from '../../src/readable';
import TestScheduler from '../test-scheduler';
import { ok as assert } from 'assert';
import { spy as createSpy } from 'sinon';

describe('ReadableStream.fromArray', function() {
  var onNext, onError, onComplete, scheduler;

  beforeEach(function() {
    onNext = createSpy();
    onError = createSpy();
    onComplete = createSpy();
    scheduler = new TestScheduler();
  });

  describe('when invoked with empty array', function() {
    var sut;
    beforeEach(function() {
      sut = ReadableStream.fromArray([], scheduler);
      sut.subscribe(onNext, onError, onComplete);
    });

    describe('and scheduler is not fired', function() {
      it('should not invoke any callback', function() {
        assert(!onNext.called, 'Some value was received');
        assert(!onError.called, 'A error was received');
        assert(!onComplete.called, 'Stream was completed');
      });
    });

    describe('and scheduler is fired', function() {
      it('should return an stream to be completed', function() {
        scheduler.flush();
        assert(!onNext.called, 'Some value was received');
        assert(!onError.called, 'A error was received');
        assert(onComplete.called, 'Stream was not completed');
      });
    });
  });

  describe('when invoked with an array with values', function() {
    var values = [{}, {}];
    var sut;
    beforeEach(function() {
      sut = ReadableStream.fromArray(values, scheduler);
      sut.subscribe(onNext, onError, onComplete);
    });

    describe('and scheduler is flushed once', function() {
      it('should invoke onNext callback with the first array item', function() {
        scheduler.flush();
        assert(onNext.called, 'No value was received');
        assert(onNext.calledOnce, 'More than one value was received');
        assert(onNext.calledWithExactly(values[0]), 'Value was not array\'s first item');
        assert(!onError.called, 'A error was received');
        assert(!onComplete.called, 'Stream was completed');
      });
    });

    describe('and the scheduler is flushed as many times as items are in the array', function() {
      it('should invoke onNext function that many times and invoke onComplete with the last item', function() {
        scheduler.flush();
        assert(onNext.called, 'No value was received');
        assert(onNext.calledOnce, 'More than one value was received');

        scheduler.flush();
        assert(!onNext.calledOnce, 'No value received for second call');
        assert(onNext.calledTwice, 'More than one value was received for second call');
        assert(!onError.called, 'A error was received');
        assert(onComplete.called, 'Stream was not completed');
      });
    });

    describe('and the scheduler is flushed more times than items are in the array', function() {
      it('should invoke onNext as many times as items are in the array', function() {
        /* eslint space-in-parens:1 */
        for (var i = values.length + 1; i--; )
          scheduler.flush();

        assert(onNext.callCount === values.length, 'It was called more times');
      });
    });
  });
});
