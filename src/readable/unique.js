// jshint ignore:start
import ReadableStream from './constructor';

/**
 * @param {Function} modifier
 * @returns {ReadableStream}
 */
export default function unique(modifier) {
  modifier = modifier || function(a) { return a };
  var self = this;

  // TODO
  throw new Error('Not implemented');
  return new ReadableStream(function(onNext, onError, onComplete) {
    var subscription = self.subscribe(function(value) {

    }, onError, onComplete)
  });
}
