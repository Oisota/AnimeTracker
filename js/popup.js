/*
 * Execute code when the document has loaded fully
 */
$(document).ready(function() {

    //load shows and post message to iframe
    chrome.storage.sync.get('shows', loadShows);

    $('#add-show').click(function() {
        if (addShowFormEmpty()) {
            return;
        }
        chrome.storage.sync.get('shows', function(s) {
            var iframe = document.getElementById('sandbox-frame');
            var show = Show();
            var message = {
                command: 'render',
                template: 'show',
                context: {
                    shows: [show]
                }
            };
            if (s.shows === undefined) {
                s.shows = [];
            }
            s.shows.push(show); //append new show object to show array 
            chrome.storage.sync.set(s); //save shows back to storage
            iframe.contentWindow.postMessage(message, '*'); 
            resetAddShowFields();
        });
    });
});

//load shows and post message to iframe
function loadShows(items) {
    var iframe = document.getElementById('sandbox-frame');
    var message = {
        command: 'render',
        template: 'show',
        context: items
    };
    iframe.contentWindow.postMessage(message, '*');
}


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

/*
 * Create new show object from the input data
 * in the add show form
 */
function Show() {
    var show = {};

    show.title = $('#title-input').val();
    show.base_url = $('#url-input').val();
    show.episode = $('#episode-input').val();
    show.url = show.base_url.replace('{}', show.episode);
    show.removeId = generateId();
    show.confirmRemoveId = generateId();
    show.infoId = generateId();

    return show;
}

/*
 * Update the given url with the given
 * episode number
 */
function updateUrl(episode, base_url) {
    return base_url.replace('{}', episode);
}

/*
 * Returns true if any of the fields in the
 * add show form are blank
 */
function addShowFormEmpty() {
    var title = $('#title-input').val().trim();
    var base_url = $('#url-input').val().trim();
    var episode = $('#episode-input').val().trim();

    if (title === '' || base_url === '' || episode === '') {
        return true;
    }
    return false;
}

/*
 * Set add show fields to be blank
 */
function resetAddShowFields() {
    $('#title-input').val('');
    $('#url-input').val('');
    $('#episode-input').val('');
}

/*
 * Generate random and unique id's
 */
function generateId() {
    return '_' + Math.random().toString(36).substr(2, 9);
}
