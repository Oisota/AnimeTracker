'use strict';

var util = require('./util.js');
var collections = require('./collections.js');
var models = require('./models.js');
var views = require('./views.js');

/*
 * Main entry point of the application.
 */
document.addEventListener('load', () => {

    const shows = new collections.Show();
    shows.load({
        success: function(response) {
            shows.add(response.shows);
            const showListView = new views.ShowList({
                collection: shows
            });
        },
        error: function(response) {
            console.log('Error retrieving collection');
            console.log(response);
        }
    });


    document.getElementById('add-show').addEventListener('click', () => {
        util.addShow(shows, models.Show);
    });
    document.getElementById('cancel-add').addEventListener('click', util.cancelAddShow);
});
