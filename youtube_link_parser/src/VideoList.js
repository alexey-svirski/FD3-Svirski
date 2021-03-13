import React from "react";
import InputField from "./InputField";

class VideoList extends React.Component {

  state = {
    currentPage: 1,
    arrToRender: []
  };

  cbRequestFinished = async (recievedRequest) => {
    try {
      let response = await fetch(
        "https://www.googleapis.com/youtube/v3/search?part=snippet&q=" +
          recievedRequest +
          "&maxResults=20&key=AIzaSyAP9fCueWS6cSEoUx7DKYcx6euU0Apsv54",
        { method: "get" }
      );
      var data = await response.json();
      //console.log(data);
      var arr = [];
      for (var i in data.items) {
        var finalLink = "https://www.youtube.com/embed/" + data.items[i].id.videoId;
        var iFrame = <iframe key={i} title={ data.items[i].snippet.title} src={finalLink}></iframe>
      //console.log(iFrame);
        arr.push(iFrame);
      }
      this.setState({arrToRender: arr});
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    var finalList = (
      <div>
        <InputField cbRequestFinished={this.cbRequestFinished}></InputField>
        {this.state.arrToRender}
      </div>
    );
    return finalList;
  }
}

export default VideoList;