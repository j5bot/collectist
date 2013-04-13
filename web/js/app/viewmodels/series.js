define([
	'backbone',
	'underscore',
	'namespace',
	'jquery',
	'knockout',
	'knockback',

	'backbone-modelref'
], function (Backbone, _, namespace, $, ko, kb) {

	namespace('org.Collectist.App.ViewModels', {
		Series: kb.ViewModel.extend({
			constructor: function (model, options, viewModel) {
				var series = this;
				kb.ViewModel.prototype.constructor.apply(series, arguments);

				series.itemsection = ko.computed(function () {
					var series = this,
						itemlist = series.itemlist().items(),
						start = series.start && series.start(),
						end = series.end && series.end(),
						offset = series.offset && series.offset();

					if (offset === undefined) {
						offset = 0;
					}
					if (start === undefined) {
						start = 0;
					}
					if (end === undefined) {
						end = itemlist.length;
					}

					if (end + offset > itemlist.length + 1) {
						return [];
					}

					return itemlist.slice(start + offset - 1, end + offset).map(
						function (item, index, array) {
							var colors = (item.colors ||
								['1', '2', '3', '4', '5']).slice(0, series.colors());

							if (item['skip-color'] !== undefined) {
								colors.splice(item['skip-color'] - 1, 1);
							}
							item.colors = colors;
							return item;
						});

				}, series);

			},

			count: function () {
				return this.end() - this.start() + 1;
			},

			itemsize: function () {
				var series = this;
				return 1 +
					(series.stickers && series.stickers() ? 1 : 0) +
					(series.colors ? series.colors() : 0);
			},

			index: function (index, offset, checkStickers) {
				var series = this;
				return series.itemsize() * index() +
					(offset || 0) +
					(checkStickers && series.stickers && series.stickers() ? 1 : 0);
			},

			primaryImage: function (number) {
				number = number.toString().length === 1 ? '0' + number : number;
				return this.images() + number + '.gif';
			},

			secondaryImage: function (number, color) {
				number = number.toString().length === 1 ? '0' + number : number;
				return this.images() + number + '-color' + (color() + 1) + '.gif';
			},

			getChecklist: function () {
				var context = this,
					id = context.id(),
					checklist = context.checklist(),
					citems = ko.utils.arrayFilter(context.checklists(), function (item) {
						return item.id() === id + '/' + checklist;
					}),
					item = citems.length > 0 ? citems[0] : null;

				return item;
			},

			tick: function (data, event) {
				var router = org.Collectist.app.router,
					target = event.target,
					$target = $(target),
					context = ko.contextFor(target),
					checklist = context.serieslist.getChecklist(),

					data, item,
					position = parseInt($target.attr('value'), 10),
					checked = $target.is(':checked');

				if (checklist !== null) {
					data = checklist.bytes();
					data[checked ? 'on' : 'off'](position);
					checklist.bytes(data);
					Backbone.sync('update', checklist.model(), {
						success: function (model) {
							// debugger;
							router.navigate('series/' + model.id + '/' + data.toBase64());
						}
					});
				}

				return true;
			},

			tock: function (index, offset, checkStickers) {
				var checklist = this.getChecklist(),
					position = this.index(index, offset, checkStickers),
					data = checklist !== null ? checklist.bytes() : null;

				return data !== null ? data.read(position) : false;
			}
		})
	});

});