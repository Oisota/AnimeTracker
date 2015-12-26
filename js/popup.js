/*
 * Main entry point of the application.
 */
$(document).ready(function() {
    $('#add-show').click(App.Util.addShow);
    App.Collections.shows = new App.Collections.Show();
    App.Collections.shows.fetch({
        success: function(collection, response, options) {
            App.Views.showListView = new App.Views.ShowList({
                collection: App.Collections.shows
            });
        },
        error: function(collection, response, options) {
            console.log('Error retrieving collection');
            console.log(response);
        }
    });
});
