import ReadableStream from './constructor';
import fromArray from './static-from-array';
import fromPromise from './static-from-promise';
import fromStream from './static-from-stream';
import { isPromise } from '../tools';

/**
 * @returns {ReadableStream}
 */
export default function from(source) {
  if (!source)
    return null;

  if (Array.isArray(source))
    return fromArray(source);

  if (isPromise(source))
    return fromPromise(source);

  if (source instanceof ReadableStream)
    return source;

  if (typeof source.subscribe === 'function')
    return fromStream(source);

  // TODO: handle error
}
