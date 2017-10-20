const View = require('ampersand-view');
const addShowTemplate = require('../templates/add-show.html');

module.exports = View.extend({
	template: addShowTemplate,
	autoRender: true,
	events: {
		'submit #new-show-form': 'addShow',
		'hide.bs.collapse #new-show-form': 'hide',
		'show.bs.collapse #new-show-form': 'show'
	},
	initialize: function() {
		this.render();
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
