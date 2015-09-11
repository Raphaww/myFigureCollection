var express = require('express');
var figure = require('../models/figure');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
   var figuresPromise = figure.getFigures(req);
   var model = {
      title: 'My Figure Collection'
   };
   figuresPromise.then(function(figureList){
      model.figures = figureList;
      res.render('home', model);
   });
});



module.exports = router;
