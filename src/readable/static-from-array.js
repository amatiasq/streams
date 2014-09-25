import interval from './static-interval';

/**
 * @returns {ReadableStream}
 */
export default function fromArray(array) {
  return interval(0, function(index) {
    return array[index];
  });
}
