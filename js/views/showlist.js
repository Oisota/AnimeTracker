'use strict';
var App = App || {};
App.views = App.views || {};

App.views.ShowList = Backbone.View.extend({
    el: '#show-list-view',
    initialize: function() {
        const self = this;

        this.listenTo(this.collection, 'change', (function(self) {
            return function(model, options) {
                self.collection.save({
                    success: function(response) {
                        console.log(response)
                    },
                    error: function(response) {
                        console.log(response)
                    },
                });
            }
        })(self));

        this.listenTo(this.collection, 'update', (function(self) {
            return function(collection, options) {
                collection.save({
                    success: function(response) {
                        console.log(response)
                    },
                    error: function(response) {
                        console.log(response)
                    },
                });
                self.render();
            }
        })(self));

        this.render();
    },
    render: function() {
        const self = this;
        this.$el.empty();
        this.collection.each(function(model) {
            self.$el.append((new App.views.Show({model: model})).render().el);
        });
        if (this.$el.html() === '') {
            $('#no-show-msg').show();
        } else {
            $('#no-show-msg').hide();
        }
        return this;
    }
});
