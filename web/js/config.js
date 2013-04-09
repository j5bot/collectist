(function (global) {

	define('env-config', ['env/config-debug'], function (config) {

		requirejs.config({
			config: {
				'*': {
					prefix: 'gogos'
				}
			},
			baseUrl: 'js/lib',
			shim: {
				'backbone': {
					deps: ['underscore', 'jquery'],
					exports: 'Backbone'
				}
			}
		});
		requirejs.config(config);
		require(['/js/main.js']);
	});

	require(['env-config']);

}(window));