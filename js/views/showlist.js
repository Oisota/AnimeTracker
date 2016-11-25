'use strict';
var App = App || {};
App.views = App.views || {};

App.views.ShowList = Backbone.View.extend({
    el: '#show-list-view',
    template: App.templates.renderShowList,
    saveOptions: {
        success: response => {
            console.log('Collection Saved');
            console.log(response)
        },
        error: response => {
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

        if (this.collection.length === 0) {
            this.$el.html(this.template(true));
        } else {
            this.$el.html(this.template(false));
            const $ul = this.$el.find('ul');
            this.collection.each((function(model) {
                $ul.append((new App.views.Show({model: model})).render().el);
            }).bind(this));
        }

        return this;
    }
});
