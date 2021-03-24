import React from "react";
import InputField from "./InputField";
import "./EmbeddedVideo.css";

class EmbeddedVideo extends React.Component {
  state = {
    youtubeVideoId: "",
  };

  //to add a new "source" you should
  //1) define a new ID-state connected to this "source"
  //2) write a new RegExp inside the callback
  //3) refresh the newly defined state using a new parsing rule

  cbParseRequestFinished = (recievedRequest) => {
    const id = /http(?:s?):\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-_]*)(&(amp;)?‌​[\w?‌​=]*)?/.exec(
      recievedRequest
    );

    if(id) this.setState({
      youtubeVideoId:
        "http://www.youtube.com/embed/" + id[1] + "?enablejsapi=1",
    });
  };

  render() {
    return (
      <div>
        <InputField cbParseRequestFinished={this.cbParseRequestFinished} />
        <iframe
          className="Player"
          title="player"
          src={this.state.youtubeVideoId}
        />
      </div>
    );
  }
}

export default EmbeddedVideo;