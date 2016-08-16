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
			  	files: ['app/css/*.css', 
			  	'app/src/admin/Add/*.html',
			  	'app/src/admin/Add/*.js',
			  	'app/src/admin/Dashboard/*.html',
			  	'app/src/admin/Dashboard/*.js',
			  	'app/src/admin/Login/*.html',
			  	'app/src/admin/Login/*.js',
			  	'app/src/brand/Add/*.html',
			  	'app/src/brand/Add/*.js',
			  	'app/src/brand/Edit/*.html',
			  	'app/src/brand/Edit/*.js',
			  	'app/src/voucher/Add/*.html',
			  	'app/src/voucher/Add/*.js',
			  	'app/src/voucher/Edit/*.html',
			  	'app/src/voucher/Edit/*.js'
			  	]
			  }
			} 
	});


	
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('default', ['sass']);

};