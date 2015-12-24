/*
 * Execute code when the document has loaded fully
 */
$(document).ready(function() {
    $('#add-show').click(App.Util.addShow);
    chrome.storage.sync.get('shows', function(items) {
        App.Collections.shows = new App.Collections.Show(items.shows);
        App.Views.showListView = new App.Views.ShowList({
            collection: App.Collections.shows
        });
    });
});
