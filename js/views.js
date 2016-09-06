'use strict';

var Backbone = require('backbone');
var $ = require('jquery');
var renderShow = require('./show.js');
var util = require('./util.js');

/*
 * View for a single show model
 */
exports.Show = Backbone.View.extend({
    tagName: 'li',
    className: 'list-group-item',
    template: renderShow,
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
        if (util.fieldsEmpty(this, ['.title', '.url', '.episode'])) {
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

/* 
 * View for a collection of show models
 */
exports.ShowList = Backbone.View.extend({
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
            self.$el.append((new exports.Show({model: model})).render().el);
        });
        if (this.$el.html() === '') {
            util.displayNoShowsMsg();
        } else {
            util.hideNoShowsMsg();
        }
        return this;
    }
});
