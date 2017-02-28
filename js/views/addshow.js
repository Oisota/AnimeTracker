'use strict';
var App = App || {};
App.views = App.views || {};

App.views.AddShow = Backbone.View.extend({
	template: App.templates.renderAddShow,
	events: {
		'submit #new-show-form': 'addShow',
		'hide.bs.collapse #new-show-form': 'hide',
		'show.bs.collapse #new-show-form': 'show'
	},
	initialize: function() {
		this.render();
	},
	render: function() {
		this.$el.html(this.template());
		return this;
	},
	addShow: function(event) {
		event.preventDefault();
		this.collection.add({
			title: this.$('#title-input').val(),
			url: this.$('#url-input').val(),
			episode: this.$('#episode-input').val()
		});
		event.target.reset();
		this.$('#title-input').focus();
	},
	hide: function() {
		this.$('#show-dropdown-btn')
			.html('<span class="glyphicon glyphicon-menu-down"></span>');
	},
	show: function() {
		this.$('#show-dropdown-btn')
			.html('<span class="glyphicon glyphicon-menu-up"></span>');
	}
});
