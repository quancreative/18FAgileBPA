'use strict';

module.exports = function jshint(grunt) {
    // Load task
    grunt.loadNpmTasks('grunt-contrib-jshint');

    // Options
    return {
        files: [
            'controllers/**/*.js',
            'lib/**/*.js',
            'models/**/*.js',
            'services/**/*.js',
            'test/**/*.js'
        ],
        options: {
            jshintrc: '.jshintrc',
            reporter: require('jshint-stylish')
        }
    };
};
