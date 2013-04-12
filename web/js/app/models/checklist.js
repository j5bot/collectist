require([
	'backbone',
	'underscore',
	'namespace',
	'bigbit'
], function (Backbone, _, namespace, BigBit) {

	namespace('org.Collectist.App.Models', {
		Checklist: Backbone.Model.extend({
			defaults: {
				data: []
			},

			idAttribute: 'id',

			initialize: function () {
				this.set('bytes', new BigBit(this.get('data'), 8));
			}
		})
	});

});