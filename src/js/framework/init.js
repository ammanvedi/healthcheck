window.app = {};
window.app.core = {};
window.app.view = {};
window.app.templates = {};
window.app.controller = {};

document.onreadystatechange = function () {
	var state = document.readyState;
	if (state == 'interactive') {

		var page = document.querySelector( "[data-controller]" );

		window.pageControl = new app.controller[ page.getAttribute( "data-controller" ) ];

	}
};