'use strict';

var Backbone = require('backbone');


/*
 * Generate random and unique id's
 */
function generateId() {
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
        const baseUrl = this.get('baseUrl')
            const episode = Number(this.get('episode')) + 1;
        const url = baseUrl.replace('{}', episode);
        this.set({
            url: url,
            episode: episode
        });
    },
    decrUrl: function() {
        const baseUrl = this.get('baseUrl')
            const episode = Number(this.get('episode'));
        if (Number(episode) > 1) {
            const epNum = episode - 1;
            const url = baseUrl.replace('{}', epNum);
            this.set({
                url: url,
                episode: episode
            });
        }
    }
});
