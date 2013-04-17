/**
 * env/app-config.js
 *
 * Define the application configuration module, which loads the
 * application's configuration JSON file, extends the app object
 * and updates elements in the page head (title and a new stylesheet)
 */
define([
	'jquery'
], function ($) {

	/**
	 * return the module as a function
	 *
	 * @param  {Object} app the application object to load data for
	 *                      and to extend with config data
	 */
	return function (app) {

		// get the hostname for the site, so we show the right one :)
		app.sitehost = window.location.hostname.split('.')[0];

		/**
		 * update things in the head of the document: the title and
		 * optional application stylesheet
		 *
		 * @param  {Object} response the JSON response received
		 * @param  {String} status   server response code
		 * @param  {jqXHR}  xhr      jqXHR object for the request
		 */
		function updateHead(response, status, xhr) {
			$.extend(app, response);

			// TODO: move into a separate location somewhere
			$('title').html(app.title + ' :: COLLECT / or checkl / IST');
			if (app.stylesheet) {
				$('head').
				append('<link rel="stylesheet" type="text/css" href="' + app.stylesheet + '" />');
			}
		}

		// load the app config for this site
		$.ajax({
			url: '/data/' + app.sitehost + '/config.json',
			type: 'get',
			contentType: 'application/json',
			success: updateHead
		});
	};

});