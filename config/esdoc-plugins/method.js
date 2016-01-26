/*
 * Enables @method tag in functions to document it as a method of a existing class.
 * Author A. Matías Quezada <amatiasq@gmail.com>
 * MIT License
 *
 * Usage:
 *
 *    /** @method MyClass * /
 *    export function foo() {}
 *
 * Same as:
 *
 *    /** @method MyClass#foo * /
 *    export function foo() {}
 *
 * For static
 *
 *    /** @method MyClass.foo * /
 *    export function foo() {}
 *
 * Full name in case of conflict
 *
 *    /** @method src/my-file.js~MyClass#foo * /
 *    export function foo() {}
 *
 * Allows renaming for reserved words
 *
 *    /** @method MyClass.throw *
 *    export function _throw() {}
 */

/* globals exports */

exports.onHandleTag = function(event) {
  event.data.tag.forEach(function(tag) {
    if (!tag.unknown) return;

    var label = findOne(
      tag.unknown,
      (label) => label.tagName === '@method',
      null,
      'Element "' + tag.longname + '" contains more than one @method tag'
    );

    if (!label) return;

    var split = splitLabel(label.tagValue);
    var ownerName = split[0];
    var owner = findOne(
      event.data.tag,
      (entry) => entry.longname === ownerName || entry.name === ownerName,
      'Class "' + ownerName + '" not found for element "' + tag.longname + '"',
      'Multiple entries found for element "' + ownerName + '" at "' + tag.longname + '"'
    );

    if (!owner) return;

    var newName = split[1];
    if (newName)
      tag.name = newName;

    tag.kind = 'method';
    tag.static = !!split.isStatic;
    tag.memberof = owner.longname;

    // Disabling this modification source becomes available
    // tag.longname = owner.longname + (tag.static ? '.' : '#') + tag.name;
  });
};

function splitLabel(value) {
  if (value.indexOf('#') !== -1)
    return value.split('#');

  if (value.indexOf('.') === -1)
    return [ value ];

  var result = value.split('.');
  result.isStatic = true;
  return result;
}

function findOne(list, iterator, ifZero, ifMore) {
  var found = list.filter(iterator);

  if (found.length === 0) {
    if (ifZero)
      throw new Error(ifZero);
    return null;
  }

  if (found.length > 1) {
    if (ifMore)
      throw new Error(ifMore);
    return null;
  }

  return found[0];
}
