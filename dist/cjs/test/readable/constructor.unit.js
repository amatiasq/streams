"use strict";
var ReadableStream = require("../../src/readable")["default"];
var assert = require("assert").ok;
var isObject = require("is").object;

describe('ReadableStream#constructor', function() {
  it('should create a new readable stream', function() {
    var sut = new ReadableStream();
    assert(isObject(sut), 'Returned value is not an object');
    assert(sut instanceof ReadableStream, 'Returned value is not instance of ReadableStream');
  });
});