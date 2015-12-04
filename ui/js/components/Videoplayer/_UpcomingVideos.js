import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import PlaylistItem from './_PlaylistItem';

export default class UpcomingVideos extends Component {

  constructor(props) {
    super(props);
    this.componentDidUpdate = this.componentDidUpdate.bind(this);
  }

  componentDidUpdate() {
    let node = {};
    if(this.props.skipping) {
      node = ReactDOM.findDOMNode(this);
      node.scrollTop = 0; 
    }
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
      <div id="tt-upcoming-videos-container" className="tt-playlist-container tt-sideways-container">
        <h2 className="tt-sideways">upcoming</h2>
        <div className="tt-overflow-container">
          <ul id="tt-upcoming-videos" className="tt-playlist">
            {upcoming}
          </ul>
        </div>
      </div>
    );
  }
}