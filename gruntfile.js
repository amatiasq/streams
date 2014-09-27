//jshint maxlen:120, camelcase:false

module.exports = function(grunt) {
  'use strict';
  grunt.loadNpmTasks('grunt-jsdoc');
  grunt.loadNpmTasks('grunt-jsdoc-to-markdown');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-es6-module-transpiler');


  grunt.initConfig({

    files: {
      src: 'src/**/*.js',
      test: 'test/**/*.js',

      amd: {
        src: 'dist/amd/src/**/*.js',
        test: 'dist/amd/test/**/*.js',
      },
      cjs: {
        src: 'dist/cjs/src/**/*.js',
        test: 'dist/cjs/test/**/*.js',
      }
    },

    clean: {
      build: 'dist',
      doc: 'doc',
    },

    transpile: {
      cjs: {
        type: 'cjs',
        cwd: 'src/',
        src: '**/*.js',
        expand: true,
        dest: 'dist/cjs/src/',
      },
      'cjs-test': {
        type: 'cjs',
        cwd: 'test/',
        src: '**/*.js',
        expand: true,
        dest: 'dist/cjs/test/',
      },
      amd: {
        type: 'amd',
        cwd: 'src/',
        src: '**/*.js',
        expand: true,
        dest: 'dist/amd/src/',
      },
      'amd-test': {
        type: 'amd',
        cwd: 'test/',
        src: '**/*.js',
        expand: true,
        dest: 'dist/amd/test/',
      },
    },

    mochaTest: {
      test: {
        options: {
          reporter: 'spec'
        },
        src: [ '<%= files.cjs.test %>' ],
      }
    },

    jshint: {
      options: {
        jshintignore: '.jshintignore',
        jshintrc: '.jshintrc',
      },
      src: [ '<%= files.src %>' ],
      test: [ '<%= files.test %>' ],
    },

    jsdoc: {
      options: { destination: 'doc' },
      cjs: { src: '<%= files.cjs.src %>' },
      'cjs-test': { src: '<%= files.cjs.test %>' },
    },

    jsdoc2md: {
      options: {
        //index: true
      },
      all: {
        src: '<%= files.cjs.src %>',
        dest: 'doc/README.md',
      },
    },

    watch: {
      js: {
        files: [
          '<%= files.src %>',
          '<%= files.test %>',
        ],
        tasks: [ 'default' ],
      },
    },
  });

  grunt.registerTask('lint', [ 'jshint' ]);

  grunt.registerTask('doc', [
    'clean:doc',
    'transpile:cjs',
    'jsdoc2md',
    'jsdoc:cjs',
  ]);

  grunt.registerTask('test', [
    'lint',
    'build',
    'transpile:cjs-test',
    //'transpile:amd-test',
    'mochaTest',
  ]);

  grunt.registerTask('build', [
    'clean:build',
    'transpile:cjs',
    //'transpile:amd',
  ]);

  grunt.registerTask('default', [
    'test',
    'doc',
  ]);
};
