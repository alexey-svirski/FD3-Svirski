var Item = React.createClass({
  displayName: "Item",

  propTypes: {
    code: React.PropTypes.number.isRequired,
    title: React.PropTypes.string.isRequired,
    url: React.PropTypes.string.isRequired,
    price: React.PropTypes.number.isRequired,
    count: React.PropTypes.number.isRequired,
  },

  getInitialState: function () {
    return {
      isSelected: false,
      toDelete: false,
    };
  },

  selectItem: function () {
    if (!this.state.isSelected) {
        this.setState({ isSelected: true });
    }
    else this.setState({ isSelected: false });
  },

  deleteItemMessage: function (EO) {
    EO.stopPropagation();
    this.setState({toDelete: confirm("Удалить товар?")});
  },

  render: function () {
    if(!this.state.toDelete) return React.DOM.div(
      {
        className: this.state.isSelected ? "ItemSelected" : "Item",
        onClick: this.selectItem,
      },
      React.DOM.span({ className: "Title" }, this.props.title),
      React.DOM.span({ className: "Price" }, this.props.price),
      React.DOM.span({ className: "URL" }, this.props.url),
      React.DOM.span({ className: "Count" }, this.props.count),
      React.DOM.input({
        type: "button",
        value: "Delete",
        onClick: this.deleteItemMessage,
      })
    );
    else return null;
  },
});