import { BaseScheduler } from '../src/schedulers';

export default class TestScheduler extends BaseScheduler {
  constructor() {
    super();
    this.scheduled = false;
  }

  schedule() {
    this.scheduled = true;
  }

  cancel() {
    this.scheduled = false;
  }

  flush() {
    if (this.scheduled)
      this.execute();
  }

  flushAll() {
    while (this.scheduled)
      this.execute();
  }
}
