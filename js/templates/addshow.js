'use strict';
var App = App || {};
App.templates = App.templates || {};

App.templates.renderAddShow = () => `
<div class="form-group">
    <label for="titleinput">Title</label>
    <input type="text" name="title" class="form-control" id="title-input" data-toggle="tooltip" title="Anime Title"/>
    <label for="urlinput">URL</label>
    <input type="text" name="url" class="form-control" id="url-input" data-toggle="tooltip" title="URL with '{}' replacing the episode number"/>
    <label for="episodeinput">Episode</label>
    <input type="text" name="episode" class="form-control" id="episode-input" data-toggle="tooltip" title="Starting episode number"/>
</div>
<div class="text-center">
    <button type="button" id="add-show" class="btn btn-primary" data-toggle="collapse" data-target="#new-show-form">Add</button>
    <button type="button" id="cancel-add" class="btn btn-primary" data-toggle="collapse" data-target="#new-show-form">Cancel</button>
</div>`;
