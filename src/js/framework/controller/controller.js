

( function( app, templates, core, mst ) {

	core.controller = function() {
		var _self = this;

		_self.pageDiv = document.getElementById( "viewContainer" );
		_self.viewController = new core.viewManager( _self.pageDiv, {} );

	}

})( window.app, window.app.templates, window.app.core, window.Mustache );