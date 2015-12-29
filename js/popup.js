/*
 * Main entry point of the application.
 */
$(document).ready(function() {
    $('#add-show').click(App.Util.addShow);
    App.Collections.shows = new App.Collections.Show();
    App.Collections.shows.load({
        success: function(response) {
            App.Collections.shows.add(response.shows)
            App.Views.showListView = new App.Views.ShowList({
                collection: App.Collections.shows
            });
        },
        error: function(response) {
            console.log('Error retrieving collection');
            console.log(response);
        }
    });
});
