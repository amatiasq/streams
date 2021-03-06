import ReadableStream from './constructor';

/**
 * @param {ReadableStream} stream
 * @returns {ReadableStream}
 */
export default function concat(stream) {
  var self = this;
  var subscr1, subscr2;

  return new ReadableStream(function(onNext, onError, onComplete) {
    subscr1 = self.subscribe(onNext, onError, function() {
      subscr2 = stream.subscribe(onNext, onError, onComplete);
    });

    return function() {
      subscr1.cancel();
      if (subscr2)
        subscr2.cancel();
    };
  });
}
