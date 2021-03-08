import PropTypes from "prop-types";
import React from "react";

class ItemInfo extends React.Component {
    static propTypes = {
        code: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        count: PropTypes.number.isRequired
      };
    render() {
        return(
        <div className="Card">
        <span className="Title">{this.props.title}</span><br/>
        <span className="Price">{this.props.price}</span><br/>
        <span className="URL">{this.props.url}</span><br/>
        <span className="Count">{this.props.count}</span>
      </div>
        );
    }
}

export default ItemInfo;