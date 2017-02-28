'use strict';
var App = App || {};
App.views = App.views || {};

App.views.Show = Backbone.View.extend({
	tagName: 'li',
	className: 'list-group-item',
	template: App.templates.renderShow,
	events: {
		'click .next': 'next',
		'submit .update': 'update',
		'click .remove': '_remove'
	},
	initialize: function() {
		this.listenTo(this.model, 'change', this.render);
		this.render();
	},
	render: function() {
		const html = this.template(this.model.toJSON());
		this.$el.html(html);
		return this;
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
