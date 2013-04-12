define([
	'backbone',
	'underscore',
	'namespace',
	'app/collections/checklist',
	'app/models/itemlist'
], function (Backbone, _, namespace) {

	namespace('org.Collectist.App.Models', {

		Series: Backbone.Model.extend({
			idAttribute: 'id',
			initialize: function () {
				// load localStorage data for checklists
				var series = this,

					App = org.Collectist.App,
					Collections = App.Collections,
					Models = App.Models,
					ViewModels = App.ViewModels;

				series.set({ 'itemlist': new Models.ItemList({
					source: this.get('source')
				}) });

				series.set({ 'checklist': 'have' });

				series.set({ 'checklists': new Collections.Checklist([], {
					model: org.Collectist.App.Models.Checklist,
					series: series
				}) });

				series.get('checklists').fetch({
					success: function (model, response, options) {

					}
				});

			}
		})

	});

	return org.Collectist.App.Models.Series;

});