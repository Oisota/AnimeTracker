(function(exports) {

    var key = 'shows';

    /*
     * Add a show to the list of shows and add
     * it to chrome storage
     */
    exports.addShow = function() {
        if (fieldsEmpty(['title-input','url-input','episode-input'])) {
            return;
        }
        chrome.storage.sync.get(key, function(s) {
            var show = Show({
                title: $('#title-input').val(),
                url: $('#url-input').val(),
                episode: $('#episode-input').val()
            });
            var html = Handlebars.templates['show']({shows: [show]});
            $('#show-list').append(html);
            addListeners([show]);
            if (s.shows === undefined) {
                s.shows = [];
            }
            s.shows.push(show); //append new show object to show array 
            chrome.storage.sync.set(s); //save shows back to storage
            resetFields(['title-input','url-input','episode-input']);
        });
    }

    /*
     * Load shows and post a message to the sandboxed
     * iframe.
     */
    exports.loadShows = function(shows) {
        var html = Handlebars.templates['show'](shows);
        $('#show-list').append(html);
        addListeners(shows.shows);
    }

    /*
     * Remove a show from chrome storage
     */
    exports.removeShow = function(showId) {
        $('#' + showId).remove()
            chrome.storage.sync.get(key, function(items) {
                var idx = items.shows.map(function(x) {return x.id}).indexOf(showId);
                items.shows.splice(idx, 1);
                chrome.storage.sync.set(items)
            });
    }

    /*
     * Update storage with the given show
     */
    exports.update = function(show) {
        chrome.storage.sync.get(key, function(items) {
            var idx = items.shows.map(function(x) {return x.id}).indexOf(show.id);
            items.shows[idx] = show;
            chrome.storage.sync.set(items)
        });
    }

    /*
     * Return the key used for chrome storage.
     */
    exports.getKey = function() {
        return key;
    }

    /*
     * Create new show object from the given show data object
     */
    var Show = function(data) {
        var show = {};

        show.title = data.title;
        show.baseUrl = data.url;
        show.episode = data.episode;
        show.url = show.baseUrl.replace('{}', show.episode);
        show.id = generateId();
        show.nextId = generateId();
        show.prevId = generateId();
        show.removeId = generateId();
        show.confirmRemoveId = generateId();
        show.infoId = generateId();
        show.confirmInfoId = generateId();
        show.cancelInfoId = generateId();
        show.urlInputId = generateId();
        show.titleInputId = generateId();
        show.episodeInputId = generateId();

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

    /*
     * Add button event listeners
     */
    var addListeners = function(shows) {
        if (shows === undefined) {
            return
        }
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
                    $('#' + show.id + ' h4').html(show.title);
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
})(this.Storage = {});
