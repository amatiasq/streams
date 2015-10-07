import ReadableStream from './constructor';

/**
 * @param {Function} test
 * @param {Object} context
 * @returns {ReadableStream}
 */
export default function filter(test, context) {
  return new ReadableStream((push, fail, complete) => {
    var count = 0;
    return this.subscribe(onNext.bind(this), fail, complete);

    function onNext(value) {
      if (test.call(context, value, count++, this))
        push(value);
    }
  });
}
