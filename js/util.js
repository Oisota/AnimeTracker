(function(exports) {
    exports.Util = exports.Util || {};

    exports.Util.fieldsEmpty = function(fields) {
        for (var i=0; i<fields.length; i++) {
            var field = $(fields[i]).val().trim();
            if (field === '') {
                return true;
            }
        }
        return false;
    };

    exports.Util.addShow = function() {
        if (exports.Util.fieldsEmpty(['#title-input','#url-input','#episode-input'])) {
            return
        }
        var title = $('#title-input').val();
        var baseUrl = $('#url-input').val();
        var episode = $('#episode-input').val();
        var url = baseUrl.replace('{}', episode);
        exports.Collections.shows.add(new exports.Models.Show({
            title: title,
            baseUrl: baseUrl,
            url: url,
            episode: episode
        }));
    };
})(this.App = this.App || {});
