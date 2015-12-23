var app = app || {};

(function() {
    app.ShowView = Backbone.View.extend({
        tagName: 'li',
        className: 'list-group-item',
        template: Handlebars.templates['show'],

        initialize: function() {
            this.listenTo(this.model, 'change', this.render);
            this.render();
        },

        render: function() {
            var html = this.template(this.model.toJSON());
            this.$el.html(html);
            return this;
        }
    });

    app.ShowListView = Backbone.View.extend({
        el: '#show-list-view',

        initialize: function() {
            self = this;
            this.views = [];
            this.collection.each(function(model) {
                self.views.push(new app.ShowView({
                    model: model
                }));
            });
            this.render();
        },

        render: function() {
            self = this;
            this.$el.empty();
            _.each(this.views, function(view) {
                self.$el.append(view.render().el);
            });
            return this;
        }
    });
})();
