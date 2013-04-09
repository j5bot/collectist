define([], function () {
	return {
		paths: {
			// DOM and "looks"
			'jquery':		[
				'//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery',
				'jquery'
			],
			'bootstrap':	[
				'//netdna.bootstrapcdn.com/twitter-bootstrap/2.3.1/js/bootstrap',
				'bootstrap'
			],

			'knockback':	'knockback-core',

			// app framework
			'underscore':	'lodash.underscore',

			// app itself
			'app':			'../app',

			// data
			'data':			'../../data',

			// html fragments
			'tmpl':			'../../templates',
			'templates':	'../../templates'
		}
	};
});