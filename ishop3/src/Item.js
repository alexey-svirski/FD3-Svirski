import "./Item.css";
import PropTypes from "prop-types";
import React from "react";

class Item extends React.Component {
  static propTypes = {
    code: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    count: PropTypes.number.isRequired,
    mode: PropTypes.number.isRequired,
    cbItemSelected: PropTypes.func.isRequired,
    cbIsDelete: PropTypes.func.isRequired,
    cbEditStarted: PropTypes.func.isRequired,
    selectedItemCode: PropTypes.number
  };

  itemToDelete = (EO) => {
    EO.stopPropagation();
    this.props.cbIsDelete(this.props.code);
  };

  itemToEdit = (EO) => {
    EO.stopPropagation();
    this.props.cbEditStarted(this.props.code);
  };

  itemSelected = () => {
    this.props.cbItemSelected(this.props.code);
  };

  render() {
    let a =
      this.props.selectedItemCode === this.props.code && this.props.mode !== 2
        ? "ItemSelected"
        : "Item";
    return (
      <div className={a} onClick={this.itemSelected}>
        <span className="Title">{this.props.title}</span>
        <span className="Price">{this.props.price}</span>
        <span className="URL">{this.props.url}</span>
        <span className="Count">{this.props.count}</span>
        <input
          type="button"
          value="Edit"
          onClick={this.itemToEdit}
          disabled={this.props.mode === 2 || this.props.mode === 3}
        ></input>
        <input
          type="button"
          value="Delete"
          onClick={this.itemToDelete}
          disabled={this.props.mode === 1 || this.props.mode === 2 || this.props.mode === 3
          }
        ></input>
      </div>
    );
  }
}

export default Item;