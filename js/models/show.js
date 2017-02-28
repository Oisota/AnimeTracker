'use strict';
var App = App || {};
App.models = App.models || {};

App.models.Show = Backbone.Model.extend({
	initialize: function() {
		this.set({
			removeId: this.genID(),
			infoId: this.genID()
		});
	},
	next: function() {
		const url = this.get('url');
		const episode = Number(this.get('episode'));
		this.set('episode', episode + 1);
		return url.replace('{}', this.get('episode'));
	},
	genID: function() {
		return '_' + Math.random().toString(36).substr(2, 9);
	}
});
