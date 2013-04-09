require([
	'backbone',
	'underscore',
	'namespace'
], function (Backbone, _, namespace) {

	namespace('org.Collectist.App.Models', {
		ItemList: Backbone.Model.extend({
			url: function () {
				return 'data/' + (this.get('source') || 'items') + '.json';
			}
		})
	});

});