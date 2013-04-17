/**
 * app/viewmodels/app.js
 *
 * the app viewmodel is responsible for loading the templates
 * into the page and is the container for series
 */
define([
	'namespace',
	'jquery',
	'knockback',
	'text!templates/checklist.html'
], function (namespace, $, kb, templateMarkup) {

	namespace('org.Collectist.App.ViewModels', {
		App: kb.ViewModel.extend({
			constructor: function (model, options, viewModel) {
				var app = this,
					$fragment = $(templateMarkup);

				$fragment.filter('script').each(function (index) {
					if (!document.getElementById(this.id)) {
						$('#templates').append(this);
					}
				});

				kb.ViewModel.prototype.constructor.apply(app, arguments);
			},

			isCurrent: function (seriesid) {
				return this.current() === seriesid();
			}
		})
	});

});