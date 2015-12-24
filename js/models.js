(function(exports) {
    exports.Models = exports.Models || {};
    /*
     * Generate random and unique id's
     */
    var generateId = function() {
        return '_' + Math.random().toString(36).substr(2, 9);
    };

    /*
     * Model for containing show data
     */
    exports.Models.Show= Backbone.Model.extend({
        defaults: {
            title: 'Anime Title',
            baseUrl: '#',
            url: '#',
            episode: 1,
        },

        initialize: function() {
            this.set({
                removeId: generateId(),
                infoId: generateId(),
            });
        },

        incrUrl: function() {
            var baseUrl = this.get('baseUrl')
            var episode = this.get('episode')
            var url = baseUrl.replace('{}', ++episode);
            this.set({
                url: url,
                episode: episode
            });
        },

        decrUrl: function() {
            var baseUrl = this.get('baseUrl')
            var episode = this.get('episode')
            if (episode > 1) {
                var url = baseUrl.replace('{}', --episode);
            }
            this.set({
                url: url,
                episode: episode
            });
        }
    });
})(this.App = this.App || {});
