var GoodsTable = React.createClass({
  displayName: "GoodsTable",

  render: function () {
    var goodsCode = [];
    this.props.goods.forEach(f);

    function f(element) {
      goodsCode.push(
        React.DOM.div(
          { key: element.code, className: "Good" },
          React.DOM.span({ className: "Title" }, element.title),
          React.DOM.img({ className: "Picture", src: element.url }),
          React.DOM.span({ className: "Price" }, element.price),
          React.DOM.span({ className: "Count" }, element.count)
        )
      );
    }

    return React.DOM.div(
      { className: "GoodsTable" },
      React.DOM.div({ className: "ShopTitle" }, this.props.shopTitle),
      React.DOM.div({ className: "Goods" }, goodsCode)
    );
  },
});