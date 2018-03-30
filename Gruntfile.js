module.exports = function(grunt) {
	grunt.initConfig({
		compass: {
			dist: {
				options: {
					sassDir: 'assets/stylesheets/sass/',
					specify: 'assets/stylesheets/sass/styles.scss',
					cssDir: 'assets/stylesheets/css/'
				}
			}
		},

	 uglify: {
			my_target: {
				files: {
					'csoldier.min.js': ['assets/javascripts/*.js']
				}
			}
		},

		watch: {
			css: {
				files: ['assets/stylesheets/sass/*.scss'],
				tasks: ['compass']
			},
			js: {
				files:['assets/javascripts/*.js'],
				tasks:['uglify']
			}
		}

	});

	// Load the plugin that provides the "uglify" task.
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');

	// Default task(s).
	grunt.registerTask('default', ['watch']);
	grunt.registerTask('dev', ['compass']);
}
