import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import PlaylistItem from './_PlaylistItem';

export default class UpcomingVideos extends Component {

  constructor(props) {
    super(props);
    this.componentDidUpdate = this.componentDidUpdate.bind(this);
  }

  componentDidUpdate() {
    this.refs.overflow.scrollTop = 0;
  }

  render() {
    let upcoming = null;
    let videos = this.props.upcomingVideos;
    if(videos.length > 0) {
      upcoming = videos.map(function(video, i) {
        return (
          <PlaylistItem title={video.title}
                        thumb={video.thumb}
                        user={video.user}
                        key={video.id + i} />
        );
      });
    }
    return (
      <div  id="tt-upcoming-videos-container"
            className="tt-playlist-container tt-sideways-container">
        <h2 className="tt-sideways">upcoming</h2>
        <div className="tt-overflow-container" ref="overflow">
          <ul id="tt-upcoming-videos" className="tt-playlist">
            {upcoming}
          </ul>
        </div>
      </div>
    );
  }

}
