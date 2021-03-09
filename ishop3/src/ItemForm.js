import PropTypes from "prop-types";
import React from "react";
import "./ItemForm.css";

class ItemForm extends React.Component {
  static propTypes = {
    code: PropTypes.number,
    title: PropTypes.string,
    url: PropTypes.string,
    price: PropTypes.number,
    count: PropTypes.number,
    mode: PropTypes.number.isRequired,
    cbEditCancelled: PropTypes.func,
    cbEditFinished: PropTypes.func,
    cbEditAndSelectToBlock: PropTypes.func,
  };

  state = {
    textName: "",
    textPrice: "",
    textURL: "",
    textQuantity: ""
  };

  componentDidMount = () => {
    if(this.props.mode === 1) this.setState({
      textName: this.props.title,
      textPrice: this.props.price,
      textURL: this.props.url,
      textQuantity: this.props.count,
    });
  }

  componentDidUpdate = (prevProps) => {
    if (prevProps.title !== this.props.title)
      this.setState({
        textName: this.props.title,
        textPrice: this.props.price,
        textURL: this.props.url,
        textQuantity: this.props.count,
      });
  }

  verifyForm = () => {
    this.props.cbEditFinished(
      this.props.code,
      this.state.textName,
      this.state.textPrice,
      this.state.textURL,
      this.state.textQuantity
    );
  };

  cancelEdit = () => {
    this.props.cbEditCancelled();
  };

  textNameChanged = (EO) => {
    this.setState({ textName: EO.target.value });
    if (this.props.mode !== 2) this.props.cbEditAndSelectToBlock();
  };

  textPriceChanged = (EO) => {
    this.setState({ textPrice: parseInt(EO.target.value) });
    if (this.props.mode !== 2) this.props.cbEditAndSelectToBlock();
  };

  textURLChanged = (EO) => {
    this.setState({ textURL: EO.target.value });
    if (this.props.mode !== 2) this.props.cbEditAndSelectToBlock();
  };

  textQuantityChanged = (EO) => {
    this.setState({ textQuantity: parseInt(EO.target.value) });
    if (this.props.mode !== 2) this.props.cbEditAndSelectToBlock();
  };

  render() {
    var innerTextName =
      this.state.textName === "" || this.state.textName === undefined ? (
        <label className="Label">{" Please, fill the field"}</label>
      ) : null;
    var innerTextPrice =
      this.state.textPrice === "" || this.state.textPrice === undefined ? (
        <label className="Label">{" Please, fill the field"}</label>
      ) : null;
    var innerTextURL =
      this.state.textURL === "" || this.state.textURL === undefined ? (
        <label className="Label">{" Please, fill the field"}</label>
      ) : null;
    var innerTextQuantity =
      this.state.textQuantity === "" ||
      this.state.textQuantity === undefined ? (
        <label className="Label">{" Please, fill the field"}</label>
      ) : null;

    return (
      <form className="ItemForm">
        <label className="TextLabel">ID:</label> {this.props.code}
        <br />
        <label className="TextLabel">Name:</label>
        <input
          type="text"
          value={this.state.textName}
          onChange={this.textNameChanged}
        ></input>
        {innerTextName}
        <br />
        <label className="TextLabel">Price:</label>
        <input
          type="text"
          value={this.state.textPrice}
          onChange={this.textPriceChanged}
        ></input>
        {innerTextPrice}
        <br />
        <label className="TextLabel">URL:</label>
        <input
          type="text"
          value={this.state.textURL}
          onChange={this.textURLChanged}
        ></input>
        {innerTextURL}
        <br />
        <label className="TextLabel">Quantity:</label>
        <input
          type="text"
          value={this.state.textQuantity}
          onChange={this.textQuantityChanged}
        ></input>
        {innerTextQuantity}
        <br />
        <input
          type="button"
          value="Save"
          onClick={this.verifyForm}
          disabled={
            innerTextName || innerTextPrice || innerTextURL || innerTextQuantity
          }
        ></input>
        <input type="button" value="Cancel" onClick={this.cancelEdit}></input>
      </form>
    );
  }
}

export default ItemForm;