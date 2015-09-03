exports.getFigures = function(req, queryRequest){
   queryRequest = queryRequest || {};
   var db = req.db;
   var collection = db.get('figure');
   return collection.find(queryRequest,{},function(e,docs){
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