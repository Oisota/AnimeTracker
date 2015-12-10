(function(exports) {
    /*
     * Add a show to the list of shows and add
     * it to chrome storage
     */
    exports.addShow = function() {
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
    }

    /*
     * Load shows and post a message to the sandboxed
     * iframe.
     */
    exports.loadShows = function(items) {
        var iframe = document.getElementById('sandbox-frame');
        var message = {
            command: 'render',
            template: 'show',
            context: items
        };
        iframe.contentWindow.postMessage(message, '*');
    }

    /*
     * Create new show object from the input data
     * in the add show form
     */
    var Show = function() {
        var show = {};

        show.title = $('#title-input').val();
        show.base_url = $('#url-input').val();
        show.episode = $('#episode-input').val();
        show.url = show.base_url.replace('{}', show.episode);
        show.removeId = generateId();
        show.confirmRemoveId = generateId();
        show.infoId = generateId();
        show.confirmInfoId = generateId();
        show.cancelInfoId = generateId();

        return show;
    }

    /*
     * Update the given url with the given
     * episode number
     */
    var updateUrl = function(episode, base_url) {
        return base_url.replace('{}', episode);
    }

    /*
     * Returns true if any of the fields in the
     * add show form are blank
     */
    var addShowFormEmpty = function() {
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
    var resetAddShowFields = function() {
        $('#title-input').val('');
        $('#url-input').val('');
        $('#episode-input').val('');
    }

    /*
     * Generate random and unique id's
     */
    var generateId = function() {
        return '_' + Math.random().toString(36).substr(2, 9);
    }
})(this.Util = {});
