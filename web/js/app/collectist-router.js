/**
 * app/collectist-router.js
 *
 * define the main application router as an anonymous module,
 * but also namespace it as org.Collectist.App.Router
 */
define([
	'backbone',
	'underscore',
	'jquery',
	'namespace',
	'app/collections/series'
], function (Backbone, _, $, namespace) {

	namespace('org.Collectist.App', {
		Router: Backbone.Router.extend({
			initialize: function () {
				/**
				 * handle all clicks on A elements by delegating to the router
				 */
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
			},

			routes: {
				'collectist/:userref/:collection': 'collectistRoute',
				'series/:seriesid': 'seriesRoute',
				'series/:seriesid/:checklist/:data': 'seriesRoute',
				'*url': 'defaultRoute'
			},

			collectistRoute: function (userref, collection) {
				var site = this.sitehost;
				require(['app/modules/checklist/main'], function (checklistModule) {
					checklistModule({ site: site, user: userref, collection: collection });
				});
			},

			seriesRoute: function (seriesid, checklist, data) {
				var site = this.sitehost;
				require(['app/modules/checklist/main'], function (checklistModule) {
					checklistModule({
						site: site,
						seriesid: seriesid,
						checklist: checklist,
						data: data
					});
				});
			},

			defaultRoute: function (url) {
				var site = this.sitehost;
				require(['app/modules/checklist/main'], function (checklist) {
					checklist({ site: site });
				});
			},

			/**
			 * navigate:    override the default navigation behavior to
			 *				add params behavior similar to inbound routes
			 * 
			 * @param  {String} url     url to navigate to, can include :foo style params
			 * @param  {Object} options options object or true/false
			 * @param  {Object} params  params object to merge with url
			 *
			 * example:		router.navigate('/category/:category/item/:item',
			 *					true,
			 *					{
			 *						'category': 'foo',
			 *						'item': 'baz'
			 *					}
			 *				);
			 *
			 *				navigates to '/category/foo/item/baz'
			 */
			navigate: function (url, options, params) {
				var param, paramValue;

				function mergeParam (value, param) {
					if (value !== undefined && value !== 'undefined') {
						url = url.replace(':' + param, value);
					}
				}

				if (params) {
					_.forEach(params, mergeParam);
					url = url.replace(/\:[a-z0-9_-]*/ig, '').replace('//','/');
				}
				// run the original navigation method with the new, merged url
				this.constructor.__super__.navigate(url, options);
			}
		})
	});

	return org.Collectist.App.Router;
});