var App = App || {};

App.Collections = (function(Model) {

    exports = {};

    /*
     * Collection for show models
     */
    exports.Show = Backbone.Collection.extend({
        model: Model,
        url: '#',

        sync: function(method, model, options) {
            self = this;
            switch (method) {
                case 'create':
                    break;
                case 'read':
                    chrome.storage.sync.get('shows', function(items) {
                        if (chrome.runtime.lastError) {
                            options.error(this, chrome.runtime.lastError.message);
                            return;
                        }
                        model.set(items.shows);
                        options.success();
                    });
                    break;
                case 'update':
                    chrome.storage.sync.set('shows', model.toJSON);
                    break;
                case 'delete':
                    break;
                    chrome.storage.sync.clear();
                default:
                    return;
            }
        }
    });

    return exports;

})(App.Models.Show);
