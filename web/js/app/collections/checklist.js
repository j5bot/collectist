/**
 * app/collections/checklist.js
 *
 * the checklist collection is an explicitly set collection containing
 * 'have', 'want', 'sell', and 'trade' checklists
 *
 * the checklists are stored with localStorage via the plugin, and
 * fetched on init, with a default added for any missing lists
 */
define([
	'backbone',
	'underscore',
	'namespace',
	'plugins/backbone-localstorage',
	'app/models/checklist'
], function (Backbone, _, namespace) {

	namespace('org.Collectist.App.Collections', {
		Checklist: Backbone.Collection.extend({
			localStorage: new Backbone.LocalStorage('checklist'),
			constructor: function (models, options) {
				this.series = options.series;
				this.checklist = options.checklist;
				this.localStorage = new Backbone.LocalStorage(this.guest ? this.user : 'checklist');
				this.constructor.__super__.constructor.apply(this, arguments);
			},
			initialize: function () {
				var app = org.Collectist.app,
					checklists = this;

				this.fetch({
					success: function (model, response, options) {
						_.each(['have','want','sell','trade'], function (item, index, collection) {
							checklists.addDefault(item);
						});
					},
					error: function (a,b,c) {
						debugger;
					}
				});
			},
			addDefault: function (name) {
				var seriesid = this.series.id;
				if (!this.get(seriesid + '/' + name)) {
					this.add(this.create({ id: seriesid + '/' + name }));
				}
			}
		})
	});

	return org.Collectist.App.Collections.Checklist;

});