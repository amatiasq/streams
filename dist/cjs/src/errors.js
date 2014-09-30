"use strict";
function NonSingleValueStreamError() { Error.call(this, arguments) }
NonSingleValueStreamError.prototype = Object.create(Error);
exports.NonSingleValueStreamError = NonSingleValueStreamError;