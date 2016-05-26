module.exports = {

	src : {

		js 			: [ "src/js/framework/init.js",
						"src/template/templates.js",
						"src/js/framework/**/!(init)*.js",
						"src/js/app/init.js",
						"src/js/app/data/**/*.js",
						"src/js/app/**(!data)/!(init|templates)*.js"
		],
		sass 		: [ "src/sass/screen.scss", "dist/vendor/stretch-css/scss/stretch.scss" ],
		test 		: [ "test/*.test.js" ],
		template 	: [ "src/template/**/*.mst" ],
		templateBase: "src/template/",
		partial		: [ "src/partial/*.html" ],
		img			: [ "src/img/*.png" ],
		partialBase	: "src/partial"

	},
	dist : {

		js 			: "dist/js/",
		sass 		: "dist/css/",
		partial		: "dist/",
		img			: "dist/img/"

	},

	uglify : {

		mangle		: false
	},

	fileInclude : {
		prefix: '@@',
		basepath: './src/partial/'
	}
};