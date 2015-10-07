import ReadableStream from './constructor';
import { ImmediateScheduler } from '../schedulers';

/**
 * @returns {ReadableStream}
 */
export default function _throw(error, scheduler = new ImmediateScheduler()) {
  return new ReadableStream((push, fail) => {
    scheduler.listen(() => fail(error));
    scheduler.schedule();
    return () => scheduler.cancel();
  });
}
