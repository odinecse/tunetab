import React, { Component } from 'react';

import PreviousVideos from './_PreviousVideos';
import YoutubeContainer from './_YoutubeContainer';
import UpcomingVideos from './_UpcomingVideos';

export default class Videoplayer extends Component {

  render() {
    return (
      <div id="tt-videoplayer-container">
        <div id="tt-videoplayer">
          <PreviousVideos previousVideos={this.props.videos.previous} />
          <YoutubeContainer current={this.props.videos.current}
                            videoTime={this.props.videos.videoTime} />
          <UpcomingVideos upcomingVideos={this.props.videos.upcoming} />
        </div>
      </div>
    );
  }

}
