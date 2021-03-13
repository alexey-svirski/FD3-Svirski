import React from "react";
import InputField from "./InputField";

class VideoList extends React.Component {
  state = {
    currentPage: 1,
    arrToRender: [],
  };

  showIframe = (EO) => {
    console.log(EO.target.id);
    var newArr = [];
    newArr = this.state.arrToRender.map((v) => {
      if (v.key === EO.target.id) {
        var src = "https://www.youtube.com/embed/" + EO.target.id;
        v = (
          <iframe
            key={EO.target.id}
            title={EO.target.alt}
            src={src}
            height="480"
            width="360"
          ></iframe>
        );
      }
      return v;
    });
    this.setState({ arrToRender: newArr });
  };

  cbRequestFinished = async (recievedRequest) => {
    try {
      let response = await fetch(
        "https://www.googleapis.com/youtube/v3/search?part=snippet&q=" +
          recievedRequest +
          "&maxResults=20&key=AIzaSyBGJ2rIrLjnI-Kna0qLy42XQa7PI67rGv8",
        { method: "get" }
      );
      var data = await response.json();
      console.log(data);
      var arr = [];
      for (var i in data.items) {
        var imgURL = data.items[i].snippet.thumbnails.high.url;
        var toKey =
          data.items[i].id.videoId ||
          data.items[i].id.palylistId ||
          data.items[i].id.channelId;
        var finalIMG = (
          <img
            key={toKey}
            id={toKey}
            src={imgURL}
            alt={data.items[i].snippet.title}
            onClick={this.showIframe}
          ></img>
        );
        arr.push(finalIMG);
      }
      this.setState({ arrToRender: arr });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <div>
        <InputField cbRequestFinished={this.cbRequestFinished}></InputField>
        {this.state.arrToRender}
      </div>
    );
  }
}

export default VideoList;