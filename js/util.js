/*
 * Util Module
 *
 * This module handles most of the logic and functionality
 * for the extension
 */
(function(exports) {
    /*
     * Populate the showlist table with the given shows
     */
    exports.load = function(s) {
        if (s.shows === undefined) {
            return;
        }
        var shows = s.shows;
        for (var i=0; i<shows.length; i++) {
            var $row = $("<tr></tr>");
            var $title = $('<td></td>', {
                html: shows[i].title
            });
            var $next = $('<td></td>');
            var $prev = $('<td></td>');

            var $next_btn = $('<button></button>', {
                type: 'button',
                html: 'Next',
                click: (function(idx){
                    return function() {
                        var URL = shows[idx].url;
                        incrUrl(shows[idx]);
                        updateStorage(shows[idx]);
                        chrome.tabs.create({url: URL});
                    }
                })(i)
            });
            $next_btn.appendTo($next);

            var $prev_btn = $('<button></button>', {
                type: 'button',
                html: 'Prev',
                click: (function(idx){
                    return function() {
                        var URL = shows[idx].url;
                        decrUrl(shows[idx]);
                        updateStorage(shows[idx]);
                        chrome.tabs.create({url: shows[idx].url});
                    }
                })(i)
            });
            $prev_btn.appendTo($prev);

            $title.appendTo($row);
            $prev.appendTo($row);
            $next.appendTo($row);
    
            $row.appendTo('#showlist');
        }
    };

    /*
     * return a song object with attributes taken from
     * the add song input fields
     */
    exports.getShowInfo = function() {
        var title = $('#titleinput').val();
        var base_url = $('#urlinput').val();
        var episode = $('#episodeinput').val();
        var url = base_url.replace('{}', episode);
    
        return {
            title: title,
            base_url: base_url,
            url: url,
            episode: episode
        }
    };
    
    /*
     * Set add show fields to be blank
     */
    exports.resetAddShowFields = function() {
        $('#titleinput').val('');
        $('#urlinput').val('');
        $('#episodeinput').val('');
    };

    exports.toggleView = function() {
        if ($('#main').css('display') === 'none') {
            $('#addshowform').css('display','none');
            $('#main').css('display','block');
        } else {
            $('#addshowform').css('display','block');
            $('#main').css('display','none');
        }
    };

    exports.createStorageObject = function() {
        chrome.storage.sync.get('shows', function(s) {
            if (s.shows === undefined) {
                chrome.storage.sync.set({shows: []});
            }
        });
    };

    /*
     * Update storage by replacing the show object
     * in storage with the given show object
     */
    var updateStorage = function(show) {
        chrome.storage.sync.get('shows', function(s) {
            var idx = getShowIndex(s.shows, show);
            s.shows[idx] = show;
            chrome.storage.sync.set(s);
        });
    };

    /*
     * Find the index of the given show in the
     * given shows array by matching against the
     * shows title
     */
    var getShowIndex = function(shows, show) {
        for (var i=0; i<shows.length; i++) {
            if (shows[i].title === show.title) {
                return i;
            }
        }
        return -1;
    };

    /*
     * Increment the episode number of the given show and
     * update its url.
     */
    var incrUrl = function(show) {
        show.episode++;
        show.url = show.base_url.replace("{}", show.episode);
    };
    
    /*
     * Decrement the episode number of the given show and
     * update its url.
     */
    var decrUrl = function(show) {
        if (show.episode === 1) { 
            return; 
        } else {
            show.episode--;
            show.url = show.base_url.replace("{}", show.episode);
        }
    };

    return exports;

})(this.Util = {});
