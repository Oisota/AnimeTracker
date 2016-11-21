'use strict';
var App = App || {};
App.collections = App.collections || {};

App.collections.Show = Backbone.Collection.extend({
    model: App.models.Show,
    url: '#',
    initialize: function() {
        const self = this;
        this.listenTo(this, 'destroy', function(model, collection, options) {
            collection.remove(model);
        });
    },
    save: function(options) {
        chrome.storage.sync.set({'shows': this.toJSON()}, (function(self) {
            return function() {
                if (chrome.runtime.lastError) {
                    options.error(chrome.runtime.lastError.message);
                    return;
                }
                options.success(self.toJSON());
            }
        })(this));
    },
    load: function(options) {
        chrome.storage.sync.get('shows', function(items) {
            if (chrome.runtime.lastError) {
                options.error(chrome.runtime.lastError.message);
                return;
            }
            options.success(items);
        });
    }
});
