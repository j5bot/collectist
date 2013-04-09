define([
	'backbone',
	'underscore',
	'namespace',
	'plugins/backbone-localstorage',
	'app/models/checklist'
], function (Backbone, _, namespace) {

	namespace('org.Collectist.App.Collections', {
		Checklist: Backbone.Collection.extend({
			localStorage: new Backbone.LocalStorage('checklist')
		})
	});

	return org.Collectist.App.Collections.Checklist;

});