'use strict';
var App = App || {};
App.templates = App.templates || {};

App.templates.renderAddShow = () => `
<button id="show-dropdown-btn" type="button" class="btn btn-default center-block" data-toggle="collapse" data-target="#new-show-form">
	<span class="glyphicon glyphicon-menu-down"></span>
</button>

<form id="new-show-form" class="collapse">
	<div class="form-group">
		<label for="titleinput">Title</label>
		<input type="text" name="title" class="form-control" id="title-input" data-toggle="tooltip" title="Anime Title" required/>
	</div>
	<div class="form-group">
		<label for="urlinput">URL</label>
		<input type="text" name="url" class="form-control" id="url-input" data-toggle="tooltip" title="URL with '{}' replacing the episode number" required/>
	</div>
	<div class="form-group">
		<label for="episodeinput">Episode</label>
		<input type="text" name="episode" class="form-control" id="episode-input" data-toggle="tooltip" title="Starting episode number" required/>
	</div>
	<div class="text-center">
		<button type="submit" class="btn btn-success">Add</button>
		<button type="reset" class="btn btn-warning">Cancel</button>
	</div>
</form>`;
