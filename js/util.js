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
                        chrome.tabs.create({url: shows[idx].url});
                        incrUrl(shows[idx]);
                    }
                })(i)
            });
            $next_btn.appendTo($next);

            var $prev_btn = $('<button></button>', {
                type: 'button',
                html: 'Prev',
                click: (function(idx){
                    return function() {
                        chrome.tabs.create({url: shows[idx].url});
                        decrUrl(shows[idx]);
                    }
                })(i)
            });
            $prev_btn.appendTo($prev);

            $title.appendTo($row);
            $prev.appendTo($row);
            $next.appendTo($row);
    
            $row.appendTo('#showlist');
        }
    }

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
    }
    
    /*
     * Set add show fields to be blank
     */
    exports.resetAddShowFields = function() {
        $('#titleinput').val('');
        $('#urlinput').val('');
        $('#episodeinput').val('');
    }

    /*
     * Increment the episode number of the given show and
     * update its url.
     */
    incrUrl = function(show) {
        show.episode++;
        show.url = show.base_url.replace("{}", show.episode);
    }
    
    /*
     * Decrement the episode number of the given show and
     * update its url.
     */
    decrUrl = function(show) {
        if (show.episode === 1) { 
            return; 
        } else {
            show.episode--;
            show.url = show.base_url.replace("{}", show.episode);
        }
    }

    return exports;

})(this.util = {});
