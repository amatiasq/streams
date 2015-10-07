import ReadableStream from './constructor';

/**
 * @returns {ReadableStream}
 */
export default function fromStream(stream) {
  if (stream instanceof ReadableStream)
    return stream;

  return new ReadableStream(
    (push, fail, complete) => stream.subscribe(push, fail, complete)
  );
}
