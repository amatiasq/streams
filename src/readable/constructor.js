export default function ReadableStream(subscribe) {
  this._subscribe = subscribe;
}

ReadableStream.prototype.subscribe = function(onNext, onError, onComplete) {
  this._subscribe(onNext, onError, onComplete);
};
