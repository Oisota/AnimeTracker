/*
 * Execute code when the document has loaded fully
 */
$(document).ready(function() {
    $('#add-show').click(Storage.addShow);
});

/*
 * When the window has fully loaded, load the
 * list of shows from chrome storage
 */
window.addEventListener('load', function() {
    chrome.storage.sync.get('shows', Storage.loadShows);
});
