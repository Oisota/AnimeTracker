'use strict';
var App = App || {};

App.util = {
    clearFields: (fields) => {
        fields.forEach(function(field) {
            $(field).val('');
        });
    },

    fieldsEmpty: (ctx, fields) => {
        let result = false;
        fields.forEach(function(field) {
            if (ctx.$(field).val().trim() === '') {
                result = true;
            }
        });
        return result;
    },

    getShowData: () => {
        if (App.util.fieldsEmpty(window, ['#title-input','#url-input','#episode-input'])) {
            return
        }
        const title = $('#title-input').val();
        const baseUrl = $('#url-input').val();
        const episode = $('#episode-input').val();
        const url = baseUrl.replace('{}', episode);
        clearFields(['#title-input','#url-input','#episode-input']);
        return {
            title: title,
            baseUrl: baseUrl,
            url: url,
            episode: episode
        };
    }
};
