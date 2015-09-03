var express = require('express');
var utils = require('../helpers/stringUtils').stringUtils();
var figure = require('../models/figure');

var router = express.Router();

/* GET home page. */
router.post('/add', function(req, res, next) {
   var figuresPromise = figure.addFigure(req, {
      baseName: req.body.baseName,
      imageUrl: req.body.imageUrl,
      brand: req.body.brand,
      uri: utils.toUri(req.body.baseName)
   });

   figuresPromise.then(function(figure){
      res.setHeader('Content-Type', 'application/json');
      res.send(figure);
   });
});

router.get('/:figureUri', function(req, res, next){
   var figuresPromise = figure.getFigures(req, {uri: req.params.figureUri});
   var model = {};
   figuresPromise.then(function(figureList){
      model.title = figureList[0].baseName;
      model.figure = figureList[0];
      model.figureBigUrl = model.figure.imageUrl.replace(/=w.*/gi, '=w1920');
      res.render('figure', model);
   });
});





module.exports = router;
