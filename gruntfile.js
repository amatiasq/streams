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
        expand: true,
        cwd: 'src/',
        src: '**/*.js',
        dest: 'dist/cjs/',
      },
      amd: {
        type: 'amd',
        expand: true,
        cwd: 'src/',
        src: '**/*.js',
        dest: 'dist/amd/',
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
