#Index

**Classes**

* [class: ReadableStream](#ReadableStream)
  * [new ReadableStream(onSubscribe)](#new_ReadableStream)
  * [readableStream.accumulate(modifier, initialValue)](#ReadableStream#accumulate)
  * [ReadableStream.fromArray(array, [scheduler])](#ReadableStream.fromArray)
  * [ReadableStream.fromPromise(promise)](#ReadableStream.fromPromise)
  * [ReadableStream.interval([scheduler], [valueGenerator])](#ReadableStream.interval)
  * [readableStream.subscribe([onNext], [onError], [onComplete])](#ReadableStream#subscribe)
  * [callback: ReadableStream~onSubscribe](#ReadableStream..onSubscribe)
  * [callback: ReadableStream~onNext](#ReadableStream..onNext)
  * [callback: ReadableStream~onError](#ReadableStream..onError)
  * [callback: ReadableStream~onComplete](#ReadableStream..onComplete)
* [class: Subscription](#Subscription)
  * [new Subscription()](#new_Subscription)
  * [subscription.cancel()](#Subscription#cancel)
 
<a name="ReadableStream"></a>
#class: ReadableStream
**Members**

* [class: ReadableStream](#ReadableStream)
  * [new ReadableStream(onSubscribe)](#new_ReadableStream)
  * [readableStream.accumulate(modifier, initialValue)](#ReadableStream#accumulate)
  * [ReadableStream.fromArray(array, [scheduler])](#ReadableStream.fromArray)
  * [ReadableStream.fromPromise(promise)](#ReadableStream.fromPromise)
  * [ReadableStream.interval([scheduler], [valueGenerator])](#ReadableStream.interval)
  * [readableStream.subscribe([onNext], [onError], [onComplete])](#ReadableStream#subscribe)
  * [callback: ReadableStream~onSubscribe](#ReadableStream..onSubscribe)
  * [callback: ReadableStream~onNext](#ReadableStream..onNext)
  * [callback: ReadableStream~onError](#ReadableStream..onError)
  * [callback: ReadableStream~onComplete](#ReadableStream..onComplete)

<a name="new_ReadableStream"></a>
##new ReadableStream(onSubscribe)
Creates a readable stream, you can listen to the stream values using
 [subscribe](#ReadableStream#subscribe)
It receives a function that will be invoked when someone subscribes to this
  stream, this function should handle the callbacks for the subscription:

- `onNext(value)`
- `onError(error)`
- `onSubscribe()`

That function may return a `Function` or a [Subscription](#Subscription) instance,
  in that case if the subscription for this stream is cancelled the returned
  function will be invoked or the returned subscription will be cancelled.

**Params**

- onSubscribe <code>[onSubscribe](#ReadableStream..onSubscribe)</code> - Function to be invoked when
  someone subscribes to this stream.  

<a name="ReadableStream#accumulate"></a>
##readableStream.accumulate(modifier, initialValue)
This behaves similar to `ReadableStream#reduce` but instead of a
  promise this one returns a stream. With every new value a partial total
  will be sent over the new stream. Watch the example for more information.

**Params**

- modifier `function`  
- initialValue `Any`  

**Returns**: [ReadableStream](#ReadableStream)  
<a name="ReadableStream.fromArray"></a>
##ReadableStream.fromArray(array, [scheduler])
It returns a [ReadableStream](#ReadableStream) that will start streaming the array items
  when someone subscribes to it. Stream flow can be defined using a
  `Scheduler` function.

**Params**

- array `Array` - Any array-like object (must have `.lenght` and index
  accessors).  
- \[scheduler=Scheduler.immediate\] `Scheduler` - The scheduler to schedule
  the items streaming.  

**Returns**: [ReadableStream](#ReadableStream) - A stream that will emit the array values at the
  rithm of `scheduler`.  
<a name="ReadableStream.fromPromise"></a>
##ReadableStream.fromPromise(promise)
Returns a stream that will be completed with the only one value of the
  promise, immediately after that the stream will be completed. If the
  promise is rejected the stream will send and error.

**Params**

- promise `Promise` - The promise to listen.  

**Returns**: [ReadableStream](#ReadableStream) - A steam with only one value.  
<a name="ReadableStream.interval"></a>
##ReadableStream.interval([scheduler], [valueGenerator])
Creates a infinite stream that will use `scheduler` to fire values. You can
  also provide a function to generate the values, otherwise the value will be
  the index.

**Params**

- \[scheduler=Scheduler.immediate\] `Scheduler` - A scheduler to schedule
  values streaming. Defaults to `Schedulers.immediate`.  
- \[valueGenerator\] `function` - A function to generate the values to be
  sent.  

**Returns**: [ReadableStream](#ReadableStream) - A stream that will emit a value returned by
  `valueGenerator` each time `scheduler` fires.  
**Example**  
ReadableStream.interval().subscribe(...);

<a name="ReadableStream#subscribe"></a>
##readableStream.subscribe([onNext], [onError], [onComplete])
Allows you to listen to the stream values. It's implementation depends on
  argument passed to `ReadableStream#constructor`.

**Params**

- \[onNext\] <code>[onNext](#ReadableStream..onNext)</code> - Callback to invoke when the stream has
  a new value. The value will be passed as argument.  
- \[onError\] <code>[onError](#ReadableStream..onError)</code> - Callback to be invoked if the streams
  fails. The error object will be passed as argument.  
- \[onComplete\] <code>[onComplete](#ReadableStream..onComplete)</code> - Callback to be invoked when the
  stream has finished sending values. No arguments.  

**Returns**: [Subscription](#Subscription) - A subscription object to cancel the streamming.  
<a name="ReadableStream..onSubscribe"></a>
##callback: ReadableStream~onSubscribe
A callback to be invoked when someone subscribes to a stream. This callback
  is responsible to manage the stream subscription.

**Params**

- onNext <code>[onNext](#ReadableStream..onNext)</code> - This callback must be invoked each
  time the stream has a new value.  
- onError <code>[onError](#ReadableStream..onError)</code> - This callback must be invoked if an
  error is produced.  
- onComplete <code>[onComplete](#ReadableStream..onComplete)</code> - This callback must be invoked
  as soon as we know this stream will not send more values in the future.  

**Scope**: inner typedef of [ReadableStream](#ReadableStream)  
**Type**: `function`  
**Returns**: [Subscription](#Subscription) | `function` | `null` - A subscription object or a function to
  cancel the subscription.  
<a name="ReadableStream..onNext"></a>
##callback: ReadableStream~onNext
Callback to be invoked each time the stream has a new value.

**Params**

- value `*` - The new value  

**Scope**: inner typedef of [ReadableStream](#ReadableStream)  
**Type**: `function`  
<a name="ReadableStream..onError"></a>
##callback: ReadableStream~onError
Callback to be invoked when a stream has an error. The subscription will be
  cancelled after this callback is invoked.

**Params**

- error `Error` - The error object  

**Scope**: inner typedef of [ReadableStream](#ReadableStream)  
**Type**: `function`  
<a name="ReadableStream..onComplete"></a>
##callback: ReadableStream~onComplete
Callback to be invoked when a stream has completed. The subscription will be
  cancelled after this callback is invoked.

**Scope**: inner typedef of [ReadableStream](#ReadableStream)  
**Type**: `function`  
<a name="Subscription"></a>
#class: Subscription
**Members**

* [class: Subscription](#Subscription)
  * [new Subscription()](#new_Subscription)
  * [subscription.cancel()](#Subscription#cancel)

<a name="new_Subscription"></a>
##new Subscription()
This class is used to control a subscription to a [ReadableStream](#ReadableStream).

<a name="Subscription#cancel"></a>
##subscription.cancel()
Stops the subscription, no more callbacks will be called for that
  subscription after this method is invoked.

