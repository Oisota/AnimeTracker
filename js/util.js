var App = App || {};

App.Util = (function() {
    'use strict';

    var exports = {};

    var clearFields = function(fields) {
        fields.forEach(function(field) {
            $(field).val('');
        });
    };

    exports.fieldsEmpty = function(ctx, fields) {
        var result = false;
        fields.forEach(function(field) {
            if (ctx.$(field).val().trim() === '') {
                result = true;
            }
        });
        return result;
    };

    exports.addShow = function() {
        if (exports.fieldsEmpty(window, ['#title-input','#url-input','#episode-input'])) {
            return
        }
        var title = $('#title-input').val();
        var baseUrl = $('#url-input').val();
        var episode = $('#episode-input').val();
        var url = baseUrl.replace('{}', episode);
        App.Collections.shows.add(new App.Models.Show({
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

    return exports;
})();
