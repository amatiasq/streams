import ReadableStream from './constructor';

/**
 * @param {Number} milliseconds
 * @returns {ReadableStream}
 */
export default function delay(milliseconds) {
  return new ReadableStream((push, fail, complete) => {
    return this.subscribe(onNext, fail, complete);

    function onNext(value) {
      setTimeout(() => push(value), milliseconds);
    }
  });
}
