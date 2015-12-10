/*
 * Execute code when the document has loaded fully
 */
$(document).ready(function() {
    $('#add-show').click(Util.addShow);
});

/*
 * When the window has fully loaded, load the
 * list of shows from chrome storage
 */
window.addEventListener('load', function() {
    chrome.storage.sync.get('shows', Util.loadShows);
});

/*
 * Listen for message events and if it is a response from
 * the template page, then update the showlist with the
 * new show data.
 */
window.addEventListener('message', function(event) {
    if (event.data.template === 'show') {
        $('#show-list').append(event.data.html);
    }
});
