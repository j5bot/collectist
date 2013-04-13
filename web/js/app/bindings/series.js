define([
	'knockout'
], function (ko) {

	/**
	 * seriesitem binding handler wraps checked, click, and value bindings
	 */
	return ko.bindingHandlers['seriesitem'] = (function () {

		function makeTockOrIndex(serieslist, type, index, offset, sticker) {
			return function () {
				return serieslist[type](index, offset, sticker);
			};
		}

		function makeEventAccessor(event, func) {
			var eventAccessor = {};

			eventAccessor[event] = func;

			return function () {
				return eventAccessor;
			};
		}

		return {
			init: function (element, va, aba, viewModel, context) {
				var options = ko.utils.unwrapObservable(va());

				if (options.sticker && !options.serieslist.hasStickers()) {
					$(element).remove();
					return;
				}

				ko.bindingHandlers.checked.init(element,
					makeTockOrIndex(
						options.serieslist, 'tock', options.index,
							options.offset, options.colors),
					aba, viewModel, context);

				ko.bindingHandlers.event.init(element,
					makeEventAccessor('click', options.serieslist.tick),
					aba, viewModel, context);

				ko.bindingHandlers.value.init(element,
					makeTockOrIndex(
						options.serieslist, 'index', options.index,
							options.offset, options.colors),
					aba, viewModel, context);
			},
			update: function (element, va, aba, viewModel, context) {
				var options = ko.utils.unwrapObservable(va());

				if (options.sticker && !options.serieslist.hasStickers()) {
					$(element).remove();
					return;
				}

				ko.bindingHandlers.checked.update(element,
					makeTockOrIndex(
						options.serieslist, 'tock', options.index,
							options.offset, options.colors),
					aba, viewModel, context);

				ko.bindingHandlers.value.update(element,
					makeTockOrIndex(
						options.serieslist, 'index', options.index,
							options.offset, options.colors),
					aba, viewModel, context);
			}
		};
	}());

});