// jshint ignore:start
import ReadableStream from './constructor';

/**
 * @param {Function} modifier
 * @returns {ReadableStream}
 */
export default function unique(modifier = a => a) {
  throw new Error('Not implemented');

  return new ReadableStream(function(push, fail, complete) {
    return this.subscribe(onNext, fail, complete);

    function onNext(value) {
      // TODO
    }
  });
}
