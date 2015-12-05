$(document).ready(function() {
    /*
    chrome.storage.sync.set({
        shows: [{
            title: 'Yu Yu Hakusho',
            base_url: 'http://dubbed-anime.com/yu-yu-hakusho-episode-{}-dubbed',
            url: 'http://dubbed-anime.com/yu-yu-hakusho-episode-1-dubbed',
            episode: 1
        },{
            title: 'Dragon Ball Z',
            base_url: 'http://dubbed-anime.com/yu-yu-hakusho-episode-{}-dubbed',
            url: 'http://dubbed-anime.com/yu-yu-hakusho-episode-1-dubbed',
            episode: 1
        },{
            title: 'Mobil Suit Gundam Wing',
            base_url: 'http://dubbed-anime.com/yu-yu-hakusho-episode-{}-dubbed',
            url: 'http://dubbed-anime.com/yu-yu-hakusho-episode-1-dubbed',
            episode: 1
        }]
    });
    */
    chrome.storage.sync.get('shows', util.load);

    $('#addshow').click(util.toggleView);
    $('#canceladd').click(util.toggleView);

    $('#addshowbtn').click(function() {
        chrome.storage.sync.get('shows', function(s) {
            s.shows.push(util.getShowInfo()); //append new show object to show array 
            util.load({shows: [s.shows[s.shows.length -1]]}); //update show list
            chrome.storage.sync.set(s); //save shows back to storage
            util.toggleView();
            util.resetAddShowFields();
        });
    });

    $('#delshows').click(function() {
        chrome.storage.sync.remove('shows');
    });
});
