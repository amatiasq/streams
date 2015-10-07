import fromArray from './static-from-array';
import fromPromise from './static-from-promise';
import fromStream from './static-from-stream';
import { InvalidStreamSource } from '../errors';
import {
  isPromise,
  isStream
} from '../utils';

/**
 * @returns {ReadableStream}
 */
export default function from(source) {
  if (Array.isArray(source))
    return fromArray(source);

  if (isPromise(source))
    return fromPromise(source);

  if (isStream(source))
    return fromStream(source);

  throw new InvalidStreamSource();
}
