/*
 * Execute code when the document has loaded fully
 */
$(document).ready(function() {
    chrome.storage.sync.get('shows', Storage.loadShows);
    $('#add-show').click(Storage.addShow);
});
