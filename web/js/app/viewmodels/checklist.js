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
		Checklist: kb.ViewModel.extend({
			constructor: function (model, options, viewModel) {
				var checklist = this;

				kb.ViewModel.prototype.constructor.apply(checklist, arguments);
			}
		})
	});

});