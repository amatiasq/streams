"use strict";
var staticZip = require("./static-zip.js")["default"];

exports["default"] = function zip(/* ...sources, mapper */) {
  var args = [].slice.call(arguments);
  return staticZip.apply(null, [ this ].concat(args));
}