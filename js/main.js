'use strict';

const shows = new App.collections.Show();
shows.load({
    success: response => {
        shows.add(response.shows);
        const showListView = new App.views.ShowList({
            collection: shows,
            el: document.getElementById('show-list-view')
        });
    },
    error: response => {
        console.log('Error retrieving collection');
        console.log(response);
    }
});

const addShowView = new App.views.AddShow({
    el: document.getElementById('add-show-view'),
    collection: shows
});
