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
        this.$el.html(this.template());
        return this;
    },
    addShow: function() {
        const fieldsEmpty = this.fields.reduce((function(prev, cur) { 
            return this.$(cur).val().trim() === '' && prev;
        }).bind(this), true);

        if (fieldsEmpty) {
            return;
        }

        this.collection.add({
            title: this.$('#title-input').val(),
            url: this.$('#url-input').val(),
            episode: this.$('#episode-input').val()
        });
    
        this.clearFields();
    },
    clearFields: function() {
        this.fields.forEach((function(field) {
            this.$(field).val('');
        }).bind(this));
    }
});
