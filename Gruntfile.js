module.exports = function(grunt) { 

	grunt.initConfig({ 
		pkg: grunt.file.readJSON('package.json'),
		sass: {                              // Task
		    dist: {                            // Target
		      options: {                       // Target options
		        style: 'expanded'
		      },
		      files: {                         // Dictionary of files
		        'app/css/main.css': 'app/css/sass/main.scss'      // 'destination': 'source'
		      }
		    }
		  },
		  watch: {
			  scss: {
			    options: {
			      interrupt: true
			      // livereload: true
			    },
			    files: 'app/css/sass/*.scss',
			    tasks: ['sass']
			  },
			  livereload: {
			  	options: {livereload: true},
			  	files: ['app/css/*.css']
			  }
			} 
	});


	
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('default', ['sass']);

};