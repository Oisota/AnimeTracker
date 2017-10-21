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
			title: this.query('#title-input').value,
			url: this.query('#url-input').value,
			episode: this.query('#episode-input').value
		});
		event.target.reset();
		this.query('#title-input').focus();
	},
	hide: function() {
		this.query('#show-dropdown-btn').innerHTML = '<span class="glyphicon glyphicon-menu-down"></span>';
	},
	show: function() {
		this.query('#show-dropdown-btn').innerHTML = 'span class="glyphicon glyphicon-menu-up"></span>';
	}
});
