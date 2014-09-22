import ReadableStream from './constructor';
import {
  NonSingleValueStreamError
} from '../errors';

/**
 * Returns a promise with the only value for this stream, if the stream has more
 *  than one item or no item the returned promise will fail.
 *
 * @throws {NonSingleValueStreamError}
 * @returns {Promise<T>} A promise with the only value of this stream
 */
export function single() {
  var self = this;
  return new Promise(function(resolve, reject) {
    var valueReceipt = false;
    var value;

    self.subscribe(function(val) {
      if (valueReceipt)
        reject(new NonSingleValueStreamError());

      valueReceipt = true;
      value = val;
    }, reject, function() {
      if (valueReceipt)
        resolve(value);
      reject(new NonSingleValueStreamError())
    });
  });
};

/**
 * Returns a promise with the first N items of this stream.
 *
 * @param {Number} count A positive integer - The number of items to collect.
 * @returns {Promise<Array<T>>}
 */
export function first(count) {
  count = count || 1;
  var self = this;
  var values = [];

  return new Promise(function(resolve, reject) {
    var subscription = self.subscribe(function(value) {
      values.push(value);
      if (values.length === count) {
        resolve(values);
        subscription.cancel();
      }
    }, reject, function() {
      resolve(values);
    });
  });
};

/**
 * Returns a promise with the last N items of this stream.
 *
 * @param {Number} count A positive integer - The number of items to collect.
 * @returns {Promise<Array<T>>}
 */
export function last(count) {
  count = count || 1;
  var self = this;
  var values = [];

  return new Promise(function(resolve, reject) {
    self.subscribe(function(value) {
      values.push(value);
      if (values.length >= count)
        values.shift();
    }, reject, function() {
      resolve(values);
    });
  });
};

/**
 * Returns a stream which will stream the first N items of this stream.
 *  It will complete after this items are sent.
 *
 * @param {Number} count A positive integer - The number of items to collect.
 * @returns {ReadableStream<T>}
 */
export function take(count) {
  var self = this;
  var remaining = count;

  //if (remaining <= 0)
  //  return ReadableStream.empty();

  return new ReadableStream(function(onNext, onError, onComplete) {
    var subscription = self.subscribe(function(value) {
      onNext(value);
      remaining--;
      if (remaining === 0) {
        onComplete();
        subscription.cancel();
      }
    }, onError, onComplete);
  });
};

/**
 * Returns a stream which will stream all but the first N items of this stream.
 *
 * @param {Number} count A positive integer - The number of items to skip.
 * @returns {ReadableStream<T>}
 */
export function skip(count) {
  var self = this;
  var remaining = count;

  return new ReadableStream(function(onNext, onError, onComplete) {
    var subscription = self.subscribe(function(value) {
      if (remaining > 0)
        remaining--;
      else
        onNext(value);
    }, onError, onComplete);
  });
};

/**
 * This function can receive a Promise, a Stream or a function.
 *
 * - If the argument is a Promise it will return a new stream echoing the values
 *  of this stream to be completed or rejected with the promise, no values will
 *  be sent after that.
 *
 * - If the argument is a Stream it will return a new stream echoing the values
 *  of this stream to be completed when the first value of the argument is
 *  receipt, no values will be sent after that.
 *
 * - If the argument is a function it will return a new stream that will invoke
 *  echoing the function on every value and will echo the value while the
 *  function returns falsy, when the function returns thruthy the stream will be
 *  completed.
 *
 * @param {Promise|Stream|Function} value
 * @param {Object} context In case `value` is a function this will be it's
 *  context
 * @returns {ReadableStream}
 */
export function takeUntil(value, context) {
  if (typeof value === 'function')
    return takeUntil_function(this, value, context);
  if (typeof value.then === 'function')
    return takeUntil_promise(this, value);
  return takeUntil_stream(this, value);
};

function takeUntil_function(self, test, context) {
  return new ReadableStream(function(onNext, onError, onComplete) {
    var subscription = self.subscribe(function(value) {
      if (test.call(context, value)) {
        onComplete();
        subscription.cancel();
      } else
        onNext(value);
    }, onError, onComplete);
  });
}

function takeUntil_promise(self, promise) {
  return new ReadableStream(function(onNext, onError, onComplete) {
    var subscription = self.subscribe(onNext, onError, onComplete);
    promise
      .then(subscription.cancel, subscription.cancel)
      .then(onComplete, onError);
  });
}

function takeUntil_stream(self, stream) {
  return new ReadableStream(function(onNext, onError, onComplete) {
    var subscription = self.subscribe(onNext, onError, onComplete);

    function end() {
      secondSubscription.cancel();
      subscirption.cancel();
      onComplete();
    }

    var secondSubscription = stream.subscribe(end, function(error) {
      subscription.cancel();
      onError(error);
    }, end);
  });
}

/**
 * This function can receive a Promise, a Stream or a function.
 *
 * - If the argument is a Promise it will return a new stream that will echo the
 *  values of this stream when the promise is completed, if the promise is
 *  rejected the returned stream will send an error.
 *
 * - If the argument is a Stream it will return a new stream that will echo the
 *  values of this stream when the first value of the argument is receipt.
 *
 * - If the argument is a function it will return a new stream that will invoke
 *  echoing the function on every value and will start to echo the value if the
 *  function returns thruthy.
 *
 * @param {Promise|Stream|Function} value
 * @param {Object} context In case `value` is a function this will be it's
 *  context
 * @returns {ReadableStream}
 */
export function skipUntil(value, context) {
  if (typeof value === 'function')
    return takeUntil_function(this, value, context);
  if (typeof value.then === 'function')
    return takeUntil_promise(this, value);
  return takeUntil_stream(this, value);
};

function skipUntil_function(self, test, context) {
  var enabled = false;

  return new ReadableStream(function(onNext, onError, onComplete) {
    self.subscribe(function(value) {
      if (!enabled && test.call(context, value))
        enabled = true;

      if (enabled)
        onNext(value);
    }, onError, onComplete);
  });
}

function skipUntil_promise(self, promise) {
  return new ReadableStream(function(onNext, onError, onComplete) {
    promise.then(function() {
      self.subscribe(onNext, onError, onComplete);
    }, onError);
  });
}

function skipUntil_stream(self, stream) {
  return new ReadableStream(function(onNext, onError, onComplete) {
    var subscription = stream.subscribe(start, onError, start);

    function start() {
      subscription.cancel();
      self.subscribe(onNext, onError, onComplete);
    }
  });
}

/** Alias for {#takeUntil} */
export { until: takeUntil };
