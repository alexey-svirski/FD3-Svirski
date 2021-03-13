import React from "react";
import PropTypes from "prop-types";

class InputField extends React.Component {
  static propTypes = {
    cbRequestFinished: PropTypes.func
  };

  state = {
    inputText: "",
  };

  requestIsDone = () => {
    this.props.cbRequestFinished(
      this.state.inputText
    );
  };

  searchRequest = (EO) => {
    this.setState({ inputText: EO.target.value });
  };

  render() {
    return (
      <div>
        <input
          type="text"
          value={this.state.inputText}
          onChange={this.searchRequest}
        />
        <input
          type="button"
          value="Get YouTube Video"
          onClick={this.requestIsDone}
        />
        <br />
        <br />
      </div>
    );
  }
}

export default InputField;