export default class FakePromise {
  constructor() {
    this.queue = [];
  }

  then(resolve, reject) {
    this.queue.push({ resolve, reject });
  }

  resolve(value) {
    this.queue.forEach(({ resolve }) => resolve && resolve(value));
  }

  reject(reason) {
    this.queue.forEach(({ reject }) => reject && reject(reason));
  }
}
