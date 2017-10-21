const View = require('ampersand-view');
const addShowTemplate = require('../templates/add-show.html');

module.exports = View.extend({
	template: addShowTemplate,
	autoRender: true,
	events: {
		'submit #new-show-form': 'addShow',
	},
	initialize: function() {
		this.render();
	},
	addShow: function(event) {
		event.preventDefault();
		this.collection.add({
			title: this.query('#title-input').value,
			url: this.query('#url-input').value,
			episode: Number(this.query('#episode-input').value)
		});
		event.target.reset();
		this.query('#title-input').focus();
	}
});
