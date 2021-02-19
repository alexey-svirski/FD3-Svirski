var Item = React.createClass({
  displayName: "Item",

  propTypes: {
    code: React.PropTypes.number.isRequired,
    title: React.PropTypes.string.isRequired,
    url: React.PropTypes.string.isRequired,
    price: React.PropTypes.number.isRequired,
    count: React.PropTypes.number.isRequired,
    cbIsSelected: React.PropTypes.func.isRequired,
    cbIsDelete: React.PropTypes.func.isRequired,
    selectedItemCode: React.PropTypes.number,
  },

  itemToDelete: function (EO) {
    EO.stopPropagation();
    this.props.cbIsDelete(this.props.code);
  },

  itemSelected: function() {
    this.props.cbIsSelected(this.props.code);
  },

  render: function () {
    return React.DOM.div(
      {
        className: this.props.selectedItemCode == this.props.code ? "ItemSelected" : "Item",
        onClick: this.itemSelected,
      },
      React.DOM.span({ className: "Title" }, this.props.title),
      React.DOM.span({ className: "Price" }, this.props.price),
      React.DOM.span({ className: "URL" }, this.props.url),
      React.DOM.span({ className: "Count" }, this.props.count),
      React.DOM.input({
        type: "button",
        value: "Delete",
        onClick: this.itemToDelete,
      })
    );
  },
});