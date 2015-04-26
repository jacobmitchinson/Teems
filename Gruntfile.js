module.exports = function(grunt) {

  grunt.initConfig({
    express: {
      default_option: {}
    }, 
    mochacli: {
      options: {
        require: ['chai'],
        reporter: 'spec',
        timeout: 100000,
        bail: true
      },
      all: ['test/**/*.js']
    }
  });

  grunt.loadNpmTasks('grunt-express');
  grunt.loadNpmTasks('grunt-mocha-cli');

  grunt.registerTask('default', ['express']);
  grunt.registerTask('test', ['mochacli']);
};