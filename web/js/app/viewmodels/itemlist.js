define([
	'backbone',
	'underscore',
	'namespace',
	'jquery',
	'knockout',
	'knockback',

	'backbone-modelref'
], function (Backbone, _, namespace, $, ko, kb) {

	namespace('org.Collectist.App.ViewModels', {
		ItemList: kb.ViewModel.extend({
			constructor: function (model, options, viewModel) {
				var itemlist = this;

				kb.ViewModel.prototype.constructor.apply(itemlist, arguments);
			}
		})
	});

});