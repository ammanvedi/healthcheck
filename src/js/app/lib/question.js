( function( app, templates, core, mst ) {


	app.question = function( config ) {
		var _self = this;

		_self.config = config;
		_self.template = app.templates[ "hc_stage_question_" + _self.config.answerType ];

	};

	app.question.prototype.getHTML = function() {
		var _self = this;

		return mst.render( _self.template, _self.config );

	};


})( window.app, window.app.templates, window.app.core, window.Mustache );