/* Collectist Router */
define([
	'backbone',
	'underscore',
	'jquery',
	'namespace',
	'app/collections/series'
], function (Backbone, _, $, namespace) {

	namespace('org.Collectist.App', {
		Router: Backbone.Router.extend({
			routes: {
				'series/:seriesid': 'seriesRoute',
				'series/:seriesid/:checklist/:data': 'seriesRoute',
				'*url': 'defaultRoute'
			},

			seriesRoute: function (seriesid, checklist, data) {
				require(['app/modules/checklist/main'], function (checklist) {
					checklist(seriesid, checklist, data);
				});
			},

			defaultRoute: function (url) {
				require(['app/modules/checklist/main'], function (checklist) {
					checklist();
				});

				window.localStorage.setItem('latest-url', url || '');
			},

			initialize: function () {
				$(document).delegate('a', 'click', function (event) {
				    var href = $(this).attr('href');
				    var protocol = this.protocol + '//';

				    // Ensure the protocol is not part of URL, meaning its relative.
				    // Stop the event bubbling to ensure the link will not cause a page refresh.
				    if (href.slice(protocol.length) !== protocol) {
						event.preventDefault();
						org.Collectist.app.router.navigate(href, true);
					}
				});
			}
		})
	});

	return org.Collectist.App.Router;

});