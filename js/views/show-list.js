const View = require('ampersand-view');
const showListTemplate = require('../templates/show-list.html');

module.exports = View.extend({
	template: showListTemplate,
	autoRender: true,
	initialize: function() {
		this.listenTo(this.collection, 'change', (function() {
			this.collection.save();
		}).bind(this));

		this.listenTo(this.collection, 'update', function(collection) {
			collection.save();
			this.render();
		});

		this.render();
	},
});
