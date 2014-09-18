//jshint maxlen:120, camelcase:false

module.exports = function(grunt) {
  'use strict';
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-es6-module-transpiler');


  grunt.initConfig({

    files: {
      src: 'src/**/*.js',
      out: {
        cjs: 'dist/stream.cjs.js',
        amd: 'dist/stream.amd.js',
      }
    },

    transpile: {
      cjs: {
        type: 'cjs',
        src: '<%= files.src %>',
        dest: '<%= out.cjs %>',
      },
      amd: {
        type: 'amd',
        src: '<%= files.src %>',
        dest: '<%= out.amd %>',
      },
    },

    jshint: {
      options: {
        jshintignore: ".jshintignore",
        jshintrc: ".jshintrc"
      },
      src: [ '<%= files.src %>' ],
    },

    watch: {
      js: {
        files: '<%= files.src %>',
        tasks: [
          'jshint',
          'transpile',
        ],
      },
    },
  });


  grunt.registerTask('default', [ 'watch' ]);
};
