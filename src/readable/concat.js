import ReadableStream from './constructor';

/**
 * @param {ReadableStream} stream
 * @returns {ReadableStream}
 */
export default function concat(...streams) {
  if (streams.length === 0)
    return this;

  return new ReadableStream((push, fail, complete) => {
    var subscriptions = [];
    var index = 0;
    streams = [ this, ...streams ];
    onComplete();
    return () => subscriptions.forEach(sub => sub.cancel());

    function onComplete() {
      if (index === streams.length)
        complete();

      subscriptions[index] = streams[index].subscribe(push, fail, onComplete);
      index++;
    }
  });
}
