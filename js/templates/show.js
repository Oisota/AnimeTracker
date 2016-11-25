'use strict';
var App = App || {};
App.templates = App.templates || {};

App.templates.renderShow = (show) => `
<h4>
    <a href="#" class="next">
        ${show.title}
        <span class="badge">${show.episode}</span>
    </a>
</h4>
<div class="pull-right show-btns">
    <div class="btn-group">
        <button type="button" class="btn btn-primary" data-toggle="collapse" data-target="#${show.infoId}">
            <span class="glyphicon glyphicon-cog"></span>
        </button>
    </div>
</div>

<form id="${show.infoId}" class="update collapse">
    <div class="form-group">
        <label for="titleinput">Title</label>
        <input type="text" name="title" class="title form-control" value="${show.title}" required/>
    </div>
    <div class="form-group">
        <label for="urlinput">URL</label>
        <input type="text" name="url" class="url form-control" value="${show.url}" required/>
    </div>
    <div class="form-group">
        <label for="episodeinput">Episode</label>
        <input type="text" name="episode" class="episode form-control" value="${show.episode}" required/>
    </div>
    <div class="text-center">
        <button type="submit" class="btn btn-success">Save</button>
        <button type="reset" class="btn btn-warning">Cancel</button>
        <button type="button" class="btn btn-danger" data-toggle="collapse" data-target="#${show.removeId}">Delete</button>
    </div>
</form>

<div id="${show.removeId}" class="remove-dropdown collapse text-center">
    Are you sure?
    <button type="button" class="remove btn">Yes</button>
    <button type="button" class="btn" data-toggle="collapse" data-target="#${show.removeId}">No</button>
</div>`;

