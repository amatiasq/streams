import staticZip from './static-zip';

export default function zip(mapper, ...sources) {
  return staticZip(mapper, this, ...sources);
}
