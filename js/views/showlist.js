'use strict';
var App = App || {};
App.views = App.views || {};

App.views.ShowList = Backbone.View.extend({
    el: '#show-list-view',
    saveOptions: {
        success: function(response) {
            console.log('Collection Saved');
            console.log(response)
        },
        error: function(response) {
            console.log('Error: Collection Could Not Be Saved');
            console.log(response)
        },
    },
    initialize: function() {
        this.listenTo(this.collection, 'change', (function(model, options) {
            this.collection.save(this.saveOptions);
        }).bind(this));

        this.listenTo(this.collection, 'update', function(collection, options) {
            collection.save(this.saveOptions);
            this.render();
        });

        this.render();
    },
    render: function() {
        this.$el.empty();
        this.collection.each((function(model) {
            this.$el.append((new App.views.Show({model: model})).render().el);
        }).bind(this));
        if (this.$el.html() === '') {
            $('#no-show-msg').show();
        } else {
            $('#no-show-msg').hide();
        }
        return this;
    }
});
