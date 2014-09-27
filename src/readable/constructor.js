import { isFunction } from '../utils';

/*globals ReadableStream */
function ReadableStream(subscribe) {
  this._subscribe = subscribe;
}

ReadableStream.prototype.subscribe = function(onNext, onError, onComplete) {
  var cancellation = this._subscribe(onNext, onError, onComplete);

  function cancel() {
    if (isFunction(cancellation))
      cancellation();
    else if (isFunction(cancellation.cancel))
      cancellation.cancel();
  }

  return { cancel: cancel };
};

export default ReadableStream;
