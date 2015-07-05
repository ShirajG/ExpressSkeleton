module.exports = function (grunt) {
  // load all grunt tasks
  require('load-grunt-tasks')(grunt);
  var serverPort = 3001;

  // Project config
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    sass: {
      options: {
        sourceMap: true
      },
      dist: {
        files: {
          './public/css/style.css': './public/css/style.scss'
        }
      }
    },
    watch: {
      css:{
        files: './public/css/*.scss',
        tasks: ['sass'],
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
};
