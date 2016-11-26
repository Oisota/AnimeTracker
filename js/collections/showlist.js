'use strict';
var App = App || {};
App.collections = App.collections || {};

App.collections.Show = Backbone.Collection.extend({
    model: App.models.Show,
    url: '#',
    initialize: function() {
        this.listenTo(this, 'destroy', function(model, collection, options) {
            collection.remove(model);
        });
    },
    save: function() {
        chrome.storage.sync.set({'shows': this.toJSON()}, (function() {
            if (chrome.runtime.lastError) {
                console.log('Error: Collection Could Not Be Saved');
                console.log(chrome.runtime.lastError.message);
            } else {
                console.log('Collection Saved');
                console.log(this.toJSON());
            }
        }).bind(this));
    },
    load: function() {
        chrome.storage.sync.get('shows', (function(items) {
            if (chrome.runtime.lastError) {
                console.log('Error Loading Shows');
                console.log(chrome.runtime.lastError.message);
            } else {
                this.add(items.shows);
            }
        }).bind(this));
    }
});
