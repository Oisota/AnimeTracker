'use strict';
var App = App || {};

App.Models = (function() {

    var exports = {};

    /*
     * Generate random and unique id's
     */
    var generateId = function() {
        return '_' + Math.random().toString(36).substr(2, 9);
    };

    /*
     * Model for containing show data
     */
    exports.Show = Backbone.Model.extend({
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
            if (Number(episode) > 1) {
                var url = baseUrl.replace('{}', --episode);
                this.set({
                    url: url,
                    episode: episode
                });
            }
        }
    });

    return exports;
})();
