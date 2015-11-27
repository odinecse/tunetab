import React, { Component } from 'react';
import YoutubePlayer from 'react-youtube-player';

import dataStore from '../dataStore';

var interval = {};

export default class YoutubeContainer extends Component {

  componentWillReceiveProps

  constructor(props) {
    super(props);
    this.cleanup = this.cleanup.bind(this);
    this.setPing = this.setPing.bind(this);
  }

  cleanup() {
    console.log('cleanup interval');
    window.clearInterval(interval)
  }
  
  setPing() {
    console.log('setPing');
    interval = window.setInterval(() => {
      console.log('interval', this.player);
      let promise = this.player.getCurrentTime();
      promise.then(function(time) {
        dataStore.pingTime({videoTime: time});
      });
    }, 500);
  }

  render() {
    let player = null;
    console.log('videoTime', this.props.videoTime)
    if(this.props.current) {
      player = <YoutubePlayer ref={(player) => {
                                this.player = player.player
                                this.player.seekTo(this.props.videoTime);
                              }}
                              videoId={this.props.current.id}
                              width={640}
                              height={360}
                              configuration={
                                {
                                  controls: 0,
                                  disablekb: 1,
                                  enablejsapi: 1,
                                  fs: 0,
                                  modestbranding: 1,
                                  playsinline: 1,
                                  rel: 0,
                                  showinfo: 0
                                }}
                              onEnd={this.cleanup}
                              onPlay={this.setPing}
                              onPause={this.cleanup}
                              onError={this.cleanup}
                              playbackState='playing' />
    }
    return (
      <div>
        {player}
      </div>
    );
  }
}