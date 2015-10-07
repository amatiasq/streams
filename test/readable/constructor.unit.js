import ReadableStream from '../../src/readable';
import { ok as assert } from 'assert';
import { object as isObject } from 'is';

describe('ReadableStream#constructor', function() {
  it('should create a new readable stream', function() {
    let sut = new ReadableStream();
    assert(isObject(sut), 'Returned value is not an object');
    assert(sut instanceof ReadableStream, 'Returned value is not instance of ReadableStream');
  });
});
