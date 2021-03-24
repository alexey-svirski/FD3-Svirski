import React from "react";
import PropTypes from "prop-types";

class InputField extends React.Component {
  static propTypes = {
    cbParseRequestFinished: PropTypes.func,
  };

  state = {
    inputText: "",
  };

  parseRequest = (EO) => {
    this.setState({ inputText: EO.target.value });
  };

  render() {
    return (
      <div>
        <input
          type="text"
          value={this.state.inputText}
          onChange={this.parseRequest}
        />
        <input
          type="button"
          value="Get Video"
          onClick={() =>
            this.props.cbParseRequestFinished(this.state.inputText)
          }
        />
      </div>
    );
  }
}

export default InputField;