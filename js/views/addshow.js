'use strict';
var App = App || {};
App.views = App.views || {};

App.views.AddShow = Backbone.View.extend({
    fields: ['#title-input','#url-input','#episode-input'],
    template: App.templates.renderAddShow,
    events: {
        'click #add-show': 'addShow',
        'click #cancel-add': 'clearFields'
    },
    initialize: function() {
        this.render();
    },
    render: function() {
        const html = this.template();
        this.$el.html(html);
        return this;
    },
    addShow: function() {
        const fieldsEmpty = this.fields.reduce((prev, cur) => ($(cur).val().trim() === '' && prev), true);
        if (fieldsEmpty) {
            return;
        }
        //get show data
        const title = this.$('#title-input').val();
        const baseUrl = this.$('#url-input').val();
        const episode = this.$('#episode-input').val();
        const url = baseUrl.replace('{}', episode);

        this.collection.add({
            title: title,
            baseUrl: baseUrl,
            url: url,
            episode: episode
        });
    
        this.clearFields();
    },
    clearFields: function() {
        this.fields.forEach(field => $(field).val(''));
    },
});
