'use strict';

var $ = require('jquery');

function clearFields(fields) {
    fields.forEach(function(field) {
        $(field).val('');
    });
};

exports.fieldsEmpty = function(ctx, fields) {
    const result = false;
    fields.forEach(function(field) {
        if (ctx.$(field).val().trim() === '') {
            result = true;
        }
    });
    return result;
};

exports.addShow = function(collection, model) {
    if (exports.fieldsEmpty(window, ['#title-input','#url-input','#episode-input'])) {
        return
    }
    const title = $('#title-input').val();
    const baseUrl = $('#url-input').val();
    const episode = $('#episode-input').val();
    const url = baseUrl.replace('{}', episode);
    collection.add(new model({
        title: title,
        baseUrl: baseUrl,
        url: url,
        episode: episode
    }));
    clearFields(['#title-input','#url-input','#episode-input']);
};

exports.cancelAddShow = function() {
    clearFields(['#title-input','#url-input','#episode-input']);
};

exports.displayNoShowsMsg = function() {
    $('#no-show-msg').show();
}

exports.hideNoShowsMsg = function() {
    $('#no-show-msg').hide();
}
