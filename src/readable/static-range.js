import ReadableStream from './constructor';
import { ImmediateScheduler } from '../schedulers';

/**
 * @returns {ReadableStream}
 */
export default function range(
  start,
  end,
  step = start < end ? 1 : -1,
  scheduler = new ImmediateScheduler()
) {

  return new ReadableStream((push, fail, complete) => {
    var next = start;

    scheduler.listen(() => {
      push(next);
      next = next + step;

      if (start < end && next > end || start > end && next < end)
        complete();
      else
        scheduler.schedule();
    });

    scheduler.schedule();
    return () => scheduler.cancel();
  });
}
