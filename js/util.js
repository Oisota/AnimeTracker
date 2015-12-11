(function(exports) {

    var storageKey = 'shows';

    /*
     * Add a show to the list of shows and add
     * it to chrome storage
     */
    exports.addShow = function() {
        if (fieldsEmpty(['title-input','url-input','episode-input'])) {
            return;
        }
        chrome.storage.sync.get(storageKey, function(s) {
            var iframe = document.getElementById('sandbox-frame');
            var show = Show('title-input', 'url-input', 'episode-input');
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
            resetFields(['title-input','url-input','episode-input']);
        });
    }

    /*
     * Load shows and post a message to the sandboxed
     * iframe.
     */
    exports.loadShows = function(shows) {
        var iframe = document.getElementById('sandbox-frame');
        var message = {
            command: 'render',
            template: 'show',
            context: shows
        };
        iframe.contentWindow.postMessage(message, '*');
    }

    /*
     * Remove a show from chrome storage
     */
    exports.removeShow = function(showId) {
        chrome.storage.sync.get(storageKey, function(items) {
            var idx = items.shows.map(function(x) {return x.id}).indexOf(showId);
            items.shows.splice(idx, 1);
            chrome.storage.sync.set(items)
        });
    }

    /*
     * Update storage with the given show
     */
    exports.updateStorage = function(show) {
        chrome.storage.sync.get(storageKey, function(items) {
            var idx = items.shows.map(function(x) {return x.id}).indexOf(show.id);
            items.shows[idx] = show;
            chrome.storage.sync.set(items)
        });
    }

    /*
     * Create new show object from the given input field Id's
     */
    var Show = function(titleField, urlField, episodeField) {
        var show = {};

        show.title = $('#' + titleField).val();
        show.baseUrl = $('#' + urlField).val();
        show.episode = $('#' + episodeField).val();
        show.url = show.baseUrl.replace('{}', show.episode);
        show.id = generateId();
        show.nextId = generateId();
        show.prevId = generateId();
        show.removeId = generateId();
        show.confirmRemoveId = generateId();
        show.infoId = generateId();
        show.confirmInfoId = generateId();
        show.cancelInfoId = generateId();

        return show;
    }

    /*
     * Check if given fields are empty. Returns
     * true if any one field is empty.
     */
    var fieldsEmpty = function(fields) {
        for (var i=0; i<fields.length; i++) {
            field = $('#' + fields[i]).val().trim();
            if (field === '') {
                return true;
            }
        }
        return false;
    }
        

    /*
     * blank out the given array of field Id's
     */
    var resetFields = function(fields) {
        for (var i=0; i<fields.length; i++) {
            $('#' + fields[i]).val('');
        }
    }

    /*
     * Generate random and unique id's
     */
    var generateId = function() {
        return '_' + Math.random().toString(36).substr(2, 9);
    }
})(this.Util = {});
