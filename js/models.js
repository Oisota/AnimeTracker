var app = app || {};

(function() {
    app.ShowModel = Backbone.Model.extend({
        defaults: {
            title: 'Anime Title',
            baseUrl: '#',
            url: '#',
            episode: 1,
        },

        initialize: function() {
            this.set({
                id: gen_id(),
                nextId: gen_id(),
                prevId: gen_id(),
                removeId: gen_id(),
                confirmRemoveId: gen_id(),
                infoId: gen_id(),
                confirmInfoId: gen_id(),
                cancelInfoId: gen_id(),
                urlInputId: gen_id(),
                titleInputId: gen_id(),
                episodeInputId: gen_id()
            });
        }
    });
})();
