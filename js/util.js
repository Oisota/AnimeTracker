var App = App || {};

App.Util = (function() {
    exports = {};

    var fieldsEmpty = function(fields) {
        for (var i=0; i<fields.length; i++) {
            var field = $(fields[i]).val().trim();
            if (field === '') {
                return true;
            }
        }
        return false;
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
    };

    return exports;
})();
