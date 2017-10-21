const Collection = require('ampersand-collection');
const ShowModel = require('../models/show');

module.exports = Collection.extend({
	model: ShowModel,
	save: function() {
		chrome.storage.sync.set({'shows': this.toJSON()}, (function() {
			if (chrome.runtime.lastError) {
				console.log('Error: Collection Could Not Be Saved');
				console.log(chrome.runtime.lastError.message);
			} else {
				console.log('Collection Saved');
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