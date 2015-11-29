import React, { Component } from 'react';

import {ERRORS} from '../../constants';
import dataStore from '../../dataStore';

const youtubeRX = /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;

export default class SubmitVideo extends Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleOnKeyPress = this.handleOnKeyPress.bind(this);
    this.submit = this.submit.bind(this);
    this.submitVideo = this.submitVideo.bind(this);
    this.state = {
      video: ''
    }
  }

  submitVideo(e) {
    let video = this.state.video;
    this.submit(video);
  }

  submit(video) {
    if(video !== '') {
      video = video.match(youtubeRX);
      if(video) {
        dataStore.emitSubmitVideo({video: video[1]});
      } else {
        dataStore.addNotification({msg: ERRORS.VIDEO_SUBMIT});
      }
      this.setState({video: ''});
    } 
  }

  handleChange(e) {
    this.setState({video: e.target.value});
  }

  handleOnKeyPress(e) {
    const key = e.keyCode;
    let video = e.target.value.trim();
    if(key === 13) {
      this.submit(video);
    }
  }

  render() {
    return (
      <div id="tt-submitvideo" className="pull-left">
        <input  ref={function(input) {
            if (input != null) {
              input.focus();
            }
          }}
          className="tt-input"
          value={this.state.video}
          onKeyDown={this.handleOnKeyPress}
          onChange={this.handleChange}
          type='text'
          autoComplete="off" />
        <a href="#" onClick={this.submitVideo}
                className="tt-btn tt-btn-big">
          <i className="fa fa-plus"></i> Submit
        </a>
      </div>
    );
  }
}
