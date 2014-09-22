export function NonSingleValueStreamError() { Error.call(this, arguments) }
NonSingleValueStreamError.prototype = Object.extend(Error);
