import ReadableStream from './constructor';

/**
 * @returns {ReadableStream}
 */
export default function empty() {
  return new ReadableStream((push, fail, complete) => {
    var timeout = setTimeout(complete);
    return () => clearTimeout(timeout);
  });
}
