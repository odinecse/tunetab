import React, { Component } from 'react';

import PreviousVideos from './PreviousVideos';
import YoutubePlayer from './YoutubePlayer';
import SubmitVideo from './SubmitVideo';
import SkipVideo from './SkipVideo';
import UpcomingVideos from './UpcomingVideos';

export default class App extends Component {
  render() {
    return (
      <div id="tt-videoplayer">
        <PreviousVideos />
        <YoutubePlayer />
        <SubmitVideo />
        <SkipVideo />
        <UpcomingVideos />
      </div>
    );
  }
}

