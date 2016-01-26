import { isList } from './utils';

/**
 * The concat() method returns a new stream comprised of the stream which it is called joined with the streams(s), array(s) and/or value(s) provided as arguments.
 Iterates `collections` one by one pushing it's content into returned stream.
 *
 * @method ReadableStream#concat
 * @param {...IReadableList|Object} collections - Streams, arrays and/or values to concatenate into a new stream.
 * @returns {ReadableStream} A stream with the content of this stream plus the ones passed as arguments.
 *
 * @example
 * let oneTwoThree = Stream.from([ 1, 2, 3 ]);
 * let fourFiveSix = [ 4, 5, 6 ];
 * let sevenEightNine = Stream.from([ 7, 8, 9 ]);
 * let ten = 10;
 * let allDigits = oneTwoThree.concat(fourFiveSix, sevenEightNine, ten);
 * allDigits.forEach(console.log); // prints 1 to 10 in order.
 */
export default function concat(...collections) {
  let hasFailed = false;
  let index = 0;
  let subscription;

  return new this.constructor((push, error, complete) => {
    return subscribe(this);

    function subscribe(col) {
      if (!isList(col)) {
        push(col);
        return next();
      }

      let promise = col.forEach(value => push(value));
      if (!promise)
        return next();

      subscription = promise.then(next).catch(fail);
      return subscription;
    }

    function next() {
      if (index === collections.length)
        return complete();

      return subscribe(collections[index++]);
    }

    function fail(reason) {
      if (hasFailed) return;
      error(reason);
      hasFailed = true;
    }
  });
}
