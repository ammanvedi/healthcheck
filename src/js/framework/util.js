
( function( core ) {

	core.util = {};

	core.util.extend = function( a, b ) {

		for( var bp in b ) {

			if( !a[ bp ] ) {
				a[ bp ] = b[ bp ]
			}
		}
	};

	core.util.appendDOMString = function( container, string ) {

		var t = document.createElement( 'div' );
		t.innerHTML = string;
		return container.appendChild( t.children[ 0 ] );

	};


} )( window.app.core );