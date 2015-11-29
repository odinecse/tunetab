import React, { Component } from 'react';

import {ERRORS} from '../../constants';
import dataStore from '../../dataStore';

const youtubeRX = /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;

export default class SubmitVideo extends Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.cancel = this.cancel.bind(this);
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

  cancel() {
    this.setState({
      video: '',
      submit: false
    });
  }

  handleOnKeyPress(e) {

    const key = e.keyCode;
    let video = e.target.value.trim();
    console.log(key);
    if(key === 27) {
      this.cancel();
    } else if(key === 13) {
      if(video !== '') {
        video = video.match(youtubeRX);
        if(video) {
          dataStore.emitSubmitVideo({video: video[1]});
        } else {
          dataStore.addNotification({msg: ERRORS.VIDEO_SUBMIT});
          console.log(ERRORS.VIDEO_SUBMIT);
        }
        this.cancel();
      }
    }

  }

  render() {
    let submit = (
      <a href="#" onClick={this.submitVideo}
                  className="tt-btn">
        <i className="fa fa-plus"></i> Submit
      </a>
    )
    if(this.state.submit) {
      submit = (<div>
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
                  <a href="#" className="tt-btn" 
                        onClick={this.cancel}>
                    <i className='fa fa-times'></i>
                    Cancel
                  </a>
                </div>)
    }
    return (
      <div id="tt-submitvideo" className="pull-left">
        {submit}
      </div>
    );
  }
}
