(function() {
    "use strict";
    function $$utils$$extend(target) {
      [].slice.call(arguments, 1).forEach(function(source) {
        Object.keys(source).forEach(function(key) {
          target[key] = source[key];
        });
      });
    }

    function $$utils$$isFunction(object) {
      return typeof object === 'function';
    }

    function $$utils$$isPromise(object) {
      return object && $$utils$$isFunction(object.then);
    }

    function $$utils$$identity(value) {
      return value;
    }
    function $$readable$constructor$$ReadableStream(onSubscribe) {
      this._subscribe = onSubscribe;
    }

    // DEBUG ONLY
    $$readable$constructor$$ReadableStream.prototype.log = function(prefix) {
      prefix = prefix || '[STREAM-LOGGER]';
      var log = console.log.bind(console, prefix);
      return this.subscribe(
        log.bind(null, '[value]'),
        log.bind(null, '[error]'),
        log.bind(null, '[completed]')
      );
    };

    var $$readable$constructor$$default = $$readable$constructor$$ReadableStream;

    var $$readable$static$empty$$default = function empty() {
      return new $$readable$constructor$$default(function(onNext, onError, onComplete) {
        var timeout = setTimeout(onComplete);
        return clearTimeout.bind(null, timeout);
      });
    };

    function $$$schedulers$$delay(ms, fn) {
      return setTimeout(fn, ms);
    }
    $$$schedulers$$delay.cancel = function(id) {
      clearTimeout(id);
    };

    var $$$schedulers$$immediate = $$$schedulers$$delay.bind(null, 0);
    $$$schedulers$$immediate.cancel = $$$schedulers$$delay.cancel;

    var $$readable$static$interval$$default = function interval(scheduler, fn) {
      var count = 0;
      var timeout;
      fn = fn || function(a) { return a };
      scheduler = scheduler || $$$schedulers$$immediate;

      return new $$readable$constructor$$default(function(onNext) {
        function scheduleNext() {
          timeout = scheduler(function() {
            scheduleNext();
            onNext(fn(count++));
          });
        }

        scheduleNext();
        return function() {
          scheduler.cancel(timeout);
        };
      });
    };

    var $$readable$static$from$array$$default = function fromArray(array, scheduler) {
      var flow = $$readable$static$interval$$default(scheduler);

      return new $$readable$constructor$$default(function(onNext, onError, onComplete) {
        if (!array.length) {
          scheduler(onComplete);
          return;
        }

        var subscription = flow.subscribe(function(index) {
          onNext(array[index]);
          if (index + 1 === array.length)
            end();
        }, onError, onComplete);

        function end() {
          subscription.cancel();
          onComplete();
        }

        return end;
      });
    };

    var $$readable$static$from$event$$default = function fromEvent(target, event, options) {
      return new $$readable$constructor$$default(function(onNext) {
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
    };

    var $$readable$static$from$promise$$default = function fromPromise(promise) {
      return new $$readable$constructor$$default(function(onNext, onError, onComplete) {
        promise.then(function(value) {
          onNext(value);
          onComplete();
        }, onError);
      });
    };

    var $$readable$static$from$stream$$default = function fromStream(stream) {
      if (stream instanceof $$readable$constructor$$default)
        return stream;

      return new $$readable$constructor$$default(function(onNext, onError, onComplete) {
        return stream.subscribe(onNext, onError, onComplete);
      });
    };

    var $$readable$static$from$writable$$default = function fromWritable(stream) {
      // TODO
    };

    var $$readable$static$from$$default = function from(source) {
      if (!source)
        return null;

      if (Array.isArray(source))
        return $$readable$static$from$array$$default(source);

      if ($$utils$$isPromise(source))
        return $$readable$static$from$promise$$default(source);

      if (source instanceof $$readable$constructor$$default)
        return source;

      if (typeof source.subscribe === 'function')
        return $$readable$static$from$stream$$default(source);

      // TODO: handle error
    };

    var $$readable$static$merge$$default = function merge(/* ...sources */) {
      var sources = arguments.length === 1 ?
        arguments[0] :
        [].slice.call(arguments);
      var isCompleted = [];

      return new $$readable$constructor$$default(function(onNext, onError, onComplete) {
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
          return $$readable$constructor$$default.from(source).subscribe(onNext, function(reason) {
            cancel();
            onError(reason);
          }, function() {
            complete(index);
          });
        });

        return cancel;
      });
    };

    var $$readable$static$noop$$default = function noop() {
      return new $$readable$constructor$$default(function() { });
    };

    var $$readable$static$range$$default = function range(start, end) {
      if (arguments.length === 1) {
        end = start;
        start = 0;
      }

      var timeout;
      var step = start < end ? 1 : -1;

      return new $$readable$constructor$$default(function(onNext, onError, onComplete) {
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
    };

    var $$readable$static$repeat$$default = function repeat(value, count) { // schedule
      var timeout;

      return new $$readable$constructor$$default(function(onNext, onError, onComplete) {
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
    };

    var $$readable$static$single$$default = function single(value) {
      return new $$readable$constructor$$default(function(onNext, onError, onComplete) {
        var timeout = setTimeout(function() {
          onNext(value);
          onComplete(value);
        });
        return clearTimeout.bind(null, timeout);
      });
    };

    var $$readable$static$throw$$default = function _throw(error) {
      return new $$readable$constructor$$default(function(onNext, onError) {
        var timeout = setTimeout(function() {
          onError(error);
        });
        return clearTimeout.bind(null, timeout);
      });
    };

    var $$readable$static$zip$$default = function zip(/* ...sources, mapper*/) {
      var sources = [].slice.call(sources);
      var mapper = sources.pop();
      var queues = [];
      var isCompleted = [];

      return new $$readable$constructor$$default(function(onNext, onError, onComplete) {

        function cancel() {
          subscriptions
            .filter(Boolean)
            .forEach(function(a) { a.cancel() });
        }

        var subscriptions = sources.map(function(source, index) {
          queues[index] = [];
          isCompleted[index] = false;

          function onNextSingle(value) {
            queues[index].push(value);
            if (queues.every(function(q) { return q.length > 0 })) {
              var values = queues.map(function(q) { return q.shift() });
              onNext(mapper.apply(null, values));
            }
          }
          function onErrorSingle(reason) {
            cancel();
            onError(reason);
          }
          function onCompleteSingle() {
            isCompleted[index] = true;
            if (isCompleted.every(Boolean)) {
              cancel();
              onComplete();
            }
          }

          if (source instanceof $$readable$constructor$$default)
            return source.subscribe(onNextSingle, onErrorSingle, onCompleteSingle);

          if ($$utils$$isPromise(source)) {
            source.then(function(value) {
              onNextSingle(value);
              onCompleteSingle();
            }, onErrorSingle);
            return;
          }

          if (Array.isArray(source)) {
            setTimeout(function() {
              source.forEach(onNextSingle);
              onCompleteSingle();
            });
          }

          // TODO throw error unknown source type
        });

        return cancel;
      });
    };

    var $$readable$accumulate$$default = function accumulate(iterator, initialValue) {
      var self = this;
      var count = 0;
      var accumulated = initialValue || null;

      return new $$readable$constructor$$default(function(onNext, onError, onComplete) {
        return self.subscribe(function(value) {
          accumulated = count === 0 && !accumulated ?
            value :
            iterator(accumulated, value, count++, self);
          onNext(accumulated);
        }, onError, onComplete);
      });
    };

    var $$readable$concat$$default = function concat(stream) {
      var self = this;
      var subscr1, subscr2;

      return new $$readable$constructor$$default(function(onNext, onError, onComplete) {
        subscr1 = self.subscribe(onNext, onError, function() {
          subscr2 = stream.subscribe(onNext, onError, onComplete);
        });

        return function() {
          subscr1.cancel();
          if (subscr2)
            subscr2.cancel();
        };
      });
    };

    var $$readable$delay$$default = function delay(milliseconds) {
      var self = this;
      return new $$readable$constructor$$default(function(onNext, onError, onComplete) {
        return self.subscribe(function(value) {
          setTimeout(onNext.bind(null, value), milliseconds);
        }, onError, onComplete);
      });
    };

    var $$readable$every$$default = function every(test, context) {
      var self = this;
      var count = 0;
      return new Promise(function(resolve, reject) {
        var subscription = self.subscribe(function(value) {
          if (!test.call(context, value, count++, self)) {
            subscription.cancel();
            resolve(false);
          }
        }, reject, resolve.bind(null, true));

        return subscription;
      });
    };

    var $$readable$filter$$default = function filter(test, context) {
      var self = this;
      var count = 0;
      return new $$readable$constructor$$default(function(onNext, onError, onComplete) {
        return self.subscribe(function(value) {
          if (test.call(context, value, count++, self))
            onNext(value);
        }, onError, onComplete);
      });
    };

    var $$readable$first$$default = function first(count) {
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

    var $$readable$flatten$$default = function flatten() {
      var self = this;
      var promises = [];

      return new $$readable$constructor$$default(function(onNext, onError, onComplete) {
        return self.subscribe(function(value) {
          if (value instanceof $$readable$constructor$$default) {
            value.subscribe(onNext, onError);
            promises.push(value.toPromise());
          } else
            onNext(value);
        }, onError, function() {
          Promise.all(promises).then(onComplete);
        });
      });
    };

    var $$readable$flatten$array$$default = function flattenArray() {
      var self = this;

      return new $$readable$constructor$$default(function(onNext, onError, onComplete) {
        return self.subscribe(function(value) {
          if (Array.isArray(value))
            value.forEach(onNext);
          else
            onNext(value);
        }, onError, onComplete);
      });
    };

    var $$readable$for$each$$default = function forEach(iterator, context) {
      var self = this;
      var count = 0;
      return new Promise(function(resolve, reject) {
        self.subscribe(function(value) {
          iterator.call(context, value, count++, self);
        }, reject, resolve);
      });
    };

    var $$readable$last$$default = function last(count) {
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

    var $$readable$map$$default = function map(iterator, context) {
      var self = this;
      var count = 0;
      return new $$readable$constructor$$default(function(onNext, onError, onComplete) {
        return self.subscribe(function(value) {
          onNext(iterator.call(context, value, count++, self));
        }, onError, onComplete);
      });
    };

    var $$readable$reduce$$default = function reduce(iterator, initialValue) {
      var self = this;
      var count = 0;
      var accumulated = initialValue || null;
      return new Promise(function(resolve, reject) {
        self.subscribe(function(value) {
          accumulated = count === 0 && !accumulated ?
            value :
            iterator(accumulated, value, count++, self);
        }, reject, function() {
          resolve(accumulated);
        });
      });
    };

    function $$$errors$$NonSingleValueStreamError() { Error.call(this, arguments) }
    $$$errors$$NonSingleValueStreamError.prototype = Object.create(Error);

    var $$readable$single$$default = function single() {
      var self = this;
      return new Promise(function(resolve, reject) {
        var valueReceipt = false;
        var value;

        self.subscribe(function(val) {
          if (valueReceipt)
            reject(new $$$errors$$NonSingleValueStreamError());

          valueReceipt = true;
          value = val;
        }, reject, function() {
          if (valueReceipt)
            resolve(value);
          reject(new $$$errors$$NonSingleValueStreamError());
        });
      });
    };

    var $$readable$skip$$default = function skip(count) {
      var self = this;
      var remaining = count;

      return new $$readable$constructor$$default(function(onNext, onError, onComplete) {
        return self.subscribe(function(value) {
          if (remaining > 0)
            remaining--;
          else
            onNext(value);
        }, onError, onComplete);
      });
    };

    var $$readable$skip$until$$default = function skipUntil(value, context) {
      if (typeof value === 'function')
        return $$readable$skip$until$$skipUntil_function(this, value, context);
      if ($$utils$$isPromise(value))
        return $$readable$skip$until$$skipUntil_promise(this, value);
      return $$readable$skip$until$$skipUntil_stream(this, value);
    };

    function $$readable$skip$until$$skipUntil_function(self, test, context) {
      var enabled = false;

      return new $$readable$constructor$$default(function(onNext, onError, onComplete) {
        return self.subscribe(function(value) {
          if (!enabled && test.call(context, value))
            enabled = true;

          if (enabled)
            onNext(value);
        }, onError, onComplete);
      });
    }

    function $$readable$skip$until$$skipUntil_promise(self, promise) {
      return new $$readable$constructor$$default(function(onNext, onError, onComplete) {
        var subscription;
        promise.then(function() {
          subscription = self.subscribe(onNext, onError, onComplete);
        }, onError);

        return function() {
          subscription.cancel();
        };
      });
    }

    function $$readable$skip$until$$skipUntil_stream(self, stream) {
      return new $$readable$constructor$$default(function(onNext, onError, onComplete) {
        var subscription = stream.subscribe(start, onError, start);

        function start() {
          subscription.cancel();
          subscription = self.subscribe(onNext, onError, onComplete);
        }

        return function() {
          subscription.cancel();
        };
      });
    }

    var $$readable$some$$default = function some(test, context) {
      var self = this;
      var count = 0;
      return new Promise(function(resolve, reject) {
        var subscription = self.subscribe(function(value) {
          if (test.call(context, value, count++, self)) {
            subscription.cancel();
            resolve(true);
          }
        }, reject, resolve.bind(null, false));

        return subscription;
      });
    };

    /**
     * This class is used to control a subscription to a {@link ReadableStream}.
     *
     * @class
     * @name Subscription
     */
    function $$$subscription$$Subscription(action) {
      if (action instanceof $$$subscription$$Subscription)
        action = action.cancel;

      if ($$utils$$isFunction(action))
        this.cancel = action;
    }

    /**
     * Stops the subscription, no more callbacks will be called for that
     *   subscription after this method is invoked.
     *
     * @memberOf Subscription
     */
    $$$subscription$$Subscription.prototype.cancel = function() { };

    var $$$subscription$$default = $$$subscription$$Subscription;

    var $$readable$subscribe$$default = function subscribe(onNext, onError, onComplete) {
      var cancellation = this._subscribe(onNext, onError, onComplete);
      return new $$$subscription$$default(cancellation);
    };

    var $$readable$take$$default = function take(count) {
      var self = this;
      var remaining = count;

      //if (remaining <= 0)
      //  return ReadableStream.empty();

      return new $$readable$constructor$$default(function(onNext, onError, onComplete) {
        var subscription = self.subscribe(function(value) {
          onNext(value);
          remaining--;
          if (remaining === 0) {
            subscription.cancel();
            onComplete();
          }
        }, onError, onComplete);

        return subscription;
      });
    };

    var $$readable$take$until$$default = function takeUntil(value, context) {
      if (typeof value === 'function')
        return $$readable$take$until$$takeUntil_function(this, value, context);
      if ($$utils$$isPromise(value))
        return $$readable$take$until$$takeUntil_promise(this, value);
      return $$readable$take$until$$takeUntil_stream(this, value);
    };

    function $$readable$take$until$$takeUntil_function(self, test, context) {
      return new $$readable$constructor$$default(function(onNext, onError, onComplete) {
        var subscription = self.subscribe(function(value) {
          if (test.call(context, value)) {
            subscription.cancel();
            onComplete();
          } else
            onNext(value);
        }, onError, onComplete);

        return subscription;
      });
    }

    function $$readable$take$until$$takeUntil_promise(self, promise) {
      return new $$readable$constructor$$default(function(onNext, onError, onComplete) {
        var subscription = self.subscribe(onNext, onError, onComplete);
        promise
          .then(subscription.cancel, subscription.cancel)
          .then(onComplete, onError);
        return subscription;
      });
    }

    function $$readable$take$until$$takeUntil_stream(self, stream) {
      return new $$readable$constructor$$default(function(onNext, onError, onComplete) {
        var subscription = self.subscribe(onNext, onError, onComplete);
        var secondSubscription = stream.subscribe(end, function(error) {
          subscription.cancel();
          onError(error);
        }, end);

        function end() {
          secondSubscription.cancel();
          subscription.cancel();
          onComplete();
        }

        return end;
      });
    }

    var $$readable$to$array$$default = function toArray() {
      var self = this;
      var result = [];

      return new Promise(function(resolve, reject) {
        self.subscribe(
          function(value) { result.push(value) },
          reject,
          function() { resolve(result) });
      });
    };

    var $$readable$to$promise$$default = function toPromise() {
      var self = this;
      return new Promise(function(resolve, reject) {
        self.subscribe(null, reject, resolve);
      });
    };

    var $$readable$unique$$default = function unique(modifier) {
      modifier = modifier || function(a) { return a };
      var self = this;

      // TODO
      throw new Error('Not implemented');
      return new $$readable$constructor$$default(function(onNext, onError, onComplete) {
        var subscription = self.subscribe(function(value) {

        }, onError, onComplete)
      });
    };

    var $$readable$until$$default = $$readable$take$until$$default;

    var $$readable$zip$$default = function zip(/* ...sources, mapper */) {
      var args = [].slice.call(arguments);
      return $$readable$static$zip$$default.apply(null, [ this ].concat(args));
    };

    $$utils$$extend($$readable$constructor$$default, {
      empty: $$readable$static$empty$$default,
      fromArray: $$readable$static$from$array$$default,
      fromEvent: $$readable$static$from$event$$default,
      fromPromise: $$readable$static$from$promise$$default,
      fromStream: $$readable$static$from$stream$$default,
      fromWritable: $$readable$static$from$writable$$default,
      from: $$readable$static$from$$default,
      interval: $$readable$static$interval$$default,
      merge: $$readable$static$merge$$default,
      noop: $$readable$static$noop$$default,
      range: $$readable$static$range$$default,
      repeat: $$readable$static$repeat$$default,
      single: $$readable$static$single$$default,
      throw: $$readable$static$throw$$default,
      zip: $$readable$static$zip$$default,
    });

    $$utils$$extend($$readable$constructor$$default.prototype, {
      accumulate: $$readable$accumulate$$default,
      concat: $$readable$concat$$default,
      delay: $$readable$delay$$default,
      every: $$readable$every$$default,
      filter: $$readable$filter$$default,
      first: $$readable$first$$default,
      flatten: $$readable$flatten$$default,
      flattenArray: $$readable$flatten$array$$default,
      forEach: $$readable$for$each$$default,
      last: $$readable$last$$default,
      map: $$readable$map$$default,
      reduce: $$readable$reduce$$default,
      single: $$readable$single$$default,
      skip: $$readable$skip$$default,
      skipUntil: $$readable$skip$until$$default,
      some: $$readable$some$$default,
      subscribe: $$readable$subscribe$$default,
      take: $$readable$take$$default,
      takeUntil: $$readable$take$until$$default,
      toArray: $$readable$to$array$$default,
      toPromise: $$readable$to$promise$$default,
      unique: $$readable$unique$$default,
      until: $$readable$until$$default,
      zip: $$readable$zip$$default,
    });

    var $$$src$readable$$default = $$readable$constructor$$default;
    window.ReadableStream = $$$src$readable$$default;
}).call(this);

//# sourceMappingURL=stream.js.map