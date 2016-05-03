module.exports = {

	src : {

		js 			: [ "src/js/framework/init.js", "src/js/framework/!(init)*.js", "src/js/app/init.js", "src/template/templates.js", "src/js/app/!(init|templates)*.js" ],
		sass 		: [ "src/sass/*.scss" ],
		test 		: [ "test/*.test.js" ],
		template 	: [ "src/template/*.mst" ],
		templateBase: "src/template/"

	},
	dist : {

		js 			: "dist/js/",
		sass 		: "dist/css/"

	},

	uglify : {

		mangle		: false
	}
};