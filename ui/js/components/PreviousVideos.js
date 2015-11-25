import React, { Component } from 'react';

import PlaylistItem from './PlaylistItem';

export default class PreviousVideos extends Component {

  render() {
    let previous = null;
    if(this.props.previousVideos.length > 0) {
      previous = this.props.previousVideos.map(function(video, i) {
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
      <ul id="tt-previous-videos">
        {previous}
      </ul>
    );
  }
}