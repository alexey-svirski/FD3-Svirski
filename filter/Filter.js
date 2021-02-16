var Filter = React.createClass({
  displayName: "Filter",

  propTypes: {
    stringArr: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
  },

  getInitialState: function () {
    return {
      isSorted: false,
      currArr: this.props.stringArr,
      inputText: "",
    };
  },

  buttonClicked: function () {
    this.setState({ inputText: "", currArr: this.props.stringArr, isSorted: false });
  },

  checkboxChecked: function () {
    if (!this.state.isSorted) 
      this.setState({ isSorted: true, currArr: [...this.props.stringArr].sort() });
    else
        this.setState({ isSorted: false, currArr: this.props.stringArr });
  },

  textChanged: function (EO) {
    this.setState({ inputText: EO.target.value });
  },

  render: function () {
    var newArr = this.state.currArr.filter(
      (v) => v.indexOf(this.state.inputText) > -1
    );

    return React.DOM.div(
      { className: "Filter" },
      React.DOM.input({
        type: "checkbox",
        onClick: this.checkboxChecked,
        checked: this.state.isSorted,
      }),
      React.DOM.input({
        type: "text",
        onChange: this.textChanged,
        value: this.state.inputText,
      }),
      React.DOM.input({
        type: "button",
        value: "Сброс",
        onClick: this.buttonClicked,
      }),
      React.DOM.br(),
      React.DOM.select(
        { className: "Select", size: this.props.stringArr.length },
        newArr.map((v) => React.DOM.option({ label: v }))
      )
    );
  },
});