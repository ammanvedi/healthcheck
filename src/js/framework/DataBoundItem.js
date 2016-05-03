

( function( bnd, mst ) {

	var propertyFromPath = function( object, path ) {

		path = path.split( "." );
		var current = object;
		path.forEach ( function( prop ) {

			current = current[ prop ];

		} );

		return current;
	};

	var getPropertyName = function( path ) {
		var p = path.split( "." );
		return p[ p.length - 1 ]
	};

	var getPropertyPath = function( path ) {
		var p = path.split( "." );

		if( p.length > 1 ) {
			return p.slice( 0, p.length - 1 )[0]
		}

		return "";

	};

	var bindTypes = {

		TEXT : {

			OBSERVE_PROPERTY : "innerText",

			SET : function( element, value, template ) {
				element.innerText = value;
			},

			GET : function( element ) {
				return element.innerText;
			}
		},

		INPUT : {

			OBSERVE_PROPERTY : "value",

			SET : function( element, value, template ) {
				element.value = value;
			},

			GET : function( element ) {
				return element.value;
			}
		},

		TEMPLATE : function( element, value, template ) {

		}

	};


	bnd.BoundElement = function( element, object, property, bindType ) {
		var _self = this;

		_self.el = element;

		_self.prop = property;
		_self.propName = getPropertyName( property );
		_self.__pseudo__ = false;
		_self.o = propertyFromPath( object, getPropertyPath( property ) );
		_self.__pseudo__ = _self.o[ _self.propName ];

		var getterFunction = function() {

			return _self.__pseudo__;
		};

		var setterFunction = function( val ) {

			_self.__pseudo__ = val;
			bindTypes[ bindType ][ "SET" ]( _self.el, _self.__pseudo__ );
		};

		Object.defineProperty( _self.o, _self.propName, {
			get: getterFunction,
			set: setterFunction,
			configurable: true
		});

		_self.observeElementProperty( bindTypes[ bindType ][ "OBSERVE_PROPERTY" ] );

		setterFunction( _self.__pseudo__ );

	};

	bnd.BoundElement.prototype.observeElementProperty = function( property ) {
		var _self = this;

		var pseudoProp = "__" + property + "__";

		var valGetter = function() {
			return this[ pseudoProp ];
		};

		var valSetter = function( value ) {

			_self.__pseudo__ = value;
			this[ pseudoProp ] = value;

		};

		Object.defineProperty( _self.el, property, {
			get: valGetter,
			set: valSetter,
			configurable: true
		});

	}



} )( window.bound, window.Mustache );

