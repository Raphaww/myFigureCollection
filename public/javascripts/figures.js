(function(){
   var figuresApp = angular.module('figuresApp', []);

   figuresApp.controller('FiguresController', function ($http) {
      this.figure = {};
      var addFigure = function(){
         $http.post('/figures/add', this.figure).success(function(data) {
            console.log(data);
         });
      };
      this.addFigure = addFigure;
   });

})();