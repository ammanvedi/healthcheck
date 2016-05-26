

( function( app, templates, core, mst ) {

	app.controller.questionController = function() {
		var _self = this;

		_self.calledback = false;

		core.controller.apply( _self );
		_self.paginator = new app.paginator( _self.viewController.container, {
			context : _self,
			forwardCallback : function() {
				this.stageIndex = this.clamp( this.stageIndex + 1 );
				if( !this.questionViews[ this.stageIndex ].isRendered ) {
					this.questionViews[ this.stageIndex ].render();
				}
				this.questionViews[ this.stageIndex ].present();
				if( this.stageIndex === 1 ) {
					this.paginator.show();
				}
			},
			backCallback : function() {
				this.calledback = true;
				this.questionViews[ this.stageIndex ].dismiss();
				this.stageIndex = this.clamp( this.stageIndex - 1 );
				if( this.stageIndex === 0 ) {

					this.paginator.hide();

				}
			}
		} );

		var titleView = _self.viewController.addView( "v1", templates.hc_title, {}, {
			animation : core.viewManager.ANIMATION_TYPE.VERTICAL_SLIDE,
			classes : [ "titleView" ]
		} );

		_self.questionViews = app.OHC_DATA.stages.map( function( stage ) {

			var stageView = _self.viewController.addView( stage.title, templates.hc_stage, {
				stage : stage
			},
			{
				animation : core.viewManager.ANIMATION_TYPE.VERTICAL_SLIDE,
				classes : [ "question_stage" ],
				customConstructor : app.view.QuestionsView
			} );
			return stageView;
		} );

		_self.clamp = function( value ) {

			if( value === 0 ) {

				_self.paginator.hide();

			}

			return value < 0 ? 0 : value > (  _self.questionViews.length - 1 ) ? (  _self.questionViews.length - 1 ) : value;

		};

		_self.stageIndex = 0;

		_self.questionViews = [ titleView ].concat( _self.questionViews );

		titleView.render( function() {
			document.querySelector( '.js-btn-ohc' ).addEventListener( 'click', function() {

				_self.stageIndex = 1;
				_self.questionViews[ 1 ].render();
				_self.questionViews[ 1 ].present();
				_self.paginator.show();
			} );
		} );
		titleView.present();

	}

})( window.app, window.app.templates, window.app.core, window.Mustache );