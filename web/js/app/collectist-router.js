/* Collectist Router */
define([
	'backbone',
	'underscore',
	'namespace',
	'app/collections/series'
], function (Backbone, _, namespace) {

	namespace('org.Collectist.App', {
		Router: Backbone.Router.extend({
			routes: {
				'*url': 'defaultRoute'
			},

			defaultRoute: function (url) {

				require(['app/modules/checklist/main']);

				window.localStorage.setItem('latest-url', url || '');
			},

			initialize: function () {}
		})
	});
	
	return org.Collectist.App.Router;

});