'use strict';
(() => {
	const shows = new App.collections.Show();
	new App.views.ShowList({
		el: document.getElementById('show-list-view'),
		collection: shows
	});
	new App.views.AddShow({
		el: document.getElementById('add-show-view'),
		collection: shows
	});
	shows.load();
})();
