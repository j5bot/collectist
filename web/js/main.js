(function (global, undefined) {

	define('main', ['backbone', 'app/collectist-router'], function (Backbone, Router) {

		var app = {},
			router = new Router({
				app: app
			});

		app.router = router;

		Backbone.history.start({
			pushState: true
		});

	});

	require(['main']);

}(window));