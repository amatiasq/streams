/**
 * Callback to be invoked each time the stream has a new value.
 *
 * @typedef {function} Accumulator
 * @extends Iterator
 *
 * @param {?Object} previousValue - The value previously returned in the last invocation of the callback, or initialValue, if supplied.
 * @param {?Object} currentValue - The current element being processed in the collection.
 * @param {!Number} currentIndex - The index of the current element being processed in the stream.
 * @param {!Array|Stream} collection - The collection being iterated.
 * @returns {?Object} Value to become `previousValue` on the next call or returned as output if collection is completed.
 */
