define([
	'backbone',
	'underscore',
	'namespace',

	'knockout',
	'knockback',

	'plugins/knockout-jquery',
	'plugins/backbone-modelref',

	'app/collections/series',
	'app/viewmodels/app'
], function (Backbone, _, namespace, ko, kb) {

	var App = org.Collectist.App,
		Collections = App.Collections,
		Models = App.Models,
		ViewModels = App.ViewModels,

	series = new Collections.Series(null, {
		model: Models.Series,
		url: 'data/series.json'
	}),

	appViewModel = new ViewModels.App(series);

	series.fetch({
		success: function (collection, response, options) {
			// debugger;
			$('#app').append($('#main-template').html());

			ko.applyBindings.$(appViewModel, '#app', true);
		},
		error: function (collection, response, options) {
			debugger;
		}
	});

});