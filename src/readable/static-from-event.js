import ReadableStream from './constructor';

/**
 * @param target
 * @param event
 * @param options = { method }
 * @returns {ReadableStream}
 */
export default function fromEvent(target, event, options) {
  return new ReadableStream(push => {
    if (options && options.method)
      return tryMethod(options.method, options.unsubscribe);

    return (
      tryMethod('on', 'off') ||
      tryMethod('addListener', 'removeListener') ||
      tryMethod('addEventListener', 'removeEventListener')
    );

    function tryMethod(listen, unsubscribe) {
      if (typeof target[listen] !== 'function') {
        target[listen](event, push);
        return () => target[unsubscribe](event, push);
      }
    }
  });
}
