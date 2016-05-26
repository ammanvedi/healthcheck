
( function( app, templates, core, mst ) {



	core.viewManager = function( container, config ) {
		var _self = this;

		_self.config = config;
		_self.container = container;
		_self.views = {};
		_self.viewStack = [];
		_self.activeView = false;

	};

	core.viewManager.ANIMATION_TYPE = {

		REVERSE : "reverseAnimation",

		VERTICAL_SLIDE : {
			EXTRA : "animated",
			SHOW : "slideup_in",
			HIDE : "slideup_out"
		},
		NONE : {
			EXTRA : "notAnimated",
			SHOW : "notAnimated",
			HIDE : "notAnimated"
		}

	};

	core.viewManager.VIEW_STATE = {

		HIDDEN : "hidden",
		VISIBLE : "visible"

	};

	core.viewManager.prototype.presentView = function( name, animation ) {
		var _self = this;

		if( !_self.views[ name ] || _self.activeView === name ) {
			return false;
		}

		var onStack = _self.viewStack.indexOf( name );

		if( onStack > -1 ) {
			/**
			 * pop from inside the stack
			 */
			_self.viewStack.splice( onStack, 1 );
		}

		_self.hideView( _self.activeView, animation, onStack > -1 ? core.viewManager.ANIMATION_TYPE.REVERSE : false );
		_self.showView( name, animation, onStack > -1 ? core.viewManager.ANIMATION_TYPE.REVERSE : false  );

		if( _self.activeView ) {
			_self.viewStack.push( _self.activeView );
		}

		_self.activeView = name;

	};

	core.viewManager.prototype.dismissView = function( name, animation ) {
		var _self = this;

		if( !name || !_self.views[ name ] ) {
			return false;
		}

		_self.activeView = _self.viewStack.pop();
		if( _self.activeView ) {
			_self.hideView( name, animation, core.viewManager.ANIMATION_TYPE.REVERSE );
			_self.showView( _self.activeView, animation, core.viewManager.ANIMATION_TYPE.REVERSE );
		}


	};

	core.viewManager.prototype.showView = function( name, animation, reverseAnimation ) {
		var _self = this;

		if( !name || !_self.views[ name ] ) {
			return false;
		}

		_self.views[ name ].container.classList.remove( core.viewManager.VIEW_STATE.HIDDEN, animation.HIDE || "", animation.SHOW || "", animation.EXTRA || "", core.viewManager.ANIMATION_TYPE.REVERSE  );
		_self.views[ name ].container.classList.add( core.viewManager.VIEW_STATE.VISIBLE, animation.SHOW || "", animation.EXTRA || "", reverseAnimation || "n" );

	};

	core.viewManager.prototype.hideView = function( name, animation, reverseAnimation ) {
		var _self = this;

		if( !name || !_self.views[ name ] ) {
			return false;
		}

		_self.views[ name ].container.classList.remove( core.viewManager.VIEW_STATE.VISIBLE, animation.HIDE || "", animation.SHOW || "", animation.EXTRA || "", core.viewManager.ANIMATION_TYPE.REVERSE );
		_self.views[ name ].container.classList.add( core.viewManager.VIEW_STATE.HIDDEN, animation.HIDE || "", animation.EXTRA || "", reverseAnimation || "n" );

	};

	core.viewManager.prototype.addView = function( name, template, model, config ) {
		var _self = this;

		if( !name || _self.views[ name ] ) {
			return false;
		}

		var tmpl = mst.render( templates.view, {

			additionalClasses : config.classes ? config.classes.join( " " ) : undefined,
			animation : config.animation,
			name : name

		} );

		var c = config.customConstructor || core.view;

		_self.views[ name ] = new c( name, core.util.appendDOMString( _self.container, tmpl ), template, model, _self, config );

		return _self.views[ name ];

	};

	core.viewManager.prototype.destroyView = function( name ) {
		var _self = this;

		delete _self.views[ name ];

	};




} )( window.app, window.app.templates, window.app.core, window.Mustache );