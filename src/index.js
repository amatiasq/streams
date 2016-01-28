
import Promise from './promise';
import CancellablePromise from './cancellable-promise';

import Readable from './readable';
import Writable from './writable';
import Transform from './transform';

import {
  ByteLengthQueuingStrategy,
  CountQueuingStrategy
} from './strategies';


window.as = {
  Promise,
  CancellablePromise,

  Readable,
  Writable,
  Transform,

  ByteLengthQueuingStrategy,
  CountQueuingStrategy,
};
