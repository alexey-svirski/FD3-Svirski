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

  render: function () {
    var itemsCode = this.props.items.map((v) =>
      React.createElement(Item, {
        key: v.code,
        code: v.code,
        title: v.title,
        price: v.price,
        url: v.url,
        count: v.count,
      })
    );

    return React.DOM.div(
      { className: "ItemsTable" },
      React.DOM.div({ className: "ShopName" }, this.props.shopName),
      React.DOM.div({ className: "Items" }, itemsCode)
    );
  },
});