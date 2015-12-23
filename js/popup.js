/*
 * Execute code when the document has loaded fully
 */
$(document).ready(function() {
    //chrome.storage.sync.get(Storage.getKey(), Storage.loadShows);
    //$('#add-show').click(Storage.addShow);
    window.shows = new app.ShowCollection([
            {title: 'Yu Yu Hakusho', baseUrl: 'http://www.google.com', url: 'http://www.google.com', episode: 1},
            {title: 'Dragon Ball Z', baseUrl: 'http://www.google.com', url: 'http://www.google.com', episode: 1},
            {title: 'Death Note', baseUrl: 'http://www.google.com', url: 'http://www.google.com', episode: 1},
    ]);
    window.showListView = new app.ShowListView({
        collection: window.shows
    });
});

function gen_id() {
    return '_' + Math.random().toString(36).substr(2, 9);
}
