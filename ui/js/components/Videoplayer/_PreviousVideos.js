import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import PlaylistItem from './_PlaylistItem';

export default class PreviousVideos extends Component {

  constructor(props) {
    super(props);
    this.componentDidUpdate = this.componentDidUpdate.bind(this);
  }

  componentDidUpdate() {
    this.refs.overflow.scrollTop = this.refs.overflow.scrollHeight;
  }

  render() {
    let previous = null;
    let videos = this.props.previousVideos;
    if(videos.length > 0) {
      previous = videos.map(function(video, i) {
        return (
          <PlaylistItem title={video.title}
                        thumb={video.thumb}
                        user={video.user}
                        key={i + video.id} />
        );
      }).reverse();
    }
    return (
      <div  id="tt-previous-videos-container"
            className="tt-playlist-container tt-sideways-container">
        <h2 className="tt-sideways">previous</h2>
        <div className="tt-overflow-container" ref="overflow">
          <ul id="tt-previous-videos" className="tt-playlist">
            {previous}
          </ul>
        </div>
      </div>
    );
  }

}
