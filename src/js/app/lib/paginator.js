
( function( app, templates, core, mst ) {

	app.paginator = function( container, config ) {
		var _self = this;

		_self.config = config;
		_self.container = container;

		_self.element = core.util.appendDOMString( _self.container, Mustache.render( templates.paginator, {} ) );

		_self.back = _self.container.querySelector( '.js-btn-back' );
		_self.forward = _self.container.querySelector( '.js-btn-fwd' );

		_self.listen();
	};

	app.paginator.prototype.listen = function() {
		var _self = this;

		_self.back.addEventListener( 'click', function() {

			_self.config.backCallback.call( _self.config.context );

		}, true );

		_self.forward.addEventListener( 'click', function() {

			_self.config.forwardCallback.call( _self.config.context );

		}, true );

	}

	app.paginator.prototype.show = function() {
		var _self = this;

		_self.element.classList.add( 'fading' );
	}

	app.paginator.prototype.hide = function() {
		var _self = this;

		_self.element.classList.remove( 'fading' );
	}


})( window.app, window.app.templates, window.app.core, window.Mustache );