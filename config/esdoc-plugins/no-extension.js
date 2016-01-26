/*
 * Fixes extend references through files when importing without extension
 * Author A. Matías Quezada <amatiasq@gmail.com>
 * MIT License
 *
 * Usually
 *
 *    import SuperClass from './super-class';
 *    class ChildClass extends SuperClass {}
 *
 * Generates
 *
 *    src/super-class~SuperClass
 *
 * With this plugin a link to the super class will be placed
 *
 *    <a href="...">SuperClass<a>
 */

/* globals exports */

exports.onHandleTag = function(event) {
  var hasExtension = /\.js$/;

  event.data.tag.forEach(function(tag) {
    if (!tag.extends) return;

    tag.extends = tag.extends.map(function(parent) {
      if (parent.indexOf('~') === -1)
        return parent;

      var split = parent.split('~');
      var filename = split[0];
      var className = split[1];

      if (hasExtension.test(filename))
        return parent;

      return filename + '.js~' + className;
    });
  });
};
