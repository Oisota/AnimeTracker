/*
 * Execute code when the document has loaded fully
 */
$(document).ready(function() {
    $('#add-show').click(function() {
        if (App.Util.fieldsEmpty(['#title-input','#url-input','#episode-input'])) {
            return
        }
        var title = $('#title-input').val();
        var baseUrl = $('#url-input').val();
        var episode = $('#episode-input').val();
        var url = baseUrl.replace('{}', episode);
        window.shows.add(new App.ShowModel({
            title: title,
            baseUrl: baseUrl,
            url: url,
            episode: episode
        }));
    });

    chrome.storage.sync.get('shows', function(items) {
        window.shows = new App.ShowCollection(items.shows);
        window.showListView = new App.ShowListView({
            collection: window.shows
        });
    });
});
