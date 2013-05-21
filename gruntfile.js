/*global module*/
var pkgData = require('./package.json');
module.exports = function(grunt) {
  'use strict';
  grunt.initConfig({
    pkg: '<json:package.json>',
    lint: {
      all: ['./stampit.js', './test/*.js']
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        nonew: true,
        noarg: true,
        sub: true,
        undef: true,
        unused: true,
        eqnull: true,
        node: true,
        strict: true,
        boss: false
      }
    },

    lexicon: {
      all: {
        src: ["stampit.js"],
        dest: "doc",
        options: {
          title: "Stampit API",
          format: "markdown"
        }
      }
    },

    connect: {
      server: {
        options: {
          port: process.env.sauceport,
          base: './'
        }
      }
    },

    'saucelabs-qunit': {
      all: {
        options: {
          username: process.env.sauceuser,
          key: process.env.saucekey,
          urls: ['http://localhost:' +
            process.env.sauceport + '/test/index.html'],
          tunnelTimeout: ['10000'],
          testname: pkgData.name,
          tags: [''],
          browsers: [
            {
              browserName: 'chrome'
            },
            {
              browserName: 'internet explorer',
              platform: 'Windows 2003',
              version: '8'
            },
            {
              browserName: 'internet explorer'
            },
            {
              browserName: 'firefox'
            },
            {
              browserName: 'android',
              platform: 'Linux',
              version: '4'
            },
            {
              browserName: 'safari',
              platform: 'Mac 10.8',
              version: '6'
            },
            {
              browserName: 'safari',
              platform: 'Mac 10.6',
              version: 5
            }
          ]
        }
      }
    },
    browserify: {
      'dist/stampit.js': ['./stampit.js'],
      options: {
        standalone: 'stampit'
      }
    }
  });

  grunt.loadNpmTasks('grunt-saucelabs');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-connect');
  // grunt.loadNpmTasks('grunt-lexicon');

  grunt.registerTask('default', ['jshint', 'browserify']);
  grunt.registerTask('test', ['jshint', 'browserify', 'connect', 'saucelabs-qunit']);
};
