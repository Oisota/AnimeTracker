'use strict';
var App = App || {};
App.views = App.views || {};

App.views.Show = Backbone.View.extend({
    tagName: 'li',
    className: 'list-group-item',
    template: App.templates.renderShow,
    events: {
        'click .prev': 'prev',
        'click .next': 'next',
        'click .update': 'update',
        'click .cancel': 'cancelUpdate',
        'click .remove': '_remove'
    },
    initialize: function() {
        this.listenTo(this.model, 'change', this.render);
        this.render();
    },
    render: function() {
        const html = this.template(this.model.toJSON());
        this.$el.html(html);
        return this;
    },
    prev: function() {
        const url = this.model.get('url');
        const episode = Number(this.model.get('episode'));
        if (episode - 1 > 0) {
            this.model.set('episode', episode - 1);
        }
        chrome.tabs.create({
            url: url.replace('{}', this.model.get('episode'))
        });
    },
    next: function() {
        const url = this.model.get('url');
        const episode = Number(this.model.get('episode'));
        this.model.set('episode', episode + 1)
        chrome.tabs.create({
            url: url.replace('{}', episode)
        });
    },
    update: function() {
        const fields = ['.title', '.url', '.episode'];
        const fieldsEmpty = fields.reduce((function(prev, cur) {
            return this.$(cur).val().trim() === '' && prev
        }).bind(this), true);

        if (fieldsEmpty) {
            this.cancelUpdate();
            return;
        }

        this.model.set({
            title: this.$('.title').val(),
            url: this.$('.url').val(),
            episode: this.$('.episode').val()
        });
    },
    cancelUpdate: function() {
        this.$('.title').val(this.model.get('title'));
        this.$('.url').val(this.model.get('url'));
        this.$('.episode').val(this.model.get('episode'));
    },
    _remove: function() {
        this.model.destroy();
        this.remove();
    }
});
