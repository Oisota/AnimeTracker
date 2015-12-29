var App = App || {};

App.Collections = (function(Model) {

    exports = {};

    /*
     * Collection for show models
     */
    exports.Show = Backbone.Collection.extend({
        model: Model,
        url: '#',

        initialize: function() {
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

    return exports;

})(App.Models.Show);
