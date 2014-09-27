function NonSingleValueStreamError() { Error.call(this, arguments) }
NonSingleValueStreamError.prototype = Object.create(Error);
export { NonSingleValueStreamError };
