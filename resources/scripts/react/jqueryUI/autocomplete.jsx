module.exports = React.createClass({
   componentDidMount: function() {
      // 2) do DOM lib stuff
      console.log(this);
      this.node = ReactDOM.findDOMNode(this);
      this.autocomplete = $(this.node).autocomplete({
         source: this.props.source,
         select: this.props.onSelect
      });
   },
   componentWillUnmount: function() {
      // clean up the mess
      this.autocomplete.destroy();
   },
   getDefaultProps: function() {
      return {
         onSelect: function(event, ui){ console.log("elemento seleccionado");}
      };
   },
   render: function() {
      return (
         <input name={this.props.name} id={this.props.id} key={this.props.id} className={this.props.className} />
      );
   }
});
