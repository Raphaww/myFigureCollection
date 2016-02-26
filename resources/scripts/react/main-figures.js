var Autocomplete = require('./jqueryUI/autocomplete.jsx');

var AddFigureForm = React.createClass({
   render: function(){
      var source = [
         "GoodSmile Co",
         "Kayodo",
         "Revoltech"
      ];
      return (
         <form>
           <div className="form-group">
               <label htmlFor="figure.baseName">Nombre</label>
               <input type="text" className="form-control" placeholder="Nombre"/>
           </div>
           <div className="form-group">
               <label htmlFor="file">Imagen</label>
               <input type="text" />
           </div>
           <div className="form-group">
               <label htmlFor="figure.brand">Marca</label>
               <Autocomplete name={"figure.brand"} id={"figure.brand"} className={"form-control"} source={source}/>
           </div>
           <button type="submit" className="btn btn-default">Agregar</button>
         </form>
      );
   }
});

ReactDOM.render(
      <AddFigureForm />,
      document.getElementById('addFigure')
 );
