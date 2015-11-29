import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import PlaylistItem from './PlaylistItem';

export default class UpcomingVideos extends Component {

  constructor(props) {
    super(props);
    this.componentDidUpdate = this.componentDidUpdate.bind(this);
  }

  componentDidUpdate() {
    if(this.props.skipping) {
      let node = ReactDOM.findDOMNode(this);
      node.scrollTop = 0; 
    }
  }

  render() {
    let upcoming = null;
    if(this.props.upcomingVideos.length > 0) {
      upcoming = this.props.upcomingVideos.map(function(video, i) {
        return (
          <PlaylistItem title={video.title}
                        thumb={video.thumb}
                        user={video.user}
                        comment={video.comment}
                        key={video.id + i} />
        );
      });
    }
    return (
      <div id="tt-upcoming-videos-container" className="tt-overflow-container">
        <ul id="tt-upcoming-videos" className="tt-playlist">
          {upcoming}
        </ul>
      </div>
    );
  }
}