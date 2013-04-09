define([
	'backbone',
	'_',
	'namespace',
	'jquery',
	'knockout',
	'knockback'
], function (Backbone, _, namespace, $, ko, kb) {

	namespace('org.Collectist.App.ViewModels', {
		Series: kb.ViewModel.extend({
			constructor: function (model, options, viewModel) {
				var series = this;

				series.id = kb.observable(model, 'id');
				series.name = kb.observable(model, 'name');
				series.description = kb.observable(model, 'description');
				series.colors = kb.observable(model, 'colors');
				series.stickers = kb.observable(model, 'stickers');
				series.images = kb.observable(model, 'images');
				series.prefix = kb.observable(model, 'prefix');
				series.start = kb.observable(model, 'start');
				series.end = kb.observable(model, 'end');
				series.offset = kb.observable(model, 'offset');
				series.source = kb.observable(model, 'source');

				kb.ViewModel.prototype.constructor.apply(series, arguments);
			}
		})
	});

});