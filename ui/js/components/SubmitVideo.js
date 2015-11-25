import React, { Component } from 'react';

import {ERRORS} from '../constants';
import dataStore from '../dataStore';

const youtubeRX = /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;

export default class SubmitVideo extends Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleOnKeyPress = this.handleOnKeyPress.bind(this);
    this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
    this.submitVideo = this.submitVideo.bind(this);
    this.state = {
      submit: false,
      video: ''
    }
  }

  componentWillReceiveProps(props) {
    this.setState({
      submit: props.submitVideoForm,
    });
  }

  submitVideo(e) {
    this.setState({submit: true});
  }

  handleChange(e) {
    this.setState({video: e.target.value});
  }

  handleOnKeyPress(e) {
    const key = e.charCode;
    let video = e.target.value.trim();
    if(key === 13) {
      if(video !== '') {
        video = video.match(youtubeRX);
        if(video) {
          dataStore.emitSubmitVideo({video: video[1]});
        } else {
          dataStore.addNotification({msg: ERRORS.VIDEO_SUBMIT});
          console.log(ERRORS.VIDEO_SUBMIT);
        }
        this.setState({
          video: '',
          submit: false
        });
      }
    }
  }

  render() {
    let submit = <button onClick={this.submitVideo}><i className="fa fa-plus"></i> Submit</button>
    if(this.state.submit) {
      submit = <input  ref={function(input) {
                  if (input != null) {
                    input.focus();
                  }
                }}
                value={this.state.video}
                onKeyPress={this.handleOnKeyPress}
                onChange={this.handleChange}
                type='text'
                autoComplete="off" />
    }
    return (
      <div id="tt-submitvideo">
        {submit}
      </div>
    );
  }
}
