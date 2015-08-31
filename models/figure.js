exports.getFigures = function(req){
   var db = req.db;
   var collection = db.get('figure');
   return collection.find({},{},function(e,docs){
     return docs;
   });
};

exports.addFigure = function(req, figure){
   var db = req.db;
   var collection = db.get('figure');
   return collection.insert(figure,function(e,docs){
     return docs;
   });
};