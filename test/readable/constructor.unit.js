import ReadableStream from '../../src/readable';
import { ok as assert } from 'assert';
import { spy as createSpy } from 'sinon';

describe('ReadableStream#constructor', function() {
  it('should create a new readable stream', function() {
    var sut = new ReadableStream();
    assert(sut !== null, 'Constructor returned null');
    assert(typeof sut === 'object', 'Constructor returned a non-object value');
    assert(sut instanceof ReadableStream, 'Returned value is not instance of ReadableStream');
  });
});

describe('ReadableStream#subscribe', function() {
  it('should invoke the callback we pass to the constructor when invoked', function() {
    var spy = createSpy();
    var sut = new ReadableStream(spy);
    assert(!spy.called, 'Callback was invoked before #subscribe was called');
    sut.subscribe();
    assert(spy.called, 'Callback was not invoked');
    assert(spy.calledOnce, 'Callback was invoked more than once');
  });
});
