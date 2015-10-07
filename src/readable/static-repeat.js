import ReadableStream from './constructor';
import { ImmediateScheduler } from '../schedulers';

/**
 * @returns {ReadableStream}
 */
export default function repeat(value, count, scheduler = new ImmediateScheduler()) {
  return new ReadableStream((push, fail, complete) => {
    scheduler.listen(() => {
      push(value);
      count--;

      if (count)
        scheduler.schedule();
      else
        complete();
    });

    scheduler.schedule();
    return () => scheduler.cancel();
  });
}
