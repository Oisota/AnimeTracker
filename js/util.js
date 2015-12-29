var App = App || {};

App.Util = (function() {
    'use strict';

    var exports = {};

    var fieldsEmpty = function(fields) {
        var result = false;
        fields.forEach(function(field) {
            if ($(field).val().trim() === '') {
                result = true;
            }
        });
        return result;
    };

    var clearFields = function(fields) {
        fields.forEach(function(field) {
            $(field).val('');
        });
    };

    exports.addShow = function() {
        if (fieldsEmpty(['#title-input','#url-input','#episode-input'])) {
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
