import React from "react";
import PropTypes from "prop-types";

class InputField extends React.Component {
  static propTypes = {
    cbSearchRequestFinished: PropTypes.func,
  };

  state = {
    inputText: "",
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
          value="Search YouTube Video"
          onClick={() =>
            this.props.cbSearchRequestFinished(this.state.inputText)
          }
        />
      </div>
    );
  }
}

export default InputField;