export class BaseScheduler {
  constructor() {
    this._actions = [];
  }

  listen(action) {
    this._actions.push(action);
  }

  unlisten(action) {
    this._actions = this._actions.filter(a => a !== action);
  }

  execute() {
    this._actions.forEach(action => action());
  }
}

export class DelayScheduler extends BaseScheduler {
  constructor(milliseconds) {
    super();
    this._milliseconds = milliseconds;
    this._timer = null;
  }

  schedule() {
    if (this._timer) return;

    this._timer = setTimeout(() => {
      this._timer = null;
      this.execute();
    }, this._milliseconds);
  }

  cancel() {
    if (this._timer)
      clearTimeout(this._timer);
  }
}


export class ImmediateScheduler extends DelayScheduler {
  constructor() {
    super(0);
  }
}
