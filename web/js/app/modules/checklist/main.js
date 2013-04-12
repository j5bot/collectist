define([
	'backbone',
	'underscore',
	'namespace',

	'knockout',
	'knockback',

	'plugins/knockout-jquery',
	'backbone-modelref',

	'app/collections/series',
	'app/viewmodels/app',
	'app/viewmodels/series',
	'app/viewmodels/itemlist',

	'app/bindings/series'
], function (Backbone, _, namespace, ko, kb) {

	var app = org.Collectist.app,
		router = app.router,

		App = org.Collectist.App,
		Collections = App.Collections,
		Models = App.Models,
		ViewModels = App.ViewModels,

	series = new Collections.Series(null, {
		model: Models.Series,
		url: '/data/series.json'
	});

	return function (currentSeries, currentChecklist) {

		if (currentSeries && app.appViewModel) {
			app.appViewModel.current(currentSeries);
		} else {
			series.fetch({
				currentSeries: currentSeries,
				currentChecklist: currentChecklist,
				success: function (collection, response, options) {
					var currentSeries = options.currentSeries || series.at(0).get('id'),
						currentChecklist = options.currentChecklist ||
							series.at(0).get('checklists').at(0).id || 'have',

						appViewModel = new ViewModels.App(new Backbone.Model({
						current: currentSeries,
						checklist: currentChecklist,
						series: series
					}), {
						factories: {
							'series.models': ViewModels.Series,
							'series.models.itemlist': ViewModels.ItemList,
							'series.models.checklists.models': ViewModels.Checklist
						}
					});

					router.navigate('/series/' + currentSeries);

					// debugger;
					$('#app').append($('#main-template').html());
					$('#menu').append($('#menu-template').html());

					ko.applyBindings.$(appViewModel, '#menu', true);
					ko.applyBindings.$(appViewModel, '#app', true);

					app.appViewModel = appViewModel;
				},
				error: function (collection, response, options) {
					debugger;
				}
			});
		}
	};
});