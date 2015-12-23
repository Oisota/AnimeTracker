var app = app || {};

(function() {
    app.ShowCollection = Backbone.Collection.extend({
        model: app.ShowModel,
        url: '#'
    });
})();
