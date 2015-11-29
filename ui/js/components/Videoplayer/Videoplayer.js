import React, { Component } from 'react';

import PreviousVideos from './PreviousVideos';
import YoutubeContainer from './YoutubeContainer';
import UpcomingVideos from './UpcomingVideos';

export default class Videoplayer extends Component {
  render() {
    return (
      <div id="tt-videoplayer" className="tt-grid col-2-3">
        <PreviousVideos previousVideos={this.props.videos.previous} 
                        skipping={this.props.skipping} />
        <YoutubeContainer submitVideoForm={this.props.submitVideoForm} 
                          skipVotes={this.props.skipVotes}
                          skipThreshold={this.props.skipThreshold}
                          skipAllowed={this.props.skipAllowed}
                          skipping={this.props.skipping}
                          userVoted={this.props.userVoted}
                          current={this.props.videos.current}
                          videoTime={this.props.videos.videoTime} />
        <UpcomingVideos upcomingVideos={this.props.videos.upcoming} 
                        skipping={this.props.skipping} />
      </div>
    );
  }
}

