import React from "react";
import PropTypes from "prop-types";
import "./Ishop3.css";
import Item from "./Item";
import ItemInfo from "./ItemInfo";
import ItemForm from "./ItemForm";

class Ishop3 extends React.Component {
  static propTypes = {
    shopName: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        code: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        count: PropTypes.number.isRequired,
      })
    ).isRequired,
  };

  state = {
    itemSelectedCode: null,
    itemSelectedIndex: 0,
    currentState: this.props.items,
    // 0 - не редактируется, 1 - редактируется, 2 - добавляется новый товар,
    //3 - в карточку внесены изменения, но не отвалидированы
    editingMode: 0,
    codeCounter: this.props.items.length + 1,
  };

  cbItemSelected = (recievedCode) => {
    if (this.state.editingMode === 2 || this.state.editingMode === 3) return;
    this.setState({ itemSelectedCode: recievedCode });
    if (this.state.editingMode === 1) this.setState({ editingMode: 0 });
    this.state.currentState.forEach((v, i) => {
      if (v.code === recievedCode) this.setState({ itemSelectedIndex: i });
    });
  };

  cbEditStarted = (recievedCode) => {
    this.setState({ itemSelectedCode: recievedCode });
    this.setState({ editingMode: 1 });
    this.state.currentState.forEach((v, i) => {
      if (v.code === recievedCode) this.setState({ itemSelectedIndex: i });
    });
  };

  cbEditCancelled = () => {
    this.setState({ editingMode: 0 });
  };

  cbEditFinished = (
    recievedCode,
    recievedName,
    recievedPrice,
    recievedURL,
    recievedQuantity
  ) => {
    if (this.state.editingMode === 2) {
      var newItemToAdd = {
        code: this.state.codeCounter,
        title: recievedName,
        price: recievedPrice,
        url: recievedURL,
        count: recievedQuantity,
        mode: 0,
        cbItemSelected: this.cbItemSelected,
        cbIsDelete: this.cbIsDelete,
        cbEditStarted: this.cbEditStarted,
      };
      this.state.currentState.push(newItemToAdd);
      this.setState({ codeCounter: this.state.codeCounter + 1 });
    }
    if (this.state.editingMode === 3) {
      this.state.currentState.forEach((v) => {
        if (v.code === recievedCode) {
          v.title = recievedName;
          v.price = recievedPrice;
          v.url = recievedURL;
          v.count = recievedQuantity;
        }
      });
    }
    this.setState({ editingMode: 0 });
  };

  cbIsDelete = (recievedCode) => {
    if (window.confirm("Удалить товар?")) {
      var anotherArr = this.state.currentState.filter(
        (v) => v.code !== recievedCode
      );
      this.setState({ currentState: anotherArr });
    }
    if (this.state.itemSelectedIndex)
      this.setState({ itemSelectedIndex: this.state.itemSelectedIndex - 1 });
    this.setState({ itemSelectedCode: null });
  };

  cbEditAndSelectToBlock = () => {
    this.setState({ editingMode: 3 });
  };

  createNewItem = () => {
    this.setState({ editingMode: 2 });
  };

  render() {
    var itemsCode = this.state.currentState.map((v) => (
      <Item
        key={v.code}
        code={v.code}
        title={v.title}
        price={v.price}
        url={v.url}
        count={v.count}
        mode={this.state.editingMode}
        cbItemSelected={this.cbItemSelected}
        cbIsDelete={this.cbIsDelete}
        cbEditStarted={this.cbEditStarted}
        selectedItemCode={this.state.itemSelectedCode}
      ></Item>
    ));

    var index = this.state.itemSelectedIndex;

    if (this.state.currentState[index] !== undefined) {
      var renderForm1 = (
        <ItemForm
          code={this.state.currentState[index].code}
          title={this.state.currentState[index].title}
          price={this.state.currentState[index].price}
          url={this.state.currentState[index].url}
          count={this.state.currentState[index].count}
          mode={this.state.editingMode}
          cbEditCancelled={this.cbEditCancelled}
          cbEditFinished={this.cbEditFinished}
          cbEditAndSelectToBlock={this.cbEditAndSelectToBlock}
        ></ItemForm>
      );

      var renderCard = (
        <ItemInfo
          code={this.state.currentState[index].code}
          title={this.state.currentState[index].title}
          price={this.state.currentState[index].price}
          url={this.state.currentState[index].url}
          count={this.state.currentState[index].count}
        ></ItemInfo>
      );
    } else renderCard = renderForm1 = null;

    var renderForm2 = (
      <ItemForm
        mode={this.state.editingMode}
        cbEditCancelled={this.cbEditCancelled}
        cbEditFinished={this.cbEditFinished}
        cbEditAndSelectToBlock={this.cbEditAndSelectToBlock}
      ></ItemForm>
    );

    if (this.state.editingMode === 1 || this.state.editingMode === 3)
      var labelText = "Edit existing product";
    if (this.state.editingMode === 2) labelText = "Add new product";

    return (
      <div>
        <div className="ItemsTable">
          <div className="ShopName">{this.props.shopName}</div>
          <div className="Items">{itemsCode}</div>
        </div>
        <input
          type="button"
          value="New Item"
          onClick={this.createNewItem}
          disabled={
            this.state.editingMode === 1 ||
            this.state.editingMode === 2 ||
            this.state.editingMode === 3
          }
        ></input>
        <br />
        <br />
        {this.state.itemSelectedCode && !this.state.editingMode && renderCard}
        <label className="LabelText">{labelText}</label>
        <br />
        <br />
        {(this.state.editingMode === 1 || this.state.editingMode === 3) &&
          renderForm1}
        {this.state.editingMode === 2 && renderForm2}
      </div>
    );
  }
}
export default Ishop3;