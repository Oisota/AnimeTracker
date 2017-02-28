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
		const url = this.model.get('url');
		const episode = Number(this.model.get('episode'));
		this.model.set('episode', episode + 1);
		chrome.tabs.create({
			url: url.replace('{}', episode)
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
