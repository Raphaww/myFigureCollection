(function () {
    var figuresApp = angular.module('figuresApp', ['ngFileUpload']);

    figuresApp.controller('FiguresController', function (Upload) {
        this.figure = {};
        this.file = {};
        var addFigure = function () {
            upload(this.figure, this.file);
        };

        var upload = function (figure, file) {
            Upload.upload({
                url: 'figures/add',
                fields: figure,
                file: file
            }).progress(function (evt) {
                var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
            }).success(function (data, status, headers, config) {
                console.log('file ' + config.file.name + 'uploaded. Response: ' + data);
            }).error(function (data, status, headers, config) {
                console.log('error status: ' + status);
            })
        };
        this.addFigure = addFigure;
        this.upload = upload;
    });

})();