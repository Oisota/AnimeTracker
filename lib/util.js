(function(exports) {
    /*
     * Populate the showlist table with the given shows
     */
    exports.load = function(s) {
        var shows = s.shows;
        var showlist = document.getElementById('showlist');
        for (var i=0; i<shows.length; i++) {
            var row = document.createElement('TR');
            var title = document.createElement('TD');
            var next = document.createElement('TD');
            var prev = document.createElement('TD');
            var next_btn = document.createElement('BUTTON');
            var prev_btn = document.createElement('BUTTON');
    
            title.innerHTML = shows[i].title
    
            next_btn.type = 'button';
            next_btn.innerHTML = 'Next';
            next_btn.onclick = (function(idx) { 
                return function() {
                    chrome.tabs.create({
                        url: shows[idx].url
                    });
                    incrUrl(shows[idx]);
                }
            })(i);
    
            prev_btn.type = 'button';
            prev_btn.innerHTML = 'Prev';
            prev_btn.onclick = (function(idx) { 
                return function() {
                    chrome.tabs.create({
                        url: shows[idx].url
                    });
                    decrUrl(shows[idx]);
                }
            })(i);
    
            next.appendChild(next_btn);
            prev.appendChild(prev_btn);
    
            row.appendChild(title);
            row.appendChild(prev);
            row.appendChild(next);
            showlist.appendChild(row);
        }
    }

    /*
     * return a song object with attributes taken from
     * the add song input fields
     */
    exports.getShowInfo = function() {
        var showTitle = document.getElementById('titleinput').value;
        var showUrl = document.getElementById('urlinput').value;
        var showEpisode = document.getElementById('episodeinput').value;
        var base = showUrl.replace('{}', showEpisode);
    
        return {
            title: showTitle,
            base_url: base,
            url: showUrl,
            episode: showEpisode
        }
    }
    
    /*
     * Set add show fields to be blank
     */
    exports.resetAddShowFields = function() {
        document.getElementById('titleinput').value = "";
        document.getElementById('urlinput').value = "";
        document.getElementById('episodeinput').value = "";
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
        if (show.episode == 1) { 
            return; 
        } else {
            show.episode--;
            show.url = show.base_url.replace("{}", show.episode);
        }
    }

    return exports;

})(this.util = {});
