import ReadableStream from './constructor';
import { ImmediateScheduler } from '../schedulers';

/**
 * Creates a infinite stream that will use `scheduler` to fire values. You can
 *   also provide a function to generate the values, otherwise the value will be
 *   the index.
 *
 * @example
 *   ReadableStream.interval().subscribe(...);
 *
 * @method ReadableStream.interval
 * @see {@link http://jsfiddle.net/amatiasq/4d63ytvh/|Fiddle example}
 *
 * @param [scheduler=Scheduler.immediate] {Scheduler} A scheduler to schedule
 *   values streaming. Defaults to {@link Schedulers.immediate}.
 * @param [valueGenerator] {Function} A function to generate the values to be
 *   sent.
 * @returns {ReadableStream} A stream that will emit a value returned by
 *   `valueGenerator` each time `scheduler` fires.
 */
export default function interval(scheduler = new ImmediateScheduler(), fn = a => a) {
  return new ReadableStream(push => {
    var count = 0;
    scheduler.listen(() => {
      scheduler.schedule();
      push(fn(count++));
    });
    scheduler.schedule();
    return () => scheduler.cancel();
  });
}
