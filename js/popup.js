'use strict';
var App = App || {};

/*
 * Main entry point of the application.
 */
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


document.getElementById('add-show').addEventListener('click', (event) => {
    const fields = ['#title-input','#url-input','#episode-input'];
    if (App.util.fieldsEmpty(window, fields)) {
        return;
    }
    //get show data
    const title = $('#title-input').val();
    const baseUrl = $('#url-input').val();
    const episode = $('#episode-input').val();
    const url = baseUrl.replace('{}', episode);

    shows.add({
        title: title,
        baseUrl: baseUrl,
        url: url,
        episode: episode
    });

    App.util.clearFields(fields);
});

document.getElementById('cancel-add').addEventListener('click', (event) => {
    App.util.clearFields(['#title-input','#url-input','#episode-input']);
});
