

( function( app, templates, core, mst ) {

	app.view.QuestionsView = function( name, container, template, model, viewManager, config  ) {
		var _self = this;

		core.view.apply( _self, [ name, container, template, model, viewManager, config ] );


		_self.questions = [];

		var standardModel = {
			getQuestionMarkup : function() {
			return function( text, render ) {

					var q =  new app.question( this );
					_self.questions.push( q );
					return q.getHTML();
				}
			}
		};

		_self.model = Object.assign( standardModel, _self.model );

	};

	app.view.QuestionsView.prototype = Object.create( core.view.prototype );

	app.view.QuestionsView.prototype.init = function() {
		var _self = this;



	};



})( window.app, window.app.templates, window.app.core, window.Mustache );