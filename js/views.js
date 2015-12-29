App = App || {};

App.Views = (function() {
    'use strict';

    var exports = {};

    /*
     * View for a single show model
     */
    exports.Show = Backbone.View.extend({
        tagName: 'li',
        className: 'list-group-item',
        template: Handlebars.templates.show,
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
                this.cancelUpdate();
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
            this.remove();
        },

        fieldsEmpty: function(fields) {
            var result = false;
            fields.forEach(function(field) {
                if ($(field).val().trim() === '') {
                    result = true;
                }
            });
            return result
        }
    });

    /* 
     * View for a collection of show models
     */
    exports.ShowList = Backbone.View.extend({
        el: '#show-list-view',

        initialize: function() {
            var self = this;

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
            var self = this;
            this.$el.empty();
            this.collection.each(function(model) {
                self.$el.append((new App.Views.Show({model: model})).render().el);
            });
            return this;
        }
    });

    return exports;
})();
