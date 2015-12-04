import React, { Component } from 'react';

export default class PreviousVideos extends Component {

  render() {
    return (
      <div id="tt-welcome-message">
        <p>Hi, type these commands in the chat.</p>
        <p>submit a video</p>
        <p className="tt-indent">
          <span className="tt-code">/submit https://youtu.be/RH1ekuvSYzE</span>
        </p>
        <p>change your alias</p>
        <p className="tt-indent">
           <span className="tt-code">/alias plumbus</span>
        </p>
        <p>skip the current video</p>
        <p className="tt-indent">
           <span className="tt-code">/skip</span>
        </p>
        <p>help (see these commands)</p>
        <p className="tt-indent">
           <span className="tt-code">/help</span>
        </p>
        <p>have fun!</p>
      </div>
    );
  }
}