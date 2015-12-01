import React, { Component } from 'react';
import YoutubePlayer from 'react-youtube-player';

import {isEmpty} from '../../helpers';
import dataStore from '../../dataStore';

var interval = {};


// socket will return current = null if last video in playlist, handle it...
export default class YoutubeContainer extends Component {

  constructor(props) {
    super(props);
    this.shouldComponentUpdate = this.shouldComponentUpdate.bind(this);
    this.clearPing = this.clearPing.bind(this);
    this.setPing = this.setPing.bind(this);
    this.nextVideo = this.nextVideo.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    if(nextProps.skipping) {
      return true;
    }
    if(nextProps.current !== null && this.props.current !== null) {
      if(this.props.current.id == nextProps.current.id) {
        return false;
      }  
    }
    return true;
  }

  clearPing() {
    console.log('clearPing');
    window.clearInterval(interval)
  }
  
  setPing() {
    if(isEmpty(interval)) {
      console.log('setPing');
      interval = window.setInterval(() => {
        let promise = this.player.getCurrentTime();
        promise.then(function(time) {
          dataStore.pingTime({videoTime: time || 0});
        });
      }, 500);
    }
  }

  nextVideo() {
    dataStore.videoOver();
  }

  render() {
    let player = null;
    if(this.props.current) {
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
                              onEnd={this.nextVideo}
                              onPlay={this.setPing}
                              onPause={this.clearPing}
                              onError={this.clearPing}
                              playbackState='playing' />
    }
    return (
      <div id="tt-ytplayer-container">
        <h1 className="tt-sideways">{this.props.current.title}<h1>
        {player}
      </div>
    );
  }

}
