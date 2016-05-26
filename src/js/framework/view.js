
( function( app, templates, core, mst ) {

	core.view = function( name, container, template, model, viewManager, config ) {
		var _self = this;

		_self.template = template;
		_self.container = container;
		_self.manager = viewManager;
		_self.config = config;
		_self.name = name;
		_self.model = model;
		_self.isRendered = false;

	};

	core.view.prototype.init = function() {};

	core.view.prototype.dismiss = function() {
		var _self = this;

		_self.manager.dismissView( _self.name, _self.config.animation );

	};

	core.view.prototype.present = function() {
		var _self = this;

		_self.manager.presentView( _self.name, _self.config.animation );

	};

	core.view.prototype.render = function( cb, model ) {
		var _self = this;

		_self.container.innerHTML = mst.render( _self.template, model || _self.model );
		_self.isRendered = true;

		_self.init();

		if( cb ){ cb(); }

	}

} )( window.app, window.app.templates, window.app.core, window.Mustache );