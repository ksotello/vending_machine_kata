module.exports = function (grunt) {

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        requirejs: {
            compile: {
                options: {
                    baseUrl: __dirname,
                    mainConfigFile: 'require.js',
                    name: 'app',
                    out: 'optimized.js'
                }
            }
        },

        jasmine: {
            src: ['src/**/*.js'],
            options: {
                specs: 'spec/**/*Spec.js',
                template: require('grunt-template-jasmine-requirejs'),
                keepRunner: true
            }
        },

        concat: {
            dist: {
                src: ['src/*.js'],
                dest: 'app.js'
            }
        },

        watch: {
            files: ['src/**/*.js', 'spec/**/*.js'],
            tasks: ['default']
        }

    });

    // load requirejs
    grunt.loadNpmTasks('grunt-contrib-requirejs');

    // load jasmine
    grunt.loadNpmTasks('grunt-contrib-jasmine');

    // load concat file
    grunt.loadNpmTasks('grunt-contrib-concat');

    // load watch task
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Default task
    grunt.registerTask('default', ['concat', 'requirejs', 'jasmine', 'watch']);

};
