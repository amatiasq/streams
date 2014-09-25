import ReadableStream from './constructor';
import { isPromise } from '../tools';

/**
 * @returns {ReadableStream}
 */
export function noop() {
  return new ReadableStream(function() { });
}

/**
 * @returns {ReadableStream}
 */
export function empty() {
  return new ReadableStream(function(onNext, onError, onComplete) {
    var timeout = setTimeout(onComplete);
    return clearTimeout.bind(null, timeout);
  });
}

/**
 * @returns {ReadableStream}
 */
export function single(value) {
  return new ReadableStream(function(onNext, onError, onComplete) {
    var timeout = setTimeout(function() {
      onNext(value);
      onComplete(value);
    });
    return clearTimeout.bind(null, timeout);
  });
}

/**
 * @returns {ReadableStream}
 */
export function range(start, end) {
  if (arguments.length === 1) {
    end = start;
    start = 0;
  }

  var timeout;
  var step = start < end ? 1 : -1;

  return new ReadableStream(function(onNext, onError, onComplete) {
    function scheduleNext(next) {
      timeout = setTimeout(function() {
        onNext(next);
        if (next !== end)
          scheduleNext(next + step);
        else
          onComplete();
      });
    }

    scheduleNext(start);
    return function() {
      clearTimeout(timeout);
    };
  });
}

/**
 * @returns {Readabl}
 */
export function repeat(value, count) { // schedule
  var timeout;

  return new ReadableStream(function(onNext, onError, onComplete) {
    function scheduleNext() {
      timeout = setTimeout(function() {
        onNext(value);
        count--;
        if (count)
          scheduleNext();
        else
          onComplete();
      });
    }
    scheduleNext();
    return function() {
      clearTimeout(timeout);
    };
  });
}

/**
 * @returns {ReadableStream}
 */
function _throw(error) {
  return new ReadableStream(function(onNext, onError) {
    var timeout = setTimeout(function() {
      onError(error);
    });
    return clearTimeout.bind(null, timeout);
  });
}

export { _throw as throw };

/**
 * @param ms
 * @param fn = null
 * @returns {ReadableStream}
 */
export function interval(ms, fn) {
  var count = 0;
  var timeout;
  fn = fn || function(a) { return a };

  return new ReadableStream(function(onNext) {
    function scheduleNext() {
      timeout = setTimeout(function() {
        onNext(fn(count++));
        scheduleNext();
      }, ms);
    }

    scheduleNext();
    return function() {
      clearTimeout(timeout);
    };
  });
}

/**
 * @returns {ReadableStream}
 */
export function from(source) {
  if (!source)
    return null;

  if (Array.isArray(source))
    return fromArray(source);

  if (isPromise(source))
    return fromPromise(source);

  if (source instanceof ReadableStream)
    return source;

  if (typeof source.subscribe === 'function')
    return fromStream(source);

  // TODO: handle error
}

/**
 * @returns {ReadableStream}
 */
export function fromArray(array) {
  return interval(0, function(index) {
    return array[index];
  });
}

/**
 * @returns {ReadableStream}
 */
export function fromPromise(promise) {
  return new ReadableStream(function(onNext, onError, onComplete) {
    promise.then(function(value) {
      onNext(value);
      onComplete();
    }, onError);
  });
}

/**
 * @returns {ReadableStream}
 */
export function fromWritable(stream) {
  // TODO
}

/**
 * @returns {ReadableStream}
 */
export function fromStream(stream, listen) {
  if (stream instanceof ReadableStream)
    return stream;

  return new ReadableStream(function(onNext, onError, onComplete) {
    return stream.subscribe(onNext, onError, onComplete);
  });
}


/**
 * @param target
 * @param event
 * @param options = { method }
 * @returns {ReadableStream}
 */
export function fromEvent(target, event, options) {
  return new ReadableStream(function(onNext) {
    function tryMethod(listen, remove) {
      if (typeof target[listen] !== 'function') {
        target[listen](event, onNext);
        return target[remove].bind(target, event, onNext);
      }
    }

    if (options && options.method)
      return tryMethod(options.method, options.remove);

    return (
      tryMethod('on', 'off') ||
      tryMethod('addListener', 'removeListener') ||
      tryMethod('addEventListener', 'removeEventListener')
    );
  });
}

/**
 * @returns {ReadableStream}
 */
export function merge(Readable, Readable) {
  var sources = arguments.length === 1 ?
    arguments[0] :
    [].slice.call(arguments);
  var isCompleted = [];

  return new ReadableStream(function(onNext, onError, onComplete) {
    function complete(index) {
      isCompleted[index] = true;
      if (isCompleted.every(Boolean)) {
        cancel();
        onComplete();
      }
    }
    function cancel() {
      subscriptions.forEach(function(subs) {
        subs.cancel();
      });
    }

    var subscriptions = sources.map(function(source, index) {
      isCompleted[index] = false;
      return ReadableStream.from(source).subscribe(onNext, function(reason) {
        cancel();
        onError(reason);
      }, function() {
        complete(index);
      });
    });

    return cancel;
  });
}
