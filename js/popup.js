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

/*
 * Listen for message events and if it is a response from
 * the template page, then update the showlist with the
 * new show data.
 */
window.addEventListener('message', function(event) {
    if (event.data.template === 'show') {
        $('#show-list').append(event.data.html);
        addListeners(event.data.shows);
    }
});

/*
 * Add button event listeners
 */
function addListeners(shows) {
    for (var i=0; i<shows.length; i++) {
        //delete show
        $('#' + shows[i].confirmRemoveId).click((function(id) {
            return function() {
                Storage.removeShow(id); 
            };
        })(shows[i].id));

        //update show info
        $('#' + shows[i].confirmInfoId).click((function(show) {
            return function() {
                show.title = $('#' + show.titleInputId).val();
                show.baseUrl = $('#' + show.urlInputId).val();
                show.episode = $('#' + show.episodeInputId).val();
                show.url = show.baseUrl.replace('{}', show.episode);
                Storage.update(show);
            }
        })(shows[i]));

        //cancel show update info
        $('#' + shows[i].cancelInfoId).click((function(show) {
            return function() {
                $('#' + show.titleInputId).val(show.title);
                $('#' + show.urlInputId).val(show.baseUrl);
                $('#' + show.episodeInputId).val(show.episode);
            }
        })(shows[i]));

        //next episode
        $('#' + shows[i].nextId).click((function(show) {
            return function() {
                var tempUrl = show.url;
                show.url = show.baseUrl.replace('{}', ++show.episode);
                Storage.update(show);
                chrome.tabs.create({
                    url: tempUrl
                });
            }
        })(shows[i]));

        //previous episode
        $('#' + shows[i].prevId).click((function(show) {
            return function() {
                if (show.episode > 1) {
                    show.url = show.baseUrl.replace('{}', --show.episode);
                }
                Storage.update(show);
                chrome.tabs.create({
                    url: show.url
                });
            }
        })(shows[i]));
    }
}
