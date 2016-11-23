'use strict';
var App = App || {};
App.models = App.models || {};

App.models.Show = Backbone.Model.extend({
    defaults: {
        title: 'Anime Title',
        url: '#',
        episode: 1,
    },
    initialize: function() {
        this.set({
            removeId: this.genID(),
            infoId: this.genID(),
        });
    },
    genID: function genID() {
        return '_' + Math.random().toString(36).substr(2, 9);
    }
});
