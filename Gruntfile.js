module.exports = function (grunt) {
  // load all grunt tasks
  require('load-grunt-tasks')(grunt);
  var serverPort = 3001;

  // Project config
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      css: {
        src: ['assets/css/build.css', 'assets/css/style.css'],
        dest: 'public/css/build.css'
      }
    },
    bower_concat: {
      all: {
        dest: 'assets/js/build.js',
        cssDest: 'assets/css/build.css',
        mainFiles: {
          bootstrap: 'dist/css/bootstrap.min.css'
        }
      }
    },
    uglify:{
      bower:{
        files:{
          'public/js/build.min.js':'assets/js/build.js'
        },
        options:{
          mangle: true,
          compress: true
        }
      }
    },
    sass: {
      options: {
        sourceMap: true,
        outputStyle: 'compressed'
      },
      dist: {
        files: {
          'assets/css/style.css': 'assets/css/style.scss'
        }
      }
    },
    watch: {
      css:{
        files: 'assets/css/*.scss',
        tasks: ['sass', 'concat:css'],
        options: {
          livereload: true
        }
      },
      server: {
        files: ['.rebooted'],
        options: {
          livereload: true
        }
      }
    },
    nodemon: {
      dev: {
        script: './bin/www',
        options: {
          ext: 'js,jade',
          nodeArgs: ['--debug'],
          env: {
            PORT: serverPort
          },
          callback: function(nodemon){
            nodemon.on('log', function(event){
              console.log(event.color);
            });

            nodemon.on('config:update', function(){
              setTimeout(function(){
                require('open')('http://localhost:'+ serverPort);
              },1000);
            });

            nodemon.on('restart', function () {
              setTimeout(function() {
                require('fs').writeFileSync('.rebooted', 'rebooted');
              }, 1000);
            });
          }
        }
      },
    },
    concurrent: {
      dev: {
        tasks: ['nodemon', 'watch'],
        options: {
          logConcurrentOutput: true
        }
      }
    }
  });
  grunt.registerTask('default', ['concurrent']);
  grunt.registerTask('build', ['bower_concat','sass','concat:css', 'uglify:bower']);
};
