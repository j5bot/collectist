/**
 * main.js
 *
 * Bootstraps the site by instantiating the Backbone Router.
 * The Backbone Router brings in the Series collection,
 * which brings in the Series model.
 *
 * See app/collectist-router for information on app init.
 */

/**
 * Create the module 'main' by declaring the dependencies,
 * and defining the code which executes when 'main' is required
 */
define('main', [
	'backbone',
	'namespace',
	'env/app-config',
	'app/collectist-router'
], function (Backbone, namespace, config, Router) {

	// create and namespace the application object
	var app = {};
	namespace('org.Collectist', {
		app: app
	});

	// load app configuration for site
	config(app);

	// create the app router
	var router = new Router({
		app: app
	});
	app.router = router;

	// start Backbone's history management
	Backbone.history.start({
		pushState: true
	});

});

/**
 * Execute 'main' module by requiring it
 */
require(['main']);