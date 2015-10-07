import ReadableStream from './constructor';

/**
 * @returns {ReadableStream}
 */
export default function flattenArray() {
  return new ReadableStream((push, fail, complete) => {
    return this.subscribe(onNext, fail, complete);

    function onNext(value) {
      if (Array.isArray(value))
        value.forEach(push);
      else
        push(value);
    }
  });
}
