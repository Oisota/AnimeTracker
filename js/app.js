const app = require('ampersand-app');
const ShowCollection = require('./collections/show-collection');
const ShowListView = require('./views/show-list');
const AddShowView = require('./views/add-show');

window.app = app;

app.extend({
	init: function () {
		this.shows = new ShowCollection();

		this.showsView = new ShowListView({
			el: document.getElementById('show-list-view'),
			collection: this.shows
		});

		this.addShowView = new AddShowView({
			el: document.getElementById('add-show-view'),
			collection: this.shows
		});

	}
});

app.init();
