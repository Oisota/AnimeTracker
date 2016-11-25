'use strict';
var App = App || {};
App.templates = App.templates || {};

App.templates.renderShowList = (empty) => {
    if (empty) {
        return `
            <div id="no-show-msg" class="text-center">
            <h4><small>No shows to display</small></h4>
            <h4><small>Click the button below to add a show</small></h4>
            </div>`;
    } else {
        return `<ul class="list-group"></ul>`;
    }
};
