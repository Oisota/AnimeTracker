(function(exports) {
    /*
     * Collection for show models
     */
    exports.ShowCollection = Backbone.Collection.extend({
        model: exports.ShowModel,
        url: '#'
    });
})(this.App = this.App || {});
