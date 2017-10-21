const Collection = require('ampersand-collection');
const ShowModel = require('../models/show');

module.exports = Collection.extend({
	model: ShowModel,
	initialize: function () {
		this.on('add', this.save);
		this.on('remove', this.save);
		this.load();
	},
	save: function() {
		chrome.storage.sync.set({'shows': this.toJSON()}, (function() {
			if (chrome.runtime.lastError) {
				console.log('Error: Collection Could Not Be Saved');
				console.log(chrome.runtime.lastError.message);
			} else {
				console.log('Saving Shows');
				console.log(this.toJSON());
			}
		}).bind(this));
	},
	load: function() {
		chrome.storage.sync.get('shows', (function(items) {
			if (chrome.runtime.lastError) {
				console.log('Error Loading Shows');
				console.log(chrome.runtime.lastError.message);
			} else {
				console.log('Loading Shows');
				this.add(items.shows);
			}
		}).bind(this));
	}
});
