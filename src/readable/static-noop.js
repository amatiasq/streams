import ReadableStream from './constructor';

/**
 * @returns {ReadableStream}
 */
export default function noop() {
  return new ReadableStream(function() { });
}
