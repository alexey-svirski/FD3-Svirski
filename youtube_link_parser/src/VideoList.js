import React from "react";
import InputField from "./InputField";
import "./VideoList.css";

class VideoList extends React.Component {
  state = {
    //currentPage: 1,
    arrToRender: [],
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

  cbRequestFinished = async (recievedRequest) => {
    try {
      const response = await fetch(
        "https://www.googleapis.com/youtube/v3/search?part=snippet&q=" +
          recievedRequest +
          "&maxResults=20&key=AIzaSyB0Ah-r_dTjLeXnJozENrspKguM9V8jBNg",
        { method: "get" }
      );
      const data = await response.json();
      console.log(data);
      let tempArr = [];
      //for needs fix to map
      for (let i in data.items) {
        if (!data.items[i].id.channelId) {
          const imgURL = data.items[i].snippet.thumbnails.high.url;
          const toKey =
            data.items[i].id.videoId ||
            data.items[i].id.playlistId ||
            data.items[i].id.channelId;
          const divWithIMG = (
            <div key={toKey} onClick={this.showIframe} className="SelectVideo">
              <img
                id={toKey}
                src={imgURL}
                alt={data.items[i].snippet.title}
              ></img>
              <br />
              {data.items[i].snippet.title}
            </div>
          );
          tempArr.push(divWithIMG);
        }
      }
      this.setState({ arrToRender: tempArr });
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