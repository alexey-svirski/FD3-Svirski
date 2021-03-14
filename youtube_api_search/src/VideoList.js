import React from "react";
import InputField from "./InputField";
import "./VideoList.css";

class VideoList extends React.Component {
  state = {
    arrToRender: [],
    //totalResults: null,
  };

  showIframe = (EO) => {
    //console.log(EO.target);
    let tempArr = [];
    tempArr = this.state.arrToRender.map((v) => {
      if (v.key === EO.target.id) {
        const src = "https://www.youtube.com/embed/" + EO.target.id;
        v = (
          <iframe
            className="Player"
            key={EO.target.id}
            title={EO.target.alt}
            src={src}
          ></iframe>
        );
      }
      return v;
    });
    this.setState({ arrToRender: tempArr });
  };

  cbSearchRequestFinished = async (recievedRequest) => {
    try {
      const response = await fetch(
        "https://www.googleapis.com/youtube/v3/search?part=snippet&q=" +
          recievedRequest +
          "&maxResults=20&key=AIzaSyB0Ah-r_dTjLeXnJozENrspKguM9V8jBNg",
        { method: "get" }
      );
      const data = await response.json();
      //console.log(data);
      //this.setState({totalResults: data.pageInfo.totalResults});
      let tempArr = [];
      data.items.forEach((v) => {
        if (!v.id.channelId) {
          const imgURL = v.snippet.thumbnails.high.url;
          const toKey = v.id.videoId || v.id.playlistId;
          var divWithIMG = (
            <div key={toKey} onClick={this.showIframe} className="SelectVideo">
              <img id={toKey} src={imgURL} alt={v.snippet.title}></img>
              <br />
              {v.snippet.title}
            </div>
          );
          tempArr.push(divWithIMG);
        }
      });
      this.setState({ arrToRender: tempArr });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <div>
        <InputField cbSearchRequestFinished={this.cbSearchRequestFinished} />
        {this.state.arrToRender}
      </div>
    );
  }
}

export default VideoList;