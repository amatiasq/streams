import ReadableStream from '../../src/readable';
import TestScheduler from '../test-scheduler';
import { ok as assert } from 'assert';
import { spy as createSpy } from 'sinon';

describe('ReadableStream#accumulate', function() {
  var onNext, onError, onComplete, scheduler;

  beforeEach(function() {
    onNext = createSpy();
    onError = createSpy();
    onComplete = createSpy();
    scheduler = new TestScheduler();
  });

  describe('when invoked without initial value', function() {
    var sut;
    beforeEach(function() {
      sut = ReadableStream.fromArray([ 1, 2, 3 ], scheduler);
    });

    describe('and not initial value is provided', function() {
      it('it should invoke accumulator with 2 first values', function() {
        var spy = createSpy();
        sut.accumulate(spy).subscribe(onNext, onError, onComplete);
        scheduler.flush();
        scheduler.flush();
        assert(spy.called, 'Accumulator was not invoked');
        assert(spy.calledWith(1, 2), 'Accumulator was invoked with different values');
      });
    });
  });

  // TODO: add more cases
});
