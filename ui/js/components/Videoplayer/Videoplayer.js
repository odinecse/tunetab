import React, { Component } from 'react';

import PreviousVideos from './PreviousVideos';
import YoutubeContainer from './YoutubeContainer';
import SubmitVideo from './SubmitVideo';
import SkipVideo from './SkipVideo';
import UpcomingVideos from './UpcomingVideos';

export default class Videoplayer extends Component {
  render() {
    return (
      <div id="tt-videoplayer" className="tt-grid col-2-3">
        <PreviousVideos previousVideos={this.props.videos.previous} />
        <YoutubeContainer current={this.props.videos.current}
                          videoTime={this.props.videos.videoTime} />
        <div id="tt-videoplayer-funct">
          <SubmitVideo submitVideoForm={this.props.submitVideoForm} />
          <SkipVideo  skipVotes={this.props.skipVotes}
                      skipThreshold={this.props.skipThreshold}
                      userVoted={this.props.userVoted} />
        </div>
        <UpcomingVideos upcomingVideos={this.props.videos.upcoming} />
      </div>
    );
  }
}

