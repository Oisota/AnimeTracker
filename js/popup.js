document.addEventListener('DOMContentLoaded', function() {
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

    chrome.storage.sync.get('shows', util.load);

    $('#addshow').click(function() {
        document.getElementById('addshowform').style.display = 'block';
        document.getElementById('main').style.display = 'none';
    });

    $('#canceladd').click(function() {
        document.getElementById('addshowform').style.display = 'none';
        document.getElementById('main').style.display = 'block';
    });

    $('#addshowbtn').click(function() {
        chrome.storage.sync.get('shows', function(s) {
            s.shows.push(util.getShowInfo()); //append new show object to show array 
            util.load({shows: [s.shows[s.shows.length -1]]}); //update show list
            chrome.storage.sync.set(s); //save shows back to storage
            document.getElementById('addshowform').style.display = 'none';
            document.getElementById('main').style.display = 'block';
            util.resetAddShowFields();
        });
    });

    $('#delshows').click(function() {
        chrome.storage.sync.remove('shows');
    });
});

