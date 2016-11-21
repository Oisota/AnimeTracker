'use strict';

const shows = new App.collections.Show();
shows.load({
    success: function(response) {
        shows.add(response.shows);
        const showListView = new App.views.ShowList({
            collection: shows
        });
    },
    error: function(response) {
        console.log('Error retrieving collection');
        console.log(response);
    }
});

//event handler for adding a new show
document
.getElementById('add-show')
.addEventListener('click', (event) => {
    const fields = ['#title-input','#url-input','#episode-input'];
    const fieldsEmpty = fields.reduce((prev, cur) => {
        return $(cur).val().trim() === '' && prev;
    }, true);
    if (fieldsEmpty) {
        return;
    }
    //get show data
    const title = $('#title-input').val();
    const baseUrl = $('#url-input').val();
    const episode = $('#episode-input').val();
    const url = baseUrl.replace('{}', episode);

    shows.add({
        title: title,
        baseUrl: baseUrl,
        url: url,
        episode: episode
    });

    fields.forEach(field => $(field).val('')); //clear fields
});

//event handler for cancel add show button
document
.getElementById('cancel-add')
.addEventListener('click', (event) => {
    const fields = ['#title-input','#url-input','#episode-input'];
    fields.forEach(field => $(field).val('')); //clear fields
});
