(function (global, undefined) {

	define('main',
		['backbone', 'namespace', 'app/collectist-router'],
		function (Backbone, namespace, Router) {

		var app = {},
			router = new Router({
				app: app
			});

		namespace('org.Collectist', {
			app: app
		});

		app.router = router;

		Backbone.history.start({
			pushState: true
		});

	});

	require(['main']);

}(window));