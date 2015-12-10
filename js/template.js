var templates = {};

/*
 * Get all templates on the page and compile
 * them, adding them to the templates object.
 */
$(document).ready(function() {
    var sources = $('script[type="text/x-handlebars-template"]');
    for (var i=0; i<sources.length; i++) {
        templates[sources[i].id] = Handlebars.compile(sources[i].innerText);
    }
});

/*
 * Respond to render request messages by rendering
 * the requested template with the given context.
 */
window.addEventListener('message', function(event) {
    if (event.data.command === 'render') {
        var HTML = templates[event.data.template](event.data.context);
        event.source.postMessage({
            template: event.data.template,
            html: HTML,
        }, event.origin);
    }
});
