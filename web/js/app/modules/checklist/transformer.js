/**
 * app/modules/checklist/transformer.js
 *
 * read/write collection URLs
 **/
define([
	'bigbit'
], function (BigBit) {

	function makeCollection(series, value) {

		var arrCollectionSegments = value.split('.'),
			kvCollectionSegments = {},
			segment, checklist, bytes;

		// convert from array into key value pairs
		if (arrCollectionSegments.length % 3 === 0) {
			for (var i = 0, l = arrCollectionSegments.length; i < l; i += 3) {
				kvCollectionSegments[arrCollectionSegments[i]] = {
					series: arrCollectionSegments[i],
					checklist: arrCollectionSegments[i + 1],
					data: arrCollectionSegments[i + 2]
				};
			}
		}

		_.each(series, function (series, index, collection) {
			if (kvCollectionSegments[series.prefix]) {
				segment = kvCollectionSegments[series.prefix];
				checklist = series.get(segment.series).get('checklists').get(segment.checklist);
				bytes = new BigBit([], 8);
				bytes.fromBase64(segment.data);
				checklist.bytes(bytes);
			}
		});

	}

	function stringifyCollection(series) {
		_.each(series, function (series, index, collection) {

		});
	}

	/**
	 * transformer module
	 * 
	 * @param  {String} value when value is specified, a collection of checklists
	 *                        will be returned matching with the value
	 * @return {String}       a partial URL representing all series and checklists in the
	 *                        current app
	 */
	return function (series, value) {

		if (value !== undefined) {
			return makeCollection(series, value);
		} else {
			return stringifyCollection(series);
		}

	};

});