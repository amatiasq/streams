/**
 * The slice() method returns a shallow copy of a portion of a stream into a new stream object.
 *
 * @method ReadableStream#slice
 * @param {Number} [begin = 0] - Function that produces an element of the new stream.
 * @param {Number} [end = this.length] - Value to use as this when executing callback.
 * @returns {ReadableStream} A new stream with the new elements.
 */
export default function slice(begin = 0, end = null) {
  if (arguments.length === 0)
    return clone(this);

  if (arguments.length === 1)
    return skip(this, begin);

  if (begin < 0)
    return loadAll(this, begin, end);

  if (end < 0)
    return omitLast(this, begin, end);

  return simplePick(this, begin, end);
}


function clone(stream) {
  // return new stream.constructor(next => stream.forEach(value => next(value)));
  return this;
}


function skip(stream, since) {
  return stream.filter((value, index) => index >= since);
}


function loadAll(stream, begin, end) {
  return stream.constructor(next => {
    return stream.toArray().then(array => {
      let length = array.length;
      begin = length + begin;

      if (end < 0)
        end = length + end;

      for (let i = begin; i < end; i++)
        next(array[i]);
    });
  });
}


function omitLast(stream, begin, end) {
  let buffer = [];
  let length = -end;

  return new stream.constructor(next => {
    return stream.forEach((value, index) => {
      if (index < begin) return;

      buffer.push(value);

      if (buffer.length > length)
        next(buffer.shift);
    });
  });
}


function simplePick(stream, begin, end) {
  if (end - begin <= 0)
    return this.constructor.empty();

  return new stream.constructor((next, complete) => {
    let subscription = stream.forEach((value, index) => {
      if (index < begin) return;
      if (index < end) {
        next(value);
        return;
      }

      subscription.cancel();
      complete();
    });

    return subscription;
  });
}
