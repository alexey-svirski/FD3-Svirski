var Ishop2 = React.createClass({
  displayName: "Ishop2",

  propTypes: {
    shopName: React.PropTypes.string.isRequired,
    items: React.PropTypes.arrayOf(
      React.PropTypes.shape({
        code: React.PropTypes.number.isRequired,
        title: React.PropTypes.string.isRequired,
        url: React.PropTypes.string.isRequired,
        price: React.PropTypes.number.isRequired,
        count: React.PropTypes.number.isRequired,
      })
    ).isRequired,
  },

  getInitialState: function () {
    return {
      itemSelected: null,
      currentState: this.props.items,
    };
  },

  cbIsSelected: function (recievedCode) {
    this.setState({ itemSelected: recievedCode });
  },

  cbIsDelete: function (recievedCode) {
    var toDelete = confirm("Удалить товар?");
    var anotherArr = this.state.currentState.filter(f);
    function f(v) {
      if (v.code == recievedCode && toDelete)
        return false;
      return true;
    }
    this.setState({ currentState: anotherArr });
  },

  render: function () {
    var itemSelected2 = this.state.itemSelected;
    var itemsCode = this.state.currentState.map((v) =>
      React.createElement(Item, {
        key: v.code,
        code: v.code,
        title: v.title,
        price: v.price,
        url: v.url,
        count: v.count,
        cbIsSelected: this.cbIsSelected,
        cbIsDelete: this.cbIsDelete,
        selectedItemCode: itemSelected2,
      })
    );

    return React.DOM.div(
      { className: "ItemsTable" },
      React.DOM.div({ className: "ShopName" }, this.props.shopName),
      React.DOM.div({ className: "Items" }, itemsCode)
    );
  },
});