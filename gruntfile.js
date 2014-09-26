//jshint maxlen:120, camelcase:false

module.exports = function(grunt) {
  'use strict';
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-es6-module-transpiler');


  grunt.initConfig({

    files: {
      src: 'src/**/*.js',
    },

    transpile: {
      cjs: {
        type: 'cjs',
        cwd: 'src/',
        src: '**/*.js',
        expand: true,
        dest: 'dist/cjs/',
      },
      amd: {
        type: 'amd',
        cwd: 'src/',
        src: '**/*.js',
        expand: true,
        dest: 'dist/amd/',
      },
      globals: {
        type: 'globals',
        cwd: 'src/',
        src: 'readable.js',
        expand: true,
        dest: 'dist/globals/',
      }
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
