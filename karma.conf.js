// karma.conf.js
module.exports = function(config) {
	config.set({
		frameworks: ['jasmine'],
		logLevel: config.LOG_DEBUG,
		singleRun: false,
		basePath: "./",
		files: [
			'dist/vendor/mustache.js/mustache.min.js',
			'dist/js/app.js',
			'test/*.js'
		]
	})
}