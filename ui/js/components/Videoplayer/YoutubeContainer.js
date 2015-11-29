import React, { Component } from 'react';
import YoutubePlayer from 'react-youtube-player';

import dataStore from '../../dataStore';

var interval = {};

export default class YoutubeContainer extends Component {

  constructor(props) {
    super(props);
    this.clearPing = this.clearPing.bind(this);
    this.setPing = this.setPing.bind(this);
  }

  clearPing() {
    console.log('clearPing');
    window.clearInterval(interval)
  }
  
  setPing() {
    console.log('setPing');
    interval = window.setInterval(() => {
      let promise = this.player.getCurrentTime();
      promise.then(function(time) {
        dataStore.pingTime({videoTime: time || 0});
      });
    }, 500);
  }

  render() {
    let player = null;
    if(this.props.current) {
      console.log('videoTime', this.props.videoTime);
      player = <YoutubePlayer ref={(player) => {
                                if(player !== null) {
                                  this.player = player.player
                                  this.player.seekTo(this.props.videoTime);
                                }
                              }}
                              videoId={this.props.current.id}
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
                              onEnd={this.clearPing}
                              onPlay={this.setPing}
                              onPause={this.clearPing}
                              onError={this.clearPing}
                              playbackState='playing' />
    }
    return (
      <div id="tt-ytplayer-c">
        {player}
      </div>
    );
  }
}