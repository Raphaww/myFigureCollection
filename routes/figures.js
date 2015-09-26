var express = require('express');
var utils = require('../helpers/stringUtils').stringUtils();
var figure = require('../models/figure');
var path = require('path');
var multer = require('multer');

var router = express.Router();
var upload = multer({ dest: 'uploads/' });

/* GET home page. */
router.post('/add',upload.single('file'), function(req, res, next) {
   //var saveTo = '';
   console.log(req.file)
   /*var figuresPromise = figure.addFigure(req, {
      baseName: req.body.baseName,
      imageUrl: saveTo,
      brand: req.body.brand,
      uri: utils.toUri(req.body.baseName)
   });

   figuresPromise.then(function(figure){
      res.setHeader('Content-Type', 'application/json');
      res.send(figure);
   });
*/
   res.setHeader('Content-Type', 'application/json');
   res.send({result:'ok'});
});

router.get('/:figureUri', function(req, res, next){
   var figuresPromise = figure.getFigures(req, {uri: req.params.figureUri});
   var model = {};
   var def = figuresPromise.then(function(figureList){
      if(figureList && figureList.length > 0){
         model.title = figureList[0].baseName;
         model.figure = figureList[0];
         model.figureBigUrl = model.figure.imageUrl.replace(/=w.*/gi, '=w1920');
         res.render('figure', model);
      }else{
         res.status(404).send('Not found');
      }
   });
});





module.exports = router;
