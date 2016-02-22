module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    concat: {
      options: {
        separator: '',
      },
      dist: {
        src: grunt.file.readJSON('files.json').src,
        dest: 'dist/fsm.js',
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.registerTask('default', ['concat']);

};
