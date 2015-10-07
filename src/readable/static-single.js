import ReadableStream from './constructor';
import { ImmediateScheduler } from '../schedulers';

/**
 * @returns {ReadableStream}
 */
export default function single(value, scheduler = new ImmediateScheduler()) {
  return new ReadableStream((push, fail, complete) => {
    scheduler.listen(() => {
      push(value);
      complete();
    });

    scheduler.schedule();
    return () => scheduler.cancel();
  });
}
