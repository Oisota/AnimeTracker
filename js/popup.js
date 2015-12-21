/*
 * Execute code when the document has loaded fully
 */
$(document).ready(function() {
    chrome.storage.sync.get(Storage.getKey(), Storage.loadShows);
    $('#add-show').click(Storage.addShow);
});
