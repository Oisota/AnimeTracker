'use strict';
var App = App || {};
App.models = App.models || {};

App.models.Show = Backbone.Model.extend({
    initialize: function() {
        this.set({
            removeId: this.genID(),
            infoId: this.genID()
        });
    },
    genID: function genID() {
        return '_' + Math.random().toString(36).substr(2, 9);
    }
});
