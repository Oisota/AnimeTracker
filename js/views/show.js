const View = require('ampersand-view');
const showTemplate = require('../templates/show.html');

module.exports = View.extend({
	template: showTemplate,
	autoRender: true,
	events: {
		'click .next': 'next',
		'submit .update': 'update',
		'click .remove': '_remove'
	},
	initialize: function() {
		this.listenTo(this.model, 'change', this.render);
	},
	next: function() {
		chrome.tabs.create({
			url: this.model.next()
		});
	},
	update: function(event) {
		event.preventDefault();
		this.model.set({
			title: this.$('.title').val(),
			url: this.$('.url').val(),
			episode: this.$('.episode').val()
		});
	},
	_remove: function() {
		this.model.destroy();
		this.remove();
	}
});
