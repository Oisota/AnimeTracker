const View = require('ampersand-view');
const showListTemplate = require('../templates/show-list.html');
const ShowView = require('./show');

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
	render: function() {
		this.$el.empty();

		if (this.collection.length === 0) {
			this.$el.html(this.template(true));
		} else {
			this.$el.html(this.template(false));
			const $ul = this.$el.find('ul');
			this.collection.each((function(model) {
				$ul.append((new ShowView({model: model})).render().el);
			}).bind(this));
		}

		return this;
	}
});
