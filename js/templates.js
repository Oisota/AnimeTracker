'use strict';
var App = App || {};

App.templates = {
    renderShow: (show) => `
        <div class="text-center">
            <h4>${show.title}</h4>
            <div class="btn-group">
                <button type="button" class="prev btn btn-primary">
                    <span class="glyphicon glyphicon-triangle-left"></span>
                </button>
                <button type="button" class="next btn btn-primary">
                    <span class="glyphicon glyphicon-triangle-right"></span>
                </button>
                <button type="button" class="btn btn-warning" data-toggle="collapse" data-target="#${show.infoId}">
                    <span class="glyphicon glyphicon-wrench"></span>
                </button>
                <button type="button" class="btn btn-danger" data-toggle="collapse" data-target="#${show.removeId}">
                    <span class="glyphicon glyphicon-trash">
                </button>
            </div>
        </div>
        
        <div id="${show.removeId}" class="collapse">
            Remove? 
            <button type="button" class="remove btn">Yes</button>
            <button type="button" class="btn" data-toggle="collapse" data-target="#${show.removeId}">No</button>
        </div>
        
        <div id="${show.infoId}" class="collapse">
            <div class="form-group">
                <label for="titleinput">Title</label>
                <input type="text" name="title" class="title form-control" value="${show.title}"/>
                <label for="urlinput">URL</label>
                <input type="text" name="url" class="url form-control" value="${show.baseUrl}"/>
                <label for="episodeinput">Episode</label>
                <input type="text" name="episode" class="episode form-control" value="${show.episode}"/>
            </div>
            <div class="text-center">
                <button type="button" class="update btn btn-primary" data-toggle="collapse" data-target="#${show.infoId}">Update</button>
                <button type="button" class="cancel btn btn-primary" data-toggle="collapse" data-target="#${show.infoId}">Cancel</button>
            </div>
        </div>`
};
