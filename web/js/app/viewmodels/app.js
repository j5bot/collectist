define([
	'backbone',
	'underscore',
	'namespace',
	'jquery',
	'knockout',
	'knockback',
	'text!templates/checklist.html'
], function (Backbone, _, namespace, $, ko, kb, templateMarkup) {

	namespace('org.Collectist.App.ViewModels', {
		App: kb.ViewModel.extend({
			constructor: function (model, options, viewModel) {
				var app = this,
					$fragment = $(templateMarkup);

				app.templates = {};

				$fragment.filter('script').each(function (index) {
					if (!document.getElementById(this.id)) {
						$('#templates').append(this);
					}
				});

				kb.ViewModel.prototype.constructor.apply(app, arguments);
			}
		})
	});

});