(function(exports) {
    exports.Views = exports.Views || {};
    /*
     * View for a single show model
     */
    exports.Views.Show = Backbone.View.extend({
        tagName: 'li',
        className: 'list-group-item',
        template: Handlebars.templates['show'],
        events: {
            'click .prev': 'prev',
            'click .next': 'next',
            'click .update': 'update',
            'click .cancel': 'cancelUpdate',
            'click .remove': 'remove'
        },

        initialize: function() {
            this.listenTo(this.model, 'change', this.render);
            this.render();
        },

        render: function() {
            var html = this.template(this.model.toJSON());
            this.$el.html(html);
            return this;
        },

        prev: function() {
            this.model.decrUrl();
            chrome.tabs.create({
                url: this.model.get('url')
            });
        },

        next: function() {
            var tempUrl = this.model.get('url');
            this.model.incrUrl();
            chrome.tabs.create({
                url: tempUrl
            });
        },

        update: function() {
            if (this.fieldsEmpty(['.title', '.url', '.episode'])) {
                return;
            }

            var title = this.$('.title').val();
            var baseUrl = this.$('.url').val();
            var episode = this.$('.episode').val();
            var url = baseUrl.replace('{}', episode);

            this.model.set({
                title: title,
                baseUrl: baseUrl,
                url: url,
                episode: episode
            });
        },

        cancelUpdate: function() {
            this.$('.title').val(this.model.get('title'));
            this.$('.url').val(this.model.get('baseUrl'));
            this.$('.episode').val(this.model.get('episode'));
        },

        remove: function() {
            this.model.destroy();
        },

        fieldsEmpty: function(fields) {
            for (var i=0; i<fields.length; i++) {
                var field = this.$(fields[i]).val().trim();
                if (field === '') {
                    return true;
                }
            }
            return false;
        }
    });

    /*
     * View for a collection of show models
     */
    exports.Views.ShowList = Backbone.View.extend({
        el: '#show-list-view',

        initialize: function() {
            self = this;
            this.views = [];
            this.collection.each(function(model) {
                self.views.push(new exports.Views.Show({
                    model: model
                }));
            });
            this.listenTo(this.collection, 'add', function(model) {
                self.views.push(new exports.Views.Show({
                    model: model
                }));
                self.render();
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
})(this.App = this.App || {});
