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
        this.model.decrUrl();
        chrome.tabs.create({
            url: this.model.get('url')
        });
    },
    next: function() {
        const tempUrl = this.model.get('url');
        this.model.incrUrl();
        chrome.tabs.create({
            url: tempUrl
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

        const title = this.$('.title').val();
        const baseUrl = this.$('.url').val();
        const episode = this.$('.episode').val();
        const url = baseUrl.replace('{}', episode);

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
    _remove: function() {
        this.model.destroy();
        this.remove();
    }
});
