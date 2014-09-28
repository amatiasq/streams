function immediate(fn) {
  return setTimeout(fn, 0);
}
immediate.cancel = function(id) {
  clearTimeout(id);
};
export { immediate };
