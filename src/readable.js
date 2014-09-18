// jshint node:true, strict:false

var extend = require('./utils').extend;

function delegate(context, fn) {
}


function ReadableStream(subscribe) {
  this._subscribe = subscribe;
}

extend(ReadableStream.prototype, {

  _delegate: function(onNext) {
    var self = this;
    return new ReadableStream(function(onNext, onError, onComplete) {
      return self.subscribe(onNext.bind(self), onError, onComplete)
    });
  },

  /**
   * @returns {Promise<null>} A promise to be rejected if the stream throws an
   *   error or to be resolved when the stream is completed.
   */
  forEach: function(iterator, context) {
    var self = this;
    var count = 0;
    return new Promise(function(resolve, reject) {
      return self.subscribe(function(value) {
        iterator.call(context, value, count++, self);
      }, reject, resolve);
    });
  }

  map: function(iterator, context) {
    var count = 0;
    return this._delegate(function(value) {
      var result
      try {
          result = iterator.call(context, value, count++, self);
      } catch (exception) {
          onError(exception);
          return;
      }
      onNext(result);
    });
  },

  filter: function(test, context) {
    var count = 0;
    return this._delegate(function(value) {

    });
  }

});

  forEach(iterator) : null;
  map(iterator) : Readable;
  filter(test) : Readable;
  reduce(iterator, seed) : Promise<T>;
  some(test) : Promise<bool>;
  every(test) : Promise<bool>;
  concat(Readable) : Readable
