import ReadableStream from './constructor';

/**
 * @returns {ReadableStream}
 */
export default function flatten() {
  return new ReadableStream((push, fail, complete) => {
    var promises = [];
    return this.subscribe(onNext, fail, onComplete);

    function onNext(value) {
      if (value instanceof ReadableStream) {
        value = value.flatten();
        value.subscribe(push, fail);
        promises.push(value.toPromise());
      } else {
        push(value);
      }
    }

    function onComplete() {
      return Promise.all(promises).then(complete);
    }
  });
}
