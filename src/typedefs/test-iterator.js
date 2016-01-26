/**
 * Callback to be invoked each time the stream has a new value.
 *
 * @typedef {function} TestIterator
 * @extends Iterator
 *
 * @param {?Object} value - The current value.
 * @param {!Number} index - The index of the value.
 * @param {!Array|Stream} collection - The collection being iterated.
 * @returns {Boolean} True if the value has passed the test.
 */
