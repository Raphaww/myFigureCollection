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

router.get('/:name', function(req, res, next){
   res.setHeader('Content-Type', 'application/json');
   res.send(req.params.name);
});





module.exports = router;
