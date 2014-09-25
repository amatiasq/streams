import staticZip from './static-zip.js';

export default function zip(/* ...sources, mapper */) {
  var args = [].slice.call(arguments);
  return staticZip.apply(null, [ this ].concat(args));
}
