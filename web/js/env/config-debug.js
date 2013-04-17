define([], function () {
	return {
		paths: {
			// DOM and "looks"
			'jquery':		[
				'//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery',
				'jquery'
			],

			'knockback':	'knockback-core',

			// app framework
			'underscore':	'lodash.underscore',

			// app itself
			'app':			'../app',
			'env':			'../env',

			// data
			'data':			'../../data',

			'backbone-modelref':	'plugins/backbone-modelref',

			// html fragments
			'tmpl':			'../../templates',
			'templates':	'../../templates'
		}
	};
});