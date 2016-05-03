describe("Data Bound Element: innerText", function() {
	var _self = this;

	var setup = function( d ) {

		d.getElementsByTagName( 'body' )[ 0 ].innerHTML = "";
		_self.testEnv = {};
		_self.testEnv.el = d.createElement( 'div' );
		_self.testEnv.el.classList.add( 'testel' );
		var b =  d.querySelector( 'body' );
		b.appendChild( _self.testEnv.el );
		_self.testEnv.data = {
			user : {
				name : "amman"
			}
		};

		_self.testEnv.el = d.querySelector( ".testel" );
		_self.testEnv.b = new bound.BoundElement( _self.testEnv.el, _self.testEnv.data, "user.name", "TEXT" );
	};

	beforeEach( function( done ) {

		/**
		 * check if the DOM content is loaded and if not wait for it and then proceed with setup
		 */
		if( document.readyState == "complete" || document.readyState == "loaded" || document.readyState == "interactive" ) {
			setup( document );
			done();
		} else {

			document.addEventListener("DOMContentLoaded", function(event) {
				setup( document );
				done();
			});
		}
	} );

	it("adds the correct data on init", function() {
		return expect( _self.testEnv.el.innerText ).toBe( "amman" );
	});

	it("changes data on json update", function() {

		_self.testEnv.data.user.name = "dave";
		expect( _self.testEnv.el.innerText ).toBe( "dave" );
	});


});

describe("Data Bound Element: Input Element", function() {
	var _self = this;

	var setup = function( d, type ) {

		d.getElementsByTagName( 'body' )[ 0 ].innerHTML = "";
		_self.testEnv = {};
		_self.testEnv.el = d.createElement( 'input' );
		_self.testEnv.el.setAttribute( 'type', type );
		_self.testEnv.el.setAttribute( 'name', type+"input" );
		_self.testEnv.el.classList.add( 'testel' );
		var b =  d.querySelector( 'body' );
		b.appendChild( _self.testEnv.el );
		_self.testEnv.data = {
			user : {
				name : "amman"
			}
		};

		_self.testEnv.el = d.querySelector( ".testel" );
		_self.testEnv.b = new bound.BoundElement( _self.testEnv.el, _self.testEnv.data, "user.name", "INPUT" );
	};

	beforeEach( function( done ) {

		/**
		 * check if the DOM content is loaded and if not wait for it and then proceed with setup
		 */
		if( document.readyState == "complete" || document.readyState == "loaded" || document.readyState == "interactive" ) {
			setup( document, "text" );
			done();
		} else {

			document.addEventListener("DOMContentLoaded", function(event) {
				setup( document, "text" );
				done();
			});
		}
	} );

	it("adds the correct data on init", function() {
		return expect( _self.testEnv.el.value ).toBe( "amman" );
	});

	it("changes data on json update", function() {
		_self.testEnv.data.user.name = "dave";
		expect( _self.testEnv.el.value ).toBe( "dave" );
	});

	it("changes object on input update", function() {

		_self.testEnv.el.value = "lionel messi";
		expect( _self.testEnv.data.user.name ).toBe( "lionel messi" );
	});


});