//jshint maxlen:120, camelcase:false

module.exports = function(grunt) {
  'use strict';
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
        jshintignore: ".jshintignore",
        jshintrc: ".jshintrc"
      },
      src: [ '<%= files.src %>' ],
      test: [ '<%= files.test %>' ],
    },

    watch: {
      js: {
        files: [
          '<%= files.src %>',
          '<%= files.test %>',
        ],
        tasks: [ 'test' ],
      },
    },
  });

  grunt.registerTask('lint', [ 'jshint' ]);
  grunt.registerTask('test', [
    'lint',
    'build',
    'transpile:cjs-test',
    'transpile:amd-test',
    'mochaTest',
  ]);
  grunt.registerTask('build', [
    'clean',
    'transpile:cjs',
    'transpile:amd',
  ]);
  grunt.registerTask('default', [ 'watch' ]);
};
