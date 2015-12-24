(function(exports) {
    exports.Collections = exports.Collections || {};
    /*
     * Collection for show models
     */
    exports.Collections.Show = Backbone.Collection.extend({
        model: exports.Models.Show,
        url: '#'
    });
})(this.App = this.App || {});
