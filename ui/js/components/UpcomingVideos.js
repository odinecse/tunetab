import React, { Component } from 'react';

import PlaylistItem from './PlaylistItem';

export default class UpcomingVideos extends Component {

  render() {
    let upcoming = null;
    if(this.props.upcomingVideos.length > 0) {
      upcoming = this.props.upcomingVideos.map(function(video, i) {
        return (
          <PlaylistItem title={video.title}
                        thumb={video.thumb}
                        user={video.user}
                        comment={video.comment}
                        key={i} />
        );
      });
    }
    return (
      <ul id="tt-upcoming-videos">
        {upcoming}
      </ul>
    );
  }
}