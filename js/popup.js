$(document).ready(function() {
    Util.createStorageObject(); //put empty object in storage if not already there
    chrome.storage.sync.get('shows', Util.load);

    $('#addshow').click(Util.toggleView);
    $('#canceladd').click(Util.toggleView);

    $('#addshowbtn').click(function() {
        chrome.storage.sync.get('shows', function(s) {
            s.shows.push(Util.getShowInfo()); //append new show object to show array 
            Util.load({shows: [s.shows[s.shows.length -1]]}); //update show list
            chrome.storage.sync.set(s); //save shows back to storage
            Util.toggleView();
            Util.resetAddShowFields();
        });
    });

    $('#delshows').click(function() {
        chrome.storage.sync.remove('shows', function() {
            chrome.storage.sync.set({shows: []}, function() {
                $('#showlist').empty();
                chrome.storage.sync.get('shows', Util.load);
            });    
        });
    });
});
