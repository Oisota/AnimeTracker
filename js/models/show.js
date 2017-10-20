const State = require('ampersand-state');

module.exports = State.extend({
	props: {
		title: 'string',
		url: 'string',
		episode: 'number',
		removeId: 'string',
		infoId: 'string'
	},
	initialize: function() {
		this.removeId = this.genID();
		this.infoId = this.genID();
	},
	next: function() {
		this.episode = Number(this.episode) + 1;
		return this.url.replace('{}', this.episode);
	},
	genID: function() {
		return '_' + Math.random().toString(36).substr(2, 9);
	}
});
