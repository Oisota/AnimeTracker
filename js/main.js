'use strict';

const shows = new App.collections.Show();
shows.load({
    success: function(response) {
        shows.add(response.shows);
        const showListView = new App.views.ShowList({
            collection: shows
        });
    },
    error: function(response) {
        console.log('Error retrieving collection');
        console.log(response);
    }
});

const addShowView = new App.views.AddShow({
    el: document.getElementById('new-show-form'),
    collection: shows
});
