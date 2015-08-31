var stringUtils = function(){
   var toUri = function(baseName){
      var charsReplace = {
         'á':'a', 'é':'e', 'í': 'i', 'ó': 'o', 'ú': 'u',
         'ü':'u', '&':'and', '#':''
      };
      var uri = baseName;
      uri = uri.replace(/[A-Z]/g, function(match){
         return match.toLowerCase();
      });
      uri = uri.replace(/[áéíóúü]/g, function(match){
         return charsReplace[match];
      }); 
      uri = uri.replace(' ','-');
      
      return uri;
   };
   return {
      toUri: toUri
   };
};
exports.stringUtils = stringUtils;