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
        
        //add button evnet listeners
        var shows = event.data.shows;
        for (var i=0; i<shows.length; i++) {
            //delete show
            $('#' + shows[i].confirmRemoveId).click((function(id) {
                return function() {
                   Util.removeShow(id); 
                };
            })(shows[i].id));

            //update show info
            $('#' + shows[i].confirmInfoId).click((function(id) {
                return function() {
                }
            })(shows[i].id));

            //cancel show update info
            $('#' + shows[i].cancelInfoId).click((function(id) {
                return function() {
                }
            })(shows[i].id));

            //next episode
            $('#' + shows[i].nextId).click((function(show) {
                return function() {
                    var tempUrl = show.url;
                    show.url = show.baseUrl.replace('{}', ++show.episode);
                    Util.updateStorage(show)
                    chrome.tabs.create({
                        url: tempUrl
                    });
                }
            })(shows[i]));

            //previous episode
            $('#' + shows[i].prevId).click((function(show) {
                return function() {
                    var tempUrl = show.url;
                    if (show.episode > 1) {
                        show.url = show.baseUrl.replace('{}', --show.episode);
                    }
                    Util.updateStorage(show)
                    chrome.tabs.create({
                        url: tempUrl
                    });
                }
            })(shows[i]));
        }
    }
});
